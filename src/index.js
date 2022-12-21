import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store, { history } from "./redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import App from "./pages/App";

import "./index.css";
import Details from "./pages/Details";
import { AppRouter } from "./components/Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}>
      <AppRouter />
    </Router>
  </Provider>
);
