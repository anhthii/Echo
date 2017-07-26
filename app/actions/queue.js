import * as types from '../constant/action_constant';
import { fetchSong, fetchSuggestedSongs } from './song';
import { removeById, changeAlias } from '../utils/func';

export function addSongToQueue(song) {
  const { name, id } = song;
  return (dispatch, getState) => {
    const queue = getState().queueState.queue;

    if (!queue.length) {
      // if the queue doesn't have any songs, fetch this song and play it

      dispatch(fetchSong(name, id));
      dispatch(fetchSuggestedSongs(id));
    } else {
      dispatch({ type: types.ADD_SONG_TO_QUEUE, song });
    }
  };
}


export function removeSongFromQueue(id) {
  return (dispatch, getState) => {
    const queueState = getState().queueState;
    const queue = [...queueState.queue]; // avoid mutating the state
    const newQueue = removeById(queue, id);
    const queueIds = removeById([...queueState.ids], id);

    dispatch({ type: types.REMOVE_SONG_FROM_QUEUE, queue: newQueue, ids: queueIds });
  };
}

export function togglePushRoute(bool) {
  return {
    type: types.TOGGLE_PUSH_ROUTE,
    flag: bool,
  };
}

function tweakSongs(songs) {
  const ids = [];
  songs = songs.map(song => {
    ids.push(song.id);
    return {
      id: song.id,
      name: song.title,
      alias: song.alias,
    };
  });

  return { songs, ids };
}

export function replaceQueue(songs) {
  return (dispatch, getState) => {
    const queueIds = getState().queueState.ids;
    if (!queueIds.length) {
      dispatch({ type: types.REPLACE_QUEUE, ...tweakSongs(songs) });
      const { alias, id, name } = songs[0];

      dispatch(fetchSong(alias || changeAlias(name), id));
      dispatch(fetchSuggestedSongs(id));
    } else {
      dispatch({ type: types.REPLACE_QUEUE, ...tweakSongs(songs) });
    }
  };
}

export function clearQueue() {
  return (dispatch, getState) => {
    const state = getState();
    const playingSongId = state.songData.data.id;
    const queueState = state.queueState;
    const clearedQueue = queueState.queue.filter(song => song.id === playingSongId);
    const newQueueIds = queueState.ids.filter(id => id === playingSongId);

    dispatch({ type: types.CLEAR_QUEUE, queue: clearedQueue, ids: newQueueIds });
  };
}

export function playUserPlaylist(songs) {
  return {
    type: types.PLAY_USER_PLAYLIST,
    ids: songs.map(song => song.id),
    queue: songs,
  };
}
