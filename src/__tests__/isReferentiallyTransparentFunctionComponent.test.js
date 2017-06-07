import PropTypes from 'prop-types'
/* eslint-disable react/no-multi-comp, react/prefer-stateless-function,
  react/prefer-es6-class, react/forbid-prop-types */
import React, { Component } from 'react'
import createReactClass from 'create-react-class'
import isReferentiallyTransparentFunctionComponent from '../isReferentiallyTransparentFunctionComponent'

describe('isReferentiallyTransparentFunctionComponent', () => {
  it('returns false for strings', () => {
    expect(isReferentiallyTransparentFunctionComponent('div')).toBeFalsy()
  })

  it('isReferentiallyTransparentFunctionComponent returns false for class components', () => {
    class Foo extends Component {
      render() {
        return <div />
      }
    }

    const Bar = createReactClass({
      render() {
        return <div />
      },
    })

    expect(isReferentiallyTransparentFunctionComponent(Foo)).toBeFalsy()
    expect(isReferentiallyTransparentFunctionComponent(Bar)).toBeFalsy()
  })

  it('returns true for functions', () => {
    const Foo = props => <div {...props} />

    expect(isReferentiallyTransparentFunctionComponent(Foo)).toBeTruthy()
  })

  it('returns false for functions that use context', () => {
    const Foo = (props, context) => <div {...props} {...context} />
    Foo.contextTypes = { store: PropTypes.object }

    expect(isReferentiallyTransparentFunctionComponent(Foo)).toBeFalsy()
  })

  it('returns false for functions that use default props', () => {
    const Foo = (props, context) => <div {...props} {...context} />
    Foo.defaultProps = { store: PropTypes.object }

    expect(isReferentiallyTransparentFunctionComponent(Foo)).toBeFalsy()
  })

  it('returns false for functions that use propTypes', () => {
    const Foo = (props, context) => <div {...props} {...context} />
    Foo.propTypes = { store: PropTypes.object }

    expect(isReferentiallyTransparentFunctionComponent(Foo)).toBeFalsy()
  })
})
