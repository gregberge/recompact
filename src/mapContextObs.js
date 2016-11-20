import createHOCFromMapper from './utils/createHOCFromMapper';
import createHelper from './createHelper';

const mapContextObs = obsMapper => createHOCFromMapper((props$, obs) => {
  const nextObs = obsMapper(obs, props$);
  if (process.env.NODE_ENV !== 'production') {
    const invariant = require('./utils/invariant').default; // eslint-disable-line global-require
    invariant(typeof nextObs === 'object', 'Expected a map of Observervables.');
  }
  return [props$, nextObs];
});

export default createHelper(mapContextObs, 'mapContextObs');
