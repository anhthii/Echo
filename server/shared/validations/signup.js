const Validator = require('validator');
const { isEmpty } = require('../../utils');

module.exports = function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username || '')) {
    errors.username = 'Username is required';
  }

  if (!Validator.isAlphanumeric(data.username || '')) {
    errors.username = 'Username must be alphanumeric';
  }

  if (!Validator.isLength(data.username, { min: 3, max: 16 })) {
    errors.username = 'Username must be between 3 and 16 characters';
  }

  if (Validator.isEmpty(data.password || '')) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: undefined })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.passwordConfirmation || '')) {
    errors.passwordConfirmation = 'Password confirmation is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

