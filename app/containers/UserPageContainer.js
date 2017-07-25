import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';

class UserPageContainer extends Component {
  render() {
    return (
      <Pages.UserPage
        playlists={this.props.playlists}
        dispatch={this.props.dispatch}
      />
    );
  }
}

function mapStateToProps({ playlistState }) {
  return { playlists: playlistState.playlists };
}

export default connect(mapStateToProps)(UserPageContainer);
