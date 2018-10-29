import { createSelector } from 'reselect';

const selectAppDomain = state => state.get('app');

const makeSelectId = () =>
  createSelector(selectAppDomain, appState => appState.get('_id'));
const makeSelectUsername = () =>
  createSelector(selectAppDomain, appState => appState.get('username'));
const makeSelectEmail = () =>
  createSelector(selectAppDomain, appState => appState.get('email'));
const makeSelectIsEmailConfirmed = () =>
  createSelector(selectAppDomain, appState => appState.get('isEmailConfirmed'));

const selectRouteDomain = state => state.get('route');
const makeSelectLocation = () =>
  createSelector(selectRouteDomain, routeState =>
    routeState.get('location').toJS(),
  );

export {
  makeSelectId,
  makeSelectUsername,
  makeSelectEmail,
  makeSelectIsEmailConfirmed,
  makeSelectLocation,
};
