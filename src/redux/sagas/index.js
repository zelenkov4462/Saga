import {
  fork,
  spawn,
  call,
  all,
  delay,
  take,
  takeEvery,
  takeLatest,
  cancel,
} from "redux-saga/effects";
import loadBasicData from "./initialSagas";
import pageLoaderSaga from "./pageLoaderSaga";

export function* fetchPlanets(signal) {
  console.log("LOAD_SOME_DATA starts");
  const response = yield call(fetch, "https://swapi.dev/api/planets", {
    signal,
  });
  const data = yield call([response, response.json]);
  console.log("LOAD_SOME_DATA", data);
}

export function* loadOnAction() {
  //Проблема takeLatest в том, что он
  // все равно отправляет запросы на сервер

  // yield takeLatest("LOAD_SOME_DATA", fetchPlanets);

  let task;
  //AbortController - отменяет fetch запросы
  let abortController = new AbortController();

  while (true) {
    yield take("LOAD_SOME_DATA");
    if (task) {
      abortController.abort();
      yield cancel(task);
      abortController = new AbortController();
    }
    task = yield fork(fetchPlanets, abortController.signal);
    console.log(task);
    console.log(abortController);
  }

  // yield takeEvery("LOAD_SOME_DATA", fetchPlanets);
}

//Когда необходимо сделать запросы при
// первой загрузке страницы без использования dispatch

export default function* rootSaga() {
  const sagas = [
    // loadBasicData,
    // pageLoaderSaga,
    loadOnAction,
  ];

  const retrySagas = sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          //используем блокирующий метод call -
          // чтобы корректно обработать ошибку
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(retrySagas);
}
