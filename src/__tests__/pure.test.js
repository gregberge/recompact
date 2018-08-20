import React from 'react'
import { mount, shallow } from 'enzyme'
import { compose, pure, withProps, withState } from '..'
import { countRenders, Dummy } from './utils'

describe('pure', () => {
  it('should not render component if props are the same (shallow)', () => {
    const initialTodos = ['eat', 'drink', 'sleep']
    const Todos = compose(
      withState('todos', 'updateTodos', initialTodos),
      pure,
      countRenders,
    )(Dummy)

    const wrapper = mount(<Todos />)
    const updateTodos = wrapper.find(Dummy).prop('updateTodos')

    expect(wrapper.find(Dummy).prop('todos')).toBe(initialTodos)
    expect(wrapper.find(Dummy).prop('renderCount')).toBe(1)

    // Does not re-render
    updateTodos(initialTodos)
    wrapper.update()
    expect(wrapper.find(Dummy).prop('todos')).toBe(initialTodos)
    expect(wrapper.find(Dummy).prop('renderCount')).toBe(1)

    updateTodos(todos => todos.slice(0, -1))
    wrapper.update()
    expect(wrapper.find(Dummy).prop('todos')).toEqual(['eat', 'drink'])
    expect(wrapper.find(Dummy).prop('renderCount')).toBe(2)
  })

  it('should add correct display name', () => {
    const Component = pure(Dummy)
    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe('pure(Dummy)')
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      pure,
      withProps({ foo: 'bar' }),
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'pure(withProps(Dummy))',
    )
    expect(wrapper.equals(<Dummy foo="bar" />)).toBeTruthy()
  })
})
