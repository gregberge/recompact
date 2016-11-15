import {map} from 'rxjs/operator/map';
import createHelper from './createHelper';
import mapPropsStream from './mapPropsStream';

const mapProps = propsMapper => mapPropsStream(props$ => props$::map(propsMapper));

export default createHelper(mapProps, 'mapProps');
