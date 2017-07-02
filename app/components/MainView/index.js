import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash.chunk';
import Pagination from '../Pagination';
import './index.sass';

const MainView = (props) => {
  const { type, params, chunkSize } = props;
  const { defaultAlbums, albums, Card } = props;

  return (
    <div className="view">
      { !albums.length && <Default origins={defaultAlbums} Card={Card} chunkSize={chunkSize}/> }

      { chunk(albums, chunkSize).map((chunk, index) =>
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card}/>
      )}
      {
        params.id && (params.title || params.name) ?
          <Pagination
            {...params}
            pageChunks={props.pageChunks}
            pageChunkIndex={props.pageChunkIndex}
            chagePageChunkIndex={props.chagePageChunkIndex}
            type={type}
          /> : null
      }
    </div>
  );
};

MainView.propTypes = {
  defaultAlbums: PropTypes.array.isRequired,
  albums: PropTypes.array.isRequired,
  pageChunks: PropTypes.array.isRequired,
  pageChunkIndex: PropTypes.number.isRequired,
  chagePageChunkIndex: PropTypes.func.isRequired,
  chunkSize: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const Default = ({ origins, Card, chunkSize }) => (
  <div>
    { origins.map(origin =>
      <DefaultCards key={origin.id} {...origin} Card={Card} chunkSize={chunkSize} />
    )}
  </div>
);

const DefaultCards = ({ title, id, albums, Card, chunkSize }) => (
  <div className="view-cards">
    <div className="view-cards-title">
      <a href='#'>{title} <i className='ion-chevron-right'></i></a>
    </div>
    { chunk(albums, 4).map((chunk, index) => (
      <Row key={`album-row-chunk${index}`} chunk={chunk} Card={Card} chunkSize={chunkSize}/>
    ))}
  </div>
);

const Row = ({ chunk, Card }) => (
  <div className="view-cards-row">
    { chunk.map(album => <Card key={album.id} {...album} />) }
  </div>
);

export default MainView;
