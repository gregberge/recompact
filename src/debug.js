/* eslint-disable no-param-reassign, no-console */
import createEagerFactory from './createEagerFactory'
import getDisplayName from './getDisplayName'

/**
 * Display the flow of props.
 * Very useful for debugging higher-order component stack.
 *
 * @static
 * @category Higher-order-components
 * @param {*} label A label displayed in console.
 * @param {Function} selector A props selector.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * recompact.compose(
 *   recompact.withProps({ foo: 'bar' }),
 *   recompact.debug(),
 *   recompact.renameProp('foo', 'className'),
 *   recompact.debug(),
 * )('input')
 */
const debug = (label, selector = x => x) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  label = label || getDisplayName(BaseComponent)
  return props => {
    console.log(label, selector(props))
    return factory(props)
  }
}

export default debug
