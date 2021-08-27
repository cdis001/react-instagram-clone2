import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { createBrowserHistory } from "history";

import reducer from "./reducer";

const history = createBrowserHistory();

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
const store = createStoreWithMiddleware(reducer);

export { history };
export default store;
