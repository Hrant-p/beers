import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import middleware from './middlewares/middleware';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  Map(),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(middleware);

export default store;
