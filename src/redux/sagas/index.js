import { all, call, cancel, fork, spawn, take } from "redux-saga/effects";
import peopleSaga from "./people";
import peopleDetailsSaga from "./peopleDetails";

export default function* rootSaga() {
  const sagas = [peopleSaga, peopleDetailsSaga];

  yield all(sagas.map((saga) => spawn(saga)));
}
