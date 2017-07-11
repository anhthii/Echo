import React from 'react';
import PropTypes from 'prop-types';

const TextInputGroup = ({ placeholder, name, error, onChange, type }) => {
  return (
    <div>
      <input
        type={type || 'text'}
        className="form-control"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      { error ? <div className="input-error">{error}</div> : null }
    </div>
  );
};

TextInputGroup.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextInputGroup;
