import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';

function TopResult({ name, id, artist, thumb, clearSearchResult }) {
  return (
    <ul className='top-result'>
      <div className='search-li-title'>
        Top Result
      </div>
      <li>
        <div className='search-li-detail'>
          <img src={`http://zmp3-photo-td.zadn.vn/thumb/94_94/${thumb}`} alt='' />
          <div className='search-li-info'>
            <div>
              <Link
                to={`/song/${changeAlias(name)}/${id}`}
                onClick={clearSearchResult}
              >{name}</Link>
            </div>
            <div className='search-li-artist'>
              {artist}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default TopResult;
