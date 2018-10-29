import { takeLatest, put, call } from 'redux-saga/effects';

import {
  CONTACT_REQUEST,
  CONTACT_REQUEST_SUCCESS,
  CONTACT_REQUEST_FAILED,
} from './constants';
import {
  contactRequestSuccessAction,
  contactRequestFailedAction,
  setContactRequestStatusAction,
  setRecaptchaResponseAction,
} from './actions';
import { CoreApi } from '../../api';

export function* contactRequest(action) {
  const { name, email, message, recaptchaResponse } = action.values;
  const { formik, recaptcha } = action;

  yield put(setContactRequestStatusAction(null));
  try {
    yield call(CoreApi.contact, name, email, message, recaptchaResponse);

    formik.setSubmitting(false);
    formik.resetForm();

    yield put(contactRequestSuccessAction());
  } catch (err) {
    yield put(setRecaptchaResponseAction(''));
    recaptcha.reset();

    formik.setSubmitting(false);
    yield put(contactRequestFailedAction());
  }
}
export function* contactRequestSuccess() {
  yield put(setContactRequestStatusAction('OK'));
}
export function* contactRequestFailed() {
  yield put(setContactRequestStatusAction('ERROR'));
}

export default function* defaultSaga() {
  yield takeLatest(CONTACT_REQUEST, contactRequest);
  yield takeLatest(CONTACT_REQUEST_SUCCESS, contactRequestSuccess);
  yield takeLatest(CONTACT_REQUEST_FAILED, contactRequestFailed);
}
