/*
 *
 * ForgotPasswordPage actions
 *
 */

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
  SET_RECAPTCHA_RESPONSE,
  RESET_STATE,
  SET_FORGOT_PASSWORD_REQUEST_STATUS,
} from './constants';

export function forgotPasswordRequestAction(values, formik, recaptcha) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    values,
    formik,
    recaptcha,
  };
}

export function forgotPasswordRequestSuccessAction() {
  return {
    type: FORGOT_PASSWORD_REQUEST_SUCCESS,
  };
}

export function forgotPasswordRequestFailedAction() {
  return {
    type: FORGOT_PASSWORD_REQUEST_FAILED,
  };
}

export function setForgotPasswordRequestStatusAction(value) {
  return {
    type: SET_FORGOT_PASSWORD_REQUEST_STATUS,
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
