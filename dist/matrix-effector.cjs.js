"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("patronum/throttle"),t=require("effector"),o=require("matrix-js-sdk"),r=require("@42px/effector-extra"),n=require("patronum/debounce"),a=require("@42px/custom-errors");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=s(o);const c=t.createDomain("root"),d=c.domain("app"),l=d.event(),m=d.event(),u=d.event(),f=d.effect(),g=d.effect(),p=d.effect(),v=d.effect(),w=d.effect(),x=d.effect(),y=d.effect(),R=c.domain("notification"),I=R.effect(),h=R.effect(),b=R.effect(),E=R.effect(),A=c.domain("room"),P=A.store(null),F=A.store(!1),U=A.store(null),M=A.store(null),C=A.store(null),D=A.event(),k=A.event(),B=A.event(),S=A.event(),N=A.event(),T=A.event(),W=A.event(),L=A.effect(),_=A.effect(),z=A.effect(),$=A.effect(),O=A.effect(),j=A.effect(),q=A.effect(),H=A.effect(),K=A.effect(),G=c.domain("messages"),Y=G.store([]),J=G.event(),V=G.event(),Q=G.event(),X=G.effect(),Z=G.effect(),ee=G.effect(),te=G.effect(),oe=G.effect(),re=G.effect(),ne=G.effect(),ae=c.domain("pagination"),se=ae.store(!1),ie=ae.store(!1),ce=ae.store(!0),de=ae.store(!0),le=ae.event(),me=ae.event(),ue=ae.event();var fe;let ge,pe;(fe=exports.MsgType||(exports.MsgType={})).Audio="m.audio",fe.BadEncrypted="m.bad.encrypted",fe.Emote="m.emote",fe.File="m.file",fe.Image="m.image",fe.Notice="m.notice",fe.Text="m.text",fe.Video="m.video",fe.Location="m.location";let ve=500;const we=[],xe=()=>{ge&&(ge.removeAllListeners(),ge=null),ge=i.default.createClient(pe),we.forEach((([e,t])=>{ge.on(e,t)}))},ye=()=>(ge||xe(),ge),Re=e=>{we.push(...e)},Ie=()=>r.batchEvents(J,ve),he="m.room.message",be="m.room.redaction",Ee=a.createCustomError("EventNotFound"),Ae=a.createCustomError("RoomNotFound"),Pe=a.createCustomError("ClientNotInitialized"),Fe=a.createCustomError("TimelineWindowUndefined"),Ue=a.createCustomError("UserNotFound"),Me=a.createCustomError("UserNotLoggedIn");function Ce(e){return{...e.getContent()}}function De(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Ce(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function ke(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Be(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(De(t)),e}const Se=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function Ne(e,t){var o;const r=ye(),n=r.getRoom(e.roomId);if(!n)throw new Ae;const a=n.getLiveTimeline().getEvents();let s=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;s+=1}const i=a.filter((e=>[he,be].includes(e.getType()))).reduce(Be,[]),c=i.length?i[i.length-1]:void 0,d=We(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:s,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function Te(e){return e.getEvents().filter((e=>[he,be].includes(e.getType()))).reduce(Be,[])}const We=e=>{const t=ye().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},Le=t.combine(M,C,((e,t)=>Boolean(e)&&Boolean(t))),_e=A.event(),ze=A.event(),$e=A.event(),Oe=A.effect(),je=A.effect(),qe=A.effect(),He=ae.effect(),Ke=t.attach({source:[M,C],effect:He,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Ge=t.attach({source:[M,C],effect:He,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),Ye=G.event(),Je=G.effect(),Ve=t.guard({source:t.sample(M,[je.done,He.done,Je.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Qe(){return ye().getRooms().map(ke)}t.forward({from:f.done.map((()=>({initialSyncLimit:20}))),to:v}),Re([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==he&&a!==be||!o&&n.liveEvent&&J(De(e))}],["Room.localEchoUpdated",()=>Ye()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Qe();u(e)}else{const e=Qe();l(e)}else{const e=Qe();m(e)}}],["RoomState.members",(e,t,o)=>ze(o)],["RoomState.newMember",(e,t,o)=>ze(o)],["RoomMember.membership",(e,t)=>ze(t)],["RoomMember.name",(e,t)=>ze(t)],["RoomMember.powerLevel",(e,t)=>ze(t)],["RoomMember.typing",(e,t)=>ze(t)],["User.avatarUrl",(e,t)=>_e(t)],["User.presence",(e,t)=>_e(t)],["User.displayName",(e,t)=>_e(t)]]),f.use((e=>ye().login("m.login.password",e))),g.use((e=>ye().login("m.login.token",e))),p.use((async()=>{const{store:e}=ye();if(e)return e.startup()})),v.use((e=>ye().startClient(e))),y.use((()=>ye().logout())),x.use((()=>ye().stopClient())),w.use((async()=>{const e=ye();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=Se(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),I.use((()=>ye().getPushRules())),h.use((async e=>{try{await ye().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),b.use((async e=>{try{console.error("Getting push rules...");const t=await ye().getPushRules();console.error(t.global.room),await ye().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),E.use((async e=>{await ye().deletePushRule(e.scope,e.kind,e.ruleId)}));const Xe=t.attach({effect:je}),Ze=t.attach({effect:je}),et=n.debounce({source:$e,timeout:500});M.on(D,((e,{roomId:t})=>t)),C.on(Oe.doneData,((e,t)=>t)).reset(M),U.on(qe.doneData,((e,t)=>t)).reset(M),t.forward({from:je.pending,to:F}),t.forward({from:D,to:Oe}),t.forward({from:Xe.done,to:k}),t.forward({from:t.sample({source:C,clock:Oe.done,fn:()=>{}}),to:B}),t.forward({from:Ze.done,to:S}),t.guard({source:M,filter:e=>Boolean(e),target:$e}),t.guard({clock:_e,source:U,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:$e}),t.guard({clock:ze,source:M,filter:(e,t)=>e===t.roomId,target:$e}),t.guard({source:M,clock:et,filter:Boolean,target:qe}),t.guard({source:t.sample([M,C],N,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:Le,target:je}),t.guard({source:t.sample([M,C],W,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:Le,target:Ze}),t.guard({source:t.sample([M,C],T,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:Le,target:Xe}),qe.use((e=>{const t=ye().getRoom(e);if(!t)throw new Ae;return Object.values(t.currentState.members).map((e=>{const t=ye().getUser(e.userId);if(!t)throw new Ue;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Se(t),userId:e.userId}}(e,t)}))})),z.use((e=>{const t=ye().getRoom(e);if(!t)throw new Ae;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Oe.use((async({roomId:e})=>{const t=ye(),o=ye().getRoom(e);if(!o)throw new Ae;const r=o.getUnfilteredTimelineSet();return new i.default.TimelineWindow(t,r)})),je.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Fe;await e.load(t,o);const n=e.canPaginate("f");let a=Te(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(i.default.EventTimeline.BACKWARDS,n):await e.paginate(i.default.EventTimeline.FORWARDS,n),t&&(a=Te(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),_.use((e=>{if(!ye())throw new Pe;return e.map((e=>Ne(e,99)))})),L.use((async({term:e,roomId:t,orderBy:r="rank"})=>{const n=ye().getRoom(t);if(!n)throw new Ae;const a={};return(await ye().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:r}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new o.MatrixEvent(e),r=t.getSender();return void 0===a[r]&&(a[r]=n.getMember(r)),t.sender=a[r],De(t)}))})),$.use((()=>ye().getUsers().map(Se))),O.use((async({name:e,isDirect:t,invite:o,visibility:r})=>{const{room_id:n}=await ye().createRoom({name:e,is_direct:t,invite:o,visibility:r});return{roomId:n}})),j.use((async({userId:e,roomId:t})=>{await ye().invite(t,e)})),q.use((async({roomId:e,userId:t,reason:o})=>{await ye().kick(e,t,o)})),H.use((async({roomId:e,name:t})=>{await ye().setRoomName(e,t)})),K.use((async e=>Ne(ke(await ye().joinRoom(e)),99)));const tt=Ie(),ot=t.attach({effect:Ge,mapParams:({messages:e})=>({size:e.length})});Y.on(Ve,((e,{messages:t})=>t)).reset(M),P.on(Ve,((e,{isLive:t})=>t)).reset(M),t.forward({from:t.sample(Y,ot.done,((e,{params:t})=>t.messages)),to:V}),t.forward({from:tt.map((e=>({messages:e}))),to:ot}),t.guard({source:t.sample([M,C],Ye,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:C.map((e=>Boolean(e))),target:Je}),X.use((({roomId:e,content:t,txnId:o})=>ye().sendMessage(e,t,o))),Z.use((({roomId:e,eventId:t,body:o,txnId:r})=>ye().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),ee.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await ye().redactEvent(e,t,void 0,r)).event_id}})),te.use((({roomId:e,eventId:t})=>{const o=ye().getRoom(e);if(!o)throw new Ae;const r=o.findEventById(t);if(!r)throw new Ee;return ye().setRoomReadMarkers(e,t,r)})),re.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const s=ye().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{Q({file:e,loaded:t,total:o})}}),i={promise:s};return s.abort&&(i.abort=s.abort),i})),ne.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{ye().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),oe.use((({eventId:e,roomId:t})=>{const r=ye();if(!r)throw new Pe;const n=r.getRoom(t);if(!n)throw new Ae;const a=n.findEventById(e);if(!a)throw new Ee;const s=r.getUserId();if(!s)throw new Me;return{canRedact:n.currentState.maySendRedactionForEvent(a,s)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===o.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:r}=t;return("m.text"===r||"m.emote"===r)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===ye().getUserId()}(a)}})),Je.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:Te(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const rt=t.combine(Le,ie,se,F,((e,t,o,r)=>e&&!t&&!o&&!r));ie.on(Ke.pending,((e,t)=>t)).reset(M),se.on(Ge.pending,((e,t)=>t)).reset(M),ce.on(Ve,((e,{canPaginateBackward:t})=>t)).reset([N,M]),de.on(Ve,((e,{canPaginateForward:t})=>t)).reset([N,M]),t.forward({from:Ke.done,to:le}),t.guard({source:ue,filter:rt,target:Ke}),t.guard({source:me,filter:rt,target:Ge}),He.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Fe;const a="forward"===t?i.default.EventTimeline.FORWARDS:i.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const s=e.canPaginate("f");return{messages:Te(e),isLive:!s,canPaginateForward:s,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return o.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return o.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return o.RoomMember}}),exports.$canPaginateBackward=ce,exports.$canPaginateForward=de,exports.$currentRoomId=M,exports.$currentRoomMembers=U,exports.$isLive=P,exports.$loadRoomFxPending=F,exports.$messages=Y,exports.$paginateBackwardPending=ie,exports.$paginateForwardPending=se,exports.$timelineWindow=C,exports.checkEventPermissionsFx=oe,exports.checkIsDirect=We,exports.client=ye,exports.createClient=xe,exports.createOnSyncThrottled=t=>e.throttle({source:u,timeout:t}),exports.createRoomFx=O,exports.createRoomMessageBatch=Ie,exports.deleteMessageFx=ee,exports.deleteNotificationRuleFx=E,exports.editMessageFx=Z,exports.getAllUsersFx=$,exports.getLoggedUserFx=w,exports.getNotificationRulesFx=I,exports.getRoomInfoFx=z,exports.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const s=ye().getRoom(e);if(!s)return null;const i=s.getMember(t);return i?i.getAvatarUrl(ye().getHomeserverUrl(),o,r,n,a,!0):null},exports.getRoomsWithActivitiesFx=_,exports.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(ye().getHomeserverUrl(),t,o,r,n,a):null,exports.getUploadCredentials=()=>({endpointUrl:`${ye().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${ye().getAccessToken()}`}}),exports.getUrlPreviewFx=ne,exports.initRoom=D,exports.initStoreFx=p,exports.inviteUserFx=j,exports.joinRoomFx=K,exports.kickUserRoomFx=q,exports.liveTimelineLoaded=k,exports.loadRoom=N,exports.loadRoomMessage=W,exports.loadRoomMessageDone=S,exports.loginByPasswordFx=f,exports.loginByTokenFx=g,exports.logoutFx=y,exports.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>ye().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),exports.newMessagesLoaded=V,exports.onCachedState=m,exports.onClientEvent=Re,exports.onInitialSync=l,exports.onPaginateBackwardDone=le,exports.onRoomInitialized=B,exports.onSync=u,exports.onUploadProgress=Q,exports.paginateBackward=ue,exports.paginateForward=me,exports.prependClientParams=e=>{if("string"==typeof e)return void(pe=e);const{messageBatchInterval:t,...o}=e;pe=o,void 0!==t&&(ve=t)},exports.readAllMessagesFx=te,exports.renameRoomFx=H,exports.roomMessage=J,exports.searchRoomMessagesFx=L,exports.sendMessageFx=X,exports.setNotificationRuleActionFx=h,exports.setNotificationRuleEnabledFx=b,exports.startClientFx=v,exports.stopClientFx=x,exports.toLiveTimeline=T,exports.uploadContentFx=re;
//# sourceMappingURL=matrix-effector.cjs.js.map
