"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("@42px/effector-extra"),o=require("patronum/throttle"),r=require("effector"),n=require("@42px/custom-errors");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=s(e);const a=r.createDomain("matrix"),d=a.effect(),c=a.effect(),l=a.effect(),m=a.effect(),u=a.effect(),g=a.effect(),f=a.effect(),p=a.effect(),v=a.effect(),x=a.effect(),w=a.effect(),I=a.effect(),R=a.effect(),h=a.store(null),y=a.store(null),A=a.store([]),E=a.store(!1),b=a.store(!1),P=a.store(!1),C=a.store(null),M=a.store(!0),D=a.store(!0),F=a.event(),S=a.event(),T=a.event(),B=a.event(),W=a.event(),k=a.event(),U=a.event(),_=a.event(),N=a.event();let L,O;const $=[],z=()=>(L||(L=i.default.createClient(O),$.forEach((([e,t])=>{L.on(e,t)}))),L),j=e=>{$.push(...e)},q=e=>{const t=z().getAccountData("m.direct"),o=t?Object.values(t.getContent()):[];let r=[];for(const e of o)r=[...r,...e];return!!r.includes(e)},K=a.effect(),G=a.effect(),Y=a.effect();function H(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function J(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function Q(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(H(t)),e}const V="m.room.message",X="m.room.redaction",Z=n.createCustomError("RoomNotFound"),ee=n.createCustomError("TimelineWindowUndefined"),te=n.createCustomError("EventNotFound"),oe=n.createCustomError("ClientNotInitialized"),re=r.attach({source:[h,y],effect:Y,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"backward",...e})}),ne=r.attach({source:[h,y],effect:Y,mapParams:(e,[t,o])=>({roomId:t,timelineWindow:o,direction:"forward",...e})}),se=r.combine(h,y,((e,t)=>Boolean(e)&&Boolean(t))),ie=r.combine(se,P,b,E,((e,t,o,r)=>e&&!t&&!o&&!r));h.on(W,((e,{roomId:t})=>t)),y.on(K.doneData,((e,t)=>t)).reset(h);const ae=r.guard({source:r.sample(h,[G.done,Y.done],((e,{params:{roomId:t},result:o})=>({currentRoomId:e,roomId:t,...o}))),filter:({currentRoomId:e,roomId:t})=>e===t});function de(){return z().getRooms().map(J)}A.on(ae,((e,{messages:t})=>t)).reset(h),C.on(ae,((e,{isLive:t})=>t)).reset(h),M.on(ae,((e,{canPaginateBackward:t})=>t)).reset([U,h]),D.on(ae,((e,{canPaginateForward:t})=>t)).reset([U,h]),r.forward({from:G.pending,to:E}),r.forward({from:ne.pending,to:b}),r.forward({from:re.pending,to:P}),r.forward({from:r.sample({source:y,clock:K.done,fn:()=>{}}),to:k}),r.guard({source:r.sample([h,y],U,(([e,t],{initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n="BACKWARD"})=>({roomId:e,timelineWindow:t,initialEventId:o,initialWindowSize:r,loadAdditionalDataDirection:n}))),filter:se,target:G}),r.guard({source:N,filter:ie,target:re}),r.guard({source:_,filter:ie,target:ne}),r.forward({from:W,to:K}),R.use((()=>{const e=z();if(!e)return null;const t=e.getUserId();if(!t)return null;const o=e.getUser(t);return o?{userId:o.userId,currentlyActive:o.currentlyActive,displayName:o.displayName,lastActiveAgo:o.lastActiveAgo,lastPresenceTs:o.lastPresenceTs,presence:o.presence}:null})),r.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:m}),d.use((e=>z().login("m.login.password",e))),c.use((e=>z().login("m.login.token",e))),l.use((async()=>{const{store:e}=z();if(e)return e.startup()})),m.use((e=>z().startClient(e))),g.use((async({term:t,roomId:o})=>{const r=z().getRoom(o);if(!r)throw new Z;const n={};return(await z().search({body:{search_categories:{room_events:{search_term:t,keys:["content.body"],filter:{rooms:[o]}}}}})).search_categories.room_events.results.map((({result:t})=>{const o=new e.MatrixEvent(t),s=o.getSender();return void 0===n[s]&&(n[s]=r.getMember(s)),o.sender=n[s],H(o)}))})),f.use((({roomId:e,content:t,txnId:o})=>z().sendMessage(e,t,o))),p.use((({roomId:e,eventId:t,body:o,txnId:r})=>z().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},r))),v.use((async({roomId:e,eventId:t,reason:o})=>{const r=o?{reason:o}:void 0;return{eventId:(await z().redactEvent(e,t,void 0,r)).event_id}})),j([["Room.timeline",(e,t,o,r,n)=>{const s=e.getType();s!==V&&s!==X||!o&&n.liveEvent&&F(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{const e=de();B(e)}else{const e=de();S(e)}else{const e=de();T(e)}}]]),x.use((({roomId:e,eventId:t})=>{const o=z().getRoom(e);if(!o)throw new Z;const r=o.findEventById(t);if(!r)throw new te;return z().setRoomReadMarkers(e,t,r)})),w.use((e=>{const t=z();if(!t)throw new oe;return e.map((e=>{var o;const r=t.getRoom(e.roomId);if(!r)throw new Z;const n=r.getLiveTimeline().getEvents();let s=0;for(let e=n.length-1;e>=0&&e!==n.length-99;e--){const o=n[e];if(r.hasUserReadEvent(t.getUserId(),o.getId()))break;s+=1}const i=n.filter((e=>[V,X].includes(e.getType()))).reduce(Q,[]),a=i.length?i[i.length-1]:void 0,d=q(r.roomId),c=d?r.getMember(r.guessDMUserId()):null;return{...e,unreadCount:s,lastMessage:a,isDirect:d,directUserId:null==c?void 0:c.userId,isOnline:c?Boolean(null===(o=c.user)||void 0===o?void 0:o.currentlyActive):void 0,lastActivityTS:r.getLastActiveTimestamp()}}))})),u.use((()=>z().stopClient())),G.use((async({timelineWindow:e,initialEventId:t,initialWindowSize:o,loadAdditionalDataDirection:r})=>{if(!e)throw new ee;await e.load(t,o);const n=e.canPaginate("f");let s=e.getEvents().filter((e=>[V,X].includes(e.getType()))).reduce(Q,[]);if(o&&s.length<o&&r){let t;const n=o-s.length;t="BACKWARD"===r?await e.paginate(i.default.EventTimeline.BACKWARDS,n):await e.paginate(i.default.EventTimeline.FORWARDS,n),t&&(s=e.getEvents().filter((e=>[V,X].includes(e.getType()))).reduce(Q,[]))}return{messages:s,isLive:!n,canPaginateForward:n,canPaginateBackward:e.canPaginate("b")}})),Y.use((async({timelineWindow:e,direction:t,size:o,makeRequest:r,requestLimit:n})=>{if(!e)throw new ee;const s="forward"===t?i.default.EventTimeline.FORWARDS:i.default.EventTimeline.BACKWARDS;await e.paginate(s,o,r,n);const a=e.canPaginate("f");return{messages:e.getEvents().filter((e=>[V,X].includes(e.getType()))).reduce(Q,[]),isLive:!a,canPaginateForward:a,canPaginateBackward:e.canPaginate("b")}})),I.use((e=>{const t=z().getRoom(e);if(!t)throw new Z;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),K.use((async({roomId:e})=>{const t=z(),o=z().getRoom(e);if(!o)throw new Z;const r=o.getUnfilteredTimelineSet();return new i.default.TimelineWindow(t,r)})),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canPaginateBackward=M,exports.$canPaginateForward=D,exports.$currentRoomId=h,exports.$isLive=C,exports.$loadRoomFxPending=E,exports.$messages=A,exports.$paginateBackwardPending=P,exports.$paginateForwardPending=b,exports.$timelineWindow=y,exports.checkIsDirect=q,exports.client=z,exports.createOnSyncThrottled=e=>o.throttle({source:B,timeout:e}),exports.createRoomMessageBatch=e=>t.batchEvents(F,e),exports.deleteMessageFx=v,exports.editMessageFx=p,exports.getLoggedUserFx=R,exports.getRoomInfoFx=I,exports.getRoomMemberAvatarUrl=({roomId:e,userId:t,width:o,height:r,resizeMethod:n,allowDefault:s=!0})=>{const i=z().getRoom(e);if(!i)return null;const a=i.getMember(t);return a?a.getAvatarUrl(z().getHomeserverUrl(),o,r,n,s,!0):null},exports.getRoomsWithActivitiesFx=w,exports.getSenderAvatarUrl=({sender:e,width:t,height:o,resizeMethod:r,allowDefault:n=!0,allowDirectLinks:s=!1})=>e&&e.getAvatarUrl?e.getAvatarUrl(z().getHomeserverUrl(),t,o,r,n,s):null,exports.initRoom=W,exports.initStoreFx=l,exports.loadRoom=U,exports.loginByPasswordFx=d,exports.loginByTokenFx=c,exports.onCachedState=T,exports.onClientEvent=j,exports.onInitialSync=S,exports.onRoomInitialized=k,exports.onSync=B,exports.paginateBackward=N,exports.paginateForward=_,exports.prependClientParams=e=>{O=e},exports.readAllMessagesFx=x,exports.roomMessage=F,exports.searchRoomMessagesFx=g,exports.sendMessageFx=f,exports.startClientFx=m,exports.stopClientFx=u;
//# sourceMappingURL=matrix-effector.cjs.js.map
