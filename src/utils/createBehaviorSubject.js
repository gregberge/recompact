/* eslint-disable import/prefer-default-export */
import { createChangeEmitter } from 'change-emitter'
import createObservable from './createObservable'

const createBehaviorSubject = (initial) => {
  let last = initial
  const emitter = createChangeEmitter()
  const observable = createObservable((observer) => {
    const unsubscribe = emitter.listen((value) => {
      last = value
      observer.next(value)
    })
    observer.next(last)
    return { unsubscribe }
  })
  observable.next = ::emitter.emit
  return observable
}

export default createBehaviorSubject
