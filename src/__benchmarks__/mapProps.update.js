import React from 'react';
import {mount} from 'enzyme';
import recomposeMapProps from 'recompose/mapProps';
import recompactMapProps from '../mapProps';
import {runBenchmark} from './utils';

const RecompactComponent = recompactMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);
const RecomposeComponent = recomposeMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);

const recompactWrapper = mount(<RecompactComponent />);
const recomposeWrapper = mount(<RecomposeComponent />);

runBenchmark([
  {
    description: 'update - recompact.mapProps',
    run() {
      recompactWrapper.setProps({foo: Math.random()});
    },
  },
  {
    description: 'update - recompose.mapProps',
    run() {
      recomposeWrapper.setProps({foo: Math.random()});
    },
  },
]);
