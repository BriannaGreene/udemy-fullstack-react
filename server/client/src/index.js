import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(() => [], {}, applyMiddleware())

ReactDOM.render(
  <Provider store={ store }><App /></Provider>,
  document.getElementById('root')
);
