import createObservable from './createObservable';
import createHOCFromMapper from './createHOCFromMapper';
import {config as obsConfig} from '../setObservableConfig';

const updateProps = subscriber =>
  createHOCFromMapper((props$, obs) => [
    createObservable(observer =>
      obsConfig.toESObservable(props$).subscribe({
        next: subscriber(::observer.next),
        error: observer.error ? ::observer.error : undefined,
        complete: observer.complete ? ::observer.complete : undefined,
      }),
    ),
    obs,
  ]);

export default updateProps;
