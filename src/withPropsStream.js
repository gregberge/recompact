import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import wrap from './utils/wrap';
import invariant from './utils/invariant';
import mapPropsStream from './mapPropsStream';
import createHelper from './createHelper';

const withPropsStream = propsStreamMapper => mapPropsStream((props$, obs) => {
  const nextProps$ = wrap(propsStreamMapper)(props$, obs);
  invariant(typeof nextProps$.subscribe === 'function', 'Expected a props Observable.');
  return nextProps$::withLatestFrom(props$, (nextProps, props) => ({
    ...props,
    ...nextProps,
  }));
});

export default createHelper(withPropsStream, 'withPropsStream');
