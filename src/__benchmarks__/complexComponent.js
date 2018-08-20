/* eslint-disable no-plusplus */
import './setup'
import React from 'react'
import ReactDOM from 'react-dom'
import * as recompose from 'recompose'
import * as reassemble from 'reassemble'
import * as recompact from '..'
import { runBenchmark, series } from './utils'

const createComponent = ({
  compose,
  setDisplayName,
  pure,
  defaultProps,
  withState,
  withProps,
}) => {
  const LibComponent = compose(
    setDisplayName('foo'),
    pure,
    defaultProps({ foo: 'bar' }),
    withState('counter', 'updateCounter', 0),
    pure,
    withProps(({ counter }) => ({ counter: counter + 1 })),
    pure,
  )(() => <div />)

  const ComponentWrapper = class extends React.Component {
    state = {}

    constructor(props) {
      super(props)
      ComponentWrapper.setProps = this.setState.bind(this)
    }

    render() {
      return <LibComponent {...this.state} />
    }
  }

  return ComponentWrapper
}

const container = document.createElement('div')
document.body.appendChild(container)

function render(node) {
  ReactDOM.render(node, container)
}

function cleanup() {
  ReactDOM.unmountComponentAtNode(container)
}

const Recompacted = createComponent(recompact)
const Recomposed = createComponent(recompose)
const Reassembled = createComponent(reassemble)

let count

series([
  () => new Promise(resolve => setTimeout(resolve, 1000)),
  () =>
    runBenchmark(
      [
        {
          description: '❤️  recompact',
          run() {
            render(<Recompacted />)
            cleanup()
          },
        },
        {
          description: '💙  recompose',
          run() {
            render(<Recomposed />)
            cleanup()
          },
        },
        {
          description: '💚  reassemble',
          run() {
            render(<Reassembled />)
            cleanup()
          },
        },
      ],
      '[mount]',
    ),
  () =>
    runBenchmark(
      [
        {
          description: '❤️  recompact',
          onStart() {
            cleanup()
            render(<Recompacted />)
            count = 0
          },
          run() {
            Recompacted.setProps({ foo: count++ })
          },
        },
        {
          description: '💙  recompose',
          onStart() {
            cleanup()
            render(<Recomposed />)
            count = 0
          },
          run() {
            Recomposed.setProps({ foo: count++ })
          },
        },
        {
          description: '💚  reassembled',
          onStart() {
            cleanup()
            render(<Reassembled />)
            count = 0
          },
          run() {
            Reassembled.setProps({ foo: count++ })
          },
        },
      ],
      '[setProps]',
    ),
])
