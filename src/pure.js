import shallowEqual from 'recompose/shallowEqual';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import createHelper from 'recompose/createHelper';
import withObs from './withObs';

const pure = withObs(({props$}) => ({props$: props$::distinctUntilChanged(shallowEqual)}));

export default createHelper(pure, 'pure', true, true);
