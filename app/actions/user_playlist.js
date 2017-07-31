import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import * as types from '../constant/action_constant';
import { PLAYLIST_ENDPOINT } from '../constant/endpoint_constant';
import { loadUserData } from '../localStorage';

const instance = (accessToken) => {
  return axios.create({
    baseURL: PLAYLIST_ENDPOINT,
    ...accessToken && { headers: { Authorization: accessToken } },
  });
};

let cachedUser = {
  username: '',
  access_token: '',
};

function getUser() {
  if (cachedUser.username && cachedUser.access_token) {
    return cachedUser;
  }

  const user = loadUserData();
  if (user && user.username && user.access_token) {
    cachedUser.username = user.username;
    cachedUser.access_token = user.access_token;
  }
  return cachedUser;
}

export function getPlaylistCollection() {
  const { username, access_token } = getUser();
  return dispatch => {
    instance(access_token).get(`/${username}`)
      .then(({ data }) => dispatch({
        type: types.GET_PLAYLIST_COLLECTION,
        playlists: data,
      }))
      .catch(err => { throw err; });
  };
}

export function createPlaylist(title) {
  const { username, access_token } = getUser();
  return dispatch => {
    instance(access_token).post(`/${username}`, { title })
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
  const { username, access_token } = getUser();
  return dispatch => {
    instance(access_token).put(`/${username}/${playlistTitle}`, songObj)
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
  const { username, access_token } = getUser();
  return dispatch => {
    instance(access_token).delete(`/${username}/${playlistTitle}/${id}`)
      .then(({ data }) => dispatch({
        type: types.DELETE_SONG_FROM_PLAYLIST,
        playlists: data,
      }))
      .catch(err => { throw err; });
  };
}

export function deletePlaylist(playlistTitle) {
  const { username, access_token } = getUser();
  return dispatch => {
    instance(access_token).delete(`/${username}/${playlistTitle}`)
      .then(({ data }) => dispatch({
        type: types.DELETE_PLAYLIST,
        playlists: data,
      }))
      .catch(err => { throw err; });
  };
}

export function clearUserPlaylist() {
  // when user log out he will clear playlist so we also must clear cachedUser data
  cachedUser = {
    username: '',
    access_token: '',
  };

  return {
    type: types.CLEAR_USER_PLAYLIST,
  };
}
