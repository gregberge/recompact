import setStatic from './setStatic'

/**
 * Assigns to the `displayName` property on the base component.
 *
 * @static
 * @category Higher-order-components
 * @param {String} displayName
 * @returns {HigherOrderComponent} Returns a function that take a Component.
 * @example
 *
 * setDisplayName('AnotherDisplayName')(MyComponent);
 */
const setDisplayName = displayName => setStatic('displayName', displayName)

export default setDisplayName
