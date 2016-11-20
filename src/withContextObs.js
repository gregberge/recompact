import callOrUse from './utils/callOrUse';
import createHelper from './createHelper';
import mapContextObs from './mapContextObs';

const withContextObs = obsMapper => mapContextObs((obs, props$) => ({
  ...obs,
  ...callOrUse(obsMapper)(obs, props$),
}));

export default createHelper(withContextObs, 'withContextObs');
