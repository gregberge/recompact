import {map} from 'rxjs/operator/map';
import createHelper from './createHelper';
import withPropsStream from './withPropsStream';
import wrap from './utils/wrap';

const withProps = propsMapper => withPropsStream(props$ => props$::map(wrap(propsMapper)));

export default createHelper(withProps, 'withProps');
