/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';

import { LOGIN_REQUEST } from './constants';

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    default:
      return state;
  }
}

export default loginPageReducer;
