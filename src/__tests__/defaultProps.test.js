import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, defaultProps, pure } from '..'

describe('defaultProps', () => {
  it('should pass additional props to base component', () => {
    const DoReMi = defaultProps({ si: 'do', la: 'fa' })(Dummy)

    const dummy = shallow(<DoReMi />).find(Dummy)
    expect(dummy.props()).toEqual({ si: 'do', la: 'fa' })
  })

  it('should have lower precendence than props from owner', () => {
    const DoReMi = defaultProps({ si: 'do', la: 'fa' })(Dummy)
    const dummy = shallow(<DoReMi la="ti" />).find(Dummy)
    expect(dummy.props()).toEqual({ si: 'do', la: 'ti' })
  })

  it('should override undefined owner props', () => {
    const DoReMi = defaultProps({ si: 'do', la: 'fa' })(Dummy)
    const dummy = shallow(<DoReMi la={undefined} />).find(Dummy)
    expect(dummy.props()).toEqual({ si: 'do', la: 'fa' })
  })

  it('defaultProps passes additional props to base component', () => {
    const DoReMi = defaultProps({ si: 'do', la: 'fa' })(Dummy)

    const dummy = shallow(<DoReMi />).find(Dummy)
    expect(dummy.props()).toEqual({ si: 'do', la: 'fa' })
  })

  it('defaultProps has lower precendence than props from owner', () => {
    const DoReMi = defaultProps({ si: 'do', la: 'fa' })(Dummy)
    const dummy = shallow(<DoReMi la="ti" />).find(Dummy)
    expect(dummy.props()).toEqual({ si: 'do', la: 'ti' })
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      defaultProps({ bar: 'xi' }),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'defaultProps(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy bar="xi" />)).toBeTruthy()
  })
})
