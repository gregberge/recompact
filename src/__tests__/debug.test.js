/* eslint-disable no-console */
import React from 'react'
import { shallow } from 'enzyme'
import { Dummy } from './utils'
import { compose, debug, withProps } from '..'

describe('debug', () => {
  let consoleLog

  beforeEach(() => {
    consoleLog = console.log
    console.log = jest.fn()
  })

  afterEach(() => {
    console.log = consoleLog
  })

  it('should log compose', () => {
    const Component = compose(
      withProps({ a: 'b' }),
      debug(),
      withProps({ c: 'd' }),
      debug(),
    )(Dummy)

    shallow(<Component />).find(Dummy)
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log.mock.calls[0]).toEqual([
      'withProps(Component)',
      { a: 'b' },
    ])
    expect(console.log.mock.calls[1]).toEqual(['Dummy', { a: 'b', c: 'd' }])
  })
})
