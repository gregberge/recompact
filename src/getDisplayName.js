/**
 * Returns the display name of a React component. Falls back to 'Component'.
 *
 * @static
 * @category Utilities
 * @param {ReactClass|ReactFunctionalComponent} component
 * @returns {String} Returns the display name of the provided component.
 * @example
 *
 * const MyButton = () => <button />;
 * MyButton.displayName = 'MyButton';
 *
 * getDisplayName(MyComponent); // Will return "MyButton"
 */
const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

export default getDisplayName
