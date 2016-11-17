import pick from './utils/pick';
import createHelper from './createHelper';
import mapProps from './mapProps';

const pickProps = pickedProps => mapProps(props => pick(props, pickedProps));

export default createHelper(pickProps, 'pickProps');
