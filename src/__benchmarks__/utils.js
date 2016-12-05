import './setup';
import Benchmark from 'benchmark';

export const runBenchmark = (benchs) => {
  const mountSuite = new Benchmark.Suite();

  benchs.forEach(({description, run}) => {
    mountSuite.add(description, run);
  });

  mountSuite
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({async: true});
};
