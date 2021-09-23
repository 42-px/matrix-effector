"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("patronum/throttle"),o=require("effector"),r=require("@42px/effector-extra"),n=require("@42px/custom-errors"),a=require("patronum");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i,c=s(e);(i=exports.MsgType||(exports.MsgType={})).Audio="m.audio",i.BadEncrypted="m.bad.encrypted",i.Emote="m.emote",i.File="m.file",i.Image="m.image",i.Notice="m.notice",i.Text="m.text",i.Video="m.video",i.Location="m.location";const l=o.createDomain("matrix"),d=l.effect(),m=l.effect(),u=l.effect(),f=l.effect(),g=l.effect(),p=l.effect(),v=l.effect(),w=l.effect(),x=l.effect(),h=l.effect(),y=l.effect(),I=l.effect(),R=l.effect(),b=l.effect(),A=l.effect(),P=l.effect(),E=l.effect(),U=l.effect(),F=l.effect(),C=l.effect(),M=l.store(null),D=l.store(null),B=l.store(null),T=l.store([]),k=l.store(!1),N=l.store(!1),S=l.store(!1),L=l.store(null),W=l.store(!0),_=l.store(!0),$=l.event(),z=l.event(),O=l.event(),j=l.event(),q=l.event(),H=l.event(),K=l.event(),G=l.event(),Y=l.event(),J=l.event(),V=l.event(),Q=l.event(),X=l.event(),Z=l.event();let ee,te,oe=500;const re=[],ne=()=>(ee||(ee=c.default.createClient(te),re.forEach((([e,t])=>{ee.on(e,t)}))),ee),ae=e=>{re.push(...e)},se=()=>r.batchEvents($,oe),ie=e=>{const t=ne().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},ce=l.event(),le=l.event(),de=l.event(),me=l.event(),ue=l.effect(),fe=l.effect(),ge=l.effect(),pe=l.effect(),ve=l.effect();function we(e){return{...e.getContent()}}function xe(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:we(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function he(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function ye(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(xe(t)),e}const Ie="m.room.message",Re="m.room.redaction",be=n.createCustomError("RoomNotFound"),Ae=n.createCustomError("UserNotFound"),Pe=n.createCustomError("TimelineWindowUndefined"),Ee=n.createCustomError("EventNotFound"),Ue=n.createCustomError("ClientNotInitialized"),Fe=n.createCustomError("UserNotLoggedIn");function Ce(e){return e.getEvents().filter((e=>[Ie,Re].includes(e.getType()))).reduce(ye,[])}const Me=se(),De=o.attach({source:[M,B],effect:ge,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Be=o.attach({source:[M,B],effect:ge,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),Te=o.attach({effect:Be,mapParams:({messages:e})=>({size:e.length})}),ke=o.attach({effect:fe});o.forward({from:o.sample(T,Te.done,((e,{params:t})=>t.messages)),to:z}),o.forward({from:De.done,to:O}),o.forward({from:Me.map((e=>({messages:e}))),to:Te});const Ne=o.combine(M,B,((e,t)=>Boolean(e)&&Boolean(t))),Se=o.combine(Ne,S,N,k,((e,t,o,r)=>e&&!t&&!o&&!r));M.on(K,((e,{roomId:t})=>t)),B.on(ue.doneData,((e,t)=>t)).reset(M);const Le=o.guard({source:o.sample(M,[fe.done,ge.done,pe.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});T.on(Le,((e,{messages:t})=>t)).reset(M),L.on(Le,((e,{isLive:t})=>t)).reset(M),D.on(ve.doneData,((e,t)=>t)).reset(M),W.on(Le,((e,{canPaginateBackward:t})=>t)).reset([Y,M]),_.on(Le,((e,{canPaginateForward:t})=>t)).reset([Y,M]),o.guard({source:M,filter:e=>Boolean(e),target:le});const We=a.debounce({source:le,timeout:500});function _e(){return ne().getRooms().map(he)}o.guard({clock:de,source:M,filter:(e,t)=>e===t.roomId,target:le}),o.guard({clock:me,source:D,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:le}),o.guard({source:M,clock:We,filter:Boolean,target:ve}),o.forward({from:fe.pending,to:k}),o.forward({from:Be.pending,to:N}),o.forward({from:De.pending,to:S}),o.forward({from:o.sample({source:B,clock:ue.done,fn:()=>{}}),to:G}),o.forward({from:ke.done,to:Z}),o.guard({source:o.sample([M,B],ce,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:B.map((e=>Boolean(e))),target:pe}),o.guard({source:o.sample([M,B],Y,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:Ne,target:fe}),o.guard({source:o.sample([M,B],X,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:Ne,target:ke}),o.guard({source:V,filter:Se,target:De}),o.guard({source:J,filter:Se,target:Be}),o.forward({from:K,to:ue}),R.use((async()=>{const e=ne();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;let r=o.avatarUrl,n=o.displayName;if(!(null==o?void 0:o.avatarUrl)||!(null==o?void 0:o.displayName)){const o=await e.getProfileInfo(t);r=o.avatar_url,n=o.displayname}return{avatarUrl:r,userId:o.userId,currentlyActive:o.currentlyActive,displayName:n,lastActiveAgo:o.lastActiveAgo,lastPresenceTs:o.lastPresenceTs,presence:o.presence}})),o.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:f}),d.use((e=>ne().login("m.login.password",e))),m.use((e=>ne().login("m.login.token",e))),u.use((async()=>{const{store:e}=ne();if(e)return e.startup()})),f.use((e=>ne().startClient(e))),p.use((async({term:t,roomId:o,orderBy:r="rank"})=>{const n=ne().getRoom(o);if(!n)throw new be;const a={};return(await ne().search({body:{search_categories:{room_events:{search_term:t,keys:["content.body"],filter:{rooms:[o]},order_by:r}}}})).search_categories.room_events.results.map((({result:t})=>{const o=new e.MatrixEvent(t),r=o.getSender();return void 0===a[r]&&(a[r]=n.getMember(r)),o.sender=a[r],xe(o)}))})),v.use((({roomId:e,content:t,txnId:o})=>ne().sendMessage(e,t,o))),w.use((({roomId:e,eventId:t,body:o,txnId:r})=>ne().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),x.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await ne().redactEvent(e,t,void 0,r)).event_id}})),ae([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Ie&&a!==Re||!o&&n.liveEvent&&$(xe(e))}],["Room.localEchoUpdated",()=>ce()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=_e();H(e)}else{const e=_e();j(e)}else{const e=_e();q(e)}}],["RoomState.members",(e,t,o)=>de(o)],["RoomState.newMember",(e,t,o)=>de(o)],["RoomMember.membership",(e,t)=>de(t)],["RoomMember.name",(e,t)=>de(t)],["RoomMember.powerLevel",(e,t)=>de(t)],["RoomMember.typing",(e,t)=>de(t)],["User.avatarUrl",(e,t)=>me(t)],["User.presence",(e,t)=>me(t)],["User.displayName",(e,t)=>me(t)]]),h.use((({roomId:e,eventId:t})=>{const o=ne().getRoom(e);if(!o)throw new be;const r=o.findEventById(t);if(!r)throw new Ee;return ne().setRoomReadMarkers(e,t,r)})),y.use((e=>{const t=ne();if(!t)throw new Ue;return e.map((e=>{var o;const r=t.getRoom(e.roomId);if(!r)throw new be;const n=r.getLiveTimeline().getEvents();let a=0;for(let e=n.length-1;e>=0&&e!==n.length-99;e--){const o=n[e];if(r.hasUserReadEvent(t.getUserId(),o.getId()))break;a+=1}const s=n.filter((e=>[Ie,Re].includes(e.getType()))).reduce(ye,[]),i=s.length?s[s.length-1]:void 0,c=ie(r.roomId),l=c?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:i,isDirect:c,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:r.getLastActiveTimestamp()}}))})),g.use((()=>ne().stopClient())),fe.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Pe;await e.load(t,o);const n=e.canPaginate("f");let a=Ce(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=Ce(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),ge.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Pe;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const s=e.canPaginate("f");return{messages:Ce(e),isLive:!s,canPaginateForward:s,canPaginateBackward:e.canPaginate("b")}})),pe.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:Ce(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),I.use((e=>{const t=ne().getRoom(e);if(!t)throw new be;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),ue.use((async({roomId:e})=>{const t=ne(),o=ne().getRoom(e);if(!o)throw new be;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),b.use((({eventId:t,roomId:o})=>{const r=ne();if(!r)throw new Ue;const n=r.getRoom(o);if(!n)throw new be;const a=n.findEventById(t);if(!a)throw new Ee;const s=r.getUserId();if(!s)throw new Fe;return{canRedact:n.currentState.maySendRedactionForEvent(a,s)&&"m.room.server_acl"!==a.getType(),canEdit:function(t){if(t.status===e.EventStatus.CANCELLED||"m.room.message"!==t.getType()||t.isRedacted())return!1;const o=t.getOriginalContent(),{msgtype:r}=o;return("m.text"===r||"m.emote"===r)&&Boolean(o.body)&&"string"==typeof o.body&&t.getSender()===ne().getUserId()}(a)}})),A.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const s=ne().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{Q({file:e,loaded:t,total:o})}}),i={promise:s};return s.abort&&(i.abort=s.abort),i})),ve.use((e=>{const t=ne().getRoom(e);if(!t)throw new be;return Object.values(t.currentState.members).map((e=>{const t=ne().getUser(e.userId);if(!t)throw new Ae;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:{avatarUrl:t.avatarUrl,userId:t.userId,currentlyActive:t.currentlyActive,displayName:t.displayName,lastActiveAgo:t.lastActiveAgo,lastPresenceTs:t.lastPresenceTs,presence:t.presence},userId:e.userId}}(e,t)}))})),P.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{ne().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),E.use((()=>ne().getPushRules())),U.use((async e=>{try{await ne().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),F.use((async e=>{try{console.error("Getting push rules...");const t=await ne().getPushRules();console.error(t.global.room),await ne().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),C.use((async e=>{await ne().deletePushRule(e.scope,e.kind,e.ruleId)})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canPaginateBackward=W,exports.$canPaginateForward=_,exports.$currentRoomId=M,exports.$currentRoomMembers=D,exports.$isLive=L,exports.$loadRoomFxPending=k,exports.$messages=T,exports.$paginateBackwardPending=S,exports.$paginateForwardPending=N,exports.$timelineWindow=B,exports.checkEventPermissionsFx=b,exports.checkIsDirect=ie,exports.client=ne,exports.createOnSyncThrottled=e=>t.throttle({source:H,timeout:e}),exports.createRoomMessageBatch=se,exports.deleteMessageFx=x,exports.deleteNotificationRuleFx=C,exports.editMessageFx=w,exports.getLoggedUserFx=R,exports.getNotificationRulesFx=E,exports.getRoomInfoFx=I,exports.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const s=ne().getRoom(e);if(!s)return null;const i=s.getMember(t);return i?i.getAvatarUrl(ne().getHomeserverUrl(),o,r,n,a,!0):null},exports.getRoomsWithActivitiesFx=y,exports.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(ne().getHomeserverUrl(),t,o,r,n,a):null,exports.getUploadCredentials=()=>({endpointUrl:`${ne().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${ne().getAccessToken()}`}}),exports.getUrlPreviewFx=P,exports.initRoom=K,exports.initStoreFx=u,exports.liveTimelineLoaded=Z,exports.loadRoom=Y,exports.loginByPasswordFx=d,exports.loginByTokenFx=m,exports.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>ne().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),exports.newMessagesLoaded=z,exports.onCachedState=q,exports.onClientEvent=ae,exports.onInitialSync=j,exports.onPaginateBackwardDone=O,exports.onRoomInitialized=G,exports.onSync=H,exports.onUploadProgress=Q,exports.paginateBackward=V,exports.paginateForward=J,exports.prependClientParams=e=>{if("string"==typeof e)return void(te=e);const{messageBatchInterval:t,...o}=e;te=o,void 0!==t&&(oe=t)},exports.readAllMessagesFx=h,exports.roomMessage=$,exports.searchRoomMessagesFx=p,exports.sendMessageFx=v,exports.setNotificationRuleActionFx=U,exports.setNotificationRuleEnabledFx=F,exports.startClientFx=f,exports.stopClientFx=g,exports.toLiveTimeline=X,exports.uploadContentFx=A;
//# sourceMappingURL=matrix-effector.cjs.js.map
