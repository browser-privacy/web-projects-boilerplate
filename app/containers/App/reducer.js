/**
 *
 * AppReducer
 *
 */

import { fromJS } from 'immutable';

import {
  SET_USER_ID,
  SET_USER_USERNAME,
  SET_USER_EMAIL,
  SET_IS_USER_EMAIL_CONFIRMED,
} from './constants';

const initialState = fromJS({
  _id: null,
  username: null,
  email: null,
  isEmailConfirmed: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return state.set('_id', action.value);
    case SET_USER_USERNAME:
      return state.set('username', action.value);
    case SET_USER_EMAIL:
      return state.set('email', action.value);
    case SET_IS_USER_EMAIL_CONFIRMED:
      return state.set('isEmailConfirmed', action.value);
    default:
      return state;
  }
}

export default appReducer;
