import { takeLatest } from 'redux-saga/effects';
import {} from './actions';
// import { AuthApi } from '../../api';
import { REGISTER_REQUEST } from './constants';

export function* registerRequest(action) {
  console.log(action);
  console.log('GOTCHA IT!');
}

export default function* defaultSaga() {
  yield takeLatest(REGISTER_REQUEST, registerRequest);
}
