import * as types from '../constant/action_constant';

const initialState = {
  songDuration: undefined,
  songCurrentTime: undefined,
  isFullFilled: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.UPDATE_SONG_DURATION:
    return { ...state, songDuration: action.songDuration };

  case types.UPDATE_SONG_CURRENT_TIME:
    return { ...state, songCurrentTime: action.songCurrentTime };

  case types.FULLFILL_SEEKBAR:
    return { ...state, isFullFilled: true };

  case types.UNFULLFILL_SEEKBAR:
    return { ...state, isFullFilled: false };

  default:
    return state;
  }
}