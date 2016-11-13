import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';

const branch = (test, left, right) => (BaseComponent) => {
  let leftFactory;
  let rightFactory;

  return (props) => {
    if (test(props)) {
      leftFactory = leftFactory || createEagerFactory(left(BaseComponent));
      return leftFactory(props);
    }

    rightFactory = rightFactory || createEagerFactory(right(BaseComponent));
    return rightFactory(props);
  };
};

export default createHelper(branch, 'branch');
