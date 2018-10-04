/*
 *
 * RegisterPage actions
 *
 */

import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  SET_REGISTER_FORM_MESSAGE,
  RESET_STATE,
} from './constants';

export function registerRequestAction(values, formikActions) {
  return {
    type: REGISTER_REQUEST,
    values,
    formikActions,
  };
}

export function registerRequestSuccessAction(tokens) {
  return {
    type: REGISTER_REQUEST_SUCCESS,
    tokens,
  };
}

export function registerRequestFailedAction(errMsg) {
  return {
    type: REGISTER_REQUEST_FAILED,
    errMsg,
  };
}

export function setLoginFormMessage(value) {
  return {
    type: SET_REGISTER_FORM_MESSAGE,
    value,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}
