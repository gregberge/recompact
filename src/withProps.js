import createHelper from './createHelper';
import callOrUse from './utils/callOrUse';
import createEagerFactory from './createEagerFactory';
import {isMapperComponent} from './utils/createHOCFromMapper';
import updateProps from './utils/updateProps';

/**
 * Like `mapProps()`, except the newly created props are merged with the owner props.
 *
 * Instead of a function, you can also pass a props object directly. In this form,
 * it is similar to `defaultProps()`, except the provided props take precedence over
 * props from the owner.
 *
 * @static
 * @category High-order-components
 * @param {Function|Object} propsMapper
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const Button = withProps({type: 'button'})('button');
 * const XButton = withProps(({type}) => {type: `x${type}`})('button');
 */
const withProps = propsMapper => (BaseComponent) => {
  const propsOrMapper = callOrUse(propsMapper);

  if (isMapperComponent(BaseComponent)) {
    return updateProps(next => (props) => {
      next({...props, ...propsOrMapper(props)});
    })(BaseComponent);
  }

  const factory = createEagerFactory(BaseComponent);
  return props => factory({...props, ...propsOrMapper(props)});
};

export default createHelper(withProps, 'withProps');
