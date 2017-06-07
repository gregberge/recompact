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
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Delay rendering of 1s
 * const delayRendering = mapPropsStream(props$ => props$.delay(1000));
 */
const mapPropsStream = propsStreamMapper =>
  createHOCFromMapper((props$, obs) => [propsStreamMapper(props$), obs])

export default createHelper(mapPropsStream, 'mapPropsStream')
