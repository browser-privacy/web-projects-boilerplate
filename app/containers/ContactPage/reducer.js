/*
 *
 * ContactPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RESET_STATE,
  SET_RECAPTCHA_RESPONSE,
  SET_CONTACT_REQUEST_STATUS,
} from './constants';

export const initialState = fromJS({});

function contactPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACT_REQUEST_STATUS:
      return state.set('contactRequestStatus', action.value);
    case SET_RECAPTCHA_RESPONSE:
      return state.set('recaptchaResponse', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default contactPageReducer;
