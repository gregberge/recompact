import withObs from './withObs';
import createHelper from './createHelper';

const mapProps$ = mapper => withObs(({props$}) => ({props$: mapper(props$)}));

export default createHelper(mapProps$, 'mapProps$');
