import {Subject} from 'rxjs/Subject';
import {concat} from 'rxjs/observable/concat';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {scan} from 'rxjs/operator/scan';
import {take} from 'rxjs/operator/take';
import createHelper from './createHelper';
import mapPropsStream from './mapPropsStream';
import callOrUse from './utils/callOrUse';

const withState = (stateName, stateUpdaterName, initialState) =>
  mapPropsStream((props$) => {
    const update$ = new Subject();
    const updateState = ::update$.next;

    const stateValue$ = concat(
      props$::take(1)::map(props => callOrUse(initialState, props)),
      update$,
    )::scan((stateValue, update) => callOrUse(update, stateValue));

    return combineLatest(
      props$,
      stateValue$,
      (props, stateValue) => ({
        ...props,
        [stateName]: stateValue,
        [stateUpdaterName]: updateState,
      }),
    );
  });

export default createHelper(withState, 'withState');
