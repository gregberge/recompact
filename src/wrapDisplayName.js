import getDisplayName from './getDisplayName'

/**
 * Returns a wrapped version of a React component's display name. For instance,
 * if the display name of `component` is `'Post'`, and `wrapperName` is `'mapProps'`,
 * the return value is `'mapProps(Post)'`. Most Recompose higher-order components
 * use `wrapDisplayName()`.
 *
 * @static
 * @category Higher-order-components
 * @param {ReactClass|ReactFunctionalComponent} component Component
 * @param {String} wrapperName Wrapper name
 * @returns {String} Returns a wrapped displayName of the component.
 * @example
 *
 * // Create a hoc that will log when a component will mount
 * wrapDisplayName(Button, 'wrap'); // will return wrap(Button)
 */
const wrapDisplayName = (BaseComponent, wrapperName) =>
  `${wrapperName}(${getDisplayName(BaseComponent)})`

export default wrapDisplayName
