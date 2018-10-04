/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SET_LOGIN_FORM_MESSAGE,
  RESET_STATE,
} from './constants';

export function loginRequestAction(values, formikActions) {
  return {
    type: LOGIN_REQUEST,
    values,
    formikActions,
  };
}

export function loginRequestSuccessAction(tokens) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    tokens,
  };
}

export function loginRequestFailedAction(errMsg) {
  return {
    type: LOGIN_REQUEST_FAILED,
    errMsg,
  };
}

export function setLoginFormMessage(value) {
  return {
    type: SET_LOGIN_FORM_MESSAGE,
    value,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}
