
import { fromJS } from 'immutable';
import urlShortenerReducer from '../reducer';

describe('urlShortenerReducer', () => {
  it('returns the initial state', () => {
    expect(urlShortenerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
