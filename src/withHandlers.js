import createHelper from './createHelper';
import updateProps from './utils/updateProps';

const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key); // eslint-disable-line no-param-reassign
    return result;
  }, {});

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
