!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("patronum/throttle"),require("effector"),require("@babel/runtime/helpers/toConsumableArray"),require("@babel/runtime/helpers/slicedToArray"),require("@42px/effector-extra"),require("@babel/runtime/helpers/defineProperty"),require("@babel/runtime/helpers/asyncToGenerator"),require("@babel/runtime/regenerator"),require("@42px/custom-errors"),require("patronum/debounce")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","patronum/throttle","effector","@babel/runtime/helpers/toConsumableArray","@babel/runtime/helpers/slicedToArray","@42px/effector-extra","@babel/runtime/helpers/defineProperty","@babel/runtime/helpers/asyncToGenerator","@babel/runtime/regenerator","@42px/custom-errors","patronum/debounce"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.throttle,e.effector,e._toConsumableArray,e._slicedToArray,e.effectorExtra,e._defineProperty,e._asyncToGenerator,e._regeneratorRuntime,e.customErrors,e.debounce)}(this,(function(e,t,r,n,o,a,i,u,c,s,f,l){"use strict";function d(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var m,p,v=d(t),g=d(o),b=d(a),w=d(u),h=d(c),y=d(s),x=n.createDomain("root"),R=x.domain("app"),k=R.event(),P=R.event(),E=R.event(),I=R.effect(),D=R.effect(),O=R.effect(),F=R.effect(),A=R.effect(),j=R.effect(),U=R.effect(),C=R.effect(),S=R.effect(),_=x.domain("notification"),T=_.effect(),M=_.effect(),L=_.effect(),B=_.effect(),N=x.domain("room"),W=N.store(null),$=N.store(!1),q=N.store(null),K=N.store(null),z=N.store(null),V=N.event(),G=N.store(null),H=N.store(0),J=N.store(50),Y=N.store(50),Q=N.store(50),X=N.store(0),Z=N.store(50),ee=N.store(50),te=q.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),re=n.combine(H,J,(function(e,t){return e>=t})),ne=n.combine(H,Y,(function(e,t){return e>=t})),oe=n.combine(H,Q,(function(e,t){return e>=t})),ae=n.combine(H,X,(function(e,t){return e>=t})),ie=n.combine(H,Z,(function(e,t){return e>=t})),ue=n.combine(H,ee,(function(e,t){return e>=t})),ce=n.combine(K,G,(function(e,t){return Boolean(e)&&Boolean(t)})),se=N.event(),fe=N.event(),le=N.event(),de=N.event(),me=N.event(),pe=N.event(),ve=N.event(),ge=N.event(),be=N.event(),we=N.event(),he=N.event(),ye=N.event(),xe=N.event(),Re=N.effect(),ke=N.effect(),Pe=N.effect(),Ee=N.effect(),Ie=N.effect(),De=N.effect(),Oe=N.effect(),Fe=N.effect(),Ae=N.effect(),je=N.effect(),Ue=N.effect(),Ce=N.effect();e.Visibility=void 0,(m=e.Visibility||(e.Visibility={})).public="public",m.private="private",e.Preset=void 0,(p=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var Se,_e,Te,Me=x.domain("messages"),Le=Me.store([]),Be=Me.event(),Ne=Me.event(),We=Me.event(),$e=Me.event(),qe=Me.event(),Ke=Me.event(),ze=Me.event(),Ve=Me.event(),Ge=Me.store(!1),He=Me.store(!1),Je=Me.store(!0),Ye=Me.store(!0),Qe=Me.effect(),Xe=Me.effect(),Ze=Me.effect(),et=Me.effect(),tt=Me.effect(),rt=Me.effect(),nt=Me.effect();e.MsgType=void 0,(Se=e.MsgType||(e.MsgType={})).Audio="m.audio",Se.BadEncrypted="m.bad.encrypted",Se.Emote="m.emote",Se.File="m.file",Se.Image="m.image",Se.Notice="m.notice",Se.Text="m.text",Se.Video="m.video",Se.Location="m.location",e.MatrixMembershipType=void 0,(_e=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",_e.invite="invite",_e.ban="ban",_e.join="join",_e.knock="knock";var ot=500,at=[],it=function(e){var t=e.options,r=e.messageBatchInterval;ft(),void 0!==r&&(ot=r),Te=v.default.createClient(t),at.forEach((function(e){var t=b.default(e,2),r=t[0],n=t[1];Te.on(r,n)}))},ut=function(){return Te},ct=function(e){at.push.apply(at,g.default(e))},st=function(){return i.batchEvents(Ne,ot)},ft=function(){Te&&(Te.removeAllListeners(),Te=null)},lt="m.room.message",dt="m.room.redaction",mt="m.direct",pt=f.createCustomError("EventNotFound"),vt=f.createCustomError("RoomNotFound"),gt=f.createCustomError("ClientNotInitialized"),bt=f.createCustomError("TimelineWindowUndefined"),wt=f.createCustomError("UserNotFound"),ht=f.createCustomError("UserNotLoggedIn");function yt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function xt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?yt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):yt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Rt=function(e){return e.getContent()},kt=function(){var e=ut().getAccountData(mt).getContent();return e&&Object.values(e).flatMap((function(e){return e}))},Pt=function(e){return kt().includes(e)};function Et(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Rt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function It(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Dt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Et(t)),e}var Ot=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Ft(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,n=ut(),o=n.getRoom(e.roomId);if(!o)throw new vt;for(var a=o.getLiveTimeline().getEvents(),i=0,u=a.length-1;u>=0&&u!==a.length-r;u--){var c=a[u],s=o.hasUserReadEvent(n.getUserId(),c.getId());if(s)break;i+=1}var f=a.filter((function(e){return[lt,dt].includes(e.getType())})).reduce(Dt,[]),l=f.length?f[f.length-1]:void 0,d=Pt(e.roomId),m=d?o.getMember(o.guessDMUserId()):null;return xt(xt({},e),{},{unreadCount:i,lastMessage:l,isDirect:d,directUserId:null==m?void 0:m.userId,isOnline:m?Boolean(null===(t=m.user)||void 0===t?void 0:t.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()})}function At(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function jt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?At(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):At(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Ut(e){return e.getEvents().filter((function(e){return[lt,dt].includes(e.getType())})).reduce(Dt,[])}var Ct=function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=ut(),o=n.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),a=o.creator,i=n.getAccountData(mt).getContent(),u=null!==(r=i[a])&&void 0!==r?r:[],e.next=6,n.setAccountData(mt,jt(jt({},i),{},w.default({},a,[].concat(g.default(u),[t]))));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function St(){return ut().getRooms().map(It)}n.forward({from:I.done.map((function(){return{initialSyncLimit:20}})),to:F}),ct([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==lt&&a!==dt||!r&&o.liveEvent&&Ne(Et(e))}],["Room",function(e){var t,r,n=ut(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?ye(e):xe(e))}],["Room.localEchoUpdated",function(){return Be()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=St();E(r)}else{var n=St();k(n)}else{var o=St();P(o)}}],["RoomState.members",function(e,t,r){return fe(r)}],["RoomState.newMember",function(e,t,r){return fe(r)}],["RoomMember.membership",function(e,t){return fe(t)}],["RoomMember.name",function(e,t){return fe(t)}],["RoomMember.powerLevel",function(e,t){return fe(t)}],["RoomMember.typing",function(e,t){return fe(t)}],["User.avatarUrl",function(e,t){return se(t)}],["User.presence",function(e,t){return se(t)}],["User.displayName",function(e,t){return se(t)}]]),I.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ut().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),O.use(h.default(y.default.mark((function e(){var t,r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=ut(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),F.use((function(e){return ut().startClient(e)})),U.use(h.default(y.default.mark((function e(){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ut().logout();case 2:case"end":return e.stop()}}),e)})))),j.use((function(){return ut().stopClient()})),A.use(h.default(y.default.mark((function e(){var t,r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=ut()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Ot(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),C.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,it(r),o=ut(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,ut().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S.use(h.default(y.default.mark((function e(){var t,r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=ut()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),ft();case 9:case"end":return e.stop()}}),e)})))),T.use((function(){return ut().getPushRules()})),M.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ut().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),L.use(function(){var e=h.default(y.default.mark((function e(t){var r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,ut().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,ut().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),B.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ut().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var _t=N.effect(),Tt=N.effect(),Mt=N.effect(),Lt=N.effect(),Bt=N.effect();function Nt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Wt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Nt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Nt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var $t=n.attach({effect:Ce}),qt=n.attach({effect:Ce}),Kt=n.attach({effect:Ce}),zt=l.debounce({source:le,timeout:500});function Vt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Gt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Vt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Vt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}K.on(de,(function(e,t){return t.roomId})).reset(V),z.on(_t.doneData,(function(e,t){return t})).reset(V),G.on(Tt.doneData,(function(e,t){return t})).reset(K),q.on(Mt.doneData,(function(e,t){return t})).reset(K),H.on(Lt.doneData,(function(e,t){return t})).reset(K),J.on(Bt.doneData,(function(e,t){return t.kick})).reset(K),Q.on(Bt.doneData,(function(e,t){return t.ban})).reset(K),Y.on(Bt.doneData,(function(e,t){return t.invite})).reset(K),X.on(Bt.doneData,(function(e,t){return t.defaultEvents})).reset(K),Z.on(Bt.doneData,(function(e,t){return t.redact})).reset(K),ee.on(Bt.doneData,(function(e,t){return t.stateDefault})).reset(K),n.forward({from:Ce.pending,to:$}),n.forward({from:de,to:Tt}),n.forward({from:$t.done,to:me}),n.forward({from:n.sample({source:G,clock:Tt.done,fn:function(){}}),to:pe}),n.forward({from:qt.done,to:ve}),n.forward({from:Kt.done,to:ge}),n.guard({clock:K,filter:Boolean,target:_t}),n.guard({source:K,filter:function(e){return Boolean(e)},target:le}),n.guard({clock:se,source:q,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:le}),n.guard({clock:fe,source:K,filter:function(e,t){return e===t.roomId},target:le}),n.guard({source:K,clock:zt,filter:Boolean,target:Mt}),n.guard({source:n.sample([K,G],be,(function(e,t){var r=b.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:ce,target:Kt}),n.guard({source:n.sample([K,G],he,(function(e,t){var r=b.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:ce,target:qt}),n.guard({source:n.sample([K,G],we,(function(e){var t=b.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:ce,target:$t}),n.guard({clock:K,filter:Boolean,target:[Lt,Bt]}),Lt.use((function(e){var t=ut(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new wt;var o=r.getMember(n);if(!o)throw new wt;return o.powerLevel})),Bt.use((function(e){var t,r,n,o,a,i,u=ut().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Mt.use((function(e){var t=ut().getRoom(e);if(!t)throw new vt;return Object.values(t.currentState.members).map((function(e){var t=ut().getUser(e.userId);if(!t)throw new wt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ot(t),userId:e.userId}}(e,t)}))})),Pe.use((function(e){var t=ut().getRoom(e);if(!t)throw new vt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Tt.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=ut(),o=ut().getRoom(r)){e.next=5;break}throw new vt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new v.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ce.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new bt;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=Ut(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(v.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(v.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=Ut(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ke.use((function(e){if(!ut())throw new gt;return e.map((function(e){return Ft(e)}))})),Re.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=ut().getRoom(o)){e.next=4;break}throw new vt;case 4:return c={},e.next=7,ut().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],Et(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ee.use((function(){return ut().getUsers().map(Ot)})),Ie.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Wt(Wt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,ut().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),De.use(function(){var t=h.default(y.default.mark((function t(r){var n,o,a,i,u,c,s,f,l,d;return y.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.user,o=r.preset,a=r.initialState,i=void 0===a?[]:a,u=ut(),c=kt(),!(s=c.find((function(e){var t;return null===(t=u.getRoom(e))||void 0===t?void 0:t.currentState.members[n.userId]})))){t.next=6;break}return t.abrupt("return",{roomId:s});case 6:return f={is_direct:!0,invite:[n.userId],visibility:e.Visibility.private,initial_state:i.map((function(e){return Wt(Wt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:o,creation_content:{isDirect:!0,creator:u.getUserId()}},t.next=9,u.createRoom(f);case 9:return l=t.sent,d=l.room_id,t.next=13,Ct(d);case 13:return t.abrupt("return",{roomId:d});case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Oe.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,ut().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Fe.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,ut().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ae.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,ut().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=ut(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Ct(r);case 8:return e.abrupt("return",Ft(It(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_t.use((function(e){var t=ut().getRoom(e);return t?Ft(It(t)):null})),Ue.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ut().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Ht=Me.effect(),Jt=n.attach({source:[K,G],effect:Ht,mapParams:function(e,t){var r=b.default(t,2);return Gt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Yt=n.attach({source:[K,G],effect:Ht,mapParams:function(e,t){var r=b.default(t,2);return Gt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),Qt=Me.effect(),Xt=n.guard({source:n.sample(K,[Ce.done,Ht.done,Qt.done],(function(e,t){return Gt({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),Zt=st(),er=n.attach({effect:Yt,mapParams:function(e){return{size:e.messages.length}}});Le.on(Xt,(function(e,t){return t.messages})).reset(K),W.on(Xt,(function(e,t){return t.isLive})).reset(K);var tr=n.combine(ce,He,Ge,$,(function(e,t,r,n){return e&&!t&&!r&&!n}));He.on(Jt.pending,(function(e,t){return t})).reset(K),Ge.on(Yt.pending,(function(e,t){return t})).reset(K),Je.on(Xt,(function(e,t){return t.canPaginateBackward})).reset([be,K]),Ye.on(Xt,(function(e,t){return t.canPaginateForward})).reset([be,K]),n.forward({from:Jt.done,to:qe}),n.forward({from:Yt.done,to:Ke}),n.guard({source:Ve,filter:tr,target:Jt}),n.guard({source:ze,filter:tr,target:Yt}),n.forward({from:n.sample(Le,er.done,(function(e,t){return t.params.messages})),to:We}),n.forward({from:Zt.map((function(e){return{messages:e}})),to:er}),n.guard({source:n.sample([K,G],Be,(function(e){var t=b.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:G.map((function(e){return Boolean(e)})),target:Qt}),Qe.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,ut().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Xe.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,ut().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ze.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,ut().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),et.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=ut().getRoom(r)){e.next=4;break}throw new vt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new pt;case 7:return e.next=9,ut().setRoomReadMarkers(r,n,a,{hidden:void 0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),rt.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=ut().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;$e({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),nt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){ut().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),tt.use((function(e){var r=e.eventId,n=e.roomId,o=ut();if(!o)throw new gt;var a=o.getRoom(n);if(!a)throw new vt;var i=a.findEventById(r);if(!i)throw new pt;var u=o.getUserId();if(!u)throw new ht;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===ut().getUserId()}(i);return{canRedact:c,canEdit:s}})),Qt.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:Ut(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}})),Ht.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new bt;case 3:return c="forward"===o?v.default.EventTimeline.FORWARDS:v.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=Ut(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=oe,e.$canInvite=ne,e.$canKick=re,e.$canPaginateBackward=Je,e.$canPaginateForward=Ye,e.$canRedact=ie,e.$canSendDefaultEvent=ae,e.$canSetDefaultState=ue,e.$currentJoinedRoomMembers=te,e.$currentRoom=z,e.$currentRoomId=K,e.$currentRoomMembers=q,e.$isLive=W,e.$loadFilter=ce,e.$loadRoomFxPending=$,e.$messages=Le,e.$myPowerLevel=H,e.$paginateBackwardPending=He,e.$paginateForwardPending=Ge,e.$requiredPowerLevelForBan=Q,e.$requiredPowerLevelForDefaultEvents=X,e.$requiredPowerLevelForDefaultState=ee,e.$requiredPowerLevelForInvite=Y,e.$requiredPowerLevelForKick=J,e.$requiredPowerLevelForRedact=Z,e.$timelineWindow=G,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=tt,e.clearCurrentRoomState=V,e.client=ut,e.createClient=it,e.createClientFx=C,e.createDirectRoomFx=De,e.createOnSyncThrottled=function(e){return r.throttle({source:E,timeout:e})},e.createRoomFx=Ie,e.createRoomMessageBatch=st,e.deleteMessageFx=Ze,e.deleteNotificationRuleFx=B,e.destroyClient=ft,e.destroyClientFx=S,e.directRoomCreated=ye,e.editMessageFx=Xe,e.getAllUsersFx=Ee,e.getLoggedUserFx=A,e.getNotificationRulesFx=T,e.getRoomInfoFx=Pe,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=ut().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(ut().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomMembers=le,e.getRoomsWithActivitiesFx=ke,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(ut().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(ut().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(ut().getAccessToken())}}},e.getUrlPreviewFx=nt,e.initRoom=de,e.initStoreFx=O,e.inviteUserFx=Oe,e.joinRoomFx=je,e.kickUserRoomFx=Fe,e.leaveRoomFx=Ue,e.liveTimelineLoaded=me,e.loadRoom=be,e.loadRoomFx=Ce,e.loadRoomMessage=he,e.loadRoomMessageDone=ve,e.loginByPasswordFx=I,e.loginByTokenFx=D,e.logoutFx=U,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return ut().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=We,e.onCachedState=P,e.onClientEvent=ct,e.onInitialSync=k,e.onPaginateBackwardDone=qe,e.onPaginateForwardDone=Ke,e.onRoomInitialized=pe,e.onRoomLoaded=ge,e.onRoomMemberUpdate=fe,e.onRoomUserUpdate=se,e.onSync=E,e.onUploadProgress=$e,e.paginateBackward=Ve,e.paginateForward=ze,e.readAllMessagesFx=et,e.renameRoomFx=Ae,e.roomCreated=xe,e.roomMessage=Ne,e.searchRoomMessagesFx=Re,e.sendMessageFx=Qe,e.setNotificationRuleActionFx=M,e.setNotificationRuleEnabledFx=L,e.startClientFx=F,e.stopClientFx=j,e.toLiveTimeline=we,e.updateMessages=Be,e.uploadContentFx=rt,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
