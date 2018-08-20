import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, renameProp, pure, withProps } from '..'

describe('renameProp', () => {
  it('should rename a single prop', () => {
    const StringConcat = compose(
      withProps({ foo: 123, bar: 456 }),
      renameProp('foo', 'fi'),
    )(Dummy)

    const dummy = shallow(<StringConcat />).find(Dummy)
    expect(dummy.props()).toEqual({ fi: 123, bar: 456 })
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      renameProp('foo', 'bar'),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component foo="foo" />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'renameProp(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy bar="foo" />)).toBeTruthy()
  })
})
