import PropTypes from 'prop-types'
import React from 'react'
import { setStatic } from '..'

describe('setStatic', () => {
  it('sets a static property on the base component', () => {
    const BaseComponent = () => <div />
    const propTypes = { foo: PropTypes.object }
    const NewComponent = setStatic('propTypes', propTypes)(BaseComponent)

    expect(NewComponent.propTypes).toBe(propTypes)
  })
})
