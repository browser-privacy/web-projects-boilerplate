/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SENDING_REQUEST,
  LOGIN_FORM_MESSAGE,
  LOGIN_ON_INPUT_CHANGE,
  LOGIN_CHANGE_IDENTIFIER,
  LOGIN_CHANGE_PASSWORD,
} from './constants';

export const initialState = fromJS({
  sendingRequest: false,
  identifier: '',
  password: '',
  formMessage: {
    show: false,
    color: '',
    text: '',
  },
});

function loginPageReducer(state = initialState, action) {
  let persistObj;

  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SENDING_REQUEST:
      return state.set('sendingRequest', action.data);
    case LOGIN_FORM_MESSAGE:
      persistObj = {
        show: action.data.show,
        color: action.data.color,
        text: action.data.text,
      };

      // Delete null keys from persistObj
      Object.keys(persistObj).forEach(
        key => persistObj[key] == null && delete persistObj[key],
      );

      return state.set('formMessage', persistObj);
    case LOGIN_ON_INPUT_CHANGE:
      return state.set(action.data.name, action.data.value);
    case LOGIN_CHANGE_IDENTIFIER:
    case LOGIN_CHANGE_PASSWORD:
      return state.set(action.stateKeyName, action.value);
    default:
      return state;
  }
}

export default loginPageReducer;
