import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components';
import { changeActiveChart } from '../actions/chart';

class HomePageContainer extends Component {
  render() {
    const { chart, tracks, changeActiveChart } = this.props;

    return (
      <HomePage
        chart={chart}
        tracks={tracks}
        changeActiveChart={changeActiveChart}
      />
    );
  }
}

function mapStateToProps(state) {
  const { activeChart } = state.chartState;

  return {
    chart: state.chartState[activeChart],
    tracks: state.trackState.tracks,
  };
}

export default connect(mapStateToProps, { changeActiveChart })(HomePageContainer);

