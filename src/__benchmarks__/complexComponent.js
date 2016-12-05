import './setup';
import React from 'react';
import {mount} from 'enzyme';
import recomposeWithProps from 'recompose/withProps';
import recompactWithState from '../withState';
import recomposePure from 'recompose/pure';
import compose from '../compose';
import recompactWithProps from '../withProps';
import recompactPure from '../pure';
import {runBenchmark} from './utils';

const RecompactComponent = compose(
  recompactPure,
  recompactWithState('counter', 'updateCounter', 0),
  recompactWithProps(({counter}) => ({counter: counter + 1})),
  recompactPure,
)(() => <div />);

const RecomposeComponent = compose(
  recomposePure,
  recompactWithState('counter', 'updateCounter', 0),
  recomposeWithProps(({counter}) => ({counter: counter + 1})),
  recomposePure,
)(() => <div />);

const recompactWrapper = mount(<RecompactComponent bar="x" />);
const recomposeWrapper = mount(<RecomposeComponent bar="x" />);

const rand = n => Math.round(Math.random() * n);

runBenchmark([
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
], '[mount]');

runBenchmark([
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
], '[setProps]');
