// import withContext from 'recompose/withContext';
//
// export default withContext;

import createHelper from './createHelper';
import {combineLatest} from 'rxjs/observable/combineLatest';
import withObs from './withObs';

const withContext = (childContextTypes, getChildContext) => withObs(({context$, props$}) => ({
  context$: combineLatest(
    context$,
    props$,
    (context, props) => ({...context, ...getChildContext(props)}),
  ),
}), {childContextTypes});

export default createHelper(withContext, 'withContext');
