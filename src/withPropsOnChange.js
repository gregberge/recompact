import pick from './utils/pick';
import shallowEqual from './shallowEqual';
import createHelper from './createHelper';
import updateProps from './utils/updateProps';

/**
 * Like `withProps()`, except the new props are only created when one of the owner
 * props specified by `shouldMapOrKeys` changes. This helps ensure that expensive
 * computations inside `createProps()` are only executed when necessary.
 *
 * Instead of an array of prop keys, the first parameter can also be a function
 * that returns a boolean, given the current props and the next props. This allows
 * you to customize when `createProps()` should be called.
 *
 * @static
 * @category High-order-components
 * @param {Function|String|String[]} shouldMapOrKeys
 * @param {Function} createProps
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const withEmptyProp = withPropsOnChange('count', ({count}) => ({empty: count === 0}));
 */
const withPropsOnChange = (shouldMapOrKeys, propsMapper) => {
  const shouldMap = typeof shouldMapOrKeys === 'function'
    ? shouldMapOrKeys
    : (props, nextProps) => !shallowEqual(
        pick(props, shouldMapOrKeys),
        pick(nextProps, shouldMapOrKeys),
      );

  return updateProps((next) => {
    let props = {};
    let computedProps;

    return (nextProps) => {
      if (shouldMap(props, nextProps)) {
        computedProps = propsMapper(nextProps);
      }

      props = nextProps;
      next({...nextProps, ...computedProps});
    };
  });
};

export default createHelper(withPropsOnChange, 'withPropsOnChange');
