/**
 *
 * Auth
 *
 */

import JWTDecode from 'jwt-decode';
import api from '../../services/api';
import {
  setLoggedStatus,
  setUserUsername,
  setAccessToken,
  setRefreshToken,
} from './actions';

export function authenticationOnAppInit(store) {
  let accessToken;
  let refreshToken;

  function logInUser() {
    store.dispatch(setAccessToken(accessToken));
    store.dispatch(setRefreshToken(refreshToken));
    store.dispatch(setUserUsername(JWTDecode(accessToken).username));
    store.dispatch(setLoggedStatus(true));
  }
  function validateJSONWebToken(token) {
    try {
      const isExpired = JWTDecode(token).exp < Date.now() / 1000;
      if (isExpired) return 'EXPIRED';

      return 'OK';
    } catch (e) {
      return 'INVALID_TOKEN';
    }
  }
  function scheduleAccessTokenRenewal() {
    const getDiffTimeInSeconds = Date.now() - JWTDecode(accessToken).exp;
    console.log(getDiffTimeInSeconds);

    if (getDiffTimeInSeconds <= 600) {
      return api.refreshAccessToken(refreshToken).then(newAccessToken => {
        console.log('access_token renewed');
        accessToken = newAccessToken;

        logInUser();
        scheduleAccessTokenRenewal();
      });
    }

    return setTimeout(() => {
      api.refreshAccessToken(refreshToken).then(newAccessToken => {
        console.log('access_token renewed');
        accessToken = newAccessToken;

        logInUser();
        scheduleAccessTokenRenewal();
      });
    }, 600000);
  }

  try {
    accessToken = localStorage.getItem('access_token');
    refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) return;

    const accessTokenStatus = validateJSONWebToken(accessToken);
    const refreshTokenStatus = validateJSONWebToken(refreshToken);

    if (accessTokenStatus === 'OK' && refreshTokenStatus === 'OK') {
      logInUser();
      scheduleAccessTokenRenewal();
    } else if (accessTokenStatus === 'EXPIRED' && refreshTokenStatus === 'OK') {
      api.refreshAccessToken(refreshToken).then(newAccessToken => {
        accessToken = newAccessToken;

        logInUser();
        scheduleAccessTokenRenewal();
      });
    }
  } catch (e) {
    console.log('JWT authentication error');
    throw e;
  }
}
