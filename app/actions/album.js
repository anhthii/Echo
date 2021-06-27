import axios from 'axios';
import * as types from '../constant/action_constant';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { startLoading, finishLoading } from './ui';

export function clearAlbums() {
  return {
    type: types.CLEAR_ALBUMS,
  };
}

export function setNumberOfPages(numberOfPages) {
  return {
    type: types.SET_NUMBER_OF_PAGES,
    numberOfPages,
  };
}

export function changePageChunkIndex(pageChunkIndex) {
  return {
    type: types.CHANGE_PAGE_CHUNK_INDEX,
    pageChunkIndex,
  };
}

export function fetchDefaultAlbums() {
  return dispatch => {
    dispatch(startLoading());

    axios.get(`${MEDIA_ENDPOINT}/albums/default`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          dispatch({ type: types.FETCH_DEFAULT_ALBUMS, defaultAlbums: data });

          dispatch(clearAlbums()); // clear the albums data
          dispatch(finishLoading());
        }
      })
      .catch(err => {
        dispatch(finishLoading());
        throw err;
      });
  };
}

export function fetchAlbums(genre, id, page) {
  const pageQuery = page ? `&page=${page}` : '';
  return dispatch => {
    dispatch(startLoading());

    axios.get(`${MEDIA_ENDPOINT}/albums?genre=${genre}&id=${id}${pageQuery}`)
      .then(({ data }) => {
        if (data.items && data.items.length) {
          dispatch({ type: types.FETCH_ALBUMS, albums: data.items});

          dispatch(setNumberOfPages(Math.round(data.total/20)));
          dispatch(finishLoading());
        }
      })
      .catch(err => { dispatch(finishLoading()); throw err; });
  };
}

export function fetchAlbumPlaylist(title, id) {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/album_playlist?title=${title}&id=${id}`)
      .then(({ data }) => {
        dispatch({ type: types.FETCH_ALBUM_PLAYLIST, playlist: data });
      })
      .catch(err => { throw err; });
  };
}

export function clearPlaylist() {
  return { type: types.CLEAR_PLAYLIST };
}

