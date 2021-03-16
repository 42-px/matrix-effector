"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("effector"),r=require("@42px/effector-extra"),o=require("patronum/throttle"),n=require("@42px/custom-errors");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=s(e);const a=t.createDomain("matrix"),c=a.effect(),d=a.effect(),l=a.effect(),u=a.effect(),m=a.effect(),f=a.effect(),g=a.effect(),p=a.effect(),x=a.effect(),v=a.effect(),w=a.effect(),I=a.effect(),h=a.effect(),y=a.effect(),R=a.effect(),E=a.effect(),M=a.effect(),T=a.effect(),C=a.event(),F=a.event(),b=a.event(),A=a.event();let S,D;const P=[],U=()=>(S||(S=i.default.createClient(D),P.forEach((([e,t])=>{S.on(e,t)}))),S),W=e=>{P.push(...e)},N=e=>{const t=U().getAccountData("m.direct"),r=t?Object.values(t.getContent()):[];let o=[];for(const e of r)o=[...o,...e];return!!o.includes(e)};function _(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function k(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function B(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(_(t)),e}const O="m.room.message",j="m.room.redaction",q=n.createCustomError("RoomNotFound"),z=n.createCustomError("TimelineWindowUndefined"),L=n.createCustomError("PaginationFail"),G=n.createCustomError("EventNotFound"),Y=n.createCustomError("ClientNotInitialized");function H(){return U().getRooms().map(k)}let J;t.forward({from:c.done.map((()=>({initialSyncLimit:20}))),to:u}),c.use((e=>U().login("m.login.password",e))),d.use((e=>U().login("m.login.token",e))),l.use((async()=>{const{store:e}=U();if(e)return e.startup()})),u.use((e=>U().startClient(e))),f.use((async t=>(await U().search(t)).search_categories.room_events.results.map((({result:t})=>_(new e.MatrixEvent(t)))))),g.use((e=>U().searchMessageText(e))),p.use((({roomId:e,content:t,txnId:r})=>U().sendMessage(e,t,r))),x.use((({roomId:e,eventId:t,body:r,txnId:o})=>U().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:r},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),v.use((async({roomId:e,eventId:t,reason:r})=>{const o=r?{reason:r}:void 0;return{eventId:(await U().redactEvent(e,t,void 0,o)).event_id}})),w.use((e=>{const t=U().getRoom(e);return t?t.timeline.filter((e=>[O,j].includes(e.getType()))).reduce(B,[]):[]})),W([["Room.timeline",(e,t,r,o,n)=>{const s=e.getType();s!==O&&s!==j||!r&&n.liveEvent&&C(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=H();A(e)}else{const e=H();F(e)}else{const e=H();b(e)}}]]),E.use((({roomId:e,eventId:t})=>{const r=U().getRoom(e);if(!r)throw new q;const o=r.findEventById(t);if(!o)throw new G;return U().setRoomReadMarkers(e,t,o)})),M.use((e=>{const t=U();if(!t)throw new Y;return e.map((e=>{const r=t.getRoom(e.roomId);if(!r)throw new q;const o=r.getLiveTimeline().getEvents();let n=0;for(let e=o.length-1;e>=0&&e!==o.length-99;e--){const s=o[e];if(r.hasUserReadEvent(t.getUserId(),s.getId()))break;n+=1}const s=o.filter((e=>[O,j].includes(e.getType()))).reduce(B,[]),i=s.length?s[s.length-1]:void 0,a=N(r.roomId),c=a?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:n,lastMessage:i,isDirect:a,directUserId:null==c?void 0:c.user.userId,isOnline:!!c&&Boolean(c.user.currentlyActive),lastActivityTS:r.getLastActiveTimestamp()}}))})),m.use((()=>U().stopClient())),I.use((async({roomId:e,initialEventId:t,initialWindowSize:r})=>{const o=U(),n=U().getRoom(e);if(!n)throw new q;const s=n.getUnfilteredTimelineSet();return J=new i.default.TimelineWindow(o,s),await J.load(t,r),J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[])})),y.use((async({initialEventId:e,initialWindowSize:t})=>{if(!J)throw new z;return await J.load(e,t),J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[])})),h.use((()=>J?J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[]):[])),R.use((async({direction:e,size:t,makeRequest:r,requestLimit:o})=>{if(!J)throw new z;const n="forward"===e?i.default.EventTimeline.FORWARDS:i.default.EventTimeline.BACKWARDS;if(!await J.paginate(n,t,r,o))throw new L;return J.getEvents().filter((e=>[O,j].includes(e.getType()))).reduce(B,[])})),T.use((e=>{const t=U().getRoom(e);if(!t)throw new q;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.checkIsDirect=N,exports.client=U,exports.createOnSyncThrottled=e=>o.throttle({source:A,timeout:e}),exports.createRoomMessageBatch=e=>r.batchEvents(C,e),exports.deleteMessageFx=v,exports.editMessageFx=x,exports.getRoomInfoFx=T,exports.getRoomMemberAvatar=({roomId:e,userId:t,width:r,height:o,resizeMethod:n,allowDefault:s=!0})=>{const i=U().getRoom(e);if(!i)return null;const a=i.getMember(t);return a?a.getAvatarUrl(U().getHomeserverUrl(),r,o,n,s,!0):null},exports.getRoomTimelineFx=w,exports.getRoomsWithActivitiesFx=M,exports.getSenderAvatar=({sender:e,width:t,height:r,resizeMethod:o,allowDefault:n=!0,allowDirectLinks:s=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(U().getHomeserverUrl(),t,r,o,n,s):null,exports.getTimelineWindowMessagesFx=h,exports.initStoreFx=l,exports.initTimelineWindowFx=I,exports.loadTimelineWindowFx=y,exports.loginByPasswordFx=c,exports.loginByTokenFx=d,exports.onCachedState=b,exports.onClientEvent=W,exports.onInitialSync=F,exports.onSync=A,exports.paginateTimelineWindowFx=R,exports.prependClientParams=e=>{D=e},exports.readAllMessagesFx=E,exports.roomMessage=C,exports.searchFx=f,exports.searchMessageTextFx=g,exports.sendMessageFx=p,exports.startClientFx=u,exports.stopClientFx=m;
//# sourceMappingURL=matrix-effector.cjs.js.map
