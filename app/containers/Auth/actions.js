/*
 *
 * Auth actions
 *
 */

import {
  SET_LOGGED_STATUS,
  SET_USER_USERNAME,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  LOGOUT,
} from './constants';

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

export function setAccessToken(value) {
  return {
    type: SET_ACCESS_TOKEN,
    value,
  };
}

export function setRefreshToken(value) {
  return {
    type: SET_REFRESH_TOKEN,
    value,
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}
