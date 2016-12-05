import createHelper from './createHelper';
import updateProps from './utils/updateProps';

const shouldUpdate = test => updateProps((next) => {
  let props;

  return (nextProps) => {
    if (!props || test(props, nextProps)) {
      next(nextProps);
    }

    props = nextProps;
  };
});

export default createHelper(shouldUpdate, 'shouldUpdate');
