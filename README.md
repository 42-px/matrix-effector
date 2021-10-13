# Data Access Layer for matrix-js-sdk

This implementation of DAL uses the effector state manager.

## Installation

### 1.4.0 version is unstable, please avoid it

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
  newMessagesLoaded,
  initTimelineWindowFx,
  $currentRoomId, // Use these stores in your view
  $messages,
  initRoom,
  onRoomInitialized,
  loadRoom,
  paginateForward,
  paginateBackward,
  searchRoomMessagesFx,
  loadTimelineWindowFx,
  onCachedState,
  getRoomsWithActivitiesFx,
  createOnSyncThrottled,
  checkEventPermissionsFx,
  getUrlPreviewFx
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
  $rooms,
  $searchInput,
  $searchResults,
  $currentUser,
} from './state'

const chatWindowSize = 20

$rooms.on(getRoomsWithActivitiesFx.doneData, (_, value) => value)
$searchInput.on(onSearchInput, (_, value) => value)
$searchResults.on(searchRoomMessagesFx.doneData, (_, messages) => messages)
$currentUser.on(getLoggedUserFx.doneData, (_, user) => user)

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
forward({
  from: loginByPasswordFx.done,
  to: getLoggedUserFx,
})
// new messages event (live timeline)
newMessagesLoaded.watch((messages) => console.log(messages))

// on back pagination complete
onPaginateBackwardDone.watch(() => console.log('paginated back in history'))

// explicit triger to load live timeline (for example: to get to the end of history)
toLiveTimeline()

liveTimelineLoaded.watch(() => console.log('room live timeline loaded'))

// events to go to message in current room
loadRoomMessage({ initialEventId: 'messageId' })

loadRoomMessageDone.watch(() => console.log('loaded timeline around message'))

// To select current room trigger initRoom - it will also create a TimelineWindow instance for it
forward({
  from: roomSelected.map((roomId) => { roomId }),
  to: initRoom,
})
forward({
  from: onRoomInitialized,
  to: loadRoom,
})
guard({
  source: sample(
    [$searchInput, $currentRoomId],
    onSearch,
    (([term, roomId]) => ({ term, roomId, orderBy: 'recent' })),
  ),
  filter: combine($currentRoomId, $searchInput, (roomId, term) => Boolean(roomId) && Boolean(term)),
  target: searchRoomMessagesFx,
})
guard({
  source: onSearchResultSelect.map((eventId) => ({
    initialEventId: eventId,
    initialWindowSize: chatWindowSize,
  })),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: loadRoom,
})
guard({
  source: onLoadMoreBack.map(() => ({ size: 10 })),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: paginateBackward,
})
guard({
  source: onLoadMoreFront.map(() => ({ size: 10 })),
  filter: $currentRoomId.map((roomId) => Boolean(roomId)),
  target: paginateForward,
})
const onSyncThrottled = createOnSyncThrottled(500)
forward({
  from: [onCachedState, onInitialSync, onSyncThrottled],
  to: getRoomsWithActivitiesFx,
})
guard({
  source: sample(
    $currentRoomId,
    $selectedMessage.updates,
    (roomId, messageId) => ({
      roomId: roomId as string,
      eventId: messageId as string,
    }),
  ),
  filter: combine(
    $hasRoom,
    $selectedMessage,
    (hasRoom, messageId) => hasRoom && Boolean(messageId),
  ),
  target: checkEventPermissionsFx,
})
checkEventPermissionsFx.doneData.watch(({ canRedact, canEdit }) => console.log(canRedact, canEdit))
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

# API Reference

## Store

### $messages

```ts
const $messages = store<Message>()
```

> Store provides access to messages in opened room


## Events 

### **onRoomLoaded**

```ts
const onRoomLoaded = event<void>()
```

> Event emmits when room initialized and messages loaded in $messages.

