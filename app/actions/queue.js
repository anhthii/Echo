import * as types from '../constant/action_constant';
import { fetchSong, fetchSuggestedSongs } from './song';

export function addSongToQueue(song) {
  const { name, id } = song;
  return (dispatch, getState) => {
    const queue = getState().queueState.queue;

    if (!queue.length) {
      // if the queue doesn't have any songs, fetch this song and play it

      dispatch(fetchSong(name, id));
    } else {
      dispatch({ type: types.ADD_SONG_TO_QUEUE, song });
    }
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
    };
  });

  return { songs, ids };
}

export function replaceQueue(songs) {
  return (dispatch, getState) => {
    const queueIds = getState().queueState.ids;
    if (!queueIds.length) {
      dispatch({ type: types.REPLACE_QUEUE, ...tweakSongs(songs) });
      const { alias, id } = songs[0];

      dispatch(fetchSong(alias, id));
      dispatch(fetchSuggestedSongs(id));
    } else {
      dispatch({ type: types.REPLACE_QUEUE, ...tweakSongs(songs) });
    }
  };
}
