import createHelper from './createHelper'
import createEagerFactory from './createEagerFactory'

/**
 * Gets values from context and passes them along as props.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} contextTypes Context types to inject as props.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Create a component that will bring back to home when clicked
 * const HomeButton = compose(
 *   withContext({router: PropTypes.object.isRequired}),
 *   withHandlers({onClick: ({router}) => () => router.push('/')}),
 * )('button');
 */
const getContext = contextTypes => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  const GetContext = (ownerProps, context) =>
    factory({
      ...ownerProps,
      ...context,
    })

  GetContext.contextTypes = contextTypes

  return GetContext
}

export default createHelper(getContext, 'getContext')
