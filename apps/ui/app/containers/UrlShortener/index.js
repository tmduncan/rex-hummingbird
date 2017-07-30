/*
 *
 * UrlShortener
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Panel, Row, Table } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import makeSelectUrlShortener from './selectors';
import { changeShortName, changeUrl, startLoadShortUrls, submitShortUrl } from './actions';

export class UrlShortener extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoadShortUrls();
  }

  getValidationShortName() {
    const shortNameLength = this.props.UrlShortener.shortName.length;
    if (shortNameLength >= 3) {
      return 'success';
    }
    if (shortNameLength > 0) {
      return 'error';
    }
    return null;
  }

  getValidationUrl() {
    const urlLength = this.props.UrlShortener.url.length;
    if (urlLength > 3) {
      return 'success';
    }
    if (urlLength > 0) {
      return 'error';
    }
    return null;
  }


  render() {
    const { shortName, url, urls } = this.props.UrlShortener;

    return (
      <div>
        <Helmet
          title="UrlShortener"
          meta={[
            { name: 'description', content: 'REX url shortner' },
          ]}
        />
        <Row>
          <Col lg={12}>
            <h1 className="page-header">Url Shortener</h1>
          </Col>
        </Row>
        <Panel header="Please enter the url that you would like to shorten and the requested link.">
          <Form horizontal>
            <FormGroup
              controlId="formShortName"
              validationState={this.getValidationShortName()}
              style={{ marginBottom: 0 }}
            >
              <Col componentClass={ControlLabel} sm={2}>http://rex.re/</Col>
              <Col sm={6}>
                <FormControl
                  type="text"
                  name="shortname"
                  id="formShortName"
                  placeholder="house-awesome"
                  value={shortName}
                  onChange={this.props.onChangeShortName}
                  disabled={this.props.submittingShortName}
                />
                {(this.getValidationShortName() === 'error' ?
                  <HelpBlock>Please provide at least three characters.</HelpBlock>
                  : <div style={{ marginTop: 5, marginBottom: 10 }}>&nbsp;</div>
                )}
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="formUrl"
              validationState={this.getValidationUrl()}
              style={{ marginBottom: 0 }}
            >
              <Col componentClass={ControlLabel} sm={2}>URL:</Col>
              <Col sm={6}>
                <FormControl
                  type="text"
                  name="url"
                  id="formUrl"
                  placeholder="http://rexchanoge.com/house-awesome?utm_content=something"
                  value={url}
                  onChange={this.props.onChangeUrl}
                  disabled={this.props.submittingShortName}
                />
                {(this.getValidationUrl() === 'error' ?
                    <HelpBlock>Please provide at least three characters.</HelpBlock>
                    : <div style={{ marginTop: 5, marginBottom: 10 }}>&nbsp;</div>
                )}
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <Button
              type="submit"
              onClick={this.props.onSubmitShortUrl}
              disabled={this.props.submittingShortName}

            >
              Add URL
            </Button>
          </Form>
        </Panel>
        <Panel header="Current Short Urls">
          <Button onClick={this.props.onLoadShortUrls}>Reload Urls</Button>
          <Table fill striped bordered condensed hover>
            <thead>
              <tr>
                <th>Short Name</th>
                <th>Reference</th>
                <th>Hits</th>
              </tr>
            </thead>
            <tbody>
              { urls ? urls.map((entry) => (
                <tr key={entry.shortName}>
                  <td>{ entry.shortName }</td>
                  <td>{ entry.url }</td>
                  <td>{ entry.hits }</td>
                </tr>
              )) : null }
            </tbody>
          </Table>
        </Panel>
      </div>
    );
  }
}

UrlShortener.propTypes = {
  onChangeShortName: PropTypes.func.isRequired,
  onChangeUrl: PropTypes.func.isRequired,
  onLoadShortUrls: PropTypes.func.isRequired,
  onSubmitShortUrl: PropTypes.func.isRequired,
  submittingShortName: PropTypes.bool,
  UrlShortener: PropTypes.shape({
    shortName: PropTypes.string,
    url: PropTypes.string,
    urls: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        shortName: PropTypes.string,
        hits: PropTypes.string,
      })),
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  UrlShortener: makeSelectUrlShortener(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeShortName: (evt) => dispatch(changeShortName(evt.target.value)),
    onChangeUrl: (evt) => dispatch(changeUrl(evt.target.value)),
    onLoadShortUrls: () => dispatch(startLoadShortUrls()),
    onSubmitShortUrl: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitShortUrl());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlShortener);
