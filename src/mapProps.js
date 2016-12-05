import createHelper from './createHelper';
import createEagerFactory from './createEagerFactory';
import {isMapperComponent} from './utils/createHOCFromMapper';
import updateProps from './utils/updateProps';

const mapProps = propsMapper => (BaseComponent) => {
  if (isMapperComponent(BaseComponent)) {
    return updateProps(next => (props) => {
      next(propsMapper(props));
    })(BaseComponent);
  }

  const factory = createEagerFactory(BaseComponent);
  return props => factory(propsMapper(props));
};

export default createHelper(mapProps, 'mapProps');
