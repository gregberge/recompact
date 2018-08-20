import PropTypes from 'prop-types'
import React from 'react'
import { setPropTypes } from '..'

describe('setPropTypes', () => {
  it('sets a static property on the base component', () => {
    const BaseComponent = () => <div />
    const propTypes = { foo: PropTypes.object }
    const NewComponent = setPropTypes(propTypes)(BaseComponent)

    expect(NewComponent.propTypes).toBe(propTypes)
  })
})
