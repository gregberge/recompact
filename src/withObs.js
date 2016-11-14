import createHelper from './createHelper';
import mapObs from './mapObs';

const withObs = input =>
  mapObs(observables => ({
    ...observables,
    ...(
      typeof input === 'function'
        ? input(observables)
        : input
    ),
  }));

export default createHelper(withObs, 'withObs');
