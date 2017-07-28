/*
 *
 * UrlShortener reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SHORT_NAME,
  CHANGE_URL,
  SHORT_URLS_LOADED,
  SHORT_URLS_LOADING_ERROR,
  SUBMIT_SHORT_URL,
  SUBMIT_SHORT_URL_ERROR,
  SUBMIT_SHORT_URL_FINISHED,
} from './constants';

const initialState = fromJS({
  submittingShortName: false,
  shortName: '',
  url: '',
  urlsLoadingError: false,
  urls: [{
    url: 'http://notreal.com',
    shortName: 'default data not real',
    hits: '0',
  }],
});

function urlShortenerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SHORT_NAME:
      return state
        .set('shortName', action.shortName);
    case CHANGE_URL:
      return state
        .set('url', action.url);
    case SHORT_URLS_LOADED:
      return state
        .set('urls', action.urls)
        .set('urlsLoadingError', false);
    case SHORT_URLS_LOADING_ERROR:
      return state
        .set('urlsLoadingError', true);
    case SUBMIT_SHORT_URL:
      return state
        .set('submittingShortName', true);
    case SUBMIT_SHORT_URL_ERROR:
      return state
        .set('submittingShortName', false)
        .set('shortNameSubmissionError', true);
    case SUBMIT_SHORT_URL_FINISHED:
      return state
        .set('shortName', '')
        .set('url', '');
    default:
      return state;
  }
}

export default urlShortenerReducer;
