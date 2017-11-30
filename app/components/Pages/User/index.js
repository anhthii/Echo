import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getSongUrl, changeAlias, isEmpty } from '../../../utils/func';
import { createPlaylist, deleteSong, deletePlaylist } from '../../../actions/user_playlist';
import { playUserPlaylist } from '../../../actions/queue';
import { fetchSong, fetchSuggestedSongs } from '../../../actions/song';
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

  render() {
    const { playlists } = this.props;

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
            <Playlist playlist={playlist}
              key={`playlist${playlist.title}`}
              {...this.props}
            />
          )}
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  playlists: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired,
};

class Playlist extends React.Component {
  state = {
    expand: false,
  };

  toggleExpand(e) {
    // do nothing if the playlist has no songs
    if (!this.props.playlist.songs.length) { return; }

    const $list = e.target.closest('.user-playlist-header').nextSibling;
    this.setState({ expand: !this.state.expand });

    if ($list.style.maxHeight) {
      $list.style.maxHeight = null;
    } else {
      $list.style.maxHeight = `${$list.scrollHeight}px`;
    }
  }

  play() {
    if (!this.props.playlist.songs.length) { return; }


    const { dispatch, songData } = this.props;
    const firstSong = this.props.playlist.songs[0];
    const { name, id } = firstSong;
    // play the first song if there is no song in the queue
    if (isEmpty(songData)) {
      dispatch(fetchSong(changeAlias(name), id));
      // dispatch(fetchSuggestedSongs(id));
    }

    dispatch(playUserPlaylist(this.props.playlist.songs));
  }

  render() {
    const { songs, title } = this.props.playlist;
    const { dispatch, playlist } = this.props;
    const whichIcon = this.state.expand ? 'down' : 'right';
    const iconCLassName = `ion-arrow-${whichIcon}-b`;

    return (
      <div className="user-playlist">
        <div
          className="user-playlist-header"
          onClick={this.toggleExpand.bind(this)}
        >
          <div className="user-playlist-title">{title}</div>
          <div className="user-playlist-play-btn">
            <button className="sc-ir playlist-play-btn" onClick={this.play.bind(this)}>
              <img src="/svg/play-button-inside-a-circle.svg" alt=""/>
            </button>
          </div>
          <b>{songs.length}</b> songs
          <button
            className="sc-ir playlist-remove-btn"
            onClick={() => dispatch(deletePlaylist(title))}
          >
            <i className="ion-android-close"></i>
          </button>
          <i className={iconCLassName}></i>
        </div>
        <List songs={songs} dispatch={dispatch} playlistTitle={playlist.title}/>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired,
};

const List = ({ songs, dispatch, playlistTitle }) => {
  return (
    <ul className="user-playlist-inside">
      <ReactCSSTransitionGroup
        transitionName="playlist-song"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {songs.map(song => (
          <li className="playlist-song" key={`playlist-song${song.id}`}>
            <div className="playlist-song-thumbnail">
              <img src={song.thumbnail} />
            </div>
            <div className="playlist-song-title ellipsis">
              <Link to={getSongUrl(song.name, song.id)}>{song.name}</Link>
            </div>
            <div className="playlist-song-artists">
              {
                Array.isArray(song.artists)
                ? <LinksByComma
                  data={song.artists}
                  titleEntry="name"
                  pathEntry="link"
                  definePath={(link) => link.replace('/nghe-si/', '/artist/')}
                  defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
                  />
                : song.artists
              }

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
      </ReactCSSTransitionGroup>
    </ul>
  );
};

List.propTypes = {
  songs: PropTypes.array.isRequired,
  playlistTitle: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default UserPage;
