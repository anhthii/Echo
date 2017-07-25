import * as types from '../constant/action_constant';

const initialState = {
  playlists: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.GET_PLAYLIST_COLLECTION:
    return { playlists: action.playlists };

  case types.CREATE_PLAYLIST:
    return { playlists: [...state.playlists, {
      title: action.title,
      songs: [],
    }] };

  case types.ADD_SONG_TO_PLAYLIST:
  default:
    return state;
  }
}
