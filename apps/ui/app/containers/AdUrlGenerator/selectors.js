import { createSelector } from 'reselect';

/**
 * Direct selector to the adUrlGenerator state domain
 */
const selectAdUrlGeneratorDomain = () => (state) => state.get('adUrlGenerator');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AdUrlGenerator
 */

const makeSelectAdUrlGenerator = () => createSelector(
  selectAdUrlGeneratorDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAdUrlGenerator;
export {
  selectAdUrlGeneratorDomain,
};
