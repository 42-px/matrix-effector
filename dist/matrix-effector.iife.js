var MatrixEffector=function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=s(r);const d=o.createDomain("root"),l=d.domain("app"),m=l.event(),u=l.event(),f=l.event(),g=l.effect(),v=l.effect(),w=l.effect(),p=l.effect(),y=l.effect(),R=l.effect(),h=l.effect(),I=d.domain("notification"),b=I.effect(),E=I.effect(),A=I.effect(),x=I.effect(),P=d.domain("room"),F=P.store(null),M=P.store(!1),U=P.store(null),C=P.store(null),D=P.store(null),k=P.event(),B=P.event(),S=P.event(),N=P.event(),T=P.event(),W=P.event(),L=P.event(),_=P.effect(),z=P.effect(),$=P.effect(),O=P.effect(),j=P.effect(),H=P.effect(),K=P.effect(),G=P.effect(),Y=P.effect(),q=d.domain("messages"),J=q.store([]),V=q.event(),Q=q.event(),X=q.event(),Z=q.effect(),ee=q.effect(),te=q.effect(),oe=q.effect(),re=q.effect(),ne=q.effect(),ae=q.effect(),ie=d.domain("pagination"),se=ie.store(!1),ce=ie.store(!1),de=ie.store(!0),le=ie.store(!0),me=ie.event(),ue=ie.event(),fe=ie.event();var ge;let ve,we;(ge=e.MsgType||(e.MsgType={})).Audio="m.audio",ge.BadEncrypted="m.bad.encrypted",ge.Emote="m.emote",ge.File="m.file",ge.Image="m.image",ge.Notice="m.notice",ge.Text="m.text",ge.Video="m.video",ge.Location="m.location";let pe=500;const ye=[],Re=()=>{ve&&(ve.removeAllListeners(),ve=null),ve=c.default.createClient(we),ye.forEach((([e,t])=>{ve.on(e,t)}))},he=()=>(ve||Re(),ve),Ie=e=>{ye.push(...e)},be=()=>n.batchEvents(V,pe),Ee="m.room.message",Ae="m.room.redaction";function xe(e){return{...e.getContent()}}function Pe(e,t){var o;const r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:xe(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=r)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Fe(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Me(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Pe(t)),e}const Ue=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function Ce(e,t){var o;const r=he(),n=e.getLiveTimeline().getEvents();let a=0;for(let o=n.length-1;o>=0&&o!==n.length-t;o--){const t=n[o];if(e.hasUserReadEvent(r.getUserId(),t.getId()))break;a+=1}const i=n.filter((e=>[Ee,Ae].includes(e.getType()))).reduce(Me,[]),s=i.length?i[i.length-1]:void 0,c=ke(e.roomId),d=c?e.getMember(e.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:s,isDirect:c,directUserId:null==d?void 0:d.userId,myMembership:e.getMyMembership(),isOnline:d?Boolean(null===(o=d.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:e.getLastActiveTimestamp()}}function De(e){return e.getEvents().filter((e=>[Ee,Ae].includes(e.getType()))).reduce(Me,[])}const ke=e=>{const t=he().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},Be=o.combine(C,D,((e,t)=>Boolean(e)&&Boolean(t))),Se=P.event(),Ne=P.event(),Te=P.event(),We=P.effect(),Le=P.effect(),_e=P.effect(),ze=ie.effect(),$e=o.attach({source:[C,D],effect:ze,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Oe=o.attach({source:[C,D],effect:ze,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),je=q.event(),He=q.effect(),Ke=o.guard({source:o.sample(C,[Le.done,ze.done,He.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function Ge(){return he().getRooms().map(Fe)}o.forward({from:g.done.map((()=>({initialSyncLimit:20}))),to:p}),Ie([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==Ee&&a!==Ae||!o&&n.liveEvent&&V(Pe(e))}],["Room.localEchoUpdated",()=>je()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Ge();f(e)}else{const e=Ge();m(e)}else{const e=Ge();u(e)}}],["RoomState.members",(e,t,o)=>Ne(o)],["RoomState.newMember",(e,t,o)=>Ne(o)],["RoomMember.membership",(e,t)=>Ne(t)],["RoomMember.name",(e,t)=>Ne(t)],["RoomMember.powerLevel",(e,t)=>Ne(t)],["RoomMember.typing",(e,t)=>Ne(t)],["User.avatarUrl",(e,t)=>Se(t)],["User.presence",(e,t)=>Se(t)],["User.displayName",(e,t)=>Se(t)]]),g.use((e=>he().login("m.login.password",e))),v.use((e=>he().login("m.login.token",e))),w.use((async()=>{const{store:e}=he();if(e)return e.startup()})),p.use((e=>he().startClient(e))),h.use((()=>he().logout())),R.use((()=>he().stopClient())),y.use((async()=>{const e=he();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const r=Ue(o);if(!r.avatarUrl||!r.displayName){const o=await e.getProfileInfo(t);r.avatarUrl=o.avatar_url,r.displayName=o.displayname}return r})),b.use((()=>he().getPushRules())),E.use((async e=>{try{await he().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),A.use((async e=>{try{console.error("Getting push rules...");const t=await he().getPushRules();console.error(t.global.room),await he().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),x.use((async e=>{await he().deletePushRule(e.scope,e.kind,e.ruleId)}));const Ye=i.createCustomError("EventNotFound"),qe=i.createCustomError("RoomNotFound"),Je=i.createCustomError("ClientNotInitialized"),Ve=i.createCustomError("TimelineWindowUndefined"),Qe=i.createCustomError("UserNotFound"),Xe=i.createCustomError("UserNotLoggedIn"),Ze=o.attach({effect:Le}),et=o.attach({effect:Le}),tt=a.debounce({source:Te,timeout:500});C.on(k,((e,{roomId:t})=>t)),D.on(We.doneData,((e,t)=>t)).reset(C),U.on(_e.doneData,((e,t)=>t)).reset(C),o.forward({from:Le.pending,to:M}),o.forward({from:k,to:We}),o.forward({from:Ze.done,to:B}),o.forward({from:o.sample({source:D,clock:We.done,fn:()=>{}}),to:S}),o.forward({from:et.done,to:N}),o.guard({source:C,filter:e=>Boolean(e),target:Te}),o.guard({clock:Se,source:U,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:Te}),o.guard({clock:Ne,source:C,filter:(e,t)=>e===t.roomId,target:Te}),o.guard({source:C,clock:tt,filter:Boolean,target:_e}),o.guard({source:o.sample([C,D],T,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:Be,target:Le}),o.guard({source:o.sample([C,D],L,(([e,t],{initialEventId:o,initialWindowSize:r})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:"BACKWARD"}))),filter:Be,target:et}),o.guard({source:o.sample([C,D],W,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:Be,target:Ze}),_e.use((e=>{const t=he().getRoom(e);if(!t)throw new qe;return Object.values(t.currentState.members).map((e=>{const t=he().getUser(e.userId);if(!t)throw new Qe;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ue(t),userId:e.userId}}(e,t)}))})),$.use((e=>{const t=he().getRoom(e);if(!t)throw new qe;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),We.use((async({roomId:e})=>{const t=he(),o=he().getRoom(e);if(!o)throw new qe;const r=o.getUnfilteredTimelineSet();return new c.default.TimelineWindow(t,r)})),Le.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Ve;await e.load(t,o);const n=e.canPaginate("f");let a=De(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(c.default.EventTimeline.BACKWARDS,n):await e.paginate(c.default.EventTimeline.FORWARDS,n),t&&(a=De(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),z.use((e=>{const t=he();if(!t)throw new Je;return e.map((e=>{const o=t.getRoom(e.roomId);if(!o)throw new qe;return Ce(o,99)}))})),_.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=he().getRoom(t);if(!n)throw new qe;const a={};return(await he().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new r.MatrixEvent(e),o=t.getSender();return void 0===a[o]&&(a[o]=n.getMember(o)),t.sender=a[o],Pe(t)}))})),O.use((()=>he().getUsers().map(Ue))),j.use((async({name:e,isDirect:t,invite:o,visibility:r})=>{const{room_id:n}=await he().createRoom({name:e,is_direct:t,invite:o,visibility:r});return{roomId:n}})),H.use((async({userId:e,roomId:t})=>{await he().invite(t,e)})),K.use((async({roomId:e,userId:t,reason:o})=>{await he().kick(e,t,o)})),G.use((async({roomId:e,name:t})=>{await he().setRoomName(e,t)})),Y.use((async e=>Ce(await he().joinRoom(e),99)));const ot=be(),rt=o.attach({effect:Oe,mapParams:({messages:e})=>({size:e.length})});J.on(Ke,((e,{messages:t})=>t)).reset(C),F.on(Ke,((e,{isLive:t})=>t)).reset(C),o.forward({from:o.sample(J,rt.done,((e,{params:t})=>t.messages)),to:Q}),o.forward({from:ot.map((e=>({messages:e}))),to:rt}),o.guard({source:o.sample([C,D],je,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:D.map((e=>Boolean(e))),target:He}),Z.use((({roomId:e,content:t,txnId:o})=>he().sendMessage(e,t,o))),ee.use((({roomId:e,eventId:t,body:o,txnId:r})=>he().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),te.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await he().redactEvent(e,t,void 0,r)).event_id}})),oe.use((({roomId:e,eventId:t})=>{const o=he().getRoom(e);if(!o)throw new qe;const r=o.findEventById(t);if(!r)throw new Ye;return he().setRoomReadMarkers(e,t,r)})),ne.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=he().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{X({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),ae.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{he().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),re.use((({eventId:e,roomId:t})=>{const o=he();if(!o)throw new Je;const n=o.getRoom(t);if(!n)throw new qe;const a=n.findEventById(e);if(!a)throw new Ye;const i=o.getUserId();if(!i)throw new Xe;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===r.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===he().getUserId()}(a)}})),He.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:De(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const nt=o.combine(Be,ce,se,M,((e,t,o,r)=>e&&!t&&!o&&!r));return ce.on($e.pending,((e,t)=>t)).reset(C),se.on(Oe.pending,((e,t)=>t)).reset(C),de.on(Ke,((e,{canPaginateBackward:t})=>t)).reset([T,C]),le.on(Ke,((e,{canPaginateForward:t})=>t)).reset([T,C]),o.forward({from:$e.done,to:me}),o.guard({source:fe,filter:nt,target:$e}),o.guard({source:ue,filter:nt,target:Oe}),ze.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Ve;const a="forward"===t?c.default.EventTimeline.FORWARDS:c.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:De(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return r.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return r.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return r.RoomMember}}),e.$canPaginateBackward=de,e.$canPaginateForward=le,e.$currentRoomId=C,e.$currentRoomMembers=U,e.$isLive=F,e.$loadRoomFxPending=M,e.$messages=J,e.$paginateBackwardPending=ce,e.$paginateForwardPending=se,e.$timelineWindow=D,e.checkEventPermissionsFx=re,e.checkIsDirect=ke,e.client=he,e.createClient=Re,e.createOnSyncThrottled=e=>t.throttle({source:f,timeout:e}),e.createRoomFx=j,e.createRoomMessageBatch=be,e.deleteMessageFx=te,e.deleteNotificationRuleFx=x,e.editMessageFx=ee,e.getAllUsersFx=O,e.getLoggedUserFx=y,e.getNotificationRulesFx=b,e.getRoomInfoFx=$,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=he().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(he().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=z,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(he().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${he().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${he().getAccessToken()}`}}),e.getUrlPreviewFx=ae,e.initRoom=k,e.initStoreFx=w,e.inviteUserFx=H,e.joinRoomFx=Y,e.kickUserRoomFx=K,e.liveTimelineLoaded=B,e.loadRoom=T,e.loadRoomMessage=L,e.loadRoomMessageDone=N,e.loginByPasswordFx=g,e.loginByTokenFx=v,e.logoutFx=h,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>he().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.newMessagesLoaded=Q,e.onCachedState=u,e.onClientEvent=Ie,e.onInitialSync=m,e.onPaginateBackwardDone=me,e.onRoomInitialized=S,e.onSync=f,e.onUploadProgress=X,e.paginateBackward=fe,e.paginateForward=ue,e.prependClientParams=e=>{if("string"==typeof e)return void(we=e);const{messageBatchInterval:t,...o}=e;we=o,void 0!==t&&(pe=t)},e.readAllMessagesFx=oe,e.renameRoomFx=G,e.roomMessage=V,e.searchRoomMessagesFx=_,e.sendMessageFx=Z,e.setNotificationRuleActionFx=E,e.setNotificationRuleEnabledFx=A,e.startClientFx=p,e.stopClientFx=R,e.toLiveTimeline=W,e.uploadContentFx=ne,Object.defineProperty(e,"__esModule",{value:!0}),e}({},throttle,effector,matrix,effectorExtra,debounce,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
