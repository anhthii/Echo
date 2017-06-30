import React from 'react';

function ArtistResult() {
  return (
    <ul className='artist-result'>
      <div className='search-li-title'>
        Artist
      </div>
      <li>
        <div className='search-li-detail'>
          <img src={'http://zmp3-photo-td.zadn.vn/thumb/94_94/covers/d/3/d3d0ac7dfb730ab090524c1df0bbdc64_1474538317.jpg'} alt='' />
          <div className='search-li-info'>
            <div className='search-li-artist'>
              Artists
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ArtistResult;