import React from 'react'
import { shallow } from 'enzyme'
import { compose, mapProps, pure } from '..'

describe('mapProps', () => {
  it('should map owner props to child props', () => {
    const Component = mapProps(({ strings }) => ({
      className: strings.join(''),
    }))('div')

    const wrapper = shallow(<Component strings={['a', 'b', 'c']} />)
    expect(wrapper.find('div').prop('className')).toBe('abc')
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      mapProps(() => ({})),
      pure,
    )('div')

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'mapProps(pure(div))',
    )
    expect(wrapper.equals(<div />)).toBeTruthy()
  })
})
