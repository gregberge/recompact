import React from 'react';
import {mount, shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, withProps, withState} from '../';

describe('withState', () => {
  it('adds a stateful value and a function for updating it', () => {
    const Counter = withState('counter', 'updateCounter', 0)(Dummy);

    const dummy = mount(<Counter pass="through" />).find(Dummy);
    const {updateCounter} = dummy.props();

    expect(dummy.prop('counter')).toBe(0);
    expect(dummy.prop('pass')).toBe('through');

    updateCounter(n => n + 9);
    updateCounter(n => n * 2);
    expect(dummy.prop('counter')).toBe(18);
    expect(dummy.prop('pass')).toBe('through');
  });

  it('also accepts a non-function, which is passed directly to setState()', () => {
    const Counter = withState('counter', 'updateCounter', 0)(Dummy);
    const dummy = mount(<Counter />).find(Dummy);
    const {updateCounter} = dummy.props();

    updateCounter(18);
    expect(dummy.prop('counter')).toBe(18);
  });

  it('also accepts initialState as function of props', () => {
    const Counter = withState(
      'counter',
      'updateCounter',
      props => props.initialCounter,
    )(Dummy);

    const dummy = mount(<Counter initialCounter={1} />).find(Dummy);
    const {updateCounter} = dummy.props();

    expect(dummy.prop('counter')).toBe(1);
    updateCounter(n => n * 3);
    expect(dummy.prop('counter')).toBe(3);
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({initialCounter: 1}),
      withState(
        'counter',
        'updateCounter',
        props => props.initialCounter,
      ),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(withState(Dummy))');
    expect(wrapper.prop('counter')).toBe(1);
    expect(wrapper.prop('initialCounter')).toBe(1);
  });
});
