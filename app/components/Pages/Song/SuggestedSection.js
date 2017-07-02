import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../../utils/func';

function SuggestedSection(props) {
  const songList = props.songs.map(song =>
    <div className="suggested-song" key={song.id}>
      <img src={song.thumb} alt=""/>
      <div className="suggested-song-info">
        <Link
          to={`/song/${changeAlias(song.songName)}/${changeAlias(song.id)}`}
          className='suggested-song-name'>{song.songName}</Link>
       {/* <a href="#" className='suggested-song-artist'>OnlyC, </a>
        <a href="#" className='suggested-song-artist' style={{marginLeft: '2px'}}>Lou Hoàng</a>*/}
      </div>
    </div>
  );

  return (
    <div className="suggested-section">
      <div className="suggested-section-heading">
        <h3>Gợi ý</h3>
      </div>
      <div className="suggested-section-body">
        { songList }
      </div>
    </div>
  );
}

export default SuggestedSection;