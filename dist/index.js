import e,{MatrixEvent as t}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{createDomain as n,forward as o}from"effector";import{batchEvents as r}from"@42px/effector-extra";import{throttle as i}from"patronum/throttle";import{createCustomError as s}from"@42px/custom-errors";const d=n("matrix"),c=d.effect(),a=d.effect(),l=d.effect(),m=d.effect(),u=d.effect(),f=d.effect(),g=d.effect(),v=d.effect(),I=d.effect(),w=d.effect(),p=d.effect(),h=d.effect(),R=d.effect(),y=d.effect(),E=d.effect(),T=d.effect(),x=d.effect(),A=d.effect(),C=d.event(),M=e=>r(C,e),D=d.event(),S=d.event(),U=d.event(),b=e=>i({source:U,timeout:e});let N,k;const _=[],z=()=>(N||(N=e.createClient(k),_.forEach((([e,t])=>{N.on(e,t)}))),N),W=e=>{k=e},B=e=>{_.push(...e)},L=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(z().getHomeserverUrl(),t,n,o,r,i):null,P=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:i=!0})=>{const s=z().getRoom(e);if(!s)return null;const d=s.getMember(t);return d?d.getAvatarUrl(z().getHomeserverUrl(),n,o,r,i,!0):null},F=e=>{const t=z().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)};function j(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function G(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function O(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(j(t)),e}const Y="m.room.message",q="m.room.redaction",H=s("RoomNotFound"),J=s("TimelineWindowUndefined"),K=s("PaginationFail"),Q=s("EventNotFound"),V=s("ClientNotInitialized");function X(){return z().getRooms().map(G)}let Z;o({from:c.done.map((()=>({initialSyncLimit:20}))),to:m}),c.use((e=>z().login("m.login.password",e))),a.use((e=>z().login("m.login.token",e))),l.use((async()=>{const{store:e}=z();if(e)return e.startup()})),m.use((e=>z().startClient(e))),f.use((async e=>(await z().search(e)).search_categories.room_events.results.map((({result:e})=>j(new t(e)))))),g.use((e=>z().searchMessageText(e))),v.use((({roomId:e,content:t,txnId:n})=>z().sendMessage(e,t,n))),I.use((({roomId:e,eventId:t,body:n,txnId:o})=>z().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),w.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await z().redactEvent(e,t,void 0,o)).event_id}})),p.use((e=>{const t=z().getRoom(e);return t?t.timeline.filter((e=>[Y,q].includes(e.getType()))).reduce(O,[]):[]})),B([["Room.timeline",(e,t,n,o,r)=>{const i=e.getType();i!==Y&&i!==q||!n&&r.liveEvent&&C(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=X();U(e)}else{const e=X();D(e)}else{const e=X();S(e)}}]]),T.use((({roomId:e,eventId:t})=>{const n=z().getRoom(e);if(!n)throw new H;const o=n.findEventById(t);if(!o)throw new Q;return z().setRoomReadMarkers(e,t,o)})),x.use((e=>{const t=z();if(!t)throw new V;return e.map((e=>{const n=t.getRoom(e.roomId);if(!n)throw new H;const o=n.getLiveTimeline().getEvents();let r=0;for(let e=o.length-1;e>=0&&e!==o.length-99;e--){const i=o[e];if(n.hasUserReadEvent(t.getUserId(),i.getId()))break;r+=1}const i=o.filter((e=>[Y,q].includes(e.getType()))).reduce(O,[]),s=i.length?i[i.length-1]:void 0,d=F(n.roomId),c=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:r,lastMessage:s,isDirect:d,directUserId:null==c?void 0:c.user.userId,isOnline:c?Boolean(c.user.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}))})),u.use((()=>z().stopClient())),h.use((async({roomId:t,initialEventId:n,initialWindowSize:o})=>{const r=z(),i=z().getRoom(t);if(!i)throw new H;const s=i.getUnfilteredTimelineSet();return Z=new e.TimelineWindow(r,s),await Z.load(n,o),Z.getEvents().filter((e=>[Y,q].includes(e.getType()))).reduce(O,[])})),y.use((async({initialEventId:e,initialWindowSize:t})=>{if(!Z)throw new J;return await Z.load(e,t),Z.getEvents().filter((e=>[Y,q].includes(e.getType()))).reduce(O,[])})),R.use((()=>Z?Z.getEvents().filter((e=>[Y,q].includes(e.getType()))).reduce(O,[]):[])),E.use((async({direction:t,size:n,makeRequest:o,requestLimit:r})=>{if(!Z)throw new J;const i="forward"===t?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS;if(!await Z.paginate(i,n,o,r))throw new K;return Z.getEvents().filter((e=>[Y,q].includes(e.getType()))).reduce(O,[])})),A.use((e=>{const t=z().getRoom(e);if(!t)throw new H;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)}));export{F as checkIsDirect,z as client,b as createOnSyncThrottled,M as createRoomMessageBatch,w as deleteMessageFx,I as editMessageFx,A as getRoomInfoFx,P as getRoomMemberAvatar,p as getRoomTimelineFx,x as getRoomsWithActivitiesFx,L as getSenderAvatar,R as getTimelineWindowMessagesFx,l as initStoreFx,h as initTimelineWindowFx,y as loadTimelineWindowFx,c as loginByPasswordFx,a as loginByTokenFx,S as onCachedState,B as onClientEvent,D as onInitialSync,U as onSync,E as paginateTimelineWindowFx,W as prependClientParams,T as readAllMessagesFx,C as roomMessage,f as searchFx,g as searchMessageTextFx,v as sendMessageFx,m as startClientFx,u as stopClientFx};
//# sourceMappingURL=index.js.map
