/**
 *
 * App.js
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import PrivateRoute from 'components/PrivateRoute';
import Navbar from 'components/Navbar/Loadable';
import Footer from 'components/Footer/Loadable';
import ScrollToTop from 'components/ScrollToTop';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';
import PricingPage from 'containers/PricingPage/Loadable';
import LegalTermsPage from 'components/LegalTermsPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import FAQPage from 'components/FaqPage';
import AboutPage from 'components/AboutPage';

import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

import UserDashboardMainPage from 'containers/UserDashboard/MainPage/Loadable';
import UserDashboardSettingsPage from 'containers/UserDashboard/SettingsPage/Loadable';
import UserDashboardEmailVerificationPage from 'containers/UserDashboard/EmailVerificationPage/Loadable';
import UserDashboardSupportPage from 'containers/UserDashboard/SupportPage/Loadable';

export default function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Domain.io" />
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/login" component={LoginPage} />
          <Route exact path="/auth/register" component={RegisterPage} />
          <Route exact path="/faq" component={FAQPage} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/legal/terms" component={LegalTermsPage} />
          <Route exact path="/contact" component={ContactPage} />

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
    </React.Fragment>
  );
}
