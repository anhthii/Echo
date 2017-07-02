import chunk from 'lodash.chunk';
import { range } from '../utils/func';
import * as types from '../constant/action_constant';


const initialState = {
  defaultArtists: [],
  artists: [],
  pageChunkIndex: 0,
  pageChunks: [],
  artist: {
    song: {
      numberOfPages: 0,
      songs: [],
    },
    album: {
      numberOfPages: 0,
      albums: [],
    },
    cover: '',
    artistName: '',
    avatar: '',
    biography: {},
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.FETCH_SINGLE_ARTIST_SONGS:
    return { ...state,
      artist: {
        cover: action.cover,
        avatar: action.avatar,
        artistName: action.artistName,
        song: { songs: action.songs, numberOfPages: action.numberOfPages },
      },
    };

  case types.FETCH_DEFAULT_ARTISTS:
    return { ...state, defaultArtists: action.defaultArtists, artists: [] };

  case types.FETCH_ARTISTS:
    return { ...state, artists: action.artists, pageChunks: chunk(range(action.numberOfPages), 7) };

  case types.CHANGE_PAGE_CHUNK_INDEX:
    return { ...state, pageChunkIndex: action.pageChunkIndex };

  case types.CLEAR_ARTIST:
    return { ...state, artist: { song: { songs: [] }, cover: '', avatar: '', artistName: '' } };
  default:
    return state;
  }
}