import wrap from './utils/wrap';
import createHelper from './createHelper';
import mapObs from './mapObs';

const withObs = obsMapper => mapObs((obs, props$) => ({
  ...obs,
  ...wrap(obsMapper)(obs, props$),
}));

export default createHelper(withObs, 'withObs');
