import createHOCFromMapper from './utils/createHOCFromMapper'
import createHelper from './createHelper'

/**
 * Accepts a function that maps an observable stream of owner props to a stream
 * of child props, rather than directly to a stream of React nodes.
 * The child props are then passed to a base component.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} propsStreamMapper
 * @returns {HigherOrderComponent} Returns a function that take a Component.
 * @example
 *
 * // Delay rendering of 1s
 * const delayRendering = mapPropsStream(props$ => props$.delay(1000));
 */
const mapPropsStream = propsStreamMapper => createHOCFromMapper((props$, obs) => {
  const nextProps$ = propsStreamMapper(props$)
  if (process.env.NODE_ENV !== 'production') {
    const invariant = require('./utils/invariant').default // eslint-disable-line global-require
    invariant(typeof nextProps$.subscribe === 'function', 'Expected a props Observable.')
  }
  return [nextProps$, obs]
})

export default createHelper(mapPropsStream, 'mapPropsStream')
