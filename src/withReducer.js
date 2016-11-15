import {Subject} from 'rxjs/Subject';
import {concat} from 'rxjs/observable/concat';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {scan} from 'rxjs/operator/scan';
import {take} from 'rxjs/operator/take';
import createHelper from './createHelper';
import mapPropsStream from './mapPropsStream';
import createSymbol from './utils/createSymbol';
import callOrUse from './utils/callOrUse';

const INIT = createSymbol('INIT');

const withReducer = (stateName, dispatchName, reducer, initialState) =>
  mapPropsStream((props$) => {
    const action$ = new Subject();
    const dispatch = ::action$.next;

    const stateValue$ = concat(
      props$::take(1)::map((props) => {
        if (initialState !== undefined) {
          return callOrUse(initialState, props);
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
