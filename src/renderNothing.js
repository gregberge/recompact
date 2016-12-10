const Nothing = () => null;
Nothing.displayName = 'Nothing';

/**
 * A higher-order component that always renders `null`.
 *
 * @static
 * @category High-order-components
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const renderNothingIfNoRules = branch(
 *   ({rules} => rules.length === 0),
 *   renderNothing,
 * )
 */
const renderNothing = () => Nothing;

export default renderNothing;
