/*
 *
 * Auth actions
 *
 */

import {
  LOAD_USER,
  PERSIST_USER,
  SET_USER_ID,
  SET_USER_USERNAME,
  SET_USER_EMAIL,
  SET_IS_USER_EMAIL_CONFIRMED,
} from './constants';

export function persistUserAction(user) {
  return {
    type: PERSIST_USER,
    user,
  };
}

export function loadUserAction(user) {
  return {
    type: LOAD_USER,
    user,
  };
}

export function setUserIdAction(value) {
  return {
    type: SET_USER_ID,
    value,
  };
}

export function setUsernameAction(value) {
  return {
    type: SET_USER_USERNAME,
    value,
  };
}

export function setUserEmailAction(value) {
  return {
    type: SET_USER_EMAIL,
    value,
  };
}

export function setIsUserEmailConfirmedAction(value) {
  return {
    type: SET_IS_USER_EMAIL_CONFIRMED,
    value,
  };
}
