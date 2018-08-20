import React from 'react'
import { setDisplayName, toClass } from '..'
import createHelper from '../createHelper'

export const countRenders = createHelper(
  BaseComponent =>
    class extends React.Component {
      renderCount = 0

      render() {
        this.renderCount += 1
        return <BaseComponent renderCount={this.renderCount} {...this.props} />
      }
    },
  'countRenders',
  true,
  true,
)

export const Dummy = setDisplayName('Dummy')(toClass(() => <div />))
