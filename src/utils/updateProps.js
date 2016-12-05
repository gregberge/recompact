import {Observable} from 'rxjs/Observable';
import createHOCFromMapper from './createHOCFromMapper';

const updateProps = subscriber =>
  createHOCFromMapper((props$, obs) => [
    new Observable((observer) => {
      const subscription = props$.subscribe({
        next: subscriber(::observer.next),
        error: ::observer.error,
        complete: ::observer.complete,
      });

      return ::subscription.unsubscribe;
    }),
    obs,
  ]);

export default updateProps;
