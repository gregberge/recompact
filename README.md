# Recompact

[![build status](https://img.shields.io/travis/neoziro/recompact/master.svg?style=flat-square)](https://travis-ci.org/neoziro/recompact)

Recompact is a set of React higher-order components for reactive programming. It's a tiny framework inspired by [Recompose](https://github.com/acdlite/recompose) to unleash the power of streams inside your React application.

## Installation and Usage

To install the stable version:

```sh
yarn add recompact
```

To import the entire core set of functionality:

```js
import recompact from 'recompact';
```

To import only what you need (this is useful for size-sensitive bundling):

```js
import mapProps from 'recompact/mapProps';
```

## [Documentation](https://github.com/neoziro/recompact/tree/master/docs)

## Recompact vs. Recompose

Recompact is a drop-in replacement for [Recompose](https://github.com/acdlite/recompose) with better performance. You may have noticed the
"compact" keyword in "Recompact". It's the main differences between Recompose and Recompact.
Recompact compacts all higher-order components into a single one. It results in a flatter React
tree. A flatter React tree has several advantages: performance improvement, better debugging (especially in React Developer Tools)
and easier testing.

Recompact also features higher-order components that are not included in Recompose:

- [omitProps](https://github.com/neoziro/recompact/tree/master/docs#omitpropspaths)
- [pickProps](https://github.com/neoziro/recompact/tree/master/docs#pickpropspaths)

And some very specific higher-order components that give you a lot of power:

- [connectObs](https://github.com/neoziro/recompact/tree/master/docs#connectobsobsmapper)
- [mapObs](https://github.com/neoziro/recompact/tree/master/docs#mapobsobsmapper)
- [withObs](https://github.com/neoziro/recompact/tree/master/docs#withobsobsmapper)

## Build your app using streams

One of the biggest challenge in an application is the communication between components, imagine that your counter has to be displayed in the header and that you have some buttons in the UI, in other components that increments it.

We will have to introduce another concept: the context, the context is a global object that a component can make it accessible to its children. In our stack, we put some observables in the context in order to make them accessible across the entire application.

So it's simple, we have three things to do:

- Provide the counter at the point of sharing (all children that need to access to it must be in the subtree of this component). For us, it will be the root component of our application.
- Connect the `counter` prop where we need to display it.
- Connect the `onIncrementCounter` function where we need to interact with it.

```js
// counterLogic.js
import connectObs from 'recompact/connectObs'
import withObs from 'recompact/withObs'
import { Subject } from 'modules/rxjs'

export const provideCounter = withObs(() => {
  const incrementCounter$ = new Subject()
  const counter$ = incrementCounter$.startWith(0).scan(counter => counter + 1)
  return { counter$, incrementCounter$ }
});

export const connectCounterValue = connectObs(({counter$}) => ({counter: counter$}))

export const connectCounterControls = connectObs(({incrementCounter$}) => ({
  onIncrementCounter: incrementCounter$,
}))
```

> We have created three functions for each concern: providing, connecting value, connecting controls.

### Collisions of observables

Observables are stored under a symbolize key in the context, like you know, context is global in the application. When you provide some observables into the context at the root point, a provide can override your key and you can have an unpredictable behaviour.

To avoid this problem, you have two solutions:

- Naming observables with a specific name (`counter$` VS `globalApplicationCounter$`)
- Using [ES6 Symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) as key

Symbols are immutable and unique object that can be used as an object key, if you use a symbol as an object key you are 100% sure that it could not be overrided. *Warning: properties using Symbol as key are not enumerable by default, if you log the observables object you will not see them.*

```js
// counterLogic.js
import connectObs from 'recompact/connectObs'
import withObs from 'recompact/withObs'
import Rx from 'rxjs'

const COUNTER$ = Symbol('counter$')
const INCREMENT_COUNTER$ = Symbol('incrementCounter$')

export const provideCounter = withObs(() => {
  const incrementCounter$ = new Rx.Subject()
  const counter$ = incrementCounter$.startWith(0).scan(counter => counter + 1)
  return {
    [COUNTER$]: counter$,
    [INCREMENT_COUNTER$]: incrementCounter$,
  }
});

export const connectCounterValue = connectObs(({
  [COUNTER$]: counter$,
}) => ({
  counter: counter$,
}))

export const connectCounterControls = connectObs(({
  [INCREMENT_COUNTER$]: incrementCounter$,
}) => ({
  onIncrementCounter: incrementCounter$,
}))
```

> We replaced keys by Symbols, we are now 100% safe and we don't use any exotic name.

### Connecting all together

```js
// App.js
import compose from 'recompact/compose'
import setDisplayName from 'recompact/setDisplayName'
import CounterIncrementButton from './CounterIncrementButton'
import CounterDisplay from './CounterDisplay'
import { provideCounter } from './counterLogic'

export default recompose.compose(
  setDisplayName('App'),
  provideCounter,
)(({onIncrementCounter}) => (
  <div>
    <CounterIncrementButton />
    <CounterDisplay />
  </div>
))
```

> First we create an app and we provide counter in it.

```js
// CounterIncrementButton.js
import setDisplayName from 'recompact/setDisplayName'
import MyButton from './MyButton'
import { connectCounterControls } from './counterLogic'

export default recompose.compose(
  setDisplayName('CounterIncrementButton'),
  connectCounterControls,
)(({onIncrementCounter}) => (
  <MyButton onClick={onIncrementCounter}>Increment</MyButton>
))
```

> We create our CounterIncrementButton and we use `connectCounterControls` to connect it.

```js
// CounterDisplay.js
import setDisplayName from 'recompact/setDisplayName'
import { connectCounterValue } from './hoc/counter'

export default recompose.compose(
  recompose.setDisplayName('CounterDisplay'),
  connectCounterValue,
)(({counter}) => <div>{counter}</div>)
```

> We create our CounterDisplay and we use `connectCounterValue` to connect it.


## License

MIT
