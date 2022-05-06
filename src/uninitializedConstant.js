/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import invariant from 'invariant';

/**
 * Creates a value container that can only be initialized once. If the value is
 * read before initialization, or if it is initialized more than once, an error
 * is thrown.
 *
 * This also accepts an optional default initializer that will be used if the
 * value is read without being manually initialized.
 */
export default function uninitializedConstant(defaultInitializer) {
  let state;

  function initialize(value) {
    invariant(state == null, 'Cannot initialize more than once.');
    state = {value};
  }

  function getValue() {
    if (state == null) {
      invariant(defaultInitializer != null, 'Cannot get uninitialized value.');
      state = {value: defaultInitializer()};
    }
    return state.value;
  }

  return [getValue, initialize];
}
