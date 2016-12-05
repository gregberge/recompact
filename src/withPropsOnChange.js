import pick from './utils/pick';
import shallowEqual from './shallowEqual';
import createHelper from './createHelper';
import updateProps from './utils/updateProps';

const withPropsOnChange = (shouldMapOrKeys, propsMapper) => {
  const shouldMap = typeof shouldMapOrKeys === 'function'
    ? shouldMapOrKeys
    : (props, nextProps) => !shallowEqual(
        pick(props, shouldMapOrKeys),
        pick(nextProps, shouldMapOrKeys),
      );

  return updateProps((next) => {
    let props = {};
    let computedProps;

    return (nextProps) => {
      if (shouldMap(props, nextProps)) {
        computedProps = propsMapper(nextProps);
      }

      props = nextProps;
      next({...nextProps, ...computedProps});
    };
  });
};

export default createHelper(withPropsOnChange, 'withPropsOnChange');
