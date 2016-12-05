/* eslint-disable no-console */
import {Component, PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerFactory from '../createEagerFactory';
import {getConfig} from '../setConfig';
import createSymbol from './createSymbol';

const throwError = (error) => {
  throw error;
};

const MAPPERS_INFO = createSymbol('mappersInfo');

const createComponentFromMappers = (mappers, childFactory) => {
  const {observablesKey: OBSERVABLES} = getConfig();
  const CONTEXT_TYPES = {[OBSERVABLES]: PropTypes.object};

  return class extends Component {
    static [MAPPERS_INFO] = {mappers, childFactory};
    static contextTypes = CONTEXT_TYPES;
    static childContextTypes = CONTEXT_TYPES;

    props$ = new BehaviorSubject(this.props);

    componentWillMount() {
      const [childProps$, childObservables] =
        mappers.reduce(
          ([props$, obs], mapper) => mapper(props$, obs),
          [this.props$, this.context[OBSERVABLES]],
        );

      this.childPropsSubscription = childProps$.subscribe({
        next: (childProps) => {
          this.setState({childProps});
        },
        error: throwError,
      });

      this.childContext = {[OBSERVABLES]: childObservables};
    }

    getChildContext() {
      return this.childContext;
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    componentWillUnmount() {
      this.childPropsSubscription.unsubscribe();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState && (
        !this.state || this.state.childProps !== nextState.childProps
      );
    }

    render() {
      if (!this.state) {
        return null;
      }

      return this.constructor[MAPPERS_INFO].childFactory(this.state.childProps);
    }
  };
};

export const isMapperComponent = BaseComponent =>
  typeof BaseComponent === 'function' && MAPPERS_INFO in BaseComponent;

export default mapper => (BaseComponent) => {
  if (isMapperComponent(BaseComponent)) {
    return createComponentFromMappers(
      [mapper, ...BaseComponent[MAPPERS_INFO].mappers],
      BaseComponent[MAPPERS_INFO].childFactory,
    );
  }

  return createComponentFromMappers(
    [mapper],
    createEagerFactory(BaseComponent),
  );
};
