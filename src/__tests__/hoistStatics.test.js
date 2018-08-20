import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { hoistStatics, mapProps } from '..'

describe('hoistStatics', () => {
  it('copies non-React static properties from base component to new component', () => {
    const BaseComponent = props => <Dummy {...props} />
    BaseComponent.foo = () => {}

    const EnhancedComponent = hoistStatics(
      mapProps(props => ({ n: props.n * 5 })),
    )(BaseComponent)

    expect(EnhancedComponent.foo).toBe(BaseComponent.foo)

    const wrapper = shallow(<EnhancedComponent n={3} />)
    expect(wrapper.prop('n')).toBe(15)
  })
})
