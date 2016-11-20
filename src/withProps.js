import {map} from 'rxjs/operator/map';
import createHelper from './createHelper';
import withProps$ from './withProps$';
import callOrUse from './utils/callOrUse';

const withProps = propsMapper => withProps$(props$ => props$::map(callOrUse(propsMapper)));

export default createHelper(withProps, 'withProps');
