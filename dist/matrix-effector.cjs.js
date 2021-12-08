"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("patronum/throttle"),r=require("effector"),n=require("@babel/runtime/helpers/toConsumableArray"),o=require("@babel/runtime/helpers/slicedToArray"),a=require("@42px/effector-extra"),i=require("@babel/runtime/helpers/defineProperty"),u=require("@babel/runtime/helpers/asyncToGenerator"),s=require("@babel/runtime/regenerator"),c=require("@42px/custom-errors"),f=require("patronum/debounce"),d=require("patronum");function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var p,m,v=l(e),g=l(n),x=l(o),w=l(i),b=l(u),h=l(s),y=r.createDomain("root"),I=y.domain("app"),R=I.event(),k=I.event(),E=I.event(),P=I.effect(),D=I.effect(),O=I.effect(),F=I.effect(),U=I.effect(),A=I.effect(),S=I.effect(),C=I.effect(),j=I.effect(),M=I.effect(),T=y.domain("notification"),L=T.effect(),_=T.effect(),B=T.effect(),N=T.effect(),W=y.domain("room"),$=W.store(null),q=W.store(!1),K=W.store(null),z=W.store(null),V=W.store(null),H=W.event(),G=W.store(null),J=W.store(0),Y=W.store({}),Q=W.store(50),X=W.store(50),Z=W.store(50),ee=W.store(0),te=W.store(50),re=W.store(50),ne=K.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),oe=r.combine(J,Q,(function(e,t){return e>=t})),ae=r.combine(J,X,(function(e,t){return e>=t})),ie=r.combine(J,Z,(function(e,t){return e>=t})),ue=r.combine(J,ee,(function(e,t){return e>=t})),se=r.combine(J,te,(function(e,t){return e>=t})),ce=r.combine(J,re,(function(e,t){return e>=t})),fe=r.combine(z,G,(function(e,t){return Boolean(e)&&Boolean(t)})),de=W.event(),le=W.event(),pe=W.event(),me=W.event(),ve=W.event(),ge=W.event(),xe=W.event(),we=W.event(),be=W.event(),he=W.event(),ye=W.event(),Ie=W.event(),Re=W.event(),ke=W.event(),Ee=W.event(),Pe=W.effect(),De=W.effect(),Oe=W.effect(),Fe=W.effect(),Ue=W.effect(),Ae=W.effect(),Se=W.effect(),Ce=W.effect(),je=W.effect(),Me=W.effect(),Te=W.effect(),Le=W.effect(),_e=W.effect(),Be=W.effect(),Ne=W.effect();exports.Visibility=void 0,(p=exports.Visibility||(exports.Visibility={})).public="public",p.private="private",exports.Preset=void 0,(m=exports.Preset||(exports.Preset={})).trustedPrivateChat="trusted_private_chat",m.privateChat="private_chat",m.publicChat="public_chat";var We,$e,qe,Ke=y.domain("messages"),ze=Ke.store([]),Ve=Ke.event(),He=Ke.event(),Ge=Ke.event(),Je=Ke.event(),Ye=Ke.event(),Qe=Ke.event(),Xe=Ke.event(),Ze=Ke.event(),et=Ke.store(!1),tt=Ke.store(!1),rt=Ke.store(!0),nt=Ke.store(!0),ot=Ke.effect(),at=Ke.effect(),it=Ke.effect(),ut=Ke.effect(),st=Ke.effect(),ct=Ke.effect(),ft=Ke.effect();exports.MsgType=void 0,(We=exports.MsgType||(exports.MsgType={})).Audio="m.audio",We.BadEncrypted="m.bad.encrypted",We.Emote="m.emote",We.File="m.file",We.Image="m.image",We.Notice="m.notice",We.Text="m.text",We.Video="m.video",We.Location="m.location",exports.MatrixMembershipType=void 0,($e=exports.MatrixMembershipType||(exports.MatrixMembershipType={})).leave="leave",$e.invite="invite",$e.ban="ban",$e.join="join",$e.knock="knock";var dt=500,lt=[],pt=function(){qe&&(qe.removeAllListeners(),qe=null)},mt=function(e){var t=e.options,r=e.messageBatchInterval;pt(),void 0!==r&&(dt=r),qe=v.default.createClient(t),lt.forEach((function(e){var t=x.default(e,2),r=t[0],n=t[1];qe.on(r,n)}))},vt=function(){return qe},gt=function(e){lt.push.apply(lt,g.default(e))},xt=function(){return a.batchEvents(He,dt)},wt=c.createCustomError("EventNotFound"),bt=c.createCustomError("RoomNotFound"),ht=c.createCustomError("ClientNotInitialized"),yt=c.createCustomError("TimelineWindowUndefined"),It=c.createCustomError("UserNotFound"),Rt=c.createCustomError("UserNotLoggedIn"),kt="m.room.message",Et="m.room.redaction";function Pt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Dt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Pt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Pt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ot=function(e,t,r){return e.seen=r.getJoinedMembers().some((function(n){return n.userId!==t&&r.hasUserReadEvent(n.userId,e.originalEventId)})),e},Ft=function(e){return e.getContent()};function Ut(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Ft(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function At(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function St(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Ut(t)),e}var Ct=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function jt(e){var t,r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,a=vt(),i=a.getRoom(e.roomId);if(!i)throw new bt;for(var u=i.getLiveTimeline().getEvents(),s=null===(t=i.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect,c=0,f=u.length-1;f>=0&&f!==u.length-o;f--){var d=u[f],l=i.hasUserReadEvent(a.getUserId(),d.getId());if(l)break;c+=1}var p=u.filter((function(e){return[kt,Et].includes(e.getType())})),m=p[p.length-1],v=m?Ut(m):void 0;if(v){var g=a.getUserId();v.sender.userId!==g?v.seen=i.hasUserReadEvent(g,v.originalEventId):v=Ot(v,g,i)}var x=s?i.getMember(i.guessDMUserId()):null;return Dt(Dt({},e),{},{unreadCount:c,lastMessage:v,isDirect:s,directUserId:null==x?void 0:x.userId,isOnline:x?Boolean(null===(n=x.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:i.getLastActiveTimestamp()})}function Mt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Tt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Mt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Mt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Lt(e){var t=e.getEvents().filter((function(e){return[kt,Et].includes(e.getType())})).reduce(St,[]),r=vt(),n=e.getEvents()[0].getRoomId(),o=r.getRoom(n);if(!o)throw new bt;for(var a=[],i=[],u=r.getUserId(),s=!1,c=!1,f=t.length-1;f>=0;f--)t[f].sender.userId===u?a.push(t[f]):i.push(t[f]);return a.forEach((function(e){c?e.seen=!0:(e=Ot(e,u,o),c=Boolean(e.seen))})),i.forEach((function(e){s?e.seen=!0:(e.seen=o.hasUserReadEvent(u,e.originalEventId),s=e.seen)})),t}var _t=function(){var e=b.default(h.default.mark((function e(t,r){var n,o,a,i,u,s;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=vt(),a=o.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),i=a.creator,u=o.getAccountData("m.direct").getContent(),s=null!==(n=u[i])&&void 0!==n?n:[],!r){e.next=8;break}return e.next=7,o.setAccountData("m.direct",Tt(Tt({},u),{},w.default({},r,[t])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,o.setAccountData("m.direct",Tt(Tt({},u),{},w.default({},i,[].concat(g.default(s),[t]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function Bt(){return vt().getRooms().map(At)}r.forward({from:P.done.map((function(){return{initialSyncLimit:20}})),to:F}),gt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==kt&&a!==Et||!r&&o.liveEvent&&He(Ut(e))}],["Room",function(e){var t,r,n=vt(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?ke(e):Ee(e))}],["Room.localEchoUpdated",function(){return Ve()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t){if("SYNCING"===e&&"SYNCING"===t){var r=Bt();return Ve(),void E(r)}}else{var n=Bt();R(n)}else{var o=Bt();k(o)}}],["RoomState.members",function(e,t,r){return me(r)}],["RoomState.newMember",function(e,t,r){return me(r)}],["RoomMember.membership",function(e,t){return me(t)}],["RoomMember.name",function(e,t){return me(t)}],["RoomMember.powerLevel",function(e,t){return me(t)}],["RoomMember.typing",function(e,t){return le(t)}],["User.avatarUrl",function(e,t){return pe(t)}],["User.presence",function(e,t){return pe(t)}],["User.displayName",function(e,t){return pe(t)}]]),P.use(function(){var e=b.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a,i,u;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),O.use(b.default(h.default.mark((function e(){var t,r;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=vt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),F.use((function(e){return vt().startClient(e)})),S.use(b.default(h.default.mark((function e(){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().logout();case 2:case"end":return e.stop()}}),e)})))),A.use((function(){return vt().stopClient()})),U.use(b.default(h.default.mark((function e(){var t,r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=vt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Ct(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),C.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,mt(r),o=vt(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,vt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),j.use(b.default(h.default.mark((function e(){var t,r;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=vt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),pt();case 9:case"end":return e.stop()}}),e)})))),M.use(function(){var e=b.default(h.default.mark((function e(t){var r,n;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=vt(),n=r.getUser(t)){e.next=4;break}throw new It;case 4:return e.abrupt("return",Ct(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),L.use((function(){return vt().getPushRules()})),_.use(function(){var e=b.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,vt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),B.use(function(){var e=b.default(h.default.mark((function e(t){var r;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,vt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,vt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),N.use(function(){var e=b.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Nt=W.effect(),Wt=W.effect(),$t=W.effect(),qt=W.effect();function Kt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function zt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Kt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Kt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Vt=r.attach({effect:_e}),Ht=r.attach({effect:_e}),Gt=r.attach({effect:_e}),Jt=f.debounce({source:ve,timeout:500}),Yt=r.attach({effect:Be});function Qt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Xt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Qt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Qt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Y.on(le,(function(e,t){if(t.typing)return e[t.roomId]?zt(zt({},e),{},w.default({},t.roomId,[].concat(g.default(e[t.roomId]),[t]))):zt(zt({},e),{},w.default({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return zt(zt({},e),{},w.default({},t.roomId,g.default(r)))}return delete e[t.roomId],zt({},e)}})).reset(de),z.on(ge,(function(e,t){return t.roomId})).reset(H),V.on(Yt.doneData,(function(e,t){return t})).reset(H),G.on(Nt.doneData,(function(e,t){return t})).reset(z),K.on(Wt.doneData,(function(e,t){return t})).reset(z),J.on($t.doneData,(function(e,t){return t})).reset(z),Q.on(qt.doneData,(function(e,t){return t.kick})).reset(z),Z.on(qt.doneData,(function(e,t){return t.ban})).reset(z),X.on(qt.doneData,(function(e,t){return t.invite})).reset(z),ee.on(qt.doneData,(function(e,t){return t.defaultEvents})).reset(z),te.on(qt.doneData,(function(e,t){return t.redact})).reset(z),re.on(qt.doneData,(function(e,t){return t.stateDefault})).reset(z),r.forward({from:_e.pending,to:q}),r.forward({from:ge,to:Nt}),r.forward({from:Vt.done,to:xe}),r.forward({from:r.sample({source:G,clock:Nt.done,fn:function(){}}),to:we}),r.forward({from:Ht.done,to:be}),r.forward({from:Gt.done,to:he}),r.guard({clock:z,filter:Boolean,target:Yt}),r.guard({source:z,filter:function(e){return Boolean(e)},target:ve}),r.guard({clock:pe,source:K,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:ve}),r.guard({clock:me,source:z,filter:function(e,t){return e===t.roomId},target:ve}),r.guard({source:z,clock:Jt,filter:Boolean,target:Wt}),r.guard({source:r.sample([z,G],ye,(function(e,t){var r=x.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:fe,target:Gt}),r.guard({source:r.sample([z,G],Re,(function(e,t){var r=x.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:fe,target:Ht}),r.guard({source:r.sample([z,G],Ie,(function(e){var t=x.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:fe,target:Vt}),r.guard({clock:z,filter:Boolean,target:[$t,qt]}),$t.use((function(e){var t=vt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new It;var o=r.getMember(n);if(!o)throw new It;return o.powerLevel})),qt.use((function(e){var t,r,n,o,a,i,u=vt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Wt.use((function(e){var t=vt().getRoom(e);if(!t)throw new bt;return Object.values(t.currentState.members).map((function(e){var t=vt().getUser(e.userId);if(!t)throw new It;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ct(t),userId:e.userId}}(e,t)}))})),Fe.use((function(e){var t=vt().getRoom(e);if(!t)throw new bt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Nt.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=vt(),o=vt().getRoom(r)){e.next=5;break}throw new bt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new v.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var t=b.default(h.default.mark((function t(r){var n,o,a,i,u,s,c,f;return h.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){t.next=3;break}throw new yt;case 3:return t.next=5,n.load(o,a);case 5:if(u=n.canPaginate(e.Direction.Forward),s=Lt(n),!(a&&s.length<a)){t.next=19;break}if(f=a-s.length,"BACKWARD"!==i){t.next=15;break}return t.next=12,n.paginate(v.default.EventTimeline.BACKWARDS,f);case 12:c=t.sent,t.next=18;break;case 15:return t.next=17,n.paginate(v.default.EventTimeline.FORWARDS,f);case 17:c=t.sent;case 18:c&&(s=Lt(n));case 19:return t.abrupt("return",{messages:s,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Oe.use((function(e){if(!vt())throw new ht;return e.map((function(e){return jt(e)}))})),De.use(function(){var t=b.default(h.default.mark((function t(r){var n,o,a,i,u,s,c;return h.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?e.SearchOrderBy.Rank:a,u=vt().getRoom(o)){t.next=4;break}throw new bt;case 4:return s={},t.next=7,vt().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return c=t.sent,t.abrupt("return",c.search_categories.room_events.results.map((function(t){var r=t.result,n=new e.MatrixEvent(r),o=n.getSender();return void 0===s[o]&&(s[o]=u.getMember(o)),n.sender=s[o],Ut(n)})));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Ue.use((function(){return vt().getUsers().map(Ct)})),Ae.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a,i,u,s,c,f;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,s={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return zt(zt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,vt().createRoom(s);case 4:return c=e.sent,f=c.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Se.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a,i,u,s,c,f,d;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,a=void 0===o?[]:o,i=vt(),l=void 0,l=vt().getAccountData("m.direct").getContent(),u=l&&Object.values(l).flatMap((function(e){return e})),!(s=u.find((function(e){var t;return null===(t=i.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:s});case 6:return c={is_direct:!0,invite:[r.userId],visibility:exports.Visibility.private,initial_state:a.map((function(e){return zt(zt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:i.getUserId()}},e.next=9,i.createRoom(c);case 9:return f=e.sent,d=f.room_id,e.next=13,_t(d,r.userId);case 13:return e.abrupt("return",{roomId:d});case 14:case"end":return e.stop()}var l}),e)})));return function(t){return e.apply(this,arguments)}}()),Ce.use(function(){var e=b.default(h.default.mark((function e(t){var r,n;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,vt().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,vt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Me.use(function(){var e=b.default(h.default.mark((function e(t){var r,n;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,vt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a,i;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=vt(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,_t(r);case 8:return e.abrupt("return",jt(At(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Be.use((function(e){var t=vt().getRoom(e);return t?jt(At(t)):null})),Le.use(function(){var e=b.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Pe.use((function(e){var t,r=vt(),n=null===(t=r.getAccountData("m.direct"))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new bt;var a=r.getRoom(o);if(!a)throw new bt;return At(a)})),Ne.use(function(){var e=b.default(h.default.mark((function e(t){var r,n;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,vt().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Zt=Ke.effect(),er=r.attach({source:[z,G],effect:Zt,mapParams:function(e,t){var r=x.default(t,2);return Xt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),tr=r.attach({source:[z,G],effect:Zt,mapParams:function(e,t){var r=x.default(t,2);return Xt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),rr=Ke.effect(),nr=r.guard({source:r.sample(z,[_e.done,Zt.done,rr.done],(function(e,t){return Xt({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),or=xt(),ar=r.attach({effect:tr,mapParams:function(e){return{size:e.messages.length}}});ze.on(nr,(function(e,t){return t.messages})).reset(z),$.on(nr,(function(e,t){return t.isLive})).reset(z);var ir=r.combine(fe,tt,et,q,(function(e,t,r,n){return e&&!t&&!r&&!n}));tt.on(er.pending,(function(e,t){return t})).reset(z),et.on(tr.pending,(function(e,t){return t})).reset(z),rt.on(nr,(function(e,t){return t.canPaginateBackward})).reset([ye,z]),nt.on(nr,(function(e,t){return t.canPaginateForward})).reset([ye,z]),r.forward({from:er.done,to:Ye}),r.forward({from:tr.done,to:Qe}),r.guard({source:Ze,filter:ir,target:er}),r.guard({source:Xe,filter:ir,target:tr}),r.forward({from:r.sample(ze,ar.done,(function(e,t){return t.params.messages})),to:Ge}),r.forward({from:or.map((function(e){return{messages:e}})),to:ar}),r.guard({source:r.sample([z,G],d.throttle({source:Ve,timeout:800}),(function(e){var t=x.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:G.map((function(e){return Boolean(e)})),target:rr}),r.sample({clock:d.debounce({source:ot.done,timeout:500}),fn:function(e){var t=e.params,r=e.result;return{roomId:t.roomId,eventId:r.event_id}},target:ut}),ot.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,vt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),at.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,vt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),it.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a,i;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,vt().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ut.use(function(){var e=b.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=vt().getRoom(r)){e.next=4;break}throw new bt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new wt;case 7:return e.next=9,vt().setRoomReadMarkers(r,n,a,{hidden:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ct.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=vt().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;Je({file:t,loaded:r,total:n})}}),s={promise:u};return u.abort&&(s.abort=u.abort),s})),ft.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){vt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),st.use((function(t){var r=t.eventId,n=t.roomId,o=vt();if(!o)throw new ht;var a=o.getRoom(n);if(!a)throw new bt;var i=a.findEventById(r);if(!i)throw new wt;var u=o.getUserId();if(!u)throw new Rt;var s=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),c=function(t){if(t.status===e.EventStatus.CANCELLED||"m.room.message"!==t.getType()||t.isRedacted())return!1;var r=t.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&t.getSender()===vt().getUserId()}(i);return{canRedact:s,canEdit:c}})),rr.use((function(t){var r=t.timelineWindow,n=r.canPaginate(e.Direction.Forward);return{messages:Lt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(e.Direction.Backward)}})),Zt.use(function(){var t=b.default(h.default.mark((function t(r){var n,o,a,i,u,s,c,f;return h.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){t.next=3;break}throw new yt;case 3:return s="forward"===o?v.default.EventTimeline.FORWARDS:v.default.EventTimeline.BACKWARDS,t.next=6,n.paginate(s,a,i,u);case 6:return c=n.canPaginate(e.Direction.Forward),f=Lt(n),t.abrupt("return",{messages:f,isLive:!c,canPaginateForward:c,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canBan=ie,exports.$canInvite=ae,exports.$canKick=oe,exports.$canPaginateBackward=rt,exports.$canPaginateForward=nt,exports.$canRedact=se,exports.$canSendDefaultEvent=ue,exports.$canSetDefaultState=ce,exports.$currentJoinedRoomMembers=ne,exports.$currentRoom=V,exports.$currentRoomId=z,exports.$currentRoomMembers=K,exports.$isLive=$,exports.$loadFilter=fe,exports.$loadRoomFxPending=q,exports.$messages=ze,exports.$myPowerLevel=J,exports.$paginateBackwardPending=tt,exports.$paginateForwardPending=et,exports.$requiredPowerLevelForBan=Z,exports.$requiredPowerLevelForDefaultEvents=ee,exports.$requiredPowerLevelForDefaultState=re,exports.$requiredPowerLevelForInvite=X,exports.$requiredPowerLevelForKick=Q,exports.$requiredPowerLevelForRedact=te,exports.$timelineWindow=G,exports.$typingMembers=Y,exports.DEFAULT_BAN_POWERLEVEL=50,exports.DEFAULT_INVITE_POWERLEVEL=50,exports.DEFAULT_KICK_POWERLEVEL=50,exports.DEFAULT_REDACT_POWERLEVEL=50,exports.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,exports.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,exports.checkEventPermissionsFx=st,exports.clearCurrentRoomState=H,exports.clearTypingMember=de,exports.client=vt,exports.createClient=mt,exports.createClientFx=C,exports.createDirectRoomFx=Se,exports.createOnSyncThrottled=function(e){return t.throttle({source:E,timeout:e})},exports.createRoomFx=Ae,exports.createRoomMessageBatch=xt,exports.deleteMessageFx=it,exports.deleteNotificationRuleFx=N,exports.destroyClient=pt,exports.destroyClientFx=j,exports.directRoomCreated=ke,exports.editMessageFx=at,exports.findDirectRoomByUserIdFx=Pe,exports.getAllUsersFx=Ue,exports.getLoggedUserFx=U,exports.getNotificationRulesFx=L,exports.getProfileInfoFx=M,exports.getRoomByIdFx=Be,exports.getRoomInfoFx=Fe,exports.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,s=vt().getRoom(t);if(!s)return null;var c=s.getMember(r);return c?c.getAvatarUrl(vt().getHomeserverUrl(),n,o,a,u,!0):null},exports.getRoomMembers=ve,exports.getRoomsWithActivitiesFx=Oe,exports.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,s=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(vt().getHomeserverUrl(),r,n,o,i,s):null},exports.getUploadCredentials=function(){return{endpointUrl:"".concat(vt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(vt().getAccessToken())}}},exports.getUrlPreviewFx=ft,exports.initRoom=ge,exports.initStoreFx=O,exports.inviteUserFx=Ce,exports.joinRoomFx=Te,exports.kickUserRoomFx=je,exports.leaveRoomFx=Le,exports.liveTimelineLoaded=xe,exports.loadRoom=ye,exports.loadRoomFx=_e,exports.loadRoomMessage=Re,exports.loadRoomMessageDone=be,exports.loginByPasswordFx=P,exports.loginByTokenFx=D,exports.logoutFx=S,exports.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return vt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},exports.newMessagesLoaded=Ge,exports.onCachedState=k,exports.onClientEvent=gt,exports.onInitialSync=R,exports.onPaginateBackwardDone=Ye,exports.onPaginateForwardDone=Qe,exports.onRoomInitialized=we,exports.onRoomLoaded=he,exports.onRoomMemberUpdate=me,exports.onRoomUserUpdate=pe,exports.onSync=E,exports.onUploadProgress=Je,exports.paginateBackward=Ze,exports.paginateForward=Xe,exports.readAllMessagesFx=ut,exports.renameRoomFx=Me,exports.roomCreated=Ee,exports.roomMessage=He,exports.searchRoomMessagesFx=De,exports.sendMessageFx=ot,exports.sendTypingFx=Ne,exports.setNotificationRuleActionFx=_,exports.setNotificationRuleEnabledFx=B,exports.startClientFx=F,exports.stopClientFx=A,exports.toLiveTimeline=Ie,exports.toggleTypingUser=le,exports.updateMessages=Ve,exports.uploadContentFx=ct;
//# sourceMappingURL=matrix-effector.cjs.js.map
