import React from 'react';
import Rx from 'rxjs';
import {shallow, mount} from 'enzyme';
import {Subject} from 'rxjs/Subject';
import {combineLatest} from 'rxjs/operator/combineLatest';
import {Dummy, countRenders} from './utils';
import {compose, mapProps$, setObservableConfig} from '../';
import rxjsObservableConfig from '../rxjsObservableConfig';

describe('mapProps$', () => {
  beforeEach(() => {
    setObservableConfig(rxjsObservableConfig);
  });

  afterEach(() => {
    setObservableConfig({
      toESObservable: undefined,
      fromESObservable: undefined,
    });
  });

  it('should unsubscribe props$ when unmount', () => {
    const props$ = new Rx.BehaviorSubject({});
    const propsSpy = jest.fn();
    const Div = mapProps$(() => props$.do(propsSpy))('div');
    const wrapper = shallow(<Div />);
    expect(propsSpy).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    props$.next({foo: 'bar'});
    expect(propsSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit props$.next when component receive props', () => {
    const propsSpy = jest.fn();
    const Div = mapProps$(props$ => props$.do(propsSpy))('div');

    const wrapper = shallow(<Div className="bar" />);

    expect(propsSpy).toHaveBeenCalledTimes(1);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'bar'});

    wrapper.setProps({className: 'foo'});

    expect(propsSpy).toHaveBeenCalledTimes(2);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'foo'});
  });

  it('should take new props from props$', () => {
    const Div = mapProps$(
      props$ => props$.map(({strings}) => ({className: strings.join('')})),
    )('div');

    shallow(<Div strings={['a', 'b', 'c']} />);
  });

  it('props$ should throw errors', () => {
    const props$ = new Rx.BehaviorSubject({});

    const Div = mapProps$(() => props$.map(() => {
      throw new Error('Too bad');
    }))('div');

    expect(() => {
      shallow(<Div />);
    }).toThrow();
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      mapProps$(props$ => props$.mapTo({foo: 'bar'})),
      mapProps$(props$ => props$),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('mapProps$(mapProps$(Dummy))');
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy();
  });

  it('does not render the base component before props are emitted', () => {
    const trigger$ = new Subject();
    const EnhancedDummy = compose(
      mapProps$(props$ => props$::combineLatest(trigger$, props => props)),
      countRenders,
    )(Dummy);

    const wrapper = mount(<EnhancedDummy />);
    expect(wrapper.find(Dummy).isEmpty()).toBe(true);

    wrapper.setProps({foo: 'bar'});
    expect(wrapper.find(Dummy).isEmpty()).toBe(true);

    trigger$.next(true);

    const dummy = wrapper.find(Dummy);
    expect(dummy.isEmpty()).toBe(false);
    expect(dummy.prop('renderCount')).toBe(1);
    expect(dummy.prop('foo')).toBe('bar');
  });
});
