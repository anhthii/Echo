import * as types from '../constant/action_constant';
import { findIndex } from '../utils/func';

const initialState = {
  playlists: [],
  tmpSong: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.GET_PLAYLIST_COLLECTION:
    return { ...state, playlists: action.playlists };

  case types.CREATE_PLAYLIST:
    return {
      ...state,
      playlists: [...state.playlists, {
        title: action.title,
        songs: [],
      }],
    };

  case types.DELETE_PLAYLIST:
    return { ...state, playlists: action.playlists };

  case types.ADD_SONG_TO_PLAYLIST:
    return addSongToPlaylist(state, action);

  case types.ADD_SONG_TO_STORE_TEMPORARILY:
    return { ...state, tmpSong: action.song };

  case types.DELETE_SONG_FROM_PLAYLIST:
    return { ...state, playlists: action.playlists };

  case types.CLEAR_USER_PLAYLIST:
    return initialState;

  default:
    return state;
  }
}

function addSongToPlaylist(state, action) {
  const index = findIndex(state.playlists, 'title', action.title);
  const clonePlaylists = [...state.playlists];
  clonePlaylists.splice(index, 1, {
    title: action.title,
    songs: [...state.playlists[index].songs, action.song],
  });

  return {
    ...state,
    playlists: clonePlaylists,
  };
}
