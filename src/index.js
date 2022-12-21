import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store, { history } from "./redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import App from "./App";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/*<BrowserRouter>*/}
    {/*  <Routes>*/}
    {/*    <Route path="/" element={<App />} />*/}
    {/*    <Route path="/blog" element={<BlogPage />} />*/}
    {/*    <Route path="*" element={<NotFoundPage />} />*/}
    {/*  </Routes>*/}
    {/*</BrowserRouter>*/}

    <Router history={history}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Provider>
);
