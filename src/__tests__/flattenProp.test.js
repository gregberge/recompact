import React from 'react';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, flattenProp, withProps} from '../';

describe('flattenProp', () => {
  it('should flatten an object prop and spreads it into the top-level props object', () => {
    const Counter = flattenProp('state')(Dummy);

    const wrapper = shallow(
      <Counter pass="through" state={{counter: 1}} />,
    );

    expect(wrapper.equals(
      <Dummy pass="through" state={{counter: 1}} counter={1} />,
    )).toBeTruthy();

    wrapper.setProps({
      pass: 'through',
      state: {state: 1},
    });

    expect(wrapper.equals(
      <Dummy pass="through" state={1} />,
    )).toBeTruthy();
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({foo: {foo: 'y'}}),
      flattenProp('foo'),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(flattenProp(Dummy))');
    expect(wrapper.equals(<Dummy foo="y" />)).toBeTruthy();
  });
});
