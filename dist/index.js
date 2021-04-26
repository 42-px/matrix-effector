import e,{MatrixEvent as t,EventStatus as n}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{batchEvents as o}from"@42px/effector-extra";import{throttle as r}from"patronum/throttle";import{createDomain as i,attach as s,combine as a,guard as d,sample as c,forward as l}from"effector";import{createCustomError as m}from"@42px/custom-errors";const u=i("matrix"),f=u.effect(),g=u.effect(),v=u.effect(),w=u.effect(),I=u.effect(),p=u.effect(),y=u.effect(),R=u.effect(),h=u.effect(),A=u.effect(),E=u.effect(),D=u.effect(),T=u.effect(),C=u.effect(),S=u.store(null),b=u.store(null),P=u.store([]),U=u.store(!1),W=u.store(!1),B=u.store(!1),x=u.store(null),M=u.store(!0),k=u.store(!0),N=u.event(),L=e=>o(N,e),_=u.event(),F=u.event(),z=u.event(),O=e=>r({source:z,timeout:e}),K=u.event(),j=u.event(),G=u.event(),Y=u.event(),q=u.event();let H,J;const Q=[],V=()=>(H||(H=e.createClient(J),Q.forEach((([e,t])=>{H.on(e,t)}))),H),X=e=>{J=e},Z=e=>{Q.push(...e)},$=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(V().getHomeserverUrl(),t,n,o,r,i):null,ee=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const s=V().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(V().getHomeserverUrl(),n,o,r,i,!0):null},te=e=>{const t=V().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)},ne=u.effect(),oe=u.effect(),re=u.effect();function ie(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function se(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function ae(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(ie(t)),e}const de="m.room.message",ce="m.room.redaction",le=m("RoomNotFound"),me=m("TimelineWindowUndefined"),ue=m("EventNotFound"),fe=m("ClientNotInitialized"),ge=m("UserNotLoggedIn"),ve=s({source:[S,b],effect:re,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"backward",...e})}),we=s({source:[S,b],effect:re,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"forward",...e})}),Ie=a(S,b,((e,t)=>Boolean(e)&&Boolean(t))),pe=a(Ie,B,W,U,((e,t,n,o)=>e&&!t&&!n&&!o));S.on(K,((e,{roomId:t})=>t)),b.on(ne.doneData,((e,t)=>t)).reset(S);const ye=d({source:c(S,[oe.done,re.done],((e,{params:{roomId:t},result:n})=>({currentRoomId:e,roomId:t,...n}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Re(){return V().getRooms().map(se)}P.on(ye,((e,{messages:t})=>t)).reset(S),x.on(ye,((e,{isLive:t})=>t)).reset(S),M.on(ye,((e,{canPaginateBackward:t})=>t)).reset([G,S]),k.on(ye,((e,{canPaginateForward:t})=>t)).reset([G,S]),l({from:oe.pending,to:U}),l({from:we.pending,to:W}),l({from:ve.pending,to:B}),l({from:c({source:b,clock:ne.done,fn:()=>{}}),to:j}),d({source:c([S,b],G,(([e,t],{initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r}))),filter:Ie,target:oe}),d({source:q,filter:pe,target:ve}),d({source:Y,filter:pe,target:we}),l({from:K,to:ne}),T.use((()=>{const e=V();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),l({from:f.done.map((()=>({initialSyncLimit:20}))),to:w}),f.use((e=>V().login("m.login.password",e))),g.use((e=>V().login("m.login.token",e))),v.use((async()=>{const{store:e}=V();if(e)return e.startup()})),w.use((e=>V().startClient(e))),p.use((async({term:e,roomId:n})=>{const o=V().getRoom(n);if(!o)throw new le;const r={};return(await V().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]}}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t(e),i=n.getSender();return void 0===r[i]&&(r[i]=o.getMember(i)),n.sender=r[i],ie(n)}))})),y.use((({roomId:e,content:t,txnId:n})=>V().sendMessage(e,t,n))),R.use((({roomId:e,eventId:t,body:n,txnId:o})=>V().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),h.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await V().redactEvent(e,t,void 0,o)).event_id}})),Z([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==de&&i!==ce||!n&&r.liveEvent&&N(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Re();z(e)}else{const e=Re();_(e)}else{const e=Re();F(e)}}]]),A.use((({roomId:e,eventId:t})=>{const n=V().getRoom(e);if(!n)throw new le;const o=n.findEventById(t);if(!o)throw new ue;return V().setRoomReadMarkers(e,t,o)})),E.use((e=>{const t=V();if(!t)throw new fe;return e.map((e=>{var n;const o=t.getRoom(e.roomId);if(!o)throw new le;const r=o.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const n=r[e];if(o.hasUserReadEvent(t.getUserId(),n.getId()))break;i+=1}const s=r.filter((e=>[de,ce].includes(e.getType()))).reduce(ae,[]),a=s.length?s[s.length-1]:void 0,d=te(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:a,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(n=c.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),I.use((()=>V().stopClient())),oe.use((async({timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!t)throw new me;await t.load(n,o);const i=t.canPaginate("f");let s=t.getEvents().filter((e=>[de,ce].includes(e.getType()))).reduce(ae,[]);if(o&&s.length<o){let n;const i=o-s.length;n="BACKWARD"===r?await t.paginate(e.EventTimeline.BACKWARDS,i):await t.paginate(e.EventTimeline.FORWARDS,i),n&&(s=t.getEvents().filter((e=>[de,ce].includes(e.getType()))).reduce(ae,[]))}return{messages:s,isLive:!i,canPaginateForward:i,canPaginateBackward:t.canPaginate("b")}})),re.use((async({timelineWindow:t,direction:n,size:o,makeRequest:r,requestLimit:i})=>{if(!t)throw new me;const s="forward"===n?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS;await t.paginate(s,o,r,i);const a=t.canPaginate("f");return{messages:t.getEvents().filter((e=>[de,ce].includes(e.getType()))).reduce(ae,[]),isLive:!a,canPaginateForward:a,canPaginateBackward:t.canPaginate("b")}})),D.use((e=>{const t=V().getRoom(e);if(!t)throw new le;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),ne.use((async({roomId:t})=>{const n=V(),o=V().getRoom(t);if(!o)throw new le;const r=o.getUnfilteredTimelineSet();return new e.TimelineWindow(n,r)})),C.use((({eventId:e,roomId:t})=>{const o=V();if(!o)throw new fe;const r=o.getRoom(t);if(!r)throw new le;const i=r.findEventById(e);if(!i)throw new ue;const s=o.getUserId();if(!s)throw new ge;return{canRedact:r.currentState.maySendRedactionForEvent(i,s)&&"m.room.server_acl"!==i.getType(),canEdit:function(e){if(e.status===n.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===V().getUserId()}(i)}}));export{M as $canPaginateBackward,k as $canPaginateForward,S as $currentRoomId,x as $isLive,U as $loadRoomFxPending,P as $messages,B as $paginateBackwardPending,W as $paginateForwardPending,b as $timelineWindow,C as checkEventPermissionsFx,te as checkIsDirect,V as client,O as createOnSyncThrottled,L as createRoomMessageBatch,h as deleteMessageFx,R as editMessageFx,T as getLoggedUserFx,D as getRoomInfoFx,ee as getRoomMemberAvatarUrl,E as getRoomsWithActivitiesFx,$ as getSenderAvatarUrl,K as initRoom,v as initStoreFx,G as loadRoom,f as loginByPasswordFx,g as loginByTokenFx,F as onCachedState,Z as onClientEvent,_ as onInitialSync,j as onRoomInitialized,z as onSync,q as paginateBackward,Y as paginateForward,X as prependClientParams,A as readAllMessagesFx,N as roomMessage,p as searchRoomMessagesFx,y as sendMessageFx,w as startClientFx,I as stopClientFx};
//# sourceMappingURL=index.js.map
