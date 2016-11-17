import React from 'react';
import {shallow} from 'enzyme';
import {compose, omitProps} from '../';

describe('omitProps', () => {
  it('should take a string', () => {
    const Component = omitProps('foo')('div');

    const wrapper = shallow(<Component foo="foo" className="bar" />);
    expect(wrapper.find('div').prop('className')).toBe('bar');
    expect(wrapper.find('div').prop('foo')).toBeUndefined();
  });

  it('should take an array', () => {
    const Component = omitProps(['foo', 'bar'])('div');

    const wrapper = shallow(<Component foo="foo" bar="bar" className="bar" />);
    expect(wrapper.find('div').prop('className')).toBe('bar');
    expect(wrapper.find('div').prop('foo')).toBeUndefined();
    expect(wrapper.find('div').prop('bar')).toBeUndefined();
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      omitProps('foo'),
      omitProps('bar'),
    )('div');

    const wrapper = shallow(<Component foo="bar" bar="foo" />);
    expect(wrapper.instance().constructor.displayName).toBe('omitProps(omitProps(div))');
    expect(wrapper.equals(<div />)).toBeTruthy();
  });
});
