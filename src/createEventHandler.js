import $$observable from 'symbol-observable'
import createChangeEmitter from './utils/createChangeEmitter'
import { config as globalConfig } from './setObservableConfig'

export const createEventHandlerWithConfig = config => () => {
  const emitter = createChangeEmitter()
  const stream = config.fromESObservable({
    subscribe(observer) {
      const unsubscribe = emitter.listen(value => observer.next(value))
      return { unsubscribe }
    },
    [$$observable]() {
      return this
    },
  })
  return {
    handler: emitter.emit,
    stream,
  }
}

/**
 * Returns an object with properties handler and stream. stream is an observable
 * sequence, and handler is a function that pushes new values onto the sequence.
 * Useful for creating event handlers like onClick.
 *
 * @static
 * @category Utilities
 * @returns {Object} eventHandler
 * @returns {Function} eventHandler.handler
 * @returns {Observable} eventHandler.stream
 * @example
 *
 * const {handler, stream} = createEventHandler();
 */
const createEventHandler = createEventHandlerWithConfig(globalConfig)

export default createEventHandler
