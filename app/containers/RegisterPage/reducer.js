/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REGISTER_REQUEST_SUCCESS,
  SET_REGISTER_FORM_MESSAGE,
  SET_RECAPTCHA_RESPONSE,
  RESET_STATE,
} from './constants';

export const initialState = fromJS({});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST_SUCCESS:
      return state.set('successfullyRegistered', true);
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
