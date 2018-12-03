import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import stars from './stars';
import grid from './grid';
import systemInfo from './systemInfo';

const reducer = combineReducers({ stars, grid, systemInfo });
const middleware = composeWithDevTools(
  applyMiddleware(createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
