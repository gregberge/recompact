import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import wrap from './utils/wrap';
import invariant from './utils/invariant';
import mapProps$ from './mapProps$';
import createHelper from './createHelper';

const withProps$ = propsStreamMapper => mapProps$((props$, obs) => {
  const nextProps$ = wrap(propsStreamMapper)(props$, obs);
  invariant(typeof nextProps$.subscribe === 'function', 'Expected a props Observable.');
  return nextProps$::withLatestFrom(props$, (nextProps, props) => ({
    ...props,
    ...nextProps,
  }));
});

export default createHelper(withProps$, 'withProps$');
