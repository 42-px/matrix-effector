import e,{MatrixEvent as t,EventStatus as n}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{batchEvents as o}from"@42px/effector-extra";import{throttle as r}from"patronum/throttle";import{createDomain as i,attach as a,combine as s,guard as d,sample as c,forward as l}from"effector";import{createCustomError as m}from"@42px/custom-errors";var u;!function(e){e.Audio="m.audio",e.BadEncrypted="m.bad.encrypted",e.Emote="m.emote",e.File="m.file",e.Image="m.image",e.Notice="m.notice",e.Text="m.text",e.Video="m.video",e.Location="m.location"}(u||(u={}));const f=i("matrix"),g=f.effect(),v=f.effect(),w=f.effect(),I=f.effect(),p=f.effect(),y=f.effect(),h=f.effect(),R=f.effect(),A=f.effect(),E=f.effect(),D=f.effect(),P=f.effect(),T=f.effect(),b=f.effect(),C=f.effect(),U=f.store(null),B=f.store(null),S=f.store([]),x=f.store(!1),W=f.store(!1),k=f.store(!1),M=f.store(null),L=f.store(!0),N=f.store(!0),F=f.event(),_=e=>o(F,e),z=f.event(),O=f.event(),H=f.event(),K=e=>r({source:H,timeout:e}),j=f.event(),G=f.event(),Y=f.event(),q=f.event(),J=f.event(),V=f.event();let Q,X;const Z=[],$=()=>(Q||(Q=e.createClient(X),Z.forEach((([e,t])=>{Q.on(e,t)}))),Q),ee=e=>{X=e},te=e=>{Z.push(...e)},ne=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl($().getHomeserverUrl(),t,n,o,r,i):null,oe=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const a=$().getRoom(e);if(!a)return null;const s=a.getMember(t);return s?s.getAvatarUrl($().getHomeserverUrl(),n,o,r,i,!0):null},re=({mxcUrl:e,width:t,height:n,resizeMethod:o,allowDirectLinks:r})=>$().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==n?n:null,void 0!==o?o:"scale",void 0!==r?r:null),ie=e=>{const t=$().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)},ae=f.event(),se=f.effect(),de=f.effect(),ce=f.effect(),le=f.effect();function me(e){return{...e.getContent()}}function ue(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:me(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function fe(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function ge(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(ue(t)),e}const ve="m.room.message",we="m.room.redaction",Ie=m("RoomNotFound"),pe=m("TimelineWindowUndefined"),ye=m("EventNotFound"),he=m("ClientNotInitialized"),Re=m("UserNotLoggedIn");function Ae(e){return e.getEvents().filter((e=>[ve,we].includes(e.getType()))).reduce(ge,[])}const Ee=a({source:[U,B],effect:ce,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"backward",...e})}),De=a({source:[U,B],effect:ce,mapParams:(e,[t,n])=>({roomId:t,timelineWindow:n,direction:"forward",...e})}),Pe=s(U,B,((e,t)=>Boolean(e)&&Boolean(t))),Te=s(Pe,k,W,x,((e,t,n,o)=>e&&!t&&!n&&!o));U.on(j,((e,{roomId:t})=>t)),B.on(se.doneData,((e,t)=>t)).reset(U);const be=d({source:c(U,[de.done,ce.done,le.done],((e,{params:{roomId:t},result:n})=>({currentRoomId:e,roomId:t,...n}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Ce(){return $().getRooms().map(fe)}S.on(be,((e,{messages:t})=>t)).reset(U),M.on(be,((e,{isLive:t})=>t)).reset(U),L.on(be,((e,{canPaginateBackward:t})=>t)).reset([Y,U]),N.on(be,((e,{canPaginateForward:t})=>t)).reset([Y,U]),l({from:de.pending,to:x}),l({from:De.pending,to:W}),l({from:Ee.pending,to:k}),l({from:c({source:B,clock:se.done,fn:()=>{}}),to:G}),d({source:c([U,B],ae,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:B.map((e=>Boolean(e))),target:le}),d({source:c([U,B],Y,(([e,t],{initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r}))),filter:Pe,target:de}),d({source:J,filter:Te,target:Ee}),d({source:q,filter:Te,target:De}),l({from:j,to:se}),T.use((()=>{const e=$();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),l({from:g.done.map((()=>({initialSyncLimit:20}))),to:I}),g.use((e=>$().login("m.login.password",e))),v.use((e=>$().login("m.login.token",e))),w.use((async()=>{const{store:e}=$();if(e)return e.startup()})),I.use((e=>$().startClient(e))),y.use((async({term:e,roomId:n,orderBy:o="rank"})=>{const r=$().getRoom(n);if(!r)throw new Ie;const i={};return(await $().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[n]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const n=new t(e),o=n.getSender();return void 0===i[o]&&(i[o]=r.getMember(o)),n.sender=i[o],ue(n)}))})),h.use((({roomId:e,content:t,txnId:n})=>$().sendMessage(e,t,n))),R.use((({roomId:e,eventId:t,body:n,txnId:o})=>$().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),A.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await $().redactEvent(e,t,void 0,o)).event_id}})),te([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==ve&&i!==we||!n&&r.liveEvent&&F(function(e){const t={eventId:e.getId(),content:me(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>ae()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Ce();H(e)}else{const e=Ce();z(e)}else{const e=Ce();O(e)}}]]),E.use((({roomId:e,eventId:t})=>{const n=$().getRoom(e);if(!n)throw new Ie;const o=n.findEventById(t);if(!o)throw new ye;return $().setRoomReadMarkers(e,t,o)})),D.use((e=>{const t=$();if(!t)throw new he;return e.map((e=>{var n;const o=t.getRoom(e.roomId);if(!o)throw new Ie;const r=o.getLiveTimeline().getEvents();let i=0;for(let e=r.length-1;e>=0&&e!==r.length-99;e--){const n=r[e];if(o.hasUserReadEvent(t.getUserId(),n.getId()))break;i+=1}const a=r.filter((e=>[ve,we].includes(e.getType()))).reduce(ge,[]),s=a.length?a[a.length-1]:void 0,d=ie(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:s,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(n=c.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),p.use((()=>$().stopClient())),de.use((async({timelineWindow:t,initialEventId:n,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!t)throw new pe;await t.load(n,o);const i=t.canPaginate("f");let a=Ae(t);if(o&&a.length<o){let n;const i=o-a.length;n="BACKWARD"===r?await t.paginate(e.EventTimeline.BACKWARDS,i):await t.paginate(e.EventTimeline.FORWARDS,i),n&&(a=Ae(t))}return{messages:a,isLive:!i,canPaginateForward:i,canPaginateBackward:t.canPaginate("b")}})),ce.use((async({timelineWindow:t,direction:n,size:o,makeRequest:r,requestLimit:i})=>{if(!t)throw new pe;const a="forward"===n?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS;await t.paginate(a,o,r,i);const s=t.canPaginate("f");return{messages:Ae(t),isLive:!s,canPaginateForward:s,canPaginateBackward:t.canPaginate("b")}})),le.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:Ae(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),P.use((e=>{const t=$().getRoom(e);if(!t)throw new Ie;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),se.use((async({roomId:t})=>{const n=$(),o=$().getRoom(t);if(!o)throw new Ie;const r=o.getUnfilteredTimelineSet();return new e.TimelineWindow(n,r)})),b.use((({eventId:e,roomId:t})=>{const o=$();if(!o)throw new he;const r=o.getRoom(t);if(!r)throw new Ie;const i=r.findEventById(e);if(!i)throw new ye;const a=o.getUserId();if(!a)throw new Re;return{canRedact:r.currentState.maySendRedactionForEvent(i,a)&&"m.room.server_acl"!==i.getType(),canEdit:function(e){if(e.status===n.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===$().getUserId()}(i)}})),C.use((async({file:e,name:t,includeFilename:n,type:o})=>{const r=$();return await r.uploadContent(e,{name:t,includeFilename:n,type:o,onlyContentUri:!0,rawResponse:!1,progressHandler:({loaded:t,total:n})=>{V({file:e,loaded:t,total:n})}})}));export{L as $canPaginateBackward,N as $canPaginateForward,U as $currentRoomId,M as $isLive,x as $loadRoomFxPending,S as $messages,k as $paginateBackwardPending,W as $paginateForwardPending,B as $timelineWindow,u as MsgType,b as checkEventPermissionsFx,ie as checkIsDirect,$ as client,K as createOnSyncThrottled,_ as createRoomMessageBatch,A as deleteMessageFx,R as editMessageFx,T as getLoggedUserFx,P as getRoomInfoFx,oe as getRoomMemberAvatarUrl,D as getRoomsWithActivitiesFx,ne as getSenderAvatarUrl,j as initRoom,w as initStoreFx,Y as loadRoom,g as loginByPasswordFx,v as loginByTokenFx,re as mxcUrlToHttp,O as onCachedState,te as onClientEvent,z as onInitialSync,G as onRoomInitialized,H as onSync,V as onUploadProgress,J as paginateBackward,q as paginateForward,ee as prependClientParams,E as readAllMessagesFx,F as roomMessage,y as searchRoomMessagesFx,h as sendMessageFx,I as startClientFx,p as stopClientFx,C as uploadContentFx};
//# sourceMappingURL=index.js.map
