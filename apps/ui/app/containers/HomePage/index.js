/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Col, Row } from 'react-bootstrap';
import hummingbirdImg from './hummingbird.jpg';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'Project Hummingbird' },
          ]}
        />

        <Row>
          <Col lg={12}>
            <h1 className="page-header">Welcome to Project Hummingbird</h1>
          </Col>
          <Col md={6}>
            <p>Project Hummingbird is Rex's marketing platform for intelligently targeting potential home buyers and
              sellers.</p>

            <p>Features Coming:</p>
            <ul>
              <li>Track Google Adwords spend and effectiveness</li>
              <li>Create shortened urls for print advertizing</li>
              <li>Create ad links for ad platforms</li>
              <li>Analyze data about the entities being targeted</li>
            </ul>
          </Col>
          <Col md={6}>
            <img className="img-responsive" src={hummingbirdImg} alt="" />
          </Col>
        </Row>
      </article>
    );
  }
}

HomePage.propTypes = {};

export function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
