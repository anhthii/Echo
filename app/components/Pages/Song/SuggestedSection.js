import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../../utils/func';
import LinksByComma from '../../LinksByComma';

const songList = (songList) => {
  return songList.map(song =>
    <div className="suggested-song" key={song.id}>
      <img src={song.thumbnail} alt=""/>
      <div className="suggested-song-info">
        <Link
          to={`/song/${changeAlias(song.name)}/${song.id}`}
          className='suggested-song-name'>{song.name}</Link>
        <LinksByComma
          className="trackArtist"
          data={song.artists}
          titleEntry="name"
          pathEntry="link"
          definePath={(link) => link.replace('/nghe-si/', '/artist/')}
          defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
        />
      </div>
    </div>
  );
};

function SuggestedSection(props) {
  const list1 = props.songs.slice(0, 10);
  const list2 = props.songs.slice(11);

  return (
    <div className="suggested-section">
      <div className="suggested-section-heading">
        <span>Suggested</span>
      </div>
      <div className="suggested-section-body suggested-left">
        { songList(list1) }
      </div>
      <div className="suggested-section-body suggested-right">
        { songList(list2) }
      </div>
    </div>
  );
}

export default SuggestedSection;
