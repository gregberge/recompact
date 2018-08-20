import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { mount } from 'enzyme'
import { Dummy } from './utils'
import { compose, getContext } from '..'

describe('getContext', () => {
  it('should get context and put it in props', () => {
    const DummyFoo = compose(
      BaseComponent =>
        class extends Component {
          static childContextTypes = {
            foo: PropTypes.string.isRequired,
          }

          getChildContext() {
            return { foo: 'bar' }
          }

          render() {
            return <BaseComponent {...this.props} />
          }
        },
      getContext({ foo: PropTypes.string.isRequired }),
    )(Dummy)

    const wrapper = mount(<DummyFoo bar="foo" />)

    expect(wrapper.find(Dummy).props()).toEqual({ bar: 'foo', foo: 'bar' })
  })
})
