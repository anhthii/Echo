import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import chunk from 'lodash.chunk';
import GenreMenu from '../GenreMenu';
import Pagination from '../Pagination';
import LazyloadImage from '../LazyloadImage';
import './index.sass';

const AlbumPage = (props) => {
  const { defaultAlbums, albums, params } = props;

  return (
    <div>
      <GenreMenu type="album"/>
      <div className="album-view">
        { !albums.length && <DefaultAlbums origins={defaultAlbums} /> }
        { chunk(albums, 4).map((chunk, index) =>
          <AlbumRow key={`album-row-chunk${index}`} chunk={chunk}/>
        )}
        {
          params.title && params.id ?
            <Pagination
              {...params}
              pageChunks={props.pageChunks}
              pageChunkIndex={props.pageChunkIndex}
              chagePageChunkIndex={props.chagePageChunkIndex}
              type='album'
            /> : null
        }
      </div>
    </div>
  );
};

AlbumPage.propTypes = {
  defaultAlbums: PropTypes.array.isRequired,
  albums: PropTypes.array.isRequired,
  pageChunks: PropTypes.array.isRequired,
  pageChunkIndex: PropTypes.number.isRequired,
  chagePageChunkIndex: PropTypes.func.isRequired,
};

const DefaultAlbums = ({ origins }) => (
  <div>
    { origins.map(origin => <DefaultAlbumCards key={origin.id} {...origin} />) }
  </div>
);

const DefaultAlbumCards = ({ title, id, albums }) => (
  <div className="album-cards">
    <div className="album-cards-title">
      <a href='#'>{title} <i className='ion-chevron-right'></i></a>
    </div>
    { chunk(albums, 4).map((chunk, index) => (
      <AlbumRow key={`album-row-chunk${index}`} chunk={chunk}/>
    ))}
  </div>
);

const AlbumRow = ({ chunk }) => (
  <div className="album-cards-row">
    { chunk.map(album => <AlbumCard key={album.id} {...album} />) }
  </div>
);

const AlbumCard = (props) => (
  <div className="album-card">
    <Link Link to={`/album/playlist/${props.alias}/${props.id}`}>
      <LazyloadImage className="album-image" src={props.cover} />
    </Link>
    <div className="album-detail">
      <div className="album-title">
        <Link to={`/album/playlist/${props.alias}/${props.id}`}>{props.title}</Link>
      </div>
      <div className="album-artists">
        <a href='#'>Various artist</a>
      </div>
    </div>
  </div>
);




export default AlbumPage;
