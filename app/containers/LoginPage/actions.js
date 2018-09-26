/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST } from './constants';

export function loginRequestAction(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}
