import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  //  blacklist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(ReduxThunk, promiseMiddleware))
  );

  let persistor = persistStore(store);
  return { store, persistor };
};

const history = createBrowserHistory();

export { history };
export default configureStore;
