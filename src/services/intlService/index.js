import { put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import { setLocaleSuccess, setLocaleFailure } from './actions';
import { setLocale } from './helper';

export function* watchSetLocale({ locale }) {
  try {
    yield put(setLocaleSuccess(setLocale(locale)));
  } catch (e) {
    yield put(setLocaleFailure(locale, e));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.INTL_SERVICE_SET_LOCALE_REQUEST, watchSetLocale);
}
