// @TODO: Move axios defaults and interceptors to another file

import axios from 'axios';
import JWTDecode from 'jwt-decode';

import { config } from '../config';
const { API_ENDPOINT } = config[process.env.NODE_ENV];

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.timeout = 7000;

axios.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.authorization = localStorage.getItem('access_token');

    if (reqConfig.url.includes('/auth/logout'))
      reqConfig.headers['X-REFRESH-TOKEN'] = localStorage.getItem(
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
  localStorage.clear();

  window.location = '/auth/login';
}

axios.interceptors.response.use(undefined, err => {
  // @TODO: Handle 403 error code
  if (err.response.status !== 401) return Promise.reject(err);

  if (!isFetchingToken) {
    isFetchingToken = true;

    const refreshToken = localStorage.getItem('refresh_token');
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

        localStorage.setItem('access_token', newAccessToken);
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

/**
 * Backend API
 */
export const AuthApi = {
  /**
   * Logs an user in
   * @param  {string} identifier User identifier (username or email)
   * @param  {string} password Password
   */
  login(identifier, password) {
    return axios
      .post(`/auth/login`, {
        userIdentifier: identifier,
        password,
      })
      .then(res =>
        Promise.resolve({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        }),
      )
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Logs out an user in
   */
  logout() {
    return axios
      .delete(`/auth/logout`)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Registers an user
   * @param  {string} email user
   * @param  {string} username username
   * @param  {string} password password
   * @param  {string} recaptcha recaptcha
   */
  register(email, username, password, recaptcha) {
    return axios
      .post(`/users/create`, {
        email,
        username,
        password,
        recaptcha,
      })
      .then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Refresh JWT access token
   */
  refreshAccessToken() {
    return axios
      .post(`/auth/refresh_access_token`, {
        refreshToken: localStorage.getItem('refresh_token'),
      })
      .then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err.response));
  },
};
