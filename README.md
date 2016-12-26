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

WIP

## License

MIT
