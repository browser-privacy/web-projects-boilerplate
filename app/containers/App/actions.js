/*
 *
 * Auth actions
 *
 */

import { SET_USER_USERNAME } from './constants';

export function setUsernameAction(value) {
  return {
    type: SET_USER_USERNAME,
    value,
  };
}
