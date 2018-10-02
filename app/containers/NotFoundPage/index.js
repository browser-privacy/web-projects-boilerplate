/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="text-center">
        <h1>404 Page not found</h1>
        <Link to="/">
          <Button>
            <strong>Return to homepage</strong>
          </Button>
        </Link>
      </div>
    );
  }
}
