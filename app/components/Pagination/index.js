import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { pageQuery } from '../../utils/func';
import './index.sass';

/* type can be album or artist */

const getLink = (title, id, page, type) => `/${type}/${title}/${id}${pageQuery(page)}`;

const Pagination = (props) => {
  const { title, id, pageChunks, pageChunkIndex, type } = props;

  if (!pageChunks.length) return null;

  return (
    <ul className="pagination">
      { pageChunkIndex > 0 &&
        <li>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            props.chagePageChunkIndex(pageChunkIndex - 1);
          }}>
            <i className="ion-chevron-left"></i>
          </a>
        </li>
      }
      {
        pageChunks.length && pageChunks[pageChunkIndex].map(num => (
          <li key={`pagination-item${num}`}>
            <Link to={getLink(title, id, num + 1, type)} activeClassName='pagination-item-active'>
              { num + 1 }
            </Link>
          </li>
        ))
      }
      { pageChunkIndex < pageChunks.length - 1 &&
        <li>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            props.chagePageChunkIndex(pageChunkIndex + 1);
          }}>
            <i className="ion-chevron-right"></i>
          </a>
        </li>
      }
    </ul>
  );
};

Pagination.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  pageChunks: PropTypes.array.isRequired,
  pageChunkIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Pagination;
