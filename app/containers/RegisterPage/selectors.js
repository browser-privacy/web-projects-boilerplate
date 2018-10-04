import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state =>
  state.get('registerPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectServerErrMsg = () =>
  createSelector(selectRegisterPageDomain, state => state.get('serverErrMsg'));

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(selectRegisterPageDomain, substate => substate.toJS());

export {
  selectRegisterPageDomain,
  makeSelectRegisterPage,
  makeSelectServerErrMsg,
};
