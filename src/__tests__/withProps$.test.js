import React from 'react';
import 'rxjs';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, withProps$} from '../';

describe('withProps$', () => {
  it('should passe additional props to base component', () => {
    const DoReMi = withProps$(props$ => props$.mapTo({la: 'fa'}))(Dummy);

    const dummy = shallow(<DoReMi si="do" />).find(Dummy);
    expect(dummy.prop('si')).toBe('do');
    expect(dummy.prop('la')).toBe('fa');
  });

  it('should take precedent over owner props', () => {
    const DoReMi = withProps$(props$ => props$.mapTo({si: 'do', la: 'fa'}))(Dummy);

    const dummy = shallow(<DoReMi la="ti" />).find(Dummy);
    expect(dummy.prop('si')).toBe('do');
    expect(dummy.prop('la')).toBe('fa');
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps$(props$ => props$),
      withProps$(props$ => props$),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps$(withProps$(div))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
