import React from 'react';
import { Link } from 'react-router';
import { pageQuery } from '../../utils/func';

const getLink = (title, id, page) => `/album/${title}/${id}${pageQuery(page)}`;

const Pagination = (props) => {
  const { title, id, pageChunks, pageChunkIndex } = props;

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
            <Link to={getLink(title, id, num + 1)} activeClassName='pagination-item-active'>
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

export default Pagination;
