import React from 'react';
import Benchmark from 'benchmark';
import {mount} from 'enzyme';
import compose from '../compose';
import './setup';

const TIME_BETWEEN = 1000;

export const series = promises =>
  promises.reduce((current, next) => current.then(next), Promise.resolve());

Benchmark.options.initCount = 10;
Benchmark.options.queued = true;
Benchmark.options.async = true;
Benchmark.options.minSamples = 1;
Benchmark.options.maxTime = 1;

export const runBenchmark = (benchs, name) =>
  new Promise((resolve) => {
    const mountSuite = new Benchmark.Suite();

    benchs.forEach(({description, run}) => {
      mountSuite.add(description, run);
    });

    mountSuite
    .on('start', () => {
      const descriptions = name || benchs.map(({description}) => description).join(', ');
      console.log(`Start benchmark ${descriptions}`);
      console.log('-------------------------------');
    })
    .on('cycle', (event) => {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('-------------------------------');
      const fastest = this.filter('fastest').map('name');
      if (fastest.length === benchs.length) {
        console.log('TIED');
      } else {
        console.log(`Winner: ${this.filter('fastest').map('name')}`);
      }
      console.log('');
      setTimeout(resolve, TIME_BETWEEN);
    })
    .run();
  });

const fill = i => (new Array(10)).fill(i);

export const benchOperator = (operator, ...args) => {
  const recompactOperator = require(`../${operator}`).default;
  const recomposeOperator = require(`recompose/${operator}`).default;
  const Component = () => <div />;

  let RecompactComponent;
  let RecomposeComponent;
  let RecompactComposedComponent;
  let RecomposeComposedComponent;
  if (args.length === 0) {
    RecompactComponent = recompactOperator(Component);
    RecomposeComponent = recomposeOperator(Component);
    RecompactComposedComponent = compose(...fill(recompactOperator))(Component);
    RecomposeComposedComponent = compose(...fill(recomposeOperator))(Component);
  } else {
    RecompactComponent = recompactOperator(...args)(Component);
    RecomposeComponent = recomposeOperator(...args)(Component);
    RecompactComposedComponent = compose(...fill(recompactOperator(...args)))(Component);
    RecomposeComposedComponent = compose(...fill(recomposeOperator(...args)))(Component);
  }

  const recompactWrapper = mount(<RecompactComponent n={0} />);
  const recomposeWrapper = mount(<RecomposeComponent n={0} />);
  const recompactComposedWrapper = mount(<RecompactComposedComponent n={0} />);
  const recomposeComposedWrapper = mount(<RecomposeComposedComponent n={0} />);

  const rand = n => Math.round(Math.random() * n);

  return series([
    () => runBenchmark([
      {
        description: '❤️  recompact',
        run() {
          mount(<RecompactComponent n={0} />);
        },
      },
      {
        description: '💙  recompose',
        run() {
          mount(<RecomposeComponent n={0} />);
        },
      },
    ], `[mount][single] ${operator}`),
    () => runBenchmark([
      {
        description: '❤️  recompact',
        run() {
          mount(<RecompactComposedComponent n={0} />);
        },
      },
      {
        description: '💙  recompose',
        run() {
          mount(<RecomposeComposedComponent n={0} />);
        },
      },
    ], `[mount][composed] ${operator}`),
    () => runBenchmark([
      {
        description: '❤️  recompact',
        run() {
          recompactWrapper.setProps({n: rand(1)});
        },
      },
      {
        description: '💙  recompose',
        run() {
          recomposeWrapper.setProps({n: rand(1)});
        },
      },
    ], `[setProps] ${operator}`),
    () => runBenchmark([
      {
        description: '❤️  recompact',
        run() {
          recompactComposedWrapper.setProps({n: rand(1)});
        },
      },
      {
        description: '💙  recompose',
        run() {
          recomposeComposedWrapper.setProps({n: rand(1)});
        },
      },
    ], `[setProps][composed] ${operator}`),
  ]);
};
