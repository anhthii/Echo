import React from 'react';
import Playlist from '../../Playlist';
import { Karaoke } from '../../../containers';
import { isEmpty } from '../../../utils/func';
import './album_playlist.sass';

const AlbumPlaylist = ({ playlist, replaceQueue }) => {
  if (isEmpty(playlist)) return null;

  return (
    <div className='album-playlist'>
      <div className="album-playlist-header">
        <div className="album-playlist-thumb image-wrapper">
          <img src={playlist.album_playlist_thumb} alt=""/>
        </div>
        <div className="ap-info">
          <div className="ap-title">
            {playlist.album_title}
          </div>
          <div className="ap-artist">{playlist.artist}</div>
          <div className="ap-releaseY"><span>Release:</span> {playlist.release_year}</div>
          <div>
            Genres: {playlist.genres.join(', ')}
          </div>
        </div>
      </div>
      <div className="album-playlist-content">
        <Karaoke
          className='karaoke-album-playlist'
          fontSize="23px"
        />
        <div className='playlist-play-btn'>
          <button onClick={() => replaceQueue(playlist.songs)}>
            Play
          </button>
        </div>

        <Playlist songs={playlist.songs} className='ap' pathEntry="alias" />

        <div className='album-playlist-artist-info'>
          <div className="album-laylist-artist-thumb image-wrapper">
            <img src={playlist.artist_thumb} />
          </div>
          <div className='album-playlist-artist-description'>
            <p>
              {playlist.artist_info}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPlaylist;
