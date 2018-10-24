import { takeLatest, put, call } from 'redux-saga/effects';

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
} from './constants';
import {
  forgotPasswordRequestSuccessAction,
  forgotPasswordRequestFailedAction,
  setForgotPasswordRequestStatusAction,
  setRecaptchaResponseAction,
} from './actions';
import { AuthApi } from '../../api';

export function* forgotPasswordRequest(action) {
  const { email, recaptchaResponse } = action.values;
  const { formik, recaptcha } = action;

  yield put(setForgotPasswordRequestStatusAction(null));

  try {
    yield call(AuthApi.forgotPassword, email, recaptchaResponse);

    formik.setSubmitting(false);
    formik.resetForm();

    yield put(forgotPasswordRequestSuccessAction());
  } catch (err) {
    yield put(setRecaptchaResponseAction(''));
    recaptcha.reset();

    formik.setSubmitting(false);
    yield put(forgotPasswordRequestFailedAction());
  }
}
export function* forgotPasswordRequestSuccess() {
  yield put(setForgotPasswordRequestStatusAction('OK'));
}
export function* forgotPasswordRequestFailed() {
  yield put(setForgotPasswordRequestStatusAction('ERROR'));
}

export default function* defaultSaga() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordRequest);
  yield takeLatest(
    FORGOT_PASSWORD_REQUEST_SUCCESS,
    forgotPasswordRequestSuccess,
  );
  yield takeLatest(FORGOT_PASSWORD_REQUEST_FAILED, forgotPasswordRequestFailed);
}
