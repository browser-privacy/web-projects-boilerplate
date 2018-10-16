import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pricingPage state domain
 */

const selectPricingPageDomain = state => state.get('pricingPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PricingPage
 */

const makeSelectPricingPage = () =>
  createSelector(selectPricingPageDomain, substate => substate.toJS());

export default makeSelectPricingPage;
export { selectPricingPageDomain };
