var MatrixEffector=function(e,t,n,o,r,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=s(t);const c=n.createDomain("matrix"),d=c.effect(),l=c.effect(),u=c.effect(),m=c.effect(),f=c.effect(),g=c.effect(),v=c.effect(),w=c.effect(),I=c.effect(),h=c.effect(),y=c.effect(),R=c.effect(),p=c.effect(),E=c.effect(),x=c.effect(),M=c.effect(),T=c.effect(),C=c.effect(),F=c.event(),b=c.event(),A=c.event(),S=c.event();let D,P;const U=[],W=()=>(D||(D=a.default.createClient(P),U.forEach((([e,t])=>{D.on(e,t)}))),D),N=e=>{U.push(...e)},_=e=>{const t=W().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)};function O(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function k(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function B(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(O(t)),e}const j="m.room.message",z="m.room.redaction",L=i.createCustomError("RoomNotFound"),G=i.createCustomError("TimelineWindowUndefined"),Y=i.createCustomError("PaginationFail"),q=i.createCustomError("EventNotFound"),H=i.createCustomError("ClientNotInitialized");function J(){return W().getRooms().map(k)}let K;return n.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:m}),d.use((e=>W().login("m.login.password",e))),l.use((e=>W().login("m.login.token",e))),u.use((async()=>{const{store:e}=W();if(e)return e.startup()})),m.use((e=>W().startClient(e))),g.use((async e=>(await W().search(e)).search_categories.room_events.results.map((({result:e})=>O(new t.MatrixEvent(e)))))),v.use((e=>W().searchMessageText(e))),w.use((({roomId:e,content:t,txnId:n})=>W().sendMessage(e,t,n))),I.use((({roomId:e,eventId:t,body:n,txnId:o})=>W().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),h.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await W().redactEvent(e,t,void 0,o)).event_id}})),y.use((e=>{const t=W().getRoom(e);return t?t.timeline.filter((e=>[j,z].includes(e.getType()))).reduce(B,[]):[]})),N([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==j&&i!==z||!n&&r.liveEvent&&F(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=J();S(e)}else{const e=J();b(e)}else{const e=J();A(e)}}]]),M.use((({roomId:e,eventId:t})=>{const n=W().getRoom(e);if(!n)throw new L;const o=n.findEventById(t);if(!o)throw new q;return W().setRoomReadMarkers(e,t,o)})),T.use((e=>{const t=W();if(!t)throw new H;return e.map((e=>{const n=t.getRoom(e.roomId);if(!n)throw new L;const o=n.getLiveTimeline().getEvents();let r=0;for(let e=o.length-1;e>=0&&e!==o.length-99;e--){const i=o[e];if(n.hasUserReadEvent(t.getUserId(),i.getId()))break;r+=1}const i=o.filter((e=>[j,z].includes(e.getType()))).reduce(B,[]),s=i.length?i[i.length-1]:void 0,a=_(n.roomId),c=a?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:r,lastMessage:s,isDirect:a,directUserId:null==c?void 0:c.user.userId,isOnline:!!c&&c.user.currentlyActive,lastActivityTS:n.getLastActiveTimestamp()}}))})),f.use((()=>W().stopClient())),R.use((async({roomId:e,initialEventId:t,initialWindowSize:n})=>{const o=W(),r=W().getRoom(e);if(!r)throw new L;const i=r.getUnfilteredTimelineSet();return K=new a.default.TimelineWindow(o,i),await K.load(t,n),K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(B,[])})),E.use((async({initialEventId:e,initialWindowSize:t})=>{if(!K)throw new G;return await K.load(e,t),K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(B,[])})),p.use((()=>K?K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(B,[]):[])),x.use((async({direction:e,size:t,makeRequest:n,requestLimit:o})=>{if(!K)throw new G;const r="forward"===e?a.default.EventTimeline.FORWARDS:a.default.EventTimeline.BACKWARDS;if(!await K.paginate(r,t,n,o))throw new Y;return K.getEvents().filter((e=>[j,z].includes(e.getType()))).reduce(B,[])})),C.use((e=>{const t=W().getRoom(e);if(!t)throw new L;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.checkIsDirect=_,e.client=W,e.createOnSyncThrottled=e=>r.throttle({source:S,timeout:e}),e.createRoomMessageBatch=e=>o.batchEvents(F,e),e.deleteMessageFx=h,e.editMessageFx=I,e.getRoomInfoFx=C,e.getRoomMemberAvatar=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const s=W().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(W().getHomeserverUrl(),n,o,r,i,!0):null},e.getRoomTimelineFx=y,e.getRoomsWithActivitiesFx=T,e.getSenderAvatar=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(W().getHomeserverUrl(),t,n,o,r,i):null,e.getTimelineWindowMessagesFx=p,e.initStoreFx=u,e.initTimelineWindowFx=R,e.loadTimelineWindowFx=E,e.loginByPasswordFx=d,e.loginByTokenFx=l,e.onCachedState=A,e.onClientEvent=N,e.onInitialSync=b,e.onSync=S,e.paginateTimelineWindowFx=x,e.prependClientParams=e=>{P=e},e.readAllMessagesFx=M,e.roomMessage=F,e.searchFx=g,e.searchMessageTextFx=v,e.sendMessageFx=w,e.startClientFx=m,e.stopClientFx=f,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effector,effectorExtra,throttle,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
