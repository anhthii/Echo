import axios from 'axios';
import { FETCH_TRACKS } from '../constant/action_constant';

export function fetchTracks() {
  return dispatch => {
    axios.get('/api/media/top100/IWZ9Z097')
      .then(({ data }) => {
        dispatch({ type: FETCH_TRACKS, tracks: data.data.songs });
      })
      .catch(err => console.log(err));
  };
}