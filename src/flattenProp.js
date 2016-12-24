import createHelper from './createHelper';
import mapProps from './mapProps';

/**
 * Flattens a prop so that its fields are spread out into the props object.
 *
 * @static
 * @category Higher-order-components
 * @param {String} propName Name of the prop to flatten.
 * @returns {HigherOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const Button = flattenProp('props')('button');
 * <Button props={{type: 'submit'}} /> // will render <button type="submit" />
 */
const flattenProp = propName => mapProps(props => ({
  ...props,
  ...props[propName],
}));

export default createHelper(flattenProp, 'flattenProp');
