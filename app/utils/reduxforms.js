import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const renderField = ({
  input,
  label,
  placeholder,
  pattern,
  type,
  meta: { touched, error },
}) => (
  <FormGroup>
    {label && <Label>{label}</Label>}
    <Input
      {...input}
      placeholder={placeholder || label}
      type={type}
      pattern={pattern}
      invalid={touched && error && true}
    />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
);

const fieldValidations = {
  required: value => (value ? undefined : 'Required'),
  maxLength: max => value =>
    value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined,
  number: value =>
    value && !Number.isNaN(Number(value)) ? 'Must be a number' : undefined,
  minValue: min => value =>
    value && value < min ? `Must be at least ${min}` : undefined,
  email: value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined,
  alphaNumeric: value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
      ? 'Only alphanumeric characters'
      : undefined,
  noWhiteSpaces: value =>
    value && /\s/i.test(value) ? 'White spaces are no allowed' : undefined,
};

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  pattern: PropTypes.string,
};

export { renderField, fieldValidations };
