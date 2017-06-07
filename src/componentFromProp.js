import omit from './utils/omit'
import createEagerElement from './createEagerElement'

/**
 * Creates a component that accepts a component as a prop and renders it
 * with the remaining props.
 *
 * @static
 * @category Utilities
 * @param {String} prop The prop to render as Component.
 * @returns {ReactFunctionalComponent} Returns a Component.
 * @example
 *
 * const enhance = defaultProps({component: 'button'});
 * const Button = enhance(componentFromProp('component'));
 *
 * <Button foo="bar" /> // renders <button foo="bar" />
 * <Button component="a" foo="bar" />  // renders <a foo="bar" />
 * <Button component={Link} foo="bar" />  // renders <Link foo="bar" />
 */
const componentFromProp = propName => {
  const Component = props =>
    createEagerElement(props[propName], omit(props, [propName]))

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `componentFromProp(${propName})`
  }

  return Component
}

export default componentFromProp
