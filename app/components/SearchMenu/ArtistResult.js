import React from "react";
import { Link } from "react-router";

function ArtistResult({artists, clearSearchResult}) {
  artists = artists.map(artist =>{
    let alias = artist.link.split("/")[2];
    return {...artist, alias: alias}
  })
  return (
    <ul className="artist-result">
      <div className="search-li-title">Artist</div>
      {artists.map((artist, index) => (
        <li key={`${artist.alias}-${index}`}>
          <div className="search-li-detail">
            <img src={`${artist.thumbnail}`} alt="" />
            <div className="search-li-info">
              <div className="search-li-artist">
                <Link
                  to={`/artist/${artist.alias}`}
                  onClick={() => clearSearchResult()}
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
