/*
 *
 * Auth actions
 *
 */

import { SET_USER_USERNAME, SET_USER_EMAIL } from './constants';

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
