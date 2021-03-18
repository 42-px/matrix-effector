# Data Access Layer for matrix-js-sdk

This implementation of DAL uses the effector state manager.

## Installation

```sh
npm install @42px/matrix-effector
```

## Usage


```js
import { IndexedDBStore } from 'matrix-js-sdk'
import {
  initStoreFx,
  loginByPasswordFx,
  prependClientParams,
  onInitialSync,
  createRoomMessageBatch,
  initTimelineWindowFx,
  paginateTimelineWindowFx,
  searchFx,
  SearchPayload,
  loadTimelineWindowFx,
  onCachedState,
  getRoomsWithActivitiesFx,
  createOnSyncThrottled,
} from '@42px/matrix-effector'
import { forward, guard, sample } from 'effector'
import {
  initApp,
  onLoadMoreBack,
  onLoadMoreFront,
  onSearch,
  onSearchInput,
  onSearchResultSelect,
  roomSelected,
} from './events'
import {
  $currentRoomId,
  $messages,
  $rooms,
  $searchInput,
  $searchResults,
} from './state'

const chatWindowSize = 20

$rooms.on(getRoomsWithActivitiesFx.doneData, (_, value) => value)
$currentRoomId.on(roomSelected, (_, value) => value)
$messages
  .on(initTimelineWindowFx.doneData, (_, value) => value)
  .on(paginateTimelineWindowFx.doneData, (_, value) => value)
  .on(loadTimelineWindowFx.doneData, (_, value) => value)
$searchInput.on(onSearchInput, (_, value) => value)
$searchResults.on(searchFx.doneData, (_, messages) => messages)

const store: IndexedDBStore = new IndexedDBStore({
  indexedDB: window.indexedDB,
  dbName: 'zuggat-cache',
})
prependClientParams({
  baseUrl: process.env.MATRIX_BASE_URL,
  store,
  timelineSupport: true,
  unstableClientRelationAggregation: true,
})

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
const roomMessageBatch = createRoomMessageBatch(200)
guard({
  source: roomMessageBatch.map((batch) => ({ direction: 'forward', size: batch.length })),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: paginateTimelineWindowFx,
})
forward({
  from: guard({
    source: roomSelected,
    filter: (roomId) => Boolean(roomId),
  }).map((roomId) => ({ roomId, initialWindowSize: chatWindowSize })),
  to: initTimelineWindowFx,
})
guard({
  source: sample(
    $currentRoomId,
    onSearch,
    ((roomId, term): SearchPayload => ({
      body: {
        search_categories: {
          room_events: {
            search_term: term,
            keys: ['content.body'],
            filter: {
              rooms: [roomId],
            },
          },
        },
      },
    })),
  ),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: searchFx,
})
forward({
  from: sample(
    $currentRoomId,
    guard({
      source: onSearchResultSelect,
      filter: $currentRoomId.map((roomId) => Boolean(roomId)),
    }),
    (roomId, eventId) => ({
      initialEventId: eventId,
      roomId: roomId as string,
      initialWindowSize: chatWindowSize,
    }),
  ),
  to: loadTimelineWindowFx,
})
guard({
  source: sample(
    $currentRoomId,
    onLoadMoreBack,
    () => ({ direction: 'backward', size: 10 }),
  ),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: paginateTimelineWindowFx,
})
guard({
  source: sample(
    $currentRoomId,
    onLoadMoreFront,
    () => ({ direction: 'forward', size: 10 }),
  ),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: paginateTimelineWindowFx,
})
const onSyncThrottled = createOnSyncThrottled(500)
forward({
  from: [onCachedState, onInitialSync, onSyncThrottled],
  to: getRoomsWithActivitiesFx,
})

```



## Utils

### get RoomMember Avatar url / Room Avatar Url
```ts
import { getRoomMemberAvatarUrl, getSenderAvatarUrl, Message } from '@42px/matrix-effector'

...

 const dialogAvatar = getRoomMemberAvatarUrl({
  roomId: item.roomId,
  userId: item.directUserId,
  width: 40,
  height: 40,
  resizeMethod: 'crop',
})

const avatarUrl = getSenderAvatarUrl({
  sender: message.sender,
  width: 40,
  height: 40,
  resizeMethod: 'crop',
})

```