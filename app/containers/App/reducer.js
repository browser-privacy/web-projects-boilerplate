/**
 *
 * AppReducer
 *
 */

import { fromJS } from 'immutable';

import { SET_USER_USERNAME } from './constants';

const initialState = fromJS({
  username: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_USERNAME:
      return state.set('username', action.value);
    default:
      return state;
  }
}

export default appReducer;
