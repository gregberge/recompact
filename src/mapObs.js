import createHOCFromMapper from './utils/createHOCFromMapper';
import createHelper from './createHelper';

/**
 * Takes observables from the context and special observable `props$` an map them
 * to a new set of observables.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} obsMapper The function that take previous observables and returns new ones.
 * @returns {HigherOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const firstName$ToFullName$ = mapObs(({firstName$, props$}) => ({
 *  fullName$: Observable.combineLatest(
 *    firstName$,
 *    props$.pluck('lastName'),
 *    (firstName, lastName) => `${firstName} ${lastName}`
 *   )
 * }))
 */
const mapObs = obsMapper => createHOCFromMapper((props$, obs) => {
  const {props$: nextProps$ = props$, ...nextObs} = obsMapper({...obs, props$});
  return [nextProps$, nextObs];
});

export default createHelper(mapObs, 'mapObs');
