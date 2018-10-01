/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  RESET_STATE,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SET_LOGIN_FORM_MESSAGE,
} from './constants';

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_REQUEST_SUCCESS:
      return state;
    case LOGIN_REQUEST_FAILED:
      return state;
    case SET_LOGIN_FORM_MESSAGE:
      return state.set('formMsg', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default loginPageReducer;
