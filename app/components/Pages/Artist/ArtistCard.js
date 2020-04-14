import React from "react";
import { Link } from "react-router";
import LazyloadImage from "../../LazyloadImage";
import "./artist_card.sass";

const ArtistCard = props => {
  let alias;
  if (props.link) {
    alias = props.link.substring(props.link.lastIndexOf("/") + 1);
  }

  const url = `/artist/${alias}`;

  return (
    <div className="artist-card">
      <Link to={url}>
        <LazyloadImage className="artist-image" src={props.thumb} />
      </Link>
      <div className="artist-detail">
        <div className="artist-title">
          <Link to={url}>{props.name}</Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
