import * as types from '../constant/action_constant';

const initialState = {
  data: {},
  suggestedSongs: [],
  isFetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.FETCH_SONG_SUCCESS:
    return { ...state, data: action.data, isFetching: false };

  case types.FETCH_SUGGESTED_SONG_SUCCESS:
    return { ...state, suggestedSongs: action.songs };

  case types.START_FETCHING_SONG:
    return { ...state, isFetching: true };

  case types.FETCH_SONG_FAILURE:
    return { ...state, isFetching: false };

  default:
    return state;
  }
}
