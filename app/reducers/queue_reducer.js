import * as types from '../constant/action_constant';

const initialState = {
  queue: [],
  ids: [],
  pushRoute: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.ADD_SONG_TO_QUEUE:
    return addSongToQueue(state, action);

  case types.TOGGLE_PUSH_ROUTE:
    return { ...state, pushRoute: action.flag };

  case types.REPLACE_QUEUE:
    return { queue: action.songs, ids: action.ids };

  case types.CLEAR_QUEUE:
    return { ...state, queue: action.queue, ids: action.ids };

  case types.REMOVE_SONG_FROM_QUEUE:
    return { ...state, queue: action.queue, ids: action.ids };

  case types.PLAY_USER_PLAYLIST:
    return { ...state, queue: action.queue, ids: action.ids };

  default:
    return state;
  }
}

function addSongToQueue(state, action) {
  const con = state.ids.find(id => id === action.song.id);
  // only add a song to the queue if this song isn't added before
  if (typeof con === 'undefined') {
    return { queue: [...state.queue, action.song], ids: [...state.ids, action.song.id] };
  }
  return state;
}


