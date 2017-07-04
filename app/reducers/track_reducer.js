import * as types from '../constant/action_constant';

const initialState = {
  tracks: [],
  pageLoaded: 1,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.START_FETCHING_TRACKS:
    return { ...state, isLoading: true };

  case types.FETCH_TRACK_SUCCESS:
    return { ...state,
      tracks: state.tracks.concat(action.tracks),
      pageLoaded: action.page ? action.page : state.pageLoaded,
      isLoading: false,
    };
  case types.FETCH_TRACK_FAILURE:
    return { ...state, isLoading: false };

  default:
    return state;
  }
}
