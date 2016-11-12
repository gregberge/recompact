/* eslint-disable no-console */
import {PropTypes, Component} from 'react';
import shallowEqual from 'shallowequal';
import getDisplayName from 'recompose/getDisplayName';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerFactory from 'recompose/createEagerFactory';
import createHelper from 'recompose/createHelper';

const checkObservables = (observables, displayName) => {
  if (process.env.NODE_ENV !== 'production') {
    if (observables && typeof observables !== 'object') {
      console.warn(
        'mapObs(): must return a plain object containing observables.',
        displayName,
      );
    }

    const badNamedProps = Object.keys(observables).filter(key => !key.endsWith('$'));

    if (badNamedProps.length) {
      console.warn(
        'mapObs(): must only return observables suffixed by "$".',
        displayName,
        badNamedProps,
      );
    }

    const nonObsProps = Object.values(observables).filter(obs => !obs || typeof obs.subscribe !== 'function');

    if (nonObsProps.length) {
      console.warn(
        'mapObs(): must return an hash of observables.',
        displayName,
        observables,
      );
    }
  }

  return observables;
};

export default createHelper(obsMapper => (_BaseComponent) => {
  let obsMappers = [obsMapper];
  let BaseComponent = _BaseComponent;

  if (BaseComponent.obsMappers) {
    obsMappers = [...obsMappers, ...BaseComponent.obsMappers];
    BaseComponent = BaseComponent.NextComponent;
  }

  const factory = createEagerFactory(BaseComponent);
  return class Provider extends Component {
    static contextTypes = {
      observables: PropTypes.object,
    };

    static childContextTypes = {
      observables: PropTypes.object.isRequired,
    };

    static obsMappers = obsMappers;
    static NextComponent = BaseComponent;

    props$ = new BehaviorSubject(this.props);
    state = {};

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {observables} = this.context;
      const {
        props$: childProps$ = this.props$,
        ...childObservables
      } = obsMappers
        .reduce((result, provider) =>
          checkObservables(provider(result), getDisplayName(this.constructor))
        , {
          ...observables,
          props$: this.props$,
        });

      this.subscription = childProps$.subscribe({
        next: (props) => {
          this.setState(props);
        },
        error: (error) => {
          throw error;
        },
      });

      this.childContext = {observables: childObservables};
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.state, nextState);
    }

    render() {
      return factory(this.state);
    }
  };
}, 'mapObs');
