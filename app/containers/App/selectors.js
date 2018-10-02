import { createSelector } from 'reselect';

const selectAppDomain = state => state.get('app');
const makeSelectUsername = () =>
  createSelector(selectAppDomain, appState => appState.get('username'));

const selectRouteDomain = state => state.get('route');
const makeSelectLocation = () =>
  createSelector(selectRouteDomain, routeState =>
    routeState.get('location').toJS(),
  );

export { makeSelectUsername, makeSelectLocation };
