import React from 'react';
import {mount} from 'enzyme';
import recomposeMapProps from 'recompose/mapProps';
import recompactMapProps from '../mapProps';
import {runBenchmark} from './utils';

const RecompactComponent = recompactMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);
const RecomposeComponent = recomposeMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);

runBenchmark([
  {
    description: 'mount - recompact.mapProps',
    run() {
      mount(<RecompactComponent />);
    },
  },
  {
    description: 'mount - recompose.mapProps',
    run() {
      mount(<RecomposeComponent />);
    },
  },
]);
