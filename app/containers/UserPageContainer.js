import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';

class UserPageContainer extends Component {
  render() {
    return (
      <Pages.UserPage
        playlists={this.props.playlists}
        dispatch={this.props.dispatch}
        songData={this.props.songData}
      />
    );
  }
}

function mapStateToProps({ playlistState, songData }) {
  return { playlists: playlistState.playlists, songData: songData.data };
}

export default connect(mapStateToProps)(UserPageContainer);
