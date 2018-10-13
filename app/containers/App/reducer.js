/**
 *
 * AppReducer
 *
 */

import { fromJS } from 'immutable';

import { SET_USER_USERNAME, SET_USER_EMAIL } from './constants';

const initialState = fromJS({
  username: null,
  email: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_USERNAME:
      return state.set('username', action.value);
    case SET_USER_EMAIL:
      return state.set('email', action.value);
    default:
      return state;
  }
}

export default appReducer;
