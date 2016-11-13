import createHelper from './createHelper';
import mapProps from './mapProps';

const flattenProp = propName => mapProps(props => ({
  ...props,
  ...props[propName],
}));

export default createHelper(flattenProp, 'flattenProp');
