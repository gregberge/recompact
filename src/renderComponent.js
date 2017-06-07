import createEagerFactory from './createEagerFactory'

/**
 * Takes a component and returns a higher-order component version of that component.
 * This is useful in combination with another helper that expects a higher-order
 * component, like `branch`.
 *
 * @static
 * @category Higher-order-components
 * @param {ReactClass|ReactFunctionalComponent|String} Component
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const renderLoaderIfLoading = branch(
 *   ({loading} => loading),
 *   renderComponent(Loader),
 * )
 */
const renderComponent = Component => () => {
  const factory = createEagerFactory(Component)
  const RenderComponent = props => factory(props)
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const wrapDisplayName = require('./wrapDisplayName').default
    /* eslint-enable global-require */
    RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent')
  }
  return RenderComponent
}

export default renderComponent
