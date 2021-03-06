import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DefaultLayout = ({ children }) => (
  <React.Fragment>
    <Navbar />
    {children}
    <Footer />
  </React.Fragment>
);

const UserDashboardLayout = ({ children }) => (
  <React.Fragment>
    <Navbar navbarBrandLink="/dashboard" />
    {children}
    <Footer minimal />
  </React.Fragment>
);

DefaultLayout.propTypes = {
  children: PropTypes.object,
};
UserDashboardLayout.propTypes = {
  children: PropTypes.object,
};

export default DefaultLayout;
export { DefaultLayout, UserDashboardLayout };
