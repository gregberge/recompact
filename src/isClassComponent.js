/**
 * Returns true if the given value is a React component class.
 *
 * @static
 * @category Utilities
 * @param {*} value Any value
 * @returns {Boolean} Returns true if the given value is a React component class.
 * @see https://lodash.com/docs/master#identity
 * @example
 *
 * const Nothing = () => null;
 * const Nothing2 = class extends Component { render() { return null; } };
 * const Nothing3 = React.createClass({ render() { return null; } });
 * isClassComponent(Nothing); // false
 * isClassComponent(Nothing2); // true
 * isClassComponent(Nothing3); // true
 */
const isClassComponent = Component =>
  Boolean(
    Component &&
      Component.prototype &&
      typeof Component.prototype.isReactComponent === 'object',
  )

export default isClassComponent
