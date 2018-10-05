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
  SET_RECAPTCHA_RESPONSE,
  RESET_STATE,
} from './constants';

export function registerRequestAction(values, formik, recaptcha) {
  return {
    type: REGISTER_REQUEST,
    values,
    formik,
    recaptcha,
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

export function setRegisterFormMessageAction(value) {
  return {
    type: SET_REGISTER_FORM_MESSAGE,
    value,
  };
}

export function setRecaptchaResponseAction(value) {
  return {
    type: SET_RECAPTCHA_RESPONSE,
    value,
  };
}

export function resetStateAction() {
  return {
    type: RESET_STATE,
  };
}
