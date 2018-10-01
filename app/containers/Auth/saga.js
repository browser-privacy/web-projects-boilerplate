import { takeLatest } from 'redux-saga/effects';
import { SAVE_USER_AUTH_TOKENS } from './constants';

export function* saveUserAuthTokens(action) {
  console.log('BIEN!');
  localStorage.setItem('access_token', action.tokens.access_token);
  localStorage.setItem('refresh_token', action.tokens.access_token);
}

export default function* defaultSaga() {
  yield takeLatest(SAVE_USER_AUTH_TOKENS, saveUserAuthTokens);
}
