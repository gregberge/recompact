import invariant from './utils/invariant';
import createHOCFromMapper from './utils/createHOCFromMapper';
import createHelper from './createHelper';

const mapObs = obsMapper => createHOCFromMapper((props$, obs) => {
  const nextObs = obsMapper(obs, props$);
  invariant(typeof nextObs === 'object', 'Expected a map of Observervables.');
  return [props$, nextObs];
});

export default createHelper(mapObs, 'mapObs');
