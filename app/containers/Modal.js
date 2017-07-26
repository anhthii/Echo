import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from '../components';
import { getPlaylistCollection } from '../actions/user_playlist';

class ModalContainer extends Component {
  componentDidMount() {
    if (!this.props.playlists.length) {
      this.props.dispatch(getPlaylistCollection());
    }
  }

  render() {
    const { dispatch, playlists, song } = this.props;

    return this.props.showModal
      ? <Modal
        dispatch={dispatch}
        playlists={playlists}
        song={song}
      />
      : null;
  }
}

function mapStateToProps({ UIState, playlistState }) {
  const playlists = playlistState.playlists.length
    ? playlistState.playlists.map(playlist => playlist.title)
    : [];

  return {
    showModal: UIState.showModal,
    playlists,
    song: playlistState.tmpSong,
  };
}

export default connect(mapStateToProps)(ModalContainer);
