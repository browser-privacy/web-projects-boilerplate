import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the emailConfirmationPage state domain
 */

const selectEmailConfirmationPageDomain = state =>
  state.get('emailConfirmationPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectEmailConfirmationRequestStatus = () =>
  createSelector(selectEmailConfirmationPageDomain, state =>
    state.get('status'),
  );

/**
 * Default selector used by EmailConfirmationPage
 */

const makeSelectEmailConfirmationPage = () =>
  createSelector(selectEmailConfirmationPageDomain, substate =>
    substate.toJS(),
  );

export default makeSelectEmailConfirmationPage;
export {
  selectEmailConfirmationPageDomain,
  makeSelectEmailConfirmationRequestStatus,
};
