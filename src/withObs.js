import createHOCFromMapper from './utils/createHOCFromMapper';
import createHelper from './createHelper';

const withObs = obsMapper => createHOCFromMapper((props$, obs) => {
  const {props$: nextProps$ = props$, ...nextObs} = obsMapper({...obs, props$});
  return [nextProps$, {...obs, ...nextObs}];
});

export default createHelper(withObs, 'withObs');
