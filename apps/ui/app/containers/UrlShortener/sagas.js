import { take, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { submitShortUrlError } from './actions';
import { SUBMIT_SHORT_URL } from './constants';
import makeSelectUrlShortener from './selectors';

export function* submitShortName() {
  // Select username from store
  const urlShortnerDomain = yield select(makeSelectUrlShortener());
  const username = yield select(makeSelectUsername());
  const requestURL = `http://localhost:8080`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  while (true) {
    yield take(SUBMIT_SHORT_URL);
    submitShortName();
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];
