import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLogged } from '../../containers/Auth/selectors';

export class PrivateRoute extends React.PureComponent {
  render() {
    const {
      component: Component,
      redirect: pathname,
      isLogged,
      ...rest
    } = this.props;

    return (
      <div>
        <Route
          {...rest}
          render={props =>
            isLogged === true ? (
              <Component {...rest} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname,
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      </div>
    );
  }
}

PrivateRoute.defaultProps = {
  redirect: '/auth/login',
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirect: PropTypes.string,
  location: PropTypes.object,
  isLogged: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isLogged: makeSelectIsLogged(),
});

export default connect(mapStateToProps)(PrivateRoute);
