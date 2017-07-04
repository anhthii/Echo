import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let middleware = [thunk];
// apply logger middleware in development environment

if (process.env.NODE_ENV !== 'production') {
  const logger = require('./logger').default;
  middleware = [...middleware, logger];
}

export default createStore(rootReducer, applyMiddleware(...middleware));