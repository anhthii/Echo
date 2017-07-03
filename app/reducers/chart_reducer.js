import * as types from '../constant/action_constant';

const initialState = {
  pop: {},
  kpop: {},
  vpop: {},
  activeChart: 'pop',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.FETCH_POP_CHART:
    return { ...state, pop: action.pop, activeChart: 'pop' };

  case types.FETCH_KPOP_CHART:
    return { ...state, kpop: action.kpop, activeChart: 'kpop' };

  case types.FETCH_VPOP_CHART:
    return { ...state, vpop: action.vpop, activeChart: 'vpop' };

  case types.CHANGE_ACTIVE_CHART:
    return { ...state, activeChart: action.activeChart };

  default:
    return state;
  }
}