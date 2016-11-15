import {createClass} from 'react';
import createEagerFactory from 'recompose/createEagerFactory';
import createHelper from './createHelper';

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
