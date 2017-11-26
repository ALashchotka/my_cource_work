import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers, { nextRootReducer } from '../reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

export default function configureStore() {
  const enhancer = compose(applyMiddleware(loggerMiddleware));
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    enhancer,
  );
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(nextRootReducer.default);
    });
  }
  return store;
}
