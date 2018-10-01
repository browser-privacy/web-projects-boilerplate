import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import {
  loginRequestSuccessAction,
  loginRequestFailedAction,
  setLoginFormMessage,
} from './actions';
import { saveUserAuthTokensAction } from '../Auth/actions';
import { AuthApi } from '../../api/auth.api';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from './constants';

export function* loginRequest(action) {
  const { userIdentifier, password } = action.values;
  const { formik } = action;

  yield put(setLoginFormMessage(null));

  try {
    const tokens = yield call(AuthApi.login, userIdentifier, password);
    yield put(loginRequestSuccessAction(tokens));
  } catch (err) {
    let errMsg;

    switch (err.status) {
      case 401:
        errMsg = 'Invalid credentials';
        break;
      case 403:
        errMsg = 'Account desactivated';
        break;
      default:
        errMsg = `An server error ocurred. We have been notified about this error, our devs will fix it shortly.`;
        break;
    }

    formik.setSubmitting(false);
    yield put(loginRequestFailedAction(errMsg));
  }
}

export function* loginRequestSuccess(action) {
  yield put(saveUserAuthTokensAction(action.tokens));

  yield put(
    setLoginFormMessage({
      color: 'success',
      text: 'Redirecting to dashboard...',
    }),
  );

  //yield call(delay, 1500);
  //yield put(push('/dashboard/index'));
}

export function* loginRequestFailed(action) {
  yield put(
    setLoginFormMessage({
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
