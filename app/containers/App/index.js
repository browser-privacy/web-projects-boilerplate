/**
 *
 * App.js
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navbar from 'components/Navbar/Loadable';
import Footer from 'components/Footer/Loadable';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';
import PricingPage from 'containers/PricingPage/Loadable';
import LegalTerms from 'components/LegalTerms/Loadable';

import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

import UserDashboardMainPage from 'containers/UserDashboard/MainPage/Loadable';
import UserDashboardSettingsPage from 'containers/UserDashboard/SettingsPage/Loadable';
import UserDashboardEmailVerificationPage from 'containers/UserDashboard/EmailVerificationPage/Loadable';
import UserDashboardSupportPage from 'containers/UserDashboard/SupportPage/Loadable';

import ScrollToTop from '../../components/ScrollToTop';
import FAQPage from '../../components/FaqPage';
import PrivateRoute from '../../components/PrivateRoute';
import AboutPage from '../../components/AboutPage';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Domain.io" />
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/login" component={LoginPage} />
          <Route exact path="/auth/register" component={RegisterPage} />
          <Route exact path="/faq" component={FAQPage} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/legal/terms" component={LegalTerms} />

          <PrivateRoute
            exact
            path="/dashboard/index"
            component={UserDashboardMainPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/user/settings"
            component={UserDashboardSettingsPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/email/verification"
            component={UserDashboardEmailVerificationPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/support"
            component={UserDashboardSupportPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </ScrollToTop>
      <Footer />
    </div>
  );
}
