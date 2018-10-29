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

const makeSelectSuccessfullyRegistered = () =>
  createSelector(selectRegisterPageDomain, state =>
    state.get('successfullyRegistered'),
  );

const makeSelectRecaptchaResponse = () =>
  createSelector(selectRegisterPageDomain, state =>
    state.get('recaptchaResponse'),
  );

const makeSelectResetRecaptcha = () =>
  createSelector(selectRegisterPageDomain, state =>
    state.get('resetRecaptcha'),
  );

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(selectRegisterPageDomain, substate => substate.toJS());

export {
  selectRegisterPageDomain,
  makeSelectRegisterPage,
  makeSelectSuccessfullyRegistered,
  makeSelectServerErrMsg,
  makeSelectRecaptchaResponse,
  makeSelectResetRecaptcha,
};
