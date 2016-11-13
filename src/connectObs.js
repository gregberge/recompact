import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {startWith} from 'rxjs/operator/startWith';
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

const aggregateProps = values => values.reduce((acc, value) => ({...acc, ...value}));

const connectObs = mapObservables => withObs((observables) => {
  const obsMap = mapObservables(observables);
  checkObsMap(obsMap);

  const combinedObs = Object.entries(obsMap).reduce((acc, [prop, observable]) => {
    let propsObservable;

    if (prop.match(/^on[A-Z]/)) {
      checkObserver(observable, prop);
      propsObservable = of((observable.onNext || observable.next).bind(observable));
    } else {
      checkObservable(observable, prop);
      propsObservable = observable::startWith(undefined);
    }

    return [
      ...acc,
      propsObservable::map(value => ({[prop]: value})),
    ];
  }, [observables.props$]);

  return {props$: combineLatest(combinedObs)::map(aggregateProps)};
});

export default createHelper(connectObs, 'connectObs');
