var MatrixEffector=function(e,t,o,r,n,a,i){"use strict";function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c,d=s(t);(c=e.MsgType||(e.MsgType={})).Audio="m.audio",c.BadEncrypted="m.bad.encrypted",c.Emote="m.emote",c.File="m.file",c.Image="m.image",c.Notice="m.notice",c.Text="m.text",c.Video="m.video",c.Location="m.location";const l=n.createDomain("matrix"),m=l.effect(),u=l.effect(),g=l.effect(),f=l.effect(),v=l.effect(),w=l.effect(),p=l.effect(),I=l.effect(),y=l.effect(),R=l.effect(),h=l.effect(),b=l.effect(),E=l.effect(),A=l.effect(),P=l.effect(),U=l.effect(),x=l.effect(),F=l.effect(),M=l.effect(),C=l.effect(),T=l.store(null),D=l.store(null),B=l.store(null),S=l.store([]),k=l.store(!1),N=l.store(!1),L=l.store(!1),W=l.store(null),_=l.store(!0),$=l.store(!0),O=l.event(),z=l.event(),j=l.event(),H=l.event(),K=l.event(),G=l.event(),Y=l.event(),q=l.event(),J=l.event(),V=l.event();let Q,X;const Z=[],ee=()=>(Q||(Q=d.default.createClient(X),Z.forEach((([e,t])=>{Q.on(e,t)}))),Q),te=e=>{Z.push(...e)},oe=e=>{const t=ee().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},re=l.event(),ne=l.event(),ae=l.event(),ie=l.event(),se=l.effect(),ce=l.effect(),de=l.effect(),le=l.effect(),me=l.effect();function ue(e){return{...e.getContent()}}function ge(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:ue(e),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function fe(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function ve(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(ge(t)),e}const we="m.room.message",pe="m.room.redaction",Ie=a.createCustomError("RoomNotFound"),ye=a.createCustomError("UserNotFound"),Re=a.createCustomError("TimelineWindowUndefined"),he=a.createCustomError("EventNotFound"),be=a.createCustomError("ClientNotInitialized"),Ee=a.createCustomError("UserNotLoggedIn");function Ae(e){return e.getEvents().filter((e=>[we,pe].includes(e.getType()))).reduce(ve,[])}const Pe=n.attach({source:[T,B],effect:de,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),Ue=n.attach({source:[T,B],effect:de,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),xe=n.combine(T,B,((e,t)=>Boolean(e)&&Boolean(t))),Fe=n.combine(xe,L,N,k,((e,t,o,r)=>e&&!t&&!o&&!r));T.on(K,((e,{roomId:t})=>t)),B.on(se.doneData,((e,t)=>t)).reset(T);const Me=n.guard({source:n.sample(T,[ce.done,de.done,le.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});S.on(Me,((e,{messages:t})=>t)).reset(T),W.on(Me,((e,{isLive:t})=>t)).reset(T),D.on(me.doneData,((e,t)=>t)).reset(T),_.on(Me,((e,{canPaginateBackward:t})=>t)).reset([Y,T]),$.on(Me,((e,{canPaginateForward:t})=>t)).reset([Y,T]),n.guard({source:T,filter:e=>Boolean(e),target:ne});const Ce=i.debounce({source:ne,timeout:500});function Te(){return ee().getRooms().map(fe)}return n.guard({clock:ae,source:T,filter:(e,t)=>e===t.roomId,target:ne}),n.guard({clock:ie,source:D,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:ne}),n.guard({source:T,clock:Ce,filter:Boolean,target:me}),n.forward({from:ce.pending,to:k}),n.forward({from:Ue.pending,to:N}),n.forward({from:Pe.pending,to:L}),n.forward({from:n.sample({source:B,clock:se.done,fn:()=>{}}),to:G}),n.guard({source:n.sample([T,B],re,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:B.map((e=>Boolean(e))),target:le}),n.guard({source:n.sample([T,B],Y,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:xe,target:ce}),n.guard({source:J,filter:Fe,target:Pe}),n.guard({source:q,filter:Fe,target:Ue}),n.forward({from:K,to:se}),E.use((()=>{const e=ee();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);return o?{avatarUrl:o.avatarUrl,userId:o.userId,currentlyActive:o.currentlyActive,displayName:o.displayName,lastActiveAgo:o.lastActiveAgo,lastPresenceTs:o.lastPresenceTs,presence:o.presence}:null})),n.forward({from:m.done.map((()=>({initialSyncLimit:20}))),to:f}),m.use((e=>ee().login("m.login.password",e))),u.use((e=>ee().login("m.login.token",e))),g.use((async()=>{const{store:e}=ee();if(e)return e.startup()})),f.use((e=>ee().startClient(e))),w.use((async({term:e,roomId:o,orderBy:r="rank"})=>{const n=ee().getRoom(o);if(!n)throw new Ie;const a={};return(await ee().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[o]},order_by:r}}}})).search_categories.room_events.results.map((({result:e})=>{const o=new t.MatrixEvent(e),r=o.getSender();return void 0===a[r]&&(a[r]=n.getMember(r)),o.sender=a[r],ge(o)}))})),p.use((({roomId:e,content:t,txnId:o})=>ee().sendMessage(e,t,o))),I.use((({roomId:e,eventId:t,body:o,txnId:r})=>ee().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),y.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await ee().redactEvent(e,t,void 0,r)).event_id}})),te([["Room.timeline",(e,t,o,r,n)=>{const a=e.getType();a!==we&&a!==pe||!o&&n.liveEvent&&O(function(e){const t={eventId:e.getId(),content:ue(e),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["Room.localEchoUpdated",()=>re()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=Te();H(e)}else{const e=Te();z(e)}else{const e=Te();j(e)}}],["RoomState.members",(e,t,o)=>ae(o)],["RoomState.newMember",(e,t,o)=>ae(o)],["RoomMember.membership",(e,t)=>ae(t)],["RoomMember.name",(e,t)=>ae(t)],["RoomMember.powerLevel",(e,t)=>ae(t)],["RoomMember.typing",(e,t)=>ae(t)],["User.avatarUrl",(e,t)=>ie(t)],["User.presence",(e,t)=>ie(t)],["User.displayName",(e,t)=>ie(t)]]),R.use((({roomId:e,eventId:t})=>{const o=ee().getRoom(e);if(!o)throw new Ie;const r=o.findEventById(t);if(!r)throw new he;return ee().setRoomReadMarkers(e,t,r)})),h.use((e=>{const t=ee();if(!t)throw new be;return e.map((e=>{var o;const r=t.getRoom(e.roomId);if(!r)throw new Ie;const n=r.getLiveTimeline().getEvents();let a=0;for(let e=n.length-1;e>=0&&e!==n.length-99;e--){const o=n[e];if(r.hasUserReadEvent(t.getUserId(),o.getId()))break;a+=1}const i=n.filter((e=>[we,pe].includes(e.getType()))).reduce(ve,[]),s=i.length?i[i.length-1]:void 0,c=oe(r.roomId),d=c?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:s,isDirect:c,directUserId:null==d?void 0:d.userId,isOnline:d?Boolean(null===(o=d.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:r.getLastActiveTimestamp()}}))})),v.use((()=>ee().stopClient())),ce.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new Re;await e.load(t,o);const n=e.canPaginate("f");let a=Ae(e);if(o&&a.length<o){let t;const n=o-a.length;t="BACKWARD"===r?await e.paginate(d.default.EventTimeline.BACKWARDS,n):await e.paginate(d.default.EventTimeline.FORWARDS,n),t&&(a=Ae(e))}return{messages:a,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),de.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new Re;const a="forward"===t?d.default.EventTimeline.FORWARDS:d.default.EventTimeline.BACKWARDS;await e.paginate(a,o,r,n);const i=e.canPaginate("f");return{messages:Ae(e),isLive:!i,canPaginateForward:i,canPaginateBackward:e.canPaginate("b")}})),le.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:Ae(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}})),b.use((e=>{const t=ee().getRoom(e);if(!t)throw new Ie;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),se.use((async({roomId:e})=>{const t=ee(),o=ee().getRoom(e);if(!o)throw new Ie;const r=o.getUnfilteredTimelineSet();return new d.default.TimelineWindow(t,r)})),A.use((({eventId:e,roomId:o})=>{const r=ee();if(!r)throw new be;const n=r.getRoom(o);if(!n)throw new Ie;const a=n.findEventById(e);if(!a)throw new he;const i=r.getUserId();if(!i)throw new Ee;return{canRedact:n.currentState.maySendRedactionForEvent(a,i)&&"m.room.server_acl"!==a.getType(),canEdit:function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const o=e.getOriginalContent(),{msgtype:r}=o;return("m.text"===r||"m.emote"===r)&&Boolean(o.body)&&"string"==typeof o.body&&e.getSender()===ee().getUserId()}(a)}})),P.use((({file:e,name:t,includeFilename:o,onlyContentUri:r,rawResponse:n,type:a})=>{const i=ee().uploadContent(e,{name:t,includeFilename:o,type:a,onlyContentUri:r,rawResponse:n,progressHandler:({loaded:t,total:o})=>{V({file:e,loaded:t,total:o})}}),s={promise:i};return i.abort&&(s.abort=i.abort),s})),me.use((e=>{const t=ee().getRoom(e);if(!t)throw new Ie;return Object.values(t.currentState.members).map((e=>{const t=ee().getUser(e.userId);if(!t)throw new ye;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:{avatarUrl:t.avatarUrl,userId:t.userId,currentlyActive:t.currentlyActive,displayName:t.displayName,lastActiveAgo:t.lastActiveAgo,lastPresenceTs:t.lastPresenceTs,presence:t.presence},userId:e.userId}}(e,t)}))})),U.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((r=>{ee().getUrlPreview(e,t).then(r).catch((()=>r({"og:url":e}))),setTimeout((()=>{r({"og:url":e})}),o)})))),x.use((()=>ee().getPushRules())),F.use((async e=>{await ee().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)})),M.use((async e=>{await ee().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)})),C.use((async e=>ee().getProfileInfo(e.userId))),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canPaginateBackward=_,e.$canPaginateForward=$,e.$currentRoomId=T,e.$currentRoomMembers=D,e.$isLive=W,e.$loadRoomFxPending=k,e.$messages=S,e.$paginateBackwardPending=L,e.$paginateForwardPending=N,e.$timelineWindow=B,e.checkEventPermissionsFx=A,e.checkIsDirect=oe,e.client=ee,e.createOnSyncThrottled=e=>r.throttle({source:H,timeout:e}),e.createRoomMessageBatch=e=>o.batchEvents(O,e),e.deleteMessageFx=y,e.editMessageFx=I,e.getLoggedUserFx=E,e.getNoficiationRulesFx=x,e.getProfileInfoFx=C,e.getRoomInfoFx=b,e.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:a=!0})=>{const i=ee().getRoom(e);if(!i)return null;const s=i.getMember(t);return s?s.getAvatarUrl(ee().getHomeserverUrl(),o,r,n,a,!0):null},e.getRoomsWithActivitiesFx=h,e.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:a=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(ee().getHomeserverUrl(),t,o,r,n,a):null,e.getUploadCredentials=()=>({endpointUrl:`${ee().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${ee().getAccessToken()}`}}),e.getUrlPreviewFx=U,e.initRoom=K,e.initStoreFx=g,e.loadRoom=Y,e.loginByPasswordFx=m,e.loginByTokenFx=u,e.mxcUrlToHttp=({mxcUrl:e,width:t,height:o,resizeMethod:r,allowDirectLinks:n})=>ee().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==r?r:"scale",void 0!==n?n:null),e.onCachedState=j,e.onClientEvent=te,e.onInitialSync=z,e.onRoomInitialized=G,e.onSync=H,e.onUploadProgress=V,e.paginateBackward=J,e.paginateForward=q,e.prependClientParams=e=>{X=e},e.readAllMessagesFx=R,e.roomMessage=O,e.searchRoomMessagesFx=w,e.sendMessageFx=p,e.setNotificationRuleActionFx=F,e.setNotificationRuleEnabledFx=M,e.startClientFx=f,e.stopClientFx=v,e.uploadContentFx=P,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,effectorExtra,throttle,effector,customErrors,patronum);
//# sourceMappingURL=matrix-effector.iife.js.map
