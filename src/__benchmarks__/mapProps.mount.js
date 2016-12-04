import './setup';
import React from 'react';
import Benchmark from 'benchmark';
import {mount} from 'enzyme';
import recomposeMapProps from 'recompose/mapProps';
import recompactMapProps from '../mapProps';

const RecompactComponent = recompactMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);
const RecomposeComponent = recomposeMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);

const mountSuite = new Benchmark.Suite();
mountSuite.add('mount - recompact.mapProps', () => {
  mount(<RecompactComponent />);
})
.add('mount - recompose.mapProps', function() {
  mount(<RecomposeComponent />);
})
.on('cycle', event => {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({async: true});
