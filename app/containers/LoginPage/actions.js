/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SENDING_REQUEST } from './constants';

export function loginRequestAction(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function loginSendingRequestAction(data) {
  return {
    type: LOGIN_SENDING_REQUEST,
    data,
  };
}
