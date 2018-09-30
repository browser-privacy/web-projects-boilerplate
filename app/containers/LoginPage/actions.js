/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from './constants';

export function loginRequestAction(values) {
  return {
    type: LOGIN_REQUEST,
    values,
  };
}

export function loginRequestSuccessAction(loginTokens) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    tokens: loginTokens,
  };
}

export function loginRequestFailedAction(errMsg) {
  return {
    type: LOGIN_REQUEST_FAILED,
    errMsg,
  };
}
