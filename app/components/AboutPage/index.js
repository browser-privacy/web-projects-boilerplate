/**
 *
 * AboutPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
// import { Container, Row, Col } from 'reactstrap';

/* eslint-disable react/prefer-stateless-function */
class AboutPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>AboutPage</title>
          <meta name="description" content="Description of AboutPage" />
        </Helmet>
      </div>
    );
  }
}

AboutPage.propTypes = {};

export default AboutPage;
