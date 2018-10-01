import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());

const makeSelectFormMsg = () =>
  createSelector(selectLoginPageDomain, state => state.get('formMsg'));

export { makeSelectLoginPage, selectLoginPageDomain, makeSelectFormMsg };
