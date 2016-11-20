import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import callOrUse from './utils/callOrUse';
import mapProps$ from './mapProps$';
import createHelper from './createHelper';

const withProps$ = propsStreamMapper => mapProps$((props$, obs) => {
  const nextProps$ = callOrUse(propsStreamMapper)(props$, obs);
  if (process.env.NODE_ENV !== 'production') {
    const invariant = require('./utils/invariant').default; // eslint-disable-line global-require
    invariant(typeof nextProps$.subscribe === 'function', 'Expected a props Observable.');
  }
  return nextProps$::withLatestFrom(props$, (nextProps, props) => ({
    ...props,
    ...nextProps,
  }));
});

export default createHelper(withProps$, 'withProps$');
