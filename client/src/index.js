import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import mainReducer from './Reducers'
import watchFetchSearchData from './Sagas.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//saga middleware
const sagaMiddleware = createSagaMiddleware()

//redux store with saga middleware
const store = createStore(
  mainReducer,
  applyMiddleware(sagaMiddleware)
)
// activate the saga(s)
sagaMiddleware.run(watchFetchSearchData)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
