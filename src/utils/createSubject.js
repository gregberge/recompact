/* eslint-disable import/prefer-default-export */
import { createChangeEmitter } from 'change-emitter'
import createObservable from './createObservable'

const createSubject = () => {
  const emitter = createChangeEmitter()
  const observable = createObservable((observer) => {
    const unsubscribe = emitter.listen(
      props => observer.next(props),
    )
    return { unsubscribe }
  })
  observable.next = ::emitter.emit
  return observable
}

export default createSubject
