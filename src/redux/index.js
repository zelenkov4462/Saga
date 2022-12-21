import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, createStore } from "redux";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    router: routerReducer,
    app: reducer,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware, sagaMiddleware))
);

export const history = createReduxHistory(store);

sagaMiddleware.run(rootSaga);

export default store;
