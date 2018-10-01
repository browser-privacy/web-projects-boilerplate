/**
 *
 * Auth
 *
 */

import JWTDecode from 'jwt-decode';
import { setLoggedStatusAction } from './actions';

export function initAuthenticationMechanism(store) {
  let accessToken;
  let refreshToken;

  function authenticateUser() {
    // store.dispatch(setUserUsername(JWTDecode(accessToken).user.username));
    store.dispatch(setLoggedStatusAction(true));
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

  try {
    accessToken = localStorage.getItem('access_token');
    refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) return;

    const accessTokenStatus = validateJSONWebToken(accessToken);
    const refreshTokenStatus = validateJSONWebToken(refreshToken);

    if (accessTokenStatus !== 'INVALID_TOKEN' && refreshTokenStatus === 'OK')
      authenticateUser();
  } catch (e) {
    throw e;
  }
}
