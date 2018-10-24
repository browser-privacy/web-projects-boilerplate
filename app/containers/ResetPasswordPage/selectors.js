import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ResetPasswordPage state domain
 */

const selectResetPasswordPageDomain = state =>
  state.get('ResetPasswordPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectResetPasswordRequestStatus = () =>
  createSelector(selectResetPasswordPageDomain, state =>
    state.get('resetPasswordRequestStatus'),
  );

/**
 * Default selector used by ResetPasswordPage
 */

const makeSelectResetPasswordPage = () =>
  createSelector(selectResetPasswordPageDomain, substate => substate.toJS());

export default makeSelectResetPasswordPage;
export { selectResetPasswordPageDomain, makeSelectResetPasswordRequestStatus };
