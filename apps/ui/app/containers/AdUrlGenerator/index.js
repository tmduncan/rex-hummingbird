/*
 *
 * AdUrlGenerator
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Col, Form, Panel, Row, Well } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import FormQuestion from 'components/FormQuestion';
import { changeContent, changeMedium, changeName, changeSource, changeTerm, changeUrl } from './actions';
import makeSelectAdUrlGenerator from './selectors';

export class AdUrlGenerator extends React.Component { // eslint-disable-line react/prefer-stateless-function

  getValidString(str) {
    if (str == null) {
      return null;
    }
    const strLength = str.length;
    if (strLength >= 3) {
      return 'success';
    }
    if (strLength > 0) {
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

  formFullUrl() {
    const url = this.props.AdUrlGenerator.url;
    const params = [];
    ['content', 'medium', 'name', 'source', 'term'].forEach((p) => {
      const val = this.props.AdUrlGenerator[p];
      if (val && val.length > 0) {
        params.push([`utm_${p}=${val}`]);
      }
    });
    const joinedParams = params.join('&');

    let fullUrl = `${url}?${joinedParams}`;
    if (url.length === 0) {
      fullUrl = 'Fill out all the required fields above and a URL will be automatically generated for you here.';
    }
    return fullUrl;
  }

  render() {
    const { content, medium, name, source, term, url } = this.props.AdUrlGenerator;

    const fullUrl = this.formFullUrl();
    return (
      <div>
        <Helmet
          title="Ad Url Generator"
          meta={[
            { name: 'description', content: 'Ad Url Generator' },
          ]}
        />
        <Row>
          <Col lg={12}>
            <h1 className="page-header">Ad URL Generator</h1>
          </Col>
        </Row>
        <Panel header="Ad questionaire">
          <Form horizontal>
            <FormQuestion
              helpText="Please provide full url starting with 'http://' or 'https://'."
              id="formUrl"
              isValid={this.getValidationUrl}
              label="* Website Url"
              name="url"
              onChange={this.props.onChangeUrl}
              placeholder="http://rexchange.com/house-awesome"
              value={url}
            />
            <FormQuestion
              helpText="Please provide a string at least 3 characters long"
              id="formSource"
              isValid={this.getValidString}
              label="Campaign Source"
              name="source"
              onChange={this.props.onChangeSource}
              placeholder="(e.g. google, newsletter)"
              value={source}
            />
            <FormQuestion
              helpText="Please provide a string at least 3 characters long"
              id="formMedium"
              isValid={this.getValidString}
              label="Campaign Medium"
              name="medium"
              onChange={this.props.onChangeMedium}
              placeholder="Marketing medium: (e.g. cpc, banner, email)"
              value={medium}
            />
            <FormQuestion
              helpText="Please provide a string at least 3 characters long"
              id="formName"
              isValid={this.getValidString}
              label="Campaign Name"
              name="name"
              onChange={this.props.onChangeName}
              placeholder="Product, promo code, or slogan (e.g. spring_sale)"
              value={name}
            />
            <FormQuestion
              helpText="Please provide a string at least 3 characters long"
              id="formTerm"
              isValid={this.getValidString}
              label="Campaign Term"
              name="term"
              onChange={this.props.onChangeTerm}
              placeholder="Identify the paid keywords"
              value={term}
            />
            <FormQuestion
              helpText="Please provide a string at least 3 characters long"
              id="formContent"
              isValid={this.getValidString}
              label="Campaign Content"
              name="content"
              onChange={this.props.onChangeContent}
              placeholder="Use to differentiate ads"
              value={content}
            />
          </Form>
          <Row>
            <Col lg={10}>
              <Well
                style={{
                  height: 100,
                  overflowY: 'auto',
                }}
              >
                {fullUrl}
              </Well>
            </Col>
          </Row>
        </Panel>
      </div>
    );
  }
}

AdUrlGenerator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChangeContent: PropTypes.func.isRequired,
  onChangeMedium: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeSource: PropTypes.func.isRequired,
  onChangeTerm: PropTypes.func.isRequired,
  onChangeUrl: PropTypes.func.isRequired,
  AdUrlGenerator: PropTypes.shape({
    content: PropTypes.string,
    medium: PropTypes.string,
    name: PropTypes.string,
    source: PropTypes.string,
    term: PropTypes.string,
    url: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  AdUrlGenerator: makeSelectAdUrlGenerator(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeContent: (evt) => dispatch(changeContent(evt.target.value)),
    onChangeMedium: (evt) => dispatch(changeMedium(evt.target.value)),
    onChangeName: (evt) => dispatch(changeName(evt.target.value)),
    onChangeSource: (evt) => dispatch(changeSource(evt.target.value)),
    onChangeTerm: (evt) => dispatch(changeTerm(evt.target.value)),
    onChangeUrl: (evt) => dispatch(changeUrl(evt.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdUrlGenerator);
