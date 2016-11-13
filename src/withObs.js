import createHelper from './createHelper';
import mapObs from './mapObs';

const withObs = (input, options) =>
  mapObs((observables) => {
    const {
      context$, // eslint-disable-line no-unused-vars
      ...others
    } = observables;

    return {
      ...others,
      ...(
        typeof input === 'function'
          ? input(observables)
          : input
      ),
    };
  }, options);

export default createHelper(withObs, 'withObs');
