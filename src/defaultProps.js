/* eslint-disable no-shadow, no-restricted-syntax, no-param-reassign */
import createHelper from './createHelper'
import createEagerFactory from './createEagerFactory'
import withProps from './withProps'
import createCompactableHOC from './utils/createCompactableHOC'

/**
 * Specify props values that will be used if the prop is `undefined`.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} defaultProps Default props.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const Button = defaultProps({type: 'button'})('button');
 * <Button /> // will render <button type="button" />
 */
const defaultProps = defaultProps => createCompactableHOC(
  withProps((props) => {
    const newProps = { ...props }
    for (const propName in defaultProps) {
      if (props[propName] === undefined) {
        newProps[propName] = defaultProps[propName]
      }
    }
    return newProps
  }),
  (BaseComponent) => {
    const factory = createEagerFactory(BaseComponent)
    const DefaultProps = ownerProps => factory(ownerProps)
    DefaultProps.defaultProps = defaultProps
    return DefaultProps
  },
)

export default createHelper(defaultProps, 'defaultProps')
