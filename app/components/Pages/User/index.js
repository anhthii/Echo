import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { createPlaylist } from '../../../actions/user_playlist';
import './index.sass';

class UserPage extends React.Component {
  state = {
    showInput: false,
  }

  handleClickOutside = () => {
    this.setState({ showInput: false });
  }

  handleOnClick() {
    this.setState({ showInput: true });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const playlistTitle = this.input.value;

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

  render() {
    const { playlists, dispatch } = this.props;

    return (
      <div className="user-page">
        <div className="user-page-left">
          <button
            className="playlist-btn"
            onClick={this.handleOnClick.bind(this)}
          >Create a playlist
            <i className="ion-plus"></i>
          </button>
          {this.renderInputField()}
          {playlists.map(playlist =>
            <Playlist playlist={playlist} key={`playlist${playlist.title}`}/>
          )}
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  playlists: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const Playlist = ({ playlist }) => {
  const { songs, title } = playlist;

  return (
    <div className="user-playlist">
      <div className="user-playlist-header">
        <div className="user-playlist-title">{title}</div>
        <b>{songs.length}</b> songs
        <i className="ion-arrow-down-b"></i>
      </div>
      <div className="user-playlist-play-btn">
        <button className="sc-ir">
          <i className="ion-play"></i>
        </button>
      </div>
      <List songs={songs}/>
    </div>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
};

const List = ({ songs }) => {
  return (
    <ul className="user-playlist-inside">
      {songs.map(song => (
        <li className="playlist-song" key={`playlist-song${song.id}`}>
          <div className="playlist-song-title">
            <a href="#">{song.name}</a>
          </div>
          <div className="playlist-song-artists">
            Justin Bieber
          </div>
          <div className="playlist-song-remove-btn">
            <button className="sc-ir">
              <i className="ion-android-close"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default onClickOutside(UserPage);
