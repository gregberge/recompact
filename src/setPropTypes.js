import setStatic from './setStatic'

/**
 * Assigns to the `propTypes` property on the base component.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} propTypes
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * setPropTypes({children: PropTypes.node})(MyComponent);
 */
const setPropTypes = propTypes => setStatic('propTypes', propTypes)

export default setPropTypes
