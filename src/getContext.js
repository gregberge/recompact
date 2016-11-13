import {combineLatest} from 'rxjs/observable/combineLatest';
import createHelper from './createHelper';
import withObs from './withObs';

const getContext = contextTypes => withObs(({context$, props$}) => ({
  props$: combineLatest(
    context$,
    props$,
    (context, props) => ({...props, ...context}),
  ),
}), {contextTypes});

export default createHelper(getContext, 'getContext');
