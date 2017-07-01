import React from 'react';
import { Link } from 'react-router';
import { KaraokeContainer } from '../../containers';
import { getSongUrl } from '../../utils/func';
import './index.sass';

/*const tweakThePlaylist = (songs) => {
  return playlist.reduce((newobj, currobj) => {

  }, {});
};
*/

const AlbumPlaylist = ({ playlist }) => {
  if (!Object.keys(playlist).length) return null;

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
        <KaraokeContainer
          className='karaoke-album-playlist'
          fontSize="23px"
        />
        <div className='playlist-play-btn'>
          <button>Play</button>
        </div>
        <ul className="album-playlist-tracks">
          {playlist.songs.map((song, index) => (
            <li className="album-playlist-track" key={`playlist-${song.id}`}>
              <span className='ap-track-order'>{index + 1}</span>
              <div className='ap-track-title'>
                <Link to={getSongUrl(song.title, song.id)}>{song.title}</Link>
              </div>
              <div className="ap-track-artist">
                Justin Bieber
              </div>
              <div className="ap-track-actions">
                actions
              </div>
            </li>
          ))}
        </ul>
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
