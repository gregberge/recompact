/* eslint-disable no-shadow */
import createHelper from 'recompose/createHelper';
import withProps from './withProps';

const defaultProps = defaultProps => withProps(props => ({
  ...props,
  ...Object.keys(defaultProps).reduce((acc, key) => ({
    ...acc,
    [key]: props[key] === undefined ? defaultProps[key] : props[key],
  }), {}),
}));

export default createHelper(defaultProps, 'defaultProps');
