/*
 *
 * EmailConfirmationPage actions
 *
 */

import {
  EMAIL_CONFIRMATION_REQUEST,
  EMAIL_CONFIRMATION_REQUEST_SUCCESS,
  EMAIL_CONFIRMATION_REQUEST_FAILED,
  SET_EMAIL_CONFIRMATION_REQUEST_STATUS,
  RESET_STATE,
} from './constants';

export function emailConfirmationRequestAction(token) {
  return {
    type: EMAIL_CONFIRMATION_REQUEST,
    token,
  };
}

export function emailConfirmationRequestSuccessAction() {
  return {
    type: EMAIL_CONFIRMATION_REQUEST_SUCCESS,
  };
}

export function emailConfirmationRequestFailedAction() {
  return {
    type: EMAIL_CONFIRMATION_REQUEST_FAILED,
  };
}

export function setEmailConfirmationRequestStatusAction(value) {
  return {
    type: SET_EMAIL_CONFIRMATION_REQUEST_STATUS,
    value,
  };
}

export function resetStateAction() {
  return {
    type: RESET_STATE,
  };
}
