import setStatic from './setStatic'

/**
 * Assigns to the `displayName` property on the base component.
 *
 * @static
 * @category Higher-order-components
 * @param {String} displayName
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * setDisplayName('AnotherDisplayName')(MyComponent);
 */
const setDisplayName = displayName => setStatic('displayName', displayName)

export default setDisplayName
