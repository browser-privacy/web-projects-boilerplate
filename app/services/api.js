import axios from 'axios';
import JWTDecode from 'jwt-decode';

import { config } from '../config';
const { API_ENDPOINT } = config[process.env.NODE_ENV];

axios.defaults.baseURL = API_ENDPOINT;
axios.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.authorization = localStorage.getItem('access_token');

    return reqConfig;
  },
  err => Promise.reject(err),
);
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status !== 401) return Promise.reject(error);
    if (error.response.config.url.includes('/auth/login'))
      return Promise.reject(error);

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return Promise.reject(error);

    try {
      const isRefreshTokenExpired =
        JWTDecode(refreshToken).exp < Date.now() / 1000;
      if (isRefreshTokenExpired) return Promise.reject(error);
    } catch (e) {
      console.log(e);
      return Promise.reject(error);
    }

    console.log(refreshToken);
    console.log('refreshToken');

    return api
      .refreshAccessToken(refreshToken)
      .then(newAccessToken => {
        localStorage.setItem('access_token', newAccessToken);
        return axios.request(error.config);
      })
      .catch(() => {
        localStorage.clear();
        window.location = '/auth/login';
        return Promise.reject(error);
      });
  },
);

/**
 * BACKEND API
 */
const api = {
  test() {
    return axios
      .get(`/get-rand-number`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },
  /**
   * Logs a user in
   * @param  {string} identifier User identifier (username or email)
   * @param  {string} password Password
   */
  login(identifier, password) {
    return axios
      .post(`/auth/login`, {
        userIdentifier: identifier,
        password,
      })
      .then(response =>
        Promise.resolve({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        }),
      )
      .catch(err => Promise.reject(err));
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
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Refresh JWT access token
   * @param  {string} refreshToken User JWT refresh token
   */
  refreshAccessToken(refreshToken) {
    return axios
      .post(`/auth/refresh_access_token`, {
        refreshToken,
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },
};

export default api;
