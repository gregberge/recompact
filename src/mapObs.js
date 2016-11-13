/* eslint-disable no-console */
import {PropTypes, Component} from 'react';
import shallowEqual from 'recompose/shallowEqual';
import getDisplayName from 'recompose/getDisplayName';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {of} from 'rxjs/observable/of';
import createEagerFactory from 'recompose/createEagerFactory';
import createHelper from './createHelper';

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

export default createHelper((obsMapper, options = {}) => (_BaseComponent) => {
  let obsMappers = [obsMapper];
  let BaseComponent = _BaseComponent;
  let contextTypes = {...options.contextTypes, observables: PropTypes.object};
  let childContextTypes = {...options.childContextTypes, observables: PropTypes.object};

  if (BaseComponent.obsMappers) {
    obsMappers = [...obsMappers, ...BaseComponent.obsMappers];

    contextTypes = Object.entries(BaseComponent.contextTypes).reduce((acc, [key, value]) => {
      if (childContextTypes[key]) {
        return acc;
      }

      return {...acc, [key]: value};
    }, contextTypes);

    childContextTypes = {...childContextTypes, ...BaseComponent.childContextTypes};
    BaseComponent = BaseComponent.NextComponent;
  }

  const factory = createEagerFactory(BaseComponent);
  return class Provider extends Component {
    static contextTypes = contextTypes;
    static childContextTypes = childContextTypes;
    static obsMappers = obsMappers;
    static NextComponent = BaseComponent;

    context$ = of(this.context);
    props$ = new BehaviorSubject(this.props);
    state = {props: {}};

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {observables} = this.context;
      const {
        context$: nextContext$,
        props$: nextProps$,
        ...childObservables
      } = obsMappers
        .reduce((result, provider) => ({
          context$: result.context$ || this.context$,
          props$: result.props$ || this.props$,
          ...checkObservables(provider(result), getDisplayName(this.constructor)),
        }), {
          ...observables,
          context$: this.context$,
          props$: this.props$,
        });

      this.propsSubscription = nextProps$.subscribe({
        next: (props) => {
          this.setState({props});
        },
        error: (error) => {
          throw error;
        },
      });

      this.childContext = {observables: childObservables};

      if (nextContext$ !== this.context$) {
        this.contextSubscription = nextContext$.subscribe({
          next: (context) => {
            this.childContext = {
              ...context,
              observables: childObservables,
            };
          },
          error: (error) => {
            throw error;
          },
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    componentWillUnmount() {
      this.propsSubscription.unsubscribe();

      if (this.contextSubscription) {
        this.contextSubscription.unsubscribe();
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.state.props, nextState.props);
    }

    render() {
      return factory(this.state.props);
    }
  };
}, 'mapObs');
