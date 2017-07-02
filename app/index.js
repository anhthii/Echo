import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { NotFound } from './components';
import rootReducer from './reducers';
import initHistoryEvents from './history_events';
import { fetchDefaultTracks } from './route_callbacks';
import {
  AppContainer,
  SongPageContainer,
  HomePageContainer,
  AlbumPageContainer,
  AlbumPlaylistContainer,
  ArtistPageContainer,
} from './containers';
import { UPDATE_LYRIC, UPDATE_LYRIC_PERCENT, UPDATE_SONG_CURRENT_TIME } from './constant/action_constant';
import './styles/base.sass';

const logger = createLogger({
  predicate: (getState, action) => (
    action.type !== UPDATE_LYRIC
    && action.type !== UPDATE_LYRIC_PERCENT
    && action.type !== UPDATE_SONG_CURRENT_TIME),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const history = syncHistoryWithStore(browserHistory, store);
initHistoryEvents();

render(
  <Provider store={store}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path='/' component= {AppContainer}>
        <IndexRoute component={HomePageContainer} onEnter={fetchDefaultTracks} />
        <Route path='song/:name/:id' component={SongPageContainer} />
        <Route path='album/playlist/:title/:id' component={AlbumPlaylistContainer}/>
        <Route path='album(/:title)(/:id)' component={AlbumPageContainer} />
        <Route path='artist/:name' component={ArtistPageContainer} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));

