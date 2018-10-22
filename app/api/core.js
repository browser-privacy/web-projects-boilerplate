import axios from 'axios';

/**
 * Core API
 */
export const CoreApi = {
  /**
   * Contact form
   * @param  {string} name
   * @param  {string} email
   * @param  {string} message
   * @param  {string} recaptchaResponse
   */
  contact(name, email, message, recaptcha) {
    return axios
      .post('/misc/contact', {
        name,
        email,
        message,
        recaptcha,
      })
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err.response));
  },
};
