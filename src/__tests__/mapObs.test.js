import React, {Component, PropTypes} from 'react';
import Rx from 'rxjs';
import {mount, shallow} from 'enzyme';
import {compose, mapObs} from '../';

describe('mapObs', () => {
  it('should emit props$.next when component receive props', () => {
    const propsSpy = jest.fn();
    const Div = mapObs(({props$}) => ({props$: props$.do(propsSpy)}))('div');

    const wrapper = shallow(<Div className="bar" />);

    expect(propsSpy).toHaveBeenCalledTimes(1);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'bar'});

    wrapper.setProps({className: 'foo'});

    expect(propsSpy).toHaveBeenCalledTimes(2);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'foo'});
  });

  it('should take new props from props$', () => {
    const Div = mapObs(
      ({props$}) => ({props$: props$.map(({strings}) => ({className: strings.join('')}))}),
    )('div');

    shallow(<Div strings={['a', 'b', 'c']} />);
  });

  it('should unsubscribe props$ when unmount', () => {
    const props$ = new Rx.BehaviorSubject({});
    const propsSpy = jest.fn();
    const Div = mapObs(() => ({props$: props$.do(propsSpy)}))('div');
    const wrapper = shallow(<Div />);
    expect(propsSpy).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    props$.next({foo: 'bar'});
    expect(propsSpy).toHaveBeenCalledTimes(1);
  });

  it('props$ should throw errors', () => {
    const props$ = new Rx.BehaviorSubject({});

    const Div = mapObs(() => ({props$: props$.map(() => {
      throw new Error('Too bad');
    })}))('div');

    expect(() => {
      shallow(<Div />);
    }).toThrow();
  });

  it('should provide observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Div = compose(
      mapObs(() => ({foo$: baseFoo$})),
      mapObs(({foo$}) => ({props$: foo$})),
    )('div');

    const wrapper = mount(<Div />);
    expect(wrapper.find('div').prop('className')).toBe('foo');
  });

  it('should not merge observables', () => {
    const baseFoo$ = Rx.Observable.of({className: 'foo'});
    const Div = compose(
      mapObs(() => ({foo$: baseFoo$})),
      mapObs(() => ({})),
      mapObs(({foo$}) => {
        expect(foo$).toBe(undefined);
        return {};
      }),
    )('div');

    mount(<Div />);
  });

  it('should inject context into context$', () => {
    const contextSpy = jest.fn();
    const foo$ = Rx.Observable.of('foo');
    const Div = compose(
      BaseComponent => (
        class extends Component {
          static childContextTypes = {
            foo: PropTypes.string.isRequired,
          };

          getChildContext() {
            return {foo: 'bar'};
          }

          render() {
            return <BaseComponent {...this.props} />;
          }
        }
      ),
      mapObs(() => ({foo$})),
      mapObs(
        ({context$}) => {
          context$.subscribe(contextSpy);
          return {};
        },
        {contextTypes: {foo: PropTypes.string.isRequired}},
      ),
    )('div');

    mount(<Div className="bar" />);

    expect(contextSpy).toHaveBeenCalledTimes(1);
    expect(contextSpy.mock.calls[0][0].foo).toBe('bar');
  });

  it('should provide context with context$', () => {
    const contextSpy = jest.fn();
    const Div = compose(
      mapObs(
        () => ({context$: Rx.Observable.of({foo: 'bar'})}),
        {childContextTypes: {foo: PropTypes.string.isRequired}},
      ),
      (BaseComponent) => {
        const ContextSpy = (props, context) => {
          contextSpy(context);
          return <BaseComponent {...props} />;
        };

        ContextSpy.contextTypes = {
          foo: PropTypes.string.isRequired,
        };

        return ContextSpy;
      },
    )('div');

    mount(<Div className="bar" />);

    expect(contextSpy).toHaveBeenCalledTimes(1);
    expect(contextSpy.mock.calls[0][0].foo).toBe('bar');
  });

  it('should be merged with other hoc', () => {
    const Div = compose(
      mapObs(() => ({})),
      mapObs(() => ({})),
      mapObs(() => ({})),
    )('div');

    const wrapper = shallow(<Div />);
    expect(wrapper.instance().constructor.displayName).toBe('mapObs(mapObs(mapObs(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
