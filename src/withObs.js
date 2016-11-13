import createHelper from './createHelper';
import mapObs from './mapObs';

const withObs = (input, options) =>
  mapObs(observables => ({
    ...observables,
    ...(
      typeof input === 'function'
        ? input(observables)
        : input
    ),
  }), options);

export default createHelper(withObs, 'withObs');
