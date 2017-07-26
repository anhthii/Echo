import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { getSongUrl } from '../../../utils/func';
import { createPlaylist, deleteSong } from '../../../actions/user_playlist';
import LinksByComma from '../../LinksByComma';

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
            <Playlist playlist={playlist} key={`playlist${playlist.title}`} dispatch={dispatch}/>
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

class Playlist extends React.Component {
  expand(e) {
    e.stopPropagation();
    const $list = e.target.closest('.user-playlist-header').nextSibling;
    if ($list.style.maxHeight) {
      $list.style.maxHeight = null;
    } else {
      $list.style.maxHeight = `${$list.scrollHeight}px`;
    }
  }

  render() {
    const { songs, title } = this.props.playlist;
    const { dispatch, playlist } = this.props;

    return (
      <div className="user-playlist">
        <div
          className="user-playlist-header"
          onClick={this.expand.bind(this)}
        >
          <div className="user-playlist-title">{title}</div>
          <b>{songs.length}</b> songs
          <i className="ion-arrow-down-b"></i>
        </div>
        {/* <div className="user-playlist-play-btn">
          <button className="sc-ir">
            <i className="ion-play"></i>
          </button>
        </div> */}
        <List songs={songs} dispatch={dispatch} playlistTitle={playlist.title}/>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const List = ({ songs, dispatch, playlistTitle }) => {
  return (
    <ul className="user-playlist-inside">
      {songs.map(song => (
        <li className="playlist-song" key={`playlist-song${song.id}`}>
        <div className="playlist-song-thumbnail">
          <img src={song.thumbnail} />
        </div>
          <div className="playlist-song-title ellipsis">
            <Link to={getSongUrl(song.name, song.id)}>{song.name}</Link>
          </div>
          <div className="playlist-song-artists">
            <LinksByComma
              data={song.artists}
              titleEntry="name"
              pathEntry="link"
              definePath={(link) => link.replace('/nghe-si/', '/artist/')}
              defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
            />
          </div>
          <div className="playlist-song-remove-btn">
            <button
              className="sc-ir"
              onClick={() => dispatch(deleteSong(playlistTitle, song.id))}
            >
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
  playlistTitle: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default onClickOutside(UserPage);
