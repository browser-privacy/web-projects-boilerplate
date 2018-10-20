/*
 *
 * ContactPage actions
 *
 */

import {
  CONTACT_REQUEST,
  SET_CONTACT_REQUEST_STATUS,
  CONTACT_REQUEST_SUCCESS,
  CONTACT_REQUEST_FAILED,
  RESET_STATE,
  SET_RECAPTCHA_RESPONSE,
} from './constants';

export function contactRequestAction(values, formik, recaptcha) {
  return {
    type: CONTACT_REQUEST,
    values,
    formik,
    recaptcha,
  };
}

export function contactRequestSuccessAction() {
  return {
    type: CONTACT_REQUEST_SUCCESS,
  };
}

export function contactRequestFailedAction() {
  return {
    type: CONTACT_REQUEST_FAILED,
  };
}

export function setContactRequestStatusAction(value) {
  return {
    type: SET_CONTACT_REQUEST_STATUS,
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
