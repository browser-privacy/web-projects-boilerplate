/**
 *
 * FooterComponent
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
`;

/* eslint-disable react/prefer-stateless-function */
export class FooterComponent extends React.PureComponent {
  render() {
    return (
      <Footer>
        <div className="bg-dark text-light pt-4">
          <Container className="border-bottom">
            <Row className="mx-auto">
              <div className="col-6 col-md offset-md-1">
                <h5 className="font-weight-bold">Product</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <Link to="/pricing" className="text-light">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" className="text-light">
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/login" className="text-light">
                      Log in
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5 className="font-weight-bold">Developers</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <a
                      href="https://status.domain.io"
                      className="text-light"
                      target="new"
                    >
                      Status page
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://readthedocs.domain.io"
                      className="text-light"
                      target="new"
                    >
                      API documentation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5 className="font-weight-bold">Company</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <Link to="/about" className="text-light">
                      About
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://blog.domain.io"
                      className="text-light"
                      target="new"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <Link to="/contact" className="text-light">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5 className="font-weight-bold">Resources</h5>
                <ul className="list-unstyled text-small">
                  <li>
                    <Link to="/dashboard/support" className="text-light">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link to="/legal/terms" className="text-light">
                      Legal
                    </Link>
                  </li>
                  <li>
                    <Link to="/sitemap" className="text-light">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </Row>
          </Container>
        </div>
        <div className="bg-dark text-light">
          <Container>
            <Row className="mx-auto">
              <Col xs="10">
                <span>
                  ® 2008–
                  {new Date().getFullYear()} ACME Inc.
                </span>
              </Col>
              <Col xs="2" className="text-right">
                <img
                  className=""
                  src="/icon.png"
                  alt="app logo"
                  width="26"
                  height="26"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </Footer>
    );
  }
}

export default FooterComponent;
