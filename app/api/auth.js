import axios from 'axios';

/**
 * Auth API
 */
export const AuthApi = {
  /**
   * Logs an user in
   * @param  {string} identifier User identifier (username or email)
   * @param  {string} password Password
   */
  login(identifier, password) {
    return axios
      .post('/auth/login', {
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
   * User password recovery (forgot password)
   * @param  {string} email User email address
   * @param  {string} recaptcha recaptcha
   */
  forgot(email, recaptcha) {
    return axios
      .post('/auth/forgot_password', {
        email,
        recaptcha,
      })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err.response));
  },
  /**
   * Logs out an user in
   */
  logout() {
    return axios
      .delete('/auth/logout')
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
      .post('/users/create', {
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
      .post('/auth/refresh_access_token', {
        refreshToken: localStorage.getItem('refresh_token'),
      })
      .then(res => Promise.resolve(res.data))
      .catch(err => Promise.reject(err.response));
  },
};
