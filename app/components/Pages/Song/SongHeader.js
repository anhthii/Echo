import React from 'react';

const SongHeader = () => {
  return (
    <div className="song-header">
      {/* <div className="song-header-img">
      </div> */}
      <div className="song-header-info">
        <div className="song-header-song-title">
          Payphone
        </div>
        <div className="song-header-song-artist">
          <a href="#">The chainsmokers</a>
        </div>
      </div>
      <div className="song-header-actions">
        <button className="sc-ir"
          title="Dowload the song"
        ><i className="ion-ios-download-outline"></i></button>
        <button className="sc-ir"
          title="Add this song to your playlists"
        ><i className="ion-ios-plus-empty"></i></button>
      </div>
      <span>The song will be downloaded in a few seconds..</span>
    </div>
  );
};

export default SongHeader;
