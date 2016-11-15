import {filter} from 'rxjs/operator/filter';
import createHelper from './createHelper';
import mapPropsStream from './mapPropsStream';

const shouldUpdate = test => mapPropsStream((props$) => {
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
