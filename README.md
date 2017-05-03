<img alt="Recompact" src="https://neoziro.github.io/recompact/recompact-logo.png" height="100">

[![Build Status](https://travis-ci.org/neoziro/recompact.svg?branch=master)](https://travis-ci.org/neoziro/recompact)
[![codecov](https://codecov.io/gh/neoziro/recompact/branch/master/graph/badge.svg)](https://codecov.io/gh/neoziro/recompact)

Recompact is a set of React higher-order components for reactive programming. It's a drop-in replacement of [Recompose](https://github.com/acdlite/recompose) with several enhancements.

## Installation and Usage

To install the stable version:

```sh
yarn add recompact
```

and to use it in your code:

```js
import recompact from 'recompact'
```

## Optimizing bundle size

### [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)

The best way to reduce build size is to use [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash). It can be used with other libraries than lodash, just like this:

**.babelrc**

```json
{
  "plugins": [
    ["lodash", { "id": "recompact" }],
  ]
}
```

Transforms
```js
import recompact from 'recompact'
import { pure, withProps } from 'recompact'

const enhance = recompact.compose(
  withProps({ className: 'beautiful' }),
  pure,
)
```

roughly to
```js
import _compose from 'recompact/compose'
import _pure from 'recompact/pure'
import _withProps from 'recompact/withProps'

const enhance = _compose(
  _withProps({ className: 'beautiful' }),
  _pure,
)
```

### Tree shaking

Since [tree shaking isn't ready yet to reduce build size efficiently](https://advancedweb.hu/2017/02/07/treeshaking/), it is not supported in recompact.

## [Documentation](https://neoziro.github.io/recompact/)

## [Benchmarks](https://github.com/neoziro/recompact/tree/master/src/__benchmarks__)

## Recompact vs. Recompose

Recompact is a drop-in replacement* for [Recompose](https://github.com/acdlite/recompose) with better performance.

<small>\* Except for the [callback](https://github.com/neoziro/recompact/issues/59) of `withState`'s state updater.</small>

### Flattened React components tree

You may have noticed the
"compact" keyword in "Recompact". It's the main differences between Recompose and Recompact.
Recompact compacts all higher-order components into a single one. It results in a flatter React
tree. A flatter React tree has several advantages: performance improvement, better debugging (especially in React Developer Tools)
and easier testing.

Let's take two components using composition, [one using recompose](https://github.com/neoziro/recompact/blob/master/examples/RecomposeCounter.js) and [one using recompact](https://github.com/neoziro/recompact/blob/master/examples/RecompactCounter.js).

The two components are similar, but if you take a look at the React component tree (using React Developer Tool), you can see that the component using recompact is flat:

<img width="401" alt="recompact-vs-recompose" src="https://cloud.githubusercontent.com/assets/266302/22173590/aff1866a-dfc8-11e6-983f-78dd3f84db56.png">

### New methods

Recompact also features higher-order components that are not included in Recompose:

- [omitProps](https://github.com/neoziro/recompact/tree/master/docs#omitpropspaths)
- [pickProps](https://github.com/neoziro/recompact/tree/master/docs#pickpropspaths)

And some very specific higher-order components that give you a lot of power:

- [connectObs](https://github.com/neoziro/recompact/tree/master/docs#connectobsobsmapper)
- [withObs](https://github.com/neoziro/recompact/tree/master/docs#withobsobsmapper)

To learn more about how to use `connectObs` and `withObs` inside your project, please refer to [this complete guide about `connectObs` and `withObs`](https://github.com/neoziro/recompact/blob/master/docs/Observables.md).

## License

MIT
