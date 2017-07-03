import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Karaoke } from '../components';
import { updatePlayedPercent } from '../actions/player';

class KaraokeContainer extends Component {
  render() {
    return <Karaoke { ...this.props } />;
  }
}

function mapStateToProps(state) {
  const {
    playerState,
    songData: { data: { cover, artist, name, lyric }, isFetching },
  } = state;

  return { playerState,
    isFetching,
    cover: cover || '',
    artist,
    name,
    showInfo: lyric && !lyric.length };
}

KaraokeContainer.propTypes = {
  className: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
};

export default connect(mapStateToProps,
  { updatePlayedPercent })(KaraokeContainer);
