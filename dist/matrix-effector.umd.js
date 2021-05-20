!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("@42px/effector-extra"),require("patronum/throttle"),require("effector"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","@42px/effector-extra","patronum/throttle","effector","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.effectorExtra,e.throttle,e.effector,e.customErrors)}(this,(function(e,t,o,n,r,i){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s,d=a(t);(s=e.MsgType||(e.MsgType={})).Audio="m.audio",s.BadEncrypted="m.bad.encrypted",s.Emote="m.emote",s.File="m.file",s.Image="m.image",s.Notice="m.notice",s.Text="m.text",s.Video="m.video",s.Location="m.location";const c=r.createDomain("matrix"),l=c.effect(),m=c.effect(),u=c.effect(),f=c.effect(),g=c.effect(),p=c.effect(),v=c.effect(),w=c.effect(),y=c.effect(),I=c.effect(),h=c.effect(),R=c.effect(),E=c.effect(),x=c.effect(),b=c.effect(),A=c.store(null),M=c.store(null),P=c.store([]),T=c.store(!1),C=c.store(!1),F=c.store(!1),D=c.store(null),B=c.store(!0),S=c.store(!0),U=c.event(),_=c.event(),k=c.event(),W=c.event(),L=c.event(),N=c.event(),O=c.event(),j=c.event(),z=c.event(),$=c.event();let q,H;const K=[],G=()=>(q||(q=d.default.createClient(H),K.forEach((([e,t])=>{q.on(e,t)}))),q),Y=e=>{K.push(...e)},J=e=>{const t=G().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let n=[];for(const e of o)n=[...n,...e];return!!n.includes(e)},V=c.event(),Q=c.effect(),X=c.effect(),Z=c.effect(),ee=c.effect();function te(t){const o=t.getContent();if(!o.body)return{};const n={body:o.body,msgtype:o.msgtype};return o.msgtype===e.MsgType.BadEncrypted?n:(o["m.relates_to"]&&(n["m.relates_to"]={...o["m.relates_to"]}),o.msgtype===e.MsgType.Text||o.msgtype===e.MsgType.Emote||o.msgtype===e.MsgType.Notice?(o.format&&(n.format=o.format),o.formatted_body&&(n.formatted_body=o.formatted_body),n):o.msgtype===e.MsgType.Location?(o.geo_uri&&(n.geo_uri=o.geo_uri),o.info&&(n.info=o.info),n):(o.file&&(n.file=o.file),o.url&&(n.url=o.url),o.info&&(n.info={...o.info}),n))}function oe(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:te(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function ne(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function re(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(oe(t)),e}const ie="m.room.message",ae="m.room.redaction",se=i.createCustomError("RoomNotFound"),de=i.createCustomError("TimelineWindowUndefined"),ce=i.createCustomError("EventNotFound"),le=i.createCustomError("ClientNotInitialized"),me=i.createCustomError("UserNotLoggedIn");function ue(e){return e.getEvents().filter((e=>[ie,ae].includes(e.getType()))).reduce(re,[])}const fe=r.attach({source:[A,M],effect:Z,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),ge=r.attach({source:[A,M],effect:Z,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),pe=r.combine(A,M,((e,t)=>Boolean(e)&&Boolean(t))),ve=r.combine(pe,F,C,T,((e,t,o,n)=>e&&!t&&!o&&!n));A.on(L,((e,{roomId:t})=>t)),M.on(Q.doneData,((e,t)=>t)).reset(A);const we=r.guard({source:r.sample(A,[X.done,Z.done,ee.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function ye(){return G().getRooms().map(ne)}P.on(we,((e,{messages:t})=>t)).reset(A),D.on(we,((e,{isLive:t})=>t)).reset(A),B.on(we,((e,{canPaginateBackward:t})=>t)).reset([O,A]),S.on(we,((e,{canPaginateForward:t})=>t)).reset([O,A]),r.forward({from:X.pending,to:T}),r.forward({from:ge.pending,to:C}),r.forward({from:fe.pending,to:F}),r.forward({from:r.sample({source:M,clock:Q.done,fn:()=>{}}),to:N}),r.guard({source:r.sample([A,M],V,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:M.map((e=>Boolean(e))),target:ee}),r.guard({source:r.sample([A,M],O,(([e,t],{initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:r}))),filter:pe,target:X}),r.guard({source:z,filter:ve,target:fe}),r.guard({source:j,filter:ve,target:ge}),r.forward({from:L,to:Q}),E.use((()=>{const e=G();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);return o?{userId:o.userId,currentlyActive:o.currentlyActive,displayName:o.displayName,lastActiveAgo:o.lastActiveAgo,lastPresenceTs:o.lastPresenceTs,presence:o.presence}:null})),r.forward({from:l.done.map((()=>({initialSyncLimit:20}))),to:f}),l.use((e=>G().login("m.login.password",e))),m.use((e=>G().login("m.login.token",e))),u.use((async()=>{const{store:e}=G();if(e)return e.startup()})),f.use((e=>G().startClient(e))),p.use((async({term:e,roomId:o,orderBy:n="rank"})=>{const r=G().getRoom(o);if(!r)throw new se;const i={};return(await G().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[o]},order_by:n}}}})).search_categories.room_events.results.map((({result:e})=>{const o=new t.MatrixEvent(e),n=o.getSender();return void 0===i[n]&&(i[n]=r.getMember(n)),o.sender=i[n],oe(o)}))})),v.use((({roomId:e,content:t,txnId:o})=>G().sendMessage(e,t,o))),w.use((({roomId:e,eventId:t,body:o,txnId:n})=>G().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},n))),y.use((async({roomId:e,eventId:t,reason:o})=>{const n=o?{reason:o}:void 0;return{eventId:(await G().redactEvent(e,t,void 0,n)).event_id}})),Y([["Room.timeline",(e,t,o,n,r)=>{const i=e.getType();i!==ie&&i!==ae||!o&&r.liveEvent&&U(function(e){const t={eventId:e.getId(),content:te(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>V()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=ye();W(e)}else{const e=ye();_(e)}else{const e=ye();k(e)}}]]),I.use((({roomId:e,eventId:t})=>{const o=G().getRoom(e);if(!o)throw new se;const n=o.findEventById(t);if(!n)throw new ce;return G().setRoomReadMarkers(e,t,n)})),h.use((e=>{const t=G();if(!t)throw new le;return e.map((e=>{var o;const n=t.getRoom(e.roomId);if(!n)throw new se;const r=n.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const o=r[e];if(n.hasUserReadEvent(t.getUserId(),o.getId()))break;i+=1}const a=r.filter((e=>[ie,ae].includes(e.getType()))).reduce(re,[]),s=a.length?a[a.length-1]:void 0,d=J(n.roomId),c=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:s,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(o=c.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}))})),g.use((()=>G().stopClient())),X.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:n})=>{if(!e)throw new de;await e.load(t,o);const r=e.canPaginate("f");let i=ue(e);if(o&&i.length<o){let t;const r=o-i.length;t="BACKWARD"===n?await e.paginate(d.default.EventTimeline.BACKWARDS,r):await e.paginate(d.default.EventTimeline.FORWARDS,r),t&&(i=ue(e))}return{messages:i,isLive:!r,canPaginateForward:r,canPaginateBackward:e.canPaginate("b")}})),Z.use((async({timelineWindow:e,direction:t,size:o,makeRequest:n,requestLimit:r})=>{if(!e)throw new de;const i="forward"===t?d.default.EventTimeline.FORWARDS:d.default.EventTimeline.BACKWARDS;await e.paginate(i,o,n,r);const a=e.canPaginate("f");return{messages:ue(e),isLive:!a,canPaginateForward:a,canPaginateBackward:e.canPaginate("b")}})),ee.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:ue(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),R.use((e=>{const t=G().getRoom(e);if(!t)throw new se;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Q.use((async({roomId:e})=>{const t=G(),o=G().getRoom(e);if(!o)throw new se;const n=o.getUnfilteredTimelineSet();return new d.default.TimelineWindow(t,n)})),x.use((({eventId:e,roomId:o})=>{const n=G();if(!n)throw new le;const r=n.getRoom(o);if(!r)throw new se;const i=r.findEventById(e);if(!i)throw new ce;const a=n.getUserId();if(!a)throw new me;return{canRedact:r.currentState.maySendRedactionForEvent(i,a)&&"m.room.server_acl"!==i.getType(),canEdit:function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const o=e.getOriginalContent(),{msgtype:n}=o;return("m.text"===n||"m.emote"===n)&&Boolean(o.body)&&"string"==typeof o.body&&e.getSender()===G().getUserId()}(i)}})),b.use((async({file:e,name:t,includeFilename:o,type:n})=>{const r=G();return await r.uploadContent(e,{name:t,includeFilename:o,type:n,onlyContentUri:!0,rawResponse:!1,progressHandler:({loaded:t,total:o})=>{$({file:e,loaded:t,total:o})}})})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canPaginateBackward=B,e.$canPaginateForward=S,e.$currentRoomId=A,e.$isLive=D,e.$loadRoomFxPending=T,e.$messages=P,e.$paginateBackwardPending=F,e.$paginateForwardPending=C,e.$timelineWindow=M,e.checkEventPermissionsFx=x,e.checkIsDirect=J,e.client=G,e.createOnSyncThrottled=e=>n.throttle({source:W,timeout:e}),e.createRoomMessageBatch=e=>o.batchEvents(U,e),e.deleteMessageFx=y,e.editMessageFx=w,e.getLoggedUserFx=E,e.getRoomInfoFx=R,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:n,resizeMethod:r,allowDefault:i=!0})=>{const a=G().getRoom(e);if(!a)return null;const s=a.getMember(t);return s?s.getAvatarUrl(G().getHomeserverUrl(),o,n,r,i,!0):null},e.getRoomsWithActivitiesFx=h,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:n,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(G().getHomeserverUrl(),t,o,n,r,i):null,e.initRoom=L,e.initStoreFx=u,e.loadRoom=O,e.loginByPasswordFx=l,e.loginByTokenFx=m,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:n,allowDirectLinks:r})=>G().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==n?n:"scale",void 0!==r?r:null),e.onCachedState=k,e.onClientEvent=Y,e.onInitialSync=_,e.onRoomInitialized=N,e.onSync=W,e.onUploadProgress=$,e.paginateBackward=z,e.paginateForward=j,e.prependClientParams=e=>{H=e},e.readAllMessagesFx=I,e.roomMessage=U,e.searchRoomMessagesFx=p,e.sendMessageFx=v,e.startClientFx=f,e.stopClientFx=g,e.uploadContentFx=b,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
