import { takeLatest, put, all, call } from "redux-saga/effects";
import { CATEGORIES_ACTION_TYPES } from "./categories.type";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase.utils";

export function* fetchCategoriesAsync() {
  try {
    const categoryMap = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoryMap));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
