import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { toggleModal } from '../../actions/ui';
import { changeAlias } from '../../utils/func';
import {
  createPlaylist,
  addSongToPlaylist,
  getPlaylistCollection,
} from '../../actions/user_playlist';
import './index.sass';

class Modal extends Component {
  state = {
    animate: false,
    leave: false,
    showInput: false,
  }

  handleClickOutside = () => {
    this.setState({ leave: true });
    setTimeout(() => {
      this.props.dispatch(toggleModal());
    }, 700);
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.dispatch(getPlaylistCollection());
    }

    this.setState({ animate: true });
  }

  handleCloseModal() {
    this.setState({ leave: true });
    setTimeout(() => {
      this.props.dispatch(toggleModal());
    }, 700);
  }

  handleOnClick() {
    this.setState({ showInput: true });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    // sanitize playlist's title before submitting to server
    const playlistTitle = changeAlias(this.input.value);
    this.props.dispatch(createPlaylist(playlistTitle));
    this.setState({ showInput: false });
  }

  renderInputField() {
    return this.state.showInput &&
      <form onSubmit={this.handleOnSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Enter the playlist title"
          className="form-control"
          ref={node => this.input = node}
        />
      </form>;
  }

  handleAddSongToPlaylist(playlist) {
    const { song, dispatch } = this.props;
    dispatch(addSongToPlaylist(playlist, song));
    this.handleCloseModal();
  }

  renderModal() {
    const { animate, leave } = this.state;
    const className = `modal animated ${animate &&
      (leave ? 'bounceOutDown' : 'bounceInDown')}`;

    return (
      <div className={className}>
        <button
          className="modal-close-btn sc-ir"
          onClick={this.handleCloseModal.bind(this)}
        >Create a playlist
          <i className="ion-close-round"></i>
        </button>
        {
          !this.props.playlists.length &&
          <div className="modal-warn">
            You don't have any playlists yet
          </div>
        }
        <button
          className="playlist-btn"
          onClick={this.handleOnClick.bind(this)}
        >Create a playlist
          <i className="ion-plus"></i>
        </button>
        {this.renderInputField()}
        <div className="modal-playlists">
          {this.props.playlists.map(playlist =>
            <div
              className="modal-playlist"
              key={`modal-${playlist}`}
              onClick={this.handleAddSongToPlaylist.bind(this, playlist)}
            >
              {playlist}
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="modal-wrapper">
        {this.renderModal()}
      </div>
    );
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired,
  song: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default onClickOutside(Modal);
