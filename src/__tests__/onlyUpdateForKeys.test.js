import React from 'react'
import { mount, shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, onlyUpdateForKeys, withProps, withState } from '..'

describe('onlyUpdateForKeys', () => {
  it('implements shouldComponentUpdate()', () => {
    const Counter = compose(
      withState('counter', 'updateCounter', 0),
      withState('foobar', 'updateFoobar', 'foobar'),
      onlyUpdateForKeys(['counter']),
    )(Dummy)

    const wrapper = mount(<Counter />)
    const { updateCounter, updateFoobar } = wrapper.find(Dummy).props()

    expect(wrapper.find(Dummy).prop('counter')).toBe(0)
    expect(wrapper.find(Dummy).prop('foobar')).toBe('foobar')

    // Does not update
    updateFoobar('barbaz')
    wrapper.update()
    expect(wrapper.find(Dummy).prop('counter')).toBe(0)
    expect(wrapper.find(Dummy).prop('foobar')).toBe('foobar')

    updateCounter(42)
    wrapper.update()
    expect(wrapper.find(Dummy).prop('counter')).toBe(42)
    expect(wrapper.find(Dummy).prop('foobar')).toBe('barbaz')
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      withProps({ foo: 'bar' }),
      onlyUpdateForKeys(['foo']),
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'withProps(onlyUpdateForKeys(Dummy))',
    )
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy()
  })
})
