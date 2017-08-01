import { takeEvery, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  finishSubmitShortUrl,
  startLoadShortUrls,
  shortUrlsLoaded,
  shortUrlsLoadingError,
  submitShortUrlError } from './actions';
import { START_LOAD_SHORT_URLS, SUBMIT_SHORT_URL } from './constants';
import makeSelectUrlShortener from './selectors';

export function* submitShortName() {
  // Select username from store
  const urlShortenerDomain = yield select(makeSelectUrlShortener());
  const requestURL = 'http://hummingbird:5000/api/shorten';
  const fetchOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: urlShortenerDomain.url,
      shortName: urlShortenerDomain.shortName,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, fetchOptions);
    yield put(finishSubmitShortUrl());
    yield put(startLoadShortUrls());
  } catch (err) {
    yield put(submitShortUrlError(err));
  }
}

export function* loadShortUrls() {
  const requestURL = 'http://hummingbird:5000/api/list';
  const fetchOptions = {
    mode: 'cors',
  };
  try {
    const resp = yield call(request, requestURL, fetchOptions);
    yield put(shortUrlsLoaded(resp.urls));
  } catch (err) {
    yield put(shortUrlsLoadingError(err));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeEvery(SUBMIT_SHORT_URL, submitShortName);
  yield takeEvery(START_LOAD_SHORT_URLS, loadShortUrls);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
