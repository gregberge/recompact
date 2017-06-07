import omit from './utils/omit'
import pick from './utils/pick'
import createHelper from './createHelper'
import mapProps from './mapProps'

const { keys } = Object

const mapKeys = (obj, func) =>
  keys(obj).reduce((result, key) => {
    const val = obj[key]
    /* eslint-disable no-param-reassign */
    result[func(val, key)] = val
    /* eslint-enable no-param-reassign */
    return result
  }, {})

/**
 * Renames multiple props, using a map of old prop names to new prop names.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} nameMap A map with old prop as key and new prop as value.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * renameProps({data: 'value'})
 */
const renameProps = nameMap =>
  mapProps(props => ({
    ...omit(props, keys(nameMap)),
    ...mapKeys(pick(props, keys(nameMap)), (_, oldName) => nameMap[oldName]),
  }))

export default createHelper(renameProps, 'renameProps')
