var MatrixEffector=function(e,t,n,r,o,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=s(t);const c=n.createDomain("matrix"),d=c.effect(),l=c.effect(),u=c.effect(),m=c.effect(),f=c.effect(),g=c.effect(),v=c.effect(),w=c.effect(),y=c.effect(),I=c.effect(),h=c.effect(),p=c.effect(),R=c.effect(),E=c.effect(),x=c.effect(),M=c.effect(),T=c.effect(),b=c.effect(),A=c.event(),C=c.event(),F=c.event(),S=c.event();let U,D;const P=[],_=()=>(U||(U=a.default.createClient(D),P.forEach((([e,t])=>{U.on(e,t)}))),U),N=e=>{P.push(...e)},W=e=>{const t=_().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let r=[];for(const e of n)r=[...r,...e];return!!r.includes(e)};function k(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function B(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function O(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(k(t)),e}const j="m.room.message",z="m.room.redaction",L=i.createCustomError("RoomNotFound"),G=i.createCustomError("TimelineWindowUndefined"),Y=i.createCustomError("PaginationFail"),q=i.createCustomError("EventNotFound"),H=i.createCustomError("ClientNotInitialized");function J(){return _().getRooms().map(B)}let K;return b.use((()=>{const e=_();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),n.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:m}),d.use((e=>_().login("m.login.password",e))),l.use((e=>_().login("m.login.token",e))),u.use((async()=>{const{store:e}=_();if(e)return e.startup()})),m.use((e=>_().startClient(e))),g.use((async({term:e,roomId:n})=>{const r=_().getRoom(n);if(!r)throw new L;const o={};return(await _().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]}}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t.MatrixEvent(e),i=n.getSender();return void 0===o[i]&&(o[i]=r.getMember(i)),n.sender=o[i],k(n)}))})),v.use((({roomId:e,content:t,txnId:n})=>_().sendMessage(e,t,n))),w.use((({roomId:e,eventId:t,body:n,txnId:r})=>_().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),y.use((async({roomId:e,eventId:t,reason:n})=>{const r=n?{reason:n}:void 0;return{eventId:(await _().redactEvent(e,t,void 0,r)).event_id}})),I.use((e=>{const t=_().getRoom(e);return t?t.timeline.filter((e=>[j,z].includes(e.getType()))).reduce(O,[]):[]})),N([["Room.timeline",(e,t,n,r,o)=>{const i=e.getType();i!==j&&i!==z||!n&&o.liveEvent&&A(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=J();S(e)}else{const e=J();C(e)}else{const e=J();F(e)}}]]),x.use((({roomId:e,eventId:t})=>{const n=_().getRoom(e);if(!n)throw new L;const r=n.findEventById(t);if(!r)throw new q;return _().setRoomReadMarkers(e,t,r)})),M.use((e=>{const t=_();if(!t)throw new H;return e.map((e=>{const n=t.getRoom(e.roomId);if(!n)throw new L;const r=n.getLiveTimeline().getEvents();let o=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const i=r[e];if(n.hasUserReadEvent(t.getUserId(),i.getId()))break;o+=1}const i=r.filter((e=>[j,z].includes(e.getType()))).reduce(O,[]),s=i.length?i[i.length-1]:void 0,a=W(n.roomId),c=a?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:o,lastMessage:s,isDirect:a,directUserId:null==c?void 0:c.user.userId,isOnline:c?Boolean(c.user.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}))})),f.use((()=>_().stopClient())),h.use((async({roomId:e,initialEventId:t,initialWindowSize:n})=>{const r=_(),o=_().getRoom(e);if(!o)throw new L;const i=o.getUnfilteredTimelineSet();return K=new a.default.TimelineWindow(r,i),await K.load(t,n),K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(O,[])})),R.use((async({initialEventId:e,initialWindowSize:t})=>{if(!K)throw new G;return await K.load(e,t),K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(O,[])})),p.use((()=>K?K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(O,[]):[])),E.use((async({direction:e,size:t,makeRequest:n,requestLimit:r})=>{if(!K)throw new G;const o="forward"===e?a.default.EventTimeline.FORWARDS:a.default.EventTimeline.BACKWARDS;if(!await K.paginate(o,t,n,r))throw new Y;return K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(O,[])})),T.use((e=>{const t=_().getRoom(e);if(!t)throw new L;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.checkIsDirect=W,e.client=_,e.createOnSyncThrottled=e=>o.throttle({source:S,timeout:e}),e.createRoomMessageBatch=e=>r.batchEvents(A,e),e.deleteMessageFx=y,e.editMessageFx=w,e.getLoggedUserFx=b,e.getRoomInfoFx=T,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:n,height:r,resizeMethod:o,allowDefault:i=!0})=>{const s=_().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(_().getHomeserverUrl(),n,r,o,i,!0):null},e.getRoomTimelineFx=I,e.getRoomsWithActivitiesFx=M,e.getSenderAvatarUrl=({sender:e,width:t,height:n,resizeMethod:r,allowDefault:o=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(_().getHomeserverUrl(),t,n,r,o,i):null,e.getTimelineWindowMessagesFx=p,e.initStoreFx=u,e.initTimelineWindowFx=h,e.loadTimelineWindowFx=R,e.loginByPasswordFx=d,e.loginByTokenFx=l,e.onCachedState=F,e.onClientEvent=N,e.onInitialSync=C,e.onSync=S,e.paginateTimelineWindowFx=E,e.prependClientParams=e=>{D=e},e.readAllMessagesFx=x,e.roomMessage=A,e.searchRoomMessagesFx=g,e.sendMessageFx=v,e.startClientFx=m,e.stopClientFx=f,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effector,effectorExtra,throttle,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
