/* eslint-disable no-use-before-define */
import createHelper from './createHelper'
import callOrUse from './utils/callOrUse'
import updateProps from './utils/updateProps'

/**
 * Passes two additional props to the base component: a state value, and a function
 * to update that state value. The state updater has the following signature:
 *
 * ```js
 * stateUpdater<T>((prevValue: T) => T, ?callback: Function): void
 * stateUpdater(newValue: any, ?callback: Function): void
 * ```
 *
 * The first form accepts a function which maps the previous state value to a new
 * state value. You'll likely want to use this state updater along with `withHandlers()`
 * or `withProps()` to create specific updater functions. For example, to create an
 * HoC that adds basic counting functionality to a component:
 *
 * ```js
 * const addCounting = compose(
 *   withState('counter', 'setCounter', 0),
 *   withProps(({ setCounter }) => ({
 *     increment: () => setCounter(n => n + 1),
 *     decrement: () => setCounter(n => n - 1),
 *     reset: () => setCounter(0)
 *   }))
 * )
 * ```
 *
 * The second form accepts a single value, which is used as the new state.
 *
 * Both forms accept an optional second parameter, a callback function that will
 * be executed once `setState()` is completed and the component is re-rendered.
 *
 * An initial state value is required. It can be either the state value itself,
 * or a function that returns an initial state given the initial props.
 *
 * @static
 * @category Higher-order-components
 * @param {String} stateName
 * @param {String} stateUpdaterName
 * @param {Function} reducer
 * @param {*|Function} initialState
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 */
const withState = (stateName, stateUpdaterName, initialState) =>
  updateProps((next) => {
    let previousProps
    let previousStateValue

    const updateState = (nextState) => {
      update(previousProps, callOrUse(nextState)(previousStateValue))
    }

    const update = (props, stateValue) => {
      next({
        ...props,
        [stateName]: stateValue,
        [stateUpdaterName]: updateState,
      })

      previousStateValue = stateValue
      previousProps = props
    }

    return (props) => {
      update(
        props,
        !previousProps
          ? callOrUse(initialState)(props)
          : previousStateValue,
      )
    }
  })

export default createHelper(withState, 'withState')
