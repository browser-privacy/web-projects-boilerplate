/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { RESET_STATE, SET_LOGIN_FORM_MESSAGE } from './constants';

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_FORM_MESSAGE:
      return state.set('formMsg', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default loginPageReducer;
