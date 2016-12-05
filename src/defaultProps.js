/* eslint-disable no-shadow, no-restricted-syntax, no-param-reassign */
import createHelper from './createHelper';
import withProps from './withProps';

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
