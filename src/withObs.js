import callOrUse from './utils/callOrUse'
import createHOCFromMapper from './utils/createHOCFromMapper'
import createHelper from './createHelper'

/**
 * Similar to `mapObs` except that observables will be merged to the previous ones.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} obsMapper The function that take previous observables and returns new ones.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const withFullName$ = mapObs(({firstName$, props$}) => ({
 *  fullName$: Observable.combineLatest(
 *    firstName$,
 *    props$.pluck('lastName'),
 *    (firstName, lastName) => `${firstName} ${lastName}`
 *   )
 * }))
 */
const withObs = obsMapper => createHOCFromMapper((props$, obs) => {
  const nextObs = callOrUse(obsMapper)({ ...obs, props$ })
  const { props$: nextProps$ = props$ } = nextObs
  delete nextObs.props$
  return [nextProps$, { ...obs, ...nextObs }]
})

export default createHelper(withObs, 'withObs')
