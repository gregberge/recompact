import React from 'react';
import {mount, shallow} from 'enzyme';
import {Dummy} from './utils';
import {compose, flattenProp, withProps, withPropsOnChange, withState} from '../';

describe('withPropsOnChange', () => {
  it('should map subset of owner props to child props', () => {
    const mapSpy = jest.fn();
    const StringConcat = compose(
      withState('strings', 'updateStrings', {a: 'a', b: 'b', c: 'c'}),
      flattenProp('strings'),
      withPropsOnChange(
        ['a', 'b'],
        ({a, b, ...props}) => {
          mapSpy();
          return {
            ...props,
            foobar: a + b,
          };
        },
      ),
    )(Dummy);

    const dummy = mount(<StringConcat />).find(Dummy);
    const {updateStrings} = dummy.props();

    expect(dummy.prop('foobar')).toBe('ab');
    expect(mapSpy).toHaveBeenCalledTimes(1);

    // Does not re-map for non-dependent prop updates
    updateStrings(strings => ({...strings, c: 'baz'}));
    expect(dummy.prop('foobar')).toBe('ab');
    expect(dummy.prop('c')).toBe('c');
    expect(mapSpy).toHaveBeenCalledTimes(1);

    updateStrings(strings => ({...strings, a: 'foo', b: 'bar'}));
    expect(dummy.prop('foobar')).toBe('foobar');
    expect(dummy.prop('c')).toBe('baz');
    expect(mapSpy).toHaveBeenCalledTimes(2);
  });

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({foo: 'bar'}),
      withPropsOnChange(['foo'], ({foo}) => ({bar: foo})),
    )(Dummy);

    const wrapper = shallow(<Component />);
    expect(wrapper.instance().constructor.displayName).toBe('withProps(withPropsOnChange(Dummy))');
    expect(wrapper.equals(<Dummy foo="bar" bar="bar" />)).toBeTruthy();
  });
});
