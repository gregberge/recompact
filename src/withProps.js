import {map} from 'rxjs/operator/map';
import createHelper from './createHelper';
import withProps$ from './withProps$';
import wrap from './utils/wrap';

const withProps = propsMapper => withProps$(props$ => props$::map(wrap(propsMapper)));

export default createHelper(withProps, 'withProps');
