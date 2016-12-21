import $$observable from 'symbol-observable';
import createHOCFromMapper from './createHOCFromMapper';
import {config as obsConfig} from '../setObservableConfig';

const updateProps = subscriber =>
  createHOCFromMapper((props$, obs) => [
    obsConfig.fromESObservable({
      subscribe(observer) {
        return obsConfig.toESObservable(props$).subscribe({
          next: subscriber(::observer.next),
          error: observer.error ? ::observer.error : undefined,
          complete: observer.complete ? ::observer.complete : undefined,
        });
      },
      [$$observable]() {
        return this;
      },
    }),
    obs,
  ]);

export default updateProps;
