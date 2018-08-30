/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SENDING_REQUEST,
  LOGIN_FORM_MESSAGE,
  LOGIN_ON_INPUT_CHANGE,
  LOGIN_CHANGE_IDENTIFIER,
  LOGIN_CHANGE_PASSWORD,
} from './constants';

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

export function loginFormMessageAction(data) {
  return {
    type: LOGIN_FORM_MESSAGE,
    data,
  };
}

export function onInputChangeAction(data) {
  return {
    type: LOGIN_ON_INPUT_CHANGE,
    data,
  };
}

export function loginChangeIdentifierAction(value) {
  return {
    type: LOGIN_CHANGE_IDENTIFIER,
    stateKeyName: 'identifier',
    value,
  };
}

export function loginChangePasswordAction(value) {
  return {
    type: LOGIN_CHANGE_PASSWORD,
    stateKeyName: 'password',
    value,
  };
}
