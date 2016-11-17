import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {startWith} from 'rxjs/operator/startWith';
import createHelper from './createHelper';
import withPropsStream from './withPropsStream';

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

const connectObs = obsMapper => withPropsStream((props$, obs) => {
  // TODO: change the interface of obsMapper. Should be `obsMapper(obs, props$)`.
  const obsMap = obsMapper({...obs, ...props$});
  checkObsMap(obsMap);

  const combinedObs = Object.keys(obsMap).reduce((acc, key) => {
    const observable = obsMap[key];
    let propsObservable;

    if (key.match(/^on[A-Z]/)) {
      checkObserver(observable, key);
      propsObservable = of((observable.onNext || observable.next).bind(observable));
    } else {
      checkObservable(observable, key);
      propsObservable = observable::startWith(undefined);
    }

    return [
      ...acc,
      propsObservable::map(value => ({[key]: value})),
    ];
  }, []);

  return combineLatest(combinedObs)::map(aggregateProps);
});

export default createHelper(connectObs, 'connectObs');
