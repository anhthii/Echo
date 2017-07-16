import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import Chart from '../Chart';
import Choices from './Choices';
import './index.sass';

const HomePage = (props) =>
  <div className='homepage'>
    <div className="home-nav">
      <Choices fetchTracks={props.fetchTracks} />
    </div>
    <TrackList {...props} />
    <div className='chart-wrapper'>
      <button onClick={() => props.changeActiveChart('kpop')}>Kpop</button>
      <button onClick={() => props.changeActiveChart('vpop')}>vpop</button>
      <button onClick={() => props.changeActiveChart('pop')}>pop</button>
      <Chart chart={props.chart}/>
    </div>
  </div>;

HomePage.propTypes = {
  tracks: PropTypes.array.isRequired,
  chart: PropTypes.object.isRequired,
  changeActiveChart: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  dropDownActiveId: PropTypes.string.isRequired,
  addSongToQueue: PropTypes.func.isRequired,
  toggleTrackDropDown: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  fetchTracks: PropTypes.func.isRequired,
};

export default HomePage;
