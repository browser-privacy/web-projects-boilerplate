/**
 *
 * FAQPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
// import { Container, Row, Col } from 'reactstrap';

/* eslint-disable react/prefer-stateless-function */
class FAQPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>FAQPage</title>
          <meta name="description" content="Description of FAQPage" />
        </Helmet>
      </div>
    );
  }
}

FAQPage.propTypes = {};

export default FAQPage;
