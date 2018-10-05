import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  loginRequestSuccessAction,
  loginRequestFailedAction,
  setLoginFormMessageAction,
} from './actions';
import {
  loadUserFromTokenAction,
  saveUserAuthTokensAction,
} from '../Auth/actions';
import {} from '../App/actions';
import { AuthApi } from '../../api';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from './constants';

export function* loginRequest(action) {
  const { userIdentifier, password } = action.values;
  const { formikActions } = action;

  yield put(setLoginFormMessageAction(null));

  try {
    const tokens = yield call(AuthApi.login, userIdentifier, password);
    yield put(loginRequestSuccessAction(tokens));
  } catch (err) {
    let errMsg;

    switch (err.status) {
      case 403:
        errMsg = 'Invalid credentials';
        break;
      case 423:
        errMsg = 'Account desactivated';
        break;
      default:
        errMsg = `An server error ocurred. We have been notified about this error, our devs will fix it shortly.`;
        break;
    }

    formikActions.setSubmitting(false);
    yield put(loginRequestFailedAction(errMsg));
  }
}

export function* loginRequestSuccess(action) {
  yield put(saveUserAuthTokensAction(action.tokens));

  yield put(
    setLoginFormMessageAction({
      color: 'success',
      text: 'Redirecting to dashboard...',
    }),
  );

  yield call(delay, 1300);
  yield put(loadUserFromTokenAction());
  yield;
}

export function* loginRequestFailed(action) {
  yield put(
    setLoginFormMessageAction({
      color: 'danger',
      text: action.errMsg,
    }),
  );
}

export default function* defaultSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(LOGIN_REQUEST_SUCCESS, loginRequestSuccess);
  yield takeLatest(LOGIN_REQUEST_FAILED, loginRequestFailed);
}
