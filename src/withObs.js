import callOrUse from './utils/callOrUse'
import createHOCFromMapper from './utils/createHOCFromMapper'
import shareObservable from './utils/shareObservable'
import createHelper from './createHelper'

/**
 * Takes observables from the context and special observable `props$` and map them
 * to a new set of observables.
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
const withObs = obsMapper =>
  createHOCFromMapper((props$, obs) => {
    const sharedProps$ = shareObservable(props$)
    const nextObs = callOrUse(obsMapper, { ...obs, props$: sharedProps$ })
    const { props$: nextProps$ = props$ } = nextObs
    delete nextObs.props$
    return [nextProps$, { ...obs, ...nextObs }]
  })

export default createHelper(withObs, 'withObs')
