import {
    attach,
    combine,
    forward,
    guard,
    sample
} from "effector"
import matrix, {
    Direction,
    EventStatus,
    IContent,
    MatrixEvent,
    TimelineWindow
} from "matrix-js-sdk"
import {
    debounce,
    throttle
} from "patronum"
import {
    client,
    createRoomMessageBatch
} from "@/matrix-client"
import {
    $currentRoomId,
    $isLive,
    $loadFilter,
    $loadRoomFxPending,
    $timelineWindow,
    loadRoom
} from "@/room"
import { Message } from "@/types"
import { getMessages } from "@/utils"
import {
    setMessages,
    updateMessagesFx,
    paginateBackwardFx,
    paginateForwardFx,
    paginateRoomFx,
    updateCurrentRoomUnreadMessageCountFx
} from "./private"
import {
    $messages,
    checkEventPermissionsFx,
    deleteMessageFx,
    editMessageFx,
    getUrlPreviewFx,
    newMessagesLoaded,
    onUploadProgress,
    readAllMessagesFx,
    sendMessageFx,
    uploadContentFx,
    $canPaginateBackward,
    $canPaginateForward,
    $paginateBackwardPending,
    $paginateForwardPending,
    onPaginateBackwardDone,
    onPaginateForwardDone,
    paginateBackward,
    paginateForward,
    updateMessages,
    $currentRoomUnreadMessageCount,
} from "./public"
import {
    DeleteMessageResult,
    UploadContentResult
} from "./types"
import {
    ClientNotInitialized,
    EventNotFound,
    RoomNotFound,
    TimelineWindowUndefined,
    UserNotLoggedIn
} from "@/errors"

const THROTTLE_MESSAGE_TIME = 800
const DEBOUNCE_READ_MESSAGE_TIME = 500

const roomMessageBatch = createRoomMessageBatch()

const loadNewMessagesFx = attach({
    effect: paginateForwardFx,
    mapParams: ({ messages }: { messages: Message[] }) => ({
        size: messages.length,
    }) 
})

$messages
    .on(setMessages, (_, { messages }) => messages)
    .reset($currentRoomId)

$currentRoomUnreadMessageCount
    .on(updateCurrentRoomUnreadMessageCountFx.doneData, (_, count) => count)
    .reset($currentRoomId)

$isLive
    .on(setMessages, (_, { isLive }) => isLive)
    .reset($currentRoomId)


const $paginateFilter = combine(
    $loadFilter,
    $paginateBackwardPending,
    $paginateForwardPending,
    $loadRoomFxPending,
    (
        canLoad,
        backwardPaginationPending,
        forwardPaginationPending,
        roomLoading,
    ) => canLoad
          && !backwardPaginationPending
          && !forwardPaginationPending
          && !roomLoading
)
    
$paginateBackwardPending
    .on(paginateBackwardFx.pending, (_, value) => value)
    .reset($currentRoomId)
$paginateForwardPending
    .on(paginateForwardFx.pending, (_, value) => value)
    .reset($currentRoomId)
$canPaginateBackward
    .on(setMessages, (_, { canPaginateBackward }) => canPaginateBackward)
    .reset([loadRoom, $currentRoomId])
$canPaginateForward
    .on(setMessages, (_, { canPaginateForward }) => canPaginateForward)
    .reset([loadRoom, $currentRoomId])
    
forward({
    from: paginateBackwardFx.done,
    to: onPaginateBackwardDone,
})
    
forward({
    from: paginateForwardFx.done,
    to: onPaginateForwardDone,
})
    
guard({
    source: paginateBackward,
    filter: $paginateFilter,
    target: paginateBackwardFx
})
guard({
    source: paginateForward,
    filter: $paginateFilter,
    target: paginateForwardFx
})

forward({
    from: sample(
        $messages,
        loadNewMessagesFx.done,
        (_, { params }) => params.messages
    ),
    to: newMessagesLoaded
})
    
forward({
    from: roomMessageBatch.map((messages) => ({ messages })),
    to: loadNewMessagesFx,
})

guard({
    source: sample(
        [$currentRoomId, $timelineWindow],
        throttle({
            source: updateMessages,
            timeout: THROTTLE_MESSAGE_TIME
        }),
        ([roomId, timelineWindow]) => ({
            timelineWindow: timelineWindow as TimelineWindow,
            roomId: roomId as string
        })
    ),
    filter: $timelineWindow.map(timelineWindow => Boolean(timelineWindow)),
    target: updateMessagesFx,
})

guard({
    clock: $messages.updates,
    source: $currentRoomId,
    filter: (currentRoomId): currentRoomId is string => Boolean(currentRoomId),
    target: updateCurrentRoomUnreadMessageCountFx
})

sample({
    clock: debounce({
        source: sendMessageFx.done,
        timeout: DEBOUNCE_READ_MESSAGE_TIME,
    }),
    fn: ({ params, result }) => ({
        roomId: params.roomId,
        eventId: result.event_id
    }),
    target: readAllMessagesFx
})

sendMessageFx.use( async ({
    roomId,
    content,
    txnId
}) => await client().sendMessage(roomId, content as IContent, txnId))

editMessageFx.use( async ({
    roomId, eventId, body, txnId,
}) => await client().sendMessage(
    roomId,
    {
        "m.new_content": {
            msgtype: "m.text", body,
        },
        "m.relates_to": {
            rel_type: "m.replace",
            event_id: eventId,
        },
        "msgtype": "m.text",
        "body": "",
    },
    txnId,
))
deleteMessageFx.use(async ({
    roomId, eventId, reason,
}): Promise<DeleteMessageResult> => {
    const options = reason ? { reason } : undefined
    const res = await client().redactEvent(roomId, eventId, undefined, options)
    return {
        eventId: res.event_id,
    }
})
readAllMessagesFx.use(async ({ roomId, eventId }) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    const rrEvent = room.findEventById(eventId)
    if (!rrEvent) throw new EventNotFound()
    // Kludge - typings fix

    await client()
        .setRoomReadMarkers(roomId, eventId, rrEvent)
})
uploadContentFx.use(({
    file,
    name,
    includeFilename,
    onlyContentUri,
    rawResponse,
    type,
}) => {
    const cl = client()
    const promise = cl.uploadContent(file, {
        name,
        includeFilename,
        type,
        onlyContentUri,
        rawResponse,
        progressHandler: ({ loaded, total }: {
            loaded: number
            total: number
        }) => {
            // warning: loosing event scope
            onUploadProgress({ file, loaded, total }) 
        },
    } as any) as any
    const result: UploadContentResult = { promise }
    if (promise.abort) result.abort = promise.abort
    return result
})

getUrlPreviewFx.use(({url, ts, timeout = 5000}) => {
    return new Promise((resolve)=>{
        client().getUrlPreview(url, ts)
            .then(resolve)
            .catch(()=> resolve({"og:url": url}))
        setTimeout(()=>{
            resolve({"og:url": url})
        }, timeout)
    })
})

function canEditContent(mxEvent: MatrixEvent): boolean {
    if (mxEvent.status === EventStatus.CANCELLED ||
        mxEvent.getType() !== "m.room.message" ||
        mxEvent.isRedacted()
    ) {
        return false
    }
    const content = mxEvent.getOriginalContent()
    const {msgtype} = content
    return (msgtype === "m.text" || msgtype === "m.emote") &&
        Boolean(content.body) && typeof content.body === "string" &&
        mxEvent.getSender() === client().getUserId()
}
checkEventPermissionsFx.use(({ eventId, roomId }) => {
    const cl = client()
    if (!cl) throw new ClientNotInitialized()
    const room = cl.getRoom(roomId)
    if (!room) throw new RoomNotFound()
    const mxEvent = room.findEventById(eventId)
    if (!mxEvent) throw new EventNotFound()
    const userId = cl.getUserId()
    if (!userId) throw new UserNotLoggedIn()
    const canRedact = room.currentState
        .maySendRedactionForEvent(mxEvent, userId) &&
            mxEvent.getType() as string !==
                "m.room.server_acl"   // missing in DT types
    const canEdit = canEditContent(mxEvent)
    return {
        canRedact,
        canEdit,
    }
})
updateMessagesFx.use(({ timelineWindow }) => {
    const canPaginateForward = timelineWindow.canPaginate(Direction.Forward)
    return {
        messages: getMessages(timelineWindow),
        isLive: !canPaginateForward,
        canPaginateForward: canPaginateForward,
        canPaginateBackward: timelineWindow.canPaginate(Direction.Backward)
    }
})
    
paginateRoomFx.use(async ({
    timelineWindow,
    direction,
    size,
    makeRequest,
    requestLimit,
}) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    const dir = direction === "forward" ?
        matrix.EventTimeline.FORWARDS :
        matrix.EventTimeline.BACKWARDS
    await timelineWindow
        .paginate(dir, size, makeRequest, requestLimit)
    const canPaginateForward = timelineWindow.canPaginate(Direction.Forward)
    const messages = getMessages(timelineWindow)
    return {
        messages,
        isLive: !canPaginateForward,
        canPaginateForward: canPaginateForward,
        canPaginateBackward: timelineWindow.canPaginate(Direction.Backward)
    }
})


updateCurrentRoomUnreadMessageCountFx.use((roomId) => {
    const matrixRoom = client().getRoom(roomId)
    if (!matrixRoom) throw new RoomNotFound()
    const count = matrixRoom.getUnreadNotificationCount()
    return count ?? 0
})
