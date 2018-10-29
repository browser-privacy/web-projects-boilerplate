import axios from 'axios';
import JWTDecode from 'jwt-decode';

import { AuthApi } from './auth';
import { LocalStorageApi } from './vendors';

import config from '../config';

const { API_ENDPOINT } = config[process.env.NODE_ENV];

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.timeout = 7000;

axios.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.authorization = LocalStorageApi.getItem('access_token');

    if (reqConfig.url.includes('/auth/logout'))
      reqConfig.headers['X-REFRESH-TOKEN'] = LocalStorageApi.getItem(
        'refresh_token',
      );

    return reqConfig;
  },
  err => Promise.reject(err),
);

let isFetchingToken = false;
let tokenSubscribers = [];

function subscribeTokenRefresh(cb) {
  tokenSubscribers.push(cb);
}
function onTokenRefreshed(errRefreshing, token) {
  tokenSubscribers.map(cb => cb(errRefreshing, token));
}
function forceLogout() {
  isFetchingToken = false;
  LocalStorageApi.clear();

  window.location = '/auth/login';
}

axios.interceptors.response.use(undefined, err => {
  if (!err) return Promise.reject(err);
  if (
    err.response.config.url.includes('/auth') ||
    err.response.config.url.includes('/users/create') ||
    err.response.config.url.includes('/misc/contact')
  )
    return Promise.reject(err);

  if (err.response.status === 403) return forceLogout();
  if (err.response.status !== 401) return Promise.reject(err);

  if (!isFetchingToken) {
    isFetchingToken = true;

    const refreshToken = LocalStorageApi.getItem('refresh_token');
    if (!refreshToken) return forceLogout();

    try {
      const isRefreshTokenExpired =
        JWTDecode(refreshToken).exp < Date.now() / 1000;

      if (isRefreshTokenExpired) return forceLogout();
    } catch (e) {
      return forceLogout();
    }

    AuthApi.refreshAccessToken()
      .then(newAccessToken => {
        isFetchingToken = false;

        onTokenRefreshed(null, newAccessToken);
        tokenSubscribers = [];

        LocalStorageApi.setItem('access_token', newAccessToken);
        const decodedAccessToken = JWTDecode(newAccessToken);
        const { user } = decodedAccessToken;
        LocalStorageApi.setItem('user', JSON.stringify(user));
      })
      .catch(() => {
        onTokenRefreshed(new Error('Unable to refresh access token'), null);
        tokenSubscribers = [];

        forceLogout();
      });
  }

  const initTokenSubscriber = new Promise((resolve, reject) => {
    subscribeTokenRefresh((errRefreshing, newToken) => {
      if (errRefreshing) return reject(errRefreshing);

      err.config.headers.authorization = newToken;
      return resolve(axios(err.config));
    });
  });
  return initTokenSubscriber;
});
