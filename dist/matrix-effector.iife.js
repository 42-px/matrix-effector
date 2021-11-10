var MatrixEffector=function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),w=l.effect(),p=l.effect(),y=l.effect(),R=l.effect(),I=l.effect(),h=l.effect(),E=l.effect(),b=d.domain("notification"),D=b.effect(),P=b.effect(),A=b.effect(),F=b.effect(),U=d.domain("room"),C=U.store(null),L=U.store(!1),_=U.store(null),x=U.store(null),S=U.event(),k=U.store(null),M=U.store(0),T=U.store(50),B=U.store(50),N=U.store(50),W=U.store(0),$=U.store(50),O=U.store(50),K=o.combine(M,T,((e,t)=>e>=t)),z=o.combine(M,B,((e,t)=>e>=t)),V=o.combine(M,N,((e,t)=>e>=t)),j=o.combine(M,W,((e,t)=>e>=t)),q=o.combine(M,$,((e,t)=>e>=t)),H=o.combine(M,O,((e,t)=>e>=t)),G=U.event(),Y=U.event(),J=U.event(),Q=U.event(),X=U.event(),Z=U.event(),ee=U.event(),te=U.event(),oe=U.event(),re=U.event(),ne=U.effect(),ae=U.effect(),ie=U.effect(),se=U.effect(),ce=U.effect(),de=U.effect(),le=U.effect(),me=U.effect(),ue=U.effect(),fe=U.effect();var ge,ve;(ge=e.Visibility||(e.Visibility={})).public="public",ge.private="private",(ve=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",ve.privateChat="private_chat",ve.publicChat="public_chat";const we=d.domain("messages"),pe=we.store([]),ye=we.event(),Re=we.event(),Ie=we.event(),he=we.effect(),Ee=we.effect(),be=we.effect(),De=we.effect(),Pe=we.effect(),Ae=we.effect(),Fe=we.effect(),Ue=d.domain("pagination"),Ce=Ue.store(!1),Le=Ue.store(!1),_e=Ue.store(!0),xe=Ue.store(!0),Se=Ue.event(),ke=Ue.event(),Me=Ue.event(),Te=Ue.event();var Be;let Ne,We;(Be=e.MsgType||(e.MsgType={})).Audio="m.audio",Be.BadEncrypted="m.bad.encrypted",Be.Emote="m.emote",Be.File="m.file",Be.Image="m.image",Be.Notice="m.notice",Be.Text="m.text",Be.Video="m.video",Be.Location="m.location";let $e=500;const Oe=[],Ke=()=>{Ne&&(Ne.removeAllListeners(),Ne=null),Ne=c.default.createClient(We),Oe.forEach((([e,t])=>{Ne.on(e,t)}))},ze=()=>(Ne||Ke(),Ne),Ve=e=>{if("string"==typeof e)return void(We=e);const{messageBatchInterval:t,...o}=e;We=o,void 0!==t&&($e=t)},je=e=>{Oe.push(...e)},qe=()=>n.batchEvents(ye,$e),He="m.room.message",Ge="m.room.redaction",Ye="m.direct",Je=i.createCustomError("EventNotFound"),Qe=i.createCustomError("RoomNotFound"),Xe=i.createCustomError("ClientNotInitialized"),Ze=i.createCustomError("TimelineWindowUndefined"),et=i.createCustomError("UserNotFound"),tt=i.createCustomError("UserNotLoggedIn");function ot(e){return{...e.getContent()}}function rt(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:ot(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function nt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function at(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(rt(t)),e}const it=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function st(e,t){var o;const r=ze(),n=r.getRoom(e.roomId);if(!n)throw new Qe;const a=n.getLiveTimeline().getEvents();let i=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;i+=1}const s=a.filter((e=>[He,Ge].includes(e.getType()))).reduce(at,[]),c=s.length?s[s.length-1]:void 0,d=lt(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function ct(e){return e.getEvents().filter((e=>[He,Ge].includes(e.getType()))).reduce(at,[])}const dt=()=>{var e;const t=null===(e=ze().getAccountData(Ye))||void 0===e?void 0:e.getContent();return t&&Object.values(t).flatMap((e=>e))},lt=e=>dt().includes(e),mt=e=>{var t,o,r;const n=ze(),{creator:a}=null===(o=(null===(t=n.getRoom(e))||void 0===t?void 0:t.currentState.getStateEvents("m.room.create",void 0))[0])||void 0===o?void 0:o.getContent(),i=null===(r=n.getAccountData(Ye))||void 0===r?void 0:r.getContent();return n.setAccountData(Ye,{...i,[a]:[e]})},ut=o.combine(x,k,((e,t)=>Boolean(e)&&Boolean(t))),ft=U.event(),gt=U.event(),vt=U.event(),wt=U.effect(),pt=U.effect(),yt=U.effect(),Rt=U.effect(),It=U.effect(),ht=Ue.effect(),Et=o.attach({source:[x,k],effect:ht,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),bt=o.attach({source:[x,k],effect:ht,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),Dt=we.event(),Pt=we.effect(),At=o.guard({source:o.sample(x,[pt.done,ht.done,Pt.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Ft(){return ze().getRooms().map(nt)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:p}),je([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==He&&a!==Ge||!o&&n.liveEvent&&ye(rt(e))}],["Room",e=>{var t,o;const r=ze(),n=e.getMember(r.getUserId());if(n&&"invite"!==n.membership)return;(null===(o=null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t?void 0:t.getContent())||void 0===o?void 0:o.isDirect)?oe(e):re(e)}],["Room.localEchoUpdated",()=>Dt()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Ft();f(e)}else{const e=Ft();m(e)}else{const e=Ft();u(e)}}],["RoomState.members",(e,t,o)=>gt(o)],["RoomState.newMember",(e,t,o)=>gt(o)],["RoomMember.membership",(e,t)=>gt(t)],["RoomMember.name",(e,t)=>gt(t)],["RoomMember.powerLevel",(e,t)=>gt(t)],["RoomMember.typing",(e,t)=>gt(t)],["User.avatarUrl",(e,t)=>ft(t)],["User.presence",(e,t)=>ft(t)],["User.displayName",(e,t)=>ft(t)]]),g.use((e=>ze().login("m.login.password",e))),v.use((async e=>{const t=await fetch(`${e.baseUrl}/_matrix/client/r0/login`,{method:"POST",body:JSON.stringify({type:"m.login.token",token:e.token})}),{user_id:o,access_token:r,device_id:n,well_known:a}=await t.json();return{userId:o,accessToken:r,deviceId:n,wellKnown:a}})),w.use((async()=>{const{store:e}=ze();if(e)return e.startup()})),p.use((e=>ze().startClient(e))),I.use((()=>ze().logout())),R.use((()=>ze().stopClient())),y.use((async()=>{const e=ze();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=it(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),h.use((async({prependParams:e,createClientParams:t})=>{Ve(e),Ke();const{store:o}=ze();o&&await o.startup(),await ze().startClient(t)})),E.use((async()=>{var e;const t=ze();t&&(await t.logout(),await(null===(e=t.store)||void 0===e?void 0:e.deleteAllData()),t.stopClient())})),D.use((()=>ze().getPushRules())),P.use((async e=>{try{await ze().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),A.use((async e=>{try{console.error("Getting push rules...");const t=await ze().getPushRules();console.error(t.global.room),await ze().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),F.use((async e=>{await ze().deletePushRule(e.scope,e.kind,e.ruleId)}));const Ut=o.attach({effect:pt}),Ct=o.attach({effect:pt}),Lt=o.attach({effect:pt}),_t=a.debounce({source:vt,timeout:500});x.on(G,((e,{roomId:t})=>t)).reset(S),k.on(wt.doneData,((e,t)=>t)).reset(x),_.on(yt.doneData,((e,t)=>t)).reset(x),M.on(Rt.doneData,((e,t)=>t)).reset(x),T.on(It.doneData,((e,t)=>t.kick)).reset(x),N.on(It.doneData,((e,t)=>t.ban)).reset(x),B.on(It.doneData,((e,t)=>t.invite)).reset(x),W.on(It.doneData,((e,t)=>t.defaultEvents)).reset(x),$.on(It.doneData,((e,t)=>t.redact)).reset(x),O.on(It.doneData,((e,t)=>t.stateDefault)).reset(x),o.forward({from:pt.pending,to:L}),o.forward({from:G,to:wt}),o.forward({from:Ut.done,to:Y}),o.forward({from:o.sample({source:k,clock:wt.done,fn:()=>{}}),to:J}),o.forward({from:Ct.done,to:Q}),o.forward({from:Lt.done,to:X}),o.guard({source:x,filter:e=>Boolean(e),target:vt}),o.guard({clock:ft,source:_,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:vt}),o.guard({clock:gt,source:x,filter:(e,t)=>e===t.roomId,target:vt}),o.guard({source:x,clock:_t,filter:Boolean,target:yt}),o.guard({source:o.sample([x,k],Z,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:ut,target:Lt}),o.guard({source:o.sample([x,k],te,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:ut,target:Ct}),o.guard({source:o.sample([x,k],ee,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:ut,target:Ut}),o.guard({clock:x,filter:Boolean,target:[Rt,It]}),Rt.use((e=>{const t=ze(),o=t.getRoom(e),r=t.getUserId();if(!r)throw new et;const n=o.getMember(r);if(!n)throw new et;return n.powerLevel})),It.use((e=>{var t,o,r,n,a,i;const s=ze().getRoom(e).currentState.getStateEvents("m.room.power_levels","")[0].getContent();return{kick:null!==(t=s.kick)&&void 0!==t?t:50,ban:null!==(o=s.ban)&&void 0!==o?o:50,invite:null!==(r=s.invite)&&void 0!==r?r:50,defaultEvents:null!==(n=s.events_default)&&void 0!==n?n:0,stateDefault:null!==(a=s.state_default)&&void 0!==a?a:50,redact:null!==(i=s.redact)&&void 0!==i?i:50}})),yt.use((e=>{const t=ze().getRoom(e);if(!t)throw new Qe;return Object.values(t.currentState.members).map((e=>{const t=ze().getUser(e.userId);if(!t)throw new et;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:it(t),userId:e.userId}}(e,t)}))})),ie.use((e=>{const t=ze().getRoom(e);if(!t)throw new Qe;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),wt.use((async({roomId:e})=>{const t=ze(),o=ze().getRoom(e);if(!o)throw new Qe;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),pt.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Ze;await e.load(t,o);const n=e.canPaginate("f");let a=ct(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=ct(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),ae.use((e=>{if(!ze())throw new Xe;return e.map((e=>st(e,99)))})),ne.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=ze().getRoom(t);if(!n)throw new Qe;const a={};return(await ze().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],rt(t)}))})),se.use((()=>ze().getUsers().map(it))),ce.use((async({name:e,invite:t,visibility:o,initialState:r=[],preset:n})=>{const a={name:e,invite:t,visibility:o,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:n},{room_id:i}=await ze().createRoom(a);return{roomId:i}})),de.use((async({user:t,preset:o,initialState:r=[]})=>{const n=ze(),a=dt().find((e=>{var o;return null===(o=n.getRoom(e))||void 0===o?void 0:o.currentState.members[t.userId]}));if(a)return{roomId:a};const i={is_direct:!0,invite:[t.userId],visibility:e.Visibility.private,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:o,creation_content:{isDirect:!0,creator:n.getUserId()}},{room_id:s}=await n.createRoom(i);return await mt(s),{roomId:s}})),le.use((async({userId:e,roomId:t})=>{await ze().invite(t,e)})),me.use((async({roomId:e,userId:t,reason:o})=>{await ze().kick(e,t,o)})),ue.use((async({roomId:e,name:t})=>{await ze().setRoomName(e,t)})),fe.use((async({roomId:e,isDirect:t=!1})=>{const o=ze(),r=await o.joinRoom(e);return t&&await mt(e),st(nt(r),99)}));const xt=qe(),St=o.attach({effect:bt,mapParams:({messages:e})=>({size:e.length})});pe.on(At,((e,{messages:t})=>t)).reset(x),C.on(At,((e,{isLive:t})=>t)).reset(x),o.forward({from:o.sample(pe,St.done,((e,{params:t})=>t.messages)),to:Re}),o.forward({from:xt.map((e=>({messages:e}))),to:St}),o.guard({source:o.sample([x,k],Dt,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:k.map((e=>Boolean(e))),target:Pt}),he.use((({roomId:e,content:t,txnId:o})=>ze().sendMessage(e,t,o))),Ee.use((({roomId:e,eventId:t,body:o,txnId:r})=>ze().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),be.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await ze().redactEvent(e,t,void 0,r)).event_id}})),De.use((({roomId:e,eventId:t})=>{const o=ze().getRoom(e);if(!o)throw new Qe;const r=o.findEventById(t);if(!r)throw new Je;return ze().setRoomReadMarkers(e,t,r)})),Ae.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=ze().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{Ie({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),Fe.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{ze().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),Pe.use((({eventId:e,roomId:t})=>{const o=ze();if(!o)throw new Xe;const n=o.getRoom(t);if(!n)throw new Qe;const a=n.findEventById(e);if(!a)throw new Je;const i=o.getUserId();if(!i)throw new tt;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===ze().getUserId()}(a)}})),Pt.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:ct(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const kt=o.combine(ut,Le,Ce,L,((e,t,o,r)=>e&&!t&&!o&&!r));return Le.on(Et.pending,((e,t)=>t)).reset(x),Ce.on(bt.pending,((e,t)=>t)).reset(x),_e.on(At,((e,{canPaginateBackward:t})=>t)).reset([Z,x]),xe.on(At,((e,{canPaginateForward:t})=>t)).reset([Z,x]),o.forward({from:Et.done,to:Se}),o.forward({from:bt.done,to:ke}),o.guard({source:Te,filter:kt,target:Et}),o.guard({source:Me,filter:kt,target:bt}),ht.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Ze;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:ct(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canBan=V,e.$canInvite=z,e.$canKick=K,e.$canPaginateBackward=_e,e.$canPaginateForward=xe,e.$canRedact=q,e.$canSendDefaultEvent=j,e.$canSetDefaultState=H,e.$currentRoomId=x,e.$currentRoomMembers=_,e.$isLive=C,e.$loadRoomFxPending=L,e.$messages=pe,e.$myPowerLevel=M,e.$paginateBackwardPending=Le,e.$paginateForwardPending=Ce,e.$requiredPowerLevelForBan=N,e.$requiredPowerLevelForDefaultEvents=W,e.$requiredPowerLevelForDefaultState=O,e.$requiredPowerLevelForInvite=B,e.$requiredPowerLevelForKick=T,e.$requiredPowerLevelForRedact=$,e.$timelineWindow=k,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=Pe,e.checkIsDirect=lt,e.clearCurrentRoomState=S,e.client=ze,e.createClient=Ke,e.createDirectRoomFx=de,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=ce,e.createRoomMessageBatch=qe,e.deleteMessageFx=be,e.deleteNotificationRuleFx=F,e.destroyClientAndLogoutFx=E,e.directRoomCreated=oe,e.editMessageFx=Ee,e.getAllUsersFx=se,e.getLoggedUserFx=y,e.getNotificationRulesFx=D,e.getRoomInfoFx=ie,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=ze().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(ze().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=ae,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(ze().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${ze().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${ze().getAccessToken()}`}}),e.getUrlPreviewFx=Fe,e.initRoom=G,e.initStoreFx=w,e.inviteUserFx=le,e.joinRoomFx=fe,e.kickUserRoomFx=me,e.liveTimelineLoaded=Y,e.loadRoom=Z,e.loadRoomMessage=te,e.loadRoomMessageDone=Q,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=I,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>ze().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=Re,e.onCachedState=u,e.onClientEvent=je,e.onInitialSync=m,e.onPaginateBackwardDone=Se,e.onPaginateForwardDone=ke,e.onRoomInitialized=J,e.onRoomLoaded=X,e.onSync=f,e.onUploadProgress=Ie,e.paginateBackward=Te,e.paginateForward=Me,e.prependAndCreateClientFx=h,e.prependClientParams=Ve,e.readAllMessagesFx=De,e.renameRoomFx=ue,e.roomCreated=re,e.roomMessage=ye,e.searchRoomMessagesFx=ne,e.sendMessageFx=he,e.setNotificationRuleActionFx=P,e.setNotificationRuleEnabledFx=A,e.startClientFx=p,e.stopClientFx=R,e.toLiveTimeline=ee,e.uploadContentFx=Ae,Object.defineProperty(e,"__esModule",{value:!0}),e}({},throttle,effector,matrix,effectorExtra,debounce,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
