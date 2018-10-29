import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Auth state domain
 */

const selectAuthDomain = state => state.get('auth', initialState);
/**
 * Other specific selectors
 */

const makeSelectIsLoggedIn = () =>
  createSelector(selectAuthDomain, state => state.get('isLoggedIn'));

export { makeSelectIsLoggedIn };
