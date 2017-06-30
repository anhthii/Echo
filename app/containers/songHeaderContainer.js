import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SongHeader } from '../components';
import { updatePlayedPercent } from '../actions/player';

class SongHeaderContainer extends Component {
  render() {
    return <SongHeader { ...this.props } />;
  }
}

function mapStateToProps(state) {
  const {
    playerState,
    seekBarState,
    songData: { data: { cover, artist, name, lyric }, isFetching },
  } = state;

  return { playerState,
    seekBarState,
    isFetching,
    cover: cover || '',
    artist,
    name,
    showInfo: lyric && !lyric.length };
}

export default connect(mapStateToProps,
  { updatePlayedPercent })(SongHeaderContainer);
