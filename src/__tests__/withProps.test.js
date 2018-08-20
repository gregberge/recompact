import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, pure, withProps, hoistStatics } from '..'

describe('withProps', () => {
  it('should passe additional props to base component', () => {
    const DoReMi = withProps({ si: 'do', la: 'fa' })(Dummy)
    expect(DoReMi.displayName).toBe('withProps(Dummy)')

    const dummy = shallow(<DoReMi />).find(Dummy)
    expect(dummy.prop('si')).toBe('do')
    expect(dummy.prop('la')).toBe('fa')
  })

  it('should take precedent over owner props', () => {
    const DoReMi = withProps({ si: 'do', la: 'fa' })(Dummy)

    const dummy = shallow(<DoReMi la="ti" />).find(Dummy)
    expect(dummy.prop('si')).toBe('do')
    expect(dummy.prop('la')).toBe('fa')
  })

  it('should accept function', () => {
    const DoReMi = withProps(({ la }) => ({
      si: la,
    }))(Dummy)

    const dummy = shallow(<DoReMi la="la" />).find(Dummy)
    expect(dummy.prop('si')).toBe('la')
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({}),
      pure,
    )('div')

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'withProps(pure(div))',
    )
    expect(wrapper.equals(<div />)).toBeTruthy()
  })

  it("doesn't compact surrounded HOC that hoists statics", () => {
    const hoc = BaseComponent => props => <BaseComponent {...props} foo="bar" />
    const StaticHoistingHOC = hoistStatics(hoc)

    const Component = compose(
      withProps({}),
      StaticHoistingHOC,
      withProps({}),
    )('div')

    const wrapper = shallow(<Component />)
    expect(wrapper.prop('foo')).toBe('bar')
  })

  it("doesn't compact double-surrounded HOC that hoists statics", () => {
    const hoc = BaseComponent => props => <BaseComponent {...props} foo="bar" />
    const StaticHoistingHOC = hoistStatics(hoc)

    const Component = compose(
      withProps({}),
      StaticHoistingHOC,
      withProps({}),
      withProps({}),
    )('div')

    const wrapper = shallow(<Component />)
    expect(wrapper.prop('foo')).toBe('bar')
  })
})
