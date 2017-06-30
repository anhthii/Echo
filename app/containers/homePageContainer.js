import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components';

class HomePageContainer extends Component {
  render() {
    return (
      <HomePage {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.trackState.tracks,
  };
}

export default connect(mapStateToProps)(HomePageContainer);

