import React from 'react';
import toClass from 'recompose/toClass';
import compose from 'recompose/compose';
import {shallow} from 'enzyme';
import withProps from '../withProps';

const Dummy = toClass(() => <div />);
Dummy.displayName = 'Dummy';

describe('withProps', () => {
  it('should passes additional props to base component', () => {
    const DoReMi = withProps({si: 'do', la: 'fa'})(Dummy);
    expect(DoReMi.displayName).toBe('withProps(Dummy)');

    const dummy = shallow(<DoReMi />).find(Dummy);
    expect(dummy.prop('si')).toBe('do');
    expect(dummy.prop('la')).toBe('fa');
  });

  it('should takes precedent over owner props', () => {
    const DoReMi = withProps({si: 'do', la: 'fa'})(Dummy);

    const dummy = shallow(<DoReMi la="ti" />).find(Dummy);
    expect(dummy.prop('si')).toBe('do');
    expect(dummy.prop('la')).toBe('fa');
  });

  it('should accept function', () => {
    const DoReMi = withProps(({la}) => ({
      si: la,
    }))(Dummy);

    const dummy = shallow(<DoReMi la="la" />).find(Dummy);
    expect(dummy.prop('si')).toBe('la');
  });

  it('should merge hoc', () => {
    const Component = compose(
      withProps({}),
      withProps({}),
      withProps({}),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(withProps(withProps(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
