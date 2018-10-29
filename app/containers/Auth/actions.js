/*
 *
 * Auth actions
 *
 */

import {
  LOAD_USER_FROM_TOKEN,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_LOGGED_STATUS,
  LOGOUT,
} from './constants';

export function loadUserFromTokenAction() {
  return {
    type: LOAD_USER_FROM_TOKEN,
  };
}

export function setAccessTokenAction(value) {
  return {
    type: SET_ACCESS_TOKEN,
    value,
  };
}

export function setRefreshTokenAction(value) {
  return {
    type: SET_REFRESH_TOKEN,
    value,
  };
}

export function setLoggedStatusAction(value) {
  return {
    type: SET_LOGGED_STATUS,
    value,
  };
}

export function logOutAction() {
  return {
    type: LOGOUT,
  };
}
