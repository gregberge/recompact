import React from 'react'
import { mount, shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, withProps, withStateHandlers } from '..'

describe('withStateHandlers', () => {
  it('adds a stateful value and a function for updating it', () => {
    const Counter = withStateHandlers(
      { counter: 0 },
      {
        updateCounter: ({ counter }) => increment => ({
          counter: counter + increment,
        }),
      },
    )(Dummy)

    const wrapper = mount(<Counter pass="through" />)
    const { updateCounter } = wrapper.find(Dummy).props()

    expect(wrapper.find(Dummy).prop('counter')).toBe(0)
    expect(wrapper.find(Dummy).prop('pass')).toBe('through')

    updateCounter(9)
    wrapper.update()
    expect(wrapper.find(Dummy).prop('counter')).toBe(9)
    updateCounter(1)
    wrapper.update()
    updateCounter(10)
    wrapper.update()
    expect(wrapper.find(Dummy).prop('counter')).toBe(20)
    expect(wrapper.find(Dummy).prop('pass')).toBe('through')
  })

  it('accepts initialState as a function of props', () => {
    const Counter = withStateHandlers(
      ({ initialCounter }) => ({ counter: initialCounter }),
      {
        updateCounter: ({ counter }) => increment => ({
          counter: counter + increment,
        }),
      },
    )(Dummy)

    const initialCounter = 101
    const wrapper = mount(<Counter initialCounter={initialCounter} />)

    expect(wrapper.find(Dummy).prop('counter')).toBe(initialCounter)
  })

  it('has access to props', () => {
    const Counter = withStateHandlers(
      ({ initialCounter }) => ({ counter: initialCounter }),
      {
        increment: ({ counter }, { incrementValue }) => () => ({
          counter: counter + incrementValue,
        }),
      },
    )(Dummy)

    const initialCounter = 101
    const incrementValue = 37
    const wrapper = mount(
      <Counter
        initialCounter={initialCounter}
        incrementValue={incrementValue}
      />,
    )
    const { increment } = wrapper.find(Dummy).props()

    increment()
    wrapper.update()

    expect(wrapper.find(Dummy).prop('counter')).toBe(
      initialCounter + incrementValue,
    )
  })

  it('passes immutable state updaters', () => {
    const EnhancedDummy = withStateHandlers(
      {},
      {
        handler: () => () => null,
      },
    )(Dummy)
    expect(EnhancedDummy.displayName).toBe('withStateHandlers(Dummy)')

    const wrapper = shallow(<EnhancedDummy />)
    const handler = wrapper.prop('handler')

    wrapper.setProps({ foo: 'bar' })
    expect(wrapper.prop('foo')).toBe('bar')
    expect(wrapper.prop('handler')).toBe(handler)
  })

  it('handles state updater returning undefined', () => {
    const Counter = withStateHandlers(
      ({ initialCounter }) => ({ counter: initialCounter }),
      {
        updateCounter: ({ counter }) => increment =>
          increment === 0 ? undefined : { counter: counter + increment },
      },
    )(Dummy)

    const initialCounter = 101
    const wrapper = mount(<Counter initialCounter={initialCounter} />)
    const { updateCounter } = wrapper.find(Dummy).props()

    updateCounter(0)
    wrapper.update()

    expect(wrapper.find(Dummy).prop('counter')).toBe(initialCounter)
  })

  it('is merged with other HOCs', () => {
    const Component = compose(
      withProps({ initialCounter: 1 }),
      withStateHandlers(({ initialCounter }) => ({ counter: initialCounter }), {
        updateCounter: ({ counter }) => increment => counter + increment,
      }),
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'withProps(withStateHandlers(Dummy))',
    )
    expect(wrapper.prop('counter')).toBe(1)
    expect(wrapper.prop('initialCounter')).toBe(1)
  })

  it('does not rerender if state updater returns undefined', () => {
    const component = jest.fn(() => null)
    component.displayName = 'component'

    const Counter = withStateHandlers(
      ({ initialCounter }) => ({
        counter: initialCounter,
      }),
      {
        updateCounter: ({ counter }) => increment =>
          increment === 0
            ? undefined
            : {
                counter: counter + increment,
              },
      },
    )(component)

    const initialCounter = 101

    mount(<Counter initialCounter={initialCounter} />)
    expect(component.mock.calls.length).toBe(1)

    const { updateCounter } = component.mock.calls[0][0]

    updateCounter(1)
    expect(component.mock.calls.length).toBe(2)

    updateCounter(0)
    expect(component.mock.calls.length).toBe(2)
  })
})
