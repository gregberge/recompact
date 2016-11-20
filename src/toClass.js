import React, {Component} from 'react';
import getDisplayName from './getDisplayName';
import isClassComponent from './isClassComponent';

const toClass = (BaseComponent) => {
  if (isClassComponent(BaseComponent)) {
    return BaseComponent;
  }

  class ToClass extends Component {
    render() {
      if (typeof BaseComponent === 'string') {
        return <BaseComponent {...this.props} />;
      }

      return BaseComponent(this.props, this.context);
    }
  }

  ToClass.displayName = getDisplayName(BaseComponent);
  ToClass.propTypes = BaseComponent.propTypes;
  ToClass.contextTypes = BaseComponent.contextTypes;
  ToClass.defaultProps = BaseComponent.defaultProps;

  return ToClass;
};

export default toClass;
