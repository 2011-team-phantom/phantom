import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';
import { Router } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,

  document.getElementById('app')
);
