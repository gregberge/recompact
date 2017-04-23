# Using `connectObs` and `withObs` to build your application

One of the biggest challenges in applications is communication between components. Imagine that you are building a complex app with a counter and a button to increment this counter, spread across completely different parts of the UI.

Recompact makes it is easy to deal with this kind of problem. Here is what we need to do:

- Provide a counter observable at the point of sharing (all children that need to access it must be in the subtree of this component).
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

> We have created three functions for each concern: providing the counter observables, connecting the counter value and connecting the counter controls.

## Collisions of observables

Observables are stored under a symbolize key in the context (like you know, context is global in the application). When you provide observables into the context at the root point, a provide can override your key and you can have an unpredictable behaviour.

To avoid this problem, you have two solutions:

- Naming observables with a specific name (`counter$` VS `globalApplicationCounter$`)
- Using [ES6 Symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) as key

Symbols are immutable and unique object that can be used as an object key, if you use a symbol as an object key you are 100% sure that it could not be overridden. *Warning: properties using Symbol as key are not enumerable by default, if you log the observables object you will not see them.*

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

## Connecting all together

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
