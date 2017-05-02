import createObservable from './createObservable'
import createHOCFromMapper from './createHOCFromMapper'
import { config as obsConfig } from '../setObservableConfig'

const updateProps = subscribe =>
  createHOCFromMapper((props$, obs) => [
    createObservable((observer) => {
      let subscriber = subscribe((value) => { observer.next(value) })
      if (typeof subscriber === 'function') {
        subscriber = { next: subscriber }
      }
      obsConfig.toESObservable(props$).subscribe({
        next: subscriber.next,
        error(error) {
          if (typeof subscriber.error === 'function') {
            subscriber(error)
          }

          if (typeof observer.error === 'function') {
            observer.error(error)
          }
        },
        complete(value) {
          if (typeof subscriber.error === 'function') {
            subscriber(value)
          }

          if (typeof observer.error === 'function') {
            observer.error(value)
          }
        },
      })
    }),
    obs,
  ])

export default updateProps
