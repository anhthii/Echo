import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';

class UserPageContainer extends Component {
  render() {
    return (
      <Pages.UserPage
        playlists={this.props.playlists}
        dispatch={this.props.dispatch}
        queueIds={this.props.queueIds}
      />
    );
  }
}

function mapStateToProps({ playlistState, queueState }) {
  return { playlists: playlistState.playlists, queueIds: queueState.ids };
}

export default connect(mapStateToProps)(UserPageContainer);
