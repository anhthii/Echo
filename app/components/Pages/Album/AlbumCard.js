import React from 'react';
import { Link } from 'react-router';
import LazyloadImage from '../../LazyloadImage';
import LinksByComma from '../../LinksByComma';
import './album_card.sass';

const AlbumCard = (props) => {
  let alias = props.link.split("/")[2];
    return (
    <div className="album-card">
      <Link to={`/album/playlist/${alias}/${props.encodeId}`}>
        <LazyloadImage className="album-image" src={props.thumbnailM} />
      </Link>
      <div className="album-detail">
        <div className="album-title">
          <Link to={`/album/playlist/${alias}/${props.encodeId}`}>{props.title}</Link>
        </div>
        <div className="album-artists">
          <LinksByComma
            data={props.artists? props.artists: []}
            titleEntry="name"
            pathEntry="alias"
            definePath={(alias) => `/artist/${alias}`}
          />
        </div>
      </div>
    </div>
  )
};

export default AlbumCard;
