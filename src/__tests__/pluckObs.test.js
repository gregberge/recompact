import React from 'react'
import Rx from 'rxjs'
import { mount } from 'enzyme'
import { compose, withObs, pluckObs } from '..'

describe('pluckObs', () => {
  it('should connect one observable to a prop without $', () => {
    const baseClassName$ = new Rx.BehaviorSubject('foo')
    const Component = compose(
      withObs({ className$: baseClassName$ }),
      pluckObs('className$'),
    )('div')

    const wrapper = mount(<Component />)

    expect(wrapper.find('div').prop('className')).toBe('foo')
    baseClassName$.next('bar')
    wrapper.update()
    expect(wrapper.find('div').prop('className')).toBe('bar')
  })

  it('should connect multiple props', () => {
    const baseClassName$ = new Rx.BehaviorSubject('foo')
    const style = { marginRight: '1em' }
    const baseStyle$ = new Rx.BehaviorSubject(style)
    const Component = compose(
      withObs({ className$: baseClassName$, style$: baseStyle$ }),
      pluckObs('className$', 'style$'),
    )('div')

    const wrapper = mount(<Component />)
    expect(wrapper.find('div').prop('className')).toBe('foo')
    expect(wrapper.find('div').prop('style')).toBe(style)
  })
})
