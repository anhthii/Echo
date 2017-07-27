import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { logout } from '../actions/auth';
import { isAuthenticated } from '../HOC';

class UserPageContainer extends Component {
  componentDidMount() {
    const { authenticated, params, user, redirectTo } = this.props;
    if (authenticated && params.username !== user.username) {
      this.props.dispatch(logout());
      redirectTo('/login');
    } else if (!authenticated) {
      redirectTo('/login');
    }
  }


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

export default connect(mapStateToProps)(isAuthenticated(UserPageContainer));
