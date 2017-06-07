/* eslint-disable no-use-before-define */
import createHelper from './createHelper'
import createSymbol from './utils/createSymbol'
import callOrUse from './utils/callOrUse'
import updateProps from './utils/updateProps'

export const INIT = createSymbol('INIT')

/**
 * Similar to `withState()`, but state updates are applied using a reducer function.
 * A reducer is a function that receives a state and an action, and returns a new state.
 *
 * Passes two additional props to the base component: a state value, and a
 * dispatch method. The dispatch method sends an action to the reducer, and
 * the new state is applied.
 *
 * @static
 * @category Higher-order-components
 * @param {String} stateName
 * @param {String} dispatchName
 * @param {Function} reducer
 * @param {*} initialState
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * const counterReducer = (count, action) => {
 *   switch (action.type) {
 *   case INCREMENT:
 *     return count + 1
 *   case DECREMENT:
 *     return count - 1
 *   default:
 *     return count
 *   }
 * }
 *
 * const enhance = withReducer('counter', 'dispatch', counterReducer, 0)
 * const Counter = enhance(({ counter, dispatch }) =>
 *   <div>
 *     Count: {counter}
 *     <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
 *     <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
 *   </div>
 * )
 */
const withReducer = (stateName, dispatchName, reducer, initialState) =>
  updateProps(next => {
    let initialized
    let state
    let props

    function dispatch(action) {
      updateState(reducer(state, action))
    }

    function updateState(nextState) {
      state = nextState
      next({
        ...props,
        [stateName]: state,
        [dispatchName]: dispatch,
      })
    }

    return nextProps => {
      props = nextProps

      if (!initialized) {
        initialized = true

        if (initialState !== undefined) {
          updateState(callOrUse(initialState, props))
        } else {
          updateState(reducer(undefined, { type: INIT }))
        }
      } else {
        updateState(state)
      }
    }
  })

export default createHelper(withReducer, 'withReducer')
