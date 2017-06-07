import createHelper from './createHelper'
import callOrUse from './utils/callOrUse'
import createEagerFactory from './createEagerFactory'
import createCompactableHOC from './utils/createCompactableHOC'
import updateProps from './utils/updateProps'

/**
 * Like `mapProps()`, except the newly created props are merged with the owner props.
 *
 * Instead of a function, you can also pass a props object directly. In this form,
 * it is similar to `defaultProps()`, except the provided props take precedence over
 * props from the owner.
 *
 * @static
 * @category Higher-order-components
 * @param {Function|Object} propsMapper
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const Button = withProps({type: 'button'})('button');
 * const XButton = withProps(({type}) => {type: `x${type}`})('button');
 */
const withProps = propsMapper =>
  createCompactableHOC(
    updateProps(next => props => {
      next({ ...props, ...callOrUse(propsMapper, props) })
    }),
    BaseComponent => {
      const factory = createEagerFactory(BaseComponent)
      return props => factory({ ...props, ...callOrUse(propsMapper, props) })
    },
  )

export default createHelper(withProps, 'withProps')
