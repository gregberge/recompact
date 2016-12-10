/* eslint-disable no-shadow, no-restricted-syntax, no-param-reassign */
import createHelper from './createHelper';
import withProps from './withProps';

/**
 * Specify props values that will be used if the prop is `undefined`.
 *
 * @static
 * @category High-order-components
 * @param {Object} defaultProps Default props.
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * const Button = defaultProps({type: 'button'})('button');
 * <Button /> // will render <button type="button" />
 */
const defaultProps = defaultProps => withProps((props) => {
  const newProps = {...props};
  for (const propName in defaultProps) {
    if (props[propName] === undefined) {
      newProps[propName] = defaultProps[propName];
    }
  }
  return newProps;
});

export default createHelper(defaultProps, 'defaultProps');
