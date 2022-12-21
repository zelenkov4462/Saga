import {
  call,
  apply,
  put,
  takeEvery,
  take,
  fork,
  select,
} from "redux-saga/effects";
import { BASE_URL } from "../../../API";
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import { LOCATION_CHANGE } from "redux-first-history";
import { selectPeople } from "../../reducers/people/selectors";
import { matchPath } from "react-router";
import {
  getRouteConfig,
  MAIN_ROUTE,
  PEOPLE_DETAILS_ROUTE,
} from "../../../components/Routes";

export function* loadPeopleDetails() {}

export function* loadPeopleList({ payload }) {
  const { page, search } = payload;
  const request = yield call(
    fetch,
    BASE_URL + `people?page=${page}&search=${search}`
  );
  const data = yield apply(request, request.json);

  yield put({ type: LOAD_USERS_SUCCESS, payload: data });
}

export function* loadUsersOnRouteEnter() {
  // while (true) {
  //   const action = yield take(LOCATION_CHANGE);
  //   console.log(action);
  //   // if (action.payload.location.pathname === "/") {
  //   if (
  //     matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))
  //   ) {
  //     const state = yield select(selectPeople);
  //     const { page, search } = state;
  //
  //     yield put({
  //       type: LOAD_USERS,
  //       payload: { page, search },
  //     });
  //   }
  // }
}

export default function* peopleSaga() {
  yield fork(loadUsersOnRouteEnter);
  yield takeEvery(LOAD_USERS, loadPeopleList);
}
