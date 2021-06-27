import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import LinksByComma from '../LinksByComma';

function AlbumResult({albums , clearSearchResult}) {
  return (
    <ul className='album-result'>
      <div className='search-li-title'>
        Albums
      </div>
      {
        albums.map(album =>
          <li key={`search-${album.encodeId}`}>
            <div className='search-li-detail'>
              <img src={album.thumbnailM} alt='' />
              <div className='search-li-info'>
                <div>
                  <Link
                    to={`/album/playlist/${album.link.split("/")[2]}/${album.encodeId}`}
                    onClick={() => clearSearchResult() }
                  >
                    {album.title}
                  </Link>
                </div>
                <div className='search-li-artist'>
                  {/* <LinksByComma
                    className="chart-item-artist ellipsis"
                    data={album.artists}
                    definePath={url => url.replace("nghe-si", "artist")}
                    defineTitle={title =>
                      title.replace("Nhiều nghệ sĩ", "Various artists")
                    }
                    pathEntry="link"
                    titleEntry="name"
                  /> */}
                  {album.artistsNames}
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
