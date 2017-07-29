import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';

function AlbumResult(props) {
  return (
    <ul className='album-result'>
      <div className='search-li-title'>
        Albums
      </div>
      {
        props.albums.map(album =>
          <li key={`search-${album.id}`}>
            <div className='search-li-detail'>
              <img src={`http://image.mp3.zdn.vn/thumb/94_94/${album.thumb}`} alt='' />
              <div className='search-li-info'>
                <div>
                  <Link
                    to={`/album/playlist/${changeAlias(album.name)}/${album.id}`}
                    onClick={() => props.clearSearchResult() }
                  >
                    {album.name}
                  </Link>
                </div>
                <div className='search-li-artist'>
                  {album.artist}
                </div>
              </div>
            </div>
          </li>
        )
      }
    </ul>
  );
};

export default AlbumResult;
