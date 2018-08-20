/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prefer-es6-class */
import React, { Component } from 'react'
import createReactClass from 'create-react-class'
import { isClassComponent } from '..'

describe('isClassComponent', () => {
  it('returns false for functions', () => {
    const Foo = () => <div />

    expect(isClassComponent(Foo)).toBeFalsy()
  })

  it('returns true for React component classes', () => {
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

    expect(isClassComponent(Foo)).toBeTruthy()
    expect(isClassComponent(Bar)).toBeTruthy()
  })
})
