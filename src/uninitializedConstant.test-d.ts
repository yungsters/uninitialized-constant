/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import uninitializedConstant from './uninitializedConstant';

function testValid() {
  const [getValue, initialize] = uninitializedConstant<number>();
  initialize(42);
  const value: number = getValue();
}

function testDefaultInitializer() {
  const [getValue, initialize] = uninitializedConstant<number>(() => 42);
  const value: number = getValue();
}

function testInvalidReturnValue() {
  // @ts-expect-error
  const [getValue, initialize, doesNotExist] = uninitializedConstant<number>();
}

function testInvalidInitializeArgument() {
  const [getValue, initialize] = uninitializedConstant<number>();
  // @ts-expect-error
  initialize('not a number');
}

function testInvalidGetValue() {
  const [getValue, initialize] = uninitializedConstant<number>();
  initialize(42);
  // @ts-expect-error
  const value: string = getValue();
}
