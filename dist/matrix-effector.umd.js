!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("patronum/throttle"),require("effector"),require("@42px/effector-extra"),require("@42px/custom-errors"),require("patronum")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","patronum/throttle","effector","@42px/effector-extra","@42px/custom-errors","patronum"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.throttle,e.effector,e.effectorExtra,e.customErrors,e.patronum)}(this,(function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c,l=s(t);(c=e.MsgType||(e.MsgType={})).Audio="m.audio",c.BadEncrypted="m.bad.encrypted",c.Emote="m.emote",c.File="m.file",c.Image="m.image",c.Notice="m.notice",c.Text="m.text",c.Video="m.video",c.Location="m.location";const d=r.createDomain("matrix"),m=d.effect(),u=d.effect(),f=d.effect(),g=d.effect(),p=d.effect(),v=d.effect(),w=d.effect(),h=d.effect(),y=d.effect(),I=d.effect(),R=d.effect(),b=d.effect(),x=d.effect(),E=d.effect(),P=d.effect(),A=d.effect(),U=d.effect(),F=d.effect(),M=d.effect(),C=d.effect(),T=d.store(null),k=d.store(null),B=d.store(null),D=d.store([]),N=d.store(!1),S=d.store(!1),L=d.store(!1),W=d.store(null),_=d.store(!0),$=d.store(!0),z=d.event(),O=d.event(),j=d.event(),q=d.event(),H=d.event(),G=d.event(),K=d.event(),Y=d.event(),J=d.event(),V=d.event(),Q=d.event(),X=d.event();let Z,ee,te=500;const oe=[],re=()=>(Z||(Z=l.default.createClient(ee),oe.forEach((([e,t])=>{Z.on(e,t)}))),Z),ne=e=>{oe.push(...e)},ae=()=>n.batchEvents(z,te),ie=e=>{const t=re().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},se=d.event(),ce=d.event(),le=d.event(),de=d.event(),me=d.effect(),ue=d.effect(),fe=d.effect(),ge=d.effect(),pe=d.effect();function ve(e){return{...e.getContent()}}function we(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:ve(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function he(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function ye(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(we(t)),e}const Ie="m.room.message",Re="m.room.redaction",be=a.createCustomError("RoomNotFound"),xe=a.createCustomError("UserNotFound"),Ee=a.createCustomError("TimelineWindowUndefined"),Pe=a.createCustomError("EventNotFound"),Ae=a.createCustomError("ClientNotInitialized"),Ue=a.createCustomError("UserNotLoggedIn");function Fe(e){return e.getEvents().filter((e=>[Ie,Re].includes(e.getType()))).reduce(ye,[])}const Me=ae(),Ce=r.attach({source:[T,B],effect:fe,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Te=r.attach({source:[T,B],effect:fe,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),ke=r.attach({effect:Te,mapParams:({messages:e})=>({size:e.length})});r.forward({from:r.sample(D,ke.done,((e,{params:t})=>t.messages)),to:O}),r.forward({from:Ce.done,to:j}),r.forward({from:Me.map((e=>({messages:e}))),to:ke});const Be=r.combine(T,B,((e,t)=>Boolean(e)&&Boolean(t))),De=r.combine(Be,L,S,N,((e,t,o,r)=>e&&!t&&!o&&!r));T.on(K,((e,{roomId:t})=>t)),B.on(me.doneData,((e,t)=>t)).reset(T);const Ne=r.guard({source:r.sample(T,[ue.done,fe.done,ge.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});D.on(Ne,((e,{messages:t})=>t)).reset(T),W.on(Ne,((e,{isLive:t})=>t)).reset(T),k.on(pe.doneData,((e,t)=>t)).reset(T),_.on(Ne,((e,{canPaginateBackward:t})=>t)).reset([J,T]),$.on(Ne,((e,{canPaginateForward:t})=>t)).reset([J,T]),r.guard({source:T,filter:e=>Boolean(e),target:ce});const Se=i.debounce({source:ce,timeout:500});function Le(){return re().getRooms().map(he)}r.guard({clock:le,source:T,filter:(e,t)=>e===t.roomId,target:ce}),r.guard({clock:de,source:k,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:ce}),r.guard({source:T,clock:Se,filter:Boolean,target:pe}),r.forward({from:ue.pending,to:N}),r.forward({from:Te.pending,to:S}),r.forward({from:Ce.pending,to:L}),r.forward({from:r.sample({source:B,clock:me.done,fn:()=>{}}),to:Y}),r.guard({source:r.sample([T,B],se,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:B.map((e=>Boolean(e))),target:ge}),r.guard({source:r.sample([T,B],J,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:Be,target:ue}),r.guard({source:Q,filter:De,target:Ce}),r.guard({source:V,filter:De,target:Te}),r.forward({from:K,to:me}),x.use((async()=>{const e=re();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;let r=o.avatarUrl,n=o.displayName;if(!(null==o?void 0:o.avatarUrl)||!(null==o?void 0:o.displayName)){const o=await e.getProfileInfo(t);r=o.avatar_url,n=o.displayname}return{avatarUrl:r,userId:o.userId,currentlyActive:o.currentlyActive,displayName:n,lastActiveAgo:o.lastActiveAgo,lastPresenceTs:o.lastPresenceTs,presence:o.presence}})),r.forward({from:m.done.map((()=>({initialSyncLimit:20}))),to:g}),m.use((e=>re().login("m.login.password",e))),u.use((e=>re().login("m.login.token",e))),f.use((async()=>{const{store:e}=re();if(e)return e.startup()})),g.use((e=>re().startClient(e))),v.use((async({term:e,roomId:o,orderBy:r="rank"})=>{const n=re().getRoom(o);if(!n)throw new be;const a={};return(await re().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[o]},order_by:r}}}})).search_categories.room_events.results.map((({result:e})=>{const o=new t.MatrixEvent(e),r=o.getSender();return void 0===a[r]&&(a[r]=n.getMember(r)),o.sender=a[r],we(o)}))})),w.use((({roomId:e,content:t,txnId:o})=>re().sendMessage(e,t,o))),h.use((({roomId:e,eventId:t,body:o,txnId:r})=>re().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),y.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await re().redactEvent(e,t,void 0,r)).event_id}})),ne([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Ie&&a!==Re||!o&&n.liveEvent&&z(we(e))}],["Room.localEchoUpdated",()=>se()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Le();G(e)}else{const e=Le();q(e)}else{const e=Le();H(e)}}],["RoomState.members",(e,t,o)=>le(o)],["RoomState.newMember",(e,t,o)=>le(o)],["RoomMember.membership",(e,t)=>le(t)],["RoomMember.name",(e,t)=>le(t)],["RoomMember.powerLevel",(e,t)=>le(t)],["RoomMember.typing",(e,t)=>le(t)],["User.avatarUrl",(e,t)=>de(t)],["User.presence",(e,t)=>de(t)],["User.displayName",(e,t)=>de(t)]]),I.use((({roomId:e,eventId:t})=>{const o=re().getRoom(e);if(!o)throw new be;const r=o.findEventById(t);if(!r)throw new Pe;return re().setRoomReadMarkers(e,t,r)})),R.use((e=>{const t=re();if(!t)throw new Ae;return e.map((e=>{var o;const r=t.getRoom(e.roomId);if(!r)throw new be;const n=r.getLiveTimeline().getEvents();let a=0;for(let e=n.length-1;e>=0&&e!==n.length-99;e--){const o=n[e];if(r.hasUserReadEvent(t.getUserId(),o.getId()))break;a+=1}const i=n.filter((e=>[Ie,Re].includes(e.getType()))).reduce(ye,[]),s=i.length?i[i.length-1]:void 0,c=ie(r.roomId),l=c?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:s,isDirect:c,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:r.getLastActiveTimestamp()}}))})),p.use((()=>re().stopClient())),ue.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Ee;await e.load(t,o);const n=e.canPaginate("f");let a=Fe(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(l.default.EventTimeline.BACKWARDS,n):await e.paginate(l.default.EventTimeline.FORWARDS,n),t&&(a=Fe(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),fe.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Ee;const a="forward"===t?l.default.EventTimeline.FORWARDS:l.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:Fe(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),ge.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:Fe(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),b.use((e=>{const t=re().getRoom(e);if(!t)throw new be;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),me.use((async({roomId:e})=>{const t=re(),o=re().getRoom(e);if(!o)throw new be;const r=o.getUnfilteredTimelineSet();return new l.default.TimelineWindow(t,r)})),E.use((({eventId:e,roomId:o})=>{const r=re();if(!r)throw new Ae;const n=r.getRoom(o);if(!n)throw new be;const a=n.findEventById(e);if(!a)throw new Pe;const i=r.getUserId();if(!i)throw new Ue;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const o=e.getOriginalContent(),{msgtype:r}=o;return("m.text"===r||"m.emote"===r)&&Boolean(o.body)&&"string"==typeof o.body&&e.getSender()===re().getUserId()}(a)}})),P.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=re().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{X({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),pe.use((e=>{const t=re().getRoom(e);if(!t)throw new be;return Object.values(t.currentState.members).map((e=>{const t=re().getUser(e.userId);if(!t)throw new xe;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:{avatarUrl:t.avatarUrl,userId:t.userId,currentlyActive:t.currentlyActive,displayName:t.displayName,lastActiveAgo:t.lastActiveAgo,lastPresenceTs:t.lastPresenceTs,presence:t.presence},userId:e.userId}}(e,t)}))})),A.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{re().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),U.use((()=>re().getPushRules())),F.use((async e=>{try{await re().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),M.use((async e=>{try{console.error("Getting push rules...");const t=await re().getPushRules();console.error(t.global.room),await re().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),C.use((async e=>{await re().deletePushRule(e.scope,e.kind,e.ruleId)})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canPaginateBackward=_,e.$canPaginateForward=$,e.$currentRoomId=T,e.$currentRoomMembers=k,e.$isLive=W,e.$loadRoomFxPending=N,e.$messages=D,e.$paginateBackwardPending=L,e.$paginateForwardPending=S,e.$timelineWindow=B,e.checkEventPermissionsFx=E,e.checkIsDirect=ie,e.client=re,e.createOnSyncThrottled=e=>o.throttle({source:G,timeout:e}),e.createRoomMessageBatch=ae,e.deleteMessageFx=y,e.deleteNotificationRuleFx=C,e.editMessageFx=h,e.getLoggedUserFx=x,e.getNotificationRulesFx=U,e.getRoomInfoFx=b,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=re().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(re().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=R,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(re().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${re().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${re().getAccessToken()}`}}),e.getUrlPreviewFx=A,e.initRoom=K,e.initStoreFx=f,e.loadRoom=J,e.loginByPasswordFx=m,e.loginByTokenFx=u,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>re().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=O,e.onCachedState=H,e.onClientEvent=ne,e.onInitialSync=q,e.onPaginateBackwardDone=j,e.onRoomInitialized=Y,e.onSync=G,e.onUploadProgress=X,e.paginateBackward=Q,e.paginateForward=V,e.prependClientParams=e=>{if("string"==typeof e)return void(ee=e);const{messageBatchInterval:t,...o}=e;ee=o,void 0!==t&&(te=t)},e.readAllMessagesFx=I,e.roomMessage=z,e.searchRoomMessagesFx=v,e.sendMessageFx=w,e.setNotificationRuleActionFx=F,e.setNotificationRuleEnabledFx=M,e.startClientFx=g,e.stopClientFx=p,e.uploadContentFx=P,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
