/*
 *
 * AdUrlGenerator actions
 *
 */

import {
  CHANGE_CONTENT,
  CHANGE_MEDIUM,
  CHANGE_NAME,
  CHANGE_SOURCE,
  CHANGE_TERM,
  CHANGE_URL,
} from './constants';

export function changeContent(content) {
  return {
    type: CHANGE_CONTENT,
    content,
  };
}

export function changeMedium(medium) {
  return {
    type: CHANGE_MEDIUM,
    medium,
  };
}

export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

export function changeSource(source) {
  return {
    type: CHANGE_SOURCE,
    source,
  };
}

export function changeTerm(term) {
  return {
    type: CHANGE_TERM,
    term,
  };
}

export function changeUrl(url) {
  return {
    type: CHANGE_URL,
    url,
  };
}
