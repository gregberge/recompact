import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, renameProps, pure, withProps } from '..'

describe('renameProps', () => {
  it('should rename props', () => {
    const StringConcat = compose(
      withProps({ si: 123, la: 456 }),
      renameProps({ si: 'do', la: 'fa' }),
    )(Dummy)

    const dummy = shallow(<StringConcat />).find(Dummy)
    expect(dummy.prop('do')).toBe(123)
    expect(dummy.prop('fa')).toBe(456)
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      renameProps({ foo: 'bar' }),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component foo="bar" />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'renameProps(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy bar="bar" />)).toBeTruthy()
  })
})
