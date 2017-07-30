import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import * as types from '../constant/action_constant';
import { PLAYLIST_ENDPOINT } from '../constant/endpoint_constant';
import { loadUserData } from '../localStorage';

let cachedUsername = '';

function getUserName() {
  if (cachedUsername.length) { return cachedUsername; }
  if (loadUserData() && loadUserData().username) {
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
      .catch(err => toast.error(
        <div
          className='custom-toast-content ellipsis'
          title={`${title} playlist already exists`}
          dangerouslySetInnerHTML={{ __html: err.response.data }}>
        </div>
      ));
  };
}

export function addSongToPlaylist(playlistTitle, songObj) {
  return dispatch => {
    axios.put(`${PLAYLIST_ENDPOINT}/${getUserName()}/${playlistTitle}`, songObj)
      .then(() => {
        dispatch({
          type: types.ADD_SONG_TO_PLAYLIST,
          song: songObj,
          title: playlistTitle,
        });

        toast(
          <div
            className='custom-toast-content ellipsis'
            title={`${songObj.name} was added to ${playlistTitle} playlist`}
          >
            <span>{songObj.name}</span>
            was added to <span>{playlistTitle}</span> playlist
          </div>
        );
      })
      .catch(err => toast.error(
        <div
          className='custom-toast-content ellipsis'
          title={`${songObj.name} already exists in ${playlistTitle} playlist`}
          dangerouslySetInnerHTML={{ __html: err.response.data }}>
        </div>
      ));
  };
}


export function addSongToStoreTemporarily(song) {
  return {
    type: types.ADD_SONG_TO_STORE_TEMPORARILY,
    song,
  };
}

export function deleteSong(playlistTitle, id) {
  return dispatch => {
    axios.delete(`${PLAYLIST_ENDPOINT}/${getUserName()}/${playlistTitle}/${id}`)
      .then(({ data }) => dispatch({
        type: types.DELETE_SONG_FROM_PLAYLIST,
        playlists: data,
      }))
      .catch(err => { throw err; });
  };
}

export function deletePlaylist(playlistTitle) {
  return dispatch => {
    axios.delete(`${PLAYLIST_ENDPOINT}/${getUserName()}/${playlistTitle}`)
      .then(({ data }) => dispatch({
        type: types.DELETE_PLAYLIST,
        playlists: data,
      }))
      .catch(err => { throw err; });
  };
}

export function clearUserPlaylist() {
  cachedUsername = '';
  return {
    type: types.CLEAR_USER_PLAYLIST,
  };
}
