import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../../utils/func';
import LinksByComma from '../../LinksByComma';

function SuggestedSection(props) {
  const songList = props.songs.map(song =>
    <div className="suggested-song" key={song.id}>
      <img src={song.thumb} alt=""/>
      <div className="suggested-song-info">
        <Link
          to={`/song/${changeAlias(song.songName)}/${changeAlias(song.id)}`}
          className='suggested-song-name'>{song.songName}</Link>
        <LinksByComma
          className="trackArtist"
          data={song.artists}
          titleEntry="name"
          pathEntry="alias"
          definePath={(alias) => `/artist/${alias}`}
        />
      </div>
    </div>
  );

  return (
    <div className="suggested-section">
      <div className="suggested-section-heading">
        <span>Suggested</span>
      </div>
      <div className="suggested-section-body">
        { songList }
      </div>
    </div>
  );
}

export default SuggestedSection;
