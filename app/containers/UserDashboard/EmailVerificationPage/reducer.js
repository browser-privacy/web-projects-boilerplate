/*
 *
 * EmailVerificationPage reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function emailVerificationPageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default emailVerificationPageReducer;
