var MatrixEffector=function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),p=l.effect(),w=l.effect(),y=l.effect(),I=l.effect(),R=l.effect(),h=d.domain("notification"),b=h.effect(),E=h.effect(),A=h.effect(),P=h.effect(),x=d.domain("room"),F=x.store(null),U=x.store(!1),M=x.store(null),C=x.store(null),D=x.store(null),k=x.event(),S=x.event(),B=x.event(),N=x.event(),T=x.event(),_=x.event(),W=x.event(),L=x.effect(),z=x.effect(),O=x.effect(),$=x.effect(),j=x.effect(),K=x.effect(),H=x.effect(),G=x.effect(),V=x.effect(),Y=x.effect();var q,J;(q=e.Visibility||(e.Visibility={})).public="public",q.private="private",(J=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",J.privateChat="private_chat",J.publicChat="public_chat";const Q=d.domain("messages"),X=Q.store([]),Z=Q.event(),ee=Q.event(),te=Q.event(),oe=Q.effect(),re=Q.effect(),ne=Q.effect(),ae=Q.effect(),ie=Q.effect(),se=Q.effect(),ce=Q.effect(),de=d.domain("pagination"),le=de.store(!1),me=de.store(!1),ue=de.store(!0),fe=de.store(!0),ge=de.event(),ve=de.event(),pe=de.event();var we;let ye,Ie;(we=e.MsgType||(e.MsgType={})).Audio="m.audio",we.BadEncrypted="m.bad.encrypted",we.Emote="m.emote",we.File="m.file",we.Image="m.image",we.Notice="m.notice",we.Text="m.text",we.Video="m.video",we.Location="m.location";let Re=500;const he=[],be=()=>{ye&&(ye.removeAllListeners(),ye=null),ye=c.default.createClient(Ie),he.forEach((([e,t])=>{ye.on(e,t)}))},Ee=()=>(ye||be(),ye),Ae=e=>{he.push(...e)},Pe=()=>n.batchEvents(Z,Re),xe="m.room.message",Fe="m.room.redaction",Ue=i.createCustomError("EventNotFound"),Me=i.createCustomError("RoomNotFound"),Ce=i.createCustomError("ClientNotInitialized"),De=i.createCustomError("TimelineWindowUndefined"),ke=i.createCustomError("UserNotFound"),Se=i.createCustomError("UserNotLoggedIn");function Be(e){return{...e.getContent()}}function Ne(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Be(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Te(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function _e(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Ne(t)),e}const We=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function Le(e,t){var o;const r=Ee(),n=r.getRoom(e.roomId);if(!n)throw new Me;const a=n.getLiveTimeline().getEvents();let i=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;i+=1}const s=a.filter((e=>[xe,Fe].includes(e.getType()))).reduce(_e,[]),c=s.length?s[s.length-1]:void 0,d=Oe(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function ze(e){return e.getEvents().filter((e=>[xe,Fe].includes(e.getType()))).reduce(_e,[])}const Oe=e=>{const t=Ee().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},$e=o.combine(C,D,((e,t)=>Boolean(e)&&Boolean(t))),je=x.event(),Ke=x.event(),He=x.event(),Ge=x.effect(),Ve=x.effect(),Ye=x.effect(),qe=de.effect(),Je=o.attach({source:[C,D],effect:qe,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Qe=o.attach({source:[C,D],effect:qe,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),Xe=Q.event(),Ze=Q.effect(),et=o.guard({source:o.sample(C,[Ve.done,qe.done,Ze.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function tt(){return Ee().getRooms().map(Te)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:w}),Ae([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==xe&&a!==Fe||!o&&n.liveEvent&&Z(Ne(e))}],["Room.localEchoUpdated",()=>Xe()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=tt();f(e)}else{const e=tt();m(e)}else{const e=tt();u(e)}}],["RoomState.members",(e,t,o)=>Ke(o)],["RoomState.newMember",(e,t,o)=>Ke(o)],["RoomMember.membership",(e,t)=>Ke(t)],["RoomMember.name",(e,t)=>Ke(t)],["RoomMember.powerLevel",(e,t)=>Ke(t)],["RoomMember.typing",(e,t)=>Ke(t)],["User.avatarUrl",(e,t)=>je(t)],["User.presence",(e,t)=>je(t)],["User.displayName",(e,t)=>je(t)]]),g.use((e=>Ee().login("m.login.password",e))),v.use((e=>Ee().login("m.login.token",e))),p.use((async()=>{const{store:e}=Ee();if(e)return e.startup()})),w.use((e=>Ee().startClient(e))),R.use((()=>Ee().logout())),I.use((()=>Ee().stopClient())),y.use((async()=>{const e=Ee();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=We(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),b.use((()=>Ee().getPushRules())),E.use((async e=>{try{await Ee().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),A.use((async e=>{try{console.error("Getting push rules...");const t=await Ee().getPushRules();console.error(t.global.room),await Ee().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),P.use((async e=>{await Ee().deletePushRule(e.scope,e.kind,e.ruleId)}));const ot=o.attach({effect:Ve}),rt=o.attach({effect:Ve}),nt=a.debounce({source:He,timeout:500});C.on(k,((e,{roomId:t})=>t)),D.on(Ge.doneData,((e,t)=>t)).reset(C),M.on(Ye.doneData,((e,t)=>t)).reset(C),o.forward({from:Ve.pending,to:U}),o.forward({from:k,to:Ge}),o.forward({from:ot.done,to:S}),o.forward({from:o.sample({source:D,clock:Ge.done,fn:()=>{}}),to:B}),o.forward({from:rt.done,to:N}),o.guard({source:C,filter:e=>Boolean(e),target:He}),o.guard({clock:je,source:M,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:He}),o.guard({clock:Ke,source:C,filter:(e,t)=>e===t.roomId,target:He}),o.guard({source:C,clock:nt,filter:Boolean,target:Ye}),o.guard({source:o.sample([C,D],T,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:$e,target:Ve}),o.guard({source:o.sample([C,D],W,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:$e,target:rt}),o.guard({source:o.sample([C,D],_,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:$e,target:ot}),Ye.use((e=>{const t=Ee().getRoom(e);if(!t)throw new Me;return Object.values(t.currentState.members).map((e=>{const t=Ee().getUser(e.userId);if(!t)throw new ke;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:We(t),userId:e.userId}}(e,t)}))})),O.use((e=>{const t=Ee().getRoom(e);if(!t)throw new Me;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Ge.use((async({roomId:e})=>{const t=Ee(),o=Ee().getRoom(e);if(!o)throw new Me;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),Ve.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new De;await e.load(t,o);const n=e.canPaginate("f");let a=ze(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=ze(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),z.use((e=>{if(!Ee())throw new Ce;return e.map((e=>Le(e,99)))})),L.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=Ee().getRoom(t);if(!n)throw new Me;const a={};return(await Ee().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],Ne(t)}))})),$.use((()=>Ee().getUsers().map(We))),j.use((async({name:e,invite:t,visibility:o,initialState:r=[],preset:n})=>{const a={name:e,invite:t,visibility:o,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:n},{room_id:i}=await Ee().createRoom(a);return{roomId:i}})),K.use((async({user:t,preset:o,initialState:r=[]})=>{var n;const a=Ee(),i=(null!==(n=Object.values(a.getAccountData("m.direct").getContent()))&&void 0!==n?n:[]).flatMap((e=>e)),s=i.find((e=>a.getRoom(e).currentState.members[t.userId]));if(s)return{roomId:s};const c={is_direct:!0,invite:[t.userId],visibility:e.Visibility.private,initial_state:r.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:o},{room_id:d}=await a.createRoom(c),l=a.getUserId();return await a.setAccountData("m.direct",{[l]:[...i,d]}),{roomId:"test"}})),H.use((async({userId:e,roomId:t})=>{await Ee().invite(t,e)})),G.use((async({roomId:e,userId:t,reason:o})=>{await Ee().kick(e,t,o)})),V.use((async({roomId:e,name:t})=>{await Ee().setRoomName(e,t)})),Y.use((async e=>Le(Te(await Ee().joinRoom(e)),99)));const at=Pe(),it=o.attach({effect:Qe,mapParams:({messages:e})=>({size:e.length})});X.on(et,((e,{messages:t})=>t)).reset(C),F.on(et,((e,{isLive:t})=>t)).reset(C),o.forward({from:o.sample(X,it.done,((e,{params:t})=>t.messages)),to:ee}),o.forward({from:at.map((e=>({messages:e}))),to:it}),o.guard({source:o.sample([C,D],Xe,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:D.map((e=>Boolean(e))),target:Ze}),oe.use((({roomId:e,content:t,txnId:o})=>Ee().sendMessage(e,t,o))),re.use((({roomId:e,eventId:t,body:o,txnId:r})=>Ee().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),ne.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await Ee().redactEvent(e,t,void 0,r)).event_id}})),ae.use((({roomId:e,eventId:t})=>{const o=Ee().getRoom(e);if(!o)throw new Me;const r=o.findEventById(t);if(!r)throw new Ue;return Ee().setRoomReadMarkers(e,t,r)})),se.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=Ee().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{te({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),ce.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{Ee().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),ie.use((({eventId:e,roomId:t})=>{const o=Ee();if(!o)throw new Ce;const n=o.getRoom(t);if(!n)throw new Me;const a=n.findEventById(e);if(!a)throw new Ue;const i=o.getUserId();if(!i)throw new Se;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===Ee().getUserId()}(a)}})),Ze.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:ze(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const st=o.combine($e,me,le,U,((e,t,o,r)=>e&&!t&&!o&&!r));return me.on(Je.pending,((e,t)=>t)).reset(C),le.on(Qe.pending,((e,t)=>t)).reset(C),ue.on(et,((e,{canPaginateBackward:t})=>t)).reset([T,C]),fe.on(et,((e,{canPaginateForward:t})=>t)).reset([T,C]),o.forward({from:Je.done,to:ge}),o.guard({source:pe,filter:st,target:Je}),o.guard({source:ve,filter:st,target:Qe}),qe.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new De;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:ze(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canPaginateBackward=ue,e.$canPaginateForward=fe,e.$currentRoomId=C,e.$currentRoomMembers=M,e.$isLive=F,e.$loadRoomFxPending=U,e.$messages=X,e.$paginateBackwardPending=me,e.$paginateForwardPending=le,e.$timelineWindow=D,e.checkEventPermissionsFx=ie,e.checkIsDirect=Oe,e.client=Ee,e.createClient=be,e.createDirectRoomFx=K,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=j,e.createRoomMessageBatch=Pe,e.deleteMessageFx=ne,e.deleteNotificationRuleFx=P,e.editMessageFx=re,e.getAllUsersFx=$,e.getLoggedUserFx=y,e.getNotificationRulesFx=b,e.getRoomInfoFx=O,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=Ee().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(Ee().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=z,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(Ee().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${Ee().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${Ee().getAccessToken()}`}}),e.getUrlPreviewFx=ce,e.initRoom=k,e.initStoreFx=p,e.inviteUserFx=H,e.joinRoomFx=Y,e.kickUserRoomFx=G,e.liveTimelineLoaded=S,e.loadRoom=T,e.loadRoomMessage=W,e.loadRoomMessageDone=N,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=R,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>Ee().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=ee,e.onCachedState=u,e.onClientEvent=Ae,e.onInitialSync=m,e.onPaginateBackwardDone=ge,e.onRoomInitialized=B,e.onSync=f,e.onUploadProgress=te,e.paginateBackward=pe,e.paginateForward=ve,e.prependClientParams=e=>{if("string"==typeof e)return void(Ie=e);const{messageBatchInterval:t,...o}=e;Ie=o,void 0!==t&&(Re=t)},e.readAllMessagesFx=ae,e.renameRoomFx=V,e.roomMessage=Z,e.searchRoomMessagesFx=L,e.sendMessageFx=oe,e.setNotificationRuleActionFx=E,e.setNotificationRuleEnabledFx=A,e.startClientFx=w,e.stopClientFx=I,e.toLiveTimeline=_,e.uploadContentFx=se,Object.defineProperty(e,"__esModule",{value:!0}),e}({},throttle,effector,matrix,effectorExtra,debounce,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
