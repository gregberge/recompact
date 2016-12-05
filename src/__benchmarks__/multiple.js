import './setup';
import React from 'react';
import {mount} from 'enzyme';
import recomposeMapProps from 'recompose/mapProps';
import recomposePure from 'recompose/pure';
import compose from '../compose';
import recompactMapProps from '../mapProps';
import recompactPure from '../pure';
import {runBenchmark} from './utils';

const RecompactComponent = compose(
  recompactMapProps(({foo}) => ({foo: foo + 1})),
  recompactPure,
)(() => null);

const RecomposeComponent = compose(
  recomposeMapProps(({foo}) => ({foo: foo + 1})),
  recomposePure,
)(() => null);

const recompactWrapper = mount(<RecompactComponent bar="x" />);
const recomposeWrapper = mount(<RecomposeComponent bar="x" />);

runBenchmark([
  {
    description: 'recompact',
    run() {
      recompactWrapper.setProps({foo: Math.random()});
    },
  },
  {
    description: 'recompose',
    run() {
      recomposeWrapper.setProps({foo: Math.random()});
    },
  },
]);
