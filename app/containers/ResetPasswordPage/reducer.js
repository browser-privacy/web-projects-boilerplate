/*
 *
 * ResetPasswordPage reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_RESET_PASSWORD_REQUEST_STATUS, RESET_STATE } from './constants';

export const initialState = fromJS({});

function ResetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESET_PASSWORD_REQUEST_STATUS:
      return state.set('resetPasswordRequestStatus', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default ResetPasswordPageReducer;
