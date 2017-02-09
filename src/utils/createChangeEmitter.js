const createChangeEmitter = () => {
  let currentListeners = []
  let nextListeners = currentListeners

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function listen(listener) {
    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return () => {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function emit(value) {
    currentListeners = nextListeners
    const listeners = currentListeners
    for (let i = 0; i < listeners.length; i += 1) {
      listeners[i](value)
    }
  }

  return { listen, emit }
}

export default createChangeEmitter
