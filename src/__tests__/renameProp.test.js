import React from 'react';
import {shallow} from 'enzyme';
import {Dummy} from './utils';
import {withProps, renameProp, compose} from '../';

describe('renameProp', () => {
  it('should rename a single prop', () => {
    const StringConcat = compose(
      withProps({foo: 123, bar: 456}),
      renameProp('foo', 'fi'),
    )(Dummy);

    const dummy = shallow(<StringConcat />).find(Dummy);
    expect(dummy.props()).toEqual({fi: 123, bar: 456});
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({foo: 'bar'}),
      renameProp('foo', 'className'),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(renameProp(div))');
    expect(wrapper.equals(<div className="bar" />)).toBeTruthy();
  });
});
