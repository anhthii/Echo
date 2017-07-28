import React from 'react';
import { Link } from 'react-router';
import LazyloadImage from '../../LazyloadImage';
import LinksByComma from '../../LinksByComma';
import './album_card.sass';

const AlbumCard = (props) => (
  <div className="album-card">
    <Link to={`/album/playlist/${props.alias}/${props.id}`}>
      <LazyloadImage className="album-image" src={props.cover} />
    </Link>
    <div className="album-detail">
      <div className="album-title">
        <Link to={`/album/playlist/${props.alias}/${props.id}`}>{props.title}</Link>
      </div>
      <div className="album-artists">
        <LinksByComma
          data={props.artists}
          titleEntry="name"
          pathEntry="alias"
          definePath={(alias) => `/artist/${alias}`}
        />
      </div>
    </div>
  </div>
);

export default AlbumCard;
