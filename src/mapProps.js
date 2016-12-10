import createHelper from './createHelper';
import createEagerFactory from './createEagerFactory';
import {isMapperComponent} from './utils/createHOCFromMapper';
import updateProps from './utils/updateProps';

/**
 * Accepts a function that maps owner props to a new collection of props that
 * are passed to the base component.
 *
 * @static
 * @category High-order-components
 * @param {Function} propsMapper The function that returns new props.
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * // Add a new prop computed from owner props
 * mapProps(({count}) => ({moreThanFive: count > 5}))(MyComponent);
 */
const mapProps = propsMapper => (BaseComponent) => {
  if (isMapperComponent(BaseComponent)) {
    return updateProps(next => (props) => {
      next(propsMapper(props));
    })(BaseComponent);
  }

  const factory = createEagerFactory(BaseComponent);
  return props => factory(propsMapper(props));
};

export default createHelper(mapProps, 'mapProps');
