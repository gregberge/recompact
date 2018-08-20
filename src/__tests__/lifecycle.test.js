import React from 'react'
import { mount } from 'enzyme'
import { Dummy } from './utils'
import { lifecycle } from '..'

describe('lifecycle', () => {
  it('should be possible to specify componentWillMount', () => {
    const Custom = lifecycle({
      componentWillMount() {
        this.setState({ bar: 'baz' })
      },
    })(Dummy)

    const dummy = mount(<Custom foo="bar" />).find(Dummy)
    expect(dummy.prop('foo')).toBe('bar')
    expect(dummy.prop('bar')).toBe('baz')
  })
})
