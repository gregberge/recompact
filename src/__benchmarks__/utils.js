import React from 'react';
import Benchmark from 'benchmark';
import {mount} from 'enzyme';
import './setup';

export const runBenchmark = (benchs, name) => {
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
  })
  .run();
};

export const benchOperator = (operator, ...args) => {
  const recompactOperator = require(`../${operator}`).default;
  const recomposeOperator = require(`recompose/${operator}`).default;
  const Component = () => <div />;

  let RecompactComponent;
  let RecomposeComponent;
  if (args.length === 0) {
    RecompactComponent = recompactOperator(Component);
    RecomposeComponent = recomposeOperator(Component);
  } else {
    RecompactComponent = recompactOperator(...args)(Component);
    RecomposeComponent = recomposeOperator(...args)(Component);
  }

  const recompactWrapper = mount(<RecompactComponent n={0} />);
  const recomposeWrapper = mount(<RecomposeComponent n={0} />);

  runBenchmark([
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
  ], `[mount] ${operator}`);

  const rand = n => Math.round(Math.random() * n);

  runBenchmark([
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
  ], `[setProps] ${operator}`);
};
