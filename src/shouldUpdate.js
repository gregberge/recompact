import {filter} from 'rxjs/operator/filter';
import createHelper from './createHelper';
import withObs from './withObs';

const shouldUpdate = test => withObs(({props$}) => {
  let props;
  return {
    props$: props$::filter((nextProps) => {
      if (!props) {
        return true;
      }
      const t = test(props, nextProps);
      props = nextProps;
      return t;
    }),
  };
});

export default createHelper(shouldUpdate, 'shouldUpdate');
