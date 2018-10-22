import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPasswordPage state domain
 */

const selectForgotPasswordPageDomain = state =>
  state.get('forgotPasswordPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectForgotPasswordRequestStatus = () =>
  createSelector(selectForgotPasswordPageDomain, state =>
    state.get('forgotPasswordRequestStatus'),
  );

const makeSelectRecaptchaResponse = () =>
  createSelector(selectForgotPasswordPageDomain, state =>
    state.get('recaptchaResponse'),
  );

/**
 * Default selector used by ForgotPasswordPage
 */

const makeSelectForgotPasswordPage = () =>
  createSelector(selectForgotPasswordPageDomain, substate => substate.toJS());

export default makeSelectForgotPasswordPage;
export {
  selectForgotPasswordPageDomain,
  makeSelectForgotPasswordRequestStatus,
  makeSelectRecaptchaResponse,
};
