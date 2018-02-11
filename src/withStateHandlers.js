import createHelper from './createHelper'
import callOrUse from './utils/callOrUse'
import updateProps from './utils/updateProps'
import mapValues from './utils/mapValues'

const withStateHandlers = (initialState, stateUpdaters) =>
  updateProps(next => {
    let props
    let state

    const handlers = mapValues(stateUpdaters, handler => (...args) => {
      state = { ...state, ...handler(state, props)(...args) }
      next({
        ...props,
        ...state,
        ...handlers,
      })
    })

    return nextProps => {
      if (!props) state = callOrUse(initialState, nextProps)
      props = nextProps
      next({
        ...props,
        ...state,
        ...handlers,
      })
    }
  })

export default createHelper(withStateHandlers, 'withStateHandlers')
