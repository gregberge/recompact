import createObservable from './createObservable'
import createHOCFromMapper from './createHOCFromMapper'
import { config as obsConfig } from '../setObservableConfig'

const updateProps = subscriber =>
  createHOCFromMapper((props$, obs) => [
    createObservable(observer =>
      obsConfig.toESObservable(props$).subscribe({
        next: subscriber(observer.next),
        error: typeof observer.error === 'function' ? error => observer.error(error) : undefined,
        complete: typeof observer.complete === 'function' ? value => observer.complete(value) : undefined,
      }),
    ),
    obs,
  ])

export default updateProps
