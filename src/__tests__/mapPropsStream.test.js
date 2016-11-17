import React from 'react';
import Rx from 'rxjs';
import {shallow, mount} from 'enzyme';
import {Subject} from 'rxjs/Subject';
import {combineLatest} from 'rxjs/operator/combineLatest';
import {Dummy, countRenders} from './utils';
import {compose, mapPropsStream} from '../';

describe('mapPropsStream', () => {
  it('should emit props$.next when component receive props', () => {
    const propsSpy = jest.fn();
    const Div = mapPropsStream(props$ => props$.do(propsSpy))('div');

    const wrapper = shallow(<Div className="bar" />);

    expect(propsSpy).toHaveBeenCalledTimes(1);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'bar'});

    wrapper.setProps({className: 'foo'});

    expect(propsSpy).toHaveBeenCalledTimes(2);
    expect(propsSpy).toHaveBeenLastCalledWith({className: 'foo'});
  });

  it('should take new props from props$', () => {
    const Div = mapPropsStream(
      props$ => props$.map(({strings}) => ({className: strings.join('')})),
    )('div');

    shallow(<Div strings={['a', 'b', 'c']} />);
  });

  it('props$ should throw errors', () => {
    const props$ = new Rx.BehaviorSubject({});

    const Div = mapPropsStream(() => props$.map(() => {
      throw new Error('Too bad');
    }))('div');

    expect(() => {
      shallow(<Div />);
    }).toThrow();
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      mapPropsStream(props$ => props$.mapTo({foo: 'bar'})),
      mapPropsStream(props$ => props$),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('mapPropsStream(mapPropsStream(Dummy))');
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy();
  });

  it('does not render the base component before props are emitted', () => {
    const trigger$ = new Subject();
    const EnhancedDummy = compose(
      mapPropsStream(props$ => props$::combineLatest(trigger$, props => props)),
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
