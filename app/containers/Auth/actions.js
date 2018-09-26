/*
 *
 * Auth actions
 *
 */

import { SET_LOGGED_STATUS, SET_USER_USERNAME, LOGOUT } from './constants';

export function setLoggedStatus(value) {
  return {
    type: SET_LOGGED_STATUS,
    value,
  };
}

export function setUserUsername(value) {
  return {
    type: SET_USER_USERNAME,
    value,
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}
