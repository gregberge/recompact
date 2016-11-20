import {filter} from 'rxjs/operator/filter';
import createHelper from './createHelper';
import mapProps$ from './mapProps$';

const shouldUpdate = test => mapProps$((props$) => {
  let props;

  return props$::filter((nextProps) => {
    if (!props) {
      props = nextProps;
      return true;
    }

    const t = test(props, nextProps);
    props = nextProps;
    return t;
  });
});

export default createHelper(shouldUpdate, 'shouldUpdate');
