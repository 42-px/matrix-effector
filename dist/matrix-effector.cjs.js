"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("@42px/effector-extra"),r=require("patronum/throttle"),o=require("effector"),n=require("@42px/custom-errors"),a=require("patronum");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i,d=s(e);(i=exports.MsgType||(exports.MsgType={})).Audio="m.audio",i.BadEncrypted="m.bad.encrypted",i.Emote="m.emote",i.File="m.file",i.Image="m.image",i.Notice="m.notice",i.Text="m.text",i.Video="m.video",i.Location="m.location";const c=o.createDomain("matrix"),l=c.effect(),m=c.effect(),u=c.effect(),g=c.effect(),p=c.effect(),f=c.effect(),v=c.effect(),w=c.effect(),x=c.effect(),I=c.effect(),y=c.effect(),R=c.effect(),h=c.effect(),b=c.effect(),A=c.effect(),E=c.store(null),P=c.store(null),M=c.store(null),U=c.store([]),C=c.store(!1),F=c.store(!1),D=c.store(!1),S=c.store(null),T=c.store(!0),B=c.store(!0),k=c.event(),L=c.event(),N=c.event(),W=c.event(),_=c.event(),O=c.event(),$=c.event(),z=c.event(),j=c.event(),q=c.event();let H,K;const G=[],Y=()=>(H||(H=d.default.createClient(K),G.forEach((([e,t])=>{H.on(e,t)}))),H),J=e=>{G.push(...e)},V=e=>{const t=Y().getAccountData("m.direct"),r=t?Object.values(t.getContent()):[];let o=[];for(const e of r)o=[...o,...e];return!!o.includes(e)},Q=c.event(),X=c.event(),Z=c.event(),ee=c.event(),te=c.effect(),re=c.effect(),oe=c.effect(),ne=c.effect(),ae=c.effect();function se(e){return{...e.getContent()}}function ie(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:se(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function de(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function ce(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(ie(t)),e}function le(e){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:{avatarUrl:e.user.avatarUrl,userId:e.user.userId,currentlyActive:e.user.currentlyActive,displayName:e.user.displayName,lastActiveAgo:e.user.lastActiveAgo,lastPresenceTs:e.user.lastPresenceTs,presence:e.user.presence},userId:e.userId}}const me="m.room.message",ue="m.room.redaction",ge=n.createCustomError("RoomNotFound"),pe=n.createCustomError("TimelineWindowUndefined"),fe=n.createCustomError("EventNotFound"),ve=n.createCustomError("ClientNotInitialized"),we=n.createCustomError("UserNotLoggedIn");function xe(e){return e.getEvents().filter((e=>[me,ue].includes(e.getType()))).reduce(ce,[])}const Ie=o.attach({source:[E,M],effect:oe,mapParams:(e,[t,r])=>({roomId:t,timelineWindow:r,direction:"backward",...e})}),ye=o.attach({source:[E,M],effect:oe,mapParams:(e,[t,r])=>({roomId:t,timelineWindow:r,direction:"forward",...e})}),Re=o.combine(E,M,((e,t)=>Boolean(e)&&Boolean(t))),he=o.combine(Re,D,F,C,((e,t,r,o)=>e&&!t&&!r&&!o));E.on(_,((e,{roomId:t})=>t)),M.on(te.doneData,((e,t)=>t)).reset(E);const be=o.guard({source:o.sample(E,[re.done,oe.done,ne.done],((e,{params:{roomId:t},result:r})=>({currentRoomId:e,roomId:t,...r}))),filter:({currentRoomId:e,roomId:t})=>e===t});U.on(be,((e,{messages:t})=>t)).reset(E),S.on(be,((e,{isLive:t})=>t)).reset(E),P.on(ae.doneData,((e,t)=>t)).reset(E),T.on(be,((e,{canPaginateBackward:t})=>t)).reset([$,E]),B.on(be,((e,{canPaginateForward:t})=>t)).reset([$,E]),o.forward({from:[E.updates],to:X});const Ae=a.debounce({source:X,timeout:500});function Ee(){return Y().getRooms().map(de)}o.guard({clock:Z,source:E,filter:(e,t)=>e===t.roomId,target:X}),o.guard({clock:ee,source:P,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:X}),o.guard({source:o.sample(E,Ae,(e=>e)),filter:E.map((e=>Boolean(e))),target:ae}),o.forward({from:re.pending,to:C}),o.forward({from:ye.pending,to:F}),o.forward({from:Ie.pending,to:D}),o.forward({from:o.sample({source:M,clock:te.done,fn:()=>{}}),to:O}),o.guard({source:o.sample([E,M],Q,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:M.map((e=>Boolean(e))),target:ne}),o.guard({source:o.sample([E,M],$,(([e,t],{initialEventId:r,initialWindowSize:o,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:r,initialWindowSize:o,loadAdditionalDataDirection:n}))),filter:Re,target:re}),o.guard({source:j,filter:he,target:Ie}),o.guard({source:z,filter:he,target:ye}),o.forward({from:_,to:te}),h.use((()=>{const e=Y();if(!e)return null;const t=e.getUserId();if(!t)return null;const r=e.getUser(t);return r?{avatarUrl:r.avatarUrl,userId:r.userId,currentlyActive:r.currentlyActive,displayName:r.displayName,lastActiveAgo:r.lastActiveAgo,lastPresenceTs:r.lastPresenceTs,presence:r.presence}:null})),o.forward({from:l.done.map((()=>({initialSyncLimit:20}))),to:g}),l.use((e=>Y().login("m.login.password",e))),m.use((e=>Y().login("m.login.token",e))),u.use((async()=>{const{store:e}=Y();if(e)return e.startup()})),g.use((e=>Y().startClient(e))),f.use((async({term:t,roomId:r,orderBy:o="rank"})=>{const n=Y().getRoom(r);if(!n)throw new ge;const a={};return(await Y().search({body:{search_categories:{room_events:{search_term:t,keys:["content.body"],filter:{rooms:[r]},order_by:o}}}})).search_categories.room_events.results.map((({result:t})=>{const r=new e.MatrixEvent(t),o=r.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),r.sender=a[o],ie(r)}))})),v.use((({roomId:e,content:t,txnId:r})=>Y().sendMessage(e,t,r))),w.use((({roomId:e,eventId:t,body:r,txnId:o})=>Y().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:r},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),x.use((async({roomId:e,eventId:t,reason:r})=>{const o=r?{reason:r}:void 0;return{eventId:(await Y().redactEvent(e,t,void 0,o)).event_id}})),J([["Room.timeline",(e,t,r,o,n)=>{const a=e.getType();a!==me&&a!==ue||!r&&n.liveEvent&&k(function(e){const t={eventId:e.getId(),content:se(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>Q()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Ee();W(e)}else{const e=Ee();L(e)}else{const e=Ee();N(e)}}],["RoomState.members",(e,t,r)=>Z(r)],["RoomState.newMember",(e,t,r)=>Z(r)],["RoomMember.membership",(e,t)=>Z(t)],["RoomMember.name",(e,t)=>Z(t)],["RoomMember.powerLevel",(e,t)=>Z(t)],["RoomMember.typing",(e,t)=>Z(t)],["User.avatarUrl",(e,t)=>ee(t)],["User.presence",(e,t)=>ee(t)],["User.displayName",(e,t)=>ee(t)]]),I.use((({roomId:e,eventId:t})=>{const r=Y().getRoom(e);if(!r)throw new ge;const o=r.findEventById(t);if(!o)throw new fe;return Y().setRoomReadMarkers(e,t,o)})),y.use((e=>{const t=Y();if(!t)throw new ve;return e.map((e=>{var r;const o=t.getRoom(e.roomId);if(!o)throw new ge;const n=o.getLiveTimeline().getEvents();let a=0;for(let e=n.length-1;e>=0&&e!==n.length-99;e--){const r=n[e];if(o.hasUserReadEvent(t.getUserId(),r.getId()))break;a+=1}const s=n.filter((e=>[me,ue].includes(e.getType()))).reduce(ce,[]),i=s.length?s[s.length-1]:void 0,d=V(o.roomId),c=d?o.getMember(o.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:i,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(r=c.user)||void 0===r?void 0:r.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()}}))})),p.use((()=>Y().stopClient())),re.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:r,loadAdditionalDataDirection:o})=>{if(!e)throw new pe;await e.load(t,r);const n=e.canPaginate("f");let a=xe(e);if(r&&a.length<r){let t;const n=r-a.length;t="BACKWARD"===o?await e.paginate(d.default.EventTimeline.BACKWARDS,n):await e.paginate(d.default.EventTimeline.FORWARDS,n),t&&(a=xe(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),oe.use((async({timelineWindow:e,direction:t,size:r,makeRequest:o,requestLimit:n})=>{if(!e)throw new pe;const a="forward"===t?d.default.EventTimeline.FORWARDS:d.default.EventTimeline.BACKWARDS;await e.paginate(a,r,o,n);const s=e.canPaginate("f");return{messages:xe(e),isLive:!s,canPaginateForward:s,canPaginateBackward:e.canPaginate("b")}})),ne.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:xe(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),R.use((e=>{const t=Y().getRoom(e);if(!t)throw new ge;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),te.use((async({roomId:e})=>{const t=Y(),r=Y().getRoom(e);if(!r)throw new ge;const o=r.getUnfilteredTimelineSet();return new d.default.TimelineWindow(t,o)})),b.use((({eventId:t,roomId:r})=>{const o=Y();if(!o)throw new ve;const n=o.getRoom(r);if(!n)throw new ge;const a=n.findEventById(t);if(!a)throw new fe;const s=o.getUserId();if(!s)throw new we;return{canRedact:n.currentState.maySendRedactionForEvent(a,s)&&"m.room.server_acl"!==a.getType(),canEdit:function(t){if(t.status===e.EventStatus.CANCELLED||"m.room.message"!==t.getType()||t.isRedacted())return!1;const r=t.getOriginalContent(),{msgtype:o}=r;return("m.text"===o||"m.emote"===o)&&Boolean(r.body)&&"string"==typeof r.body&&t.getSender()===Y().getUserId()}(a)}})),A.use((({file:e,name:t,includeFilename:r,onlyContentUri:o,rawResponse:n,type:a})=>{const s=Y().uploadContent(e,{name:t,includeFilename:r,type:a,onlyContentUri:o,rawResponse:n,progressHandler:({loaded:t,total:r})=>{q({file:e,loaded:t,total:r})}}),i={promise:s};return s.abort&&(i.abort=s.abort),i})),ae.use((e=>{const t=Y().getRoom(e);if(!t)throw new ge;return Object.values(t.currentState.members).map(le)})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canPaginateBackward=T,exports.$canPaginateForward=B,exports.$currentRoomId=E,exports.$currentRoomMembers=P,exports.$isLive=S,exports.$loadRoomFxPending=C,exports.$messages=U,exports.$paginateBackwardPending=D,exports.$paginateForwardPending=F,exports.$timelineWindow=M,exports.checkEventPermissionsFx=b,exports.checkIsDirect=V,exports.client=Y,exports.createOnSyncThrottled=e=>r.throttle({source:W,timeout:e}),exports.createRoomMessageBatch=e=>t.batchEvents(k,e),exports.deleteMessageFx=x,exports.editMessageFx=w,exports.getLoggedUserFx=h,exports.getRoomInfoFx=R,exports.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:r,height:o,resizeMethod:n,allowDefault:a=!0})=>{const s=Y().getRoom(e);if(!s)return null;const i=s.getMember(t);return i?i.getAvatarUrl(Y().getHomeserverUrl(),r,o,n,a,!0):null},exports.getRoomsWithActivitiesFx=y,exports.getSenderAvatarUrl=({sender:e,width:t,height:r,resizeMethod:o,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(Y().getHomeserverUrl(),t,r,o,n,a):null,exports.initRoom=_,exports.initStoreFx=u,exports.loadRoom=$,exports.loginByPasswordFx=l,exports.loginByTokenFx=m,exports.mxcUrlToHttp=({mxcUrl:e,width:t,height:r,resizeMethod:o,allowDirectLinks:n})=>Y().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==r?r:null,void 0!==o?o:"scale",void 0!==n?n:null),exports.onCachedState=N,exports.onClientEvent=J,exports.onInitialSync=L,exports.onRoomInitialized=O,exports.onSync=W,exports.onUploadProgress=q,exports.paginateBackward=j,exports.paginateForward=z,exports.prependClientParams=e=>{K=e},exports.readAllMessagesFx=I,exports.roomMessage=k,exports.searchRoomMessagesFx=f,exports.sendMessageFx=v,exports.startClientFx=g,exports.stopClientFx=p,exports.uploadContentFx=A;
//# sourceMappingURL=matrix-effector.cjs.js.map
