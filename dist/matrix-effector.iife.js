var MatrixEffector=function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),w=l.effect(),p=l.effect(),y=l.effect(),R=l.effect(),I=l.effect(),h=d.domain("notification"),b=h.effect(),E=h.effect(),A=h.effect(),x=h.effect(),P=d.domain("room"),F=P.store(null),U=P.store(!1),M=P.store(null),C=P.store(null),D=P.store(null),k=P.event(),B=P.event(),S=P.event(),N=P.event(),T=P.event(),W=P.event(),L=P.event(),_=P.effect(),z=P.effect(),$=P.effect(),O=P.effect(),j=P.effect(),H=P.effect(),K=P.effect(),G=P.effect(),Y=P.effect(),q=d.domain("messages"),J=q.store([]),V=q.event(),Q=q.event(),X=q.event(),Z=q.effect(),ee=q.effect(),te=q.effect(),oe=q.effect(),re=q.effect(),ne=q.effect(),ae=q.effect(),ie=d.domain("pagination"),se=ie.store(!1),ce=ie.store(!1),de=ie.store(!0),le=ie.store(!0),me=ie.event(),ue=ie.event(),fe=ie.event();var ge;let ve,we;(ge=e.MsgType||(e.MsgType={})).Audio="m.audio",ge.BadEncrypted="m.bad.encrypted",ge.Emote="m.emote",ge.File="m.file",ge.Image="m.image",ge.Notice="m.notice",ge.Text="m.text",ge.Video="m.video",ge.Location="m.location";let pe=500;const ye=[],Re=()=>{ve&&(ve.removeAllListeners(),ve=null),ve=c.default.createClient(we),ye.forEach((([e,t])=>{ve.on(e,t)}))},Ie=()=>(ve||Re(),ve),he=e=>{ye.push(...e)},be=()=>n.batchEvents(V,pe),Ee="m.room.message",Ae="m.room.redaction",xe=i.createCustomError("EventNotFound"),Pe=i.createCustomError("RoomNotFound"),Fe=i.createCustomError("ClientNotInitialized"),Ue=i.createCustomError("TimelineWindowUndefined"),Me=i.createCustomError("UserNotFound"),Ce=i.createCustomError("UserNotLoggedIn");function De(e){return{...e.getContent()}}function ke(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:De(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Be(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Se(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(ke(t)),e}const Ne=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function Te(e,t){var o;const r=Ie(),n=r.getRoom(e.roomId);if(!n)throw new Pe;const a=n.getLiveTimeline().getEvents();let i=0;for(let e=a.length-1;e>=0&&e!==a.length-t;e--){const t=a[e];if(n.hasUserReadEvent(r.getUserId(),t.getId()))break;i+=1}const s=a.filter((e=>[Ee,Ae].includes(e.getType()))).reduce(Se,[]),c=s.length?s[s.length-1]:void 0,d=Le(e.roomId),l=d?n.getMember(n.guessDMUserId()):null;return{...e,unreadCount:i,lastMessage:c,isDirect:d,directUserId:null==l?void 0:l.userId,isOnline:l?Boolean(null===(o=l.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:n.getLastActiveTimestamp()}}function We(e){return e.getEvents().filter((e=>[Ee,Ae].includes(e.getType()))).reduce(Se,[])}const Le=e=>{const t=Ie().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},_e=o.combine(C,D,((e,t)=>Boolean(e)&&Boolean(t))),ze=P.event(),$e=P.event(),Oe=P.event(),je=P.effect(),He=P.effect(),Ke=P.effect(),Ge=ie.effect(),Ye=o.attach({source:[C,D],effect:Ge,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),qe=o.attach({source:[C,D],effect:Ge,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),Je=q.event(),Ve=q.effect(),Qe=o.guard({source:o.sample(C,[He.done,Ge.done,Ve.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Xe(){return Ie().getRooms().map(Be)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:p}),he([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Ee&&a!==Ae||!o&&n.liveEvent&&V(ke(e))}],["Room.localEchoUpdated",()=>Je()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Xe();f(e)}else{const e=Xe();m(e)}else{const e=Xe();u(e)}}],["RoomState.members",(e,t,o)=>$e(o)],["RoomState.newMember",(e,t,o)=>$e(o)],["RoomMember.membership",(e,t)=>$e(t)],["RoomMember.name",(e,t)=>$e(t)],["RoomMember.powerLevel",(e,t)=>$e(t)],["RoomMember.typing",(e,t)=>$e(t)],["User.avatarUrl",(e,t)=>ze(t)],["User.presence",(e,t)=>ze(t)],["User.displayName",(e,t)=>ze(t)]]),g.use((e=>Ie().login("m.login.password",e))),v.use((e=>Ie().login("m.login.token",e))),w.use((async()=>{const{store:e}=Ie();if(e)return e.startup()})),p.use((e=>Ie().startClient(e))),I.use((()=>Ie().logout())),R.use((()=>Ie().stopClient())),y.use((async()=>{const e=Ie();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=Ne(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),b.use((()=>Ie().getPushRules())),E.use((async e=>{try{await Ie().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),A.use((async e=>{try{console.error("Getting push rules...");const t=await Ie().getPushRules();console.error(t.global.room),await Ie().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),x.use((async e=>{await Ie().deletePushRule(e.scope,e.kind,e.ruleId)}));const Ze=o.attach({effect:He}),et=o.attach({effect:He}),tt=a.debounce({source:Oe,timeout:500});C.on(k,((e,{roomId:t})=>t)),D.on(je.doneData,((e,t)=>t)).reset(C),M.on(Ke.doneData,((e,t)=>t)).reset(C),o.forward({from:He.pending,to:U}),o.forward({from:k,to:je}),o.forward({from:Ze.done,to:B}),o.forward({from:o.sample({source:D,clock:je.done,fn:()=>{}}),to:S}),o.forward({from:et.done,to:N}),o.guard({source:C,filter:e=>Boolean(e),target:Oe}),o.guard({clock:ze,source:M,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:Oe}),o.guard({clock:$e,source:C,filter:(e,t)=>e===t.roomId,target:Oe}),o.guard({source:C,clock:tt,filter:Boolean,target:Ke}),o.guard({source:o.sample([C,D],T,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:_e,target:He}),o.guard({source:o.sample([C,D],L,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:_e,target:et}),o.guard({source:o.sample([C,D],W,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:_e,target:Ze}),Ke.use((e=>{const t=Ie().getRoom(e);if(!t)throw new Pe;return Object.values(t.currentState.members).map((e=>{const t=Ie().getUser(e.userId);if(!t)throw new Me;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ne(t),userId:e.userId}}(e,t)}))})),$.use((e=>{const t=Ie().getRoom(e);if(!t)throw new Pe;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),je.use((async({roomId:e})=>{const t=Ie(),o=Ie().getRoom(e);if(!o)throw new Pe;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),He.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Ue;await e.load(t,o);const n=e.canPaginate("f");let a=We(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=We(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),z.use((e=>{if(!Ie())throw new Fe;return e.map((e=>Te(e,99)))})),_.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=Ie().getRoom(t);if(!n)throw new Pe;const a={};return(await Ie().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],ke(t)}))})),O.use((()=>Ie().getUsers().map(Ne))),j.use((async({name:e,isDirect:t,invite:o,visibility:r})=>{const{room_id:n}=await Ie().createRoom({name:e,is_direct:t,invite:o,visibility:r});return{roomId:n}})),H.use((async({userId:e,roomId:t})=>{await Ie().invite(t,e)})),K.use((async({roomId:e,userId:t,reason:o})=>{await Ie().kick(e,t,o)})),G.use((async({roomId:e,name:t})=>{await Ie().setRoomName(e,t)})),Y.use((async e=>Te(Be(await Ie().joinRoom(e)),99)));const ot=be(),rt=o.attach({effect:qe,mapParams:({messages:e})=>({size:e.length})});J.on(Qe,((e,{messages:t})=>t)).reset(C),F.on(Qe,((e,{isLive:t})=>t)).reset(C),o.forward({from:o.sample(J,rt.done,((e,{params:t})=>t.messages)),to:Q}),o.forward({from:ot.map((e=>({messages:e}))),to:rt}),o.guard({source:o.sample([C,D],Je,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:D.map((e=>Boolean(e))),target:Ve}),Z.use((({roomId:e,content:t,txnId:o})=>Ie().sendMessage(e,t,o))),ee.use((({roomId:e,eventId:t,body:o,txnId:r})=>Ie().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),te.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await Ie().redactEvent(e,t,void 0,r)).event_id}})),oe.use((({roomId:e,eventId:t})=>{const o=Ie().getRoom(e);if(!o)throw new Pe;const r=o.findEventById(t);if(!r)throw new xe;return Ie().setRoomReadMarkers(e,t,r)})),ne.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=Ie().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{X({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),ae.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{Ie().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),re.use((({eventId:e,roomId:t})=>{const o=Ie();if(!o)throw new Fe;const n=o.getRoom(t);if(!n)throw new Pe;const a=n.findEventById(e);if(!a)throw new xe;const i=o.getUserId();if(!i)throw new Ce;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===Ie().getUserId()}(a)}})),Ve.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:We(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const nt=o.combine(_e,ce,se,U,((e,t,o,r)=>e&&!t&&!o&&!r));return ce.on(Ye.pending,((e,t)=>t)).reset(C),se.on(qe.pending,((e,t)=>t)).reset(C),de.on(Qe,((e,{canPaginateBackward:t})=>t)).reset([T,C]),le.on(Qe,((e,{canPaginateForward:t})=>t)).reset([T,C]),o.forward({from:Ye.done,to:me}),o.guard({source:fe,filter:nt,target:Ye}),o.guard({source:ue,filter:nt,target:qe}),Ge.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Ue;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:We(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canPaginateBackward=de,e.$canPaginateForward=le,e.$currentRoomId=C,e.$currentRoomMembers=M,e.$isLive=F,e.$loadRoomFxPending=U,e.$messages=J,e.$paginateBackwardPending=ce,e.$paginateForwardPending=se,e.$timelineWindow=D,e.checkEventPermissionsFx=re,e.checkIsDirect=Le,e.client=Ie,e.createClient=Re,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=j,e.createRoomMessageBatch=be,e.deleteMessageFx=te,e.deleteNotificationRuleFx=x,e.editMessageFx=ee,e.getAllUsersFx=O,e.getLoggedUserFx=y,e.getNotificationRulesFx=b,e.getRoomInfoFx=$,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=Ie().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(Ie().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=z,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(Ie().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${Ie().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${Ie().getAccessToken()}`}}),e.getUrlPreviewFx=ae,e.initRoom=k,e.initStoreFx=w,e.inviteUserFx=H,e.joinRoomFx=Y,e.kickUserRoomFx=K,e.liveTimelineLoaded=B,e.loadRoom=T,e.loadRoomMessage=L,e.loadRoomMessageDone=N,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=I,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>Ie().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=Q,e.onCachedState=u,e.onClientEvent=he,e.onInitialSync=m,e.onPaginateBackwardDone=me,e.onRoomInitialized=S,e.onSync=f,e.onUploadProgress=X,e.paginateBackward=fe,e.paginateForward=ue,e.prependClientParams=e=>{if("string"==typeof e)return void(we=e);const{messageBatchInterval:t,...o}=e;we=o,void 0!==t&&(pe=t)},e.readAllMessagesFx=oe,e.renameRoomFx=G,e.roomMessage=V,e.searchRoomMessagesFx=_,e.sendMessageFx=Z,e.setNotificationRuleActionFx=E,e.setNotificationRuleEnabledFx=A,e.startClientFx=p,e.stopClientFx=R,e.toLiveTimeline=W,e.uploadContentFx=ne,Object.defineProperty(e,"__esModule",{value:!0}),e}({},throttle,effector,matrix,effectorExtra,debounce,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
