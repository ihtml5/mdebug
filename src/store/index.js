import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '@/reducers';
import logger from 'redux-logger';

const middlewares = [];
if (process.env.NODE_DEV !== 'production') {
    middlewares.push(logger);
}
const enhancer = compose(
    applyMiddleware(...middlewares),
  );
const store = createStore(rootReducer, enhancer);
export default store;

