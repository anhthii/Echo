import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import Chart from '../Chart';
import './index.sass';

const HomePage = (props) =>
  <div className='homepage'>
    <TrackList tracks={props.tracks} />
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
};

export default HomePage;
