import createHelper from './createHelper'
import updateProps from './utils/updateProps'

function throttle(func, wait) {
  let ctx
  let args
  let rtn
  let timeoutID
  let last = 0

  function call() {
    timeoutID = 0
    last = +new Date()
    rtn = func.apply(ctx, args)
    ctx = null
    args = null
  }

  function throttled(..._args) {
    ctx = this
    args = _args
    const delta = new Date() - last
    if (!timeoutID) {
      if (delta >= wait) {
        call()
      } else {
        timeoutID = setTimeout(call, wait - delta)
      }
    }
    return rtn
  }

  throttled.cancel = () => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
  }

  return throttled
}

const throttleProps = (paths, waitTime) => updateProps((update) => {
  const throttledUpdate = throttle(update, waitTime)

  return {
    next(nextProps) {
      throttledUpdate(nextProps)
    },
    complete() {
      throttledUpdate.cancel()
    },
  }
})

export default createHelper(throttleProps, 'throttleProps')
