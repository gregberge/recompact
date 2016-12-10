import omit from './utils/omit';
import createHelper from './createHelper';
import mapProps from './mapProps';

/**
 * Same as lodash `omit` but for props.
 *
 * @static
 * @category High-order-components
 * @param {String|String[]} paths The property paths to omit.
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @see https://lodash.com/docs/master#omit
 * @example
 *
 * const withoutValue = omitProps('value');
 */
const omitProps = paths => mapProps(props => omit(props, paths));

export default createHelper(omitProps, 'omitProps');
