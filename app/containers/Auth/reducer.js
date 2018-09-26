/*
 *
 * LanguageProvider reducer
 *
 */

/* eslint-disable no-empty */

import { fromJS } from 'immutable';

import { SET_LOGGED_STATUS, SET_USER_USERNAME, LOGOUT } from './constants';

export const initialState = fromJS({
  isLogged: false,
  username: null,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_STATUS:
      return state.set('isLogged', action.value);
    case SET_USER_USERNAME:
      try {
        localStorage.setItem('username', action.value);
      } catch (e) {}

      return state.set('username', action.value);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
