import React from "react";
import { Link } from "react-router";

function SongResult({ songs, clearSearchResult }) {
  return (
    <ul className="song-result">
      <div className="search-li-title">Songs</div>
      {songs.map(song => (
        <li key={`song-result${song.encodeId}`}>
          <div className="search-li-detail">
            <img src={`${song.thumbnailM}`} alt="" />
            <div className="search-li-info">
              <div>
                <Link
                  to={`/song/${song.alias}/${song.encodeId}`}
                  onClick={e => {
                    if (song.streaming_status == 2) {
                      e.preventDefault();
                      alert("only vip users can see this");
                    }

                    clearSearchResult();
                  }}
                >
                  {song.title}
                </Link>
              </div>
              <div className="search-li-artist">
                {song.artistsNames}
                {song.streamingStatus == 2 ? (
                  <span className="vip-required">Vip</span>
                ) : null}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SongResult;
