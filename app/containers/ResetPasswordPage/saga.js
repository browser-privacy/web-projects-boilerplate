import { takeLatest, call, put } from 'redux-saga/effects';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
} from './constants';
import {
  resetPasswordRequestSuccessAction,
  resetPasswordRequestFailedAction,
  setResetPasswordRequestStatusAction,
} from './actions';
import { AuthApi } from '../../api';

export function* resetPasswordRequest(action) {
  const { token, password } = action.values;
  const { formik } = action;

  yield put(setResetPasswordRequestStatusAction(null));

  try {
    yield call(AuthApi.resetPassword, token, password);

    formik.setSubmitting(false);
    formik.resetForm();

    yield put(resetPasswordRequestSuccessAction());
  } catch (err) {
    formik.setSubmitting(false);
    yield put(resetPasswordRequestFailedAction());
  }
}

export function* resetPasswordRequestSuccess() {
  yield put(setResetPasswordRequestStatusAction('OK'));
}
export function* resetPasswordRequestFailed() {
  yield put(setResetPasswordRequestStatusAction('ERR'));
}

export default function* defaultSaga() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordRequest);
  yield takeLatest(RESET_PASSWORD_REQUEST_SUCCESS, resetPasswordRequestSuccess);
  yield takeLatest(RESET_PASSWORD_REQUEST_FAILED, resetPasswordRequestFailed);
}
