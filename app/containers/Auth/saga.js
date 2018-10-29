import { takeLatest, put, call } from 'redux-saga/effects';
import JWTDecode from 'jwt-decode';

import { LocalStorageApi } from '../../api/vendors';
import { AuthApi } from '../../api';
import {
  LOAD_USER_FROM_TOKEN,
  LOGOUT,
  SET_REFRESH_TOKEN,
  SET_ACCESS_TOKEN,
} from './constants';
import { loadUserAction, persistUserAction } from '../App/actions';

export function* loadUserFromToken() {
  const isLogouting = LocalStorageApi.getItem('isLogouting');
  if (isLogouting) LocalStorageApi.clear();

  let accessToken;
  let refreshToken;

  function validateJSONWebToken(token) {
    try {
      const isExpired = JWTDecode(token).exp < Date.now() / 1000;
      if (isExpired) return 'EXPIRED';

      return 'OK';
    } catch (e) {
      console.error(e);
      return 'INVALID_TOKEN';
    }
  }

  try {
    accessToken = LocalStorageApi.getItem('access_token');
    refreshToken = LocalStorageApi.getItem('refresh_token');

    if (!accessToken || !refreshToken) return;

    const accessTokenStatus = validateJSONWebToken(accessToken);
    const refreshTokenStatus = validateJSONWebToken(refreshToken);

    if (accessTokenStatus !== 'INVALID_TOKEN' && refreshTokenStatus === 'OK') {
      const user = LocalStorageApi.getItem('user');
      if (user) yield put(loadUserAction(JSON.parse(user)));
    } else {
      LocalStorageApi.clear();
    }
  } catch (e) {
    console.error(e);
  }
}

export function* setAccessToken(action) {
  LocalStorageApi.setItem('access_token', action.value);

  const decodedToken = JWTDecode(action.value);
  const { user } = decodedToken;

  yield put(persistUserAction(user));
}

export function* setRefreshToken(action) {
  LocalStorageApi.setItem('refresh_token', action.value);
}

export function* logoutUser() {
  LocalStorageApi.setItem('isLogouting', true);

  try {
    yield call(AuthApi.logout);
  } catch (e) {
    console.error(e);
  }

  LocalStorageApi.clear();
}

export function* defaultSaga() {
  yield takeLatest(LOAD_USER_FROM_TOKEN, loadUserFromToken);
  yield takeLatest(SET_ACCESS_TOKEN, setAccessToken);
  yield takeLatest(SET_REFRESH_TOKEN, setRefreshToken);
  yield takeLatest(LOGOUT, logoutUser);
}

export default [defaultSaga];
