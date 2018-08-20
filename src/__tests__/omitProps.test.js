import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, omitProps, pure } from '..'

describe('omitProps', () => {
  it('should take a string', () => {
    const Component = omitProps('foo')(Dummy)

    const wrapper = shallow(<Component foo="foo" className="bar" />)
    expect(wrapper.find(Dummy).prop('className')).toBe('bar')
    expect(wrapper.find(Dummy).prop('foo')).toBeUndefined()
  })

  it('should take an array', () => {
    const Component = omitProps(['foo', 'bar'])(Dummy)

    const wrapper = shallow(<Component foo="foo" bar="bar" className="bar" />)
    expect(wrapper.find(Dummy).prop('className')).toBe('bar')
    expect(wrapper.find(Dummy).prop('foo')).toBeUndefined()
    expect(wrapper.find(Dummy).prop('bar')).toBeUndefined()
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      omitProps('foo'),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'omitProps(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy />)).toBeTruthy()
  })
})
