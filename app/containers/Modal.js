import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from '../components';

class ModalContainer extends Component {
  render() {
    const { dispatch, playlists, song, authenticated } = this.props;

    return this.props.showModal
      ? <Modal
        dispatch={dispatch}
        playlists={playlists}
        song={song}
        authenticated={authenticated}
      />
      : null;
  }
}

function mapStateToProps({ UIState, playlistState, auth }) {
  const playlists = playlistState.playlists.length
    ? playlistState.playlists.map(playlist => playlist.title)
    : [];

  return {
    showModal: UIState.showModal,
    playlists,
    song: playlistState.tmpSong,
    authenticated: auth.authenticated,
  };
}

export default connect(mapStateToProps)(ModalContainer);
