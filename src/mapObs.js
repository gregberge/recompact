import createHOCFromMapper from './utils/createHOCFromMapper';
import createHelper from './createHelper';

const mapObs = obsMapper => createHOCFromMapper((props$, obs) => {
  const {props$: nextProps$ = props$, ...nextObs} = obsMapper({...obs, props$});
  return [nextProps$, nextObs];
});

export default createHelper(mapObs, 'mapObs');
