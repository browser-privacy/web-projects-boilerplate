import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the supportPage state domain
 */

const selectSupportPageDomain = state => state.get('supportPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SupportPage
 */

const makeSelectSupportPage = () =>
  createSelector(selectSupportPageDomain, substate => substate.toJS());

export default makeSelectSupportPage;
export { selectSupportPageDomain };
