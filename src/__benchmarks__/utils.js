/* eslint-disable no-plusplus, max-len */
import React from 'react'
import ReactDOM from 'react-dom'
import Benchmark from 'benchmark'
import * as recompose from 'recompose'
import * as reassemble from 'reassemble'
import * as recompact from '../'
import './setup'

const TIME_BETWEEN = 1000

export const series = promises =>
  promises.reduce((current, next) => current.then(next), Promise.resolve())

Benchmark.options.initCount = 10
Benchmark.options.queued = true
Benchmark.options.async = true
Benchmark.options.minSamples = 1
Benchmark.options.maxTime = 1

export const runBenchmark = (benchs, name) =>
  new Promise((resolve) => {
    const mountSuite = new Benchmark.Suite()

    benchs.forEach(({ description, run, onStart }) => {
      mountSuite.add(description, run, { onStart })
    })

    mountSuite
    .on('start', () => {
      const descriptions = name || benchs.map(({ description }) => description).join(', ')
      console.log(`Start benchmark ${descriptions}`)
      console.log('-------------------------------')
    })
    .on('cycle', (event) => {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log('-------------------------------')
      const exceptNothing = this.filter(({ name }) => !name.match(/nothing/))
      const fastest = exceptNothing.filter('fastest')

      if (fastest.length === exceptNothing.length) {
        console.log('TIED')
      } else {
        console.log(`Winner: ${fastest.map('name').join(', ')}`)
      }
      console.log('')
      setTimeout(resolve, TIME_BETWEEN)
    })
    .run()
  })

const fill = i => (new Array(100)).fill(i)

const wrap = (node) => {
  const ComponentWrapper = class extends React.Component {
    state = {}

    constructor(props) {
      super(props)
      ComponentWrapper.setProps = this.setState.bind(this)
    }

    render() {
      return React.cloneElement(node, { ...this.props, ...this.state })
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

export const benchOperator = (operator, ...args) => {
  const recompactOperator = recompact[operator]
  const recomposeOperator = recompose[operator]
  const reassembleOperator = reassemble[operator]
  const Component = () => <div />

  const Nothing = () => null
  let RecompactComponent
  let RecomposeComponent
  let ReassembleComponent
  let RecompactComposedComponent
  let RecomposeComposedComponent
  let ReassembleComposedComponent
  if (args.length === 0) {
    RecompactComponent = recompactOperator(Component)
    RecomposeComponent = recomposeOperator(Component)
    ReassembleComponent = reassemble.compose(reassembleOperator)(Component)
    RecompactComposedComponent = recompact.compose(...fill(recompactOperator))(Component)
    RecomposeComposedComponent = recompose.compose(...fill(recomposeOperator))(Component)
    ReassembleComposedComponent = reassemble.compose(...fill(reassembleOperator))(Component)
  } else {
    RecompactComponent = recompactOperator(...args)(Component)
    RecomposeComponent = recomposeOperator(...args)(Component)
    ReassembleComponent = reassemble.compose(reassembleOperator(...args))(Component)
    RecompactComposedComponent = recompact.compose(...fill(recompactOperator(...args)))(Component)
    RecomposeComposedComponent = recompose.compose(...fill(recomposeOperator(...args)))(Component)
    ReassembleComposedComponent = reassemble.compose(...fill(reassembleOperator(...args)))(Component)
  }

  const NothingWrapper = wrap(<Nothing />)
  const RecompactWrapper = wrap(<RecompactComponent n={0} />)
  const RecomposeWrapper = wrap(<RecomposeComponent n={0} />)
  const ReassembleWrapper = wrap(<ReassembleComponent n={0} />)
  const RecompactComposedWrapper = wrap(<RecompactComposedComponent n={0} />)
  const RecomposeComposedWrapper = wrap(<RecomposeComposedComponent n={0} />)
  const ReassembleComposedWrapper = wrap(<ReassembleComposedComponent n={0} />)

  let count = 0

  const resetCount = () => { count = 0 }

  return series([
    () => runBenchmark([
      {
        description: '-- nothing',
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
          render(<RecompactComponent n={0} />)
        },
      },
      {
        description: '💙  recompose',
        onComplete() {
          cleanup()
        },
        run() {
          render(<RecomposeComponent n={0} />)
        },
      },
      {
        description: '💚  reassemble',
        onComplete() {
          cleanup()
        },
        run() {
          render(<ReassembleComponent n={0} />)
        },
      },
    ], `[mount][single] ${operator}`),
    () => runBenchmark([
      {
        description: '-- nothing',
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
          render(<RecompactComposedComponent n={0} />)
        },
      },
      {
        description: '💙  recompose',
        onComplete() {
          cleanup()
        },
        run() {
          render(<RecomposeComposedComponent n={0} />)
        },
      },
      {
        description: '💚  reassemble',
        onComplete() {
          cleanup()
        },
        run() {
          render(<ReassembleComposedComponent n={0} />)
        },
      },
    ], `[mount][composed] ${operator}`),
    () => runBenchmark([
      {
        description: '-- nothing',
        onStart: () => {
          render(<NothingWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          NothingWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '❤️  recompact',
        onStart: () => {
          render(<RecompactWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          RecompactWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '💙  recompose',
        onStart: () => {
          render(<RecomposeWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          RecomposeWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '💚  reassemble',
        onStart: () => {
          render(<ReassembleWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          ReassembleWrapper.setProps({ n: count++ })
        },
      },
    ], `[setProps] ${operator}`),
    () => runBenchmark([
      {
        description: '-- nothing',
        onStart: () => {
          render(<NothingWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          NothingWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '❤️  recompact',
        onStart: () => {
          render(<RecompactComposedWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          RecompactComposedWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '💙  recompose',
        onStart: () => {
          render(<RecomposeComposedWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          RecomposeComposedWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '💚  reassemble',
        onStart: () => {
          render(<ReassembleComposedWrapper />)
          resetCount()
        },
        onComplete() {
          cleanup()
        },
        run() {
          ReassembleComposedWrapper.setProps({ n: count++ })
        },
      },
    ], `[setProps][composed] ${operator}`),
  ])
}
