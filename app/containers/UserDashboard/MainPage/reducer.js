/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default mainPageReducer;
