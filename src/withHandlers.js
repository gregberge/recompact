import {mapTo} from 'rxjs/operator/mapTo';
import {_do} from 'rxjs/operator/do';
import createHelper from './createHelper';
import withPropsStream from './withPropsStream';

const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key); // eslint-disable-line no-param-reassign
    return result;
  }, {});

const withHandlers = handlerFactories => withPropsStream((props$) => {
  let cachedHandlers;
  let props;

  const onNextProps = (nextProps) => {
    cachedHandlers = {};
    props = nextProps;
  };

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

  return props$::_do(onNextProps)::mapTo(handlers);
});

export default createHelper(withHandlers, 'withHandlers');
