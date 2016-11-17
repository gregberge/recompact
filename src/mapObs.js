import invariant from './utils/invariant';
import createHoCFromMapper from './utils/createHoCFromMapper';
import createHelper from './createHelper';

const mapObs = obsMapper => createHoCFromMapper((props$, obs) => {
  const nextObs = obsMapper(obs, props$);
  invariant(typeof nextObs === 'object', 'Expected a map of Observervables.');
  return [props$, nextObs];
});

export default createHelper(mapObs, 'mapObs');
