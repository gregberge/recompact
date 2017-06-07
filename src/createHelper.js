/**
 * Utility method that gives to higher-order components a comprehensive display name.
 *
 * @static
 * @category Utilities
 * @param {HigherOrderComponent} hoc Higher-order component to wrap.
 * @param {String} helperName Name used to create displayName.
 * @param {Boolean} [noArgs=false] Indicate if the higher-order component has some arguments.
 * @returns {HigherOrderComponent} Returns a wrapped hoc.
 * @example
 *
 * const pluckOnChangeTargetValue = createHelper(
 *   withHandlers({
 *     onChange: ({onChange}) => ({target: {value}}) => onChange(value),
 *   }),
 *   'pluckOnChangeTargetValue',
 * );
 *
 * const Input = pluckOnChangeTargetValue('input');
 * <Input /> // Will have "pluckOnChangeTargetValue(input)" as displayName
 */
const createHelper = (
  hoc,
  helperName,
  setDisplayName = true,
  noArgs = false,
) => {
  if (process.env.NODE_ENV !== 'production' && setDisplayName) {
    /* eslint-disable global-require */
    const wrapDisplayName = require('./wrapDisplayName').default
    /* eslint-enable global-require */

    if (noArgs) {
      return BaseComponent => {
        const Component = hoc(BaseComponent)
        Component.displayName = wrapDisplayName(BaseComponent, helperName)
        return Component
      }
    }

    return (...args) => BaseComponent => {
      const Component = hoc(...args)(BaseComponent)
      Component.displayName = wrapDisplayName(BaseComponent, helperName)
      return Component
    }
  }

  return hoc
}

export default createHelper
