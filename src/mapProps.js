import {map} from 'rxjs/operator/map';
import createHelper from './createHelper';
import mapProps$ from './mapProps$';

const mapProps = propsMapper => mapProps$(props$ => props$::map(propsMapper));

export default createHelper(mapProps, 'mapProps');
