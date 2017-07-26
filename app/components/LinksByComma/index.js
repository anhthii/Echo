import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './index.sass';

const LinksByComma = ({ data, definePath, pathEntry, titleEntry, defineTitle, className }) =>
  <div className={`comma ${className || ''}`}>
    {
      data.map((element, index) =>
        <Link
          key={`${element[titleEntry]}-${index}`}
          to={(definePath && definePath(element[pathEntry])) || element[pathEntry]}>
          {(defineTitle && defineTitle(element[titleEntry])) || element[titleEntry]}
        </Link>
      )
    }
  </div>;

LinksByComma.propTypes = {
  data: PropTypes.array.isRequired,
  definePath: PropTypes.func,
  pathEntry: PropTypes.string.isRequired,
  titleEntry: PropTypes.string.isRequired,
  defineTitle: PropTypes.func,
  className: PropTypes.string,
};

export default LinksByComma;
