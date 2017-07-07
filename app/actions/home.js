import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/query';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';


export function fetchTracks(page) {
  return dispatch => {
    dispatch({ type: types.START_FETCHING_TRACKS });

    axios.get(`${MEDIA_ENDPOINT}/top100/IWZ9Z088${pageQuery(page)}`)
      .then(({ data }) => {
        dispatch({ type: types.FETCH_TRACK_SUCCESS, tracks: data.data.songs, page });
      })
      .catch(() => dispatch({ type: types.FETCH_TRACK_FAILURE }));
  };
}
