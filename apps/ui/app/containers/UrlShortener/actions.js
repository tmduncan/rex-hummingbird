/*
 *
 * UrlShortener actions
 *
 */

import {
  CHANGE_SHORT_NAME,
  CHANGE_URL,
  SUBMIT_SHORT_URL,
  SUBMIT_SHORT_URL_ERROR,
} from './constants';


export function changeShortName(shortName){
  return {
    type: CHANGE_SHORT_NAME,
    shortName,
  };
}

export function changeUrl(url){
  return {
    type: CHANGE_URL,
    url,
  };
}

export function submitShortUrl() {
  return {
    type: SUBMIT_SHORT_URL,
  };
}

export function submitShortUrlError() {
  return {
    type: SUBMIT_SHORT_URL_ERROR,
  }
}