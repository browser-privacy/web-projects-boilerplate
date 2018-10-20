import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the contactPage state domain
 */

const selectContactPageDomain = state => state.get('contactPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectContactRequestStatus = () =>
  createSelector(selectContactPageDomain, state =>
    state.get('contactRequestStatus'),
  );

const makeSelectRecaptchaResponse = () =>
  createSelector(selectContactPageDomain, state =>
    state.get('recaptchaResponse'),
  );

/**
 * Default selector used by ContactPage
 */

const makeSelectContactPage = () =>
  createSelector(selectContactPageDomain, substate => substate.toJS());

export default makeSelectContactPage;
export {
  selectContactPageDomain,
  makeSelectContactRequestStatus,
  makeSelectRecaptchaResponse,
};
