!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("patronum/throttle"),require("effector"),require("@babel/runtime/helpers/toConsumableArray"),require("@babel/runtime/helpers/slicedToArray"),require("@42px/effector-extra"),require("@babel/runtime/helpers/defineProperty"),require("@babel/runtime/helpers/asyncToGenerator"),require("@babel/runtime/regenerator"),require("@42px/custom-errors"),require("patronum/debounce"),require("patronum")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","patronum/throttle","effector","@babel/runtime/helpers/toConsumableArray","@babel/runtime/helpers/slicedToArray","@42px/effector-extra","@babel/runtime/helpers/defineProperty","@babel/runtime/helpers/asyncToGenerator","@babel/runtime/regenerator","@42px/custom-errors","patronum/debounce","patronum"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.throttle,e.effector,e._toConsumableArray,e._slicedToArray,e.effectorExtra,e._defineProperty,e._asyncToGenerator,e._regeneratorRuntime,e.customErrors,e.debounce,e.patronum)}(this,(function(e,t,r,n,o,a,i,u,c,s,f,l,d){"use strict";function m(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var p,v,g,b,w=m(t),h=m(o),y=m(a),x=m(u),R=m(c),E=m(s),I=n.createDomain("root"),k=I.domain("app"),P=k.event(),D=k.event(),O=k.event(),C=k.effect(),A=k.effect(),T=k.effect(),U=k.effect(),F=k.effect(),S=k.effect(),M=k.effect(),j=k.effect(),L=k.effect(),_=k.effect(),B=I.domain("notification"),N=B.effect(),W=B.effect(),$=B.effect(),q=B.effect();e.MsgType=void 0,(p=e.MsgType||(e.MsgType={})).Audio="m.audio",p.BadEncrypted="m.bad.encrypted",p.Emote="m.emote",p.File="m.file",p.Image="m.image",p.Notice="m.notice",p.Text="m.text",p.Video="m.video",p.Location="m.location",e.Presence=void 0,(v=e.Presence||(e.Presence={})).online="online",v.offline="offline",v.unavailable="unavailable",e.MatrixMembershipType=void 0,(g=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",g.invite="invite",g.ban="ban",g.join="join",g.knock="knock",e.UserRole=void 0,(b=e.UserRole||(e.UserRole={})).admin="Admin",b.moderator="Moderator";var K,V,z=I.domain("room"),H=z.store(null),G=z.store(!1),J=z.store(null),Y=z.store(null),Q=z.store(null),X=z.event(),Z=z.store(null),ee=z.store(0),te=z.store({}),re=z.store(50),ne=z.store(50),oe=z.store(50),ae=z.store(0),ie=z.store(50),ue=z.store(50),ce=J.map((function(t){var r;return null!==(r=null==t?void 0:t.filter((function(t){return t.membership===e.MatrixMembershipType.join})))&&void 0!==r?r:[]})),se=J.map((function(t){var r;return null!==(r=null==t?void 0:t.filter((function(t){return t.membership===e.MatrixMembershipType.invite})))&&void 0!==r?r:[]})),fe=n.combine(ee,re,(function(e,t){return e>=t})),le=n.combine(ee,ne,(function(e,t){return e>=t})),de=n.combine(ee,oe,(function(e,t){return e>=t})),me=n.combine(ee,ae,(function(e,t){return e>=t})),pe=n.combine(ee,ie,(function(e,t){return e>=t})),ve=n.combine(ee,ue,(function(e,t){return e>=t})),ge=n.combine(Y,Z,(function(e,t){return Boolean(e)&&Boolean(t)})),be=z.event(),we=z.event(),he=z.event(),ye=z.event(),xe=z.event(),Re=z.event(),Ee=z.event(),Ie=z.event(),ke=z.event(),Pe=z.event(),De=z.event(),Oe=z.event(),Ce=z.event(),Ae=z.event(),Te=z.event(),Ue=z.effect(),Fe=z.effect(),Se=z.effect(),Me=z.effect(),je=z.effect(),Le=z.effect(),_e=z.effect(),Be=z.effect(),Ne=z.effect(),We=z.effect(),$e=z.effect(),qe=z.effect(),Ke=z.effect(),Ve=z.effect(),ze=z.effect(),He=z.effect(),Ge=z.effect();e.Visibility=void 0,(K=e.Visibility||(e.Visibility={})).public="public",K.private="private",e.Preset=void 0,(V=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",V.privateChat="private_chat",V.publicChat="public_chat";var Je,Ye=I.domain("messages"),Qe=Ye.store([]),Xe=Ye.event(),Ze=Ye.event(),et=Ye.event(),tt=Ye.event(),rt=Ye.event(),nt=Ye.event(),ot=Ye.event(),at=Ye.event(),it=Ye.store(!1),ut=Ye.store(!1),ct=Ye.store(!0),st=Ye.store(!0),ft=Ye.effect(),lt=Ye.effect(),dt=Ye.effect(),mt=Ye.effect(),pt=Ye.effect(),vt=Ye.effect(),gt=Ye.effect(),bt=I.domain("profile"),wt=bt.effect(),ht=bt.effect(),yt=500,xt=[],Rt=function(){Je&&(Je.removeAllListeners(),Je=null)},Et=function(e){var t=e.options,r=e.messageBatchInterval;Rt(),void 0!==r&&(yt=r),Je=w.default.createClient(t),xt.forEach((function(e){var t=y.default(e,2),r=t[0],n=t[1];Je.on(r,n)}))},It=function(){return Je},kt=function(e){xt.push.apply(xt,h.default(e))},Pt=function(){return i.batchEvents(Ze,yt)},Dt=f.createCustomError("EventNotFound"),Ot=f.createCustomError("RoomNotFound"),Ct=f.createCustomError("ClientNotInitialized"),At=f.createCustomError("TimelineWindowUndefined"),Tt=f.createCustomError("UserNotFound"),Ut=f.createCustomError("UserNotLoggedIn"),Ft=f.createCustomError("CantInviteUsers"),St=f.createCustomError("NotEnoughPermissions"),Mt="m.room.message",jt="m.room.redaction",Lt="m.direct";function _t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Bt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_t(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Nt=function(e,t,r){return e.seen=r.getJoinedMembers().some((function(n){return n.userId!==t&&r.hasUserReadEvent(n.userId,e.originalEventId)})),e},Wt=function(e){return e.getContent()};function $t(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Wt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function qt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Kt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push($t(t)),e}var Vt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function zt(e){var r,n,o,a,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,u=It(),c=u.getRoom(e.roomId);if(!c)throw new Ot;for(var s=c.getLiveTimeline().getEvents(),f=c.currentState.getStateEvents(t.EventType.RoomPowerLevels,"").getContent(),l=Boolean(null===(r=c.currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect),d=0,m=s.length-1;m>=0&&m!==s.length-i;m--){var p=s[m],v=c.hasUserReadEvent(u.getUserId(),p.getId());if(v)break;d+=1}var g=s.filter((function(e){return[Mt,jt].includes(e.getType())})),b=g[g.length-1],w=b?$t(b):void 0,h=u.getUserId();w&&(w.sender.userId!==h?w.seen=c.hasUserReadEvent(h,w.originalEventId):w=Nt(w,h,c));var y=l?c.getMember(c.guessDMUserId()):null,x=null!==(o=f.users[h])&&void 0!==o?o:0;return Bt(Bt({},e),{},{unreadCount:d,lastMessage:w,isDirect:l,directUserId:null==y?void 0:y.userId,isOnline:y?Boolean(null===(a=y.user)||void 0===a?void 0:a.currentlyActive):void 0,lastActivityTS:c.getLastActiveTimestamp(),powerlevels:f,myPowerLevel:x,canBan:x>=f.ban,canKick:x>=f.kick,canInvite:x>=f.invite,canRedact:x>=f.redact,canSendEvents:{canChangeHistoryVisivility:x>=f.events[t.EventType.RoomHistoryVisibility],canChangeRoomAvatar:x>=f.events[t.EventType.RoomAvatar],canChangeRoomName:x>=f.events[t.EventType.RoomName],canChangeRoomPowerLevels:x>=f.events[t.EventType.RoomPowerLevels],canChangeCanonicalAlias:x>=f.events[t.EventType.RoomCanonicalAlias],canChangeRoomEncryption:x>=f.events[t.EventType.RoomEncryption],canChangeRoomServerAcl:x>=f.events[t.EventType.RoomServerAcl],canChangeRoomTobstone:x>=f.events[t.EventType.RoomTombstone]}})}function Ht(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Gt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ht(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ht(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Jt(e){var t=e.getEvents().filter((function(e){return[Mt,jt].includes(e.getType())})).reduce(Kt,[]),r=It(),n=e.getEvents()[0].getRoomId(),o=r.getRoom(n);if(!o)throw new Ot;for(var a=[],i=[],u=r.getUserId(),c=!1,s=!1,f=t.length-1;f>=0;f--)t[f].sender.userId===u?a.push(t[f]):i.push(t[f]);return a.forEach((function(e){s?e.seen=!0:(e=Nt(e,u,o),s=Boolean(e.seen))})),i.forEach((function(e){c?e.seen=!0:(e.seen=o.hasUserReadEvent(u,e.originalEventId),c=e.seen)})),t}var Yt=function(){var e=R.default(E.default.mark((function e(r,n){var o,a,i,u,c,s;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=It(),i=a.getRoom(r).currentState.getStateEvents(t.EventType.RoomCreate,"").getContent(),u=i.creator,c=a.getAccountData(Lt).getContent(),s=null!==(o=c[u])&&void 0!==o?o:[],!n){e.next=8;break}return e.next=7,a.setAccountData(Lt,Gt(Gt({},c),{},x.default({},n,[r])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,a.setAccountData(Lt,Gt(Gt({},c),{},x.default({},u,[].concat(h.default(s),[r]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function Qt(){return It().getRooms().map(qt)}n.forward({from:C.done.map((function(){return{initialSyncLimit:20}})),to:U}),kt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==Mt&&a!==jt||!r&&o.liveEvent&&Ze($t(e))}],["Room",function(e){var r,n,o=It(),a=e.getMember(o.getUserId());a&&"invite"!==a.membership||(Boolean(null===(r=e.currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect)?Ae(e):Te(e))}],["Room.localEchoUpdated",function(){return Xe()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t){if("SYNCING"===e&&"SYNCING"===t){var r=Qt();return Xe(),void O(r)}}else{var n=Qt();P(n)}else{var o=Qt();D(o)}}],["RoomState.members",function(e,t,r){return ye(r)}],["RoomState.newMember",function(e,t,r){return ye(r)}],["RoomMember.membership",function(e,t){return ye(t)}],["RoomMember.name",function(e,t){return ye(t)}],["RoomMember.powerLevel",function(e,t){return ye(t)}],["RoomMember.typing",function(e,t){ye(t),we(t)}],["User.avatarUrl",function(e,t){return he(t)}],["User.presence",function(e,t){return he(t)}],["User.displayName",function(e,t){return he(t)}]]),C.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,It().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),A.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i,u;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),T.use(R.default(E.default.mark((function e(){var t,r;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=It(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),U.use((function(e){return It().startClient(e)})),M.use(R.default(E.default.mark((function e(){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,It().logout();case 2:case"end":return e.stop()}}),e)})))),S.use((function(){return It().stopClient()})),F.use(R.default(E.default.mark((function e(){var t,r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=It()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Vt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),j.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,Et(r),o=It(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,It().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),L.use(R.default(E.default.mark((function e(){var t,r;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=It()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),Rt();case 9:case"end":return e.stop()}}),e)})))),_.use(function(){var e=R.default(E.default.mark((function e(t){var r,n;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=It(),n=r.getUser(t)){e.next=4;break}throw new Tt;case 4:return e.abrupt("return",Vt(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),N.use((function(){return It().getPushRules()})),W.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,It().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),$.use(function(){var e=R.default(E.default.mark((function e(t){var r;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,It().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,It().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),q.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,It().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),wt.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,It().setDisplayName(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ht.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,It().setAvatarUrl(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Xt=z.effect(),Zt=z.effect(),er=z.effect();function tr(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return rr(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return rr(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){u=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw a}}}}function rr(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function nr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function or(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?nr(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):nr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ar=n.attach({effect:Ve}),ir=n.attach({effect:Ve}),ur=n.attach({effect:Ve}),cr=l.debounce({source:xe,timeout:500}),sr=n.attach({effect:Ge}),fr=n.attach({effect:ze});function lr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function dr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?lr(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):lr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}te.on(we,(function(e,t){if(t.typing)return e[t.roomId]?or(or({},e),{},x.default({},t.roomId,[].concat(h.default(e[t.roomId]),[t]))):or(or({},e),{},x.default({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return or(or({},e),{},x.default({},t.roomId,h.default(r)))}return delete e[t.roomId],or({},e)}})).reset(be),Y.on(Re,(function(e,t){return t.roomId})).reset(X),Q.on(fr.doneData,(function(e,t){return t})).reset(X),Z.on(Xt.doneData,(function(e,t){return t})).reset(Y),J.on(sr.doneData,(function(e,t){return t})).reset(Y),ee.on(Zt.doneData,(function(e,t){return t})).reset(Y),re.on(er.doneData,(function(e,t){return t.kick})).reset(Y),oe.on(er.doneData,(function(e,t){return t.ban})).reset(Y),ne.on(er.doneData,(function(e,t){return t.invite})).reset(Y),ae.on(er.doneData,(function(e,t){return t.defaultEvents})).reset(Y),ie.on(er.doneData,(function(e,t){return t.redact})).reset(Y),ue.on(er.doneData,(function(e,t){return t.stateDefault})).reset(Y),n.forward({from:Ve.pending,to:G}),n.forward({from:Re,to:Xt}),n.forward({from:ar.done,to:Ee}),n.forward({from:n.sample({source:Z,clock:Xt.done,fn:function(){}}),to:Ie}),n.forward({from:ir.done,to:ke}),n.forward({from:ur.done,to:Pe}),n.guard({clock:Y,filter:Boolean,target:fr}),n.guard({source:Y,filter:function(e){return Boolean(e)},target:xe}),n.guard({clock:he,source:J,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:xe}),n.guard({clock:ye,source:Y,filter:function(e,t){return e===t.roomId},target:xe}),n.guard({source:Y,clock:cr,filter:Boolean,target:sr}),n.guard({source:n.sample([Y,Z],De,(function(e,t){var r=y.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:ge,target:ur}),n.guard({source:n.sample([Y,Z],Ce,(function(e,t){var r=y.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:ge,target:ir}),n.guard({source:n.sample([Y,Z],Oe,(function(e){var t=y.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:ge,target:ar}),n.guard({clock:Y,filter:Boolean,target:[Zt,er]}),Zt.use((function(e){var t=It(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new Tt;var o=r.getMember(n);if(!o)throw new Tt;return o.powerLevel})),er.use((function(e){var t,r,n,o,a,i,u=It().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Ge.use((function(t){var r=It().getRoom(t);if(!r)throw new Ot;return r.getMembers().map((function(t){var r=It().getUser(t.userId);if(!r)throw new Tt;return function(t,r){var n=void 0;return 100===t.powerLevel?n=e.UserRole.admin:50===t.powerLevel&&(n=e.UserRole.moderator),{membership:t.membership,name:t.name,powerLevel:t.powerLevel,powerLevelNorm:t.powerLevelNorm,rawDisplayName:t.rawDisplayName,roomId:t.roomId,typing:t.typing,user:Vt(r),userId:t.userId,role:n}}(t,r)}))})),Me.use((function(e){var t=It().getRoom(e);if(!t)throw new Ot;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Xt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=It(),o=It().getRoom(r)){e.next=5;break}throw new Ot;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new w.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ve.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s,f;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new At;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=Jt(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(w.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(w.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=Jt(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Se.use((function(e){if(!It())throw new Ct;return e.map((function(e){return zt(e)}))})),Fe.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=It().getRoom(o)){e.next=4;break}throw new Ot;case 4:return c={},e.next=7,It().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],$t(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use((function(){return It().getUsers().map(Vt)})),Le.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return or(or({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,It().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var t=R.default(E.default.mark((function t(r){var n,o,a,i,u,c,s,f,l,d,m,p;return E.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=r.user,i=r.preset,u=r.initialState,c=void 0===u?[]:u,s=It(),f=null===(n=s.getAccountData(Lt))||void 0===n?void 0:n.getContent(),!(l=null===(o=f[a.userId])||void 0===o?void 0:o[0])){t.next=6;break}return t.abrupt("return",{roomId:l});case 6:return d={is_direct:!0,invite:[a.userId],visibility:e.Visibility.private,initial_state:c.map((function(e){return or(or({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:i,creation_content:{isDirect:!0,creator:s.getUserId()}},t.next=9,s.createRoom(d);case 9:return m=t.sent,p=m.room_id,t.next=13,Yt(p,a.userId);case 13:return t.abrupt("return",{roomId:p});case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Be.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.userId,i=r.roomId,!(null===(n=It().getRoom(i).currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===n||null===(o=n.getContent())||void 0===o?void 0:o.isDirect)){e.next=4;break}throw new Ft("Can't invite users into a direct room");case 4:return e.prev=4,e.next=7,It().invite(i,a);case 7:e.next=13;break;case 9:if(e.prev=9,e.t0=e.catch(4),403!==e.t0.httpStatus){e.next=13;break}throw new St("Not enough permissions to invite users");case 13:case"end":return e.stop()}}),e,null,[[4,9]])})));return function(t){return e.apply(this,arguments)}}()),Ne.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.usersIds,i=r.roomId,!(null===(n=It().getRoom(i).currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===n||null===(o=n.getContent())||void 0===o?void 0:o.isDirect)){e.next=4;break}throw new Ft("Can't invite users into a direct room");case 4:u=tr(a),e.prev=5,u.s();case 7:if((c=u.n()).done){e.next=20;break}return s=c.value,e.prev=9,e.next=12,It().invite(i,s);case 12:e.next=18;break;case 14:if(e.prev=14,e.t0=e.catch(9),403!==e.t0.httpStatus){e.next=18;break}throw new St;case 18:e.next=7;break;case 20:e.next=25;break;case 22:e.prev=22,e.t1=e.catch(5),u.e(e.t1);case 25:return e.prev=25,u.f(),e.finish(25);case 28:case"end":return e.stop()}}),e,null,[[5,22,25,28],[9,14]])})));return function(t){return e.apply(this,arguments)}}()),We.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,It().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$e.use(function(){var e=R.default(E.default.mark((function e(t){var r,n;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,It().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),qe.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=It(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Yt(r);case 8:return e.abrupt("return",zt(qt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ze.use((function(e){var t=It().getRoom(e);return t?zt(qt(t)):null})),Ke.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,It().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ue.use((function(e){var t,r,n=It(),o=null===(r=(null===(t=n.getAccountData(Lt))||void 0===t?void 0:t.getContent())[e])||void 0===r?void 0:r[0];if(!o)throw new Ot;var a=n.getRoom(o);if(!a)throw new Ot;return qt(a)})),He.use(function(){var e=R.default(E.default.mark((function e(t){var r,n;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,It().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var mr=Ye.effect(),pr=n.attach({source:[Y,Z],effect:mr,mapParams:function(e,t){var r=y.default(t,2);return dr({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),vr=n.attach({source:[Y,Z],effect:mr,mapParams:function(e,t){var r=y.default(t,2);return dr({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),gr=Ye.effect(),br=n.guard({source:n.sample(Y,[Ve.done,mr.done,gr.done],(function(e,t){return dr({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),wr=Pt(),hr=n.attach({effect:vr,mapParams:function(e){return{size:e.messages.length}}});Qe.on(br,(function(e,t){return t.messages})).reset(Y),H.on(br,(function(e,t){return t.isLive})).reset(Y);var yr=n.combine(ge,ut,it,G,(function(e,t,r,n){return e&&!t&&!r&&!n}));ut.on(pr.pending,(function(e,t){return t})).reset(Y),it.on(vr.pending,(function(e,t){return t})).reset(Y),ct.on(br,(function(e,t){return t.canPaginateBackward})).reset([De,Y]),st.on(br,(function(e,t){return t.canPaginateForward})).reset([De,Y]),n.forward({from:pr.done,to:rt}),n.forward({from:vr.done,to:nt}),n.guard({source:at,filter:yr,target:pr}),n.guard({source:ot,filter:yr,target:vr}),n.forward({from:n.sample(Qe,hr.done,(function(e,t){return t.params.messages})),to:et}),n.forward({from:wr.map((function(e){return{messages:e}})),to:hr}),n.guard({source:n.sample([Y,Z],d.throttle({source:Xe,timeout:800}),(function(e){var t=y.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:Z.map((function(e){return Boolean(e)})),target:gr}),n.sample({clock:d.debounce({source:ft.done,timeout:500}),fn:function(e){var t=e.params,r=e.result;return{roomId:t.roomId,eventId:r.event_id}},target:mt}),ft.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,It().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),lt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,It().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),dt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,It().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),mt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=It().getRoom(r)){e.next=4;break}throw new Ot;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new Dt;case 7:return e.next=9,It().setRoomReadMarkers(r,n,a,{hidden:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),vt.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=It().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;tt({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),gt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){It().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),pt.use((function(e){var r=e.eventId,n=e.roomId,o=It();if(!o)throw new Ct;var a=o.getRoom(n);if(!a)throw new Ot;var i=a.findEventById(r);if(!i)throw new Dt;var u=o.getUserId();if(!u)throw new Ut;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===It().getUserId()}(i);return{canRedact:c,canEdit:s}})),gr.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:Jt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}})),mr.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s,f;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new At;case 3:return c="forward"===o?w.default.EventTimeline.FORWARDS:w.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=Jt(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=de,e.$canInvite=le,e.$canKick=fe,e.$canPaginateBackward=ct,e.$canPaginateForward=st,e.$canRedact=pe,e.$canSendDefaultEvent=me,e.$canSetDefaultState=ve,e.$currentJoinedRoomMembers=ce,e.$currentRoom=Q,e.$currentRoomId=Y,e.$currentRoomInvitedMembers=se,e.$currentRoomMembers=J,e.$isLive=H,e.$loadFilter=ge,e.$loadRoomFxPending=G,e.$messages=Qe,e.$myPowerLevel=ee,e.$paginateBackwardPending=ut,e.$paginateForwardPending=it,e.$requiredPowerLevelForBan=oe,e.$requiredPowerLevelForDefaultEvents=ae,e.$requiredPowerLevelForDefaultState=ue,e.$requiredPowerLevelForInvite=ne,e.$requiredPowerLevelForKick=re,e.$requiredPowerLevelForRedact=ie,e.$timelineWindow=Z,e.$typingMembers=te,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=pt,e.clearCurrentRoomState=X,e.clearTypingMember=be,e.client=It,e.createClient=Et,e.createClientFx=j,e.createDirectRoomFx=_e,e.createOnSyncThrottled=function(e){return r.throttle({source:O,timeout:e})},e.createRoomFx=Le,e.createRoomMessageBatch=Pt,e.deleteMessageFx=dt,e.deleteNotificationRuleFx=q,e.destroyClient=Rt,e.destroyClientFx=L,e.directRoomCreated=Ae,e.editMessageFx=lt,e.findDirectRoomByUserIdFx=Ue,e.getAllUsersFx=je,e.getLoggedUserFx=F,e.getMembersByRoomIdFx=Ge,e.getNotificationRulesFx=N,e.getProfileInfoFx=_,e.getRoomByIdFx=ze,e.getRoomInfoFx=Me,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=It().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(It().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomMembers=xe,e.getRoomsWithActivitiesFx=Se,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(It().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(It().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(It().getAccessToken())}}},e.getUrlPreviewFx=gt,e.initRoom=Re,e.initStoreFx=T,e.inviteUserFx=Be,e.inviteUsersFx=Ne,e.joinRoomFx=qe,e.kickUserRoomFx=We,e.leaveRoomFx=Ke,e.liveTimelineLoaded=Ee,e.loadRoom=De,e.loadRoomFx=Ve,e.loadRoomMessage=Ce,e.loadRoomMessageDone=ke,e.loginByPasswordFx=C,e.loginByTokenFx=A,e.logoutFx=M,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return It().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=et,e.onCachedState=D,e.onClientEvent=kt,e.onInitialSync=P,e.onPaginateBackwardDone=rt,e.onPaginateForwardDone=nt,e.onRoomInitialized=Ie,e.onRoomLoaded=Pe,e.onRoomMemberUpdate=ye,e.onRoomUserUpdate=he,e.onSync=O,e.onUploadProgress=tt,e.paginateBackward=at,e.paginateForward=ot,e.readAllMessagesFx=mt,e.renameRoomFx=$e,e.roomCreated=Te,e.roomMessage=Ze,e.searchRoomMessagesFx=Fe,e.sendMessageFx=ft,e.sendTypingFx=He,e.setNotificationRuleActionFx=W,e.setNotificationRuleEnabledFx=$,e.startClientFx=U,e.stopClientFx=S,e.toLiveTimeline=Oe,e.toggleTypingUser=we,e.updateAvatarUrlFx=ht,e.updateDisplayNameFx=wt,e.updateMessages=Xe,e.uploadContentFx=vt,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
