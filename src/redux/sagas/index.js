import {
  take,
  takeEvery,
  takeLatest,
  takeLeading,
  put,
  call,
  fork,
  spawn,
} from "redux-saga/effects";
import { BASE_URL } from "../../API";

async function swapiGet(pattern) {
  const request = await fetch(BASE_URL + `/${pattern}`);
  const data = await request.json();
  return data;
}

export function* loadPeople() {
  throw new Error();
  const people = yield call(swapiGet, "people");
  yield put({ type: "SET_PEOPLE", payload: people.results });
}

export function* loadPlanets() {
  const planets = yield call(swapiGet, "planets");
  yield put({ type: "SET_PLANETS", payload: planets.results });
}

export function* workerSaga() {
  // const people = yield call(swapiGet, "people");
  // const planets = yield call(swapiGet, "planets");
  // yield put({ type: "SET_PEOPLE", payload: people.results });
  // yield put({ type: "SET_PLANETS", payload: planets.results });

  // yield fork(loadPeople);
  // yield fork(loadPlanets);

  yield spawn(loadPeople);
  yield spawn(loadPlanets);
}

export function* watchLoadDataSaga() {
  // while (true) {
  //    yield take('CLICK');
  //    yield workerSaga()
  // }
  yield takeEvery("LOAD_DATA", workerSaga);
}

export default function* rootSaga() {
  yield watchLoadDataSaga();
}
