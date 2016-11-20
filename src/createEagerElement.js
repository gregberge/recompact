import createEagerElementUtil from './utils/createEagerElementUtil';
import isReferentiallyTransparentFunctionComponent
  from './isReferentiallyTransparentFunctionComponent';

const createEagerElement = (type, props, children) => {
  const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(type);
  const hasKey = props && Object.prototype.hasOwnProperty.call(props, 'key');
  return createEagerElementUtil(
    hasKey,
    isReferentiallyTransparent,
    type,
    props,
    children,
  );
};

export default createEagerElement;
