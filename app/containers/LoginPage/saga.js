import { put, call, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from './constants';
import { AuthApi } from '../../api/auth.api';

export function* loginRequest(action) {
  const { userIdentifier, password } = action.values;

  try {
    const tokens = yield call(AuthApi.login, userIdentifier, password);
    yield put({ type: LOGIN_REQUEST_SUCCESS, tokens });
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

    yield put({ type: LOGIN_REQUEST_FAILED, errMsg });
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
}
