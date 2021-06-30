import * as types from '../constant/action_constant';

const initialState = {
  activeId: '',
  tracks: [],
  pageLoaded: 1,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.START_FETCHING_TRACKS:
    return { ...state, isLoading: true };

  case types.FETCH_TRACK_SUCCESS:
    return fetchTrackSuccess(state, action);

  case types.FETCH_TRACK_FAILURE:
    return { ...state, isLoading: false };

  default:
    return state;
  }
}

function compareTwoFirstTrack(track1, track2) {
  return track1.encodeId === track2.encodeId;
}

function fetchTrackSuccess(state, action) {
  let tracks = state.tracks;
  if (state.tracks.length && !compareTwoFirstTrack(state.tracks[0], action.tracks[0])) {
    tracks = tracks.concat(action.tracks);
  }
  let pageLoaded = action.page ? action.page : state.pageLoaded;

  if (action.id !== state.activeId) {
    tracks = action.tracks;
    pageLoaded = 1;
  }

  return { ...state,
    tracks,
    pageLoaded,
    activeId: action.id,
    isLoading: false,
  };
}
