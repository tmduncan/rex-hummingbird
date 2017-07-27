/*
 *
 * UrlShortener reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
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
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default urlShortenerReducer;
