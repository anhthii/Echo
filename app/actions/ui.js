import * as types from '../constant/action_constant';

export function showAnalyzer() {
  return {
    type: types.SHOW_ANALYZER,
  };
}

export function hideAnalyzer() {
  return {
    type: types.HIDE_ANALYZER,
  };
}

export function toggleTrackDropDown(id) {
  return {
    type: types.TOGGLE_TRACK_DROPDOWN,
    dropDown: { activeId: id },
  };
}

export function toggleQueue() {
  return {
    type: types.TOGGLE_QUEUE,
  };
}

export function slideInRight() {
  return {
    type: types.SLIDE_IN_RIGHT,
  };
}

export function resetSlideInRight() {
  return {
    type: types.RESET_SLIDE_IN_RIGHT,
  };
}
