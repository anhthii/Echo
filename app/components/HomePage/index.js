import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import './index.sass';

const HomePage = (props) =>
  <div className='homepage'>
    <TrackList tracks={props.tracks} />
  </div>;

HomePage.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default HomePage;
