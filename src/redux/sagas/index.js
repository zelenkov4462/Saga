import { fork, spawn, call, all, delay } from "redux-saga/effects";
import loadBasicData from "./initialSagas";
import pageLoaderSaga from "./pageLoaderSaga";

//Когда необходимо сделать запросы при
// первой загрузке страницы без использования dispatch

export default function* rootSaga() {
  const sagas = [loadBasicData, pageLoaderSaga];

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
