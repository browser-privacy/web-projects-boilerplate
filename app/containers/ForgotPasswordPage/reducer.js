/*
 *
 * ForgotPasswordPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_FORGOT_PASSWORD_REQUEST_STATUS,
  SET_RECAPTCHA_RESPONSE,
  RESET_STATE,
} from './constants';

export const initialState = fromJS({});

function forgotPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_REQUEST_STATUS:
      return state.set('forgotPasswordRequestStatus', action.value);
    case SET_RECAPTCHA_RESPONSE:
      return state.set('recaptchaResponse', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default forgotPasswordPageReducer;
