import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

export default function configureStore () {
  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware
    )
  );
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    enhancer
  );
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}