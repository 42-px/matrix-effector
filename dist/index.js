import{throttle as e}from"patronum/throttle";import{createDomain as t,combine as o,attach as n,guard as r,sample as i,forward as a}from"effector";import s,{MatrixEvent as c,EventStatus as l}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{batchEvents as d}from"@42px/effector-extra";import{debounce as m}from"patronum/debounce";import{createCustomError as u}from"@42px/custom-errors";const f=t("root"),g=f.domain("app"),v=g.event(),p=g.event(),w=g.event(),I=t=>e({source:w,timeout:t}),y=g.effect(),h=g.effect(),R=g.effect(),b=g.effect(),A=g.effect(),D=g.effect(),E=g.effect(),U=f.domain("notification"),P=U.effect(),C=U.effect(),S=U.effect(),k=U.effect(),_=f.domain("room"),M=_.store(null),N=_.store(!1),B=_.store(null),W=_.store(null),T=_.event(),L=_.store(null),x=_.event(),F=_.event(),z=_.event(),K=_.event(),O=_.event(),j=_.event(),H=_.event(),G=_.event(),Y=_.event(),q=_.event(),$=_.effect(),J=_.effect(),V=_.effect(),Q=_.effect(),X=_.effect(),Z=_.effect(),ee=_.effect(),te=_.effect(),oe=_.effect(),ne=_.effect();var re,ie;!function(e){e.public="public",e.private="private"}(re||(re={})),function(e){e.trustedPrivateChat="trusted_private_chat",e.privateChat="private_chat",e.publicChat="public_chat"}(ie||(ie={}));const ae=f.domain("messages"),se=ae.store([]),ce=ae.event(),le=ae.event(),de=ae.event(),me=ae.effect(),ue=ae.effect(),fe=ae.effect(),ge=ae.effect(),ve=ae.effect(),pe=ae.effect(),we=ae.effect(),Ie=f.domain("pagination"),ye=Ie.store(!1),he=Ie.store(!1),Re=Ie.store(!0),be=Ie.store(!0),Ae=Ie.event(),De=Ie.event(),Ee=Ie.event(),Ue=Ie.event();var Pe;let Ce,Se;!function(e){e.Audio="m.audio",e.BadEncrypted="m.bad.encrypted",e.Emote="m.emote",e.File="m.file",e.Image="m.image",e.Notice="m.notice",e.Text="m.text",e.Video="m.video",e.Location="m.location"}(Pe||(Pe={}));let ke=500;const _e=[],Me=()=>{Ce&&(Ce.removeAllListeners(),Ce=null),Ce=s.createClient(Se),_e.forEach((([e,t])=>{Ce.on(e,t)}))},Ne=()=>(Ce||Me(),Ce),Be=e=>{if("string"==typeof e)return void(Se=e);const{messageBatchInterval:t,...o}=e;Se=o,void 0!==t&&(ke=t)},We=e=>{_e.push(...e)},Te=()=>d(ce,ke),Le="m.room.message",xe="m.room.redaction",Fe=u("EventNotFound"),ze=u("RoomNotFound"),Ke=u("ClientNotInitialized"),Oe=u("TimelineWindowUndefined"),je=u("UserNotFound"),He=u("UserNotLoggedIn");function Ge(e){return{...e.getContent()}}function Ye(e,t){var o;const n=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Ge(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null===(o=n)||void 0===o?void 0:o.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function qe(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function $e(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Ye(t)),e}const Je=e=>({avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence});function Ve(e,t){var o;const n=Ne(),r=n.getRoom(e.roomId);if(!r)throw new ze;const i=r.getLiveTimeline().getEvents();let a=0;for(let e=i.length-1;e>=0&&e!==i.length-t;e--){const t=i[e];if(r.hasUserReadEvent(n.getUserId(),t.getId()))break;a+=1}const s=i.filter((e=>[Le,xe].includes(e.getType()))).reduce($e,[]),c=s.length?s[s.length-1]:void 0,l=ot(e.roomId),d=l?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:a,lastMessage:c,isDirect:l,directUserId:null==d?void 0:d.userId,isOnline:d?Boolean(null===(o=d.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:r.getLastActiveTimestamp()}}function Qe(e){return e.getEvents().filter((e=>[Le,xe].includes(e.getType()))).reduce($e,[])}const Xe=({sender:e,width:t,height:o,resizeMethod:n,allowDefault:r=!0,allowDirectLinks:i=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(Ne().getHomeserverUrl(),t,o,n,r,i):null,Ze=({roomId:e,userId:t,width:o,height:n,resizeMethod:r,allowDefault:i=!0})=>{const a=Ne().getRoom(e);if(!a)return null;const s=a.getMember(t);return s?s.getAvatarUrl(Ne().getHomeserverUrl(),o,n,r,i,!0):null},et=()=>{var e;const t=null===(e=Ne().getAccountData("m.direct"))||void 0===e?void 0:e.getContent();return t&&Object.values(t).flatMap((e=>e))},tt=({mxcUrl:e,width:t,height:o,resizeMethod:n,allowDirectLinks:r})=>Ne().mxcUrlToHttp(e,void 0!==t?t:null,void 0!==o?o:null,void 0!==n?n:"scale",void 0!==r?r:null),ot=e=>et().includes(e),nt=()=>({endpointUrl:`${Ne().getHomeserverUrl()}/_matrix/media/r0/upload`,headers:{Authorization:`Bearer ${Ne().getAccessToken()}`}}),rt=e=>{var t,o,n;const r=Ne(),{creator:i}=null===(o=(null===(t=r.getRoom(e))||void 0===t?void 0:t.currentState.getStateEvents("m.room.create",void 0))[0])||void 0===o?void 0:o.getContent(),a=null===(n=r.getAccountData("m.direct"))||void 0===n?void 0:n.getContent();return r.setAccountData("m.direct",{...a,[i]:[e]})},it=o(W,L,((e,t)=>Boolean(e)&&Boolean(t))),at=_.event(),st=_.event(),ct=_.event(),lt=_.effect(),dt=_.effect(),mt=_.effect(),ut=Ie.effect(),ft=n({source:[W,L],effect:ut,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),gt=n({source:[W,L],effect:ut,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),vt=ae.event(),pt=ae.effect(),wt=r({source:i(W,[dt.done,ut.done,pt.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function It(){return Ne().getRooms().map(qe)}a({from:y.done.map((()=>({initialSyncLimit:20}))),to:b}),We([["Room.timeline",(e,t,o,n,r)=>{const i=e.getType();i!==Le&&i!==xe||!o&&r.liveEvent&&ce(Ye(e))}],["Room",e=>{var t,o;const n=Ne(),r=e.getMember(n.getUserId());if(r&&"invite"!==r.membership)return;(null===(o=null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t?void 0:t.getContent())||void 0===o?void 0:o.isDirect)?Y(e):q(e)}],["Room.localEchoUpdated",()=>vt()],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=It();w(e)}else{const e=It();v(e)}else{const e=It();p(e)}}],["RoomState.members",(e,t,o)=>st(o)],["RoomState.newMember",(e,t,o)=>st(o)],["RoomMember.membership",(e,t)=>st(t)],["RoomMember.name",(e,t)=>st(t)],["RoomMember.powerLevel",(e,t)=>st(t)],["RoomMember.typing",(e,t)=>st(t)],["User.avatarUrl",(e,t)=>at(t)],["User.presence",(e,t)=>at(t)],["User.displayName",(e,t)=>at(t)]]),y.use((e=>Ne().login("m.login.password",e))),h.use((e=>Ne().login("m.login.token",e))),R.use((async()=>{const{store:e}=Ne();if(e)return e.startup()})),b.use((e=>Ne().startClient(e))),E.use((()=>Ne().logout())),D.use((()=>Ne().stopClient())),A.use((async()=>{const e=Ne();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);if(!o)return null;const n=Je(o);if(!n.avatarUrl||!n.displayName){const o=await e.getProfileInfo(t);n.avatarUrl=o.avatar_url,n.displayName=o.displayname}return n})),P.use((()=>Ne().getPushRules())),C.use((async e=>{try{await Ne().setPushRuleActions(e.scope,e.kind,e.ruleId,e.actions)}catch(e){throw console.error("Error while setNotificationRuleAction.Fx"),console.error(e),e}})),S.use((async e=>{try{console.error("Getting push rules...");const t=await Ne().getPushRules();console.error(t.global.room),await Ne().setPushRuleEnabled(e.scope,e.kind,e.ruleId,e.enabled)}catch(e){console.error("Error while setNotificationRuleEnabled"),console.error(e)}})),k.use((async e=>{await Ne().deletePushRule(e.scope,e.kind,e.ruleId)}));const yt=n({effect:dt}),ht=n({effect:dt}),Rt=n({effect:dt}),bt=m({source:ct,timeout:500});console.log("ЭТА СЕКЦИЯ"),W.on(x,((e,{roomId:t})=>(console.log("ВОТ ОНА ПЯТАЯ КОЛОННА"),console.log(e),console.log(t),t))),console.log("КОНЕЦ ЭТОЙ СЕКЦИИ СЕКЦИЯ"),L.on(lt.doneData,((e,t)=>t)).reset(W),B.on(mt.doneData,((e,t)=>t)).reset(W),a({from:dt.pending,to:N}),a({from:x,to:lt}),a({from:yt.done,to:F}),a({from:i({source:L,clock:lt.done,fn:()=>{}}),to:z}),a({from:ht.done,to:K}),a({from:Rt.done,to:O}),r({source:W,filter:e=>Boolean(e),target:ct}),r({clock:at,source:B,filter:(e,t)=>Boolean(null==e?void 0:e.find((e=>e.userId===t.userId))),target:ct}),r({clock:st,source:W,filter:(e,t)=>e===t.roomId,target:ct}),r({source:W,clock:bt,filter:Boolean,target:mt}),r({source:i([W,L],j,(([e,t],{initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:r="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:r}))),filter:it,target:Rt}),r({source:i([W,L],G,(([e,t],{initialEventId:o,initialWindowSize:n})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:n,loadAdditionalDataDirection:"BACKWARD"}))),filter:it,target:ht}),r({source:i([W,L],H,(([e,t])=>({roomId:e,timelineWindow:t,loadAdditionalDataDirection:"BACKWARD"}))),filter:it,target:yt}),mt.use((e=>{const t=Ne().getRoom(e);if(!t)throw new ze;return Object.values(t.currentState.members).map((e=>{const t=Ne().getUser(e.userId);if(!t)throw new je;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Je(t),userId:e.userId}}(e,t)}))})),V.use((e=>{const t=Ne().getRoom(e);if(!t)throw new ze;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),lt.use((async({roomId:e})=>{const t=Ne(),o=Ne().getRoom(e);if(!o)throw new ze;const n=o.getUnfilteredTimelineSet();return new s.TimelineWindow(t,n)})),dt.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:n})=>{if(!e)throw new Oe;await e.load(t,o);const r=e.canPaginate("f");let i=Qe(e);if(o&&i.length<o){let t;const r=o-i.length;t="BACKWARD"===n?await e.paginate(s.EventTimeline.BACKWARDS,r):await e.paginate(s.EventTimeline.FORWARDS,r),t&&(i=Qe(e))}return{messages:i,isLive:!r,canPaginateForward:r,canPaginateBackward:e.canPaginate("b")}})),J.use((e=>{if(!Ne())throw new Ke;return e.map((e=>Ve(e,99)))})),$.use((async({term:e,roomId:t,orderBy:o="rank"})=>{const n=Ne().getRoom(t);if(!n)throw new ze;const r={};return(await Ne().search({body:{search_categories:{room_events:{search_term:e,keys:["content.body"],filter:{rooms:[t]},order_by:o}}}})).search_categories.room_events.results.map((({result:e})=>{const t=new c(e),o=t.getSender();return void 0===r[o]&&(r[o]=n.getMember(o)),t.sender=r[o],Ye(t)}))})),Q.use((()=>Ne().getUsers().map(Je))),X.use((async({name:e,invite:t,visibility:o,initialState:n=[],preset:r})=>{const i={name:e,invite:t,visibility:o,initial_state:n.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:r},{room_id:a}=await Ne().createRoom(i);return{roomId:a}})),Z.use((async({user:e,preset:t,initialState:o=[]})=>{const n=Ne(),r=et().find((t=>{var o;return null===(o=n.getRoom(t))||void 0===o?void 0:o.currentState.members[e.userId]}));if(r)return{roomId:r};const i={is_direct:!0,invite:[e.userId],visibility:re.private,initial_state:o.map((e=>({...e,state_key:e.stateKey,stateKey:void 0}))),preset:t,creation_content:{isDirect:!0,creator:n.getUserId()}},{room_id:a}=await n.createRoom(i);return await rt(a),{roomId:a}})),ee.use((async({userId:e,roomId:t})=>{await Ne().invite(t,e)})),te.use((async({roomId:e,userId:t,reason:o})=>{await Ne().kick(e,t,o)})),oe.use((async({roomId:e,name:t})=>{await Ne().setRoomName(e,t)})),ne.use((async({roomId:e,isDirect:t=!1})=>{const o=Ne(),n=await o.joinRoom(e);return t&&await rt(e),Ve(qe(n),99)}));const At=Te(),Dt=n({effect:gt,mapParams:({messages:e})=>({size:e.length})});se.on(wt,((e,{messages:t})=>t)).reset(W),M.on(wt,((e,{isLive:t})=>t)).reset(W),a({from:i(se,Dt.done,((e,{params:t})=>t.messages)),to:le}),a({from:At.map((e=>({messages:e}))),to:Dt}),r({source:i([W,L],vt,(([e,t])=>({timelineWindow:t,roomId:e}))),filter:L.map((e=>Boolean(e))),target:pt}),me.use((({roomId:e,content:t,txnId:o})=>Ne().sendMessage(e,t,o))),ue.use((({roomId:e,eventId:t,body:o,txnId:n})=>Ne().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},n))),fe.use((async({roomId:e,eventId:t,reason:o})=>{const n=o?{reason:o}:void 0;return{eventId:(await Ne().redactEvent(e,t,void 0,n)).event_id}})),ge.use((({roomId:e,eventId:t})=>{const o=Ne().getRoom(e);if(!o)throw new ze;const n=o.findEventById(t);if(!n)throw new Fe;return Ne().setRoomReadMarkers(e,t,n)})),pe.use((({file:e,name:t,includeFilename:o,onlyContentUri:n,rawResponse:r,type:i})=>{const a=Ne().uploadContent(e,{name:t,includeFilename:o,type:i,onlyContentUri:n,rawResponse:r,progressHandler:({loaded:t,total:o})=>{de({file:e,loaded:t,total:o})}}),s={promise:a};return a.abort&&(s.abort=a.abort),s})),we.use((({url:e,ts:t,timeout:o=5e3})=>new Promise((n=>{Ne().getUrlPreview(e,t).then(n).catch((()=>n({"og:url":e}))),setTimeout((()=>{n({"og:url":e})}),o)})))),ve.use((({eventId:e,roomId:t})=>{const o=Ne();if(!o)throw new Ke;const n=o.getRoom(t);if(!n)throw new ze;const r=n.findEventById(e);if(!r)throw new Fe;const i=o.getUserId();if(!i)throw new He;return{canRedact:n.currentState.maySendRedactionForEvent(r,i)&&"m.room.server_acl"!==r.getType(),canEdit:function(e){if(e.status===l.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;const t=e.getOriginalContent(),{msgtype:o}=t;return("m.text"===o||"m.emote"===o)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===Ne().getUserId()}(r)}})),pt.use((({timelineWindow:e})=>{const t=e.canPaginate("f");return{messages:Qe(e),isLive:!t,canPaginateForward:t,canPaginateBackward:e.canPaginate("b")}}));const Et=o(it,he,ye,N,((e,t,o,n)=>e&&!t&&!o&&!n));he.on(ft.pending,((e,t)=>t)).reset(W),ye.on(gt.pending,((e,t)=>t)).reset(W),Re.on(wt,((e,{canPaginateBackward:t})=>t)).reset([j,W]),be.on(wt,((e,{canPaginateForward:t})=>t)).reset([j,W]),a({from:ft.done,to:Ae}),a({from:gt.done,to:De}),r({source:Ue,filter:Et,target:ft}),r({source:Ee,filter:Et,target:gt}),ut.use((async({timelineWindow:e,direction:t,size:o,makeRequest:n,requestLimit:r})=>{if(!e)throw new Oe;const i="forward"===t?s.EventTimeline.FORWARDS:s.EventTimeline.BACKWARDS;await e.paginate(i,o,n,r);const a=e.canPaginate("f");return{messages:Qe(e),isLive:!a,canPaginateForward:a,canPaginateBackward:e.canPaginate("b")}}));export{Re as $canPaginateBackward,be as $canPaginateForward,W as $currentRoomId,B as $currentRoomMembers,M as $isLive,N as $loadRoomFxPending,se as $messages,he as $paginateBackwardPending,ye as $paginateForwardPending,L as $timelineWindow,Pe as MsgType,ie as Preset,re as Visibility,ve as checkEventPermissionsFx,ot as checkIsDirect,T as clearCurrentRoomId,Ne as client,Me as createClient,Z as createDirectRoomFx,I as createOnSyncThrottled,X as createRoomFx,Te as createRoomMessageBatch,fe as deleteMessageFx,k as deleteNotificationRuleFx,Y as directRoomCreated,ue as editMessageFx,Q as getAllUsersFx,A as getLoggedUserFx,P as getNotificationRulesFx,V as getRoomInfoFx,Ze as getRoomMemberAvatarUrl,J as getRoomsWithActivitiesFx,Xe as getSenderAvatarUrl,nt as getUploadCredentials,we as getUrlPreviewFx,x as initRoom,R as initStoreFx,ee as inviteUserFx,ne as joinRoomFx,te as kickUserRoomFx,F as liveTimelineLoaded,j as loadRoom,G as loadRoomMessage,K as loadRoomMessageDone,y as loginByPasswordFx,h as loginByTokenFx,E as logoutFx,tt as mxcUrlToHttp,le as newMessagesLoaded,p as onCachedState,We as onClientEvent,v as onInitialSync,Ae as onPaginateBackwardDone,De as onPaginateForwardDone,z as onRoomInitialized,O as onRoomLoaded,w as onSync,de as onUploadProgress,Ue as paginateBackward,Ee as paginateForward,Be as prependClientParams,ge as readAllMessagesFx,oe as renameRoomFx,q as roomCreated,ce as roomMessage,$ as searchRoomMessagesFx,me as sendMessageFx,C as setNotificationRuleActionFx,S as setNotificationRuleEnabledFx,b as startClientFx,D as stopClientFx,H as toLiveTimeline,pe as uploadContentFx};
//# sourceMappingURL=index.js.map
