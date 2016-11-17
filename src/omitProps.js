import omit from './utils/omit';
import createHelper from './createHelper';
import mapProps from './mapProps';

const omitProps = omitedProps => mapProps(props => omit(props, omitedProps));

export default createHelper(omitProps, 'omitProps');
