import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/query';
import { MEDIA_ENDPOINT, ROOT_URL } from '../constant/endpoint_constant';


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
    dispatch({ type: types.START_DOWNLOADING, id });
    const url = filename ? `${ROOT_URL}/download/song/${songName}/${id}/${filename}` : `${ROOT_URL}/download/song/${songName}/${id}`;
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${songName}.mp3`;
        link.click();
        dispatch({ type: types.FINISH_DOWNLOADING });
      })
    .catch(err => console.log(err));
  };
}
