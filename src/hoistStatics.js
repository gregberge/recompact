import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * Augments a higher-order component so that when used, it copies non-react
 * static properties from the base component to the new component. This is
 * helpful when using Recompose with libraries like Relay.

 * Note that this only hoists non-react statics. The following static properties
 * will not be hoisted: childContextTypes, contextTypes, defaultProps, displayName,
 * getDefaultProps, mixins, propTypes, and type. The following native static methods
 * will also be ignored: name, length, prototype, caller, arguments, and arity
 *
 * @static
 * @category Utilities
 * @param {HigherOrderComponent} hoc
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * hoistStatics(withProps({foo: 'bar'}));
 */
const hoistStatics = hoc => BaseComponent => {
  const NewComponent = hoc(BaseComponent)
  hoistNonReactStatics(NewComponent, BaseComponent)
  return NewComponent
}

export default hoistStatics
