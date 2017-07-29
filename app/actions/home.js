import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/query';
import { MEDIA_ENDPOINT, ROOT_URL } from '../constant/endpoint_constant';
import {
  startDownloading,
  updateDownloadProgress,
  finishDownloading,
  startFading,
  stopFading,
} from '../actions/ui';

let cachedId = 'IWZ9Z097';

export function fetchTracks(page, id = 'IWZ9Z097') {
  return dispatch => {
    dispatch({ type: types.START_FETCHING_TRACKS });
    if (id !== cachedId) {
      dispatch(startFading()); // only fade when fetch new music type
      cachedId = id;
    }

    axios.get(`${MEDIA_ENDPOINT}/top100/${id}${pageQuery(page)}`)
      .then(({ data }) => {
        dispatch({ type: types.FETCH_TRACK_SUCCESS, tracks: data.data.songs, page, id });
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

export function download({ songName, id, filename }) {
  return dispatch => {
    dispatch(startDownloading(id)); // dispatch the action for showing loading progress bar

    const url = filename ? `${ROOT_URL}/download/song/${songName}/${id}/${filename}` :
      `${ROOT_URL}/download/song/${songName}/${id}`;

    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      onDownloadProgress: progressEvent => {
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        // do whatever you like with the percentage complete
        // maybe dispatch an action that will update a progress bar or something
        dispatch(updateDownloadProgress(percentCompleted));
      },
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${songName}.mp3`;
        link.click();

        dispatch(finishDownloading());
      })
    .catch(err => console.log(err));
  };
}
