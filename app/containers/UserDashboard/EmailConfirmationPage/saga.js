import { takeLatest, call, put } from 'redux-saga/effects';

import {
  EMAIL_CONFIRMATION_REQUEST,
  EMAIL_CONFIRMATION_REQUEST_SUCCESS,
  EMAIL_CONFIRMATION_REQUEST_FAILED,
} from './constants';
import {
  emailConfirmationRequestSuccessAction,
  emailConfirmationRequestFailedAction,
  setEmailConfirmationRequestStatusAction,
} from './actions';
import { AuthApi } from '../../../api';

export function* emailConfirmationRequest(action) {
  const { token } = action;

  try {
    yield call(AuthApi.confirmEmail, token);

    yield put(emailConfirmationRequestSuccessAction());
  } catch (err) {
    yield put(emailConfirmationRequestFailedAction());
  }
}

export function* emailConfirmationRequestSuccess() {
  yield put(setEmailConfirmationRequestStatusAction('OK'));
}
export function* emailConfirmationRequestFailed() {
  yield put(setEmailConfirmationRequestStatusAction('ERR'));
}

export default function* defaultSaga() {
  yield takeLatest(EMAIL_CONFIRMATION_REQUEST, emailConfirmationRequest);
  yield takeLatest(
    EMAIL_CONFIRMATION_REQUEST_SUCCESS,
    emailConfirmationRequestSuccess,
  );
  yield takeLatest(
    EMAIL_CONFIRMATION_REQUEST_FAILED,
    emailConfirmationRequestFailed,
  );
}
