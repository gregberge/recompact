import React from 'react'
import warning from 'warning'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, flattenProp, pure } from '..'

jest.mock('warning')

describe('flattenProp', () => {
  it('should flatten an object prop and spreads it into the top-level props object', () => {
    const Counter = flattenProp('state')(Dummy)

    expect(warning).toHaveBeenCalledWith(
      true,
      '`flattenProp` is deprecated, please use `flattenProps` instead.',
    )

    const wrapper = shallow(<Counter pass="through" state={{ counter: 1 }} />)

    expect(
      wrapper.equals(
        <Dummy pass="through" state={{ counter: 1 }} counter={1} />,
      ),
    ).toBeTruthy()

    wrapper.setProps({
      pass: 'through',
      state: { state: 1 },
    })

    expect(wrapper.equals(<Dummy pass="through" state={1} />)).toBeTruthy()
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      flattenProp('foo'),
      pure,
    )(Dummy)

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe(
      'flattenProp(pure(Dummy))',
    )
    expect(wrapper.equals(<Dummy />)).toBeTruthy()
  })
})
