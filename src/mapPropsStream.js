import withObs from './withObs';
import createHelper from './createHelper';

const mapPropsStream = mapper => withObs(({props$}) => ({props$: mapper(props$)}));

export default createHelper(mapPropsStream, 'mapPropsStream');
