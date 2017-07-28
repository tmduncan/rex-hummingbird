/*
 *
 * UrlShortener
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectUrlShortener from './selectors';
import {
  changeShortName,
  changeUrl,
  startLoadShortUrls,
  submitShortUrl } from './actions';

export class UrlShortener extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onLoadShortUrls();
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

        <div className="container-fluid">
          <h2 className="text-center">Url Shortner</h2>
          <div style={{ marginLeft: 20 }}>
            <p>Please enter the url that you would like to shorten and the requested link.</p>
            <form>
              <label htmlFor="shortname_input">
                rex.re/
                <input
                  type="text"
                  name="shortname"
                  id="shortname_input"
                  placeholder="house-awesome"
                  value={shortName}
                  onChange={this.props.onChangeShortName}
                  style={{ border: 3, width: 150 }}
                  disabled={this.props.submittingShortName}
                />
              </label>
              <br />
              <label htmlFor="url_input">
                URL:
                <input
                  type="text"
                  name="url"
                  id="url_input"
                  placeholder="http://rexchanoge.com/house-awesome?utm_content=something"
                  value={url}
                  onChange={this.props.onChangeUrl}
                  style={{ border: 3, width: 500, marginLeft: 10 }}
                  disabled={this.props.submittingShortName}
                />
              </label>
              <br />
              <button
                type="submit"
                onClick={this.props.onSubmitShortUrl}
                disabled={this.props.submittingShortName}

              >
                Add URL
              </button>
            </form>
          </div>
          <hr />
          <div>
            <h3 className="text-center">Short Url Stats</h3>
            <button onClick={this.props.onLoadShortUrls}>Load Urls</button>
            <table className="table">
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
            </table>
          </div>
        </div>
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
