/**
 *
 * Footer
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

/* eslint-disable react/prefer-stateless-function */
export class Footer extends React.PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="pt-4">
          <Container>
            <Row className="mx-auto">
              <div className="col-6 col-md offset-md-1">
                <h5>Product</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted" href="#foo">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      Sign up
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      Log in
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Developers</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted" href="#foo">
                      System status
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      API reference
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Company</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted" href="#foo">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Resources</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a className="text-muted" href="#foo">
                      Support
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      Privacy & terms
                    </a>
                  </li>
                  <li>
                    <a className="text-muted" href="#foo">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </Row>
          </Container>
        </div>
        <div className="bg-dark text-light">
          <Container>
            <Row className="mx-auto">
              <Col>
                <span>
                  <FontAwesomeIcon
                    icon={faRocket}
                    className="align-text-top mr-2"
                  />
                  BRAND NAME
                </span>
              </Col>
              <Col className="text-right">
                <span>® {new Date().getFullYear()} Domain.io.</span>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
