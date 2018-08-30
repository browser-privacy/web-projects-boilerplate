import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);
/**
 * Other specific selectors
 */

const makeSelectSendingRequest = () =>
  createSelector(selectLoginPageDomain, state => state.get('sendingRequest'));

const makeSelectIdentifier = () =>
  createSelector(selectLoginPageDomain, state => state.get('identifier'));

const makeSelectPassword = () =>
  createSelector(selectLoginPageDomain, state => state.get('password'));

const makeSelectFormMessage = () =>
  createSelector(selectLoginPageDomain, state => state.get('formMessage'));

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());

export {
  makeSelectLoginPage,
  selectLoginPageDomain,
  makeSelectSendingRequest,
  makeSelectIdentifier,
  makeSelectPassword,
  makeSelectFormMessage,
};
