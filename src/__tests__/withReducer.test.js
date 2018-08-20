import React from 'react'
import { mount } from 'enzyme'
import { Dummy } from './utils'
import { withReducer, compose, flattenProp } from '..'

const SET_COUNTER = 'SET_COUNTER'

test('adds a stateful value and a function for updating it', () => {
  const initialState = { counter: 0 }

  const reducer = (state, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer, initialState),
    flattenProp('state'),
  )(Dummy)

  const wrapper = mount(<Counter />)
  const { dispatch } = wrapper.find(Dummy).props()

  expect(wrapper.find(Dummy).prop('counter')).toBe(0)

  dispatch({ type: SET_COUNTER, payload: 18 })
  wrapper.update()
  expect(wrapper.find(Dummy).prop('counter')).toBe(18)
})

test('calls initialState when it is a function', () => {
  const initialState = ({ initialCount }) => ({ counter: initialCount })

  const reducer = (state, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer, initialState),
    flattenProp('state'),
  )(Dummy)

  const dummy = mount(<Counter initialCount={10} />).find(Dummy)

  expect(dummy.prop('counter')).toBe(10)
})

test('receives state from reducer when initialState is not provided', () => {
  const initialState = { counter: 0 }

  const reducer = (state = initialState, action) =>
    action.type === SET_COUNTER ? { counter: action.payload } : state

  const Counter = compose(
    withReducer('state', 'dispatch', reducer),
    flattenProp('state'),
  )(Dummy)

  const dummy = mount(<Counter />).find(Dummy)
  expect(dummy.prop('counter')).toBe(0)
})
