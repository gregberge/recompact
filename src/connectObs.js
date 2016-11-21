import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {Observable} from 'rxjs/Observable';
import createHelper from './createHelper';
import withProps$ from './withProps$';

const checkObsMap = (obsMap) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof obsMap !== 'object') {
      throw new Error(
        'connectObs(): The observable mapper must return a plain object, got '
        + `'${obsMap}' instead`,
      );
    }
  }
};

const checkObserver = (observer, name) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!observer || !observer.next) {
      throw new Error(
        `connectObs(): Expected '${name}' to be an Observer, got `
        + `'${observer}' instead.`,
      );
    }
  }
};

const checkObservable = (observable, name) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!observable || !observable.subscribe) {
      throw new Error(
        `connectObs(): Expected '${name}' to be an Observable, got `
        + `'${observable}' instead.`,
      );
    }
  }
};

const aggregateProps = values => values.reduce((acc, [key, value]) => {
  acc[key] = value; // eslint-disable-line no-param-reassign
  return acc;
}, {});

const connectObs = obsMapper => withProps$((props$, observables) => {
  const obsMap = obsMapper({...observables, props$});
  checkObsMap(obsMap);

  const combinedObs = Object.keys(obsMap).reduce((acc, key) => {
    const observable = obsMap[key];
    let propsObservable;

    if (key.match(/^on[A-Z]/)) {
      checkObserver(observable, key);
      propsObservable = of(::observable.next);
    } else {
      checkObservable(observable, key);
      propsObservable = new Observable((observer) => {
        let emitted;

        const subscription = observable.subscribe({
          ...observer,
          next(value) {
            emitted = true;
            observer.next(value);
          },
        });

        if (!emitted) {
          observer.next(undefined);
        }

        return ::subscription.unsubscribe;
      });
    }

    acc.push(propsObservable::map(value => [key, value]));
    return acc;
  }, []);

  return combineLatest(combinedObs)::map(aggregateProps);
});

export default createHelper(connectObs, 'connectObs');
