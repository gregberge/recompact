import {Subject} from 'rxjs/Subject';
import {concat} from 'rxjs/observable/concat';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {scan} from 'rxjs/operator/scan';
import {take} from 'rxjs/operator/take';
import createHelper from './createHelper';
import mapProps$ from './mapProps$';
import createSymbol from './utils/createSymbol';
import callOrUse from './utils/callOrUse';

export const INIT = createSymbol('INIT');

/**
 * Similar to `withState()`, but state updates are applied using a reducer function.
 * A reducer is a function that receives a state and an action, and returns a new state.
 *
 * Passes two additional props to the base component: a state value, and a
 * dispatch method. The dispatch method sends an action to the reducer, and
 * the new state is applied.
 *
 * @static
 * @category High-order-components
 * @param {String} stateName
 * @param {String} dispatchName
 * @param {Function} reducer
 * @param {*} initialState
 * @returns {HighOrderComponent} Returns a function that take a Component.
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
  mapProps$((props$) => {
    const action$ = new Subject();
    const dispatch = ::action$.next;

    const stateValue$ = concat(
      props$::take(1)::map((props) => {
        if (initialState !== undefined) {
          return callOrUse(initialState)(props);
        }

        return reducer(undefined, {type: INIT});
      }),
      action$::map(action => stateValue => reducer(stateValue, action)),
    )::scan((stateValue, fn) => fn(stateValue));

    return combineLatest(
      props$,
      stateValue$,
      (props, stateValue) => ({
        ...props,
        [stateName]: stateValue,
        [dispatchName]: dispatch,
      }),
    );
  });

export default createHelper(withReducer, 'withReducer');
