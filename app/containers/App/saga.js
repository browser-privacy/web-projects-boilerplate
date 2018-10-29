import { takeLatest, put } from 'redux-saga/effects';

import { LocalStorageApi } from 'api/vendors';

import { LOAD_USER, PERSIST_USER } from './constants';
import {
  setUserIdAction,
  setUserEmailAction,
  setUsernameAction,
  setIsUserEmailConfirmedAction,
} from './actions';
import { setLoggedStatusAction } from '../Auth/actions';

export function* loadUser(action) {
  const { user } = action;

  const { _id, username, email, isEmailConfirmed } = user;
  yield put(setUserIdAction(_id));
  yield put(setUsernameAction(username));
  yield put(setUserEmailAction(email));
  yield put(setIsUserEmailConfirmedAction(isEmailConfirmed));

  yield put(setLoggedStatusAction(true));
}

export function* persistUser(action) {
  LocalStorageApi.setItem('user', JSON.stringify(action.user));
}

export function* defaultSaga() {
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(PERSIST_USER, persistUser);
}

export default [defaultSaga];
