import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  registerRequestSuccessAction,
  registerRequestFailedAction,
  setRegisterFormMessageAction,
  setRecaptchaResponseAction,
} from './actions';
import {
  loadUserFromTokenAction,
  setAccessTokenAction,
  setRefreshTokenAction,
} from '../Auth/actions';
import { AuthApi } from '../../api';
import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUEST_SUCCESS,
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
          errMsg = null;
          break;
        case 403:
          errMsg = `Captcha is not valid, please try it again.`;
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

export function* registerRequestFailed(action) {
  if (action.errMsg) yield put(setRegisterFormMessageAction(action.errMsg));
}

export function* registerRequestSuccess(action) {
  yield put(setAccessTokenAction(action.tokens.access_token));
  yield put(setRefreshTokenAction(action.tokens.refresh_token));

  yield put(loadUserFromTokenAction());

  yield put(push('/dashboard'));
}

export default function* defaultSaga() {
  yield takeLatest(REGISTER_REQUEST, registerRequest);
  yield takeLatest(REGISTER_REQUEST_FAILED, registerRequestFailed);
  yield takeLatest(REGISTER_REQUEST_SUCCESS, registerRequestSuccess);
}
