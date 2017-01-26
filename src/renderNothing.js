const Nothing = () => null
Nothing.displayName = 'Nothing'

/**
 * A higher-order component that always renders `null`.
 *
 * @static
 * @category Higher-order-components
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const renderNothingIfNoRules = branch(
 *   ({rules} => rules.length === 0),
 *   renderNothing,
 * )
 */
const renderNothing = () => Nothing

export default renderNothing
