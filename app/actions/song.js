import axios from 'axios';
import * as types from '../constant/action_constant';
import { togglePushRoute } from './queue';

export function fetchSong(name, id) {
  return dispatch => {
    dispatch({ type: types.START_FETCHING_SONG });

    axios.get(`/api/media/song?name=${name}&id=${id}`)
    .then(({ data }) => {
      dispatch({ type: types.FETCH_SONG_SUCCESS, data });

      dispatch(togglePushRoute(false));

      dispatch({ type: types.ADD_SONG_TO_QUEUE, song: { name: data.name, id, artist: data.artist } });
    })
    .catch(err => { throw err; });
  };
}

export function fetchSuggestedSongs(id) {
  return dispatch => {
    axios.get(`/api/media/suggested-song/${id}`)
      .then(({ data }) => dispatch({
        type: types.FETCH_SUGGESTED_SONG_SUCCESS,
        songs: data.songs,
      }))
      .catch(err => { throw err; });
  };
}