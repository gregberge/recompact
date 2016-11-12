import React from 'react';
import compose from 'recompose/compose';
import {shallow} from 'enzyme';
import mapProps from '../mapProps';

describe('mapProps', () => {
  it('should maps owner props to child props', () => {
    const Component = mapProps(({strings}) => ({className: strings.join('')}))('div');

    const wrapper = shallow(<Component strings={['a', 'b', 'c']} />);
    expect(wrapper.find('div').prop('className')).toBe('abc');
  });

  it('should merge hoc', () => {
    const Component = compose(
      mapProps(() => ({})),
      mapProps(() => ({})),
      mapProps(() => ({})),
    )('div');

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('mapProps(mapProps(mapProps(div)))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
