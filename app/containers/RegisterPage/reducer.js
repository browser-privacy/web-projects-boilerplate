/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  SET_REGISTER_FORM_MESSAGE,
  SET_RECAPTCHA_RESPONSE,
  RESET_STATE,
} from './constants';

export const initialState = fromJS({});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return state;
    case REGISTER_REQUEST_SUCCESS:
      return state;
    case REGISTER_REQUEST_FAILED:
      return state;
    case SET_REGISTER_FORM_MESSAGE:
      return state.set('serverErrMsg', action.value);
    case SET_RECAPTCHA_RESPONSE:
      return state.set('recaptchaResponse', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default registerPageReducer;
