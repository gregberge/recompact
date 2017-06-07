import { Component } from 'react'
import createHelper from './createHelper'
import createEagerFactory from './createEagerFactory'

/**
 * Provides context to the component's children. `childContextTypes` is an object
 * of React prop types. `getChildContext()` is a function that returns
 * the child context. Use along with `getContext()`.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} childContextTypes
 * @param {Function} getChildContext
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Provide window in the context, useful for testing
 * const withWindow = withContext({window: PropTypes.object.isRequired}, () => {window})
 */
const withContext = (childContextTypes, getChildContext) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class WithContext extends Component {
    getChildContext = () => getChildContext(this.props)

    render() {
      return factory(this.props)
    }
  }

  WithContext.childContextTypes = childContextTypes

  return WithContext
}

export default createHelper(withContext, 'withContext')
