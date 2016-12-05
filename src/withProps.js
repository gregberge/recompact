import createHelper from './createHelper';
import callOrUse from './utils/callOrUse';
import createEagerFactory from './createEagerFactory';
import {isMapperComponent} from './utils/createHOCFromMapper';
import updateProps from './utils/updateProps';

const withProps = propsMapper => (BaseComponent) => {
  const propsOrMapper = callOrUse(propsMapper);

  if (isMapperComponent(BaseComponent)) {
    return updateProps(next => (props) => {
      next({...props, ...propsOrMapper(props)});
    })(BaseComponent);
  }

  const factory = createEagerFactory(BaseComponent);
  return props => factory({...props, ...propsOrMapper(props)});
};

export default createHelper(withProps, 'withProps');
