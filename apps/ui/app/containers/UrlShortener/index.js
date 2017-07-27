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

export class UrlShortener extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="UrlShortener"
          meta={[
            { name: 'description', content: 'Description of UrlShortener' },
          ]}
        />
        <div className="container-fluid">
            <h2 className="text-center">Url Shortner</h2>
            <p>Please enter the url that you would like to shorten and the requested link.</p>
            <form>
              <label htmlFor="url_input">
                URL: <input type="text" name="url" id="url_input" />
              </label>
              <label htmlFor="shortname_input">
                 rex.re/<input type="text" name="shortname" id="shortname_input" />
              </label>
              <button>Submit</button>
            </form>
        </div>
      </div>
    );
  }
}

UrlShortener.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  UrlShortener: makeSelectUrlShortener(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlShortener);
