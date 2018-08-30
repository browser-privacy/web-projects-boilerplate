/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MainNavbar from 'containers/MainNavbar/Loadable';
import MainFooter from 'components/MainFooter/Loadable';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SupportPage from 'containers/SupportPage/Loadable';

import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

import DashboardMainPage from 'containers/Dashboard/MainPage/Loadable';
import PrivateRoute from '../../components/PrivateRoute';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Domain.io" />
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route exact path="/support" component={SupportPage} />

        <PrivateRoute
          exact
          path="/dashboard/index"
          component={DashboardMainPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <MainFooter />
    </div>
  );
}
