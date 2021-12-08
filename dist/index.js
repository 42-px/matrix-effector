import e,{Direction as t,MatrixEvent as r,SearchOrderBy as n,EventStatus as o}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{throttle as i}from"patronum/throttle";import{createDomain as a,combine as u,forward as c,attach as s,sample as f,guard as l}from"effector";import d from"@babel/runtime/helpers/toConsumableArray";import m from"@babel/runtime/helpers/slicedToArray";import{batchEvents as p}from"@42px/effector-extra";import v from"@babel/runtime/helpers/defineProperty";import g from"@babel/runtime/helpers/asyncToGenerator";import w from"@babel/runtime/regenerator";import{createCustomError as b}from"@42px/custom-errors";import{debounce as h}from"patronum/debounce";var y,x,k=a("root"),I=k.domain("app"),O=I.event(),R=I.event(),D=I.event(),P=function(e){return i({source:D,timeout:e})},j=I.effect(),A=I.effect(),E=I.effect(),S=I.effect(),C=I.effect(),U=I.effect(),_=I.effect(),B=I.effect(),T=I.effect(),M=I.effect(),N=k.domain("notification"),W=N.effect(),L=N.effect(),F=N.effect(),z=N.effect(),K=k.domain("room"),G=50,H=50,Y=50,q=0,J=50,V=50,$=K.store(null),Q=K.store(!1),X=K.store(null),Z=K.store(null),ee=K.store(null),te=K.event(),re=K.store(null),ne=K.store(0),oe=K.store({}),ie=K.store(50),ae=K.store(50),ue=K.store(50),ce=K.store(0),se=K.store(50),fe=K.store(50),le=X.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),de=X.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"invite"===e.membership})))&&void 0!==t?t:[]})),me=u(ne,ie,(function(e,t){return e>=t})),pe=u(ne,ae,(function(e,t){return e>=t})),ve=u(ne,ue,(function(e,t){return e>=t})),ge=u(ne,ce,(function(e,t){return e>=t})),we=u(ne,se,(function(e,t){return e>=t})),be=u(ne,fe,(function(e,t){return e>=t})),he=u(Z,re,(function(e,t){return Boolean(e)&&Boolean(t)})),ye=K.event(),xe=K.event(),ke=K.event(),Ie=K.event(),Oe=K.event(),Re=K.event(),De=K.event(),Pe=K.event(),je=K.event(),Ae=K.event(),Ee=K.event(),Se=K.event(),Ce=K.event(),Ue=K.event(),_e=K.event(),Be=K.effect(),Te=K.effect(),Me=K.effect(),Ne=K.effect(),We=K.effect(),Le=K.effect(),Fe=K.effect(),ze=K.effect(),Ke=K.effect(),Ge=K.effect(),He=K.effect(),Ye=K.effect(),qe=K.effect(),Je=K.effect(),Ve=K.effect(),$e=K.effect();!function(e){e.public="public",e.private="private"}(y||(y={})),function(e){e.trustedPrivateChat="trusted_private_chat",e.privateChat="private_chat",e.publicChat="public_chat"}(x||(x={}));var Qe,Xe,Ze,et=k.domain("messages"),tt=et.store([]),rt=et.event(),nt=et.event(),ot=et.event(),it=et.event(),at=et.event(),ut=et.event(),ct=et.event(),st=et.event(),ft=et.store(!1),lt=et.store(!1),dt=et.store(!0),mt=et.store(!0),pt=et.effect(),vt=et.effect(),gt=et.effect(),wt=et.effect(),bt=et.effect(),ht=et.effect(),yt=et.effect();!function(e){e.Audio="m.audio",e.BadEncrypted="m.bad.encrypted",e.Emote="m.emote",e.File="m.file",e.Image="m.image",e.Notice="m.notice",e.Text="m.text",e.Video="m.video",e.Location="m.location"}(Qe||(Qe={})),function(e){e.leave="leave",e.invite="invite",e.ban="ban",e.join="join",e.knock="knock"}(Xe||(Xe={}));var xt=500,kt=[],It=function(){Ze&&(Ze.removeAllListeners(),Ze=null)},Ot=function(t){var r=t.options,n=t.messageBatchInterval;It(),void 0!==n&&(xt=n),Ze=e.createClient(r),kt.forEach((function(e){var t=m(e,2),r=t[0],n=t[1];Ze.on(r,n)}))},Rt=function(){return Ze},Dt=function(e){kt.push.apply(kt,d(e))},Pt=function(){return p(nt,xt)},jt="m.room.message",At="m.room.redaction",Et=b("EventNotFound"),St=b("RoomNotFound"),Ct=b("ClientNotInitialized"),Ut=b("TimelineWindowUndefined"),_t=b("UserNotFound"),Bt=b("UserNotLoggedIn"),Tt=b("Can't invite users into a direct room");function Mt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Nt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Mt(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Mt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Wt=function(e){return e.getContent()};function Lt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Wt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Ft(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function zt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Lt(t)),e}var Kt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Gt(e){var t,r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,i=Rt(),a=i.getRoom(e.roomId);if(!a)throw new St;for(var u=a.getLiveTimeline().getEvents(),c=null===(t=a.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect,s=0,f=u.length-1;f>=0&&f!==u.length-o;f--){var l=u[f],d=a.hasUserReadEvent(i.getUserId(),l.getId());if(d)break;s+=1}var m=u.filter((function(e){return[jt,At].includes(e.getType())})).reduce(zt,[]),p=m.length?m[m.length-1]:void 0,v=c?a.getMember(a.guessDMUserId()):null;return Nt(Nt({},e),{},{unreadCount:s,lastMessage:p,isDirect:c,directUserId:null==v?void 0:v.userId,isOnline:v?Boolean(null===(n=v.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:a.getLastActiveTimestamp()})}function Ht(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Yt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ht(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ht(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function qt(e){return e.getEvents().filter((function(e){return[jt,At].includes(e.getType())})).reduce(zt,[])}var Jt=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,i=e.allowDefault,a=void 0===i||i,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(Rt().getHomeserverUrl(),r,n,o,a,c):null},Vt=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,i=e.resizeMethod,a=e.allowDefault,u=void 0===a||a,c=Rt().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(Rt().getHomeserverUrl(),n,o,i,u,!0):null},$t=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,i=e.allowDirectLinks;return Rt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",i)},Qt=function(){return{endpointUrl:"".concat(Rt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(Rt().getAccessToken())}}},Xt=function(){var e=g(w.mark((function e(t,r){var n,o,i,a,u,c;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=Rt(),i=o.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),a=i.creator,u=o.getAccountData("m.direct").getContent(),c=null!==(n=u[a])&&void 0!==n?n:[],!r){e.next=8;break}return e.next=7,o.setAccountData("m.direct",Yt(Yt({},u),{},v({},r,[t])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,o.setAccountData("m.direct",Yt(Yt({},u),{},v({},a,[].concat(d(c),[t]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function Zt(){return Rt().getRooms().map(Ft)}c({from:j.done.map((function(){return{initialSyncLimit:20}})),to:S}),Dt([["Room.timeline",function(e,t,r,n,o){var i=e.getType();i!==jt&&i!==At||!r&&o.liveEvent&&nt(Lt(e))}],["Room",function(e){var t,r,n=Rt(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?Ue(e):_e(e))}],["Room.localEchoUpdated",function(){return rt()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=Zt();D(r)}else{var n=Zt();O(n)}else{var o=Zt();R(o)}}],["RoomState.members",function(e,t,r){return Ie(r)}],["RoomState.newMember",function(e,t,r){return Ie(r)}],["RoomMember.membership",function(e,t){return Ie(t)}],["RoomMember.name",function(e,t){return Ie(t)}],["RoomMember.powerLevel",function(e,t){return Ie(t)}],["RoomMember.typing",function(e,t){return xe(t)}],["User.avatarUrl",function(e,t){return ke(t)}],["User.presence",function(e,t){return ke(t)}],["User.displayName",function(e,t){return ke(t)}]]),j.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Rt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),A.use(function(){var e=g(w.mark((function e(t){var r,n,o,i,a,u;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,i=n.access_token,a=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:i,deviceId:a,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),E.use(g(w.mark((function e(){var t,r;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Rt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),S.use((function(e){return Rt().startClient(e)})),_.use(g(w.mark((function e(){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Rt().logout();case 2:case"end":return e.stop()}}),e)})))),U.use((function(){return Rt().stopClient()})),C.use(g(w.mark((function e(){var t,r,n,o,i;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Rt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Kt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:i=e.sent,o.avatarUrl=i.avatar_url,o.displayName=i.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),B.use(function(){var e=g(w.mark((function e(t){var r,n,o,i;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,Ot(r),o=Rt(),!(i=o.store)){e.next=6;break}return e.next=6,i.startup();case 6:return e.next=8,Rt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),T.use(g(w.mark((function e(){var t,r;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Rt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),It();case 9:case"end":return e.stop()}}),e)})))),M.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Rt(),n=r.getUser(t)){e.next=4;break}throw new _t;case 4:return e.abrupt("return",Kt(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),W.use((function(){return Rt().getPushRules()})),L.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Rt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),F.use(function(){var e=g(w.mark((function e(t){var r;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,Rt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,Rt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),z.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Rt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var er=K.effect(),tr=K.effect(),rr=K.effect();function nr(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return or(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return or(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}function or(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function ir(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ar(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ir(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ir(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ur=s({effect:qe}),cr=s({effect:qe}),sr=s({effect:qe}),fr=h({source:Oe,timeout:500}),lr=s({effect:$e}),dr=s({effect:Je});function mr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function pr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?mr(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):mr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}oe.on(xe,(function(e,t){if(t.typing)return e[t.roomId]?ar(ar({},e),{},v({},t.roomId,[].concat(d(e[t.roomId]),[t]))):ar(ar({},e),{},v({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return ar(ar({},e),{},v({},t.roomId,d(r)))}return delete e[t.roomId],ar({},e)}})).reset(ye),Z.on(Re,(function(e,t){return t.roomId})).reset(te),ee.on(dr.doneData,(function(e,t){return t})).reset(te),re.on(er.doneData,(function(e,t){return t})).reset(Z),X.on(lr.doneData,(function(e,t){return t})).reset(Z),ne.on(tr.doneData,(function(e,t){return t})).reset(Z),ie.on(rr.doneData,(function(e,t){return t.kick})).reset(Z),ue.on(rr.doneData,(function(e,t){return t.ban})).reset(Z),ae.on(rr.doneData,(function(e,t){return t.invite})).reset(Z),ce.on(rr.doneData,(function(e,t){return t.defaultEvents})).reset(Z),se.on(rr.doneData,(function(e,t){return t.redact})).reset(Z),fe.on(rr.doneData,(function(e,t){return t.stateDefault})).reset(Z),c({from:qe.pending,to:Q}),c({from:Re,to:er}),c({from:ur.done,to:De}),c({from:f({source:re,clock:er.done,fn:function(){}}),to:Pe}),c({from:cr.done,to:je}),c({from:sr.done,to:Ae}),l({clock:Z,filter:Boolean,target:dr}),l({source:Z,filter:function(e){return Boolean(e)},target:Oe}),l({clock:ke,source:X,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:Oe}),l({clock:Ie,source:Z,filter:function(e,t){return e===t.roomId},target:Oe}),l({source:Z,clock:fr,filter:Boolean,target:lr}),l({source:f([Z,re],Ee,(function(e,t){var r=m(e,2),n=r[0],o=r[1],i=t.initialEventId,a=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:i,initialWindowSize:a,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:he,target:sr}),l({source:f([Z,re],Ce,(function(e,t){var r=m(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:he,target:cr}),l({source:f([Z,re],Se,(function(e){var t=m(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:he,target:ur}),l({clock:Z,filter:Boolean,target:[tr,rr]}),tr.use((function(e){var t=Rt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new _t;var o=r.getMember(n);if(!o)throw new _t;return o.powerLevel})),rr.use((function(e){var t,r,n,o,i,a,u=Rt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(i=u.state_default)&&void 0!==i?i:50,redact:null!==(a=u.redact)&&void 0!==a?a:50}})),$e.use((function(e){var t=Rt().getRoom(e);if(!t)throw new St;return t.getMembers().map((function(e){var t=Rt().getUser(e.userId);if(!t)throw new _t;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Kt(t),userId:e.userId}}(e,t)}))})),Ne.use((function(e){var t=Rt().getRoom(e);if(!t)throw new St;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),er.use(function(){var t=g(w.mark((function t(r){var n,o,i,a;return w.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.roomId,o=Rt(),i=Rt().getRoom(n)){t.next=5;break}throw new St;case 5:return a=i.getUnfilteredTimelineSet(),t.abrupt("return",new e.TimelineWindow(o,a));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),qe.use(function(){var r=g(w.mark((function r(n){var o,i,a,u,c,s,f,l;return w.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=n.timelineWindow,i=n.initialEventId,a=n.initialWindowSize,u=n.loadAdditionalDataDirection,o){r.next=3;break}throw new Ut;case 3:return r.next=5,o.load(i,a);case 5:if(c=o.canPaginate(t.Forward),s=qt(o),!(a&&s.length<a)){r.next=19;break}if(l=a-s.length,"BACKWARD"!==u){r.next=15;break}return r.next=12,o.paginate(e.EventTimeline.BACKWARDS,l);case 12:f=r.sent,r.next=18;break;case 15:return r.next=17,o.paginate(e.EventTimeline.FORWARDS,l);case 17:f=r.sent;case 18:f&&(s=qt(o));case 19:return r.abrupt("return",{messages:s,isLive:!c,canPaginateForward:c,canPaginateBackward:o.canPaginate(t.Backward)});case 20:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()),Me.use((function(e){if(!Rt())throw new Ct;return e.map((function(e){return Gt(e)}))})),Te.use(function(){var e=g(w.mark((function e(t){var o,i,a,u,c,s,f;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=t.term,i=t.roomId,a=t.orderBy,u=void 0===a?n.Rank:a,c=Rt().getRoom(i)){e.next=4;break}throw new St;case 4:return s={},e.next=7,Rt().search({body:{search_categories:{room_events:{search_term:o,keys:["content.body"],filter:{rooms:[i]},order_by:u}}}});case 7:return f=e.sent,e.abrupt("return",f.search_categories.room_events.results.map((function(e){var t=e.result,n=new r(t),o=n.getSender();return void 0===s[o]&&(s[o]=c.getMember(o)),n.sender=s[o],Lt(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),We.use((function(){return Rt().getUsers().map(Kt)})),Le.use(function(){var e=g(w.mark((function e(t){var r,n,o,i,a,u,c,s,f;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,i=t.initialState,a=void 0===i?[]:i,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:a.map((function(e){return ar(ar({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,Rt().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Fe.use(function(){var e=g(w.mark((function e(t){var r,n,o,i,a,u,c,s,f,l;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,i=void 0===o?[]:o,a=Rt(),d=void 0,d=Rt().getAccountData("m.direct").getContent(),u=d&&Object.values(d).flatMap((function(e){return e})),!(c=u.find((function(e){var t;return null===(t=a.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:c});case 6:return s={is_direct:!0,invite:[r.userId],visibility:y.private,initial_state:i.map((function(e){return ar(ar({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:a.getUserId()}},e.next=9,a.createRoom(s);case 9:return f=e.sent,l=f.room_id,e.next=13,Xt(l,r.userId);case 13:return e.abrupt("return",{roomId:l});case 14:case"end":return e.stop()}var d}),e)})));return function(t){return e.apply(this,arguments)}}()),ze.use(function(){var e=g(w.mark((function e(t){var r,n,o,i,a,u,c;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=t.usersIds,i=t.roomId,!(null===(r=Rt().getRoom(i).currentState.getStateEvents("m.room.create",""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect)){e.next=4;break}throw new Tt;case 4:a=nr(o),e.prev=5,a.s();case 7:if((u=a.n()).done){e.next=13;break}return c=u.value,e.next=11,Rt().invite(i,c);case 11:e.next=7;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(5),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[5,15,18,21]])})));return function(t){return e.apply(this,arguments)}}()),Ke.use(function(){var e=g(w.mark((function e(t){var r,n,o;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,Rt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ge.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,Rt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),He.use(function(){var e=g(w.mark((function e(t){var r,n,o,i,a;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,i=Rt(),e.next=4,i.joinRoom(r);case 4:if(a=e.sent,!o){e.next=8;break}return e.next=8,Xt(r);case 8:return e.abrupt("return",Gt(Ft(a)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Je.use((function(e){var t=Rt().getRoom(e);return t?Gt(Ft(t)):null})),Ye.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Rt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Be.use((function(e){var t,r=Rt(),n=null===(t=r.getAccountData("m.direct"))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new St;var i=r.getRoom(o);if(!i)throw new St;return Ft(i)})),Ve.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,Rt().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var vr=et.effect(),gr=s({source:[Z,re],effect:vr,mapParams:function(e,t){var r=m(t,2);return pr({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),wr=s({source:[Z,re],effect:vr,mapParams:function(e,t){var r=m(t,2);return pr({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),br=et.effect(),hr=l({source:f(Z,[qe.done,vr.done,br.done],(function(e,t){return pr({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),yr=Pt(),xr=s({effect:wr,mapParams:function(e){return{size:e.messages.length}}});tt.on(hr,(function(e,t){return t.messages})).reset(Z),$.on(hr,(function(e,t){return t.isLive})).reset(Z);var kr=u(he,lt,ft,Q,(function(e,t,r,n){return e&&!t&&!r&&!n}));lt.on(gr.pending,(function(e,t){return t})).reset(Z),ft.on(wr.pending,(function(e,t){return t})).reset(Z),dt.on(hr,(function(e,t){return t.canPaginateBackward})).reset([Ee,Z]),mt.on(hr,(function(e,t){return t.canPaginateForward})).reset([Ee,Z]),c({from:gr.done,to:at}),c({from:wr.done,to:ut}),l({source:st,filter:kr,target:gr}),l({source:ct,filter:kr,target:wr}),c({from:f(tt,xr.done,(function(e,t){return t.params.messages})),to:ot}),c({from:yr.map((function(e){return{messages:e}})),to:xr}),l({source:f([Z,re],rt,(function(e){var t=m(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:re.map((function(e){return Boolean(e)})),target:br}),pt.use(function(){var e=g(w.mark((function e(t){var r,n,o;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,Rt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),vt.use(function(){var e=g(w.mark((function e(t){var r,n,o,i;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,i=t.txnId,e.next=3,Rt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},i);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),gt.use(function(){var e=g(w.mark((function e(t){var r,n,o,i,a;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,i=o?{reason:o}:void 0,e.next=4,Rt().redactEvent(r,n,void 0,i);case 4:return a=e.sent,e.abrupt("return",{eventId:a.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),wt.use(function(){var e=g(w.mark((function e(t){var r,n,o,i;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=Rt().getRoom(r)){e.next=4;break}throw new St;case 4:if(i=o.findEventById(n)){e.next=7;break}throw new Et;case 7:return e.next=9,Rt().setRoomReadMarkers(r,n,i,{hidden:void 0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ht.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,i=e.rawResponse,a=e.type,u=Rt().uploadContent(t,{name:r,includeFilename:n,type:a,onlyContentUri:o,rawResponse:i,progressHandler:function(e){var r=e.loaded,n=e.total;it({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),yt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){Rt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),bt.use((function(e){var t=e.eventId,r=e.roomId,n=Rt();if(!n)throw new Ct;var i=n.getRoom(r);if(!i)throw new St;var a=i.findEventById(t);if(!a)throw new Et;var u=n.getUserId();if(!u)throw new Bt;var c=i.currentState.maySendRedactionForEvent(a,u)&&"m.room.server_acl"!==a.getType(),s=function(e){if(e.status===o.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var t=e.getOriginalContent(),r=t.msgtype;return("m.text"===r||"m.emote"===r)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===Rt().getUserId()}(a);return{canRedact:c,canEdit:s}})),br.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Forward);return{messages:qt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Backward)}})),vr.use(function(){var r=g(w.mark((function r(n){var o,i,a,u,c,s,f,l;return w.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=n.timelineWindow,i=n.direction,a=n.size,u=n.makeRequest,c=n.requestLimit,o){r.next=3;break}throw new Ut;case 3:return s="forward"===i?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS,r.next=6,o.paginate(s,a,u,c);case 6:return f=o.canPaginate(t.Forward),l=qt(o),r.abrupt("return",{messages:l,isLive:!f,canPaginateForward:f,canPaginateBackward:o.canPaginate(t.Backward)});case 9:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}());export{ve as $canBan,pe as $canInvite,me as $canKick,dt as $canPaginateBackward,mt as $canPaginateForward,we as $canRedact,ge as $canSendDefaultEvent,be as $canSetDefaultState,le as $currentJoinedRoomMembers,ee as $currentRoom,Z as $currentRoomId,de as $currentRoomInvitedMembers,X as $currentRoomMembers,$ as $isLive,he as $loadFilter,Q as $loadRoomFxPending,tt as $messages,ne as $myPowerLevel,lt as $paginateBackwardPending,ft as $paginateForwardPending,ue as $requiredPowerLevelForBan,ce as $requiredPowerLevelForDefaultEvents,fe as $requiredPowerLevelForDefaultState,ae as $requiredPowerLevelForInvite,ie as $requiredPowerLevelForKick,se as $requiredPowerLevelForRedact,re as $timelineWindow,oe as $typingMembers,H as DEFAULT_BAN_POWERLEVEL,G as DEFAULT_INVITE_POWERLEVEL,Y as DEFAULT_KICK_POWERLEVEL,V as DEFAULT_REDACT_POWERLEVEL,q as DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL,J as DEFAULT_SET_DEFAULT_STATE_POWERLEVEL,Xe as MatrixMembershipType,Qe as MsgType,x as Preset,y as Visibility,bt as checkEventPermissionsFx,te as clearCurrentRoomState,ye as clearTypingMember,Rt as client,Ot as createClient,B as createClientFx,Fe as createDirectRoomFx,P as createOnSyncThrottled,Le as createRoomFx,Pt as createRoomMessageBatch,gt as deleteMessageFx,z as deleteNotificationRuleFx,It as destroyClient,T as destroyClientFx,Ue as directRoomCreated,vt as editMessageFx,Be as findDirectRoomByUserIdFx,We as getAllUsersFx,C as getLoggedUserFx,$e as getMembersByRoomIdFx,W as getNotificationRulesFx,M as getProfileInfoFx,Je as getRoomByIdFx,Ne as getRoomInfoFx,Vt as getRoomMemberAvatarUrl,Oe as getRoomMembers,Me as getRoomsWithActivitiesFx,Jt as getSenderAvatarUrl,Qt as getUploadCredentials,yt as getUrlPreviewFx,Re as initRoom,E as initStoreFx,ze as inviteUsersFx,He as joinRoomFx,Ke as kickUserRoomFx,Ye as leaveRoomFx,De as liveTimelineLoaded,Ee as loadRoom,qe as loadRoomFx,Ce as loadRoomMessage,je as loadRoomMessageDone,j as loginByPasswordFx,A as loginByTokenFx,_ as logoutFx,$t as mxcUrlToHttp,ot as newMessagesLoaded,R as onCachedState,Dt as onClientEvent,O as onInitialSync,at as onPaginateBackwardDone,ut as onPaginateForwardDone,Pe as onRoomInitialized,Ae as onRoomLoaded,Ie as onRoomMemberUpdate,ke as onRoomUserUpdate,D as onSync,it as onUploadProgress,st as paginateBackward,ct as paginateForward,wt as readAllMessagesFx,Ge as renameRoomFx,_e as roomCreated,nt as roomMessage,Te as searchRoomMessagesFx,pt as sendMessageFx,Ve as sendTypingFx,L as setNotificationRuleActionFx,F as setNotificationRuleEnabledFx,S as startClientFx,U as stopClientFx,Se as toLiveTimeline,xe as toggleTypingUser,rt as updateMessages,ht as uploadContentFx};
//# sourceMappingURL=index.js.map
