/* eslint-disable no-plusplus */
import './setup'
import React from 'react'
import { mount } from 'enzyme'
import recomposeSetDisplayName from 'recompose/setDisplayName'
import recomposeDefaultProps from 'recompose/defaultProps'
import recomposeWithProps from 'recompose/withProps'
import recomposeRenameProp from 'recompose/renameProp'
import recomposeWithState from 'recompose/withState'
import recomposePure from 'recompose/pure'
import compose from '../compose'
import recompactSetDisplayName from '../setDisplayName'
import recompactDefaultProps from '../defaultProps'
import recompactWithProps from '../withProps'
import recompactWithState from '../withState'
import recompactRenameProp from '../renameProp'
import recompactPure from '../pure'
import { runBenchmark, series } from './utils'

const RecompactComponent = compose(
  recompactSetDisplayName('foo'),
  recompactPure,
  recompactDefaultProps({ foo: 'bar' }),
  recompactWithState('counter', 'updateCounter', 0),
  recompactWithProps(({ counter }) => ({ counter: counter + 1 })),
  recompactRenameProp('updateCounter', 'up'),
)(() => <div />)

const RecomposeComponent = compose(
  recomposeSetDisplayName('foo'),
  recomposePure,
  recomposeDefaultProps({ foo: 'bar' }),
  recomposeWithState('counter', 'updateCounter', 0),
  recomposeWithProps(({ counter }) => ({ counter: counter + 1 })),
  recomposeRenameProp('updateCounter', 'up'),
)(() => <div />)

const Nothing = () => null
const nothingWrapper = mount(<Nothing />)
const recompactWrapper = mount(<RecompactComponent bar="x" />)
const recomposeWrapper = mount(<RecomposeComponent bar="x" />)

let count

series([
  () => new Promise(resolve => setTimeout(resolve, 1000)),
  () => runBenchmark([
    {
      description: 'nothing',
      run() {
        mount(<Nothing />)
      },
    },
    {
      description: '❤️  recompact',
      run() {
        mount(<RecompactComponent />)
      },
    },
    {
      description: '💙  recompose',
      run() {
        mount(<RecomposeComponent />)
      },
    },
  ], '[mount]'),
  () => runBenchmark([
    {
      description: 'nothing',
      onStart() {
        count = 0
      },
      run() {
        nothingWrapper.setProps({ foo: count++ })
      },
    },
    {
      description: '❤️  recompact',
      onStart() {
        count = 0
      },
      run() {
        recompactWrapper.setProps({ foo: count++ })
      },
    },
    {
      description: '💙  recompose',
      onStart() {
        count = 0
      },
      run() {
        recomposeWrapper.setProps({ foo: count++ })
      },
    },
  ], '[setProps]'),
])
