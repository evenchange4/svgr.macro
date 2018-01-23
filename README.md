# svgr.macro

> Run svgr at build-time with babel-plugin-macros.

[![Travis][build-badge]][build]
[![Codecov Status][codecov-badge]][codecov]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads]][npm]
[![node][node]]()

[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devdependency-badge]][devdependency]
[![peerDependency Status][peerdependency-badge]][peerdependency]

[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

## Installation

```sh
$ yarn add svgr.macro
```

_Note: You'll need to install and configure [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) if you haven't already. (This can be omitted when using CRA [react-script@2.x](https://github.com/facebookincubator/create-react-app/issues/3815) .)_

## Caveats

### Bundle size impact

The macro solution is not suggested for every use case. If you import the same svg across multiple files, it will inflate the bundle size.

You should separate the `svgr.macro` function to a single file and import components from there. Please check the [example structure](https://github.com/evenchange4/svgr.macro-example/blob/master/src/Icons/index.js).

Related issue: https://github.com/facebook/create-react-app/issues/3856

## Example

[evenchange4/svgr.macro-example (with react-script@2.x)](https://github.com/evenchange4/svgr.macro-example) [[DEMO](https://svgrmacro.netlify.com/)]

## Usage

### Single file

```js
import toReactComponent from 'svgr.macro';
const Logo = toReactComponent('./fixtures/logo.svg');

      ↓ ↓ ↓ ↓ ↓ ↓

const Logo = props => <svg width={116} height={28} viewBox="0 0 116 28" {...props}>
    <g fill="none" fillRule="evenodd">
      ...
```

### Glob pattern

```js
import toReactComponent from 'svgr.macro';
const { DoneBlack, Autorenew } = toReactComponent(
  './fixtures/material/*.svg',
  { icon: true, replaceAttrValues: ['#61DAFB=currentColor'] },
);

      ↓ ↓ ↓ ↓ ↓ ↓

const {
  DoneBlack,
  Autorenew
} = {
  "Autorenew": props => <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    ...
  </svg>,
  "DoneBlack": props => <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    ...
  </svg>
};
```

## [Options](https://github.com/smooth-code/svgr#options)

## Alternative

* https://github.com/smooth-code/svgr#webpack-usage

## Development

### Requirements

* node >= 9.4.0
* yarn >= 1.3.2

```sh
$ yarn install --pure-lockfile
```

## Test

```sh
$ yarn run format
$ yarn run eslint
$ yarn run flow
$ yarn run test:watch
$ yarn run build
```

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests.

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)

[build-badge]: https://img.shields.io/travis/evenchange4/svgr.macro/master.svg?style=flat-square
[build]: https://travis-ci.org/evenchange4/svgr.macro
[npm-badge]: https://img.shields.io/npm/v/svgr.macro.svg?style=flat-square
[npm]: https://www.npmjs.org/package/svgr.macro
[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/svgr.macro.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/svgr.macro?branch=master
[node]: https://img.shields.io/node/v/svgr.macro.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dt/svgr.macro.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/svgr.macro.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/
[dependency-badge]: https://david-dm.org/evenchange4/svgr.macro.svg?style=flat-square
[dependency]: https://david-dm.org/evenchange4/svgr.macro
[devdependency-badge]: https://david-dm.org/evenchange4/svgr.macro/dev-status.svg?style=flat-square
[devdependency]: https://david-dm.org/evenchange4/svgr.macro#info=devDependencies
[peerdependency-badge]: https://david-dm.org/evenchange4/svgr.macro/peer-status.svg?style=flat-square
[peerdependency]: https://david-dm.org/evenchange4/svgr.macro#info=peerDependencies
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
