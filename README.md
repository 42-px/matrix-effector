# Data Access Layer for matrix-js-sdk

This implementation of DAL uses the effector state manager.

## Installation

```sh
npm install @42px/matrix-effector
```

## Usage


```js
import { forward, guard, sample } from 'effector'
import {
  initStoreFx,
  loginByPasswordFx,
  onInitialSync,
  onCachedState,
} from '@42px/matrix-effector'
import { initApp } from './events'

forward({
  from: initApp,
  to: initStoreFx,
})
forward({
  from: initStoreFx.done.map(() => ({
    user: 'username',
    password: 'password',
  })),
  to: loginByPasswordFx,
})
forward({
  from: [onCachedState, onInitialSync],
  to: showRooms,
})
```
