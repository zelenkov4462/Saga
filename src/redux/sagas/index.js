import { fork, spawn, call, all } from "redux-saga/effects";

export function* saga1() {
  console.log("saga1");
  // throw new Error();
}
export function* saga2() {
  console.log("saga2");
}
export function* saga3() {
  console.log("saga3");
}

export default function* rootSaga() {
  // yield spawn(saga1), yield spawn(saga2), yield spawn(saga3);

  const sagas = [saga1, saga2, saga3];

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
