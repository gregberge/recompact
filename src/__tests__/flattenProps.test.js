import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, flattenProps, pure } from '..'

describe('flattenProps', () => {
  it('should flatten an object prop and spread it into the top-level props object', () => {
    const Counter = flattenProps('a')(Dummy)

    const wrapper = shallow(<Counter pass="through" a={{ z: 1 }} />)

    expect(wrapper.equals(<Dummy pass="through" a={{ z: 1 }} z={1} />)).toBe(
      true,
    )

    wrapper.setProps({
      pass: 'through',
      a: { a: 1 },
    })

    expect(wrapper.equals(<Dummy pass="through" a={1} />)).toBe(true)
  })

  it('should flatten several props', () => {
    const Counter = flattenProps(['a', 'b'])(Dummy)

    const wrapper = shallow(
      <Counter pass="through" a={{ z: 1 }} b={{ y: 2 }} />,
    )

    expect(
      wrapper.equals(
        <Dummy pass="through" a={{ z: 1 }} b={{ y: 2 }} z={1} y={2} />,
      ),
    ).toBe(true)

    wrapper.setProps({
      pass: 'through',
      a: { a: 1 },
      b: { b: 1 },
    })

    expect(wrapper.equals(<Dummy pass="through" a={1} b={1} />)).toBe(true)
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      flattenProps('foo'),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'flattenProps(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy />)).toBe(true)
  })
})
