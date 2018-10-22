/**
 *
 * FAQPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader as DefaultCardHeader,
  CardBody,
} from 'reactstrap';
import styled from 'styled-components';

const FAQHeader = styled('div')`
  font-size: 27px;
  margin: 20px;
`;
const CardHeader = styled(DefaultCardHeader)`
  font-size: 24px;
  color: #0275d8;
  text-decoration: none;
  font-weight: 500;
  line-height: 1.1;
`;

/* eslint-disable react/prefer-stateless-function */
class FAQPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      collapses: {},
    };
  }

  toggle(n) {
    const { collapses } = this.state;

    this.setState({
      collapses: {
        ...collapses,
        [n]: !collapses[n],
      },
    });
  }

  render() {
    const { collapses } = this.state;

    return (
      <Container tag="main" className="flex-grow-1">
        <Helmet>
          <title>FAQPage</title>
          <meta name="description" content="Description of FAQPage" />
        </Helmet>
        <Row className="justify-content-center">
          <Col md="12" className="text-center">
            <span className="display-1 d-block">FAQ</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <FAQHeader>General questions</FAQHeader>
            <Card>
              <CardHeader onClick={() => this.toggle(1)}>
                Is account registration required?
              </CardHeader>
              <Collapse isOpen={collapses[1]}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Collapse>
            </Card>
            <Card>
              <CardHeader onClick={() => this.toggle(2)}>
                What is the currency used for all transactions?
              </CardHeader>
              <Collapse isOpen={collapses[2]}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Collapse>
            </Card>
            <FAQHeader>Sellers</FAQHeader>
            <Card>
              <CardHeader onClick={() => this.toggle(3)}>
                Who can sell items?
              </CardHeader>
              <Collapse isOpen={collapses[3]}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Collapse>
            </Card>
            <Card>
              <CardHeader onClick={() => this.toggle(4)}>
                How much do I get from each sale?
              </CardHeader>
              <Collapse isOpen={collapses[4]}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Collapse>
            </Card>
            <Card>
              <CardHeader onClick={() => this.toggle(5)}>
                What are the payment options?
              </CardHeader>
              <Collapse isOpen={collapses[5]}>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

FAQPage.propTypes = {};

export default FAQPage;
