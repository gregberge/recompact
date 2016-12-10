import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import {Observable} from 'rxjs/Observable';
import createHelper from './createHelper';
import withObs from './withObs';

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

/**
 * Connect observables to props using a map.
 *
 * - The function take one argument, an object containing context observables
 * and a special observable `props$` that emits owner props.
 * - The property is updated at each emission of a new value by the associated
 * Observable.
 * - Properties matching `/^on[A-Z]/` are mapped to the `next` method of
 * the associated Observer.
 *
 * @static
 * @category High-order-components
 * @param {Function} obsMapper The function that takes observables and returns map.
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * connectObs(({change$, value$}) => ({
 *   onChange: change$,
 *   value: value$,
 * }))('input');
 */
const connectObs = obsMapper => withObs(({props$, ...observables}) => {
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

  return {
    props$: combineLatest(combinedObs)
      ::map(aggregateProps)
      ::withLatestFrom(props$, (nextProps, props) => ({
        ...props,
        ...nextProps,
      })),
  };
});

export default createHelper(connectObs, 'connectObs');
