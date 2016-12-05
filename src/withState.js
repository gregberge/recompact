/* eslint-disable no-use-before-define */
import createHelper from './createHelper';
import callOrUse from './utils/callOrUse';
import updateProps from './utils/updateProps';

const withState = (stateName, stateUpdaterName, initialState) =>
  updateProps((next) => {
    let previousProps;
    let previousStateValue;

    const updateState = (nextState) => {
      update(previousProps, callOrUse(nextState)(previousStateValue));
    };

    const update = (props, stateValue) => {
      next({
        ...props,
        [stateName]: stateValue,
        [stateUpdaterName]: updateState,
      });

      previousStateValue = stateValue;
      previousProps = props;
    };

    return (props) => {
      update(
        props,
        !previousProps
          ? callOrUse(initialState)(props)
          : previousStateValue,
      );
    };
  });

export default createHelper(withState, 'withState');
