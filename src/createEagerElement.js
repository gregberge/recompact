import createEagerElementUtil from './utils/createEagerElementUtil'
import isReferentiallyTransparentFunctionComponent from './isReferentiallyTransparentFunctionComponent'

/**
 * React elements are lazily evaluated. But when a higher-order component
 * renders a functional component, the laziness doesn't have any real benefit.
 * createEagerElement() is a replacement for React.createElement() that checks
 * if the given component is referentially transparent. If so, rather than
 * returning a React element, it calls the functional component with the given
 * props and returns its output.
 *
 * @static
 * @category Utilities
 * @param {ReactClass|ReactFunctionalComponent|String} type The type of component to render.
 * @param {Object} [props] The props of the component.
 * @param {ReactNode} [children] The children of the component.
 * @returns {ReactElement} Returns a element.
 * @example
 *
 * createEagerElement('div', {className: 'foo'});
 */
const createEagerElement = (type, props, children) => {
  const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(
    type,
  )
  const hasKey = props && Object.prototype.hasOwnProperty.call(props, 'key')
  return createEagerElementUtil(
    hasKey,
    isReferentiallyTransparent,
    type,
    props,
    children,
  )
}

export default createEagerElement
