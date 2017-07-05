import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Player } from '../components';
import { updateLyric, updateLyricPercent } from '../actions/player';
import { toggleQueue } from '../actions/ui';
import { togglePushRoute } from '../actions/queue';
import * as songActions from '../actions/song';

class PlayerContainer extends Component {
  render() {
    return (
      <Player {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  const { playerState, songData, routing, queueState } = state;

  return {
    playerState,
    songData: songData.data,
    isFetching: songData.isFetching,
    routing,
    queue: queueState.queue,
    queueIds: queueState.ids,
  };
}

export default connect(mapStateToProps,
  { updateLyric,
    updateLyricPercent,
    toggleQueue,
    togglePushRoute,
    ...songActions,
  })(PlayerContainer);

