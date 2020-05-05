import { Platform } from 'react-native';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import intlServiceSaga from './intlService';
import intlServiceReducer from './intlService/reducer';

export default function configureStore() {
  const rootReducer = combineReducers({ intlServiceReducer });

  function* rootSaga() {
    yield all([intlServiceSaga]);
  }

  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  let composeEnhancer = compose;

  if (__DEV__ && Platform.OS === 'web') {
    const { logger } = require('redux-logger');
    middlewares = [...middlewares, logger];
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}
