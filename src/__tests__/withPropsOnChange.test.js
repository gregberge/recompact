import React from 'react'
import { mount, shallow } from 'enzyme'
import { Dummy } from './utils'
import {
  compose,
  flattenProp,
  withProps,
  withPropsOnChange,
  withState,
} from '..'

describe('withPropsOnChange', () => {
  it('should map subset of owner props to child props', () => {
    const mapSpy = jest.fn()
    const StringConcat = compose(
      withState('strings', 'updateStrings', { a: 'a', b: 'b', c: 'c' }),
      flattenProp('strings'),
      withPropsOnChange(['a', 'b'], ({ a, b, ...props }) => {
        mapSpy()
        return {
          ...props,
          foobar: a + b,
        }
      }),
    )(Dummy)

    const wrapper = mount(<StringConcat />)
    const { updateStrings } = wrapper.find(Dummy).props()

    expect(wrapper.find(Dummy).prop('foobar')).toBe('ab')
    expect(mapSpy).toHaveBeenCalledTimes(1)

    // Does not re-map for non-dependent prop updates
    updateStrings(strings => ({ ...strings, c: 'baz' }))
    wrapper.update()
    expect(wrapper.find(Dummy).prop('foobar')).toBe('ab')
    expect(wrapper.find(Dummy).prop('c')).toBe('c')
    expect(mapSpy).toHaveBeenCalledTimes(1)

    updateStrings(strings => ({ ...strings, a: 'foo', b: 'bar' }))
    wrapper.update()
    expect(wrapper.find(Dummy).prop('foobar')).toBe('foobar')
    expect(wrapper.find(Dummy).prop('c')).toBe('baz')
    expect(mapSpy).toHaveBeenCalledTimes(2)
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({ foo: 'bar' }),
      withPropsOnChange(['foo'], ({ foo }) => ({ bar: foo })),
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'withProps(withPropsOnChange(Dummy))',
    )
    expect(wrapper.equals(<Dummy foo="bar" bar="bar" />)).toBeTruthy()
  })
})
