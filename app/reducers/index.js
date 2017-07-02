import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import playerReducer from './player_reducer';
import songReducer from './song_reducer';
import seekBarReducer from './seekbar_reducer';
import trackReducer from './track_reducer';
import UIReducer from './ui_reducer';
import queueReducer from './queue_reducer';
import albumReducer from './album_reducer';
import artistReducer from './artist_reducer';

export default combineReducers({
  playerState: playerReducer,
  songData: songReducer,
  seekBarState: seekBarReducer,
  routing: routerReducer,
  trackState: trackReducer,
  UIState: UIReducer,
  queueState: queueReducer,
  albumState: albumReducer,
  artistState: artistReducer,
});