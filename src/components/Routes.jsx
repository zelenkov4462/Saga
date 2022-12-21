import { Route, Routes } from "react-router-dom";
import App from "../pages/App";
import Details from "../pages/Details";

export const MAIN_ROUTE = "MAIN_ROUTE";
export const PEOPLE_DETAILS_ROUTE = "PEOPLE_DETAILS_ROUTE";

const routes = [
  {
    id: MAIN_ROUTE,
    path: "/",
    element: App,
  },
  {
    id: PEOPLE_DETAILS_ROUTE,
    path: "/people/:id",
    element: Details,
  },
];

export const getRouteConfig = (id) => {
  const route = routes.find((r) => r.id === id);

  if (route) {
    const { component, ...rest } = route;
    return rest;
  }
};

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route key={route.id} path={route.path} element={<route.element />} />
        );
      })}
    </Routes>
  );
};
