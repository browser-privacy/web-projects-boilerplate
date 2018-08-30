import { fork, call, race, put, take, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import JWTDecode from 'jwt-decode';
import api from '../../services/api';
import { LOGIN_REQUEST, LOGIN_LOGOUT_REQUEST } from './constants';
import { makeSelectIdentifier, makeSelectPassword } from './selectors';
import { makeSelectLocation } from '../App/selectors';
import {
  loginSendingRequestAction,
  loginFormMessageAction,
  loginChangeIdentifierAction,
  loginChangePasswordAction,
} from './actions';
import {
  setLoggedStatus,
  setAccessToken,
  setRefreshToken,
  setUserUsername,
} from '../Auth/actions';

const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Effect to handle authorization
 * @param  {string} identifier             The identifier of the user (Email or username)
 * @param  {string} password               The password of the user
 */
export function* login(identifier, password) {
  yield put(
    loginFormMessageAction({
      show: false,
    }),
  );
  yield put(loginSendingRequestAction(true));

  // We then try to log in
  try {
    const response = yield call(api.login, identifier, password);
    if (response.message === 'error_server') {
      yield put(
        loginFormMessageAction({
          show: true,
          color: 'danger',
          text: `Server error: ${response.error.message}`,
        }),
      );

      return { success: false };
    }
    if (response.message === 'already_logged') return { success: false };
    if (response.message === 'invalid_credentials') {
      yield put(
        loginFormMessageAction({
          show: true,
          color: 'danger',
          text: `Error: Invalid credentials.`,
        }),
      );

      return { success: false };
    }

    yield put(setAccessToken(response.data.access_token));
    yield put(setRefreshToken(response.data.refresh_token));
    yield put(setUserUsername(JWTDecode(response.data.access_token).username));

    return { success: true };
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put(
      loginFormMessageAction({
        show: true,
        color: 'danger',
        text: `Unexpected error: ${error.message}`,
      }),
    );

    return { success: false };
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put(loginSendingRequestAction(false));
  }
}

export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    yield take(LOGIN_REQUEST);
    const userIdentifier = yield select(makeSelectIdentifier());
    const password = yield select(makeSelectPassword());

    // A `LOGOUT` action may happen while the `login` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(login, userIdentifier, password),
      logout: take(LOGIN_LOGOUT_REQUEST),
    });

    // If `login` was the winner...
    if (winner.auth) {
      if (winner.auth.success) {
        yield put(
          loginFormMessageAction({
            show: true,
            color: 'success',
            text: `Redirecting to dashboard ...`,
          }),
        );

        yield delay(800);

        yield put(setLoggedStatus(true));
        yield put(
          loginFormMessageAction({
            show: true,
            color: '',
            text: '',
          }),
        );
        yield put(loginChangeIdentifierAction(''));
        yield put(loginChangePasswordAction(''));

        // @TODO: Refactor this.
        // Check if ref exists then redirect to it instead of redirect to index
        let redirectToReferrer = null;

        try {
          redirectToReferrer = yield select(makeSelectLocation());
          if (redirectToReferrer.state) {
            if (redirectToReferrer.state.from) {
              redirectToReferrer = redirectToReferrer.state.from;
            } else {
              redirectToReferrer = null;
            }
          } else {
            redirectToReferrer = null;
          }
        } catch (e) {
          throw e;
        } finally {
          if (redirectToReferrer) {
            yield put(push(redirectToReferrer));
          } else {
            yield put(push('/dashboard/index'));
          }
        }
      }
    }
  }
}

export default function* root() {
  yield fork(loginFlow);
}
