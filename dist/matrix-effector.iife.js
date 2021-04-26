var MatrixEffector=function(e,t,n,o,r,i){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=a(t);const d=r.createDomain("matrix"),c=d.effect(),l=d.effect(),m=d.effect(),u=d.effect(),g=d.effect(),f=d.effect(),v=d.effect(),w=d.effect(),I=d.effect(),p=d.effect(),R=d.effect(),y=d.effect(),h=d.effect(),E=d.effect(),A=d.store(null),b=d.store(null),C=d.store([]),P=d.store(!1),x=d.store(!1),M=d.store(!1),D=d.store(null),F=d.store(!0),S=d.store(!0),T=d.event(),B=d.event(),U=d.event(),W=d.event(),k=d.event(),L=d.event(),N=d.event(),_=d.event(),O=d.event();let $,z;const j=[],K=()=>($||($=s.default.createClient(z),j.forEach((([e,t])=>{$.on(e,t)}))),$),G=e=>{j.push(...e)},Y=e=>{const t=K().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)},q=d.effect(),H=d.effect(),J=d.effect();function Q(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function V(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function X(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Q(t)),e}const Z="m.room.message",ee="m.room.redaction",te=i.createCustomError("RoomNotFound"),ne=i.createCustomError("TimelineWindowUndefined"),oe=i.createCustomError("EventNotFound"),re=i.createCustomError("ClientNotInitialized"),ie=i.createCustomError("UserNotLoggedIn"),ae=r.attach({source:[A,b],effect:J,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"backward",...e})}),se=r.attach({source:[A,b],effect:J,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"forward",...e})}),de=r.combine(A,b,((e,t)=>Boolean(e)&&Boolean(t))),ce=r.combine(de,M,x,P,((e,t,n,o)=>e&&!t&&!n&&!o));A.on(k,((e,{roomId:t})=>t)),b.on(q.doneData,((e,t)=>t)).reset(A);const le=r.guard({source:r.sample(A,[H.done,J.done],((e,{params:{roomId:t},result:n})=>({currentRoomId:e,roomId:t,...n}))),filter:({currentRoomId:e,roomId:t})=>e===t});function me(){return K().getRooms().map(V)}return C.on(le,((e,{messages:t})=>t)).reset(A),D.on(le,((e,{isLive:t})=>t)).reset(A),F.on(le,((e,{canPaginateBackward:t})=>t)).reset([N,A]),S.on(le,((e,{canPaginateForward:t})=>t)).reset([N,A]),r.forward({from:H.pending,to:P}),r.forward({from:se.pending,to:x}),r.forward({from:ae.pending,to:M}),r.forward({from:r.sample({source:b,clock:q.done,fn:()=>{}}),to:L}),r.guard({source:r.sample([A,b],N,(([e,t],{initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r}))),filter:de,target:H}),r.guard({source:O,filter:ce,target:ae}),r.guard({source:_,filter:ce,target:se}),r.forward({from:k,to:q}),h.use((()=>{const e=K();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),r.forward({from:c.done.map((()=>({initialSyncLimit:20}))),to:u}),c.use((e=>K().login("m.login.password",e))),l.use((e=>K().login("m.login.token",e))),m.use((async()=>{const{store:e}=K();if(e)return e.startup()})),u.use((e=>K().startClient(e))),f.use((async({term:e,roomId:n})=>{const o=K().getRoom(n);if(!o)throw new te;const r={};return(await K().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]}}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t.MatrixEvent(e),i=n.getSender();return void 0===r[i]&&(r[i]=o.getMember(i)),n.sender=r[i],Q(n)}))})),v.use((({roomId:e,content:t,txnId:n})=>K().sendMessage(e,t,n))),w.use((({roomId:e,eventId:t,body:n,txnId:o})=>K().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),I.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await K().redactEvent(e,t,void 0,o)).event_id}})),G([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==Z&&i!==ee||!n&&r.liveEvent&&T(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=me();W(e)}else{const e=me();B(e)}else{const e=me();U(e)}}]]),p.use((({roomId:e,eventId:t})=>{const n=K().getRoom(e);if(!n)throw new te;const o=n.findEventById(t);if(!o)throw new oe;return K().setRoomReadMarkers(e,t,o)})),R.use((e=>{const t=K();if(!t)throw new re;return e.map((e=>{var n;const o=t.getRoom(e.roomId);if(!o)throw new te;const r=o.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const n=r[e];if(o.hasUserReadEvent(t.getUserId(),n.getId()))break;i+=1}const a=r.filter((e=>[Z,ee].includes(e.getType()))).reduce(X,[]),s=a.length?a[a.length-1]:void 0,d=Y(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:s,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(n=c.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),g.use((()=>K().stopClient())),H.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:n,loadAdditionalDataDirection:o})=>{if(!e)throw new ne;await e.load(t,n);const r=e.canPaginate("f");let i=e.getEvents().filter((e=>[Z,ee].includes(e.getType()))).reduce(X,[]);if(n&&i.length<n){let t;const r=n-i.length;t="BACKWARD"===o?await e.paginate(s.default.EventTimeline.BACKWARDS,r):await e.paginate(s.default.EventTimeline.FORWARDS,r),t&&(i=e.getEvents().filter((e=>[Z,ee].includes(e.getType()))).reduce(X,[]))}return{messages:i,isLive:!r,canPaginateForward:r,canPaginateBackward:e.canPaginate("b")}})),J.use((async({timelineWindow:e,direction:t,size:n,makeRequest:o,requestLimit:r})=>{if(!e)throw new ne;const i="forward"===t?s.default.EventTimeline.FORWARDS:s.default.EventTimeline.BACKWARDS;await e.paginate(i,n,o,r);const a=e.canPaginate("f");return{messages:e.getEvents().filter((e=>[Z,ee].includes(e.getType()))).reduce(X,[]),isLive:!a,canPaginateForward:a,canPaginateBackward:e.canPaginate("b")}})),y.use((e=>{const t=K().getRoom(e);if(!t)throw new te;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),q.use((async({roomId:e})=>{const t=K(),n=K().getRoom(e);if(!n)throw new te;const o=n.getUnfilteredTimelineSet();return new s.default.TimelineWindow(t,o)})),E.use((({eventId:e,roomId:n})=>{const o=K();if(!o)throw new re;const r=o.getRoom(n);if(!r)throw new te;const i=r.findEventById(e);if(!i)throw new oe;const a=o.getUserId();if(!a)throw new ie;return{canRedact:r.currentState.maySendRedactionForEvent(i,a)&&"m.room.server_acl"!==i.getType(),canEdit:function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const n=e.getOriginalContent(),{msgtype:o}=n;return("m.text"===o||"m.emote"===o)&&Boolean(n.body)&&"string"==typeof n.body&&e.getSender()===K().getUserId()}(i)}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canPaginateBackward=F,e.$canPaginateForward=S,e.$currentRoomId=A,e.$isLive=D,e.$loadRoomFxPending=P,e.$messages=C,e.$paginateBackwardPending=M,e.$paginateForwardPending=x,e.$timelineWindow=b,e.checkEventPermissionsFx=E,e.checkIsDirect=Y,e.client=K,e.createOnSyncThrottled=e=>o.throttle({source:W,timeout:e}),e.createRoomMessageBatch=e=>n.batchEvents(T,e),e.deleteMessageFx=I,e.editMessageFx=w,e.getLoggedUserFx=h,e.getRoomInfoFx=y,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const a=K().getRoom(e);if(!a)return null;const s=a.getMember(t);return s?s.getAvatarUrl(K().getHomeserverUrl(),n,o,r,i,!0):null},e.getRoomsWithActivitiesFx=R,e.getSenderAvatarUrl=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(K().getHomeserverUrl(),t,n,o,r,i):null,e.initRoom=k,e.initStoreFx=m,e.loadRoom=N,e.loginByPasswordFx=c,e.loginByTokenFx=l,e.onCachedState=U,e.onClientEvent=G,e.onInitialSync=B,e.onRoomInitialized=L,e.onSync=W,e.paginateBackward=O,e.paginateForward=_,e.prependClientParams=e=>{z=e},e.readAllMessagesFx=p,e.roomMessage=T,e.searchRoomMessagesFx=f,e.sendMessageFx=v,e.startClientFx=u,e.stopClientFx=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effectorExtra,throttle,effector,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
