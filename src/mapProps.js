import createHelper from './createHelper'
import createEagerFactory from './createEagerFactory'
import createCompactableHOC from './utils/createCompactableHOC'
import updateProps from './utils/updateProps'

/**
 * Accepts a function that maps owner props to a new collection of props that
 * are passed to the base component.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} propsMapper The function that returns new props.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Add a new prop computed from owner props
 * mapProps(({count}) => ({moreThanFive: count > 5}))(MyComponent);
 */
const mapProps = propsMapper =>
  createCompactableHOC(
    updateProps(next => props => {
      next(propsMapper(props))
    }),
    BaseComponent => {
      const factory = createEagerFactory(BaseComponent)
      return props => factory(propsMapper(props))
    },
  )

export default createHelper(mapProps, 'mapProps')
