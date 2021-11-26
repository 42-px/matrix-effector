"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("patronum/throttle"),r=require("effector"),n=require("@babel/runtime/helpers/toConsumableArray"),o=require("@babel/runtime/helpers/slicedToArray"),a=require("@42px/effector-extra"),i=require("@babel/runtime/helpers/defineProperty"),u=require("@babel/runtime/helpers/asyncToGenerator"),s=require("@babel/runtime/regenerator"),c=require("@42px/custom-errors"),f=require("patronum/debounce");function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d,p,m=l(e),v=l(n),x=l(o),g=l(i),w=l(u),b=l(s),h=r.createDomain("root"),y=h.domain("app"),R=y.event(),k=y.event(),P=y.event(),E=y.effect(),I=y.effect(),D=y.effect(),O=y.effect(),F=y.effect(),A=y.effect(),U=y.effect(),j=y.effect(),S=y.effect(),C=h.domain("notification"),M=C.effect(),L=C.effect(),_=C.effect(),T=C.effect(),B=h.domain("room"),N=B.store(null),W=B.store(!1),$=B.store(null),q=B.store(null),K=B.store(null),z=B.event(),V=B.store(null),H=B.store(0),G=B.store(50),J=B.store(50),Y=B.store(50),Q=B.store(0),X=B.store(50),Z=B.store(50),ee=$.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),te=r.combine(H,G,(function(e,t){return e>=t})),re=r.combine(H,J,(function(e,t){return e>=t})),ne=r.combine(H,Y,(function(e,t){return e>=t})),oe=r.combine(H,Q,(function(e,t){return e>=t})),ae=r.combine(H,X,(function(e,t){return e>=t})),ie=r.combine(H,Z,(function(e,t){return e>=t})),ue=r.combine(q,V,(function(e,t){return Boolean(e)&&Boolean(t)})),se=B.event(),ce=B.event(),fe=B.event(),le=B.event(),de=B.event(),pe=B.event(),me=B.event(),ve=B.event(),xe=B.event(),ge=B.event(),we=B.event(),be=B.event(),he=B.event(),ye=B.effect(),Re=B.effect(),ke=B.effect(),Pe=B.effect(),Ee=B.effect(),Ie=B.effect(),De=B.effect(),Oe=B.effect(),Fe=B.effect(),Ae=B.effect(),Ue=B.effect(),je=B.effect();exports.Visibility=void 0,(d=exports.Visibility||(exports.Visibility={})).public="public",d.private="private",exports.Preset=void 0,(p=exports.Preset||(exports.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var Se,Ce,Me,Le=h.domain("messages"),_e=Le.store([]),Te=Le.event(),Be=Le.event(),Ne=Le.event(),We=Le.event(),$e=Le.event(),qe=Le.event(),Ke=Le.event(),ze=Le.event(),Ve=Le.store(!1),He=Le.store(!1),Ge=Le.store(!0),Je=Le.store(!0),Ye=Le.effect(),Qe=Le.effect(),Xe=Le.effect(),Ze=Le.effect(),et=Le.effect(),tt=Le.effect(),rt=Le.effect();exports.MsgType=void 0,(Se=exports.MsgType||(exports.MsgType={})).Audio="m.audio",Se.BadEncrypted="m.bad.encrypted",Se.Emote="m.emote",Se.File="m.file",Se.Image="m.image",Se.Notice="m.notice",Se.Text="m.text",Se.Video="m.video",Se.Location="m.location",exports.MatrixMembershipType=void 0,(Ce=exports.MatrixMembershipType||(exports.MatrixMembershipType={})).leave="leave",Ce.invite="invite",Ce.ban="ban",Ce.join="join",Ce.knock="knock";var nt=500,ot=[],at=function(e){var t=e.options,r=e.messageBatchInterval;ct(),void 0!==r&&(nt=r),Me=m.default.createClient(t),ot.forEach((function(e){var t=x.default(e,2),r=t[0],n=t[1];Me.on(r,n)}))},it=function(){return Me},ut=function(e){ot.push.apply(ot,v.default(e))},st=function(){return a.batchEvents(Be,nt)},ct=function(){Me&&(Me.removeAllListeners(),Me=null)},ft="m.room.message",lt="m.room.redaction",dt=c.createCustomError("EventNotFound"),pt=c.createCustomError("RoomNotFound"),mt=c.createCustomError("ClientNotInitialized"),vt=c.createCustomError("TimelineWindowUndefined"),xt=c.createCustomError("UserNotFound"),gt=c.createCustomError("UserNotLoggedIn");function wt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function bt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?wt(Object(r),!0).forEach((function(t){g.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):wt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ht=function(e){return e.getContent()},yt=function(){var e=it().getAccountData("m.direct").getContent();return e&&Object.values(e).flatMap((function(e){return e}))},Rt=function(e){return yt().includes(e)};function kt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:ht(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Pt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Et(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(kt(t)),e}var It=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Dt(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,n=it(),o=n.getRoom(e.roomId);if(!o)throw new pt;for(var a=o.getLiveTimeline().getEvents(),i=0,u=a.length-1;u>=0&&u!==a.length-r;u--){var s=a[u],c=o.hasUserReadEvent(n.getUserId(),s.getId());if(c)break;i+=1}var f=a.filter((function(e){return[ft,lt].includes(e.getType())})).reduce(Et,[]),l=f.length?f[f.length-1]:void 0,d=Rt(e.roomId),p=d?o.getMember(o.guessDMUserId()):null;return bt(bt({},e),{},{unreadCount:i,lastMessage:l,isDirect:d,directUserId:null==p?void 0:p.userId,isOnline:p?Boolean(null===(t=p.user)||void 0===t?void 0:t.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()})}function Ot(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ft(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ot(Object(r),!0).forEach((function(t){g.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ot(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function At(e){return e.getEvents().filter((function(e){return[ft,lt].includes(e.getType())})).reduce(Et,[])}var Ut=function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=it(),o=n.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),a=o.creator,i=n.getAccountData("m.direct").getContent(),u=null!==(r=i[a])&&void 0!==r?r:[],e.next=6,n.setAccountData("m.direct",Ft(Ft({},i),{},g.default({},a,[].concat(v.default(u),[t]))));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function jt(){return it().getRooms().map(Pt)}r.forward({from:E.done.map((function(){return{initialSyncLimit:20}})),to:O}),ut([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==ft&&a!==lt||!r&&o.liveEvent&&Be(kt(e))}],["Room",function(e){var t,r,n=it(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?be(e):he(e))}],["Room.localEchoUpdated",function(){return Te()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=jt();P(r)}else{var n=jt();R(n)}else{var o=jt();k(o)}}],["RoomState.members",function(e,t,r){return ce(r)}],["RoomState.newMember",function(e,t,r){return ce(r)}],["RoomMember.membership",function(e,t){return ce(t)}],["RoomMember.name",function(e,t){return ce(t)}],["RoomMember.powerLevel",function(e,t){return ce(t)}],["RoomMember.typing",function(e,t){return ce(t)}],["User.avatarUrl",function(e,t){return se(t)}],["User.presence",function(e,t){return se(t)}],["User.displayName",function(e,t){return se(t)}]]),E.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,it().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D.use(w.default(b.default.mark((function e(){var t,r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=it(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),O.use((function(e){return it().startClient(e)})),U.use(w.default(b.default.mark((function e(){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,it().logout();case 2:case"end":return e.stop()}}),e)})))),A.use((function(){return it().stopClient()})),F.use(w.default(b.default.mark((function e(){var t,r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=it()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=It(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),j.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,at(r),o=it(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,it().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S.use(w.default(b.default.mark((function e(){var t,r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=it()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),ct();case 9:case"end":return e.stop()}}),e)})))),M.use((function(){return it().getPushRules()})),L.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,it().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),_.use(function(){var e=w.default(b.default.mark((function e(t){var r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,it().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,it().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),T.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,it().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var St=B.effect(),Ct=B.effect(),Mt=B.effect(),Lt=B.effect(),_t=B.effect();function Tt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Bt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Tt(Object(r),!0).forEach((function(t){g.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Tt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Nt=r.attach({effect:je}),Wt=r.attach({effect:je}),$t=r.attach({effect:je}),qt=f.debounce({source:fe,timeout:500});function Kt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function zt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Kt(Object(r),!0).forEach((function(t){g.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Kt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}q.on(le,(function(e,t){return t.roomId})).reset(z),K.on(St.doneData,(function(e,t){return t})).reset(z),V.on(Ct.doneData,(function(e,t){return t})).reset(q),$.on(Mt.doneData,(function(e,t){return t})).reset(q),H.on(Lt.doneData,(function(e,t){return t})).reset(q),G.on(_t.doneData,(function(e,t){return t.kick})).reset(q),Y.on(_t.doneData,(function(e,t){return t.ban})).reset(q),J.on(_t.doneData,(function(e,t){return t.invite})).reset(q),Q.on(_t.doneData,(function(e,t){return t.defaultEvents})).reset(q),X.on(_t.doneData,(function(e,t){return t.redact})).reset(q),Z.on(_t.doneData,(function(e,t){return t.stateDefault})).reset(q),r.forward({from:je.pending,to:W}),r.forward({from:le,to:Ct}),r.forward({from:Nt.done,to:de}),r.forward({from:r.sample({source:V,clock:Ct.done,fn:function(){}}),to:pe}),r.forward({from:Wt.done,to:me}),r.forward({from:$t.done,to:ve}),r.guard({clock:q,filter:Boolean,target:St}),r.guard({source:q,filter:function(e){return Boolean(e)},target:fe}),r.guard({clock:se,source:$,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:fe}),r.guard({clock:ce,source:q,filter:function(e,t){return e===t.roomId},target:fe}),r.guard({source:q,clock:qt,filter:Boolean,target:Mt}),r.guard({source:r.sample([q,V],xe,(function(e,t){var r=x.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:ue,target:$t}),r.guard({source:r.sample([q,V],we,(function(e,t){var r=x.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:ue,target:Wt}),r.guard({source:r.sample([q,V],ge,(function(e){var t=x.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:ue,target:Nt}),r.guard({clock:q,filter:Boolean,target:[Lt,_t]}),Lt.use((function(e){var t=it(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new xt;var o=r.getMember(n);if(!o)throw new xt;return o.powerLevel})),_t.use((function(e){var t,r,n,o,a,i,u=it().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Mt.use((function(e){var t=it().getRoom(e);if(!t)throw new pt;return Object.values(t.currentState.members).map((function(e){var t=it().getUser(e.userId);if(!t)throw new xt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:It(t),userId:e.userId}}(e,t)}))})),ke.use((function(e){var t=it().getRoom(e);if(!t)throw new pt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Ct.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=it(),o=it().getRoom(r)){e.next=5;break}throw new pt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new m.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c,f;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){t.next=3;break}throw new vt;case 3:return t.next=5,n.load(o,a);case 5:if(u=n.canPaginate(e.Direction.Forward),s=At(n),!(a&&s.length<a)){t.next=19;break}if(f=a-s.length,"BACKWARD"!==i){t.next=15;break}return t.next=12,n.paginate(m.default.EventTimeline.BACKWARDS,f);case 12:c=t.sent,t.next=18;break;case 15:return t.next=17,n.paginate(m.default.EventTimeline.FORWARDS,f);case 17:c=t.sent;case 18:c&&(s=At(n));case 19:return t.abrupt("return",{messages:s,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Re.use((function(e){if(!it())throw new mt;return e.map((function(e){return Dt(e)}))})),ye.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?e.SearchOrderBy.Rank:a,u=it().getRoom(o)){t.next=4;break}throw new pt;case 4:return s={},t.next=7,it().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return c=t.sent,t.abrupt("return",c.search_categories.room_events.results.map((function(t){var r=t.result,n=new e.MatrixEvent(r),o=n.getSender();return void 0===s[o]&&(s[o]=u.getMember(o)),n.sender=s[o],kt(n)})));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Pe.use((function(){return it().getUsers().map(It)})),Ee.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s,c,f;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,s={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Bt(Bt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,it().createRoom(s);case 4:return c=e.sent,f=c.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ie.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s,c,f,l;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,a=void 0===o?[]:o,i=it(),u=yt(),!(s=u.find((function(e){var t;return null===(t=i.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:s});case 6:return c={is_direct:!0,invite:[r.userId],visibility:exports.Visibility.private,initial_state:a.map((function(e){return Bt(Bt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:i.getUserId()}},e.next=9,i.createRoom(c);case 9:return f=e.sent,l=f.room_id,e.next=13,Ut(l);case 13:return e.abrupt("return",{roomId:l});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),De.use(function(){var e=w.default(b.default.mark((function e(t){var r,n;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,it().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Oe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,it().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Fe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,it().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ae.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=it(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Ut(r);case 8:return e.abrupt("return",Dt(Pt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),St.use((function(e){var t=it().getRoom(e);return t?Dt(Pt(t)):null})),Ue.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,it().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Vt=Le.effect(),Ht=r.attach({source:[q,V],effect:Vt,mapParams:function(e,t){var r=x.default(t,2);return zt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Gt=r.attach({source:[q,V],effect:Vt,mapParams:function(e,t){var r=x.default(t,2);return zt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),Jt=Le.effect(),Yt=r.guard({source:r.sample(q,[je.done,Vt.done,Jt.done],(function(e,t){return zt({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),Qt=st(),Xt=r.attach({effect:Gt,mapParams:function(e){return{size:e.messages.length}}});_e.on(Yt,(function(e,t){return t.messages})).reset(q),N.on(Yt,(function(e,t){return t.isLive})).reset(q);var Zt=r.combine(ue,He,Ve,W,(function(e,t,r,n){return e&&!t&&!r&&!n}));He.on(Ht.pending,(function(e,t){return t})).reset(q),Ve.on(Gt.pending,(function(e,t){return t})).reset(q),Ge.on(Yt,(function(e,t){return t.canPaginateBackward})).reset([xe,q]),Je.on(Yt,(function(e,t){return t.canPaginateForward})).reset([xe,q]),r.forward({from:Ht.done,to:$e}),r.forward({from:Gt.done,to:qe}),r.guard({source:ze,filter:Zt,target:Ht}),r.guard({source:Ke,filter:Zt,target:Gt}),r.forward({from:r.sample(_e,Xt.done,(function(e,t){return t.params.messages})),to:Ne}),r.forward({from:Qt.map((function(e){return{messages:e}})),to:Xt}),r.guard({source:r.sample([q,V],Te,(function(e){var t=x.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:V.map((function(e){return Boolean(e)})),target:Jt}),Ye.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,it().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Qe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,it().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Xe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,it().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ze.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=it().getRoom(r)){e.next=4;break}throw new pt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new dt;case 7:return e.next=9,it().setRoomReadMarkers(r,n,a,{hidden:void 0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),tt.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=it().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;We({file:t,loaded:r,total:n})}}),s={promise:u};return u.abort&&(s.abort=u.abort),s})),rt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){it().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),et.use((function(t){var r=t.eventId,n=t.roomId,o=it();if(!o)throw new mt;var a=o.getRoom(n);if(!a)throw new pt;var i=a.findEventById(r);if(!i)throw new dt;var u=o.getUserId();if(!u)throw new gt;var s=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),c=function(t){if(t.status===e.EventStatus.CANCELLED||"m.room.message"!==t.getType()||t.isRedacted())return!1;var r=t.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&t.getSender()===it().getUserId()}(i);return{canRedact:s,canEdit:c}})),Jt.use((function(t){var r=t.timelineWindow,n=r.canPaginate(e.Direction.Forward);return{messages:At(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(e.Direction.Backward)}})),Vt.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c,f;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){t.next=3;break}throw new vt;case 3:return s="forward"===o?m.default.EventTimeline.FORWARDS:m.default.EventTimeline.BACKWARDS,t.next=6,n.paginate(s,a,i,u);case 6:return c=n.canPaginate(e.Direction.Forward),f=At(n),t.abrupt("return",{messages:f,isLive:!c,canPaginateForward:c,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canBan=ne,exports.$canInvite=re,exports.$canKick=te,exports.$canPaginateBackward=Ge,exports.$canPaginateForward=Je,exports.$canRedact=ae,exports.$canSendDefaultEvent=oe,exports.$canSetDefaultState=ie,exports.$currentJoinedRoomMembers=ee,exports.$currentRoom=K,exports.$currentRoomId=q,exports.$currentRoomMembers=$,exports.$isLive=N,exports.$loadFilter=ue,exports.$loadRoomFxPending=W,exports.$messages=_e,exports.$myPowerLevel=H,exports.$paginateBackwardPending=He,exports.$paginateForwardPending=Ve,exports.$requiredPowerLevelForBan=Y,exports.$requiredPowerLevelForDefaultEvents=Q,exports.$requiredPowerLevelForDefaultState=Z,exports.$requiredPowerLevelForInvite=J,exports.$requiredPowerLevelForKick=G,exports.$requiredPowerLevelForRedact=X,exports.$timelineWindow=V,exports.DEFAULT_BAN_POWERLEVEL=50,exports.DEFAULT_INVITE_POWERLEVEL=50,exports.DEFAULT_KICK_POWERLEVEL=50,exports.DEFAULT_REDACT_POWERLEVEL=50,exports.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,exports.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,exports.checkEventPermissionsFx=et,exports.clearCurrentRoomState=z,exports.client=it,exports.createClient=at,exports.createClientFx=j,exports.createDirectRoomFx=Ie,exports.createOnSyncThrottled=function(e){return t.throttle({source:P,timeout:e})},exports.createRoomFx=Ee,exports.createRoomMessageBatch=st,exports.deleteMessageFx=Xe,exports.deleteNotificationRuleFx=T,exports.destroyClient=ct,exports.destroyClientFx=S,exports.directRoomCreated=be,exports.editMessageFx=Qe,exports.getAllUsersFx=Pe,exports.getLoggedUserFx=F,exports.getNotificationRulesFx=M,exports.getRoomInfoFx=ke,exports.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,s=it().getRoom(t);if(!s)return null;var c=s.getMember(r);return c?c.getAvatarUrl(it().getHomeserverUrl(),n,o,a,u,!0):null},exports.getRoomMembers=fe,exports.getRoomsWithActivitiesFx=Re,exports.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,s=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(it().getHomeserverUrl(),r,n,o,i,s):null},exports.getUploadCredentials=function(){return{endpointUrl:"".concat(it().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(it().getAccessToken())}}},exports.getUrlPreviewFx=rt,exports.initRoom=le,exports.initStoreFx=D,exports.inviteUserFx=De,exports.joinRoomFx=Ae,exports.kickUserRoomFx=Oe,exports.leaveRoomFx=Ue,exports.liveTimelineLoaded=de,exports.loadRoom=xe,exports.loadRoomFx=je,exports.loadRoomMessage=we,exports.loadRoomMessageDone=me,exports.loginByPasswordFx=E,exports.loginByTokenFx=I,exports.logoutFx=U,exports.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return it().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},exports.newMessagesLoaded=Ne,exports.onCachedState=k,exports.onClientEvent=ut,exports.onInitialSync=R,exports.onPaginateBackwardDone=$e,exports.onPaginateForwardDone=qe,exports.onRoomInitialized=pe,exports.onRoomLoaded=ve,exports.onRoomMemberUpdate=ce,exports.onRoomUserUpdate=se,exports.onSync=P,exports.onUploadProgress=We,exports.paginateBackward=ze,exports.paginateForward=Ke,exports.readAllMessagesFx=Ze,exports.renameRoomFx=Fe,exports.roomCreated=he,exports.roomMessage=Be,exports.searchRoomMessagesFx=ye,exports.sendMessageFx=Ye,exports.setNotificationRuleActionFx=L,exports.setNotificationRuleEnabledFx=_,exports.startClientFx=O,exports.stopClientFx=A,exports.toLiveTimeline=ge,exports.updateMessages=Te,exports.uploadContentFx=tt;
//# sourceMappingURL=matrix-effector.cjs.js.map
