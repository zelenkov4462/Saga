import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, createStore } from "redux";
import appReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import peopleReducer from "./reducers/people";
import { peopleDetailsReducers } from "./reducers/peopleDetails";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    app: appReducer,
    people: peopleReducer,
    peopleDetail: peopleDetailsReducers,
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware, sagaMiddleware))
);

export const history = createReduxHistory(store);

sagaMiddleware.run(rootSaga);

export default store;
