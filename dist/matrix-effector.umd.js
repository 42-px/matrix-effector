!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("patronum/throttle"),require("effector"),require("matrix-js-sdk"),require("@42px/effector-extra"),require("patronum/debounce"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","patronum/throttle","effector","matrix-js-sdk","@42px/effector-extra","patronum/debounce","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.throttle,e.effector,e.matrix,e.effectorExtra,e.debounce,e.customErrors)}(this,(function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),w=l.effect(),p=l.effect(),y=l.effect(),R=l.effect(),h=l.effect(),I=l.effect(),E=l.effect(),b=d.domain("notification"),D=b.effect(),P=b.effect(),F=b.effect(),x=b.effect(),A=d.domain("room"),U=A.store(null),C=A.store(!1),L=A.store(null),_=A.store(null),k=A.store(null),S=A.event(),T=A.store(null),M=A.store(0),B=A.store(50),N=A.store(50),W=A.store(50),$=A.store(0),O=A.store(50),K=A.store(50),j=L.map((e=>{var t;return null!==(t=null==e?void 0:e.filter((e=>"join"===e.membership)))&&void 0!==t?t:[]})),q=o.combine(M,B,((e,t)=>e>=t)),z=o.combine(M,N,((e,t)=>e>=t)),V=o.combine(M,W,((e,t)=>e>=t)),H=o.combine(M,$,((e,t)=>e>=t)),G=o.combine(M,O,((e,t)=>e>=t)),J=o.combine(M,K,((e,t)=>e>=t)),Y=A.event(),Q=A.event(),X=A.event(),Z=A.event(),ee=A.event(),te=A.event(),oe=A.event(),re=A.event(),ne=A.event(),ae=A.event(),ie=A.effect(),se=A.effect(),ce=A.effect(),de=A.effect(),le=A.effect(),me=A.effect(),ue=A.effect(),fe=A.effect(),ge=A.effect(),ve=A.effect();var we,pe;(we=e.Visibility||(e.Visibility={})).public="public",we.private="private",(pe=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",pe.privateChat="private_chat",pe.publicChat="public_chat";const ye=d.domain("messages"),Re=ye.store([]),he=ye.event(),Ie=ye.event(),Ee=ye.event(),be=ye.effect(),De=ye.effect(),Pe=ye.effect(),Fe=ye.effect(),xe=ye.effect(),Ae=ye.effect(),Ue=ye.effect(),Ce=d.domain("pagination"),Le=Ce.store(!1),_e=Ce.store(!1),ke=Ce.store(!0),Se=Ce.store(!0),Te=Ce.event(),Me=Ce.event(),Be=Ce.event(),Ne=Ce.event();var We;let $e;(We=e.MsgType||(e.MsgType={})).Audio="m.audio",We.BadEncrypted="m.bad.encrypted",We.Emote="m.emote",We.File="m.file",We.Image="m.image",We.Notice="m.notice",We.Text="m.text",We.Video="m.video",We.Location="m.location";let Oe=500;const Ke=[],je=({options:e,messageBatchInterval:t})=>{He(),void 0!==t&&(Oe=t),$e=c.default.createClient(e),Ke.forEach((([e,t])=>{$e.on(e,t)}))},qe=()=>$e,ze=e=>{Ke.push(...e)},Ve=()=>n.batchEvents(he,Oe),He=()=>{$e&&($e.removeAllListeners(),$e=null)},Ge="m.room.message",Je="m.room.redaction",Ye="m.direct",Qe=i.createCustomError("EventNotFound"),Xe=i.createCustomError("RoomNotFound"),Ze=i.createCustomError("ClientNotInitialized"),et=i.createCustomError("TimelineWindowUndefined"),tt=i.createCustomError("UserNotFound"),ot=i.createCustomError("UserNotLoggedIn");function rt(e){return{...e.getContent()}}function nt(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:rt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function at(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function it(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(nt(t)),e}const st=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function ct(e,t=99){var o;const r=qe(),n=r.getRoom(e.roomId);if(!n)throw new Xe;const a=n.getLiveTimeline().getEvents();let i=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;i+=1}const s=a.filter((e=>[Ge,Je].includes(e.getType()))).reduce(it,[]),c=s.length?s[s.length-1]:void 0,d=mt(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function dt(e){return e.getEvents().filter((e=>[Ge,Je].includes(e.getType()))).reduce(it,[])}const lt=()=>{var e;const t=null===(e=qe().getAccountData(Ye))||void 0===e?void 0:e.getContent();return t&&Object.values(t).flatMap((e=>e))},mt=e=>lt().includes(e),ut=e=>{var t,o,r;const n=qe(),{creator:a}=null===(o=(null===(t=n.getRoom(e))||void 0===t?void 0:t.currentState.getStateEvents("m.room.create",void 0))[0])||void 0===o?void 0:o.getContent(),i=null===(r=n.getAccountData(Ye))||void 0===r?void 0:r.getContent();return n.setAccountData(Ye,{...i,[a]:[e]})},ft=o.combine(_,T,((e,t)=>Boolean(e)&&Boolean(t))),gt=A.event(),vt=A.event(),wt=A.event(),pt=A.effect(),yt=A.effect(),Rt=A.effect(),ht=A.effect(),It=A.effect(),Et=A.effect(),bt=Ce.effect(),Dt=o.attach({source:[_,T],effect:bt,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Pt=o.attach({source:[_,T],effect:bt,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),Ft=ye.event(),xt=ye.effect(),At=o.guard({source:o.sample(_,[Rt.done,bt.done,xt.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Ut(){return qe().getRooms().map(at)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:p}),ze([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Ge&&a!==Je||!o&&n.liveEvent&&he(nt(e))}],["Room",e=>{var t,o;const r=qe(),n=e.getMember(r.getUserId());if(n&&"invite"!==n.membership)return;(null===(o=null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t?void 0:t.getContent())||void 0===o?void 0:o.isDirect)?ne(e):ae(e)}],["Room.localEchoUpdated",()=>Ft()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Ut();f(e)}else{const e=Ut();m(e)}else{const e=Ut();u(e)}}],["RoomState.members",(e,t,o)=>vt(o)],["RoomState.newMember",(e,t,o)=>vt(o)],["RoomMember.membership",(e,t)=>vt(t)],["RoomMember.name",(e,t)=>vt(t)],["RoomMember.powerLevel",(e,t)=>vt(t)],["RoomMember.typing",(e,t)=>vt(t)],["User.avatarUrl",(e,t)=>gt(t)],["User.presence",(e,t)=>gt(t)],["User.displayName",(e,t)=>gt(t)]]),g.use((e=>qe().login("m.login.password",e))),v.use((async e=>{const t=await fetch(`${e.baseUrl}/_matrix/client/r0/login`,{method:"POST",body:JSON.stringify({type:"m.login.token",token:e.token})}),{user_id:o,access_token:r,device_id:n,well_known:a}=await t.json();return{userId:o,accessToken:r,deviceId:n,wellKnown:a}})),w.use((async()=>{const{store:e}=qe();if(e)return e.startup()})),p.use((e=>qe().startClient(e))),h.use((()=>qe().logout())),R.use((()=>qe().stopClient())),y.use((async()=>{const e=qe();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=st(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),I.use((async({createClientParams:e,startClientParams:t})=>{je(e);const{store:o}=qe();o&&await o.startup(),await qe().startClient(t)})),E.use((async()=>{var e;const t=qe();t&&(await t.logout(),await(null===(e=t.store)||void 0===e?void 0:e.deleteAllData()),t.stopClient(),He())})),D.use((()=>qe().getPushRules())),P.use((async e=>{try{await qe().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),F.use((async e=>{try{console.error("Getting push rules...");const t=await qe().getPushRules();console.error(t.global.room),await qe().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),x.use((async e=>{await qe().deletePushRule(e.scope,e.kind,e.ruleId)}));const Ct=o.attach({effect:Rt}),Lt=o.attach({effect:Rt}),_t=o.attach({effect:Rt}),kt=a.debounce({source:wt,timeout:500});_.on(Y,((e,{roomId:t})=>t)).reset(S),k.on(pt.doneData,((e,t)=>t)),T.on(yt.doneData,((e,t)=>t)).reset(_),L.on(ht.doneData,((e,t)=>t)).reset(_),M.on(It.doneData,((e,t)=>t)).reset(_),B.on(Et.doneData,((e,t)=>t.kick)).reset(_),W.on(Et.doneData,((e,t)=>t.ban)).reset(_),N.on(Et.doneData,((e,t)=>t.invite)).reset(_),$.on(Et.doneData,((e,t)=>t.defaultEvents)).reset(_),O.on(Et.doneData,((e,t)=>t.redact)).reset(_),K.on(Et.doneData,((e,t)=>t.stateDefault)).reset(_),o.forward({from:_,to:pt}),o.forward({from:Rt.pending,to:C}),o.forward({from:Y,to:yt}),o.forward({from:Ct.done,to:Q}),o.forward({from:o.sample({source:T,clock:yt.done,fn:()=>{}}),to:X}),o.forward({from:Lt.done,to:Z}),o.forward({from:_t.done,to:ee}),o.guard({source:_,filter:e=>Boolean(e),target:wt}),o.guard({clock:gt,source:L,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:wt}),o.guard({clock:vt,source:_,filter:(e,t)=>e===t.roomId,target:wt}),o.guard({source:_,clock:kt,filter:Boolean,target:ht}),o.guard({source:o.sample([_,T],te,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:ft,target:_t}),o.guard({source:o.sample([_,T],re,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:ft,target:Lt}),o.guard({source:o.sample([_,T],oe,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:ft,target:Ct}),o.guard({clock:_,filter:Boolean,target:[It,Et]}),It.use((e=>{const t=qe(),o=t.getRoom(e),r=t.getUserId();if(!r)throw new tt;const n=o.getMember(r);if(!n)throw new tt;return n.powerLevel})),Et.use((e=>{var t,o,r,n,a,i;const s=qe().getRoom(e).currentState.getStateEvents("m.room.power_levels","")[0].getContent();return{kick:null!==(t=s.kick)&&void 0!==t?t:50,ban:null!==(o=s.ban)&&void 0!==o?o:50,invite:null!==(r=s.invite)&&void 0!==r?r:50,defaultEvents:null!==(n=s.events_default)&&void 0!==n?n:0,stateDefault:null!==(a=s.state_default)&&void 0!==a?a:50,redact:null!==(i=s.redact)&&void 0!==i?i:50}})),ht.use((e=>{const t=qe().getRoom(e);if(!t)throw new Xe;return Object.values(t.currentState.members).map((e=>{const t=qe().getUser(e.userId);if(!t)throw new tt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:st(t),userId:e.userId}}(e,t)}))})),ce.use((e=>{const t=qe().getRoom(e);if(!t)throw new Xe;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),yt.use((async({roomId:e})=>{const t=qe(),o=qe().getRoom(e);if(!o)throw new Xe;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),Rt.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new et;await e.load(t,o);const n=e.canPaginate("f");let a=dt(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=dt(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),se.use((e=>{if(!qe())throw new Ze;return e.map((e=>ct(e)))})),ie.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=qe().getRoom(t);if(!n)throw new Xe;const a={};return(await qe().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],nt(t)}))})),de.use((()=>qe().getUsers().map(st))),le.use((async({name:e,invite:t,visibility:o,initialState:r=[],preset:n})=>{const a={name:e,invite:t,visibility:o,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:n},{room_id:i}=await qe().createRoom(a);return{roomId:i}})),me.use((async({user:t,preset:o,initialState:r=[]})=>{const n=qe(),a=lt().find((e=>{var o;return null===(o=n.getRoom(e))||void 0===o?void 0:o.currentState.members[t.userId]}));if(a)return{roomId:a};const i={is_direct:!0,invite:[t.userId],visibility:e.Visibility.private,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:o,creation_content:{isDirect:!0,creator:n.getUserId()}},{room_id:s}=await n.createRoom(i);return await ut(s),{roomId:s}})),ue.use((async({userId:e,roomId:t})=>{await qe().invite(t,e)})),fe.use((async({roomId:e,userId:t,reason:o})=>{await qe().kick(e,t,o)})),ge.use((async({roomId:e,name:t})=>{await qe().setRoomName(e,t)})),ve.use((async({roomId:e,isDirect:t=!1})=>{const o=qe(),r=await o.joinRoom(e);return t&&await ut(e),ct(at(r))})),pt.use((e=>{if(!e)return null;const t=qe().getRoom(e);return t?ct(at(t)):null}));const St=Ve(),Tt=o.attach({effect:Pt,mapParams:({messages:e})=>({size:e.length})});Re.on(At,((e,{messages:t})=>t)).reset(_),U.on(At,((e,{isLive:t})=>t)).reset(_),o.forward({from:o.sample(Re,Tt.done,((e,{params:t})=>t.messages)),to:Ie}),o.forward({from:St.map((e=>({messages:e}))),to:Tt}),o.guard({source:o.sample([_,T],Ft,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:T.map((e=>Boolean(e))),target:xt}),be.use((({roomId:e,content:t,txnId:o})=>qe().sendMessage(e,t,o))),De.use((({roomId:e,eventId:t,body:o,txnId:r})=>qe().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),Pe.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await qe().redactEvent(e,t,void 0,r)).event_id}})),Fe.use((({roomId:e,eventId:t})=>{const o=qe().getRoom(e);if(!o)throw new Xe;const r=o.findEventById(t);if(!r)throw new Qe;return qe().setRoomReadMarkers(e,t,r)})),Ae.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=qe().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{Ee({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),Ue.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{qe().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),xe.use((({eventId:e,roomId:t})=>{const o=qe();if(!o)throw new Ze;const n=o.getRoom(t);if(!n)throw new Xe;const a=n.findEventById(e);if(!a)throw new Qe;const i=o.getUserId();if(!i)throw new ot;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===qe().getUserId()}(a)}})),xt.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:dt(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const Mt=o.combine(ft,_e,Le,C,((e,t,o,r)=>e&&!t&&!o&&!r));_e.on(Dt.pending,((e,t)=>t)).reset(_),Le.on(Pt.pending,((e,t)=>t)).reset(_),ke.on(At,((e,{canPaginateBackward:t})=>t)).reset([te,_]),Se.on(At,((e,{canPaginateForward:t})=>t)).reset([te,_]),o.forward({from:Dt.done,to:Te}),o.forward({from:Pt.done,to:Me}),o.guard({source:Ne,filter:Mt,target:Dt}),o.guard({source:Be,filter:Mt,target:Pt}),bt.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new et;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:dt(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canBan=V,e.$canInvite=z,e.$canKick=q,e.$canPaginateBackward=ke,e.$canPaginateForward=Se,e.$canRedact=G,e.$canSendDefaultEvent=H,e.$canSetDefaultState=J,e.$currentJoinedRoomMembers=j,e.$currentRoom=k,e.$currentRoomId=_,e.$currentRoomMembers=L,e.$isLive=U,e.$loadRoomFxPending=C,e.$messages=Re,e.$myPowerLevel=M,e.$paginateBackwardPending=_e,e.$paginateForwardPending=Le,e.$requiredPowerLevelForBan=W,e.$requiredPowerLevelForDefaultEvents=$,e.$requiredPowerLevelForDefaultState=K,e.$requiredPowerLevelForInvite=N,e.$requiredPowerLevelForKick=B,e.$requiredPowerLevelForRedact=O,e.$timelineWindow=T,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=xe,e.checkIsDirect=mt,e.clearCurrentRoomState=S,e.client=qe,e.createClient=je,e.createClientFx=I,e.createDirectRoomFx=me,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=le,e.createRoomMessageBatch=Ve,e.deleteMessageFx=Pe,e.deleteNotificationRuleFx=x,e.destroyClient=He,e.destroyClientFx=E,e.directRoomCreated=ne,e.editMessageFx=De,e.getAllUsersFx=de,e.getLoggedUserFx=y,e.getNotificationRulesFx=D,e.getRoomInfoFx=ce,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=qe().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(qe().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=se,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(qe().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${qe().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${qe().getAccessToken()}`}}),e.getUrlPreviewFx=Ue,e.initRoom=Y,e.initStoreFx=w,e.inviteUserFx=ue,e.joinRoomFx=ve,e.kickUserRoomFx=fe,e.liveTimelineLoaded=Q,e.loadRoom=te,e.loadRoomMessage=re,e.loadRoomMessageDone=Z,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=h,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>qe().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=Ie,e.onCachedState=u,e.onClientEvent=ze,e.onInitialSync=m,e.onPaginateBackwardDone=Te,e.onPaginateForwardDone=Me,e.onRoomInitialized=X,e.onRoomLoaded=ee,e.onSync=f,e.onUploadProgress=Ee,e.paginateBackward=Ne,e.paginateForward=Be,e.readAllMessagesFx=Fe,e.renameRoomFx=ge,e.roomCreated=ae,e.roomMessage=he,e.searchRoomMessagesFx=ie,e.sendMessageFx=be,e.setNotificationRuleActionFx=P,e.setNotificationRuleEnabledFx=F,e.startClientFx=p,e.stopClientFx=R,e.toLiveTimeline=oe,e.uploadContentFx=Ae,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
