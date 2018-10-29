/*
 *
 * Auth reducer
 *
 */

/* eslint-disable no-empty */

import { fromJS } from 'immutable';

import { SET_LOGGED_STATUS, LOGOUT } from './constants';

export const initialState = fromJS({
  isLoggedIn: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_STATUS:
      return state.set('isLoggedIn', action.value);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
