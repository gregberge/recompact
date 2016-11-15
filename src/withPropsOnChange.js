import pick from 'recompose/utils/pick';
import shallowEqual from 'recompose/shallowEqual';
import {map} from 'rxjs/operator/map';
import createHelper from './createHelper';
import mapPropsStream from './mapPropsStream';

const withPropsOnChange = (shouldMapOrKeys, propsMapper) => {
  const shouldMap = typeof shouldMapOrKeys === 'function'
    ? shouldMapOrKeys
    : (props, nextProps) => !shallowEqual(
        pick(props, shouldMapOrKeys),
        pick(nextProps, shouldMapOrKeys),
      );

  return mapPropsStream((props$) => {
    let props = {};
    let computedProps;
    return props$
      ::map((nextProps) => {
        if (shouldMap(props, nextProps)) {
          computedProps = propsMapper(nextProps);
        }

        props = nextProps;
        return {...nextProps, ...computedProps};
      });
  });
};

export default createHelper(withPropsOnChange, 'withPropsOnChange');
