import { takeEvery, call, take, put, fork } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "redux-first-history";

function* loadBlogData() {
  const request = yield call(fetch, "https://swapi.dev/api/vehicles");
  const data = yield call([request, request.json]);
  // console.log("blog data", data);
  yield put({ type: "BLOG_LOADED", payload: data });
}

export default function* pageLoaderSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    if (action.payload.location.pathname.endsWith("blog")) {
      yield fork(loadBlogData);
      console.log("action-blog", action);
    }
    console.log("action", action);
  }
}
