import axios from 'axios';
import * as types from '../constant/action_constant';
import { PLAYLIST_ENDPOINT } from '../constant/endpoint_constant';
import { loadUserData } from '../localStorage';

let cachedUsername = '';

function getUserName() {
  if (cachedUsername.length) { return cachedUsername; }
  if (loadUserData().username) {
    cachedUsername = loadUserData().username;
  }
  return cachedUsername;
}

export function getPlaylistCollection() {
  return dispatch => {
    axios.get(`${PLAYLIST_ENDPOINT}/${getUserName()}`)
      .then(({ data }) => dispatch({
        type: types.GET_PLAYLIST_COLLECTION,
        playlists: data,
      }))
      .catch(err => { throw err; });
  };
}

export function createPlaylist(title) {
  return dispatch => {
    axios.post(`${PLAYLIST_ENDPOINT}/${getUserName()}`, { title })
      .then(() => dispatch({
        type: types.CREATE_PLAYLIST,
        title,
      }))
      .catch(err => alert(err.response.data));
  };
}

export function addSongToPlaylist(playlistTitle, songObj) {
  return dispatch => {
    axios.put(`${PLAYLIST_ENDPOINT}/${getUserName()}/${playlistTitle}`, songObj)
      .then(() => dispatch({
        type: types.ADD_SONG_TO_PLAYLIST,
        song: songObj,
        title: playlistTitle,
      }))
      .catch(err => { throw err; });
  };
}


export function addSongToStoreTemporarily(song) {
  return {
    type: types.ADD_SONG_TO_STORE_TEMPORARILY,
    song,
  };
}
