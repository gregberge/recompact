/* eslint-disable no-plusplus */
import React from 'react'
import Benchmark from 'benchmark'
import { mount } from 'enzyme'
import compose from '../compose'
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

export const benchOperator = (operator, ...args) => {
  const recompactOperator = require(`../${operator}`).default
  const recomposeOperator = require(`recompose/${operator}`).default
  const Component = () => <div />

  const Nothing = () => null
  let RecompactComponent
  let RecomposeComponent
  let RecompactComposedComponent
  let RecomposeComposedComponent
  if (args.length === 0) {
    RecompactComponent = recompactOperator(Component)
    RecomposeComponent = recomposeOperator(Component)
    RecompactComposedComponent = compose(...fill(recompactOperator))(Component)
    RecomposeComposedComponent = compose(...fill(recomposeOperator))(Component)
  } else {
    RecompactComponent = recompactOperator(...args)(Component)
    RecomposeComponent = recomposeOperator(...args)(Component)
    RecompactComposedComponent = compose(...fill(recompactOperator(...args)))(Component)
    RecomposeComposedComponent = compose(...fill(recomposeOperator(...args)))(Component)
  }

  const nothingWrapper = mount(<Nothing />)
  const recompactWrapper = mount(<RecompactComponent n={0} />)
  const recomposeWrapper = mount(<RecomposeComponent n={0} />)
  const recompactComposedWrapper = mount(<RecompactComposedComponent n={0} />)
  const recomposeComposedWrapper = mount(<RecomposeComposedComponent n={0} />)

  let count = 0

  const resetCount = () => { count = 0 }

  return series([
    () => runBenchmark([
      {
        description: '-- nothing',
        run() {
          mount(<Nothing />)
        },
      },
      {
        description: '❤️  recompact',
        run() {
          mount(<RecompactComponent n={0} />)
        },
      },
      {
        description: '💙  recompose',
        run() {
          mount(<RecomposeComponent n={0} />)
        },
      },
    ], `[mount][single] ${operator}`),
    () => runBenchmark([
      {
        description: '-- nothing',
        run() {
          mount(<Nothing />)
        },
      },
      {
        description: '❤️  recompact',
        run() {
          mount(<RecompactComposedComponent n={0} />)
        },
      },
      {
        description: '💙  recompose',
        run() {
          mount(<RecomposeComposedComponent n={0} />)
        },
      },
    ], `[mount][composed] ${operator}`),
    () => runBenchmark([
      {
        description: '-- nothing',
        onStart: resetCount,
        run() {
          nothingWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '❤️  recompact',
        onStart: resetCount,
        run() {
          recompactWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '💙  recompose',
        onStart: resetCount,
        run() {
          recomposeWrapper.setProps({ n: count++ })
        },
      },
    ], `[setProps] ${operator}`),
    () => runBenchmark([
      {
        description: '-- nothing',
        onStart: resetCount,
        run() {
          nothingWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '❤️  recompact',
        onStart: resetCount,
        run() {
          recompactComposedWrapper.setProps({ n: count++ })
        },
      },
      {
        description: '💙  recompose',
        onStart: resetCount,
        run() {
          recomposeComposedWrapper.setProps({ n: count++ })
        },
      },
    ], `[setProps][composed] ${operator}`),
  ])
}
