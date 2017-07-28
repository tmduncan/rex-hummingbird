/*
 *
 * UrlShortener reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SHORT_NAME,
  CHANGE_URL,
  SUBMIT_SHORT_URL,
} from './constants';

const initialState = fromJS({
  shortName: '',
  url: '',
  urls: [{
    url: 'http://rexchange.com/sell-with-us',
    shortName: 'sell',
    hits: 1,
  }, {
    url: 'https://rexchange.com/listing/33740-pacific-coast-hwy',
    shortName: 'pch',
    hits: 100,
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
    case SUBMIT_SHORT_URL:
      return state
        .update('urls', (urls) => urls.insert(0, {
          hits: 0,
          shortName: state.get('shortName'),
          url: state.get('url'),
        }))
        .set('shortName', '')
        .set('url', '');
    default:
      return state;
  }
}

export default urlShortenerReducer;
