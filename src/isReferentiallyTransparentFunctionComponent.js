import isClassComponent from './isClassComponent'

/**
 * Returns true if the given value is a referentially transparent function component.
 * A referentially transparent function component is a component without any other
 * thing expect taking some props and returning a component.
 *
 * This method is useful to apply some optimization.
 *
 * @static
 * @category Utilities
 * @param {*} value Any value
 * @returns {Boolean} Returns true if the given value is a referentially
 * transparent function component.
 * @example
 *
 * const Button = () => <button />;
 * isReferentiallyTransparentFunctionComponent(Button); // true
 */
const isReferentiallyTransparentFunctionComponent = Component =>
  Boolean(
    typeof Component === 'function' &&
      !isClassComponent(Component) &&
      !Component.defaultProps &&
      !Component.contextTypes &&
      (process.env.NODE_ENV === 'production' || !Component.propTypes),
  )

export default isReferentiallyTransparentFunctionComponent
