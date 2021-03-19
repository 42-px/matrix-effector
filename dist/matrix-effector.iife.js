var MatrixEffector=function(e,t,n,r,o,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=s(t);const c=n.createDomain("matrix"),d=c.effect(),l=c.effect(),u=c.effect(),m=c.effect(),f=c.effect(),g=c.effect(),v=c.effect(),I=c.effect(),w=c.effect(),y=c.effect(),h=c.effect(),p=c.effect(),R=c.effect(),E=c.effect(),x=c.effect(),T=c.effect(),M=c.effect(),A=c.effect(),C=c.effect(),F=c.event(),b=c.event(),S=c.event(),U=c.event();let D,P;const N=[],W=()=>(D||(D=a.default.createClient(P),N.forEach((([e,t])=>{D.on(e,t)}))),D),_=e=>{N.push(...e)},B=e=>{const t=W().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let r=[];for(const e of n)r=[...r,...e];return!!r.includes(e)};function O(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function k(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function j(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(O(t)),e}const z="m.room.message",L="m.room.redaction",G=i.createCustomError("RoomNotFound"),Y=i.createCustomError("TimelineWindowUndefined"),q=i.createCustomError("PaginationFail"),H=i.createCustomError("EventNotFound"),J=i.createCustomError("ClientNotInitialized");function K(){return W().getRooms().map(k)}let Q;return C.use((()=>{const e=W();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),n.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:m}),d.use((e=>W().login("m.login.password",e))),l.use((e=>W().login("m.login.token",e))),u.use((async()=>{const{store:e}=W();if(e)return e.startup()})),m.use((e=>W().startClient(e))),g.use((async e=>(await W().search(e)).search_categories.room_events.results.map((({result:e})=>O(new t.MatrixEvent(e)))))),v.use((e=>W().searchMessageText(e))),I.use((({roomId:e,content:t,txnId:n})=>W().sendMessage(e,t,n))),w.use((({roomId:e,eventId:t,body:n,txnId:r})=>W().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),y.use((async({roomId:e,eventId:t,reason:n})=>{const r=n?{reason:n}:void 0;return{eventId:(await W().redactEvent(e,t,void 0,r)).event_id}})),h.use((e=>{const t=W().getRoom(e);return t?t.timeline.filter((e=>[z,L].includes(e.getType()))).reduce(j,[]):[]})),_([["Room.timeline",(e,t,n,r,o)=>{const i=e.getType();i!==z&&i!==L||!n&&o.liveEvent&&F(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=K();U(e)}else{const e=K();b(e)}else{const e=K();S(e)}}]]),T.use((({roomId:e,eventId:t})=>{const n=W().getRoom(e);if(!n)throw new G;const r=n.findEventById(t);if(!r)throw new H;return W().setRoomReadMarkers(e,t,r)})),M.use((e=>{const t=W();if(!t)throw new J;return e.map((e=>{const n=t.getRoom(e.roomId);if(!n)throw new G;const r=n.getLiveTimeline().getEvents();let o=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const i=r[e];if(n.hasUserReadEvent(t.getUserId(),i.getId()))break;o+=1}const i=r.filter((e=>[z,L].includes(e.getType()))).reduce(j,[]),s=i.length?i[i.length-1]:void 0,a=B(n.roomId),c=a?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:o,lastMessage:s,isDirect:a,directUserId:null==c?void 0:c.user.userId,isOnline:c?Boolean(c.user.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}))})),f.use((()=>W().stopClient())),p.use((async({roomId:e,initialEventId:t,initialWindowSize:n})=>{const r=W(),o=W().getRoom(e);if(!o)throw new G;const i=o.getUnfilteredTimelineSet();return Q=new a.default.TimelineWindow(r,i),await Q.load(t,n),Q.getEvents().filter((e=>[z,L].includes(e.getType()))).reduce(j,[])})),E.use((async({initialEventId:e,initialWindowSize:t})=>{if(!Q)throw new Y;return await Q.load(e,t),Q.getEvents().filter((e=>[z,L].includes(e.getType()))).reduce(j,[])})),R.use((()=>Q?Q.getEvents().filter((e=>[z,L].includes(e.getType()))).reduce(j,[]):[])),x.use((async({direction:e,size:t,makeRequest:n,requestLimit:r})=>{if(!Q)throw new Y;const o="forward"===e?a.default.EventTimeline.FORWARDS:a.default.EventTimeline.BACKWARDS;if(!await Q.paginate(o,t,n,r))throw new q;return Q.getEvents().filter((e=>[z,L].includes(e.getType()))).reduce(j,[])})),A.use((e=>{const t=W().getRoom(e);if(!t)throw new G;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.checkIsDirect=B,e.client=W,e.createOnSyncThrottled=e=>o.throttle({source:U,timeout:e}),e.createRoomMessageBatch=e=>r.batchEvents(F,e),e.deleteMessageFx=y,e.editMessageFx=w,e.getLoggedUser=C,e.getRoomInfoFx=A,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:n,height:r,resizeMethod:o,allowDefault:i=!0})=>{const s=W().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(W().getHomeserverUrl(),n,r,o,i,!0):null},e.getRoomTimelineFx=h,e.getRoomsWithActivitiesFx=M,e.getSenderAvatarUrl=({sender:e,width:t,height:n,resizeMethod:r,allowDefault:o=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(W().getHomeserverUrl(),t,n,r,o,i):null,e.getTimelineWindowMessagesFx=R,e.initStoreFx=u,e.initTimelineWindowFx=p,e.loadTimelineWindowFx=E,e.loginByPasswordFx=d,e.loginByTokenFx=l,e.onCachedState=S,e.onClientEvent=_,e.onInitialSync=b,e.onSync=U,e.paginateTimelineWindowFx=x,e.prependClientParams=e=>{P=e},e.readAllMessagesFx=T,e.roomMessage=F,e.searchFx=g,e.searchMessageTextFx=v,e.sendMessageFx=I,e.startClientFx=m,e.stopClientFx=f,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effector,effectorExtra,throttle,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
