import { FETCH_TRACKS } from '../constant/action_constant';

const initialState = {
  tracks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_TRACKS:
    return { ...state, tracks: action.tracks };

  default:
    return state;
  }
}