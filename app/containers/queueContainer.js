import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Queue } from '../components';
import { clearQueue, removeSongFromQueue } from '../actions/queue';
import { toggleQueue } from '../actions/ui';

class QueueContainer extends Component {
  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    return <Queue {...this.props}/>;
  }
}

function mapStateToProps(state) {
  return {
    songs: state.queueState.queue,
  };
}

export default connect(mapStateToProps,
{ toggleQueue, clearQueue, removeSongFromQueue })(QueueContainer);
