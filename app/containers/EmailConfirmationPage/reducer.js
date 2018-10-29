/*
 *
 * EmailConfirmationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_EMAIL_CONFIRMATION_REQUEST_STATUS,
  RESET_STATE,
} from './constants';

export const initialState = fromJS({
  status: 'LOADING',
});

function emailConfirmationPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL_CONFIRMATION_REQUEST_STATUS:
      return state.set('status', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default emailConfirmationPageReducer;
