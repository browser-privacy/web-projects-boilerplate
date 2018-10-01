import { createSelector } from 'reselect';

const selectAppDomain = state => state.get('app');
const makeSelectUsername = () =>
  createSelector(selectAppDomain, appState => appState.get('username'));

export { makeSelectUsername };
