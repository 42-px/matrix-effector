!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("effector"),require("@42px/effector-extra"),require("patronum/throttle"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","effector","@42px/effector-extra","patronum/throttle","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.effector,e.effectorExtra,e.throttle,e.customErrors)}(this,(function(e,t,n,r,o,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=s(t);const c=n.createDomain("matrix"),d=c.effect(),l=c.effect(),u=c.effect(),f=c.effect(),m=c.effect(),g=c.effect(),v=c.effect(),p=c.effect(),h=c.effect(),w=c.effect(),x=c.effect(),y=c.effect(),I=c.effect(),R=c.effect(),E=c.effect(),T=c.effect(),M=c.effect(),b=c.effect(),C=c.event(),F=c.event(),A=c.event(),S=c.event();let D,P;const U=[],W=()=>(D||(D=a.default.createClient(P),U.forEach((([e,t])=>{D.on(e,t)}))),D),j=e=>{U.push(...e)},k=e=>{const t=W().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let r=[];for(const e of n)r=[...r,...e];return!!r.includes(e)};function N(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function _(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function O(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(N(t)),e}const q="m.room.message",B="m.room.redaction",z=i.createCustomError("RoomNotFound"),L=i.createCustomError("TimelineWindowUndefined"),G=i.createCustomError("PaginationFail"),Y=i.createCustomError("EventNotFound"),H=i.createCustomError("ClientNotInitialized");function J(){return W().getRooms().map(_)}let K;n.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:f}),d.use((e=>W().login("m.login.password",e))),l.use((e=>W().login("m.login.token",e))),u.use((async()=>{const{store:e}=W();if(e)return e.startup()})),f.use((e=>W().startClient(e))),g.use((async e=>(await W().search(e)).search_categories.room_events.results.map((({result:e})=>N(new t.MatrixEvent(e)))))),v.use((e=>W().searchMessageText(e))),p.use((({roomId:e,content:t,txnId:n})=>W().sendMessage(e,t,n))),h.use((({roomId:e,eventId:t,body:n,txnId:r})=>W().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),w.use((async({roomId:e,eventId:t,reason:n})=>{const r=n?{reason:n}:void 0;return{eventId:(await W().redactEvent(e,t,void 0,r)).event_id}})),x.use((e=>{const t=W().getRoom(e);return t?t.timeline.filter((e=>[q,B].includes(e.getType()))).reduce(O,[]):[]})),j([["Room.timeline",(e,t,n,r,o)=>{const i=e.getType();i!==q&&i!==B||!n&&o.liveEvent&&C(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=J();S(e)}else{const e=J();F(e)}else{const e=J();A(e)}}]]),T.use((({roomId:e,eventId:t})=>{const n=W().getRoom(e);if(!n)throw new z;const r=n.findEventById(t);if(!r)throw new Y;return W().setRoomReadMarkers(e,t,r)})),M.use((e=>{const t=W();if(!t)throw new H;return e.map((e=>{const n=t.getRoom(e.roomId);if(!n)throw new z;const r=n.getLiveTimeline().getEvents();let o=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const i=r[e];if(n.hasUserReadEvent(t.getUserId(),i.getId()))break;o+=1}const i=r.filter((e=>[q,B].includes(e.getType()))).reduce(O,[]),s=i.length?i[i.length-1]:void 0,a=k(n.roomId),c=a?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:o,lastMessage:s,isDirect:a,directUserId:null==c?void 0:c.user.userId,isOnline:!!c&&c.user.currentlyActive,lastActivityTS:n.getLastActiveTimestamp()}}))})),m.use((()=>W().stopClient())),y.use((async({roomId:e,initialEventId:t,initialWindowSize:n})=>{const r=W(),o=W().getRoom(e);if(!o)throw new z;const i=o.getUnfilteredTimelineSet();return K=new a.default.TimelineWindow(r,i),await K.load(t,n),K.getEvents().filter((e=>[q,B].includes(e.getType()))).reduce(O,[])})),R.use((async({initialEventId:e,initialWindowSize:t})=>{if(!K)throw new L;return await K.load(e,t),K.getEvents().filter((e=>[q,B].includes(e.getType()))).reduce(O,[])})),I.use((()=>K?K.getEvents().filter((e=>[q,B].includes(e.getType()))).reduce(O,[]):[])),E.use((async({direction:e,size:t,makeRequest:n,requestLimit:r})=>{if(!K)throw new L;const o="forward"===e?a.default.EventTimeline.FORWARDS:a.default.EventTimeline.BACKWARDS;if(!await K.paginate(o,t,n,r))throw new G;return K.getEvents().filter((e=>[q,B].includes(e.getType()))).reduce(O,[])})),b.use((e=>{const t=W().getRoom(e);if(!t)throw new z;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.checkIsDirect=k,e.client=W,e.createOnSyncThrottled=e=>o.throttle({source:S,timeout:e}),e.createRoomMessageBatch=e=>r.batchEvents(C,e),e.deleteMessageFx=w,e.editMessageFx=h,e.getRoomInfoFx=b,e.getRoomMemberAvatar=({roomId:e,userId:t,width:n,height:r,resizeMethod:o,allowDefault:i=!0})=>{const s=W().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(W().getHomeserverUrl(),n,r,o,i,!0):null},e.getRoomTimelineFx=x,e.getRoomsWithActivitiesFx=M,e.getSenderAvatar=({sender:e,width:t,height:n,resizeMethod:r,allowDefault:o=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(W().getHomeserverUrl(),t,n,r,o,i):null,e.getTimelineWindowMessagesFx=I,e.initStoreFx=u,e.initTimelineWindowFx=y,e.loadTimelineWindowFx=R,e.loginByPasswordFx=d,e.loginByTokenFx=l,e.onCachedState=A,e.onClientEvent=j,e.onInitialSync=F,e.onSync=S,e.paginateTimelineWindowFx=E,e.prependClientParams=e=>{P=e},e.readAllMessagesFx=T,e.roomMessage=C,e.searchFx=g,e.searchMessageTextFx=v,e.sendMessageFx=p,e.startClientFx=f,e.stopClientFx=m,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
