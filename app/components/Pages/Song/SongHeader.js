import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isAuthenticated } from '../../../HOC';
import { changeAlias } from '../../../utils/func';

const SongHeader = (props) => {
  const {
    songData,
    download,
    downloadProgress,
    authenticated,
    redirectTo,
    user,
  } = props;
  const artists = songData.artists_names && songData.artists_names.split(/\s*,\s*/);

  return (
    <div className="song-header">
      {/* <div className="song-header-img">
      </div> */}
      <div className="song-header-info">
        <div className="song-header-song-title">
          {songData.name}
        </div>
        <div className="song-header-song-artist">
          <Link
            to={`/artist/${artists && changeAlias(artists[0])}`}
            className='ellipsis'
            title={songData.artist}
          >{songData.artist}
          </Link>
        </div>
      </div>
      <div className="song-header-actions">
        <button className="sc-ir"
          title="Dowload the song"
          onClick={() => download({
            songName: changeAlias(songData.name),
            id: songData.id,
          })}
        ><i className="ion-ios-download-outline"></i></button>
        <button className="sc-ir"
          title="Add this song to your playlists"
          onClick={() => {
            if (!(authenticated && user.username)) {
              // remove the dropdown from the interface
              return redirectTo('/login');
            }

            props.addSongToStoreTemporarily({
              name: songData.name,
              artists: songData.artist,
              id: songData.id,
              thumbnail: 'http://zmp3-photo-td.zadn.vn/noimage',
            });
            props.toggleModal();
          }}
        ><i className="ion-ios-plus-empty"></i></button>
      </div>
      { downloadProgress.isDownloading && <span>The song will be downloaded in a few seconds..</span> }
    </div>
  );
};

SongHeader.propTypes = {
  songData: PropTypes.object.isRequired,
  download: PropTypes.func.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  addSongToStoreTemporarily: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default isAuthenticated(SongHeader);
