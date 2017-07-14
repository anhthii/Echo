import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/query';
import { MEDIA_ENDPOINT, ROOT_URL } from '../constant/endpoint_constant';
import { startDownloading, updateDownloadProgress, finishDownloading } from '../actions/ui';


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
