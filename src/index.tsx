import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { store, StoreContext } from './app/stores/store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
  
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);
