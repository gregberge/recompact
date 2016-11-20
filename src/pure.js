import shallowEqual from 'shallowequal';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import createHelper from './createHelper';
import mapProps$ from './mapProps$';

const pure = mapProps$(props$ => props$::distinctUntilChanged(shallowEqual));

export default createHelper(pure, 'pure', true, true);
