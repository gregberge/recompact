import { Component } from 'react'
import createHelper from './createHelper'
import createCompactableHOC from './utils/createCompactableHOC'
import updateProps from './utils/updateProps'
import createEagerFactory from './createEagerFactory'

/**
 * Higher-order component version of
 * [`shouldComponentUpdate()`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate).
 * The test function accepts both the current props and the next props.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} test Receive two arguments, props and nextProps
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Pure
 * shouldUpdate((props, nextProps) => shallowEqual(props, nextProps))
 */
const shouldUpdate = test =>
  createCompactableHOC(
    updateProps(next => {
      let props

      return nextProps => {
        if (!props || test(props, nextProps)) {
          next(nextProps)
        }

        props = nextProps
      }
    }),
    BaseComponent => {
      const factory = createEagerFactory(BaseComponent)
      return class extends Component {
        shouldComponentUpdate(nextProps) {
          return test(this.props, nextProps)
        }

        render() {
          return factory(this.props)
        }
      }
    },
  )

export default createHelper(shouldUpdate, 'shouldUpdate')
