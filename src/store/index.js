import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '@/reducers';
import logger from 'redux-logger';

// const win = window;
const middlewares = [];
if (process.env.NODE_DEV !== 'production') {
  middlewares.push(logger);
}
const storeEnchancers = compose(
  applyMiddleware(...middlewares),
  // win && win.devToolsExtension ? win.devToolsExtension() : f => f,
);
const store = createStore(rootReducer, storeEnchancers);
export default store;
