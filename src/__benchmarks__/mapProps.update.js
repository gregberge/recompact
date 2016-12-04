import './setup';
import React from 'react';
import Benchmark from 'benchmark';
import {mount} from 'enzyme';
import recomposeMapProps from 'recompose/mapProps';
import recompactMapProps from '../mapProps';

const RecompactComponent = recompactMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);
const RecomposeComponent = recomposeMapProps(({foo}) => ({foo: foo + 1}))(() => <div />);

const recompactWrapper = mount(<RecompactComponent />);
const recomposeWrapper = mount(<RecomposeComponent />);

const setPropsSuite = new Benchmark.Suite();
setPropsSuite.add('setProps - recompact.mapProps', () => {
  recompactWrapper.setProps({foo: Math.random()});
})
.add('setProps - recompose.mapProps', function() {
  recomposeWrapper.setProps({foo: Math.random()});
})
.on('cycle', event => {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({async: true});
