import axios from 'axios';

import { config } from '../config';
const { API_ENDPOINT } = config[process.env.NODE_ENV];

/**
 * API.DCABOT.IO
 */
const apiAuth = {
  /**
   * Logs a user in, returning a promise with `true` when done
   * @param  {string} identifier The userIdentifer of the user (username or email)
   * @param  {string} password The password of the user
   */
  login(identifier, password) {
    return axios
      .post(`${API_ENDPOINT}/auth/login`, {
        userIdentifier: identifier,
        password,
      })
      .then(response =>
        Promise.resolve({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        }),
      )
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Registers an user, returning a promise with `true` when done
   * @param  {string} email user email
   * @param  {string} email username email
   * @param  {string} email password email
   * @param  {string} email recaptcha email
   */
  register(email, username, password, recaptcha) {
    return axios
      .post(`${API_ENDPOINT}/users/create`, {
        email,
        username,
        password,
        recaptcha,
      })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Refresh JWT token
   * @param  {string} refreshToken User JWT token
   */
  refreshToken(refreshToken) {
    return axios
      .post(`${API_ENDPOINT}/auth/refresh-token`, {
        refreshToken,
      })
      .then(response =>
        Promise.resolve({
          message: 'success',
          data: {
            token: response.data.token,
          },
        }),
      )
      .catch(error => {
        if (error.response.status === 401)
          return Promise.resolve({
            message: 'invalid_token',
          });

        return Promise.resolve({
          message: 'error_server',
          error,
        });
      });
  },
};

export default apiAuth;
