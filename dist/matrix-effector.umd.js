!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("@42px/effector-extra"),require("patronum/throttle"),require("effector"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","@42px/effector-extra","patronum/throttle","effector","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.effectorExtra,e.throttle,e.effector,e.customErrors)}(this,(function(e,t,o,n,r,i){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s,d=a(t);(s=e.MsgType||(e.MsgType={})).Audio="m.audio",s.BadEncrypted="m.bad.encrypted",s.Emote="m.emote",s.File="m.file",s.Image="m.image",s.Notice="m.notice",s.Text="m.text",s.Video="m.video",s.Location="m.location";const c=r.createDomain("matrix"),m=c.effect(),l=c.effect(),u=c.effect(),f=c.effect(),g=c.effect(),p=c.effect(),v=c.effect(),w=c.effect(),y=c.effect(),I=c.effect(),h=c.effect(),R=c.effect(),E=c.effect(),b=c.effect(),x=c.store(null),A=c.store(null),M=c.store([]),P=c.store(!1),T=c.store(!1),C=c.store(!1),F=c.store(null),B=c.store(!0),D=c.store(!0),S=c.event(),_=c.event(),k=c.event(),U=c.event(),W=c.event(),L=c.event(),N=c.event(),O=c.event(),j=c.event();let $,z;const q=[],K=()=>($||($=d.default.createClient(z),q.forEach((([e,t])=>{$.on(e,t)}))),$),G=e=>{q.push(...e)},Y=e=>{const t=K().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let n=[];for(const e of o)n=[...n,...e];return!!n.includes(e)},H=c.event(),J=c.effect(),V=c.effect(),Q=c.effect(),X=c.effect();function Z(t){const o=t.getContent();if(!o.body)return{};const n={body:o.body,msgtype:o.msgtype};return o.msgtype===e.MsgType.BadEncrypted?n:(o["m.relates_to"]&&(n["m.relates_to"]={...o["m.relates_to"]}),o.msgtype===e.MsgType.Text||o.msgtype===e.MsgType.Emote||o.msgtype===e.MsgType.Notice?(o.format&&(n.format=o.format),o.formatted_body&&(n.formatted_body=o.formatted_body),n):o.msgtype===e.MsgType.Location?(o.geo_uri&&(n.geo_uri=o.geo_uri),o.info&&(n.info=o.info),n):(o.file&&(n.file=o.file),o.url&&(n.url=o.url),o.info&&(n.info={...o.info}),n))}function ee(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:Z(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function te(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function oe(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(ee(t)),e}const ne="m.room.message",re="m.room.redaction",ie=i.createCustomError("RoomNotFound"),ae=i.createCustomError("TimelineWindowUndefined"),se=i.createCustomError("EventNotFound"),de=i.createCustomError("ClientNotInitialized"),ce=i.createCustomError("UserNotLoggedIn");function me(e){return e.getEvents().filter((e=>[ne,re].includes(e.getType()))).reduce(oe,[])}const le=r.attach({source:[x,A],effect:Q,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),ue=r.attach({source:[x,A],effect:Q,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),fe=r.combine(x,A,((e,t)=>Boolean(e)&&Boolean(t))),ge=r.combine(fe,C,T,P,((e,t,o,n)=>e&&!t&&!o&&!n));x.on(W,((e,{roomId:t})=>t)),A.on(J.doneData,((e,t)=>t)).reset(x);const pe=r.guard({source:r.sample(x,[V.done,Q.done,X.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function ve(){return K().getRooms().map(te)}M.on(pe,((e,{messages:t})=>t)).reset(x),F.on(pe,((e,{isLive:t})=>t)).reset(x),B.on(pe,((e,{canPaginateBackward:t})=>t)).reset([N,x]),D.on(pe,((e,{canPaginateForward:t})=>t)).reset([N,x]),r.forward({from:V.pending,to:P}),r.forward({from:ue.pending,to:T}),r.forward({from:le.pending,to:C}),r.forward({from:r.sample({source:A,clock:J.done,fn:()=>{}}),to:L}),r.guard({source:r.sample([x,A],H,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:A.map((e=>Boolean(e))),target:X}),r.guard({source:r.sample([x,A],N,(([e,t],{initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:r}))),filter:fe,target:V}),r.guard({source:j,filter:ge,target:le}),r.guard({source:O,filter:ge,target:ue}),r.forward({from:W,to:J}),E.use((()=>{const e=K();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);return o?{userId:o.userId,currentlyActive:o.currentlyActive,displayName:o.displayName,lastActiveAgo:o.lastActiveAgo,lastPresenceTs:o.lastPresenceTs,presence:o.presence}:null})),r.forward({from:m.done.map((()=>({initialSyncLimit:20}))),to:f}),m.use((e=>K().login("m.login.password",e))),l.use((e=>K().login("m.login.token",e))),u.use((async()=>{const{store:e}=K();if(e)return e.startup()})),f.use((e=>K().startClient(e))),p.use((async({term:e,roomId:o,orderBy:n="rank"})=>{const r=K().getRoom(o);if(!r)throw new ie;const i={};return(await K().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[o]},order_by:n}}}})).search_categories.room_events.results.map((({result:e})=>{const o=new t.MatrixEvent(e),n=o.getSender();return void 0===i[n]&&(i[n]=r.getMember(n)),o.sender=i[n],ee(o)}))})),v.use((({roomId:e,content:t,txnId:o})=>K().sendMessage(e,t,o))),w.use((({roomId:e,eventId:t,body:o,txnId:n})=>K().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},n))),y.use((async({roomId:e,eventId:t,reason:o})=>{const n=o?{reason:o}:void 0;return{eventId:(await K().redactEvent(e,t,void 0,n)).event_id}})),G([["Room.timeline",(e,t,o,n,r)=>{const i=e.getType();i!==ne&&i!==re||!o&&r.liveEvent&&S(function(e){const t={eventId:e.getId(),content:Z(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>H()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=ve();U(e)}else{const e=ve();_(e)}else{const e=ve();k(e)}}]]),I.use((({roomId:e,eventId:t})=>{const o=K().getRoom(e);if(!o)throw new ie;const n=o.findEventById(t);if(!n)throw new se;return K().setRoomReadMarkers(e,t,n)})),h.use((e=>{const t=K();if(!t)throw new de;return e.map((e=>{var o;const n=t.getRoom(e.roomId);if(!n)throw new ie;const r=n.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const o=r[e];if(n.hasUserReadEvent(t.getUserId(),o.getId()))break;i+=1}const a=r.filter((e=>[ne,re].includes(e.getType()))).reduce(oe,[]),s=a.length?a[a.length-1]:void 0,d=Y(n.roomId),c=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:s,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(o=c.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}))})),g.use((()=>K().stopClient())),V.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:n})=>{if(!e)throw new ae;await e.load(t,o);const r=e.canPaginate("f");let i=me(e);if(o&&i.length<o){let t;const r=o-i.length;t="BACKWARD"===n?await e.paginate(d.default.EventTimeline.BACKWARDS,r):await e.paginate(d.default.EventTimeline.FORWARDS,r),t&&(i=me(e))}return{messages:i,isLive:!r,canPaginateForward:r,canPaginateBackward:e.canPaginate("b")}})),Q.use((async({timelineWindow:e,direction:t,size:o,makeRequest:n,requestLimit:r})=>{if(!e)throw new ae;const i="forward"===t?d.default.EventTimeline.FORWARDS:d.default.EventTimeline.BACKWARDS;await e.paginate(i,o,n,r);const a=e.canPaginate("f");return{messages:me(e),isLive:!a,canPaginateForward:a,canPaginateBackward:e.canPaginate("b")}})),X.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:me(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),R.use((e=>{const t=K().getRoom(e);if(!t)throw new ie;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),J.use((async({roomId:e})=>{const t=K(),o=K().getRoom(e);if(!o)throw new ie;const n=o.getUnfilteredTimelineSet();return new d.default.TimelineWindow(t,n)})),b.use((({eventId:e,roomId:o})=>{const n=K();if(!n)throw new de;const r=n.getRoom(o);if(!r)throw new ie;const i=r.findEventById(e);if(!i)throw new se;const a=n.getUserId();if(!a)throw new ce;return{canRedact:r.currentState.maySendRedactionForEvent(i,a)&&"m.room.server_acl"!==i.getType(),canEdit:function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const o=e.getOriginalContent(),{msgtype:n}=o;return("m.text"===n||"m.emote"===n)&&Boolean(o.body)&&"string"==typeof o.body&&e.getSender()===K().getUserId()}(i)}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canPaginateBackward=B,e.$canPaginateForward=D,e.$currentRoomId=x,e.$isLive=F,e.$loadRoomFxPending=P,e.$messages=M,e.$paginateBackwardPending=C,e.$paginateForwardPending=T,e.$timelineWindow=A,e.checkEventPermissionsFx=b,e.checkIsDirect=Y,e.client=K,e.createOnSyncThrottled=e=>n.throttle({source:U,timeout:e}),e.createRoomMessageBatch=e=>o.batchEvents(S,e),e.deleteMessageFx=y,e.editMessageFx=w,e.getLoggedUserFx=E,e.getRoomInfoFx=R,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:n,resizeMethod:r,allowDefault:i=!0})=>{const a=K().getRoom(e);if(!a)return null;const s=a.getMember(t);return s?s.getAvatarUrl(K().getHomeserverUrl(),o,n,r,i,!0):null},e.getRoomsWithActivitiesFx=h,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:n,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(K().getHomeserverUrl(),t,o,n,r,i):null,e.initRoom=W,e.initStoreFx=u,e.loadRoom=N,e.loginByPasswordFx=m,e.loginByTokenFx=l,e.onCachedState=k,e.onClientEvent=G,e.onInitialSync=_,e.onRoomInitialized=L,e.onSync=U,e.paginateBackward=j,e.paginateForward=O,e.prependClientParams=e=>{z=e},e.readAllMessagesFx=I,e.roomMessage=S,e.searchRoomMessagesFx=p,e.sendMessageFx=v,e.startClientFx=f,e.stopClientFx=g,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
