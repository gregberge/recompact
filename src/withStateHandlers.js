import createHelper from './createHelper'
import callOrUse from './utils/callOrUse'
import updateProps from './utils/updateProps'
import mapValues from './utils/mapValues'

/**
 * Passes state object properties and immutable updater functions in a form of
 * `(...payload: any[]) => Object` to the base component.
 *
 * Every state updater function accepts state, props and payload and must return
 * a new state or undefined. The new state is shallowly merged with the previous
 * state.
 *
 * @static
 * @category Higher-order-components
 * @param {Object|Function} initialState
 * @param {Object} stateUpdaters
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const Counter = withStateHandlers(
 *   ({ initialCounter = 0 }) => ({
 *     counter: initialCounter,
 *   }),
 *   {
 *     incrementOn: ({ counter }) => (value) => ({
 *       counter: counter + value,
 *     }),
 *     decrementOn: ({ counter }) => (value) => ({
 *       counter: counter - value,
 *     }),
 *     resetCounter: (_, { initialCounter = 0 }) => () => ({
 *       counter: initialCounter,
 *     }),
 *   }
 * )(
 *   ({ counter, incrementOn, decrementOn, resetCounter }) =>
 *     <div>
 *       <Button onClick={() => incrementOn(2)}>Inc</Button>
 *       <Button onClick={() => decrementOn(3)}>Dec</Button>
 *       <Button onClick={resetCounter}>Reset</Button>
 *     </div>
 * )
 */
const withStateHandlers = (initialState, stateUpdaters) =>
  updateProps(next => {
    let props
    let state

    const handlers = mapValues(stateUpdaters, handler => (...args) => {
      const updatedState = handler(state, props)(...args)
      if (!updatedState) return

      state = { ...state, ...updatedState }
      next({ ...props, ...state, ...handlers })
    })

    return nextProps => {
      if (!props) state = callOrUse(initialState, nextProps)
      props = nextProps
      next({ ...props, ...state, ...handlers })
    }
  })

export default createHelper(withStateHandlers, 'withStateHandlers')
