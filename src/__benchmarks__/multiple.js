import './setup';
import React from 'react';
import Benchmark from 'benchmark';
import {mount} from 'enzyme';
import compose from '../compose';
import recomposeMapProps from 'recompose/mapProps';
import recomposePure from 'recompose/pure';
import recompactMapProps from '../mapProps';
import recompactPure from '../pure';

const suite = new Benchmark.Suite();

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

const rand = n => Math.round(Math.random() * n);

suite.add('recompact', () => {
  recompactWrapper.setProps({foo: Math.random()});
})
.add('recompose', () => {
  recomposeWrapper.setProps({foo: Math.random()});
})
.on('cycle', event => {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({async: true});
