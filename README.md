# Recompact

[![build status](https://img.shields.io/travis/neoziro/recompact/master.svg?style=flat-square)](https://travis-ci.org/neoziro/recompact)

A set of React higher-order components for reactive programming. It's a tiny framework inspired by recompose to unleash the power of streams inside your React application.

```sh
yarn add recompact
```

## Installation and Usage

### Import entire recompact

```js
import recompact from 'recompact';
```

### Import only what you need (useful for size-sensitive building)

```js
import mapProps from 'recompact/mapProps';
```

## [Documentation](https://github.com/neoziro/recompact/tree/master/docs)

## Recompact VS Recompose

Recompact provides the same API as recompose with better performances. You may have noticed the
"compact" keyword in "recompact". It's the main differences between Recompose and Recompact.
Recompact compacts all high order components into a single one, it results in a smallest React
tree. A smallest React tree has several advantages: performance improvement, better debugging (especially in React devtools).

Recompact also includes some higher-order components not included in Recompose:

- [omitProps](https://github.com/neoziro/recompact/tree/master/docs#omitpropspaths)
- [pickProps](https://github.com/neoziro/recompact/tree/master/docs#pickpropspaths)

And some very specific higher-order components that gives you a lot of power:

- [connectObs](https://github.com/neoziro/recompact/tree/master/docs#connectobsobsmapper)
- [mapObs](https://github.com/neoziro/recompact/tree/master/docs#mapobsobsmapper)
- [withObs](https://github.com/neoziro/recompact/tree/master/docs#withobsobsmapper)

## Build your app using streams

WIP

## License

MIT
