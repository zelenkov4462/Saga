import { fork, spawn, call, all, delay } from "redux-saga/effects";

//Когда необходимо сделать запросы при
// первой загрузке страницы без использования dispatch

function* auth() {
  yield delay(2000);
  console.log("auth ok");
  return true;
}

function* loadUsers() {
  const request = yield call(fetch, "https://swapi.dev/api/people");
  const data = yield call([request, request.json]);
  console.log("data", data);
}

export function* loadBasicData() {
  yield all([fork(auth), fork(loadUsers)]);
}

export default function* rootSaga() {
  const sagas = [loadBasicData];

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
