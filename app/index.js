import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import routes from './routes';
import initHistoryEvents from './history_events';
import './styles/base.sass';

// apply logger middleware in development environment

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = require('./logger').default;
  middleware = [...middleware, logger];
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
export const history = syncHistoryWithStore(browserHistory, store);
initHistoryEvents();

render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
      onUpdate={() => window.scrollTo(0, 0)}
    />
  </Provider>, document.getElementById('app'));

