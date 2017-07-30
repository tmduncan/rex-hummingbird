/*
 *
 * AdUrlGenerator reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_CONTENT,
  CHANGE_MEDIUM,
  CHANGE_NAME,
  CHANGE_SOURCE,
  CHANGE_TERM,
  CHANGE_URL,
} from './constants';

const initialState = fromJS({
  content: '',
  medium: '',
  name: '',
  source: '',
  term: '',
  url: '',
});

function adUrlGeneratorReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CONTENT:
      return state
        .set('content', action.content);
    case CHANGE_MEDIUM:
      return state
        .set('medium', action.medium);
    case CHANGE_NAME:
      return state
        .set('name', action.name);
    case CHANGE_SOURCE:
      return state
        .set('source', action.source);
    case CHANGE_TERM:
      return state
        .set('term', action.term);
    case CHANGE_URL:
      return state
        .set('url', action.url);
    default:
      return state;
  }
}

export default adUrlGeneratorReducer;
