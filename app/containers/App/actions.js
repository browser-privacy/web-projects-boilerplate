/*
 *
 * Auth actions
 *
 */

import {
  SET_USER_USERNAME,
  SET_USER_EMAIL,
  SET_IS_USER_EMAIL_CONFIRMED,
} from './constants';

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
