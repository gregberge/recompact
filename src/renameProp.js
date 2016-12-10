import omit from './utils/omit';
import createHelper from './createHelper';
import mapProps from './mapProps';

/**
 * Renames a single prop.
 *
 * @static
 * @category High-order-components
 * @param {String} oldName
 * @param {String} newName
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * renameProp('data', 'value')
 */
const renameProp = (oldName, newName) =>
  mapProps(props => ({
    ...omit(props, [oldName]),
    [newName]: props[oldName],
  }));

export default createHelper(renameProp, 'renameProp');
