import {
    attach,
    forward,
    guard,
    sample
} from "effector"
import {
    Direction,
    EventStatus,
    IContent,
    MatrixEvent,
    TimelineWindow
} from "matrix-js-sdk"
import {
    client,
    createRoomMessageBatch
} from "@/matrix-client"
import {
    $currentRoomId,
    $isLive,
    $timelineWindow
} from "@/room"
import { paginateForwardFx } from "@/room-pagination/private"
import { Message } from "@/types"
import { getMessages } from "@/utils"
import {
    setMessages,
    updateMessagesFx
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
    updateMessages,
} from "./public"
import {
    DeleteMessageResult,
    UploadContentResult
} from "./types"
import {
    ClientNotInitialized,
    EventNotFound,
    RoomNotFound,
    UserNotLoggedIn
} from "@/errors"

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
$isLive
    .on(setMessages, (_, { isLive }) => isLive)
    .reset($currentRoomId)

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
        updateMessages,
        ([roomId, timelineWindow]) => ({
            timelineWindow: timelineWindow as TimelineWindow,
            roomId: roomId as string
        })
    ),
    filter: $timelineWindow.map(timelineWindow => Boolean(timelineWindow)),
    target: updateMessagesFx,
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
        .setRoomReadMarkers(roomId, eventId, rrEvent, { hidden: undefined })
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
