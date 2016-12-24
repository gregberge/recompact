/**
 * Assigns a value to a static property on the base component.
 *
 * @static
 * @category Higher-order-components
 * @param {String} key
 * @param {String} value
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * setStatic({defaultProps: {type: 'button'}})('button');
 */
const setStatic = (key, value) => (BaseComponent) => {
  /* eslint-disable no-param-reassign */
  BaseComponent[key] = value;
  /* eslint-enable no-param-reassign */
  return BaseComponent;
};

export default setStatic;
