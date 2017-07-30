/**
 *
 * FormQuestion
 *
 */

import React, { PropTypes } from 'react';
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

function FormQuestion(props) {
  const valid = props.isValid(props.value);
  return (
    <FormGroup
      controlId={props.id}
      validationState={valid}
      style={{ marginBottom: 0 }}
    >
      <Col componentClass={ControlLabel} sm={2}>{props.label}</Col>
      <Col sm={6}>
        <FormControl
          type="text"
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {((props.helpText && valid === 'error') ?
          <HelpBlock>{ props.helpText }</HelpBlock>
          : <div style={{ marginTop: 5, marginBottom: 10 }}>&nbsp;</div>
        )}
        <FormControl.Feedback />
      </Col>
    </FormGroup>
  );
}

FormQuestion.propTypes = {
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.func,
  value: PropTypes.string,
};

export default FormQuestion;
