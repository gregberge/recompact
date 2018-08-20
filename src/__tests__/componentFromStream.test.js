import React from 'react'
import { mount } from 'enzyme'
import { Observable, Subject } from 'rxjs'
import rxjsConfig from '../rxjsObservableConfig'
import { componentFromStream, setObservableConfig } from '..'

setObservableConfig(rxjsConfig)

describe('componentFromStream', () => {
  it('should create a component from a prop stream transformation', () => {
    const Double = componentFromStream(props$ =>
      props$.map(({ n }) => <div>{n * 2}</div>),
    )
    const wrapper = mount(<Double n={112} />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('224')

    wrapper.setProps({ n: 358 })
    expect(div.text()).toBe('716')
  })

  it('should unsubscribe from stream before unmounting', () => {
    let subscriptions = 0
    const vdom$ = new Observable(observer => {
      subscriptions += 1
      observer.next(<div />)
      return {
        unsubscribe() {
          subscriptions -= 1
        },
      }
    })
    const Div = componentFromStream(() => vdom$)
    const wrapper = mount(<Div />)
    expect(subscriptions).toBe(1)
    wrapper.unmount()
    expect(subscriptions).toBe(0)
  })

  it('should render nothing until the stream emits a value', () => {
    const vdom$ = new Subject()
    const Div = componentFromStream(() => vdom$.mapTo(<div />))
    const wrapper = mount(<Div />)
    expect(wrapper.find('div').length).toBe(0)

    vdom$.next()
    wrapper.update()
    expect(wrapper.find('div').length).toBe(1)
  })

  it('should handle multiple observers of props stream', () => {
    const Div = componentFromStream(props$ =>
      // Adds three observers to props stream
      props$.combineLatest(props$, props$, props1 => <div {...props1} />),
    )

    const wrapper = mount(<Div value={1} />)
    expect(wrapper.find('div').prop('value')).toBe(1)

    wrapper.setProps({ value: 2 })
    expect(wrapper.find('div').prop('value')).toBe(2)
  })

  it('should complete props stream before unmounting', () => {
    let counter = 0

    const Div = componentFromStream(props$ => {
      const first$ = props$.first().do(() => {
        counter += 1
      })

      const last$ = props$
        .last()
        .do(() => {
          counter -= 1
        })
        .startWith(null)

      return props$.combineLatest(first$, last$, props => <div {...props} />)
    })

    const wrapper = mount(<Div />)

    expect(counter).toBe(1)
    expect(wrapper.find('div').length).toBe(1)

    wrapper.unmount()
    expect(counter).toBe(0)
  })
})
