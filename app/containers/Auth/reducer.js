/*
 *
 * LanguageProvider reducer
 *
 */

/* eslint-disable no-empty */

import { fromJS } from 'immutable';

import {
  SET_LOGGED_STATUS,
  SET_USER_USERNAME,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  LOGOUT,
} from './constants';

export const initialState = fromJS({
  access_token: null,
  refresh_token: null,
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
    case SET_ACCESS_TOKEN:
      try {
        localStorage.setItem('access_token', action.value);
      } catch (e) {}

      return state.set('access_token', action.value);
    case SET_REFRESH_TOKEN:
      try {
        localStorage.setItem('refresh_token', action.value);
      } catch (e) {}

      return state.set('refresh_token', action.value);
    case LOGOUT:
      // @TODO: Delete specified items from localStorage instead of wipe up all storage?
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
