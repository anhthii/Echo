import * as types from '../constant/action_constant';

const initialState = {
  showAnalyzer: false,
  dropDown: { activeId: '', show: false },
  showQueue: false,
  redirectedFromLoginPage: false,
};


export default function (state = initialState, action) {
  switch (action.type) {
  case types.SHOW_ANALYZER:
    return { ...state, showAnalyzer: true };

  case types.HIDE_ANALYZER:
    return { ...state, showAnalyzer: false };

  case types.TOGGLE_TRACK_DROPDOWN:
    return toggleTrackDropDown(state, action);

  case types.TOGGLE_QUEUE:
    return { ...state, showQueue: !state.showQueue };

  case types.REDIRECT_TO_HOME_PAGE:
    return { ...state, redirectedFromLoginPage: true };

  default:
    return state;
  }
}

function toggleTrackDropDown(state, action) {
  const { activeId } = action.dropDown;

  return {
    ...state,
    dropDown: {
      activeId: activeId !== state.dropDown.activeId ? activeId : '',
      show: activeId !== state.dropDown.activeId,
    },
  };
}
