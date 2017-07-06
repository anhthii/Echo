import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { saveQueueState, loadQueueState } from './localStorage';

let middleware = [thunk];
// apply logger middleware in development environment

if (process.env.NODE_ENV !== 'production') {
  const logger = require('./logger').default;
  middleware = [...middleware, logger];
}

const queueFromLocalStorage = loadQueueState();
const persistedData = {
  queueState: queueFromLocalStorage,
};
const store = createStore(rootReducer, persistedData, applyMiddleware(...middleware));

store.subscribe(_throttle(() => {
  saveQueueState(store.getState());
}), 1000 * 60 * 5); // save songs in queue in state every 5 minutes

export default store;