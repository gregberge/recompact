import setStatic from './setStatic';

/**
 * Assigns to the `propTypes` property on the base component.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} propTypes
 * @returns {HigherOrderComponent} Returns a function that take a Component.
 * @example
 *
 * setPropTypes({children: PropTypes.node})(MyComponent);
 */
const setPropTypes = propTypes => setStatic('propTypes', propTypes);

export default setPropTypes;
