import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Queue } from '../components';
import { toggleQueue } from '../actions/ui';

class QueueContainer extends Component {
  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    return (
      <div>
        <Queue {...this.props}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    songs: state.queueState.queue,
  };
}

export default connect(mapStateToProps,
{ toggleQueue })(QueueContainer);