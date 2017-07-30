
import { fromJS } from 'immutable';
import adUrlGeneratorReducer from '../reducer';

describe('adUrlGeneratorReducer', () => {
  it('returns the initial state', () => {
    expect(adUrlGeneratorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
