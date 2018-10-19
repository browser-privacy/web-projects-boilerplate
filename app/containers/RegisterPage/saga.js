import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  registerRequestSuccessAction,
  registerRequestFailedAction,
  setRegisterFormMessageAction,
  setRecaptchaResponseAction,
} from './actions';
import { LOAD_USER_FROM_TOKEN_SUCCESS } from '../Auth/constants';
import {
  loadUserFromTokenAction,
  saveUserAuthTokensAction,
} from '../Auth/actions';
import { AuthApi } from '../../api';
import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
} from './constants';

export function* registerRequest(action) {
  const { email, username, password, recaptchaResponse } = action.values;
  const { formik, recaptcha } = action;

  yield put(setRegisterFormMessageAction(''));

  try {
    const tokens = yield call(
      AuthApi.register,
      email,
      username,
      password,
      recaptchaResponse,
    );

    yield put(registerRequestSuccessAction(tokens));
  } catch (err) {
    let errMsg =
      'An server error ocurred. We have been notified about this error, our devs will fix it shortly.';

    if (err) {
      switch (err.status) {
        case 400:
          Object.keys(err.data).forEach(k => {
            formik.setFieldError(err.data[k].path, err.data[k].message);
          });
          break;
        case 403:
          errMsg = `Submitted captcha is not valid.`;
          break;
        default:
          errMsg = err.message || errMsg;
          break;
      }
    }

    yield put(setRecaptchaResponseAction(''));
    recaptcha.reset();

    formik.setSubmitting(false);
    yield put(registerRequestFailedAction(errMsg));
  }
}

export function* registerRequestSuccess(action) {
  yield put(saveUserAuthTokensAction(action.tokens));
  yield put(loadUserFromTokenAction());
}

export function* registerRequestFailed(action) {
  if (action.errMsg) yield put(setRegisterFormMessageAction(action.errMsg));
}

export function* loadUserFromTokenSuccess() {
  yield put(push('/dashboard/index'));
}

export default function* defaultSaga() {
  yield takeLatest(REGISTER_REQUEST, registerRequest);
  yield takeLatest(REGISTER_REQUEST_SUCCESS, registerRequestSuccess);
  yield takeLatest(REGISTER_REQUEST_FAILED, registerRequestFailed);
  yield takeLatest(LOAD_USER_FROM_TOKEN_SUCCESS, loadUserFromTokenSuccess);
}
