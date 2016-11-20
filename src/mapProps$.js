import createHOCFromMapper from './utils/createHOCFromMapper';
import createHelper from './createHelper';

const mapProps$ = propsStreamMapper => createHOCFromMapper((props$, obs) => {
  const nextProps$ = propsStreamMapper(props$, obs);
  if (process.env.NODE_ENV !== 'production') {
    const invariant = require('./utils/invariant').default; // eslint-disable-line global-require
    invariant(typeof nextProps$.subscribe === 'function', 'Expected a props Observable.');
  }
  return [nextProps$, obs];
});

export default createHelper(mapProps$, 'mapProps$');
