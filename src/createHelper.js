/**
 * Utility method that gives to high-order components a comprehensive display name.
 *
 * @static
 * @category Utilities
 * @param {HighOrderComponent} hoc High-order component to wrap.
 * @param {String} helperName Name used to create displayName.
 * @param {Boolean} [noArgs=false] Indicate if the high-order component has some arguments.
 * @returns {HighOrderComponent} Returns a wrapped hoc.
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
  noArgs = false,
) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const wrapDisplayName = require('./wrapDisplayName').default;
    /* eslint-enable global-require */

    if (noArgs) {
      return (BaseComponent) => {
        const Component = hoc(BaseComponent);
        Component.displayName = wrapDisplayName(BaseComponent, helperName);
        return Component;
      };
    }

    return (...args) =>
      (BaseComponent) => {
        const Component = hoc(...args)(BaseComponent);
        Component.displayName = wrapDisplayName(BaseComponent, helperName);
        return Component;
      };
  }

  return hoc;
};

export default createHelper;
