import React from 'react';
import {mount, shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, onlyUpdateForKeys, withProps, withState} from '../';

describe('onlyUpdateForKeys', () => {
  it('implements shouldComponentUpdate()', () => {
    const Counter = compose(
      withState('counter', 'updateCounter', 0),
      withState('foobar', 'updateFoobar', 'foobar'),
      onlyUpdateForKeys(['counter']),
    )(Dummy);

    const dummy = mount(<Counter />).find(Dummy);
    const {updateCounter, updateFoobar} = dummy.props();

    expect(dummy.prop('counter')).toBe(0);
    expect(dummy.prop('foobar')).toBe('foobar');

    // Does not update
    updateFoobar('barbaz');
    expect(dummy.prop('counter')).toBe(0);
    expect(dummy.prop('foobar')).toBe('foobar');

    updateCounter(42);
    expect(dummy.prop('counter')).toBe(42);
    expect(dummy.prop('foobar')).toBe('barbaz');
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({foo: 'bar'}),
      onlyUpdateForKeys(['foo']),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(onlyUpdateForKeys(Dummy))');
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy();
  });
});
