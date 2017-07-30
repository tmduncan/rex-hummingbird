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
import FormQuestion from 'components/FormQuestion';
import makeSelectUrlShortener from './selectors';
import { changeShortName, changeUrl, startLoadShortUrls, submitShortUrl } from './actions';

export class UrlShortener extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoadShortUrls();
  }

  getValidationShortName(shortName) {
    const shortNameLength = shortName.length;
    if (shortNameLength >= 3) {
      return 'success';
    }
    if (shortNameLength > 0) {
      return 'error';
    }
    return null;
  }

  getValidationUrl(url) {
    const urlLength = url.length;
    if (urlLength > 7 && (url.startsWith('http://') || url.startsWith('https://'))) {
      return 'success';
    }
    if (urlLength > 0) {
      return 'error';
    }
    return null;
  }


  render() {
    const { shortName, url, urls } = this.props.UrlShortener;
    const validUrlInput = this.getValidationUrl(url);
    const validShortNameInput = this.getValidationShortName(shortName);
    const disableSubmit = validUrlInput !== 'success' || validShortNameInput !== 'success' || this.props.submittingShortName;

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
            <FormQuestion
              disabled={this.props.submittingShortName}
              helpText="Please provide at least three characters."
              id="formShortName"
              isValid={this.getValidationShortName}
              label="http://rex.re/"
              name="shortName"
              onChange={this.props.onChangeShortName}
              placeholder="house-awesome"
              value={shortName}
            />
            <FormQuestion
              disabled={this.props.submittingShortName}
              helpText="Please provide full url starting with 'http://' or 'https://'."
              id="formUrl"
              isValid={this.getValidationUrl}
              label="Website Url"
              name="url"
              onChange={this.props.onChangeUrl}
              placeholder="http://rexchange.com/house-awesome?utm_content=something"
              value={url}
            />
            <Button
              type="submit"
              onClick={this.props.onSubmitShortUrl}
              disabled={disableSubmit}

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
