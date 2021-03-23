"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("effector"),r=require("@42px/effector-extra"),o=require("patronum/throttle"),n=require("@42px/custom-errors");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=s(e);const a=t.createDomain("matrix"),c=a.effect(),d=a.effect(),l=a.effect(),u=a.effect(),m=a.effect(),g=a.effect(),f=a.effect(),p=a.effect(),v=a.effect(),x=a.effect(),I=a.effect(),w=a.effect(),y=a.effect(),h=a.effect(),R=a.effect(),E=a.effect(),M=a.effect(),T=a.effect(),b=a.event(),A=a.event(),C=a.event(),F=a.event();let S,U;const D=[],P=()=>(S||(S=i.default.createClient(U),D.forEach((([e,t])=>{S.on(e,t)}))),S),_=e=>{D.push(...e)},N=e=>{const t=P().getAccountData("m.direct"),r=t?Object.values(t.getContent()):[];let o=[];for(const e of r)o=[...o,...e];return!!o.includes(e)};function W(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function k(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function B(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(W(t)),e}const O="m.room.message",j="m.room.redaction",q=n.createCustomError("RoomNotFound"),z=n.createCustomError("TimelineWindowUndefined"),L=n.createCustomError("PaginationFail"),G=n.createCustomError("EventNotFound"),Y=n.createCustomError("ClientNotInitialized");function H(){return P().getRooms().map(k)}let J;T.use((()=>{const e=P();if(!e)return null;const t=e.getUserId();if(!t)return null;const r=e.getUser(t);return r?{userId:r.userId,currentlyActive:r.currentlyActive,displayName:r.displayName,lastActiveAgo:r.lastActiveAgo,lastPresenceTs:r.lastPresenceTs,presence:r.presence}:null})),t.forward({from:c.done.map((()=>({initialSyncLimit:20}))),to:u}),c.use((e=>P().login("m.login.password",e))),d.use((e=>P().login("m.login.token",e))),l.use((async()=>{const{store:e}=P();if(e)return e.startup()})),u.use((e=>P().startClient(e))),g.use((async({term:t,roomId:r})=>(await P().search({body:{search_categories:{room_events:{search_term:t,keys:["content.body"],filter:{rooms:[r]}}}}})).search_categories.room_events.results.map((({result:t})=>{const r=new e.MatrixEvent(t),o=P().getRoom(r.getRoomId());if(!o)throw new q;const n=o.getMember(r.getSender());return r.sender=n,W(r)})))),f.use((({roomId:e,content:t,txnId:r})=>P().sendMessage(e,t,r))),p.use((({roomId:e,eventId:t,body:r,txnId:o})=>P().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:r},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),v.use((async({roomId:e,eventId:t,reason:r})=>{const o=r?{reason:r}:void 0;return{eventId:(await P().redactEvent(e,t,void 0,o)).event_id}})),x.use((e=>{const t=P().getRoom(e);return t?t.timeline.filter((e=>[O,j].includes(e.getType()))).reduce(B,[]):[]})),_([["Room.timeline",(e,t,r,o,n)=>{const s=e.getType();s!==O&&s!==j||!r&&n.liveEvent&&b(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=H();F(e)}else{const e=H();A(e)}else{const e=H();C(e)}}]]),R.use((({roomId:e,eventId:t})=>{const r=P().getRoom(e);if(!r)throw new q;const o=r.findEventById(t);if(!o)throw new G;return P().setRoomReadMarkers(e,t,o)})),E.use((e=>{const t=P();if(!t)throw new Y;return e.map((e=>{const r=t.getRoom(e.roomId);if(!r)throw new q;const o=r.getLiveTimeline().getEvents();let n=0;for(let e=o.length-1;e>=0&&e!==o.length-99;e--){const s=o[e];if(r.hasUserReadEvent(t.getUserId(),s.getId()))break;n+=1}const s=o.filter((e=>[O,j].includes(e.getType()))).reduce(B,[]),i=s.length?s[s.length-1]:void 0,a=N(r.roomId),c=a?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:n,lastMessage:i,isDirect:a,directUserId:null==c?void 0:c.user.userId,isOnline:c?Boolean(c.user.currentlyActive):void 0,lastActivityTS:r.getLastActiveTimestamp()}}))})),m.use((()=>P().stopClient())),I.use((async({roomId:e,initialEventId:t,initialWindowSize:r})=>{const o=P(),n=P().getRoom(e);if(!n)throw new q;const s=n.getUnfilteredTimelineSet();return J=new i.default.TimelineWindow(o,s),await J.load(t,r),J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[])})),y.use((async({initialEventId:e,initialWindowSize:t})=>{if(!J)throw new z;return await J.load(e,t),J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[])})),w.use((()=>J?J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[]):[])),h.use((async({direction:e,size:t,makeRequest:r,requestLimit:o})=>{if(!J)throw new z;const n="forward"===e?i.default.EventTimeline.FORWARDS:i.default.EventTimeline.BACKWARDS;if(!await J.paginate(n,t,r,o))throw new L;return J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[])})),M.use((e=>{const t=P().getRoom(e);if(!t)throw new q;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.checkIsDirect=N,exports.client=P,exports.createOnSyncThrottled=e=>o.throttle({source:F,timeout:e}),exports.createRoomMessageBatch=e=>r.batchEvents(b,e),exports.deleteMessageFx=v,exports.editMessageFx=p,exports.getLoggedUserFx=T,exports.getRoomInfoFx=M,exports.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:r,height:o,resizeMethod:n,allowDefault:s=!0})=>{const i=P().getRoom(e);if(!i)return null;const a=i.getMember(t);return a?a.getAvatarUrl(P().getHomeserverUrl(),r,o,n,s,!0):null},exports.getRoomTimelineFx=x,exports.getRoomsWithActivitiesFx=E,exports.getSenderAvatarUrl=({sender:e,width:t,height:r,resizeMethod:o,allowDefault:n=!0,allowDirectLinks:s=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(P().getHomeserverUrl(),t,r,o,n,s):null,exports.getTimelineWindowMessagesFx=w,exports.initStoreFx=l,exports.initTimelineWindowFx=I,exports.loadTimelineWindowFx=y,exports.loginByPasswordFx=c,exports.loginByTokenFx=d,exports.onCachedState=C,exports.onClientEvent=_,exports.onInitialSync=A,exports.onSync=F,exports.paginateTimelineWindowFx=h,exports.prependClientParams=e=>{U=e},exports.readAllMessagesFx=R,exports.roomMessage=b,exports.searchRoomMessagesFx=g,exports.sendMessageFx=f,exports.startClientFx=u,exports.stopClientFx=m;
//# sourceMappingURL=matrix-effector.cjs.js.map
