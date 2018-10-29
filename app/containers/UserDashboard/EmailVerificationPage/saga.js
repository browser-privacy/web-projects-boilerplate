import { takeLatest, call, select, put } from 'redux-saga/effects';
import { LocalStorageApi } from 'api/vendors';

import { EMAIL_VERIFICATION_CHECK } from './constants';
import { makeSelectId } from '../../App/selectors';
import { CoreApi } from '../../../api';
import {
  setIsUserEmailConfirmedAction,
  persistUserAction,
} from '../../App/actions';

export function* onEmailVerificationCheck() {
  const userId = yield select(makeSelectId());

  try {
    const req = yield call(CoreApi.isUserEmailConfirmed, userId);
    const emailStatus = req.data;

    if (emailStatus === true) {
      const user = JSON.parse(LocalStorageApi.getItem('user'));
      user.isEmailConfirmed = true;

      yield put(persistUserAction(user));
      yield put(setIsUserEmailConfirmedAction(true));
    }
  } catch (_) {
    console.error('Error trying to check if user email is confirmed');
  }
}

export default function* defaultSaga() {
  yield takeLatest(EMAIL_VERIFICATION_CHECK, onEmailVerificationCheck);
}
