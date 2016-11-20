/* eslint-disable no-console */
import {Component, PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerFactory from '../createEagerFactory';
import createSymbol from './createSymbol';

const checkObservables = (observables) => {
  if (process.env.NODE_ENV !== 'production') {
    if ('props$' in observables) {
      throw new Error('"props$" is a reserved named for observables.');
    }
  }

  return observables;
};

const throwError = (error) => {
  throw error;
};

const MAPPERS_INFO = createSymbol('mappersInfo');
const OBSERVABLES = createSymbol('observables');
const CONTEXT_TYPES = {[OBSERVABLES]: PropTypes.object};

const createComponentFromMappers = (mappers, childFactory) =>
  class extends Component {
    static [MAPPERS_INFO] = {mappers, childFactory};
    static contextTypes = CONTEXT_TYPES;
    static childContextTypes = CONTEXT_TYPES;

    props$ = new BehaviorSubject(this.props);

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const [childProps$, childObservables] =
        mappers.reduce(
          ([props$, obs], mapper) => checkObservables(mapper(props$, obs)),
          [this.props$, this.context[OBSERVABLES]],
        );

      this.childPropsSubscription = childProps$.subscribe({
        next: childProps => this.setState({childProps}),
        error: throwError,
      });

      this.childContext = {[OBSERVABLES]: childObservables};
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

export default mapper => (BaseComponent) => {
  if (BaseComponent[MAPPERS_INFO]) {
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
