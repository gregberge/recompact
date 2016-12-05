import shallowEqual from './shallowEqual';
import createHelper from './createHelper';
import shouldUpdate from './shouldUpdate';

const pure = shouldUpdate((props, nextProps) => !shallowEqual(props, nextProps));

export default createHelper(pure, 'pure', true, true);
