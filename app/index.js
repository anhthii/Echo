import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import store from './store';
import history from './history';
import './styles/base.sass';

render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
      onUpdate={() => window.scrollTo(0, 0)}
    />
  </Provider>, document.getElementById('app'));

