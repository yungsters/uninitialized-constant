/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {jest} from '@jest/globals';

import uninitializedConstant from './uninitializedConstant';

test('throws when not initialized', () => {
  const [getValue] = uninitializedConstant();
  expect(() => {
    getValue();
  }).toThrow('Cannot get uninitialized value.');
});

test('throws when initialized more than once', () => {
  const [, initialize] = uninitializedConstant();

  initialize({});
  expect(() => {
    initialize({});
  }).toThrow('Cannot initialize more than once.');
});

test('throws when initialized after being read with default initializer', () => {
  const defaultValue = {};
  const defaultInitializer = jest.fn(() => defaultValue);

  const [getValue, initialize] = uninitializedConstant(defaultInitializer);

  expect(getValue()).toBe(defaultValue);
  expect(() => {
    initialize({});
  }).toThrow('Cannot initialize more than once.');
});

test('resolves with initialized value', () => {
  const [getValue, initialize] = uninitializedConstant();

  const value = {};
  initialize(value);

  expect(getValue()).toBe(value);
});

test('resolves with initialized null value', () => {
  const [getValue, initialize] = uninitializedConstant();

  const value = null;
  initialize(value);

  expect(getValue()).toBe(value);
});

test('resolves with initialized undefined value', () => {
  const [getValue, initialize] = uninitializedConstant();

  const value = undefined;
  initialize(value);

  expect(getValue()).toBe(value);
});

test('resolves with initialized value instead of default initializer', () => {
  const defaultValue = {};
  const defaultInitializer = jest.fn(() => defaultValue);

  const [getValue, initialize] = uninitializedConstant(defaultInitializer);

  const value = {};
  initialize(value);

  expect(defaultInitializer).not.toHaveBeenCalled();
  expect(getValue()).toBe(value);
  expect(defaultInitializer).not.toHaveBeenCalled();
});

test('lazily resolves with default initializer', () => {
  const defaultValue = {};
  const defaultInitializer = jest.fn(() => defaultValue);

  const [getValue] = uninitializedConstant(defaultInitializer);

  expect(defaultInitializer).not.toHaveBeenCalled();
  expect(getValue()).toBe(defaultValue);
  expect(defaultInitializer).toHaveBeenCalled();
});
