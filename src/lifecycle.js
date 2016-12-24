import {createClass} from 'react';
import createEagerFactory from './createEagerFactory';
import createHelper from './createHelper';

/**
 * A higher-order component version of
 * [`React.createClass()`](https://facebook.github.io/react/docs/react-api.html#createclass).
 * It supports the entire `createClass()` API, except the `render()` method,
 * which is implemented by default (and overridden if specified; an error will
 * be logged to the console). You should use this helper as an escape hatch, in
 * case you need to access component lifecycle methods.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} spec Lifecycle spec
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * // Create a hoc that will log when a component will mount
 * const logWhenMount = lifecycle({componentWillMount: () => console.log('will mount')});
 */
const lifecycle = spec => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  if (
    process.env.NODE_ENV !== 'production' &&
    Object.prototype.hasOwnProperty.call(spec, 'render')
  ) {
    /* eslint-disable no-console */
    console.error(
      'lifecycle() does not support the render method; its behavior is to ' +
      'pass all props and state to the base component.',
    );
    /* eslint-enable no-console */
  }

  const implementation = {
    ...spec,
    render() {
      return factory({
        ...this.props,
        ...this.state,
      });
    },
  };

  return createClass(implementation);
};

export default createHelper(lifecycle, 'lifecycle');
