!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("patronum/throttle"),require("effector"),require("@babel/runtime/helpers/toConsumableArray"),require("@babel/runtime/helpers/slicedToArray"),require("@42px/effector-extra"),require("@babel/runtime/helpers/defineProperty"),require("@babel/runtime/helpers/asyncToGenerator"),require("@babel/runtime/regenerator"),require("@42px/custom-errors"),require("patronum/debounce")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","patronum/throttle","effector","@babel/runtime/helpers/toConsumableArray","@babel/runtime/helpers/slicedToArray","@42px/effector-extra","@babel/runtime/helpers/defineProperty","@babel/runtime/helpers/asyncToGenerator","@babel/runtime/regenerator","@42px/custom-errors","patronum/debounce"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.throttle,e.effector,e._toConsumableArray,e._slicedToArray,e.effectorExtra,e._defineProperty,e._asyncToGenerator,e._regeneratorRuntime,e.customErrors,e.debounce)}(this,(function(e,t,r,n,o,a,i,u,c,s,f,l){"use strict";function d(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var m,p,v=d(t),g=d(o),b=d(a),w=d(u),h=d(c),y=d(s),x=n.createDomain("root"),R=x.domain("app"),k=R.event(),P=R.event(),E=R.event(),I=R.effect(),D=R.effect(),O=R.effect(),F=R.effect(),A=R.effect(),U=R.effect(),C=R.effect(),j=R.effect(),S=R.effect(),_=R.effect(),T=x.domain("notification"),M=T.effect(),L=T.effect(),B=T.effect(),N=T.effect(),W=x.domain("room"),$=W.store(null),q=W.store(!1),K=W.store(null),z=W.store(null),V=W.store(null),G=W.event(),H=W.store(null),J=W.store(0),Y=W.store(50),Q=W.store(50),X=W.store(50),Z=W.store(0),ee=W.store(50),te=W.store(50),re=K.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),ne=n.combine(J,Y,(function(e,t){return e>=t})),oe=n.combine(J,Q,(function(e,t){return e>=t})),ae=n.combine(J,X,(function(e,t){return e>=t})),ie=n.combine(J,Z,(function(e,t){return e>=t})),ue=n.combine(J,ee,(function(e,t){return e>=t})),ce=n.combine(J,te,(function(e,t){return e>=t})),se=n.combine(z,H,(function(e,t){return Boolean(e)&&Boolean(t)})),fe=W.event(),le=W.event(),de=W.event(),me=W.event(),pe=W.event(),ve=W.event(),ge=W.event(),be=W.event(),we=W.event(),he=W.event(),ye=W.event(),xe=W.event(),Re=W.event(),ke=W.effect(),Pe=W.effect(),Ee=W.effect(),Ie=W.effect(),De=W.effect(),Oe=W.effect(),Fe=W.effect(),Ae=W.effect(),Ue=W.effect(),Ce=W.effect(),je=W.effect(),Se=W.effect(),_e=W.effect(),Te=W.effect();e.Visibility=void 0,(m=e.Visibility||(e.Visibility={})).public="public",m.private="private",e.Preset=void 0,(p=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var Me,Le,Be,Ne=x.domain("messages"),We=Ne.store([]),$e=Ne.event(),qe=Ne.event(),Ke=Ne.event(),ze=Ne.event(),Ve=Ne.event(),Ge=Ne.event(),He=Ne.event(),Je=Ne.event(),Ye=Ne.store(!1),Qe=Ne.store(!1),Xe=Ne.store(!0),Ze=Ne.store(!0),et=Ne.effect(),tt=Ne.effect(),rt=Ne.effect(),nt=Ne.effect(),ot=Ne.effect(),at=Ne.effect(),it=Ne.effect();e.MsgType=void 0,(Me=e.MsgType||(e.MsgType={})).Audio="m.audio",Me.BadEncrypted="m.bad.encrypted",Me.Emote="m.emote",Me.File="m.file",Me.Image="m.image",Me.Notice="m.notice",Me.Text="m.text",Me.Video="m.video",Me.Location="m.location",e.MatrixMembershipType=void 0,(Le=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",Le.invite="invite",Le.ban="ban",Le.join="join",Le.knock="knock";var ut=500,ct=[],st=function(){Be&&(Be.removeAllListeners(),Be=null)},ft=function(e){var t=e.options,r=e.messageBatchInterval;st(),void 0!==r&&(ut=r),Be=v.default.createClient(t),ct.forEach((function(e){var t=b.default(e,2),r=t[0],n=t[1];Be.on(r,n)}))},lt=function(){return Be},dt=function(e){ct.push.apply(ct,g.default(e))},mt=function(){return i.batchEvents(qe,ut)},pt="m.room.message",vt="m.room.redaction",gt="m.direct",bt=f.createCustomError("EventNotFound"),wt=f.createCustomError("RoomNotFound"),ht=f.createCustomError("ClientNotInitialized"),yt=f.createCustomError("TimelineWindowUndefined"),xt=f.createCustomError("UserNotFound"),Rt=f.createCustomError("UserNotLoggedIn");function kt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Pt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?kt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):kt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Et=function(e){return e.getContent()};function It(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Et(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Dt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Ot(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(It(t)),e}var Ft=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function At(e){var t,r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,a=lt(),i=a.getRoom(e.roomId);if(!i)throw new wt;for(var u=i.getLiveTimeline().getEvents(),c=null===(t=i.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect,s=0,f=u.length-1;f>=0&&f!==u.length-o;f--){var l=u[f],d=i.hasUserReadEvent(a.getUserId(),l.getId());if(d)break;s+=1}var m=u.filter((function(e){return[pt,vt].includes(e.getType())})).reduce(Ot,[]),p=m.length?m[m.length-1]:void 0,v=c?i.getMember(i.guessDMUserId()):null;return Pt(Pt({},e),{},{unreadCount:s,lastMessage:p,isDirect:c,directUserId:null==v?void 0:v.userId,isOnline:v?Boolean(null===(n=v.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:i.getLastActiveTimestamp()})}function Ut(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ct(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ut(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ut(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function jt(e){return e.getEvents().filter((function(e){return[pt,vt].includes(e.getType())})).reduce(Ot,[])}var St=function(){var e=h.default(y.default.mark((function e(t,r){var n,o,a,i,u,c;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=lt(),a=o.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),i=a.creator,u=o.getAccountData(gt).getContent(),c=null!==(n=u[i])&&void 0!==n?n:[],!r){e.next=8;break}return e.next=7,o.setAccountData(gt,Ct(Ct({},u),{},w.default({},r,[t])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,o.setAccountData(gt,Ct(Ct({},u),{},w.default({},i,[].concat(g.default(c),[t]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function _t(){return lt().getRooms().map(Dt)}n.forward({from:I.done.map((function(){return{initialSyncLimit:20}})),to:F}),dt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==pt&&a!==vt||!r&&o.liveEvent&&qe(It(e))}],["Room",function(e){var t,r,n=lt(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?xe(e):Re(e))}],["Room.localEchoUpdated",function(){return $e()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=_t();E(r)}else{var n=_t();k(n)}else{var o=_t();P(o)}}],["RoomState.members",function(e,t,r){return le(r)}],["RoomState.newMember",function(e,t,r){return le(r)}],["RoomMember.membership",function(e,t){return le(t)}],["RoomMember.name",function(e,t){return le(t)}],["RoomMember.powerLevel",function(e,t){return le(t)}],["RoomMember.typing",function(e,t){return le(t)}],["User.avatarUrl",function(e,t){return fe(t)}],["User.presence",function(e,t){return fe(t)}],["User.displayName",function(e,t){return fe(t)}]]),I.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,lt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),O.use(h.default(y.default.mark((function e(){var t,r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=lt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),F.use((function(e){return lt().startClient(e)})),C.use(h.default(y.default.mark((function e(){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,lt().logout();case 2:case"end":return e.stop()}}),e)})))),U.use((function(){return lt().stopClient()})),A.use(h.default(y.default.mark((function e(){var t,r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=lt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Ft(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),j.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,ft(r),o=lt(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,lt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S.use(h.default(y.default.mark((function e(){var t,r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=lt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),st();case 9:case"end":return e.stop()}}),e)})))),_.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=lt(),n=r.getUser(t)){e.next=4;break}throw new xt;case 4:return e.abrupt("return",Ft(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),M.use((function(){return lt().getPushRules()})),L.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,lt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),B.use(function(){var e=h.default(y.default.mark((function e(t){var r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,lt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,lt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),N.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,lt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Tt=W.effect(),Mt=W.effect(),Lt=W.effect(),Bt=W.effect();function Nt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Wt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Nt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Nt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var $t=n.attach({effect:_e}),qt=n.attach({effect:_e}),Kt=n.attach({effect:_e}),zt=l.debounce({source:de,timeout:500}),Vt=n.attach({effect:Te});function Gt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ht(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Gt(Object(r),!0).forEach((function(t){w.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Gt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}z.on(me,(function(e,t){return t.roomId})).reset(G),V.on(Vt.doneData,(function(e,t){return t})).reset(G),H.on(Tt.doneData,(function(e,t){return t})).reset(z),K.on(Mt.doneData,(function(e,t){return t})).reset(z),J.on(Lt.doneData,(function(e,t){return t})).reset(z),Y.on(Bt.doneData,(function(e,t){return t.kick})).reset(z),X.on(Bt.doneData,(function(e,t){return t.ban})).reset(z),Q.on(Bt.doneData,(function(e,t){return t.invite})).reset(z),Z.on(Bt.doneData,(function(e,t){return t.defaultEvents})).reset(z),ee.on(Bt.doneData,(function(e,t){return t.redact})).reset(z),te.on(Bt.doneData,(function(e,t){return t.stateDefault})).reset(z),n.forward({from:_e.pending,to:q}),n.forward({from:me,to:Tt}),n.forward({from:$t.done,to:pe}),n.forward({from:n.sample({source:H,clock:Tt.done,fn:function(){}}),to:ve}),n.forward({from:qt.done,to:ge}),n.forward({from:Kt.done,to:be}),n.guard({clock:z,filter:Boolean,target:Vt}),n.guard({source:z,filter:function(e){return Boolean(e)},target:de}),n.guard({clock:fe,source:K,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:de}),n.guard({clock:le,source:z,filter:function(e,t){return e===t.roomId},target:de}),n.guard({source:z,clock:zt,filter:Boolean,target:Mt}),n.guard({source:n.sample([z,H],we,(function(e,t){var r=b.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:se,target:Kt}),n.guard({source:n.sample([z,H],ye,(function(e,t){var r=b.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:se,target:qt}),n.guard({source:n.sample([z,H],he,(function(e){var t=b.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:se,target:$t}),n.guard({clock:z,filter:Boolean,target:[Lt,Bt]}),Lt.use((function(e){var t=lt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new xt;var o=r.getMember(n);if(!o)throw new xt;return o.powerLevel})),Bt.use((function(e){var t,r,n,o,a,i,u=lt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Mt.use((function(e){var t=lt().getRoom(e);if(!t)throw new wt;return Object.values(t.currentState.members).map((function(e){var t=lt().getUser(e.userId);if(!t)throw new xt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ft(t),userId:e.userId}}(e,t)}))})),Ie.use((function(e){var t=lt().getRoom(e);if(!t)throw new wt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Tt.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=lt(),o=lt().getRoom(r)){e.next=5;break}throw new wt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new v.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new yt;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=jt(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(v.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(v.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=jt(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ee.use((function(e){if(!lt())throw new ht;return e.map((function(e){return At(e)}))})),Pe.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=lt().getRoom(o)){e.next=4;break}throw new wt;case 4:return c={},e.next=7,lt().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],It(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),De.use((function(){return lt().getUsers().map(Ft)})),Oe.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Wt(Wt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,lt().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Fe.use(function(){var t=h.default(y.default.mark((function t(r){var n,o,a,i,u,c,s,f,l,d;return y.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.user,o=r.preset,a=r.initialState,i=void 0===a?[]:a,u=lt(),m=void 0,m=lt().getAccountData(gt).getContent(),c=m&&Object.values(m).flatMap((function(e){return e})),!(s=c.find((function(e){var t;return null===(t=u.getRoom(e))||void 0===t?void 0:t.currentState.members[n.userId]})))){t.next=6;break}return t.abrupt("return",{roomId:s});case 6:return f={is_direct:!0,invite:[n.userId],visibility:e.Visibility.private,initial_state:i.map((function(e){return Wt(Wt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:o,creation_content:{isDirect:!0,creator:u.getUserId()}},t.next=9,u.createRoom(f);case 9:return l=t.sent,d=l.room_id,t.next=13,St(d,n.userId);case 13:return t.abrupt("return",{roomId:d});case 14:case"end":return t.stop()}var m}),t)})));return function(e){return t.apply(this,arguments)}}()),Ae.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,lt().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ue.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,lt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ce.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,lt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=lt(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,St(r);case 8:return e.abrupt("return",At(Dt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use((function(e){var t=lt().getRoom(e);return t?At(Dt(t)):null})),Se.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,lt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ke.use((function(e){var t,r=lt(),n=null===(t=r.getAccountData(gt))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new wt;var a=r.getRoom(o);if(!a)throw new wt;return Dt(a)}));var Jt=Ne.effect(),Yt=n.attach({source:[z,H],effect:Jt,mapParams:function(e,t){var r=b.default(t,2);return Ht({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Qt=n.attach({source:[z,H],effect:Jt,mapParams:function(e,t){var r=b.default(t,2);return Ht({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),Xt=Ne.effect(),Zt=n.guard({source:n.sample(z,[_e.done,Jt.done,Xt.done],(function(e,t){return Ht({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),er=mt(),tr=n.attach({effect:Qt,mapParams:function(e){return{size:e.messages.length}}});We.on(Zt,(function(e,t){return t.messages})).reset(z),$.on(Zt,(function(e,t){return t.isLive})).reset(z);var rr=n.combine(se,Qe,Ye,q,(function(e,t,r,n){return e&&!t&&!r&&!n}));Qe.on(Yt.pending,(function(e,t){return t})).reset(z),Ye.on(Qt.pending,(function(e,t){return t})).reset(z),Xe.on(Zt,(function(e,t){return t.canPaginateBackward})).reset([we,z]),Ze.on(Zt,(function(e,t){return t.canPaginateForward})).reset([we,z]),n.forward({from:Yt.done,to:Ve}),n.forward({from:Qt.done,to:Ge}),n.guard({source:Je,filter:rr,target:Yt}),n.guard({source:He,filter:rr,target:Qt}),n.forward({from:n.sample(We,tr.done,(function(e,t){return t.params.messages})),to:Ke}),n.forward({from:er.map((function(e){return{messages:e}})),to:tr}),n.guard({source:n.sample([z,H],$e,(function(e){var t=b.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:H.map((function(e){return Boolean(e)})),target:Xt}),et.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,lt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),tt.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,lt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),rt.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,lt().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),nt.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=lt().getRoom(r)){e.next=4;break}throw new wt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new bt;case 7:return e.next=9,lt().setRoomReadMarkers(r,n,a,{hidden:void 0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),at.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=lt().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;ze({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),it.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){lt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),ot.use((function(e){var r=e.eventId,n=e.roomId,o=lt();if(!o)throw new ht;var a=o.getRoom(n);if(!a)throw new wt;var i=a.findEventById(r);if(!i)throw new bt;var u=o.getUserId();if(!u)throw new Rt;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===lt().getUserId()}(i);return{canRedact:c,canEdit:s}})),Xt.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:jt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}})),Jt.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new yt;case 3:return c="forward"===o?v.default.EventTimeline.FORWARDS:v.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=jt(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=ae,e.$canInvite=oe,e.$canKick=ne,e.$canPaginateBackward=Xe,e.$canPaginateForward=Ze,e.$canRedact=ue,e.$canSendDefaultEvent=ie,e.$canSetDefaultState=ce,e.$currentJoinedRoomMembers=re,e.$currentRoom=V,e.$currentRoomId=z,e.$currentRoomMembers=K,e.$isLive=$,e.$loadFilter=se,e.$loadRoomFxPending=q,e.$messages=We,e.$myPowerLevel=J,e.$paginateBackwardPending=Qe,e.$paginateForwardPending=Ye,e.$requiredPowerLevelForBan=X,e.$requiredPowerLevelForDefaultEvents=Z,e.$requiredPowerLevelForDefaultState=te,e.$requiredPowerLevelForInvite=Q,e.$requiredPowerLevelForKick=Y,e.$requiredPowerLevelForRedact=ee,e.$timelineWindow=H,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=ot,e.clearCurrentRoomState=G,e.client=lt,e.createClient=ft,e.createClientFx=j,e.createDirectRoomFx=Fe,e.createOnSyncThrottled=function(e){return r.throttle({source:E,timeout:e})},e.createRoomFx=Oe,e.createRoomMessageBatch=mt,e.deleteMessageFx=rt,e.deleteNotificationRuleFx=N,e.destroyClient=st,e.destroyClientFx=S,e.directRoomCreated=xe,e.editMessageFx=tt,e.findDirectRoomByUserIdFx=ke,e.getAllUsersFx=De,e.getLoggedUserFx=A,e.getNotificationRulesFx=M,e.getProfileInfoFx=_,e.getRoomByIdFx=Te,e.getRoomInfoFx=Ie,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=lt().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(lt().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomMembers=de,e.getRoomsWithActivitiesFx=Ee,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(lt().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(lt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(lt().getAccessToken())}}},e.getUrlPreviewFx=it,e.initRoom=me,e.initStoreFx=O,e.inviteUserFx=Ae,e.joinRoomFx=je,e.kickUserRoomFx=Ue,e.leaveRoomFx=Se,e.liveTimelineLoaded=pe,e.loadRoom=we,e.loadRoomFx=_e,e.loadRoomMessage=ye,e.loadRoomMessageDone=ge,e.loginByPasswordFx=I,e.loginByTokenFx=D,e.logoutFx=C,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return lt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=Ke,e.onCachedState=P,e.onClientEvent=dt,e.onInitialSync=k,e.onPaginateBackwardDone=Ve,e.onPaginateForwardDone=Ge,e.onRoomInitialized=ve,e.onRoomLoaded=be,e.onRoomMemberUpdate=le,e.onRoomUserUpdate=fe,e.onSync=E,e.onUploadProgress=ze,e.paginateBackward=Je,e.paginateForward=He,e.readAllMessagesFx=nt,e.renameRoomFx=Ce,e.roomCreated=Re,e.roomMessage=qe,e.searchRoomMessagesFx=Pe,e.sendMessageFx=et,e.setNotificationRuleActionFx=L,e.setNotificationRuleEnabledFx=B,e.startClientFx=F,e.stopClientFx=U,e.toLiveTimeline=he,e.updateMessages=$e,e.uploadContentFx=at,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
