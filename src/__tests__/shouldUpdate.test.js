import React from 'react'
import { mount, shallow } from 'enzyme'
import { compose, shouldUpdate } from '../'
import { countRenders, Dummy } from './utils'

describe('shouldUpdate', () => {
  it('implements shouldComponentUpdate', () => {
    const EnhancedDummy = compose(
      shouldUpdate(({ foo }, { foo: nextFoo }) => foo !== nextFoo),
      countRenders,
    )(Dummy)

    expect(EnhancedDummy.displayName).toBe('shouldUpdate(countRenders(Dummy))')

    const wrapper = mount(<EnhancedDummy foo="bar" />)
    const dummy = wrapper.find(Dummy)

    // Does not re-render.
    wrapper.setProps({ foo: 'bar' })
    wrapper.setProps({ foo: 'bar' })
    expect(dummy.prop('foo')).toBe('bar')
    expect(dummy.prop('renderCount')).toBe(1)

    // Re-renders.
    wrapper.setProps({ foo: 'baz' })
    expect(dummy.prop('foo')).toBe('baz')
    expect(dummy.prop('renderCount')).toBe(2)
  })

  it('should be mergeable', () => {
    const Component = compose(
      shouldUpdate(() => true),
      shouldUpdate(() => true),
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe('shouldUpdate(shouldUpdate(Dummy))')
    expect(wrapper.equals(<Dummy />)).toBeTruthy()
  })
})
