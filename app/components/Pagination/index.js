import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { pageQuery, changeAlias } from '../../utils/func';
import './index.sass';

/* type can be album or artist */

const getLink = (genre, id, page, type, artistName) => {
  if (type === 'single-artist' && artistName) {
    return `/artist/${changeAlias(artistName)}?page=${page}`;
  }

  return `/${type}s/${genre}/${id}${pageQuery(page)}`;
};

const Pagination = (props) => {
  const { genre, id, pageChunks, pageChunkIndex, type, artistName, activePage } = props;
  if (!pageChunks.length) return null;

  return (
    <ul className="pagination">
      { pageChunkIndex > 0 &&
        <li>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            props.changePageChunkIndex(pageChunkIndex - 1);
          }}>
            <i className="ion-chevron-left"></i>
          </a>
        </li>
      }
      {
        pageChunks.length && pageChunks[0].length > 1 && pageChunks[pageChunkIndex].map(num => (
          <li key={`pagination-item${num}`}>
            {
              num === 0 && !activePage ?
                <Link
                  to={getLink(genre, id, num + 1, type, artistName)}
                  className='pagination-item-active'>
                  { num + 1 }
                </Link> :
                <Link
                  to={getLink(genre, id, num + 1, type, artistName)}
                  activeClassName='pagination-item-active'>
                  { num + 1 }
                </Link>
            }
          </li>
        ))
      }
      { pageChunkIndex < pageChunks.length - 1 &&
        <li>
          <a href='#' onClick={(e) => {
            e.preventDefault();
            props.changePageChunkIndex(pageChunkIndex + 1);
          }}>
            <i className="ion-chevron-right"></i>
          </a>
        </li>
      }
    </ul>
  );
};

Pagination.propTypes = {
  genre: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  pageChunks: PropTypes.array.isRequired,
  pageChunkIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Pagination;
