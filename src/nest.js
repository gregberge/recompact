import createEagerFactory from './createEagerFactory'

/**
 * Composes components by nesting each one inside the previous.
 *
 * @static
 * @category Higher-order-components
 * @param {...(ReactClass|ReactFunctionalComponent)} components
 * @returns {ReactFunctionalComponent}
 * @example
 *
 * // Delay rendering of 1s
 * const DivButton = nest('div', 'button');
 * // will render <div className="foo"><button className="foo" /></div>
 * <DivButton className="foo" />
 */
const nest = (...components) => {
  const factories = components.map(createEagerFactory)
  const Nest = ({ children, ...props }) =>
    factories.reduceRight((child, factory) => factory(props, child), children)

  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const getDisplayName = require('./getDisplayName').default
    /* eslint-enable global-require */
    const displayNames = components.map(getDisplayName)
    Nest.displayName = `nest(${displayNames.join(', ')})`
  }

  return Nest
}

export default nest
