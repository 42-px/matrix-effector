!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("patronum/throttle"),require("effector"),require("matrix-js-sdk"),require("@42px/effector-extra"),require("patronum/debounce"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","patronum/throttle","effector","matrix-js-sdk","@42px/effector-extra","patronum/debounce","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.throttle,e.effector,e.matrix,e.effectorExtra,e.debounce,e.customErrors)}(this,(function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),p=l.effect(),w=l.effect(),y=l.effect(),R=l.effect(),h=l.effect(),I=d.domain("notification"),b=I.effect(),x=I.effect(),E=I.effect(),D=I.effect(),P=d.domain("room"),F=P.store(null),A=P.store(!1),C=P.store(null),U=P.store(null),k=P.event(),M=P.store(null),S=P.store(0),B=P.store(50),L=P.store(50),_=P.store(50),T=P.store(0),N=P.store(50),W=P.store(50),$=o.combine(S,B,((e,t)=>e>=t)),q=o.combine(S,L,((e,t)=>e>=t)),z=o.combine(S,_,((e,t)=>e>=t)),j=o.combine(S,T,((e,t)=>e>=t)),K=o.combine(S,N,((e,t)=>e>=t)),O=o.combine(S,W,((e,t)=>e>=t)),H=P.event(),G=P.event(),V=P.event(),Y=P.event(),J=P.event(),Q=P.event(),X=P.event(),Z=P.event(),ee=P.event(),te=P.event(),oe=P.effect(),re=P.effect(),ne=P.effect(),ae=P.effect(),ie=P.effect(),se=P.effect(),ce=P.effect(),de=P.effect(),le=P.effect(),me=P.effect();var ue,fe;(ue=e.Visibility||(e.Visibility={})).public="public",ue.private="private",(fe=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",fe.privateChat="private_chat",fe.publicChat="public_chat";const ge=d.domain("messages"),ve=ge.store([]),pe=ge.event(),we=ge.event(),ye=ge.event(),Re=ge.effect(),he=ge.effect(),Ie=ge.effect(),be=ge.effect(),xe=ge.effect(),Ee=ge.effect(),De=ge.effect(),Pe=d.domain("pagination"),Fe=Pe.store(!1),Ae=Pe.store(!1),Ce=Pe.store(!0),Ue=Pe.store(!0),ke=Pe.event(),Me=Pe.event(),Se=Pe.event(),Be=Pe.event();var Le;let _e,Te;(Le=e.MsgType||(e.MsgType={})).Audio="m.audio",Le.BadEncrypted="m.bad.encrypted",Le.Emote="m.emote",Le.File="m.file",Le.Image="m.image",Le.Notice="m.notice",Le.Text="m.text",Le.Video="m.video",Le.Location="m.location";let Ne=500;const We=[],$e=()=>{_e&&(_e.removeAllListeners(),_e=null),_e=c.default.createClient(Te),We.forEach((([e,t])=>{_e.on(e,t)}))},qe=()=>(_e||$e(),_e),ze=e=>{We.push(...e)},je=()=>n.batchEvents(pe,Ne),Ke="m.room.message",Oe="m.room.redaction",He="m.direct",Ge=o.combine(U,M,((e,t)=>Boolean(e)&&Boolean(t))),Ve=P.event(),Ye=P.event(),Je=P.event(),Qe=P.effect(),Xe=P.effect(),Ze=P.effect(),et=P.effect(),tt=P.effect(),ot=Pe.effect(),rt=o.attach({source:[U,M],effect:ot,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),nt=o.attach({source:[U,M],effect:ot,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),at=ge.event(),it=ge.effect(),st=o.guard({source:o.sample(U,[Xe.done,ot.done,it.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function ct(){return qe().getRooms().map(Et)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:w}),ze([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Ke&&a!==Oe||!o&&n.liveEvent&&pe(xt(e))}],["Room",e=>{var t,o;const r=qe(),n=e.getMember(r.getUserId());if(n&&"invite"!==n.membership)return;(null===(o=null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t?void 0:t.getContent())||void 0===o?void 0:o.isDirect)?ee(e):te(e)}],["Room.localEchoUpdated",()=>at()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=ct();f(e)}else{const e=ct();m(e)}else{const e=ct();u(e)}}],["RoomState.members",(e,t,o)=>Ye(o)],["RoomState.newMember",(e,t,o)=>Ye(o)],["RoomMember.membership",(e,t)=>Ye(t)],["RoomMember.name",(e,t)=>Ye(t)],["RoomMember.powerLevel",(e,t)=>Ye(t)],["RoomMember.typing",(e,t)=>Ye(t)],["User.avatarUrl",(e,t)=>Ve(t)],["User.presence",(e,t)=>Ve(t)],["User.displayName",(e,t)=>Ve(t)]]),g.use((e=>qe().login("m.login.password",e))),v.use((e=>qe().login("m.login.token",e))),p.use((async()=>{const{store:e}=qe();if(e)return e.startup()})),w.use((e=>qe().startClient(e))),h.use((()=>qe().logout())),R.use((()=>qe().stopClient())),y.use((async()=>{const e=qe();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=Pt(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),b.use((()=>qe().getPushRules())),x.use((async e=>{try{await qe().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),E.use((async e=>{try{console.error("Getting push rules...");const t=await qe().getPushRules();console.error(t.global.room),await qe().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),D.use((async e=>{await qe().deletePushRule(e.scope,e.kind,e.ruleId)}));const dt=i.createCustomError("EventNotFound"),lt=i.createCustomError("RoomNotFound"),mt=i.createCustomError("ClientNotInitialized"),ut=i.createCustomError("TimelineWindowUndefined"),ft=i.createCustomError("UserNotFound"),gt=i.createCustomError("UserNotLoggedIn"),vt=o.attach({effect:Xe}),pt=o.attach({effect:Xe}),wt=o.attach({effect:Xe}),yt=a.debounce({source:Je,timeout:500});U.on(H,((e,{roomId:t})=>t)).reset(k),M.on(Qe.doneData,((e,t)=>t)).reset(U),C.on(Ze.doneData,((e,t)=>t)).reset(U),S.on(et.doneData,((e,t)=>t)).reset(U),B.on(tt.doneData,((e,t)=>t.kick)).reset(U),_.on(tt.doneData,((e,t)=>t.ban)).reset(U),L.on(tt.doneData,((e,t)=>t.invite)).reset(U),T.on(tt.doneData,((e,t)=>t.defaultEvents)).reset(U),N.on(tt.doneData,((e,t)=>t.redact)).reset(U),W.on(tt.doneData,((e,t)=>t.stateDefault)).reset(U),o.forward({from:Xe.pending,to:A}),o.forward({from:H,to:Qe}),o.forward({from:vt.done,to:G}),o.forward({from:o.sample({source:M,clock:Qe.done,fn:()=>{}}),to:V}),o.forward({from:pt.done,to:Y}),o.forward({from:wt.done,to:J}),o.guard({source:U,filter:e=>Boolean(e),target:Je}),o.guard({clock:Ve,source:C,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:Je}),o.guard({clock:Ye,source:U,filter:(e,t)=>e===t.roomId,target:Je}),o.guard({source:U,clock:yt,filter:Boolean,target:Ze}),o.guard({source:o.sample([U,M],Q,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:Ge,target:wt}),o.guard({source:o.sample([U,M],Z,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:Ge,target:pt}),o.guard({source:o.sample([U,M],X,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:Ge,target:vt}),o.guard({clock:U,filter:Boolean,target:[et,tt]}),et.use((e=>{const t=qe(),o=t.getRoom(e),r=t.getUserId();if(!r)throw new ft;const n=o.getMember(r);if(!n)throw new ft;return n.powerLevel})),tt.use((e=>{var t,o,r,n,a,i;const s=qe().getRoom(e).currentState.getStateEvents("m.room.power_levels","")[0].getContent();return{kick:null!==(t=s.kick)&&void 0!==t?t:50,ban:null!==(o=s.ban)&&void 0!==o?o:50,invite:null!==(r=s.invite)&&void 0!==r?r:50,defaultEvents:null!==(n=s.events_default)&&void 0!==n?n:0,stateDefault:null!==(a=s.state_default)&&void 0!==a?a:0,redact:null!==(i=s.redact)&&void 0!==i?i:50}})),Ze.use((e=>{const t=qe().getRoom(e);if(!t)throw new lt;return Object.values(t.currentState.members).map((e=>{const t=qe().getUser(e.userId);if(!t)throw new ft;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Pt(t),userId:e.userId}}(e,t)}))})),ne.use((e=>{const t=qe().getRoom(e);if(!t)throw new lt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Qe.use((async({roomId:e})=>{const t=qe(),o=qe().getRoom(e);if(!o)throw new lt;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),Xe.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new ut;await e.load(t,o);const n=e.canPaginate("f");let a=At(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=At(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),re.use((e=>{if(!qe())throw new mt;return e.map((e=>Ft(e,99)))})),oe.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=qe().getRoom(t);if(!n)throw new lt;const a={};return(await qe().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],xt(t)}))})),ae.use((()=>qe().getUsers().map(Pt))),ie.use((async({name:e,invite:t,visibility:o,initialState:r=[],preset:n})=>{const a={name:e,invite:t,visibility:o,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:n},{room_id:i}=await qe().createRoom(a);return{roomId:i}})),se.use((async({user:t,preset:o,initialState:r=[]})=>{const n=qe(),a=Ct().find((e=>{var o;return null===(o=n.getRoom(e))||void 0===o?void 0:o.currentState.members[t.userId]}));if(a)return{roomId:a};const i={is_direct:!0,invite:[t.userId],visibility:e.Visibility.private,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:o,creation_content:{isDirect:!0,creator:n.getUserId()}},{room_id:s}=await n.createRoom(i);return await kt(s),{roomId:s}})),ce.use((async({userId:e,roomId:t})=>{await qe().invite(t,e)})),de.use((async({roomId:e,userId:t,reason:o})=>{await qe().kick(e,t,o)})),le.use((async({roomId:e,name:t})=>{await qe().setRoomName(e,t)})),me.use((async({roomId:e,isDirect:t=!1})=>{const o=qe(),r=await o.joinRoom(e);return t&&await kt(e),Ft(Et(r),99)}));const Rt=je(),ht=o.attach({effect:nt,mapParams:({messages:e})=>({size:e.length})});ve.on(st,((e,{messages:t})=>t)).reset(U),F.on(st,((e,{isLive:t})=>t)).reset(U),o.forward({from:o.sample(ve,ht.done,((e,{params:t})=>t.messages)),to:we}),o.forward({from:Rt.map((e=>({messages:e}))),to:ht}),o.guard({source:o.sample([U,M],at,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:M.map((e=>Boolean(e))),target:it}),Re.use((({roomId:e,content:t,txnId:o})=>qe().sendMessage(e,t,o))),he.use((({roomId:e,eventId:t,body:o,txnId:r})=>qe().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),Ie.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await qe().redactEvent(e,t,void 0,r)).event_id}})),be.use((({roomId:e,eventId:t})=>{const o=qe().getRoom(e);if(!o)throw new lt;const r=o.findEventById(t);if(!r)throw new dt;return qe().setRoomReadMarkers(e,t,r)})),Ee.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=qe().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{ye({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),De.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{qe().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),xe.use((({eventId:e,roomId:t})=>{const o=qe();if(!o)throw new mt;const n=o.getRoom(t);if(!n)throw new lt;const a=n.findEventById(e);if(!a)throw new dt;const i=o.getUserId();if(!i)throw new gt;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===qe().getUserId()}(a)}})),it.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:At(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const It=o.combine(Ge,Ae,Fe,A,((e,t,o,r)=>e&&!t&&!o&&!r));function bt(e){return{...e.getContent()}}function xt(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:bt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Et(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Dt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(xt(t)),e}Ae.on(rt.pending,((e,t)=>t)).reset(U),Fe.on(nt.pending,((e,t)=>t)).reset(U),Ce.on(st,((e,{canPaginateBackward:t})=>t)).reset([Q,U]),Ue.on(st,((e,{canPaginateForward:t})=>t)).reset([Q,U]),o.forward({from:rt.done,to:ke}),o.forward({from:nt.done,to:Me}),o.guard({source:Be,filter:It,target:rt}),o.guard({source:Se,filter:It,target:nt}),ot.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new ut;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:At(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}}));const Pt=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function Ft(e,t){var o;const r=qe(),n=r.getRoom(e.roomId);if(!n)throw new lt;const a=n.getLiveTimeline().getEvents();let i=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;i+=1}const s=a.filter((e=>[Ke,Oe].includes(e.getType()))).reduce(Dt,[]),c=s.length?s[s.length-1]:void 0,d=Ut(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function At(e){return e.getEvents().filter((e=>[Ke,Oe].includes(e.getType()))).reduce(Dt,[])}const Ct=()=>{var e;const t=null===(e=qe().getAccountData(He))||void 0===e?void 0:e.getContent();return t&&Object.values(t).flatMap((e=>e))},Ut=e=>Ct().includes(e),kt=e=>{var t,o,r;const n=qe(),{creator:a}=null===(o=(null===(t=n.getRoom(e))||void 0===t?void 0:t.currentState.getStateEvents("m.room.create",void 0))[0])||void 0===o?void 0:o.getContent(),i=null===(r=n.getAccountData(He))||void 0===r?void 0:r.getContent();return n.setAccountData(He,{...i,[a]:[e]})};Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canBan=z,e.$canInvite=q,e.$canKick=$,e.$canPaginateBackward=Ce,e.$canPaginateForward=Ue,e.$canRedact=K,e.$canSendDefaultEvent=j,e.$canSetDefaultState=O,e.$currentRoomId=U,e.$currentRoomMembers=C,e.$isLive=F,e.$loadRoomFxPending=A,e.$messages=ve,e.$myPowerLevel=S,e.$paginateBackwardPending=Ae,e.$paginateForwardPending=Fe,e.$requiredPowerLevelForBan=_,e.$requiredPowerLevelForDefaultEvents=T,e.$requiredPowerLevelForDefaultState=W,e.$requiredPowerLevelForInvite=L,e.$requiredPowerLevelForKick=B,e.$requiredPowerLevelForRedact=N,e.$timelineWindow=M,e.checkEventPermissionsFx=xe,e.checkIsDirect=Ut,e.clearCurrentRoomState=k,e.client=qe,e.createClient=$e,e.createDirectRoomFx=se,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=ie,e.createRoomMessageBatch=je,e.deleteMessageFx=Ie,e.deleteNotificationRuleFx=D,e.directRoomCreated=ee,e.editMessageFx=he,e.getAllUsersFx=ae,e.getLoggedUserFx=y,e.getNotificationRulesFx=b,e.getRoomInfoFx=ne,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=qe().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(qe().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=re,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(qe().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${qe().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${qe().getAccessToken()}`}}),e.getUrlPreviewFx=De,e.initRoom=H,e.initStoreFx=p,e.inviteUserFx=ce,e.joinRoomFx=me,e.kickUserRoomFx=de,e.liveTimelineLoaded=G,e.loadRoom=Q,e.loadRoomMessage=Z,e.loadRoomMessageDone=Y,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=h,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>qe().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=we,e.onCachedState=u,e.onClientEvent=ze,e.onInitialSync=m,e.onPaginateBackwardDone=ke,e.onPaginateForwardDone=Me,e.onRoomInitialized=V,e.onRoomLoaded=J,e.onSync=f,e.onUploadProgress=ye,e.paginateBackward=Be,e.paginateForward=Se,e.prependClientParams=e=>{if("string"==typeof e)return void(Te=e);const{messageBatchInterval:t,...o}=e;Te=o,void 0!==t&&(Ne=t)},e.readAllMessagesFx=be,e.renameRoomFx=le,e.roomCreated=te,e.roomMessage=pe,e.searchRoomMessagesFx=oe,e.sendMessageFx=Re,e.setNotificationRuleActionFx=x,e.setNotificationRuleEnabledFx=E,e.startClientFx=w,e.stopClientFx=R,e.toLiveTimeline=X,e.uploadContentFx=Ee,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
