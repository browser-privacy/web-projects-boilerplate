/**
 *
 * Auth
 *
 */

import {
  setLoggedStatus,
  setUserUsername,
  setAccessToken,
  setRefreshToken,
} from './actions';

export function authenticationOnAppInit(store) {
  try {
    const userUsername = localStorage.getItem('username');
    const userAccessToken = localStorage.getItem('access_token');
    const userRefreshToken = localStorage.getItem('refresh_token');

    if (!(userUsername || userAccessToken || userRefreshToken)) return;

    store.dispatch(setLoggedStatus(true));
    store.dispatch(setAccessToken(userAccessToken));
    store.dispatch(setRefreshToken(userRefreshToken));

    store.dispatch(setUserUsername(userUsername));
  } catch (e) {
    throw e;
  }
}
