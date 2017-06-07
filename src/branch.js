import createEagerFactory from './createEagerFactory'
import createHelper from './createHelper'
import identity from './identity'

/**
 * Accepts a test function and two higher-order components. The test function
 * is passed the props from the owner. If it returns true, the left higher-order
 * component is applied to BaseComponent; otherwise, the right higher-order
 * component is applied (defaults to identity).
 *
 * @static
 * @category Higher-order-components
 * @param {Function} test The test to apply.
 * @param {HigherOrderComponent} left The higher-order component applied if the result
 *  of the test is true.
 * @param {HigherOrderComponent} [right=identity] The higher-order component applied if the result
 *  of the test is false.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Add the logic or rendering nothing if the prop `count` equals to `0`.
 * branch(({count}) => count === 0, renderNothing)(MyComponent);
 */
const branch = (test, left, right = identity) => BaseComponent => {
  let leftFactory
  let rightFactory

  return props => {
    if (test(props)) {
      leftFactory = leftFactory || createEagerFactory(left(BaseComponent))
      return leftFactory(props)
    }

    rightFactory = rightFactory || createEagerFactory(right(BaseComponent))
    return rightFactory(props)
  }
}

export default createHelper(branch, 'branch')
