/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  SET_RESET_PASSWORD_REQUEST_STATUS,
  RESET_STATE,
} from './constants';

export function resetPasswordRequestAction(values, formik) {
  return {
    type: RESET_PASSWORD_REQUEST,
    values,
    formik,
  };
}

export function resetPasswordRequestSuccessAction() {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
  };
}

export function resetPasswordRequestFailedAction() {
  return {
    type: RESET_PASSWORD_REQUEST_FAILED,
  };
}

export function setResetPasswordRequestStatusAction(value) {
  return {
    type: SET_RESET_PASSWORD_REQUEST_STATUS,
    value,
  };
}

export function resetStateAction() {
  return {
    type: RESET_STATE,
  };
}
