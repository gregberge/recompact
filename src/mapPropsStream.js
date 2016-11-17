import invariant from './utils/invariant';
import createHoCFromMapper from './utils/createHoCFromMapper';
import createHelper from './createHelper';

const mapPropsStream = propsStreamMapper => createHoCFromMapper((props$, obs) => {
  const nextProps$ = propsStreamMapper(props$, obs);
  invariant(typeof nextProps$.subscribe === 'function', 'Expected a props Observable.');
  return [nextProps$, obs];
});

export default createHelper(mapPropsStream, 'mapPropsStream');
