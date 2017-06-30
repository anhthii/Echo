import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import './index.sass';

function HomePage(props) {
  return (
    <div className='homepage'>
      <TrackList tracks={props.tracks} addThumbnail={props.addThumbnail} />
    </div>
  );
}

HomePage.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default HomePage;