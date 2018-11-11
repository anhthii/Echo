import axios from 'axios';
import * as types from '../constant/action_constant';
import { startLoading, finishLoading } from './ui';

export function setNumberOfPages(numberOfPages) {
  return {
    type: types.SET_NUMBER_OF_PAGES,
    numberOfPages,
  };
}

export function clearArtist() {
  return {
    type: types.CLEAR_ARTIST,
  };
}

export function clearArtists() {
  return {
    type: types.CLEAR_ARTISTS,
  };
}

export function changePageChunkIndex(pageChunkIndex) {
  return {
    type: types.CHANGE_PAGE_CHUNK_INDEX,
    pageChunkIndex,
  };
}

export function fetchDefaultArtists() {
  return dispatch => {
    dispatch(startLoading());
    axios.get('/api/media/artists/default')
      .then(({ data }) => {
        dispatch({ type: types.FETCH_DEFAULT_ARTISTS, defaultArtists: data.origins });
        dispatch(finishLoading());
      })
      .catch(err => { dispatch(finishLoading()); throw err; });
  };
}

export function fetchArtists(genre, id, page) {
  const pageQuery = page ? `&page=${page}` : '';
  return dispatch => {
    dispatch(startLoading());
    axios.get(`/api/media/artists?genre=${genre}&id=${id}${pageQuery}`)
      .then(({ data }) => {
        dispatch({
          type: types.FETCH_ARTISTS,
          artists: data.artists,
          numberOfPages: data.numberOfPages,
        });
        dispatch(finishLoading());
      })
      .catch(err => { dispatch(finishLoading()); throw err; });
  };
}

export function fetchArtist(name, type = 'songs', page) {
  const pageQuery = page ? `?page=${page}` : '';
  return dispatch => {
    axios.get(`/api/media/artist/${name}/${type}${pageQuery}`)
      .then(({ data }) => {
        switch (type) {
        case 'songs':
          dispatch(fetchSong(data));
          break;

        case 'albums':
          dispatch(fetchAlbum(data));
          break;

        case 'biography':
          dispatch(fetchBio(data));
          break;

        default:
        }
      })
      .catch(err => { throw err; });
  };
}


function fetchSong(data) {
  return {
    type: types.FETCH_SINGLE_ARTIST_SONGS,
    ...data,
  };
}

function fetchAlbum(data) {
  return {
    type: types.FETCH_SINGLE_ARTIST_ALBUMS,
    ...data,
  };
}

function fetchBio(data) {
  return {
    type: types.FETCH_SINGLE_ARTIST_BIOGRAPHY,
    ...data,
  };
}
