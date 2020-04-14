import React from "react";
import { Link } from "react-router";

function ArtistResult(props) {
  return (
    <ul className="artist-result">
      <div className="search-li-title">Artist</div>
      {props.artists.map((artist, index) => (
        <li key={`${artist.alias}-${index}`}>
          <div className="search-li-detail">
            <img src={`${artist.thumbnail}`} alt="" />
            <div className="search-li-info">
              <div className="search-li-artist">
                <Link
                  to={`/artist/${artist.alias}`}
                  onClick={() => props.clearSearchResult()}
                >
                  {artist.name}
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ArtistResult;
