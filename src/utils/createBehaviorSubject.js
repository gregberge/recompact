/* eslint-disable import/prefer-default-export */
import createChangeEmitter from './createChangeEmitter'
import createObservable from './createObservable'

const noop = () => {}

const createBehaviorSubject = initial => {
  let last = initial
  const emitter = createChangeEmitter()
  let complete = noop
  const observable = createObservable(observer => {
    const unsubscribe = emitter.listen(value => {
      last = value
      observer.next(value)
    })
    observer.next(last)
    complete = observer.complete ? observer.complete.bind(observer) : complete
    return { unsubscribe }
  })
  observable.next = emitter.emit
  observable.complete = () => {
    complete()
  }
  return observable
}

export default createBehaviorSubject
