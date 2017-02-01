/* eslint-disable no-plusplus */
import './setup'
import React from 'react'
import ReactDOM from 'react-dom'
import * as recompose from 'recompose'
import * as reassemble from 'reassemble'
import * as recompact from '../'
import { runBenchmark, series } from './utils'

const createComponent = ({
  compose,
  setDisplayName,
  pure,
  defaultProps,
  withState,
  withProps,
  renameProp,
}) => {
  const LibComponent = compose(
    setDisplayName('foo'),
    pure,
    defaultProps({ foo: 'bar' }),
    withState('counter', 'updateCounter', 0),
    withProps(({ counter }) => ({ counter: counter + 1 })),
    renameProp('updateCounter', 'up'),
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


const Nothing = () => null
const Recompacted = createComponent(recompact)
const Recomposed = createComponent(recompose)
const Reassembled = createComponent(reassemble)

let count

series([
  () => new Promise(resolve => setTimeout(resolve, 1000)),
  () => runBenchmark([
    {
      description: 'nothing',
      onComplete() {
        cleanup()
      },
      run() {
        render(<Nothing />)
      },
    },
    {
      description: '❤️  recompact',
      onComplete() {
        cleanup()
      },
      run() {
        render(<Recompacted />)
      },
    },
    {
      description: '💙  recompose',
      onComplete() {
        cleanup()
      },
      run() {
        render(<Recomposed />)
      },
    },
    {
      description: '💚  reassemble',
      onComplete() {
        cleanup()
      },
      run() {
        render(<Reassembled />)
      },
    },
  ], '[mount]'),
  () => runBenchmark([
    {
      description: 'nothing',
      onStart() {
        render(<Nothing />)
        count = 0
      },
      run() {
        Nothing.setProps({ foo: count++ })
      },
    },
    {
      description: '❤️  recompact',
      onStart() {
        render(<Recompacted />)
        count = 0
      },
      onComplete() {
        cleanup()
      },
      run() {
        Recompacted.setProps({ foo: count++ })
      },
    },
    {
      description: '💙  recompose',
      onStart() {
        render(<Recomposed />)
        count = 0
      },
      onComplete() {
        cleanup()
      },
      run() {
        Recomposed.setProps({ foo: count++ })
      },
    },
    {
      description: '💚  reassembled',
      onStart() {
        render(<Reassembled />)
        count = 0
      },
      onComplete() {
        cleanup()
      },
      run() {
        Reassembled.setProps({ foo: count++ })
      },
    },
  ], '[setProps]'),
])
