import axios from 'axios';
import * as types from '../constant/action_constant';


export function fetchArtist(name, type = 'songs') {
  return dispatch => {
    axios.get(`/api/media/artist/${name}/${type}`)
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