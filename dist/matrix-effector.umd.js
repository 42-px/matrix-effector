!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("patronum/throttle"),require("effector"),require("matrix-js-sdk"),require("@42px/effector-extra"),require("patronum/debounce"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","patronum/throttle","effector","matrix-js-sdk","@42px/effector-extra","patronum/debounce","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.throttle,e.effector,e.matrix,e.effectorExtra,e.debounce,e.customErrors)}(this,(function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),p=l.effect(),w=l.effect(),y=l.effect(),h=l.effect(),R=l.effect(),I=d.domain("notification"),b=I.effect(),x=I.effect(),E=I.effect(),P=I.effect(),A=d.domain("room"),C=A.store(null),F=A.store(!1),U=A.store(null),D=A.store(null),M=A.event(),S=A.store(null),k=A.event(),B=A.event(),T=A.event(),N=A.event(),_=A.event(),L=A.event(),W=A.event(),z=A.event(),j=A.event(),$=A.event(),O=A.effect(),K=A.effect(),q=A.effect(),H=A.effect(),G=A.effect(),V=A.effect(),Y=A.effect(),J=A.effect(),Q=A.effect(),X=A.effect();var Z,ee;(Z=e.Visibility||(e.Visibility={})).public="public",Z.private="private",(ee=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",ee.privateChat="private_chat",ee.publicChat="public_chat";const te=d.domain("messages"),oe=te.store([]),re=te.event(),ne=te.event(),ae=te.event(),ie=te.effect(),se=te.effect(),ce=te.effect(),de=te.effect(),le=te.effect(),me=te.effect(),ue=te.effect(),fe=d.domain("pagination"),ge=fe.store(!1),ve=fe.store(!1),pe=fe.store(!0),we=fe.store(!0),ye=fe.event(),he=fe.event(),Re=fe.event(),Ie=fe.event();var be;let xe,Ee;(be=e.MsgType||(e.MsgType={})).Audio="m.audio",be.BadEncrypted="m.bad.encrypted",be.Emote="m.emote",be.File="m.file",be.Image="m.image",be.Notice="m.notice",be.Text="m.text",be.Video="m.video",be.Location="m.location";let Pe=500;const Ae=[],Ce=()=>{xe&&(xe.removeAllListeners(),xe=null),xe=c.default.createClient(Ee),Ae.forEach((([e,t])=>{xe.on(e,t)}))},Fe=()=>(xe||Ce(),xe),Ue=e=>{Ae.push(...e)},De=()=>n.batchEvents(re,Pe),Me="m.room.message",Se="m.room.redaction",ke="m.direct",Be=i.createCustomError("EventNotFound"),Te=i.createCustomError("RoomNotFound"),Ne=i.createCustomError("ClientNotInitialized"),_e=i.createCustomError("TimelineWindowUndefined"),Le=i.createCustomError("UserNotFound"),We=i.createCustomError("UserNotLoggedIn");function ze(e){return{...e.getContent()}}function je(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:ze(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function $e(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Oe(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(je(t)),e}const Ke=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function qe(e,t){var o;const r=Fe(),n=r.getRoom(e.roomId);if(!n)throw new Te;const a=n.getLiveTimeline().getEvents();let i=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;i+=1}const s=a.filter((e=>[Me,Se].includes(e.getType()))).reduce(Oe,[]),c=s.length?s[s.length-1]:void 0,d=Ve(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function He(e){return e.getEvents().filter((e=>[Me,Se].includes(e.getType()))).reduce(Oe,[])}const Ge=()=>{var e;const t=null===(e=Fe().getAccountData(ke))||void 0===e?void 0:e.getContent();return t&&Object.values(t).flatMap((e=>e))},Ve=e=>Ge().includes(e),Ye=e=>{var t,o,r;const n=Fe(),{creator:a}=null===(o=(null===(t=n.getRoom(e))||void 0===t?void 0:t.currentState.getStateEvents("m.room.create",void 0))[0])||void 0===o?void 0:o.getContent(),i=null===(r=n.getAccountData(ke))||void 0===r?void 0:r.getContent();return n.setAccountData(ke,{...i,[a]:[e]})},Je=o.combine(D,S,((e,t)=>Boolean(e)&&Boolean(t))),Qe=A.event(),Xe=A.event(),Ze=A.event(),et=A.effect(),tt=A.effect(),ot=A.effect(),rt=fe.effect(),nt=o.attach({source:[D,S],effect:rt,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),at=o.attach({source:[D,S],effect:rt,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),it=te.event(),st=te.effect(),ct=o.guard({source:o.sample(D,[tt.done,rt.done,st.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function dt(){return Fe().getRooms().map($e)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:w}),Ue([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Me&&a!==Se||!o&&n.liveEvent&&re(je(e))}],["Room",e=>{var t,o;const r=Fe(),n=e.getMember(r.getUserId());if(n&&"invite"!==n.membership)return;(null===(o=null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t?void 0:t.getContent())||void 0===o?void 0:o.isDirect)?j(e):$(e)}],["Room.localEchoUpdated",()=>it()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=dt();f(e)}else{const e=dt();m(e)}else{const e=dt();u(e)}}],["RoomState.members",(e,t,o)=>Xe(o)],["RoomState.newMember",(e,t,o)=>Xe(o)],["RoomMember.membership",(e,t)=>Xe(t)],["RoomMember.name",(e,t)=>Xe(t)],["RoomMember.powerLevel",(e,t)=>Xe(t)],["RoomMember.typing",(e,t)=>Xe(t)],["User.avatarUrl",(e,t)=>Qe(t)],["User.presence",(e,t)=>Qe(t)],["User.displayName",(e,t)=>Qe(t)]]),g.use((e=>Fe().login("m.login.password",e))),v.use((e=>Fe().login("m.login.token",e))),p.use((async()=>{const{store:e}=Fe();if(e)return e.startup()})),w.use((e=>Fe().startClient(e))),R.use((()=>Fe().logout())),h.use((()=>Fe().stopClient())),y.use((async()=>{const e=Fe();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=Ke(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),b.use((()=>Fe().getPushRules())),x.use((async e=>{try{await Fe().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),E.use((async e=>{try{console.error("Getting push rules...");const t=await Fe().getPushRules();console.error(t.global.room),await Fe().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),P.use((async e=>{await Fe().deletePushRule(e.scope,e.kind,e.ruleId)}));const lt=o.attach({effect:tt}),mt=o.attach({effect:tt}),ut=o.attach({effect:tt}),ft=a.debounce({source:Ze,timeout:500});console.log("ЭТА СЕКЦИЯ"),D.on(k,((e,{roomId:t})=>(console.log("ВОТ ОНА ПЯТАЯ КОЛОННА"),console.log(e),console.log(t),t))),console.log("КОНЕЦ ЭТОЙ СЕКЦИИ СЕКЦИЯ"),S.on(et.doneData,((e,t)=>t)).reset(D),U.on(ot.doneData,((e,t)=>t)).reset(D),o.forward({from:tt.pending,to:F}),o.forward({from:k,to:et}),o.forward({from:lt.done,to:B}),o.forward({from:o.sample({source:S,clock:et.done,fn:()=>{}}),to:T}),o.forward({from:mt.done,to:N}),o.forward({from:ut.done,to:_}),o.guard({source:D,filter:e=>Boolean(e),target:Ze}),o.guard({clock:Qe,source:U,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:Ze}),o.guard({clock:Xe,source:D,filter:(e,t)=>e===t.roomId,target:Ze}),o.guard({source:D,clock:ft,filter:Boolean,target:ot}),o.guard({source:o.sample([D,S],L,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:Je,target:ut}),o.guard({source:o.sample([D,S],z,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:Je,target:mt}),o.guard({source:o.sample([D,S],W,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:Je,target:lt}),ot.use((e=>{const t=Fe().getRoom(e);if(!t)throw new Te;return Object.values(t.currentState.members).map((e=>{const t=Fe().getUser(e.userId);if(!t)throw new Le;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ke(t),userId:e.userId}}(e,t)}))})),q.use((e=>{const t=Fe().getRoom(e);if(!t)throw new Te;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),et.use((async({roomId:e})=>{const t=Fe(),o=Fe().getRoom(e);if(!o)throw new Te;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),tt.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new _e;await e.load(t,o);const n=e.canPaginate("f");let a=He(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=He(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),K.use((e=>{if(!Fe())throw new Ne;return e.map((e=>qe(e,99)))})),O.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=Fe().getRoom(t);if(!n)throw new Te;const a={};return(await Fe().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],je(t)}))})),H.use((()=>Fe().getUsers().map(Ke))),G.use((async({name:e,invite:t,visibility:o,initialState:r=[],preset:n})=>{const a={name:e,invite:t,visibility:o,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:n},{room_id:i}=await Fe().createRoom(a);return{roomId:i}})),V.use((async({user:t,preset:o,initialState:r=[]})=>{const n=Fe(),a=Ge().find((e=>{var o;return null===(o=n.getRoom(e))||void 0===o?void 0:o.currentState.members[t.userId]}));if(a)return{roomId:a};const i={is_direct:!0,invite:[t.userId],visibility:e.Visibility.private,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:o,creation_content:{isDirect:!0,creator:n.getUserId()}},{room_id:s}=await n.createRoom(i);return await Ye(s),{roomId:s}})),Y.use((async({userId:e,roomId:t})=>{await Fe().invite(t,e)})),J.use((async({roomId:e,userId:t,reason:o})=>{await Fe().kick(e,t,o)})),Q.use((async({roomId:e,name:t})=>{await Fe().setRoomName(e,t)})),X.use((async({roomId:e,isDirect:t=!1})=>{const o=Fe(),r=await o.joinRoom(e);return t&&await Ye(e),qe($e(r),99)}));const gt=De(),vt=o.attach({effect:at,mapParams:({messages:e})=>({size:e.length})});oe.on(ct,((e,{messages:t})=>t)).reset(D),C.on(ct,((e,{isLive:t})=>t)).reset(D),o.forward({from:o.sample(oe,vt.done,((e,{params:t})=>t.messages)),to:ne}),o.forward({from:gt.map((e=>({messages:e}))),to:vt}),o.guard({source:o.sample([D,S],it,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:S.map((e=>Boolean(e))),target:st}),ie.use((({roomId:e,content:t,txnId:o})=>Fe().sendMessage(e,t,o))),se.use((({roomId:e,eventId:t,body:o,txnId:r})=>Fe().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),ce.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await Fe().redactEvent(e,t,void 0,r)).event_id}})),de.use((({roomId:e,eventId:t})=>{const o=Fe().getRoom(e);if(!o)throw new Te;const r=o.findEventById(t);if(!r)throw new Be;return Fe().setRoomReadMarkers(e,t,r)})),me.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=Fe().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{ae({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),ue.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{Fe().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),le.use((({eventId:e,roomId:t})=>{const o=Fe();if(!o)throw new Ne;const n=o.getRoom(t);if(!n)throw new Te;const a=n.findEventById(e);if(!a)throw new Be;const i=o.getUserId();if(!i)throw new We;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===Fe().getUserId()}(a)}})),st.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:He(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const pt=o.combine(Je,ve,ge,F,((e,t,o,r)=>e&&!t&&!o&&!r));ve.on(nt.pending,((e,t)=>t)).reset(D),ge.on(at.pending,((e,t)=>t)).reset(D),pe.on(ct,((e,{canPaginateBackward:t})=>t)).reset([L,D]),we.on(ct,((e,{canPaginateForward:t})=>t)).reset([L,D]),o.forward({from:nt.done,to:ye}),o.forward({from:at.done,to:he}),o.guard({source:Ie,filter:pt,target:nt}),o.guard({source:Re,filter:pt,target:at}),rt.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new _e;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:He(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canPaginateBackward=pe,e.$canPaginateForward=we,e.$currentRoomId=D,e.$currentRoomMembers=U,e.$isLive=C,e.$loadRoomFxPending=F,e.$messages=oe,e.$paginateBackwardPending=ve,e.$paginateForwardPending=ge,e.$timelineWindow=S,e.checkEventPermissionsFx=le,e.checkIsDirect=Ve,e.clearCurrentRoomId=M,e.client=Fe,e.createClient=Ce,e.createDirectRoomFx=V,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=G,e.createRoomMessageBatch=De,e.deleteMessageFx=ce,e.deleteNotificationRuleFx=P,e.directRoomCreated=j,e.editMessageFx=se,e.getAllUsersFx=H,e.getLoggedUserFx=y,e.getNotificationRulesFx=b,e.getRoomInfoFx=q,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=Fe().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(Fe().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=K,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(Fe().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${Fe().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${Fe().getAccessToken()}`}}),e.getUrlPreviewFx=ue,e.initRoom=k,e.initStoreFx=p,e.inviteUserFx=Y,e.joinRoomFx=X,e.kickUserRoomFx=J,e.liveTimelineLoaded=B,e.loadRoom=L,e.loadRoomMessage=z,e.loadRoomMessageDone=N,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=R,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>Fe().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=ne,e.onCachedState=u,e.onClientEvent=Ue,e.onInitialSync=m,e.onPaginateBackwardDone=ye,e.onPaginateForwardDone=he,e.onRoomInitialized=T,e.onRoomLoaded=_,e.onSync=f,e.onUploadProgress=ae,e.paginateBackward=Ie,e.paginateForward=Re,e.prependClientParams=e=>{if("string"==typeof e)return void(Ee=e);const{messageBatchInterval:t,...o}=e;Ee=o,void 0!==t&&(Pe=t)},e.readAllMessagesFx=de,e.renameRoomFx=Q,e.roomCreated=$,e.roomMessage=re,e.searchRoomMessagesFx=O,e.sendMessageFx=ie,e.setNotificationRuleActionFx=x,e.setNotificationRuleEnabledFx=E,e.startClientFx=w,e.stopClientFx=h,e.toLiveTimeline=W,e.uploadContentFx=me,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
