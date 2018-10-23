/**
 *
 * App.js
 *
 */

import React from 'react';
import { Switch, Route as DefaultRoute } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import PrivateRoute from 'components/PrivateRoute';
import ScrollToTop from 'components/ScrollToTop';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';
import LegalTermsPage from 'components/LegalTermsPage/Loadable';
import FAQPage from 'components/FaqPage';
import AboutPage from 'components/AboutPage';

import RegisterPage from 'containers/RegisterPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import PricingPage from 'containers/PricingPage/Loadable';

import LoginPage from 'containers/LoginPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';

import UserDashboardMainPage from 'containers/UserDashboard/MainPage/Loadable';
import UserDashboardSettingsPage from 'containers/UserDashboard/SettingsPage/Loadable';
import UserDashboardEmailVerificationPage from 'containers/UserDashboard/EmailVerificationPage/Loadable';
import UserDashboardSupportPage from 'containers/UserDashboard/SupportPage/Loadable';

import PropTypes from 'prop-types';

import { DefaultLayout, UserDashboardLayout } from 'layout';
import RouteAnalytics from 'components/RouteAnalytics';

const Route = ({
  component: Component,
  layout: Layout = DefaultLayout,
  ...rest
}) => (
  <DefaultRoute
    {...rest}
    render={props => {
      let privateRoute = null;
      if (rest.protected) {
        privateRoute = <PrivateRoute exact path={rest.path} />;
      }

      return (
        <React.Fragment>
          {privateRoute}
          <RouteAnalytics key={rest.path} {...props}>
            <Layout>
              <Component {...props} />
            </Layout>
          </RouteAnalytics>
        </React.Fragment>
      );
    }}
  />
);

Route.propTypes = {
  component: PropTypes.func,
  layout: PropTypes.func,
  protected: PropTypes.bool,
};

export default function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Domain.io" />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/faq" component={FAQPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/legal/terms" component={LegalTermsPage} />

          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route exact path="/contact" component={ContactPage} />

          <Route exact path="/auth/login" component={LoginPage} />
          <Route
            exact
            path="/auth/forgot_password"
            component={ForgotPasswordPage}
          />

          <Route
            protected
            exact
            path="/dashboard/index"
            layout={UserDashboardLayout}
            component={UserDashboardMainPage}
          />
          <Route
            protected
            exact
            path="/dashboard/user/settings"
            layout={UserDashboardLayout}
            component={UserDashboardSettingsPage}
          />
          <Route
            protected
            exact
            path="/dashboard/email/verification"
            layout={UserDashboardLayout}
            component={UserDashboardEmailVerificationPage}
          />
          <Route
            protected
            exact
            path="/dashboard/support"
            layout={UserDashboardLayout}
            component={UserDashboardSupportPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </ScrollToTop>
    </React.Fragment>
  );
}
