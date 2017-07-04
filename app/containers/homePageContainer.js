import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components';
import { changeActiveChart } from '../actions/chart';
import { addSongToQueue } from '../actions/queue';
import { toggleTrackDropDown } from '../actions/ui';

class HomePageContainer extends Component {
  render() {
    return (
      <HomePage {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  const { activeChart } = state.chartState;
  const { isLoading, tracks } = state.trackState;

  return {
    chart: state.chartState[activeChart],
    show: state.UIState.dropDown.show,
    dropDownActiveId: state.UIState.dropDown.activeId,
    isLoading,
    tracks,
  };
}

export default connect(mapStateToProps,
{ changeActiveChart, addSongToQueue, toggleTrackDropDown })(HomePageContainer);

