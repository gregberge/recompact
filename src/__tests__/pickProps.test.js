import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, pickProps, pure } from '..'

describe('pickProps', () => {
  it('should take a string', () => {
    const Component = pickProps('className')('div')

    const wrapper = shallow(<Component foo="foo" className="bar" />)
    expect(wrapper.find('div').prop('className')).toBe('bar')
    expect(wrapper.find('div').prop('foo')).toBeUndefined()
  })

  it('should take an array', () => {
    const Component = pickProps(['foo', 'className'])(Dummy)

    const wrapper = shallow(<Component foo="foo" bar="bar" className="bar" />)
    expect(wrapper.find(Dummy).prop('className')).toBe('bar')
    expect(wrapper.find(Dummy).prop('foo')).toBe('foo')
    expect(wrapper.find(Dummy).prop('bar')).toBeUndefined()
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      pickProps('foo'),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component foo="bar" bar="foo" x="y" />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'pickProps(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy()
  })
})
