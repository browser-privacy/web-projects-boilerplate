/**
 *
 * Footer
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export class MainFooter extends React.PureComponent {
  render() {
    return (
      <footer className="bg-dark">
        <Container>
          <Row className="text-light">
            <Col xs="4">
              <span>© Domain.io</span>
            </Col>
            <Col className="footer-text text-right">
              <span>
                <Link to="/legal/terms" className="footer-link">
                  Legal terms
                </Link>{' '}
                |{' '}
                <a href="https://status.domain.io" className="footer-link">
                  Status
                </a>{' '}
                |{' '}
                <Link to="/support" className="footer-link">
                  Support
                </Link>
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

MainFooter.propTypes = {};

export default MainFooter;
