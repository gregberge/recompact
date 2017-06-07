/* eslint-disable import/prefer-default-export */
import createObservable from './createObservable'

const shareObservable = observable => {
  const observers = []
  let emitted = false
  let lastValue
  let subscription = null

  return createObservable(observer => {
    if (!subscription) {
      subscription = observable.subscribe({
        next: value => {
          emitted = true
          lastValue = value
          observers.forEach(o => o.next(value))
        },
        complete: value => observers.forEach(o => o.complete(value)),
        error: error => observers.forEach(o => o.error(error)),
      })
    }

    observers.push(observer)

    if (emitted) {
      observer.next(lastValue)
    }

    return {
      unsubscribe: () => {
        const index = observers.indexOf(observer)
        if (index === -1) return
        observers.splice(index, 1)

        if (observers.length === 0) {
          subscription.unsubscribe()
          emitted = false
          subscription = null
        }
      },
    }
  })
}

export default shareObservable
