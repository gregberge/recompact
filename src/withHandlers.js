import createHelper from './createHelper';
import updateProps from './utils/updateProps';

const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key); // eslint-disable-line no-param-reassign
    return result;
  }, {});

/**
 * Takes an object map of handler creators. These are higher-order functions that
 * accept a set of props and return a function handler:
 *
 * This allows the handler to access the current props via closure, without needing
 * to change its signature.
 *
 * Handlers are passed to the base component as immutable props, whose identities
 * are preserved across renders. This avoids a common pitfall where functional
 * components create handlers inside the body of the function, which results in a
 * new handler on every render and breaks downstream `shouldComponentUpdate()`
 * optimizations that rely on prop equality.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} handlerFactories
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const enhance = compose(
 *   withState('value', 'updateValue', ''),
 *   withHandlers({
 *     onChange: props => event => {
 *       props.updateValue(event.target.value)
 *     },
 *     onSubmit: props => event => {
 *       event.preventDefault()
 *       submitForm(props.value)
 *     }
 *   })
 * )
 *
 * const Form = enhance(({ value, onChange, onSubmit }) =>
 *   <form onSubmit={onSubmit}>
 *     <label>Value
 *       <input type="text" value={value} onChange={onChange} />
 *     </label>
 *   </form>
 * )
 */
const withHandlers = handlerFactories => updateProps((next) => {
  let cachedHandlers;
  let props;

  const handlers = mapValues(handlerFactories,
    (createHandler, handlerName) => (...args) => {
      const cachedHandler = cachedHandlers[handlerName];
      if (cachedHandler) {
        return cachedHandler(...args);
      }

      const handler = createHandler(props);
      cachedHandlers[handlerName] = handler;

      if (
        process.env.NODE_ENV !== 'production' &&
        typeof handler !== 'function'
      ) {
        throw new Error(
          'withHandlers(): Expected a map of higher-order functions.',
        );
      }

      return handler(...args);
    },
  );

  return (nextProps) => {
    cachedHandlers = {};
    props = nextProps;
    next({...nextProps, ...handlers});
  };
});

export default createHelper(withHandlers, 'withHandlers');
