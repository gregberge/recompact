import omit from './utils/omit';
import createEagerElement from './createEagerElement';

const componentFromProp = (propName) => {
  const Component = props =>
    createEagerElement(props[propName], omit(props, [propName]));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `componentFromProp(${propName})`;
  }

  return Component;
};

export default componentFromProp;
