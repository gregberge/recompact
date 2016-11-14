import pick from 'recompose/utils/pick';
import shallowEqual from 'recompose/shallowEqual';
import createHelper from './createHelper';
import shouldUpdate from './shouldUpdate';

const onlyUpdateForKeys = propKeys =>
  shouldUpdate(
    (props, nextProps) => !shallowEqual(
      pick(nextProps, propKeys),
      pick(props, propKeys),
    ),
  );

export default createHelper(onlyUpdateForKeys, 'onlyUpdateForKeys');
