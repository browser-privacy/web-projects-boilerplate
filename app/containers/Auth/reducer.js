/*
 *
 * Auth reducer
 *
 */

/* eslint-disable no-empty */

import { fromJS } from 'immutable';

import { SET_LOGGED_STATUS, SAVE_USER_AUTH_TOKENS, LOGOUT } from './constants';

export const initialState = fromJS({
  isLogged: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_STATUS:
      return state.set('isLogged', action.value);
    case SAVE_USER_AUTH_TOKENS:
      return state;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
