import { apply, call, put, takeEvery } from "redux-saga/effects";
import {
  PEOPLE_DETAILS,
  PEOPLE_DETAILS_FAILED,
  PEOPLE_DETAILS_SUCCESS,
} from "../../reducers/peopleDetails/actions";

function* peopleDetailsWorker({ payload }) {
  const { id } = payload;
  try {
    const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);
    const data = yield apply(request, request.json);
    yield put({ type: PEOPLE_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: PEOPLE_DETAILS_FAILED, payload: e });
  }
}

export default function* peopleDetailsSaga() {
  yield takeEvery(PEOPLE_DETAILS, peopleDetailsWorker);
}
