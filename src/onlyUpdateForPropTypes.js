import onlyUpdateForKeys from './onlyUpdateForKeys'
import createHelper from './createHelper'

/**
 * Works like `onlyUpdateForKeys()`, but prop keys are inferred from the `propTypes`
 * of the base component. Useful in conjunction with `setPropTypes()`.
 *
 * If the base component does not have any `propTypes`, the component will never
 * receive any updates. This probably isn't the expected behavior, so a warning
 * is printed to the console.
 *
 * @static
 * @category Higher-order-components
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @see onlyUpdateForKeys
 * @example
 *
 * const Button = ({className}) => <button className={className} />;
 * Button.propTypes = {className: PropTypes.string};
 * const EnhancedButton = onlyUpdateForPropTypes(Button);
 */
const onlyUpdateForPropTypes = BaseComponent => {
  const { propTypes } = BaseComponent

  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const getDisplayName = require('./getDisplayName').default
    /* eslint-enable global-require */
    if (!propTypes) {
      /* eslint-disable */
      console.error(
        'A component without any `propTypes` was passed to ' +
          '`onlyUpdateForPropTypes()`. Check the implementation of the ' +
          `component with display name "${getDisplayName(BaseComponent)}".`,
      )
      /* eslint-enable */
    }
  }

  return onlyUpdateForKeys(Object.keys(propTypes || {}))(BaseComponent)
}

export default createHelper(
  onlyUpdateForPropTypes,
  'onlyUpdateForPropTypes',
  true,
  true,
)
