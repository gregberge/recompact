import wrap from './utils/wrap';
import createHelper from './createHelper';
import mapContextObs from './mapContextObs';

const withContextObs = obsMapper => mapContextObs((obs, props$) => ({
  ...obs,
  ...wrap(obsMapper)(obs, props$),
}));

export default createHelper(withContextObs, 'withContextObs');
