/* eslint-disable import/prefer-default-export */
import createObservable from './createObservable'

const shareObservable = (observable) => {
  const observers = []
  let emitted
  let lastValue

  observable.subscribe({
    next: (value) => {
      emitted = true
      lastValue = value
      observers.forEach(o => o.next(value))
    },
    complete: value => observers.forEach(o => o.complete(value)),
    error: error => observers.forEach(o => o.error(error)),
  })

  return createObservable((observer) => {
    observers.push(observer)

    if (emitted) {
      observers.forEach(o => o.next(lastValue))
    }

    return {
      unsubscribe: () => {
        const index = observers.indexOf(observer)
        if (index === -1) return
        observers.splice(index, 1)
      },
    }
  })
}

export default shareObservable
