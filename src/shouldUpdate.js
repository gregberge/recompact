import createHelper from './createHelper';
import updateProps from './utils/updateProps';

/**
 * Higher-order component version of
 * [`shouldComponentUpdate()`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate).
 * The test function accepts both the current props and the next props.
 *
 * @static
 * @category High-order-components
 * @param {Function} test Receive two arguments, props and nextProps
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * // Pure
 * shouldUpdate((props, nextProps) => shallowEqual(props, nextProps))
 */
const shouldUpdate = test => updateProps((next) => {
  let props;

  return (nextProps) => {
    if (!props || test(props, nextProps)) {
      next(nextProps);
    }

    props = nextProps;
  };
});

export default createHelper(shouldUpdate, 'shouldUpdate');
