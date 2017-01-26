import shallowEqual from './shallowEqual'
import createHelper from './createHelper'
import shouldUpdate from './shouldUpdate'

/**
 * Prevents the component from updating unless a prop has changed.
 * Uses `shallowEqual()` to test for changes.
 *
 * @static
 * @category Higher-order-components
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * pure('button')
 */
const pure = shouldUpdate((props, nextProps) => !shallowEqual(props, nextProps))

export default createHelper(pure, 'pure', true, true)
