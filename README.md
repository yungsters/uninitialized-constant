# uninitialized-constant &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![npm version](https://img.shields.io/npm/v/uninitialized-constant.svg?style=flat)](https://www.npmjs.com/package/uninitialized-constant) [![CircleCI Status](https://circleci.com/gh/yungsters/uninitialized-constant.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/yungsters/uninitialized-constant)

`uninitialized-constant` is a utility function for creating a value container that can only be initialized once.

## Install

```sh
$ npm install uninitialized-constant
```

or

```sh
$ yarn add uninitialized-constant
```

## `uninitializedConstant([defaultInitializer])`

It returns a tuple with two values:

1. A function that returns the value initialized in the container.
2. A function that initializes the value in the container.

```js
const [getValue, initialize] = uninitializedConstant();

initialize(42);

getValue();
// 42
```

Trying to get the value before it is initialized throws an error.

```js
const [getValue, initialize] = uninitializedConstant();

getValue();
// Error: Cannot get uninitialized value.
```

Trying to set the value more than once throws an error.

```js
const [getValue, initialize] = uninitializedConstant();

initialize(42);

initialize(42);
// Error: Cannot initialize more than once.
```

If the optional `defaultInitializer` function is supplied, it will be called at most once to initialize the container if it is read before being explicitly initialized.

```js
const [getValue, initialize] = uninitializedConstant(() => 42);

getValue();
// 42
```

If a container is initialized using `defaultInitializer`, trying to initialize it again throws an error.

```js
const [getValue, initialize] = uninitializedConstant(() => 42);

getValue();
// 42

initialize(42);
// Error: Cannot initialize more than once.
```

## License

`uninitialized-constant` is [MIT licensed](./LICENSE).
