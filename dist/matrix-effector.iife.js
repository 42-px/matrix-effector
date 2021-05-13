var MatrixEffector=function(e,t,n,o,r,a){"use strict";function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=i(t);const d=r.createDomain("matrix"),c=d.effect(),l=d.effect(),m=d.effect(),u=d.effect(),g=d.effect(),f=d.effect(),v=d.effect(),w=d.effect(),I=d.effect(),p=d.effect(),y=d.effect(),R=d.effect(),h=d.effect(),E=d.effect(),b=d.store(null),A=d.store(null),P=d.store([]),C=d.store(!1),x=d.store(!1),F=d.store(!1),M=d.store(null),D=d.store(!0),S=d.store(!0),B=d.event(),T=d.event(),U=d.event(),W=d.event(),k=d.event(),_=d.event(),L=d.event(),N=d.event(),O=d.event();let $,z;const j=[],K=()=>($||($=s.default.createClient(z),j.forEach((([e,t])=>{$.on(e,t)}))),$),G=e=>{j.push(...e)},Y=e=>{const t=K().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)},q=d.event(),H=d.effect(),J=d.effect(),Q=d.effect(),V=d.effect();function X(e){const t={},n=e.getContent();return n.body&&(t.body=n.body),n.msgtype&&(t.msgtype=n.msgtype),n["m.relates_to"]&&(t["m.relates_to"]={...n["m.relates_to"]}),t}function Z(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:X(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function ee(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function te(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Z(t)),e}const ne="m.room.message",oe="m.room.redaction",re=a.createCustomError("RoomNotFound"),ae=a.createCustomError("TimelineWindowUndefined"),ie=a.createCustomError("EventNotFound"),se=a.createCustomError("ClientNotInitialized"),de=a.createCustomError("UserNotLoggedIn");function ce(e){return e.getEvents().filter((e=>[ne,oe].includes(e.getType()))).reduce(te,[])}const le=r.attach({source:[b,A],effect:Q,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"backward",...e})}),me=r.attach({source:[b,A],effect:Q,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"forward",...e})}),ue=r.combine(b,A,((e,t)=>Boolean(e)&&Boolean(t))),ge=r.combine(ue,F,x,C,((e,t,n,o)=>e&&!t&&!n&&!o));b.on(k,((e,{roomId:t})=>t)),A.on(H.doneData,((e,t)=>t)).reset(b);const fe=r.guard({source:r.sample(b,[J.done,Q.done,V.done],((e,{params:{roomId:t},result:n})=>({currentRoomId:e,roomId:t,...n}))),filter:({currentRoomId:e,roomId:t})=>e===t});function ve(){return K().getRooms().map(ee)}return P.on(fe,((e,{messages:t})=>t)).reset(b),M.on(fe,((e,{isLive:t})=>t)).reset(b),D.on(fe,((e,{canPaginateBackward:t})=>t)).reset([L,b]),S.on(fe,((e,{canPaginateForward:t})=>t)).reset([L,b]),r.forward({from:J.pending,to:C}),r.forward({from:me.pending,to:x}),r.forward({from:le.pending,to:F}),r.forward({from:r.sample({source:A,clock:H.done,fn:()=>{}}),to:_}),r.guard({source:r.sample([b,A],q,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:A.map((e=>Boolean(e))),target:V}),r.guard({source:r.sample([b,A],L,(([e,t],{initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r}))),filter:ue,target:J}),r.guard({source:O,filter:ge,target:le}),r.guard({source:N,filter:ge,target:me}),r.forward({from:k,to:H}),h.use((()=>{const e=K();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),r.forward({from:c.done.map((()=>({initialSyncLimit:20}))),to:u}),c.use((e=>K().login("m.login.password",e))),l.use((e=>K().login("m.login.token",e))),m.use((async()=>{const{store:e}=K();if(e)return e.startup()})),u.use((e=>K().startClient(e))),f.use((async({term:e,roomId:n,orderBy:o="rank"})=>{const r=K().getRoom(n);if(!r)throw new re;const a={};return(await K().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t.MatrixEvent(e),o=n.getSender();return void 0===a[o]&&(a[o]=r.getMember(o)),n.sender=a[o],Z(n)}))})),v.use((({roomId:e,content:t,txnId:n})=>K().sendMessage(e,t,n))),w.use((({roomId:e,eventId:t,body:n,txnId:o})=>K().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),I.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await K().redactEvent(e,t,void 0,o)).event_id}})),G([["Room.timeline",(e,t,n,o,r)=>{const a=e.getType();a!==ne&&a!==oe||!n&&r.liveEvent&&B(function(e){const t={eventId:e.getId(),content:X(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>q()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=ve();W(e)}else{const e=ve();T(e)}else{const e=ve();U(e)}}]]),p.use((({roomId:e,eventId:t})=>{const n=K().getRoom(e);if(!n)throw new re;const o=n.findEventById(t);if(!o)throw new ie;return K().setRoomReadMarkers(e,t,o)})),y.use((e=>{const t=K();if(!t)throw new se;return e.map((e=>{var n;const o=t.getRoom(e.roomId);if(!o)throw new re;const r=o.getLiveTimeline().getEvents();let a=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const n=r[e];if(o.hasUserReadEvent(t.getUserId(),n.getId()))break;a+=1}const i=r.filter((e=>[ne,oe].includes(e.getType()))).reduce(te,[]),s=i.length?i[i.length-1]:void 0,d=Y(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:s,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(n=c.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),g.use((()=>K().stopClient())),J.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:n,loadAdditionalDataDirection:o})=>{if(!e)throw new ae;await e.load(t,n);const r=e.canPaginate("f");let a=ce(e);if(n&&a.length<n){let t;const r=n-a.length;t="BACKWARD"===o?await e.paginate(s.default.EventTimeline.BACKWARDS,r):await e.paginate(s.default.EventTimeline.FORWARDS,r),t&&(a=ce(e))}return{messages:a,isLive:!r,canPaginateForward:r,canPaginateBackward:e.canPaginate("b")}})),Q.use((async({timelineWindow:e,direction:t,size:n,makeRequest:o,requestLimit:r})=>{if(!e)throw new ae;const a="forward"===t?s.default.EventTimeline.FORWARDS:s.default.EventTimeline.BACKWARDS;await e.paginate(a,n,o,r);const i=e.canPaginate("f");return{messages:ce(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),V.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:ce(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),R.use((e=>{const t=K().getRoom(e);if(!t)throw new re;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),H.use((async({roomId:e})=>{const t=K(),n=K().getRoom(e);if(!n)throw new re;const o=n.getUnfilteredTimelineSet();return new s.default.TimelineWindow(t,o)})),E.use((({eventId:e,roomId:n})=>{const o=K();if(!o)throw new se;const r=o.getRoom(n);if(!r)throw new re;const a=r.findEventById(e);if(!a)throw new ie;const i=o.getUserId();if(!i)throw new de;return{canRedact:r.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const n=e.getOriginalContent(),{msgtype:o}=n;return("m.text"===o||"m.emote"===o)&&Boolean(n.body)&&"string"==typeof n.body&&e.getSender()===K().getUserId()}(a)}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canPaginateBackward=D,e.$canPaginateForward=S,e.$currentRoomId=b,e.$isLive=M,e.$loadRoomFxPending=C,e.$messages=P,e.$paginateBackwardPending=F,e.$paginateForwardPending=x,e.$timelineWindow=A,e.checkEventPermissionsFx=E,e.checkIsDirect=Y,e.client=K,e.createOnSyncThrottled=e=>o.throttle({source:W,timeout:e}),e.createRoomMessageBatch=e=>n.batchEvents(B,e),e.deleteMessageFx=I,e.editMessageFx=w,e.getLoggedUserFx=h,e.getRoomInfoFx=R,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:a=!0})=>{const i=K().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(K().getHomeserverUrl(),n,o,r,a,!0):null},e.getRoomsWithActivitiesFx=y,e.getSenderAvatarUrl=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(K().getHomeserverUrl(),t,n,o,r,a):null,e.initRoom=k,e.initStoreFx=m,e.loadRoom=L,e.loginByPasswordFx=c,e.loginByTokenFx=l,e.onCachedState=U,e.onClientEvent=G,e.onInitialSync=T,e.onRoomInitialized=_,e.onSync=W,e.paginateBackward=O,e.paginateForward=N,e.prependClientParams=e=>{z=e},e.readAllMessagesFx=p,e.roomMessage=B,e.searchRoomMessagesFx=f,e.sendMessageFx=v,e.startClientFx=u,e.stopClientFx=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effectorExtra,throttle,effector,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
