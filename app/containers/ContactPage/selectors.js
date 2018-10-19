import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the contactPage state domain
 */

const selectContactPageDomain = state => state.get('contactPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ContactPage
 */

const makeSelectContactPage = () =>
  createSelector(selectContactPageDomain, substate => substate.toJS());

export default makeSelectContactPage;
export { selectContactPageDomain };
