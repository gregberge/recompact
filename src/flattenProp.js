import warning from 'warning'
import createHelper from './createHelper'
import mapProps from './mapProps'

/**
 * Flattens a prop so that its fields are spread out into the props object.
 *
 * @static
 * @category Higher-order-components
 * @deprecated since v3.0.0, use flattenProps instead
 * @param {String} propName Name of the prop to flatten.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const Button = flattenProp('props')('button');
 * <Button props={{type: 'submit'}} /> // will render <button type="submit" />
 */
const flattenProp = propName => {
  if (process.env.NODE_ENV !== 'production') {
    warning(
      true,
      '`flattenProp` is deprecated, please use `flattenProps` instead.',
    )
  }

  return mapProps(props => ({
    ...props,
    ...props[propName],
  }))
}

export default createHelper(flattenProp, 'flattenProp')
