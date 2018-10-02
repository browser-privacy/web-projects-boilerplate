import { takeLatest, put, call } from 'redux-saga/effects';
import JWTDecode from 'jwt-decode';
import { AuthApi } from '../../api';
import {
  SAVE_USER_AUTH_TOKENS,
  LOAD_USER_FROM_TOKEN,
  LOGOUT,
} from './constants';
import { setLoggedStatusAction } from './actions';
import { setUsernameAction } from '../App/actions';

export function* loadUserFromToken() {
  let accessToken;
  let refreshToken;

  function validateJSONWebToken(token) {
    try {
      const isExpired = JWTDecode(token).exp < Date.now() / 1000;
      if (isExpired) return 'EXPIRED';

      return 'OK';
    } catch (e) {
      return 'INVALID_TOKEN';
    }
  }

  try {
    accessToken = localStorage.getItem('access_token');
    refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) return;

    const accessTokenStatus = validateJSONWebToken(accessToken);
    const refreshTokenStatus = validateJSONWebToken(refreshToken);

    if (accessTokenStatus !== 'INVALID_TOKEN' && refreshTokenStatus === 'OK') {
      const decodedAccessToken = JWTDecode(accessToken);
      const { user } = decodedAccessToken;

      yield put(setUsernameAction(user.username));

      yield put(setLoggedStatusAction(true));
    } else {
      localStorage.clear();
    }
  } catch (e) {
    console.log(e);
  }
}

export function* saveUserAuthTokens(action) {
  localStorage.setItem('access_token', action.tokens.access_token);
  localStorage.setItem('refresh_token', action.tokens.refresh_token);
}

export function* logoutUser() {
  try {
    yield call(AuthApi.logout);
  } catch (e) {
    console.log(e);
  }

  localStorage.clear();
}

export function* defaultSaga() {
  yield takeLatest(LOAD_USER_FROM_TOKEN, loadUserFromToken);
  yield takeLatest(SAVE_USER_AUTH_TOKENS, saveUserAuthTokens);
  yield takeLatest(LOGOUT, logoutUser);
}

export default [defaultSaga];
