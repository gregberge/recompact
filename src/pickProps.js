import pick from './utils/pick'
import createHelper from './createHelper'
import mapProps from './mapProps'

/**
 * Same as lodash `pick` but for props.
 *
 * @static
 * @category Higher-order-components
 * @param {String|String[]} paths The property paths to pick.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @see https://lodash.com/docs/master#pick
 * @example
 *
 * const onlyWithValue = pickProps('value');
 */
const pickProps = paths => mapProps(props => pick(props, paths))

export default createHelper(pickProps, 'pickProps')
