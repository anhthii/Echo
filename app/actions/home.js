import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/query';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { startFading, stopFading } from '../actions/ui';

// the POP music type id
let cachedId = 'ZWZB96AB';

export function fetchTracks(page, id = 'ZWZB96AB') {
  return dispatch => {
    dispatch({ type: types.START_FETCHING_TRACKS });
    if (id !== cachedId) {
      dispatch(startFading()); // only fade when fetch new music type
      cachedId = id;
    }

    axios.get(`${MEDIA_ENDPOINT}/top100/${id}${pageQuery(page)}`)
      .then(({ data }) => {
        dispatch({ type: types.FETCH_TRACK_SUCCESS, tracks: data.items, page, id });
        dispatch(stopFading());
      })
      .catch(() => {
        dispatch({ type: types.FETCH_TRACK_FAILURE });

        if (id !== cachedId) {
          dispatch(stopFading());
        }
      });
  };
}
