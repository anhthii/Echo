import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getSongUrl } from '../../utils/func';
import './index.sass';

const Playlist = ({ songs, className, page }) => {
  return (
    <ul className={`${className} playlist-tracks`}>
      {songs.map((song, index) => (
        <li className="playlist-track" key={`playlist-${song.id}`}>
          <span className='playlist-track-order'>
            {page ? (((page - 1) * 20) + index + 1) : (index + 1)}
          </span>
          <div className='playlist-track-title ellipsis'>
            <Link to={getSongUrl(song.title, song.id)}>{song.title}</Link>
          </div>
          <div className="playlist-track-artist">
            Justin Bieber
          </div>
          <div className="playlist-track-actions">
            actions
          </div>
        </li>
      ))}
    </ul>
  );
};

Playlist.propTypes = {
  songs: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Playlist;