"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("patronum/throttle"),r=require("effector"),n=require("@babel/runtime/helpers/toConsumableArray"),o=require("@babel/runtime/helpers/slicedToArray"),a=require("@42px/effector-extra"),i=require("@babel/runtime/helpers/defineProperty"),u=require("@babel/runtime/helpers/asyncToGenerator"),s=require("@babel/runtime/regenerator"),c=require("@42px/custom-errors"),f=require("patronum/debounce");function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d,p,m=l(e),v=l(n),g=l(o),x=l(i),w=l(u),b=l(s),h=r.createDomain("root"),y=h.domain("app"),R=y.event(),k=y.event(),P=y.event(),O=y.effect(),E=y.effect(),I=y.effect(),D=y.effect(),j=y.effect(),F=y.effect(),A=y.effect(),S=y.effect(),U=y.effect(),C=h.domain("notification"),M=C.effect(),L=C.effect(),_=C.effect(),T=C.effect(),B=h.domain("room"),N=B.store(null),W=B.store(!1),$=B.store(null),q=B.store(null),K=B.store(null),z=B.event(),V=B.store(null),H=B.store(0),G=B.store(50),J=B.store(50),Y=B.store(50),Q=B.store(0),X=B.store(50),Z=B.store(50),ee=$.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),te=r.combine(H,G,(function(e,t){return e>=t})),re=r.combine(H,J,(function(e,t){return e>=t})),ne=r.combine(H,Y,(function(e,t){return e>=t})),oe=r.combine(H,Q,(function(e,t){return e>=t})),ae=r.combine(H,X,(function(e,t){return e>=t})),ie=r.combine(H,Z,(function(e,t){return e>=t})),ue=B.event(),se=B.event(),ce=B.event(),fe=B.event(),le=B.event(),de=B.event(),pe=B.event(),me=B.event(),ve=B.event(),ge=B.event(),xe=B.event(),we=B.event(),be=B.event(),he=B.effect(),ye=B.effect(),Re=B.effect(),ke=B.effect(),Pe=B.effect(),Oe=B.effect(),Ee=B.effect(),Ie=B.effect(),De=B.effect(),je=B.effect(),Fe=B.effect();exports.Visibility=void 0,(d=exports.Visibility||(exports.Visibility={})).public="public",d.private="private",exports.Preset=void 0,(p=exports.Preset||(exports.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var Ae,Se,Ue,Ce=h.domain("messages"),Me=Ce.store([]),Le=Ce.event(),_e=Ce.event(),Te=Ce.event(),Be=Ce.event(),Ne=Ce.effect(),We=Ce.effect(),$e=Ce.effect(),qe=Ce.effect(),Ke=Ce.effect(),ze=Ce.effect(),Ve=Ce.effect(),He=h.domain("pagination"),Ge=He.store(!1),Je=He.store(!1),Ye=He.store(!0),Qe=He.store(!0),Xe=He.event(),Ze=He.event(),et=He.event(),tt=He.event();exports.MsgType=void 0,(Ae=exports.MsgType||(exports.MsgType={})).Audio="m.audio",Ae.BadEncrypted="m.bad.encrypted",Ae.Emote="m.emote",Ae.File="m.file",Ae.Image="m.image",Ae.Notice="m.notice",Ae.Text="m.text",Ae.Video="m.video",Ae.Location="m.location",exports.MatrixMembershipType=void 0,(Se=exports.MatrixMembershipType||(exports.MatrixMembershipType={})).leave="leave",Se.invite="invite",Se.ban="ban",Se.join="join",Se.knock="knock";var rt=500,nt=[],ot=function(e){var t=e.options,r=e.messageBatchInterval;st(),void 0!==r&&(rt=r),Ue=m.default.createClient(t),nt.forEach((function(e){var t=g.default(e,2),r=t[0],n=t[1];Ue.on(r,n)}))},at=function(){return Ue},it=function(e){nt.push.apply(nt,v.default(e))},ut=function(){return a.batchEvents(_e,rt)},st=function(){Ue&&(Ue.removeAllListeners(),Ue=null)},ct="m.room.message",ft="m.room.redaction",lt=c.createCustomError("EventNotFound"),dt=c.createCustomError("RoomNotFound"),pt=c.createCustomError("ClientNotInitialized"),mt=c.createCustomError("TimelineWindowUndefined"),vt=c.createCustomError("UserNotFound"),gt=c.createCustomError("UserNotLoggedIn");function xt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function wt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?xt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):xt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var bt=function(e){return e.getContent()},ht=function(){var e=at().getAccountData("m.direct").getContent();return e&&Object.values(e).flatMap((function(e){return e}))},yt=function(e){return ht().includes(e)};function Rt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:bt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function kt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Pt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Rt(t)),e}var Ot=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Et(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,n=at(),o=n.getRoom(e.roomId);if(!o)throw new dt;for(var a=o.getLiveTimeline().getEvents(),i=0,u=a.length-1;u>=0&&u!==a.length-r;u--){var s=a[u],c=o.hasUserReadEvent(n.getUserId(),s.getId());if(c)break;i+=1}var f=a.filter((function(e){return[ct,ft].includes(e.getType())})).reduce(Pt,[]),l=f.length?f[f.length-1]:void 0,d=yt(e.roomId),p=d?o.getMember(o.guessDMUserId()):null;return wt(wt({},e),{},{unreadCount:i,lastMessage:l,isDirect:d,directUserId:null==p?void 0:p.userId,isOnline:p?Boolean(null===(t=p.user)||void 0===t?void 0:t.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()})}function It(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Dt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?It(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):It(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function jt(e){return e.getEvents().filter((function(e){return[ct,ft].includes(e.getType())})).reduce(Pt,[])}var Ft=function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=at(),o=n.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),a=o.creator,i=n.getAccountData("m.direct").getContent(),u=null!==(r=i[a])&&void 0!==r?r:[],e.next=6,n.setAccountData("m.direct",Dt(Dt({},i),{},x.default({},a,[].concat(v.default(u),[t]))));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function At(){return at().getRooms().map(kt)}r.forward({from:O.done.map((function(){return{initialSyncLimit:20}})),to:D}),it([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==ct&&a!==ft||!r&&o.liveEvent&&_e(Rt(e))}],["Room",function(e){var t,r,n=at(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?we(e):be(e))}],["Room.localEchoUpdated",function(){return Le()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=At();P(r)}else{var n=At();R(n)}else{var o=At();k(o)}}],["RoomState.members",function(e,t,r){return se(r)}],["RoomState.newMember",function(e,t,r){return se(r)}],["RoomMember.membership",function(e,t){return se(t)}],["RoomMember.name",function(e,t){return se(t)}],["RoomMember.powerLevel",function(e,t){return se(t)}],["RoomMember.typing",function(e,t){return se(t)}],["User.avatarUrl",function(e,t){return ue(t)}],["User.presence",function(e,t){return ue(t)}],["User.displayName",function(e,t){return ue(t)}]]),O.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,at().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),E.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I.use(w.default(b.default.mark((function e(){var t,r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=at(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),D.use((function(e){return at().startClient(e)})),A.use(w.default(b.default.mark((function e(){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,at().logout();case 2:case"end":return e.stop()}}),e)})))),F.use((function(){return at().stopClient()})),j.use(w.default(b.default.mark((function e(){var t,r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=at()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Ot(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),S.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,ot(r),o=at(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,at().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),U.use(w.default(b.default.mark((function e(){var t,r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=at()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),st();case 9:case"end":return e.stop()}}),e)})))),M.use((function(){return at().getPushRules()})),L.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,at().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),_.use(function(){var e=w.default(b.default.mark((function e(t){var r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,at().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,at().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),T.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,at().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var St=r.combine(q,V,(function(e,t){return Boolean(e)&&Boolean(t)})),Ut=B.effect(),Ct=B.effect(),Mt=B.effect(),Lt=B.effect(),_t=B.effect(),Tt=B.effect();function Bt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Nt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Bt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Bt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Wt=r.attach({effect:Mt}),$t=r.attach({effect:Mt}),qt=r.attach({effect:Mt}),Kt=f.debounce({source:ce,timeout:500});function zt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Vt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?zt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):zt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}q.on(fe,(function(e,t){return t.roomId})).reset(z),K.on(Ut.doneData,(function(e,t){return t})).reset(z),V.on(Ct.doneData,(function(e,t){return t})).reset(q),$.on(Lt.doneData,(function(e,t){return t})).reset(q),H.on(_t.doneData,(function(e,t){return t})).reset(q),G.on(Tt.doneData,(function(e,t){return t.kick})).reset(q),Y.on(Tt.doneData,(function(e,t){return t.ban})).reset(q),J.on(Tt.doneData,(function(e,t){return t.invite})).reset(q),Q.on(Tt.doneData,(function(e,t){return t.defaultEvents})).reset(q),X.on(Tt.doneData,(function(e,t){return t.redact})).reset(q),Z.on(Tt.doneData,(function(e,t){return t.stateDefault})).reset(q),r.forward({from:Mt.pending,to:W}),r.forward({from:fe,to:Ct}),r.forward({from:Wt.done,to:le}),r.forward({from:r.sample({source:V,clock:Ct.done,fn:function(){}}),to:de}),r.forward({from:$t.done,to:pe}),r.forward({from:qt.done,to:me}),r.guard({clock:q,filter:Boolean,target:Ut}),r.guard({source:q,filter:function(e){return Boolean(e)},target:ce}),r.guard({clock:ue,source:$,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:ce}),r.guard({clock:se,source:q,filter:function(e,t){return e===t.roomId},target:ce}),r.guard({source:q,clock:Kt,filter:Boolean,target:Lt}),r.guard({source:r.sample([q,V],ve,(function(e,t){var r=g.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:St,target:qt}),r.guard({source:r.sample([q,V],xe,(function(e,t){var r=g.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:St,target:$t}),r.guard({source:r.sample([q,V],ge,(function(e){var t=g.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:St,target:Wt}),r.guard({clock:q,filter:Boolean,target:[_t,Tt]}),_t.use((function(e){var t=at(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new vt;var o=r.getMember(n);if(!o)throw new vt;return o.powerLevel})),Tt.use((function(e){var t,r,n,o,a,i,u=at().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Lt.use((function(e){var t=at().getRoom(e);if(!t)throw new dt;return Object.values(t.currentState.members).map((function(e){var t=at().getUser(e.userId);if(!t)throw new vt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ot(t),userId:e.userId}}(e,t)}))})),Re.use((function(e){var t=at().getRoom(e);if(!t)throw new dt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Ct.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=at(),o=at().getRoom(r)){e.next=5;break}throw new dt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new m.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Mt.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c,f;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){t.next=3;break}throw new mt;case 3:return t.next=5,n.load(o,a);case 5:if(u=n.canPaginate(e.Direction.Forward),s=jt(n),!(a&&s.length<a)){t.next=19;break}if(f=a-s.length,"BACKWARD"!==i){t.next=15;break}return t.next=12,n.paginate(m.default.EventTimeline.BACKWARDS,f);case 12:c=t.sent,t.next=18;break;case 15:return t.next=17,n.paginate(m.default.EventTimeline.FORWARDS,f);case 17:c=t.sent;case 18:c&&(s=jt(n));case 19:return t.abrupt("return",{messages:s,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),ye.use((function(e){if(!at())throw new pt;return e.map((function(e){return Et(e)}))})),he.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?e.SearchOrderBy.Rank:a,u=at().getRoom(o)){t.next=4;break}throw new dt;case 4:return s={},t.next=7,at().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return c=t.sent,t.abrupt("return",c.search_categories.room_events.results.map((function(t){var r=t.result,n=new e.MatrixEvent(r),o=n.getSender();return void 0===s[o]&&(s[o]=u.getMember(o)),n.sender=s[o],Rt(n)})));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),ke.use((function(){return at().getUsers().map(Ot)})),Pe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s,c,f;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,s={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Nt(Nt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,at().createRoom(s);case 4:return c=e.sent,f=c.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Oe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s,c,f,l;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,a=void 0===o?[]:o,i=at(),u=ht(),!(s=u.find((function(e){var t;return null===(t=i.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:s});case 6:return c={is_direct:!0,invite:[r.userId],visibility:exports.Visibility.private,initial_state:a.map((function(e){return Nt(Nt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:i.getUserId()}},e.next=9,i.createRoom(c);case 9:return f=e.sent,l=f.room_id,e.next=13,Ft(l);case 13:return e.abrupt("return",{roomId:l});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ee.use(function(){var e=w.default(b.default.mark((function e(t){var r,n;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,at().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ie.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,at().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),De.use(function(){var e=w.default(b.default.mark((function e(t){var r,n;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,at().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=at(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Ft(r);case 8:return e.abrupt("return",Et(kt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ut.use((function(e){var t=at().getRoom(e);return t?Et(kt(t)):null})),Fe.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,at().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Ht=He.effect(),Gt=r.attach({source:[q,V],effect:Ht,mapParams:function(e,t){var r=g.default(t,2);return Vt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Jt=r.attach({source:[q,V],effect:Ht,mapParams:function(e,t){var r=g.default(t,2);return Vt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}});function Yt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var Qt=Ce.effect(),Xt=r.guard({source:r.sample(q,[Mt.done,Ht.done,Qt.done],(function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Yt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Yt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),Zt=ut(),er=r.attach({effect:Jt,mapParams:function(e){return{size:e.messages.length}}});Me.on(Xt,(function(e,t){return t.messages})).reset(q),N.on(Xt,(function(e,t){return t.isLive})).reset(q),r.forward({from:r.sample(Me,er.done,(function(e,t){return t.params.messages})),to:Te}),r.forward({from:Zt.map((function(e){return{messages:e}})),to:er}),r.guard({source:r.sample([q,V],Le,(function(e){var t=g.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:V.map((function(e){return Boolean(e)})),target:Qt}),Ne.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,at().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),We.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,at().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$e.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,at().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),qe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=at().getRoom(r)){e.next=4;break}throw new dt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new lt;case 7:return e.next=9,at().setRoomReadMarkers(r,n,a,{hidden:void 0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ze.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=at().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;Be({file:t,loaded:r,total:n})}}),s={promise:u};return u.abort&&(s.abort=u.abort),s})),Ve.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){at().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),Ke.use((function(t){var r=t.eventId,n=t.roomId,o=at();if(!o)throw new pt;var a=o.getRoom(n);if(!a)throw new dt;var i=a.findEventById(r);if(!i)throw new lt;var u=o.getUserId();if(!u)throw new gt;var s=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),c=function(t){if(t.status===e.EventStatus.CANCELLED||"m.room.message"!==t.getType()||t.isRedacted())return!1;var r=t.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&t.getSender()===at().getUserId()}(i);return{canRedact:s,canEdit:c}})),Qt.use((function(t){var r=t.timelineWindow,n=r.canPaginate(e.Direction.Forward);return{messages:jt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(e.Direction.Backward)}}));var tr=r.combine(St,Je,Ge,W,(function(e,t,r,n){return e&&!t&&!r&&!n}));Je.on(Gt.pending,(function(e,t){return t})).reset(q),Ge.on(Jt.pending,(function(e,t){return t})).reset(q),Ye.on(Xt,(function(e,t){return t.canPaginateBackward})).reset([ve,q]),Qe.on(Xt,(function(e,t){return t.canPaginateForward})).reset([ve,q]),r.forward({from:Gt.done,to:Xe}),r.forward({from:Jt.done,to:Ze}),r.guard({source:tt,filter:tr,target:Gt}),r.guard({source:et,filter:tr,target:Jt}),Ht.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c,f;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){t.next=3;break}throw new mt;case 3:return s="forward"===o?m.default.EventTimeline.FORWARDS:m.default.EventTimeline.BACKWARDS,t.next=6,n.paginate(s,a,i,u);case 6:return c=n.canPaginate(e.Direction.Forward),f=jt(n),t.abrupt("return",{messages:f,isLive:!c,canPaginateForward:c,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canBan=ne,exports.$canInvite=re,exports.$canKick=te,exports.$canPaginateBackward=Ye,exports.$canPaginateForward=Qe,exports.$canRedact=ae,exports.$canSendDefaultEvent=oe,exports.$canSetDefaultState=ie,exports.$currentJoinedRoomMembers=ee,exports.$currentRoom=K,exports.$currentRoomId=q,exports.$currentRoomMembers=$,exports.$isLive=N,exports.$loadRoomFxPending=W,exports.$messages=Me,exports.$myPowerLevel=H,exports.$paginateBackwardPending=Je,exports.$paginateForwardPending=Ge,exports.$requiredPowerLevelForBan=Y,exports.$requiredPowerLevelForDefaultEvents=Q,exports.$requiredPowerLevelForDefaultState=Z,exports.$requiredPowerLevelForInvite=J,exports.$requiredPowerLevelForKick=G,exports.$requiredPowerLevelForRedact=X,exports.$timelineWindow=V,exports.DEFAULT_BAN_POWERLEVEL=50,exports.DEFAULT_INVITE_POWERLEVEL=50,exports.DEFAULT_KICK_POWERLEVEL=50,exports.DEFAULT_REDACT_POWERLEVEL=50,exports.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,exports.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,exports.checkEventPermissionsFx=Ke,exports.clearCurrentRoomState=z,exports.client=at,exports.createClient=ot,exports.createClientFx=S,exports.createDirectRoomFx=Oe,exports.createOnSyncThrottled=function(e){return t.throttle({source:P,timeout:e})},exports.createRoomFx=Pe,exports.createRoomMessageBatch=ut,exports.deleteMessageFx=$e,exports.deleteNotificationRuleFx=T,exports.destroyClient=st,exports.destroyClientFx=U,exports.directRoomCreated=we,exports.editMessageFx=We,exports.getAllUsersFx=ke,exports.getLoggedUserFx=j,exports.getNotificationRulesFx=M,exports.getRoomInfoFx=Re,exports.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,s=at().getRoom(t);if(!s)return null;var c=s.getMember(r);return c?c.getAvatarUrl(at().getHomeserverUrl(),n,o,a,u,!0):null},exports.getRoomMembers=ce,exports.getRoomsWithActivitiesFx=ye,exports.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,s=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(at().getHomeserverUrl(),r,n,o,i,s):null},exports.getUploadCredentials=function(){return{endpointUrl:"".concat(at().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(at().getAccessToken())}}},exports.getUrlPreviewFx=Ve,exports.initRoom=fe,exports.initStoreFx=I,exports.inviteUserFx=Ee,exports.joinRoomFx=je,exports.kickUserRoomFx=Ie,exports.leaveRoomFx=Fe,exports.liveTimelineLoaded=le,exports.loadRoom=ve,exports.loadRoomMessage=xe,exports.loadRoomMessageDone=pe,exports.loginByPasswordFx=O,exports.loginByTokenFx=E,exports.logoutFx=A,exports.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return at().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},exports.newMessagesLoaded=Te,exports.onCachedState=k,exports.onClientEvent=it,exports.onInitialSync=R,exports.onPaginateBackwardDone=Xe,exports.onPaginateForwardDone=Ze,exports.onRoomInitialized=de,exports.onRoomLoaded=me,exports.onRoomMemberUpdate=se,exports.onRoomUserUpdate=ue,exports.onSync=P,exports.onUploadProgress=Be,exports.paginateBackward=tt,exports.paginateForward=et,exports.readAllMessagesFx=qe,exports.renameRoomFx=De,exports.roomCreated=be,exports.roomMessage=_e,exports.searchRoomMessagesFx=he,exports.sendMessageFx=Ne,exports.setNotificationRuleActionFx=L,exports.setNotificationRuleEnabledFx=_,exports.startClientFx=D,exports.stopClientFx=F,exports.toLiveTimeline=ge,exports.updateMessages=Le,exports.uploadContentFx=ze;
//# sourceMappingURL=matrix-effector.cjs.js.map
