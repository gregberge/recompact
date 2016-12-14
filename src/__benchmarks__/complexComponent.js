import './setup';
import React from 'react';
import {mount} from 'enzyme';
import recomposeSetDisplayName from 'recompose/setDisplayName';
import recomposeDefaultProps from 'recompose/defaultProps';
import recomposeWithProps from 'recompose/withProps';
import recomposeRenameProp from 'recompose/renameProp';
import recomposeWithState from 'recompose/withState';
import recomposePure from 'recompose/pure';
import compose from '../compose';
import recompactSetDisplayName from '../setDisplayName';
import recompactDefaultProps from '../defaultProps';
import recompactWithProps from '../withProps';
import recompactWithState from '../withState';
import recompactRenameProp from '../renameProp';
import recompactPure from '../pure';
import {runBenchmark, series} from './utils';

const RecompactComponent = compose(
  recompactSetDisplayName('foo'),
  recompactPure,
  recompactDefaultProps({foo: 'bar'}),
  recompactWithState('counter', 'updateCounter', 0),
  recompactWithProps(({counter}) => ({counter: counter + 1})),
  recompactRenameProp('updateCounter', 'up'),
)(() => <div />);

const RecomposeComponent = compose(
  recomposeSetDisplayName('foo'),
  recomposePure,
  recomposeDefaultProps({foo: 'bar'}),
  recomposeWithState('counter', 'updateCounter', 0),
  recomposeWithProps(({counter}) => ({counter: counter + 1})),
  recomposeRenameProp('updateCounter', 'up'),
)(() => <div />);

const recompactWrapper = mount(<RecompactComponent bar="x" />);
const recomposeWrapper = mount(<RecomposeComponent bar="x" />);

const rand = n => Math.round(Math.random() * n);

series([
  () => new Promise(resolve => setTimeout(resolve, 1000)),
  () => runBenchmark([
    {
      description: '❤️  recompact',
      run() {
        mount(<RecompactComponent />);
      },
    },
    {
      description: '💙  recompose',
      run() {
        mount(<RecomposeComponent />);
      },
    },
  ], '[mount]'),
  () => runBenchmark([
    {
      description: '❤️  recompact',
      run() {
        recompactWrapper.setProps({foo: rand(2)});
      },
    },
    {
      description: '💙  recompose',
      run() {
        recomposeWrapper.setProps({foo: rand(2)});
      },
    },
  ], '[setProps]'),
]);
