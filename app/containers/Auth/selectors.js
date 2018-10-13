import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Auth state domain
 */

const selectAuthDomain = state => state.get('auth', initialState);
/**
 * Other specific selectors
 */

const makeSelectIsLogged = () =>
  createSelector(selectAuthDomain, state => state.get('isLogged'));

export { makeSelectIsLogged };
