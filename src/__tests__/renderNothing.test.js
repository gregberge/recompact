import React from 'react'
import { shallow } from 'enzyme'
import { renderNothing } from '..'

describe('renderNothing', () => {
  it('should return a component that renders null', () => {
    const Nothing = renderNothing('div')
    const wrapper = shallow(<Nothing />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
