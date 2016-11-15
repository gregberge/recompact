import shallowEqual from 'shallowequal';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import createHelper from './createHelper';
import mapPropsStream from './mapPropsStream';

const pure = mapPropsStream(props$ => props$::distinctUntilChanged(shallowEqual));

export default createHelper(pure, 'pure', true, true);
