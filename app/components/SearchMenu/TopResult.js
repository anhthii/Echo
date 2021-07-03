import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';

function TopResult({ alias, title,link , name , encodeId, artistsNames, objectType, clearSearchResult,thumbnail, thumbnailM }) {
  const thumbnailTop = objectType==="song"? thumbnailM : thumbnail;
  return (
    <ul className='top-result'>
      <div className='search-li-title'>
        Top Result
      </div>
      <li>
        <div className='search-li-detail'>
          <img src={thumbnailTop} alt='' />
          <div className='search-li-info'>
            <div>
              {
                objectType==="song"?
                <Link
                  to={`/song/${alias}/${encodeId}`}
                  onClick={clearSearchResult}>
                  {title}
                </Link>
                :
                <Link
                  to={`/artist/${link.split("/")[2]}`}
                  onClick={clearSearchResult}
                >
                  {name}
                </Link>
            }
            </div>
            <div className='search-li-artist'>
              {artistsNames}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default TopResult;
