import createHelper from './createHelper';
import createEagerFactory from './createEagerFactory';

/**
 * Gets values from context and passes them along as props.
 *
 * @static
 * @category High-order-components
 * @param {Object} contextTypes Context types to inject as props.
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * // Create a component that will bring back to home when clicked
 * const HomeButton = compose(
 *   withContext({router: PropTypes.object.isRequired}),
 *   withHandlers({onClick: ({router}) => () => router.push('/')}),
 * )('button');
 */
const getContext = contextTypes => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);
  const GetContext = (ownerProps, context) => (
    factory({
      ...ownerProps,
      ...context,
    })
  );

  GetContext.contextTypes = contextTypes;

  return GetContext;
};

export default createHelper(getContext, 'getContext');
