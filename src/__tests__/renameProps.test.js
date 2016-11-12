import React from 'react';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {withProps, renameProps, compose} from '../';

describe('renameProps', () => {
  it('should rename props', () => {
    const StringConcat = compose(
      withProps({si: 123, la: 456}),
      renameProps({si: 'do', la: 'fa'}),
    )(Dummy);

    const dummy = shallow(<StringConcat />).find(Dummy);
    expect(dummy.prop('do')).toBe(123);
    expect(dummy.prop('fa')).toBe(456);
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({foo: 'bar'}),
      renameProps({foo: 'className'}),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(renameProps(div))');
    expect(wrapper.equals(<div className="bar" />)).toBeTruthy();
  });
});
