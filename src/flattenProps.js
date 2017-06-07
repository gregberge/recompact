import createHelper from './createHelper'
import mapProps from './mapProps'

/**
 * Flattens one or several props so that its fields are spread out into the props object.
 *
 * @static
 * @category Higher-order-components
 * @alias flattenProp
 * @param {String|String[]} paths The property paths to flatten.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const Button = flattenProps(['a', 'b'])('button');
 * // Will render <button type="submit" className="btn" />
 * <Button a={{type: 'submit'}} b={{className: 'btn'}} />
 */
const flattenProps = paths =>
  mapProps(props => {
    if (typeof paths === 'string') {
      return { ...props, ...props[paths] }
    }

    return paths.reduce(
      (nextProps, path) => ({ ...nextProps, ...props[path] }),
      props,
    )
  })

export default createHelper(flattenProps, 'flattenProps')
