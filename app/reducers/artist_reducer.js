import * as types from '../constant/action_constant';

const initialState = {
  defaultArtists: {},
  artists: [],
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
  default:
    return state;
  }
}