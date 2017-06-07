import createEagerElementUtil from './utils/createEagerElementUtil'
import isReferentiallyTransparentFunctionComponent from './isReferentiallyTransparentFunctionComponent'

/**
 * The factory form of `createEagerElement()`.
 * Given a component, it returns a [factory](https://facebook.github.io/react/docs/react-api.html#createfactory).
 *
 * @static
 * @category Utilities
 * @param {ReactClass|ReactFunctionalComponent|String} type The type of component to render.
 * @returns {Function} Returns a function that take two arguments (props, children) and create
 * an element of the given type.
 * @example
 *
 * const div = createFactory('div');
 * div({className: 'foo'});
 */
const createEagerFactory = type => {
  const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(
    type,
  )
  return (props, children) =>
    createEagerElementUtil(
      false,
      isReferentiallyTransparent,
      type,
      props,
      children,
    )
}

export default createEagerFactory
