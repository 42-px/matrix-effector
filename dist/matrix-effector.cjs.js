"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("@42px/effector-extra"),r=require("effector"),o=require("patronum/throttle"),n=require("@42px/custom-errors");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=s(e);const i=r.createDomain("matrix"),d=i.effect(),c=i.effect(),l=i.effect(),u=i.effect(),m=i.effect(),g=i.effect(),f=i.effect(),p=i.effect(),v=i.effect(),x=i.effect(),w=i.effect(),I=i.effect(),R=i.effect(),h=i.effect(),y=i.store(null),E=i.store(null),P=i.store([]),b=i.store(!1),A=i.store(!1),M=i.store(!1),C=i.store(null),F=i.store(!0),S=i.store(!0),T=i.event(),B=i.event(),k=i.event(),D=i.event(),U=i.event(),W=i.event(),_=i.event(),L=i.event(),N=r.combine(y,E,((e,t)=>Boolean(e)&&Boolean(t))),$=r.combine(N,M,A,b,((e,t,r,o)=>e&&!t&&!r&&!o));let O,j;const q=[],z=()=>(O||(O=a.default.createClient(j),q.forEach((([e,t])=>{O.on(e,t)}))),O),G=e=>{q.push(...e)},Y=e=>{const t=z().getAccountData("m.direct"),r=t?Object.values(t.getContent()):[];let o=[];for(const e of r)o=[...o,...e];return!!o.includes(e)},H=i.effect(),K=i.effect();function J(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function Q(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function V(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(J(t)),e}const X="m.room.message",Z="m.room.redaction",ee=n.createCustomError("RoomNotFound"),te=n.createCustomError("TimelineWindowUndefined"),re=n.createCustomError("EventNotFound"),oe=n.createCustomError("ClientNotInitialized"),ne=r.attach({source:[y,E],effect:K,mapParams:(e,[t,r])=>({roomId:t,timelineWindow:r,direction:"backward",...e})}),se=r.attach({source:[y,E],effect:K,mapParams:(e,[t,r])=>({roomId:t,timelineWindow:r,direction:"forward",...e})});y.on(U,((e,{roomId:t})=>t)),E.on(h.doneData,((e,t)=>t)).reset(y.updates);const ae=r.guard({source:r.sample(y,[H.done,K.done],((e,{params:{roomId:t},result:r})=>({currentRoomId:e,roomId:t,...r}))),filter:({currentRoomId:e,roomId:t})=>e===t});function ie(){return z().getRooms().map(Q)}P.on(ae,((e,{messages:t})=>t)).reset(y.updates),C.on(ae,((e,{isLive:t})=>t)).reset(y.updates),F.on(ae,((e,{canPaginateBackward:t})=>t)).reset([W,y.updates]),S.on(ae,((e,{canPaginateForward:t})=>t)).reset([W,y.updates]),r.forward({from:H.pending,to:b}),r.forward({from:se.pending,to:A}),r.forward({from:ne.pending,to:M}),r.guard({source:r.sample([y,E],W,(([e,t],{initialEventId:r,initialWindowSize:o})=>({roomId:e,timelineWindow:t,initialEventId:r,initialWindowSize:o}))),filter:N,target:H}),r.guard({source:L,filter:$,target:ne}),r.guard({source:_,filter:$,target:se}),R.use((()=>{const e=z();if(!e)return null;const t=e.getUserId();if(!t)return null;const r=e.getUser(t);return r?{userId:r.userId,currentlyActive:r.currentlyActive,displayName:r.displayName,lastActiveAgo:r.lastActiveAgo,lastPresenceTs:r.lastPresenceTs,presence:r.presence}:null})),r.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:u}),d.use((e=>z().login("m.login.password",e))),c.use((e=>z().login("m.login.token",e))),l.use((async()=>{const{store:e}=z();if(e)return e.startup()})),u.use((e=>z().startClient(e))),g.use((async({term:t,roomId:r})=>{const o=z().getRoom(r);if(!o)throw new ee;const n={};return(await z().search({body:{search_categories:{room_events:{search_term:t,keys:["content.body"],filter:{rooms:[r]}}}}})).search_categories.room_events.results.map((({result:t})=>{const r=new e.MatrixEvent(t),s=r.getSender();return void 0===n[s]&&(n[s]=o.getMember(s)),r.sender=n[s],J(r)}))})),f.use((({roomId:e,content:t,txnId:r})=>z().sendMessage(e,t,r))),p.use((({roomId:e,eventId:t,body:r,txnId:o})=>z().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:r},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),v.use((async({roomId:e,eventId:t,reason:r})=>{const o=r?{reason:r}:void 0;return{eventId:(await z().redactEvent(e,t,void 0,o)).event_id}})),G([["Room.timeline",(e,t,r,o,n)=>{const s=e.getType();s!==X&&s!==Z||!r&&n.liveEvent&&T(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=ie();D(e)}else{const e=ie();B(e)}else{const e=ie();k(e)}}]]),x.use((({roomId:e,eventId:t})=>{const r=z().getRoom(e);if(!r)throw new ee;const o=r.findEventById(t);if(!o)throw new re;return z().setRoomReadMarkers(e,t,o)})),w.use((e=>{const t=z();if(!t)throw new oe;return e.map((e=>{var r;const o=t.getRoom(e.roomId);if(!o)throw new ee;const n=o.getLiveTimeline().getEvents();let s=0;for(let e=n.length-1;e>=0&&e!==n.length-99;e--){const r=n[e];if(o.hasUserReadEvent(t.getUserId(),r.getId()))break;s+=1}const a=n.filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]),i=a.length?a[a.length-1]:void 0,d=Y(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:s,lastMessage:i,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(r=c.user)||void 0===r?void 0:r.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),m.use((()=>z().stopClient())),H.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:r})=>{if(!e)throw new te;await e.load(t,r);const o=e.canPaginate("f");let n=e.getEvents().filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]);if(r&&n.length<r){const t=n.length-r;await e.paginate(a.default.EventTimeline.BACKWARDS,t)&&(n=e.getEvents().filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]))}return{messages:n,isLive:!o,canPaginateForward:o,canPaginateBackward:e.canPaginate("b")}})),K.use((async({timelineWindow:e,direction:t,size:r,makeRequest:o,requestLimit:n})=>{if(!e)throw new te;const s="forward"===t?a.default.EventTimeline.FORWARDS:a.default.EventTimeline.BACKWARDS;await e.paginate(s,r,o,n);const i=e.canPaginate("f");return{messages:e.getEvents().filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),I.use((e=>{const t=z().getRoom(e);if(!t)throw new ee;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),h.use((async({roomId:e})=>{const t=z(),r=z().getRoom(e);if(!r)throw new ee;const o=r.getUnfilteredTimelineSet();return new a.default.TimelineWindow(t,o)})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canLoad=N,exports.$canPaginate=$,exports.$canPaginateBackward=F,exports.$canPaginateForward=S,exports.$currentRoomId=y,exports.$isLive=C,exports.$loadRoomFxPending=b,exports.$messages=P,exports.$paginateBackwardPending=M,exports.$paginateForwardPending=A,exports.$timelineWindow=E,exports.checkIsDirect=Y,exports.client=z,exports.createOnSyncThrottled=e=>o.throttle({source:D,timeout:e}),exports.createRoomMessageBatch=e=>t.batchEvents(T,e),exports.deleteMessageFx=v,exports.editMessageFx=p,exports.getLoggedUserFx=R,exports.getRoomInfoFx=I,exports.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:r,height:o,resizeMethod:n,allowDefault:s=!0})=>{const a=z().getRoom(e);if(!a)return null;const i=a.getMember(t);return i?i.getAvatarUrl(z().getHomeserverUrl(),r,o,n,s,!0):null},exports.getRoomsWithActivitiesFx=w,exports.getSenderAvatarUrl=({sender:e,width:t,height:r,resizeMethod:o,allowDefault:n=!0,allowDirectLinks:s=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(z().getHomeserverUrl(),t,r,o,n,s):null,exports.initRoom=U,exports.initRoomFx=h,exports.initStoreFx=l,exports.loadRoom=W,exports.loginByPasswordFx=d,exports.loginByTokenFx=c,exports.onCachedState=k,exports.onClientEvent=G,exports.onInitialSync=B,exports.onSync=D,exports.paginateBackward=L,exports.paginateForward=_,exports.prependClientParams=e=>{j=e},exports.readAllMessagesFx=x,exports.roomMessage=T,exports.searchRoomMessagesFx=g,exports.sendMessageFx=f,exports.startClientFx=u,exports.stopClientFx=m;
//# sourceMappingURL=matrix-effector.cjs.js.map
