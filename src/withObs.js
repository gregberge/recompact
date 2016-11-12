import createHelper from 'recompose/createHelper';
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
