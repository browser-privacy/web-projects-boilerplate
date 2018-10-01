/*
 *
 * Auth actions
 *
 */

import { SET_LOGGED_STATUS, SAVE_USER_AUTH_TOKENS, LOGOUT } from './constants';

export function setLoggedStatusAction(value) {
  return {
    type: SET_LOGGED_STATUS,
    value,
  };
}

export function saveUserAuthTokensAction(tokens) {
  return {
    type: SAVE_USER_AUTH_TOKENS,
    tokens,
  };
}

export function logOutAction() {
  return {
    type: LOGOUT,
  };
}
