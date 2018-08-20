import React from 'react'
import { mount } from 'enzyme'
import {
  compose,
  branch,
  renderComponent,
  setDisplayName,
  toClass,
  withState,
} from '..'

describe('renderComponent', () => {
  it('always renders the given component', () => {
    const Dummy1 = setDisplayName('Dummy1')(toClass(() => <div />))
    const Dummy2 = setDisplayName('Dummy2')(toClass(() => <div />))

    const Foobar = compose(
      withState('flip', 'updateFlip', false),
      branch(
        props => props.flip,
        renderComponent(Dummy1),
        renderComponent(Dummy2),
      ),
    )(null)

    const wrapper = mount(<Foobar />)
    const { updateFlip } = wrapper.find('Dummy2').props()

    expect(wrapper.find('Dummy1').length).toBe(0)
    expect(wrapper.find('Dummy2').length).toBe(1)

    updateFlip(true)
    wrapper.update()
    expect(wrapper.find('Dummy1').length).toBe(1)
    expect(wrapper.find('Dummy2').length).toBe(0)
  })
})
