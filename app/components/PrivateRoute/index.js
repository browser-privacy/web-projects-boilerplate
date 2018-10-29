import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectIsLoggedIn } from '../../containers/Auth/selectors';

export class PrivateRoute extends React.PureComponent {
  render() {
    const { redirect: pathname, isLoggedIn, children, ...rest } = this.props;

    if (!isLoggedIn) {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname,
                state: { from: props.location },
              }}
            />
          )}
        />
      );
    }

    return null;
  }
}

PrivateRoute.defaultProps = {
  redirect: '/auth/login',
};

PrivateRoute.propTypes = {
  layout: PropTypes.func,
  redirect: PropTypes.string,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
});

export default connect(mapStateToProps)(PrivateRoute);
