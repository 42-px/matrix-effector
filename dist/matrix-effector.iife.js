var MatrixEffector=function(e,t,n,o,r,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=s(t);const d=o.createDomain("matrix"),c=d.effect(),l=d.effect(),u=d.effect(),m=d.effect(),g=d.effect(),f=d.effect(),v=d.effect(),p=d.effect(),I=d.effect(),w=d.effect(),R=d.effect(),h=d.effect(),y=d.effect(),E=d.effect(),M=d.effect(),b=d.effect(),x=d.store(null),A=d.store(null),C=d.store([]),S=c.pending,T=d.store(!1),F=d.store(!1),P=d.store(null),D=d.store(null),U=d.event(),W=d.event(),L=d.event(),B=d.event(),_=d.event(),k=d.event(),N=d.event(),$=d.event(),O=o.combine(x,A,((e,t)=>Boolean(e)&&Boolean(t))),z=o.combine(O,F,T,c.pending,((e,t,n,o)=>e&&!t&&!n&&!o));let j,G;const Y=[],q=()=>(j||(j=a.default.createClient(G),Y.forEach((([e,t])=>{j.on(e,t)}))),j),H=e=>{Y.push(...e)},K=e=>{const t=q().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)};function J(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function Q(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function V(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(J(t)),e}const X="m.room.message",Z="m.room.redaction",ee=i.createCustomError("RoomNotFound"),te=i.createCustomError("TimelineWindowUndefined"),ne=i.createCustomError("EventNotFound"),oe=i.createCustomError("ClientNotInitialized"),re=o.attach({source:[x,A],effect:l,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"backward",...e})}),ie=o.attach({source:[x,A],effect:l,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"forward",...e})}),se=x.updates.filterMap((e=>null!==e||void 0));x.on(_,((e,{roomId:t})=>t)),A.on(b.doneData,((e,t)=>t)).reset(x.updates);const ae=o.guard({source:o.sample(x,[c.done,l.done],((e,{params:{roomId:t},result:{messages:n,isLive:o,eventsRetrieved:r}})=>({currentRoomId:e,roomId:t,messages:n,isLive:o,eventsRetrieved:r}))),filter:({currentRoomId:e,roomId:t})=>e===t});function de(){return q().getRooms().map(Q)}return C.on(ae,((e,{messages:t})=>t)).reset(x.updates),P.on(ae,((e,{isLive:t})=>t)).reset(se),D.on(ae,((e,{isLive:t})=>t)).reset(se),T.on(ie.pending.updates,((e,t)=>t)),F.on(re.pending.updates,((e,t)=>t)),o.guard({source:o.sample([x,A],k,(([e,t],{initialEventId:n,initialWindowSize:o})=>({roomId:e,timelineWindow:t,initialEventId:n,initialWindowSize:o}))),filter:O,target:c}),o.guard({source:$,filter:z,target:re}),o.guard({source:N,filter:z,target:ie}),M.use((()=>{const e=q();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),o.forward({from:u.done.map((()=>({initialSyncLimit:20}))),to:f}),u.use((e=>q().login("m.login.password",e))),m.use((e=>q().login("m.login.token",e))),g.use((async()=>{const{store:e}=q();if(e)return e.startup()})),f.use((e=>q().startClient(e))),p.use((async({term:e,roomId:n})=>{const o=q().getRoom(n);if(!o)throw new ee;const r={};return(await q().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]}}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t.MatrixEvent(e),i=n.getSender();return void 0===r[i]&&(r[i]=o.getMember(i)),n.sender=r[i],J(n)}))})),I.use((({roomId:e,content:t,txnId:n})=>q().sendMessage(e,t,n))),w.use((({roomId:e,eventId:t,body:n,txnId:o})=>q().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),R.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await q().redactEvent(e,t,void 0,o)).event_id}})),H([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==X&&i!==Z||!n&&r.liveEvent&&U(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=de();B(e)}else{const e=de();W(e)}else{const e=de();L(e)}}]]),h.use((({roomId:e,eventId:t})=>{const n=q().getRoom(e);if(!n)throw new ee;const o=n.findEventById(t);if(!o)throw new ne;return q().setRoomReadMarkers(e,t,o)})),y.use((e=>{const t=q();if(!t)throw new oe;return e.map((e=>{var n;const o=t.getRoom(e.roomId);if(!o)throw new ee;const r=o.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const n=r[e];if(o.hasUserReadEvent(t.getUserId(),n.getId()))break;i+=1}const s=r.filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]),a=s.length?s[s.length-1]:void 0,d=K(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:a,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(n=c.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),v.use((()=>q().stopClient())),c.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:n})=>{if(!e)throw new te;await e.load(t,n);const o=!e.canPaginate("f");let r=e.getEvents().filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]);if(n&&r.length<n){const t=r.length-n;await e.paginate(a.default.EventTimeline.BACKWARDS,t)&&(r=e.getEvents().filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]))}return{messages:r,isLive:o,eventsRetrieved:!0}})),l.use((async({timelineWindow:e,direction:t,size:n,makeRequest:o,requestLimit:r})=>{if(!e)throw new te;const i="forward"===t?a.default.EventTimeline.FORWARDS:a.default.EventTimeline.BACKWARDS,s=await e.paginate(i,n,o,r),d=!e.canPaginate("f");return{messages:e.getEvents().filter((e=>[X,Z].includes(e.getType()))).reduce(V,[]),isLive:d,eventsRetrieved:s}})),E.use((e=>{const t=q().getRoom(e);if(!t)throw new ee;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),b.use((async({roomId:e})=>{const t=q(),n=q().getRoom(e);if(!n)throw new ee;const o=n.getUnfilteredTimelineSet();return new a.default.TimelineWindow(t,o)})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canLoad=O,e.$canPaginate=z,e.$currentRoomId=x,e.$eventsRetrieved=D,e.$isLive=P,e.$loadRoomFxPending=S,e.$messages=C,e.$paginateBackwardPending=F,e.$paginateForwardPending=T,e.$timelineWindow=A,e.checkIsDirect=K,e.client=q,e.createOnSyncThrottled=e=>r.throttle({source:B,timeout:e}),e.createRoomMessageBatch=e=>n.batchEvents(U,e),e.deleteMessageFx=R,e.editMessageFx=w,e.getLoggedUserFx=M,e.getRoomInfoFx=E,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const s=q().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(q().getHomeserverUrl(),n,o,r,i,!0):null},e.getRoomsWithActivitiesFx=y,e.getSenderAvatarUrl=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(q().getHomeserverUrl(),t,n,o,r,i):null,e.initRoom=_,e.initRoomFx=b,e.initStoreFx=g,e.loadRoom=k,e.loginByPasswordFx=u,e.loginByTokenFx=m,e.onCachedState=L,e.onClientEvent=H,e.onInitialSync=W,e.onSync=B,e.paginateBackward=$,e.paginateForward=N,e.prependClientParams=e=>{G=e},e.readAllMessagesFx=h,e.roomMessage=U,e.searchRoomMessagesFx=p,e.sendMessageFx=I,e.startClientFx=f,e.stopClientFx=v,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effectorExtra,effector,throttle,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
