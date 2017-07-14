import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import Chart from '../Chart';
import './index.sass';

const HomePage = (props) =>
  <div className='homepage'>
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
};

export default HomePage;
