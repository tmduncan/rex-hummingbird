import { createSelector } from 'reselect';

/**
 * Direct selector to the urlShortener state domain
 */
const selectUrlShortenerDomain = () => (state) => state.get('urlShortener');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UrlShortener
 */

const makeSelectUrlShortener = () => createSelector(
  selectUrlShortenerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectUrlShortener;
export {
  selectUrlShortenerDomain,
};
