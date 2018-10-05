import { put, call, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import {
  loginRequestSuccessAction,
  loginRequestFailedAction,
  setLoginFormMessageAction,
} from './actions';
import { LOAD_USER_FROM_TOKEN_SUCCESS } from '../Auth/constants';
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
import { makeSelectLocation } from '../App/selectors';

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
}

export function* loginRequestFailed(action) {
  yield put(
    setLoginFormMessageAction({
      color: 'danger',
      text: action.errMsg,
    }),
  );
}

export function* loadUserFromTokenSuccess() {
  const location = yield select(makeSelectLocation());
  let redirectTo = '/dashboard/index';
  if (location.state && location.state.from) {
    const { pathname, search, hash } = location.state.from;

    redirectTo = `${pathname + search + hash}`;
  }

  yield put(push(redirectTo));
}

export default function* defaultSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(LOGIN_REQUEST_SUCCESS, loginRequestSuccess);
  yield takeLatest(LOGIN_REQUEST_FAILED, loginRequestFailed);
  yield takeLatest(LOAD_USER_FROM_TOKEN_SUCCESS, loadUserFromTokenSuccess);
}
