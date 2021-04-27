import e,{MatrixEvent as t,EventStatus as n}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{batchEvents as o}from"@42px/effector-extra";import{throttle as r}from"patronum/throttle";import{createDomain as i,attach as s,combine as a,guard as d,sample as c,forward as m}from"effector";import{createCustomError as l}from"@42px/custom-errors";const u=i("matrix"),f=u.effect(),g=u.effect(),v=u.effect(),w=u.effect(),I=u.effect(),p=u.effect(),y=u.effect(),R=u.effect(),h=u.effect(),A=u.effect(),E=u.effect(),D=u.effect(),b=u.effect(),P=u.effect(),T=u.store(null),C=u.store(null),S=u.store([]),W=u.store(!1),B=u.store(!1),U=u.store(!1),k=u.store(null),x=u.store(!0),M=u.store(!0),_=u.event(),N=e=>o(_,e),L=u.event(),F=u.event(),z=u.event(),O=e=>r({source:z,timeout:e}),K=u.event(),j=u.event(),G=u.event(),Y=u.event(),q=u.event();let H,J;const Q=[],V=()=>(H||(H=e.createClient(J),Q.forEach((([e,t])=>{H.on(e,t)}))),H),X=e=>{J=e},Z=e=>{Q.push(...e)},$=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(V().getHomeserverUrl(),t,n,o,r,i):null,ee=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const s=V().getRoom(e);if(!s)return null;const a=s.getMember(t);return a?a.getAvatarUrl(V().getHomeserverUrl(),n,o,r,i,!0):null},te=e=>{const t=V().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)},ne=u.event(),oe=u.effect(),re=u.effect(),ie=u.effect(),se=u.effect();function ae(e){const t={},n=e.getContent();return n.body&&(t.body=n.body),n.msgtype&&(t.msgtype=n.msgtype),n["m.relates_to"]&&(t["m.relates_to"]={...n["m.relates_to"]}),t}function de(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:ae(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function ce(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function me(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(de(t)),e}const le="m.room.message",ue="m.room.redaction",fe=l("RoomNotFound"),ge=l("TimelineWindowUndefined"),ve=l("EventNotFound"),we=l("ClientNotInitialized"),Ie=l("UserNotLoggedIn");function pe(e){return e.getEvents().filter((e=>[le,ue].includes(e.getType()))).reduce(me,[])}const ye=s({source:[T,C],effect:ie,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"backward",...e})}),Re=s({source:[T,C],effect:ie,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"forward",...e})}),he=a(T,C,((e,t)=>Boolean(e)&&Boolean(t))),Ae=a(he,U,B,W,((e,t,n,o)=>e&&!t&&!n&&!o));T.on(K,((e,{roomId:t})=>t)),C.on(oe.doneData,((e,t)=>t)).reset(T);const Ee=d({source:c(T,[re.done,ie.done,se.done],((e,{params:{roomId:t},result:n})=>({currentRoomId:e,roomId:t,...n}))),filter:({currentRoomId:e,roomId:t})=>e===t});function De(){return V().getRooms().map(ce)}S.on(Ee,((e,{messages:t})=>t)).reset(T),k.on(Ee,((e,{isLive:t})=>t)).reset(T),x.on(Ee,((e,{canPaginateBackward:t})=>t)).reset([G,T]),M.on(Ee,((e,{canPaginateForward:t})=>t)).reset([G,T]),m({from:re.pending,to:W}),m({from:Re.pending,to:B}),m({from:ye.pending,to:U}),m({from:c({source:C,clock:oe.done,fn:()=>{}}),to:j}),d({source:c([T,C],ne,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:C.map((e=>Boolean(e))),target:se}),d({source:c([T,C],G,(([e,t],{initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r}))),filter:he,target:re}),d({source:q,filter:Ae,target:ye}),d({source:Y,filter:Ae,target:Re}),m({from:K,to:oe}),b.use((()=>{const e=V();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),m({from:f.done.map((()=>({initialSyncLimit:20}))),to:w}),f.use((e=>V().login("m.login.password",e))),g.use((e=>V().login("m.login.token",e))),v.use((async()=>{const{store:e}=V();if(e)return e.startup()})),w.use((e=>V().startClient(e))),p.use((async({term:e,roomId:n})=>{const o=V().getRoom(n);if(!o)throw new fe;const r={};return(await V().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]}}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t(e),i=n.getSender();return void 0===r[i]&&(r[i]=o.getMember(i)),n.sender=r[i],de(n)}))})),y.use((({roomId:e,content:t,txnId:n})=>V().sendMessage(e,t,n))),R.use((({roomId:e,eventId:t,body:n,txnId:o})=>V().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),h.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await V().redactEvent(e,t,void 0,o)).event_id}})),Z([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==le&&i!==ue||!n&&r.liveEvent&&_(function(e){const t={eventId:e.getId(),content:ae(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>ne()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=De();z(e)}else{const e=De();L(e)}else{const e=De();F(e)}}]]),A.use((({roomId:e,eventId:t})=>{const n=V().getRoom(e);if(!n)throw new fe;const o=n.findEventById(t);if(!o)throw new ve;return V().setRoomReadMarkers(e,t,o)})),E.use((e=>{const t=V();if(!t)throw new we;return e.map((e=>{var n;const o=t.getRoom(e.roomId);if(!o)throw new fe;const r=o.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const n=r[e];if(o.hasUserReadEvent(t.getUserId(),n.getId()))break;i+=1}const s=r.filter((e=>[le,ue].includes(e.getType()))).reduce(me,[]),a=s.length?s[s.length-1]:void 0,d=te(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:a,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(n=c.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),I.use((()=>V().stopClient())),re.use((async({timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!t)throw new ge;await t.load(n,o);const i=t.canPaginate("f");let s=pe(t);if(o&&s.length<o){let n;const i=o-s.length;n="BACKWARD"===r?await t.paginate(e.EventTimeline.BACKWARDS,i):await t.paginate(e.EventTimeline.FORWARDS,i),n&&(s=pe(t))}return{messages:s,isLive:!i,canPaginateForward:i,canPaginateBackward:t.canPaginate("b")}})),ie.use((async({timelineWindow:t,direction:n,size:o,makeRequest:r,requestLimit:i})=>{if(!t)throw new ge;const s="forward"===n?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS;await t.paginate(s,o,r,i);const a=t.canPaginate("f");return{messages:pe(t),isLive:!a,canPaginateForward:a,canPaginateBackward:t.canPaginate("b")}})),se.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:pe(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),D.use((e=>{const t=V().getRoom(e);if(!t)throw new fe;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),oe.use((async({roomId:t})=>{const n=V(),o=V().getRoom(t);if(!o)throw new fe;const r=o.getUnfilteredTimelineSet();return new e.TimelineWindow(n,r)})),P.use((({eventId:e,roomId:t})=>{const o=V();if(!o)throw new we;const r=o.getRoom(t);if(!r)throw new fe;const i=r.findEventById(e);if(!i)throw new ve;const s=o.getUserId();if(!s)throw new Ie;return{canRedact:r.currentState.maySendRedactionForEvent(i,s)&&"m.room.server_acl"!==i.getType(),canEdit:function(e){if(e.status===n.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===V().getUserId()}(i)}}));export{x as $canPaginateBackward,M as $canPaginateForward,T as $currentRoomId,k as $isLive,W as $loadRoomFxPending,S as $messages,U as $paginateBackwardPending,B as $paginateForwardPending,C as $timelineWindow,P as checkEventPermissionsFx,te as checkIsDirect,V as client,O as createOnSyncThrottled,N as createRoomMessageBatch,h as deleteMessageFx,R as editMessageFx,b as getLoggedUserFx,D as getRoomInfoFx,ee as getRoomMemberAvatarUrl,E as getRoomsWithActivitiesFx,$ as getSenderAvatarUrl,K as initRoom,v as initStoreFx,G as loadRoom,f as loginByPasswordFx,g as loginByTokenFx,F as onCachedState,Z as onClientEvent,L as onInitialSync,j as onRoomInitialized,z as onSync,q as paginateBackward,Y as paginateForward,X as prependClientParams,A as readAllMessagesFx,_ as roomMessage,p as searchRoomMessagesFx,y as sendMessageFx,w as startClientFx,I as stopClientFx};
//# sourceMappingURL=index.js.map
