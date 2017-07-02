import React from 'react';
import Playlist from '../../Playlist';
import WithBackgroundImage from '../../WithBgImg';
import './index.sass';

const ArtistPage = ({ avatar, cover, songs, artistName }) => {
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
      <Playlist className='artist-playlist' songs={songs}/>
    </div>
  );
};


export default ArtistPage;