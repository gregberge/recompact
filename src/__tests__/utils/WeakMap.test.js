/* eslint-disable global-require */
import React from 'react'
import { shallow } from 'enzyme'

describe('withProps using NonTrackingDummyWeakMap fallback', () => {
  let withProps
  let compose
  let Dummy
  let globalWeakMap
  beforeAll(() => {
    globalWeakMap = global.WeakMap
    delete global.WeakMap
    ;({ withProps, compose } = require('../../'))
    ;({ Dummy } = require('../utils'))
  })

  afterAll(() => {
    global.WeakMap = globalWeakMap
  })

  it('should pass additional props to base component', () => {
    const DoReMi = withProps({ si: 'do', la: 'fa' })(Dummy)
    expect(DoReMi.displayName).toBe('withProps(Dummy)')

    const dummy = shallow(<DoReMi />).find(Dummy)
    expect(dummy.prop('si')).toBe('do')
    expect(dummy.prop('la')).toBe('fa')
  })

  it('can coexist with other non-compacted hoc', () => {
    const DoReMi = compose(
      withProps({ si: 'do' }),
      withProps({ la: 'fa' }),
    )(Dummy)
    expect(DoReMi.displayName).toBe('withProps(withProps(Dummy))')

    const dummy = shallow(<DoReMi />).find(Dummy)
    expect(dummy.prop('si')).toBe('do')
    expect(dummy.prop('la')).toBe('fa')
  })
})
