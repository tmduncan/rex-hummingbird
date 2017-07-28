/*
 *
 * UrlShortener actions
 *
 */

import {
  CHANGE_SHORT_NAME,
  CHANGE_URL,
  SHORT_URLS_LOADED,
  SHORT_URLS_LOADING_ERROR,
  START_LOAD_SHORT_URLS,
  SUBMIT_SHORT_URL,
  SUBMIT_SHORT_URL_ERROR,
  SUBMIT_SHORT_URL_FINISHED,
} from './constants';


export function changeShortName(shortName) {
  return {
    type: CHANGE_SHORT_NAME,
    shortName,
  };
}

export function changeUrl(url) {
  return {
    type: CHANGE_URL,
    url,
  };
}

export function finishSubmitShortUrl() {
  return {
    type: SUBMIT_SHORT_URL_FINISHED,
  };
}

export function shortUrlsLoaded(urls) {
  return {
    type: SHORT_URLS_LOADED,
    urls,
  };
}

export function shortUrlsLoadingError(err) {
  return {
    type: SHORT_URLS_LOADING_ERROR,
    err,
  };
}

export function startLoadShortUrls() {
  return {
    type: START_LOAD_SHORT_URLS,
  };
}

export function submitShortUrl() {
  return {
    type: SUBMIT_SHORT_URL,
  };
}

export function submitShortUrlError(err) {
  return {
    type: SUBMIT_SHORT_URL_ERROR,
    err,
  };
}
