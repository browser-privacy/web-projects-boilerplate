/**
 *
 * App.js
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MainNavbar from 'containers/MainNavbar/Loadable';
import MainFooter from 'components/MainFooter/Loadable';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';
import SupportPage from 'containers/SupportPage/Loadable';
import LegalTerms from 'components/LegalTerms/Loadable';

import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

import UserDashboardMainPage from 'containers/UserDashboard/MainPage/Loadable';
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
        <Route exact path="/legal/terms" component={LegalTerms} />

        <PrivateRoute
          exact
          path="/dashboard/index"
          component={UserDashboardMainPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <MainFooter />
    </div>
  );
}
