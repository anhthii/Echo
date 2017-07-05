import React from 'react';
import Playlist from '../../Playlist';
import Pagination from '../../Pagination';
import WithBackgroundImage from '../../WithBgImg';
import './index.sass';

const ArtistPage = (props) => {
  const { avatar, cover, songs, artistName, pageChunks, pageChunkIndex } = props;

  return (
    <div className="artist-page">
      <WithBackgroundImage className="artist-page-header" src={cover}>
        <div className="artist-box">
          <div className="artist-avatar image-wrapper">
            <img src={avatar}/>
          </div>
          <div className="aritst-name">
            {artistName}
          </div>
        </div>
      </WithBackgroundImage>

      <button onClick={() => props.replaceQueue(songs)}>play</button>

      <Playlist className='artist-playlist' songs={songs} />
      <Pagination
        pageChunks={pageChunks}
        pageChunkIndex={pageChunkIndex}
        type="single-artist"
        artistName={artistName}
        changePageChunkIndex={props.changePageChunkIndex}
        activePage={props.activePage}
      />
    </div>
  );
};


export default ArtistPage;
