import { createLogger } from 'redux-logger';
import * as types from './constant/action_constant';

const logger = createLogger({
  predicate: (getState, action) => (
    action.type !== types.UPDATE_LYRIC
    && action.type !== types.UPDATE_LYRIC_PERCENT
    && action.type !== types.UPDATE_SONG_CURRENT_TIME),
});

export default logger;

