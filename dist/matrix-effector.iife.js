var MatrixEffector=function(e,t,r,n,o,a,i,u,c,s,f,l,d){"use strict";function m(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var v,p,g,w,b=m(t),h=m(o),y=m(a),x=m(u),R=m(c),E=m(s),I=n.createDomain("root"),k=I.domain("app"),P=k.event(),D=k.event(),O=k.event(),C=k.effect(),A=k.effect(),U=k.effect(),F=k.effect(),S=k.effect(),T=k.effect(),M=k.effect(),L=k.effect(),j=k.effect(),_=k.effect(),B=I.domain("notification"),N=B.effect(),W=B.effect(),$=B.effect(),K=B.effect();e.MsgType=void 0,(v=e.MsgType||(e.MsgType={})).Audio="m.audio",v.BadEncrypted="m.bad.encrypted",v.Emote="m.emote",v.File="m.file",v.Image="m.image",v.Notice="m.notice",v.Text="m.text",v.Video="m.video",v.Location="m.location",e.Presence=void 0,(p=e.Presence||(e.Presence={})).online="online",p.offline="offline",p.unavailable="unavailable",e.MatrixMembershipType=void 0,(g=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",g.invite="invite",g.ban="ban",g.join="join",g.knock="knock",e.UserRole=void 0,(w=e.UserRole||(e.UserRole={})).admin="Admin",w.moderator="Moderator";var V,z,q=I.domain("room"),H=q.store(null),G=q.store(!1),J=q.store(null),Y=q.store(null),Q=q.store(null),X=q.event(),Z=q.store(null),ee=q.store(0),te=q.store({}),re=q.store(50),ne=q.store(50),oe=q.store(50),ae=q.store(0),ie=q.store(50),ue=q.store(50),ce=J.map((function(t){var r;return null!==(r=null==t?void 0:t.filter((function(t){return t.membership===e.MatrixMembershipType.join})))&&void 0!==r?r:[]})),se=J.map((function(t){var r;return null!==(r=null==t?void 0:t.filter((function(t){return t.membership===e.MatrixMembershipType.invite})))&&void 0!==r?r:[]})),fe=n.combine(ee,re,(function(e,t){return e>=t})),le=n.combine(ee,ne,(function(e,t){return e>=t})),de=n.combine(ee,oe,(function(e,t){return e>=t})),me=n.combine(ee,ae,(function(e,t){return e>=t})),ve=n.combine(ee,ie,(function(e,t){return e>=t})),pe=n.combine(ee,ue,(function(e,t){return e>=t})),ge=n.combine(Y,Z,(function(e,t){return Boolean(e)&&Boolean(t)})),we=q.event(),be=q.event(),he=q.event(),ye=q.event(),xe=q.event(),Re=q.event(),Ee=q.event(),Ie=q.event(),ke=q.event(),Pe=q.event(),De=q.event(),Oe=q.event(),Ce=q.event(),Ae=q.event(),Ue=q.event(),Fe=q.effect(),Se=q.effect(),Te=q.effect(),Me=q.effect(),Le=q.effect(),je=q.effect(),_e=q.effect(),Be=q.effect(),Ne=q.effect(),We=q.effect(),$e=q.effect(),Ke=q.effect(),Ve=q.effect(),ze=q.effect(),qe=q.effect(),He=q.effect(),Ge=q.effect();e.Visibility=void 0,(V=e.Visibility||(e.Visibility={})).public="public",V.private="private",e.Preset=void 0,(z=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",z.privateChat="private_chat",z.publicChat="public_chat";var Je,Ye=I.domain("messages"),Qe=Ye.store([]),Xe=Ye.store(null),Ze=Ye.event(),et=Ye.event(),tt=Ye.event(),rt=Ye.event(),nt=Ye.event(),ot=Ye.event(),at=Ye.event(),it=Ye.event(),ut=Ye.store(!1),ct=Ye.store(!1),st=Ye.store(!0),ft=Ye.store(!0),lt=Ye.effect(),dt=Ye.effect(),mt=Ye.effect(),vt=Ye.effect(),pt=Ye.effect(),gt=Ye.effect(),wt=Ye.effect(),bt=I.domain("profile"),ht=bt.effect(),yt=bt.effect(),xt=500,Rt=[],Et=function(){Je&&(Je.removeAllListeners(),Je=null)},It=function(e){var t=e.options,r=e.messageBatchInterval;Et(),void 0!==r&&(xt=r),Je=b.default.createClient(t),Rt.forEach((function(e){var t=y.default(e,2),r=t[0],n=t[1];Je.on(r,n)}))},kt=function(){return Je},Pt=function(e){Rt.push.apply(Rt,h.default(e))},Dt=function(){return i.batchEvents(et,xt)},Ot=f.createCustomError("EventNotFound"),Ct=f.createCustomError("RoomNotFound"),At=f.createCustomError("ClientNotInitialized"),Ut=f.createCustomError("TimelineWindowUndefined"),Ft=f.createCustomError("UserNotFound"),St=f.createCustomError("UserNotLoggedIn"),Tt=f.createCustomError("CantInviteUsers"),Mt=f.createCustomError("NotEnoughPermissions"),Lt="m.room.message",jt="m.room.redaction",_t="m.direct";function Bt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Nt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Bt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Bt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Wt=function(e,t,r){return e.seen=r.getJoinedMembers().some((function(n){return n.userId!==t&&r.hasUserReadEvent(n.userId,e.originalEventId)})),e},$t=function(e){return e.getContent()};function Kt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:$t(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Vt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function zt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Kt(t)),e}var qt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Ht(e){var r,n,o,a,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,u=kt(),c=u.getRoom(e.roomId);if(!c)throw new Ct;for(var s=c.getLiveTimeline().getEvents(),f=c.currentState.getStateEvents(t.EventType.RoomPowerLevels,"").getContent(),l=Boolean(null===(r=c.currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect),d=0,m=s.length-1;m>=0&&m!==s.length-i;m--){var v=s[m],p=c.hasUserReadEvent(u.getUserId(),v.getId());if(p)break;d+=1}var g=s.filter((function(e){return[Lt,jt].includes(e.getType())})),w=g[g.length-1],b=w?Kt(w):void 0,h=u.getUserId();b&&(b.sender.userId!==h?b.seen=c.hasUserReadEvent(h,b.originalEventId):b=Wt(b,h,c));var y=l?c.getMember(c.guessDMUserId()):null,x=null!==(o=f.users[h])&&void 0!==o?o:0;return Nt(Nt({},e),{},{unreadCount:d,lastMessage:b,isDirect:l,directUserId:null==y?void 0:y.userId,isOnline:y?Boolean(null===(a=y.user)||void 0===a?void 0:a.currentlyActive):void 0,lastActivityTS:c.getLastActiveTimestamp(),powerlevels:f,myPowerLevel:x,canBan:x>=f.ban,canKick:x>=f.kick,canInvite:x>=f.invite,canRedact:x>=f.redact,canSendEvents:{canChangeHistoryVisivility:x>=f.events[t.EventType.RoomHistoryVisibility],canChangeRoomAvatar:x>=f.events[t.EventType.RoomAvatar],canChangeRoomName:x>=f.events[t.EventType.RoomName],canChangeRoomPowerLevels:x>=f.events[t.EventType.RoomPowerLevels],canChangeCanonicalAlias:x>=f.events[t.EventType.RoomCanonicalAlias],canChangeRoomEncryption:x>=f.events[t.EventType.RoomEncryption],canChangeRoomServerAcl:x>=f.events[t.EventType.RoomServerAcl],canChangeRoomTobstone:x>=f.events[t.EventType.RoomTombstone]}})}function Gt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Jt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Gt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Gt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Yt(e){var t=e.getEvents().filter((function(e){return[Lt,jt].includes(e.getType())})).reduce(zt,[]),r=kt(),n=e.getEvents()[0].getRoomId(),o=r.getRoom(n);if(!o)throw new Ct;for(var a=[],i=[],u=r.getUserId(),c=!1,s=!1,f=t.length-1;f>=0;f--)t[f].sender.userId===u?a.push(t[f]):i.push(t[f]);return a.forEach((function(e){s?e.seen=!0:(e=Wt(e,u,o),s=Boolean(e.seen))})),i.forEach((function(e){c?e.seen=!0:(e.seen=o.hasUserReadEvent(u,e.originalEventId),c=e.seen)})),t}var Qt=function(){var e=R.default(E.default.mark((function e(r,n){var o,a,i,u,c,s;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=kt(),i=a.getRoom(r).currentState.getStateEvents(t.EventType.RoomCreate,"").getContent(),u=i.creator,c=a.getAccountData(_t).getContent(),s=null!==(o=c[u])&&void 0!==o?o:[],!n){e.next=8;break}return e.next=7,a.setAccountData(_t,Jt(Jt({},c),{},x.default({},n,[r])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,a.setAccountData(_t,Jt(Jt({},c),{},x.default({},u,[].concat(h.default(s),[r]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function Xt(){return kt().getRooms().map(Vt)}n.forward({from:C.done.map((function(){return{initialSyncLimit:20}})),to:F}),Pt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==Lt&&a!==jt||!r&&o.liveEvent&&et(Kt(e))}],["Room",function(e){var r,n,o=kt(),a=e.getMember(o.getUserId());a&&"invite"!==a.membership||(Boolean(null===(r=e.currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect)?Ae(e):Ue(e))}],["Room.localEchoUpdated",function(){return Ze()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t){if("SYNCING"===e&&"SYNCING"===t){var r=Xt();return Ze(),void O(r)}}else{var n=Xt();P(n)}else{var o=Xt();D(o)}}],["RoomState.members",function(e,t,r){return ye(r)}],["RoomState.newMember",function(e,t,r){return ye(r)}],["RoomMember.membership",function(e,t){return ye(t)}],["RoomMember.name",function(e,t){return ye(t)}],["RoomMember.powerLevel",function(e,t){return ye(t)}],["RoomMember.typing",function(e,t){ye(t),be(t)}],["User.avatarUrl",function(e,t){return he(t)}],["User.presence",function(e,t){return he(t)}],["User.displayName",function(e,t){return he(t)}]]),C.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,kt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),A.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i,u;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),U.use(R.default(E.default.mark((function e(){var t,r;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=kt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),F.use((function(e){return kt().startClient(e)})),M.use(R.default(E.default.mark((function e(){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,kt().logout();case 2:case"end":return e.stop()}}),e)})))),T.use((function(){return kt().stopClient()})),S.use(R.default(E.default.mark((function e(){var t,r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=kt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=qt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),L.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,It(r),o=kt(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,kt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),j.use(R.default(E.default.mark((function e(){var t,r;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=kt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),Et();case 9:case"end":return e.stop()}}),e)})))),_.use(function(){var e=R.default(E.default.mark((function e(t){var r,n;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=kt(),n=r.getUser(t)){e.next=4;break}throw new Ft;case 4:return e.abrupt("return",qt(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),N.use((function(){return kt().getPushRules()})),W.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,kt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),$.use(function(){var e=R.default(E.default.mark((function e(t){var r;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,kt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,kt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),K.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,kt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ht.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,kt().setDisplayName(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),yt.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,kt().setAvatarUrl(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Zt=q.effect(),er=q.effect(),tr=q.effect();function rr(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return nr(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return nr(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){u=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw a}}}}function nr(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function or(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ar(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?or(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):or(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ir=n.attach({effect:ze}),ur=n.attach({effect:ze}),cr=n.attach({effect:ze}),sr=l.debounce({source:xe,timeout:500}),fr=n.attach({effect:Ge}),lr=n.attach({effect:qe});function dr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function mr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?dr(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):dr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}te.on(be,(function(e,t){if(t.typing)return e[t.roomId]?ar(ar({},e),{},x.default({},t.roomId,[].concat(h.default(e[t.roomId]),[t]))):ar(ar({},e),{},x.default({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return ar(ar({},e),{},x.default({},t.roomId,h.default(r)))}return delete e[t.roomId],ar({},e)}})).reset(we),Y.on(Re,(function(e,t){return t.roomId})).reset(X),Q.on(lr.doneData,(function(e,t){return t})).reset(X),Z.on(Zt.doneData,(function(e,t){return t})).reset(Y),J.on(fr.doneData,(function(e,t){return t})).reset(Y),ee.on(er.doneData,(function(e,t){return t})).reset(Y),re.on(tr.doneData,(function(e,t){return t.kick})).reset(Y),oe.on(tr.doneData,(function(e,t){return t.ban})).reset(Y),ne.on(tr.doneData,(function(e,t){return t.invite})).reset(Y),ae.on(tr.doneData,(function(e,t){return t.defaultEvents})).reset(Y),ie.on(tr.doneData,(function(e,t){return t.redact})).reset(Y),ue.on(tr.doneData,(function(e,t){return t.stateDefault})).reset(Y),n.forward({from:ze.pending,to:G}),n.forward({from:Re,to:Zt}),n.forward({from:ir.done,to:Ee}),n.forward({from:n.sample({source:Z,clock:Zt.done,fn:function(){}}),to:Ie}),n.forward({from:ur.done,to:ke}),n.forward({from:cr.done,to:Pe}),n.guard({clock:Y,filter:Boolean,target:lr}),n.guard({source:Y,filter:function(e){return Boolean(e)},target:xe}),n.guard({clock:he,source:J,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:xe}),n.guard({clock:ye,source:Y,filter:function(e,t){return e===t.roomId},target:xe}),n.guard({source:Y,clock:sr,filter:Boolean,target:fr}),n.guard({source:n.sample([Y,Z],De,(function(e,t){var r=y.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:ge,target:cr}),n.guard({source:n.sample([Y,Z],Ce,(function(e,t){var r=y.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:ge,target:ur}),n.guard({source:n.sample([Y,Z],Oe,(function(e){var t=y.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:ge,target:ir}),n.guard({clock:Y,filter:Boolean,target:[er,tr]}),er.use((function(e){var t=kt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new Ft;var o=r.getMember(n);if(!o)throw new Ft;return o.powerLevel})),tr.use((function(e){var t,r,n,o,a,i,u=kt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Ge.use((function(t){var r=kt().getRoom(t);if(!r)throw new Ct;return r.getMembers().map((function(t){var r=kt().getUser(t.userId);if(!r)throw new Ft;return function(t,r){var n=void 0;return 100===t.powerLevel?n=e.UserRole.admin:50===t.powerLevel&&(n=e.UserRole.moderator),{membership:t.membership,name:t.name,powerLevel:t.powerLevel,powerLevelNorm:t.powerLevelNorm,rawDisplayName:t.rawDisplayName,roomId:t.roomId,typing:t.typing,user:qt(r),userId:t.userId,role:n}}(t,r)}))})),Me.use((function(e){var t=kt().getRoom(e);if(!t)throw new Ct;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Zt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=kt(),o=kt().getRoom(r)){e.next=5;break}throw new Ct;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new b.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ze.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s,f;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new Ut;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=Yt(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(b.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(b.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=Yt(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use((function(e){if(!kt())throw new At;return e.map((function(e){return Ht(e)}))})),Se.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=kt().getRoom(o)){e.next=4;break}throw new Ct;case 4:return c={},e.next=7,kt().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],Kt(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Le.use((function(){return kt().getUsers().map(qt)})),je.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return ar(ar({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,kt().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var t=R.default(E.default.mark((function t(r){var n,o,a,i,u,c,s,f,l,d;return E.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.user,o=r.preset,a=r.initialState,i=void 0===a?[]:a,u=kt(),m=void 0,m=kt().getAccountData(_t).getContent(),c=m&&Object.values(m).flatMap((function(e){return e})),!(s=c.find((function(e){var t;return null===(t=u.getRoom(e))||void 0===t?void 0:t.currentState.members[n.userId]})))){t.next=6;break}return t.abrupt("return",{roomId:s});case 6:return f={is_direct:!0,invite:[n.userId],visibility:e.Visibility.private,initial_state:i.map((function(e){return ar(ar({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:o,creation_content:{isDirect:!0,creator:u.getUserId()}},t.next=9,u.createRoom(f);case 9:return l=t.sent,d=l.room_id,t.next=13,Qt(d,n.userId);case 13:return t.abrupt("return",{roomId:d});case 14:case"end":return t.stop()}var m}),t)})));return function(e){return t.apply(this,arguments)}}()),Be.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.userId,i=r.roomId,!(null===(n=kt().getRoom(i).currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===n||null===(o=n.getContent())||void 0===o?void 0:o.isDirect)){e.next=4;break}throw new Tt("Can't invite users into a direct room");case 4:return e.prev=4,e.next=7,kt().invite(i,a);case 7:e.next=13;break;case 9:if(e.prev=9,e.t0=e.catch(4),403!==e.t0.httpStatus){e.next=13;break}throw new Mt("Not enough permissions to invite users");case 13:case"end":return e.stop()}}),e,null,[[4,9]])})));return function(t){return e.apply(this,arguments)}}()),Ne.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.usersIds,i=r.roomId,!(null===(n=kt().getRoom(i).currentState.getStateEvents(t.EventType.RoomCreate,""))||void 0===n||null===(o=n.getContent())||void 0===o?void 0:o.isDirect)){e.next=4;break}throw new Tt("Can't invite users into a direct room");case 4:u=rr(a),e.prev=5,u.s();case 7:if((c=u.n()).done){e.next=20;break}return s=c.value,e.prev=9,e.next=12,kt().invite(i,s);case 12:e.next=18;break;case 14:if(e.prev=14,e.t0=e.catch(9),403!==e.t0.httpStatus){e.next=18;break}throw new Mt;case 18:e.next=7;break;case 20:e.next=25;break;case 22:e.prev=22,e.t1=e.catch(5),u.e(e.t1);case 25:return e.prev=25,u.f(),e.finish(25);case 28:case"end":return e.stop()}}),e,null,[[5,22,25,28],[9,14]])})));return function(t){return e.apply(this,arguments)}}()),We.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,kt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$e.use(function(){var e=R.default(E.default.mark((function e(t){var r,n;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,kt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ke.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=kt(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Qt(r);case 8:return e.abrupt("return",Ht(Vt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),qe.use((function(e){var t=kt().getRoom(e);return t?Ht(Vt(t)):null})),Ve.use(function(){var e=R.default(E.default.mark((function e(t){return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,kt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Fe.use((function(e){var t,r=kt(),n=null===(t=r.getAccountData(_t))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new Ct;var a=r.getRoom(o);if(!a)throw new Ct;return Vt(a)})),He.use(function(){var e=R.default(E.default.mark((function e(t){var r,n;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,kt().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var vr=Ye.effect(),pr=n.attach({source:[Y,Z],effect:vr,mapParams:function(e,t){var r=y.default(t,2);return mr({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),gr=n.attach({source:[Y,Z],effect:vr,mapParams:function(e,t){var r=y.default(t,2);return mr({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),wr=Ye.effect(),br=n.guard({source:n.sample(Y,[ze.done,vr.done,wr.done],(function(e,t){return mr({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),hr=Ye.effect(),yr=Dt(),xr=n.attach({effect:gr,mapParams:function(e){return{size:e.messages.length}}});Qe.on(br,(function(e,t){return t.messages})).reset(Y),Xe.on(hr.doneData,(function(e,t){return t})).reset(Y),H.on(br,(function(e,t){return t.isLive})).reset(Y);var Rr=n.combine(ge,ct,ut,G,(function(e,t,r,n){return e&&!t&&!r&&!n}));return ct.on(pr.pending,(function(e,t){return t})).reset(Y),ut.on(gr.pending,(function(e,t){return t})).reset(Y),st.on(br,(function(e,t){return t.canPaginateBackward})).reset([De,Y]),ft.on(br,(function(e,t){return t.canPaginateForward})).reset([De,Y]),n.forward({from:pr.done,to:nt}),n.forward({from:gr.done,to:ot}),n.guard({source:it,filter:Rr,target:pr}),n.guard({source:at,filter:Rr,target:gr}),n.forward({from:n.sample(Qe,xr.done,(function(e,t){return t.params.messages})),to:tt}),n.forward({from:yr.map((function(e){return{messages:e}})),to:xr}),n.guard({source:n.sample([Y,Z],d.throttle({source:Ze,timeout:800}),(function(e){var t=y.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:Z.map((function(e){return Boolean(e)})),target:wr}),n.guard({clock:Qe.updates,source:Y,filter:function(e){return Boolean(e)},target:hr}),n.sample({clock:d.debounce({source:lt.done,timeout:500}),fn:function(e){var t=e.params,r=e.result;return{roomId:t.roomId,eventId:r.event_id}},target:vt}),lt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,kt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),dt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,kt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),mt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a,i;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,kt().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),vt.use(function(){var e=R.default(E.default.mark((function e(t){var r,n,o,a;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=kt().getRoom(r)){e.next=4;break}throw new Ct;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new Ot;case 7:return e.next=9,kt().setRoomReadMarkers(r,n,a,{hidden:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),gt.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=kt().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;rt({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),wt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){kt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),pt.use((function(e){var r=e.eventId,n=e.roomId,o=kt();if(!o)throw new At;var a=o.getRoom(n);if(!a)throw new Ct;var i=a.findEventById(r);if(!i)throw new Ot;var u=o.getUserId();if(!u)throw new St;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===kt().getUserId()}(i);return{canRedact:c,canEdit:s}})),wr.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:Yt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}})),vr.use(function(){var e=R.default(E.default.mark((function e(r){var n,o,a,i,u,c,s,f;return E.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new Ut;case 3:return c="forward"===o?b.default.EventTimeline.FORWARDS:b.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=Yt(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),hr.use((function(e){var t=kt().getRoom(e);if(!t)throw new Ct;var r=t.getUnreadNotificationCount();return null!=r?r:0})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=de,e.$canInvite=le,e.$canKick=fe,e.$canPaginateBackward=st,e.$canPaginateForward=ft,e.$canRedact=ve,e.$canSendDefaultEvent=me,e.$canSetDefaultState=pe,e.$currentJoinedRoomMembers=ce,e.$currentRoom=Q,e.$currentRoomId=Y,e.$currentRoomInvitedMembers=se,e.$currentRoomMembers=J,e.$currentRoomUnreadMessageCount=Xe,e.$isLive=H,e.$loadFilter=ge,e.$loadRoomFxPending=G,e.$messages=Qe,e.$myPowerLevel=ee,e.$paginateBackwardPending=ct,e.$paginateForwardPending=ut,e.$requiredPowerLevelForBan=oe,e.$requiredPowerLevelForDefaultEvents=ae,e.$requiredPowerLevelForDefaultState=ue,e.$requiredPowerLevelForInvite=ne,e.$requiredPowerLevelForKick=re,e.$requiredPowerLevelForRedact=ie,e.$timelineWindow=Z,e.$typingMembers=te,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=pt,e.clearCurrentRoomState=X,e.clearTypingMember=we,e.client=kt,e.createClient=It,e.createClientFx=L,e.createDirectRoomFx=_e,e.createOnSyncThrottled=function(e){return r.throttle({source:O,timeout:e})},e.createRoomFx=je,e.createRoomMessageBatch=Dt,e.deleteMessageFx=mt,e.deleteNotificationRuleFx=K,e.destroyClient=Et,e.destroyClientFx=j,e.directRoomCreated=Ae,e.editMessageFx=dt,e.findDirectRoomByUserIdFx=Fe,e.getAllUsersFx=Le,e.getLoggedUserFx=S,e.getMembersByRoomIdFx=Ge,e.getNotificationRulesFx=N,e.getProfileInfoFx=_,e.getRoomByIdFx=qe,e.getRoomInfoFx=Me,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=kt().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(kt().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomMembers=xe,e.getRoomsWithActivitiesFx=Te,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(kt().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(kt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(kt().getAccessToken())}}},e.getUrlPreviewFx=wt,e.initRoom=Re,e.initStoreFx=U,e.inviteUserFx=Be,e.inviteUsersFx=Ne,e.joinRoomFx=Ke,e.kickUserRoomFx=We,e.leaveRoomFx=Ve,e.liveTimelineLoaded=Ee,e.loadRoom=De,e.loadRoomFx=ze,e.loadRoomMessage=Ce,e.loadRoomMessageDone=ke,e.loginByPasswordFx=C,e.loginByTokenFx=A,e.logoutFx=M,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return kt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=tt,e.onCachedState=D,e.onClientEvent=Pt,e.onInitialSync=P,e.onPaginateBackwardDone=nt,e.onPaginateForwardDone=ot,e.onRoomInitialized=Ie,e.onRoomLoaded=Pe,e.onRoomMemberUpdate=ye,e.onRoomUserUpdate=he,e.onSync=O,e.onUploadProgress=rt,e.paginateBackward=it,e.paginateForward=at,e.readAllMessagesFx=vt,e.renameRoomFx=$e,e.roomCreated=Ue,e.roomMessage=et,e.searchRoomMessagesFx=Se,e.sendMessageFx=lt,e.sendTypingFx=He,e.setNotificationRuleActionFx=W,e.setNotificationRuleEnabledFx=$,e.startClientFx=F,e.stopClientFx=T,e.toLiveTimeline=Oe,e.toggleTypingUser=be,e.updateAvatarUrlFx=yt,e.updateDisplayNameFx=ht,e.updateMessages=Ze,e.uploadContentFx=gt,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,throttle,effector,_toConsumableArray,_slicedToArray,effectorExtra,_defineProperty,_asyncToGenerator,_regeneratorRuntime,customErrors,debounce,patronum);
//# sourceMappingURL=matrix-effector.iife.js.map
