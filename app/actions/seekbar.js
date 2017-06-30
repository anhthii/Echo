import * as types from '../constant/action_constant';

export function updateSongDuration(duration) {
  return {
    type: types.UPDATE_SONG_DURATION,
    songDuration: duration,
  };
}

export function fullFillSeekBar() {
  return {
    type: types.FULLFILL_SEEKBAR,
  };
}

export function unFullFillSeekBar() {
  return {
    type: types.UNFULLFILL_SEEKBAR,
  };
}

export function updateSongCurrentTime(time) {
  return {
    type: types.UPDATE_SONG_CURRENT_TIME,
    songCurrentTime: time,
  };
}