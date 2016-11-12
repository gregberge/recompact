import React from 'react';
import {mount} from 'enzyme';
import flattenProp from 'recompose/flattenProp';
import withState from 'recompose/withState';
import {Dummy} from './utils';
import {withPropsOnChange, compose} from '../';

test('withPropsOnChange maps subset of owner props to child props', () => {
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
