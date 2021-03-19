import e,{MatrixEvent as t}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{createDomain as n,forward as o}from"effector";import{batchEvents as r}from"@42px/effector-extra";import{throttle as s}from"patronum/throttle";import{createCustomError as i}from"@42px/custom-errors";const c=n("matrix"),a=c.effect(),d=c.effect(),l=c.effect(),u=c.effect(),m=c.effect(),f=c.effect(),g=c.effect(),v=c.effect(),I=c.effect(),p=c.effect(),w=c.effect(),y=c.effect(),h=c.effect(),R=c.effect(),E=c.effect(),T=c.effect(),A=c.effect(),x=c.effect(),C=c.effect(),M=c.event(),U=e=>r(M,e),D=c.event(),S=c.event(),N=c.event(),b=e=>s({source:N,timeout:e});let k,P;const _=[],z=()=>(k||(k=e.createClient(P),_.forEach((([e,t])=>{k.on(e,t)}))),k),W=e=>{P=e},B=e=>{_.push(...e)},L=({sender:e,width:t,height:n,resizeMethod:o,allowDefault:r=!0,allowDirectLinks:s=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(z().getHomeserverUrl(),t,n,o,r,s):null,F=({roomId:e,userId:t,width:n,height:o,resizeMethod:r,allowDefault:s=!0})=>{const i=z().getRoom(e);if(!i)return null;const c=i.getMember(t);return c?c.getAvatarUrl(z().getHomeserverUrl(),n,o,r,s,!0):null},j=e=>{const t=z().getAccountData("m.direct"),n=t?Object.values(t.getContent()):[];let o=[];for(const e of n)o=[...o,...e];return!!o.includes(e)};function G(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function O(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function Y(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(G(t)),e}const q="m.room.message",H="m.room.redaction",J=i("RoomNotFound"),K=i("TimelineWindowUndefined"),Q=i("PaginationFail"),V=i("EventNotFound"),X=i("ClientNotInitialized");function Z(){return z().getRooms().map(O)}let $;C.use((()=>{const e=z();if(!e)return null;const t=e.getUserId();if(!t)return null;const n=e.getUser(t);return n?{userId:n.userId,currentlyActive:n.currentlyActive,displayName:n.displayName,lastActiveAgo:n.lastActiveAgo,lastPresenceTs:n.lastPresenceTs,presence:n.presence}:null})),o({from:a.done.map((()=>({initialSyncLimit:20}))),to:u}),a.use((e=>z().login("m.login.password",e))),d.use((e=>z().login("m.login.token",e))),l.use((async()=>{const{store:e}=z();if(e)return e.startup()})),u.use((e=>z().startClient(e))),f.use((async e=>(await z().search(e)).search_categories.room_events.results.map((({result:e})=>G(new t(e)))))),g.use((e=>z().searchMessageText(e))),v.use((({roomId:e,content:t,txnId:n})=>z().sendMessage(e,t,n))),I.use((({roomId:e,eventId:t,body:n,txnId:o})=>z().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),p.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await z().redactEvent(e,t,void 0,o)).event_id}})),w.use((e=>{const t=z().getRoom(e);return t?t.timeline.filter((e=>[q,H].includes(e.getType()))).reduce(Y,[]):[]})),B([["Room.timeline",(e,t,n,o,r)=>{const s=e.getType();s!==q&&s!==H||!n&&r.liveEvent&&M(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Z();N(e)}else{const e=Z();D(e)}else{const e=Z();S(e)}}]]),T.use((({roomId:e,eventId:t})=>{const n=z().getRoom(e);if(!n)throw new J;const o=n.findEventById(t);if(!o)throw new V;return z().setRoomReadMarkers(e,t,o)})),A.use((e=>{const t=z();if(!t)throw new X;return e.map((e=>{const n=t.getRoom(e.roomId);if(!n)throw new J;const o=n.getLiveTimeline().getEvents();let r=0;for(let e=o.length-1;e>=0&&e!==o.length-99;e--){const s=o[e];if(n.hasUserReadEvent(t.getUserId(),s.getId()))break;r+=1}const s=o.filter((e=>[q,H].includes(e.getType()))).reduce(Y,[]),i=s.length?s[s.length-1]:void 0,c=j(n.roomId),a=c?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:r,lastMessage:i,isDirect:c,directUserId:null==a?void 0:a.user.userId,isOnline:a?Boolean(a.user.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}))})),m.use((()=>z().stopClient())),y.use((async({roomId:t,initialEventId:n,initialWindowSize:o})=>{const r=z(),s=z().getRoom(t);if(!s)throw new J;const i=s.getUnfilteredTimelineSet();return $=new e.TimelineWindow(r,i),await $.load(n,o),$.getEvents().filter((e=>[q,H].includes(e.getType()))).reduce(Y,[])})),R.use((async({initialEventId:e,initialWindowSize:t})=>{if(!$)throw new K;return await $.load(e,t),$.getEvents().filter((e=>[q,H].includes(e.getType()))).reduce(Y,[])})),h.use((()=>$?$.getEvents().filter((e=>[q,H].includes(e.getType()))).reduce(Y,[]):[])),E.use((async({direction:t,size:n,makeRequest:o,requestLimit:r})=>{if(!$)throw new K;const s="forward"===t?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS;if(!await $.paginate(s,n,o,r))throw new Q;return $.getEvents().filter((e=>[q,H].includes(e.getType()))).reduce(Y,[])})),x.use((e=>{const t=z().getRoom(e);if(!t)throw new J;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)}));export{j as checkIsDirect,z as client,b as createOnSyncThrottled,U as createRoomMessageBatch,p as deleteMessageFx,I as editMessageFx,C as getLoggedUser,x as getRoomInfoFx,F as getRoomMemberAvatarUrl,w as getRoomTimelineFx,A as getRoomsWithActivitiesFx,L as getSenderAvatarUrl,h as getTimelineWindowMessagesFx,l as initStoreFx,y as initTimelineWindowFx,R as loadTimelineWindowFx,a as loginByPasswordFx,d as loginByTokenFx,S as onCachedState,B as onClientEvent,D as onInitialSync,N as onSync,E as paginateTimelineWindowFx,W as prependClientParams,T as readAllMessagesFx,M as roomMessage,f as searchFx,g as searchMessageTextFx,v as sendMessageFx,u as startClientFx,m as stopClientFx};
//# sourceMappingURL=index.js.map
