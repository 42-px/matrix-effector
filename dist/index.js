import e,{EventType as t,Direction as r,MatrixEvent as n,SearchOrderBy as o,EventStatus as a}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{throttle as i}from"patronum/throttle";import{createDomain as u,combine as c,forward as s,attach as f,sample as l,guard as d}from"effector";import m from"@babel/runtime/helpers/toConsumableArray";import p from"@babel/runtime/helpers/slicedToArray";import{batchEvents as v}from"@42px/effector-extra";import g from"@babel/runtime/helpers/defineProperty";import w from"@babel/runtime/helpers/asyncToGenerator";import b from"@babel/runtime/regenerator";import{createCustomError as h}from"@42px/custom-errors";import{debounce as y}from"patronum/debounce";import{throttle as I,debounce as x}from"patronum";var k,R,O,P,D=u("root"),E=D.domain("app"),j=E.event(),A=E.event(),S=E.event(),C=function(e){return i({source:S,timeout:e})},U=E.effect(),_=E.effect(),B=E.effect(),M=E.effect(),T=E.effect(),N=E.effect(),L=E.effect(),W=E.effect(),F=E.effect(),z=E.effect(),K=D.domain("notification"),G=K.effect(),H=K.effect(),J=K.effect(),Y=K.effect();!function(e){e.Audio="m.audio",e.BadEncrypted="m.bad.encrypted",e.Emote="m.emote",e.File="m.file",e.Image="m.image",e.Notice="m.notice",e.Text="m.text",e.Video="m.video",e.Location="m.location"}(k||(k={})),function(e){e.online="online",e.offline="offline",e.unavailable="unavailable"}(R||(R={})),function(e){e.leave="leave",e.invite="invite",e.ban="ban",e.join="join",e.knock="knock"}(O||(O={})),function(e){e.admin="Admin",e.moderator="Moderator"}(P||(P={}));var q,V,$=D.domain("room"),Q=50,X=50,Z=50,ee=0,te=50,re=50,ne=$.store(null),oe=$.store(!1),ae=$.store(null),ie=$.store(null),ue=$.store(null),ce=$.event(),se=$.store(null),fe=$.store(0),le=$.store({}),de=$.store(50),me=$.store(50),pe=$.store(50),ve=$.store(0),ge=$.store(50),we=$.store(50),be=ae.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return e.membership===O.join})))&&void 0!==t?t:[]})),he=ae.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return e.membership===O.invite})))&&void 0!==t?t:[]})),ye=c(fe,de,(function(e,t){return e>=t})),Ie=c(fe,me,(function(e,t){return e>=t})),xe=c(fe,pe,(function(e,t){return e>=t})),ke=c(fe,ve,(function(e,t){return e>=t})),Re=c(fe,ge,(function(e,t){return e>=t})),Oe=c(fe,we,(function(e,t){return e>=t})),Pe=c(ie,se,(function(e,t){return Boolean(e)&&Boolean(t)})),De=$.event(),Ee=$.event(),je=$.event(),Ae=$.event(),Se=$.event(),Ce=$.event(),Ue=$.event(),_e=$.event(),Be=$.event(),Me=$.event(),Te=$.event(),Ne=$.event(),Le=$.event(),We=$.event(),Fe=$.event(),ze=$.effect(),Ke=$.effect(),Ge=$.effect(),He=$.effect(),Je=$.effect(),Ye=$.effect(),qe=$.effect(),Ve=$.effect(),$e=$.effect(),Qe=$.effect(),Xe=$.effect(),Ze=$.effect(),et=$.effect(),tt=$.effect(),rt=$.effect(),nt=$.effect();!function(e){e.public="public",e.private="private"}(q||(q={})),function(e){e.trustedPrivateChat="trusted_private_chat",e.privateChat="private_chat",e.publicChat="public_chat"}(V||(V={}));var ot,at=D.domain("messages"),it=at.store([]),ut=at.event(),ct=at.event(),st=at.event(),ft=at.event(),lt=at.event(),dt=at.event(),mt=at.event(),pt=at.event(),vt=at.store(!1),gt=at.store(!1),wt=at.store(!0),bt=at.store(!0),ht=at.effect(),yt=at.effect(),It=at.effect(),xt=at.effect(),kt=at.effect(),Rt=at.effect(),Ot=at.effect(),Pt=500,Dt=[],Et=function(){ot&&(ot.removeAllListeners(),ot=null)},jt=function(t){var r=t.options,n=t.messageBatchInterval;Et(),void 0!==n&&(Pt=n),ot=e.createClient(r),Dt.forEach((function(e){var t=p(e,2),r=t[0],n=t[1];ot.on(r,n)}))},At=function(){return ot},St=function(e){Dt.push.apply(Dt,m(e))},Ct=function(){return v(ct,Pt)},Ut=h("EventNotFound"),_t=h("RoomNotFound"),Bt=h("ClientNotInitialized"),Mt=h("TimelineWindowUndefined"),Tt=h("UserNotFound"),Nt=h("UserNotLoggedIn"),Lt=h("Can't invite users into a direct room"),Wt=h("Not enough permissions to invite users"),Ft="m.room.message",zt="m.room.redaction";function Kt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Gt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Kt(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Kt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ht=function(e,t,r){return e.seen=r.getJoinedMembers().some((function(n){return n.userId!==t&&r.hasUserReadEvent(n.userId,e.originalEventId)})),e},Jt=function(e){return e.getContent()};function Yt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Jt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function qt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Vt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Yt(t)),e}var $t=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Qt(e){var r,n,o,a,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,u=At(),c=u.getRoom(e.roomId);if(!c)throw new _t;for(var s=c.getLiveTimeline().getEvents(),f=c.currentState.getStateEvents(t.RoomPowerLevels,"").getContent(),l=Boolean(null===(r=c.currentState.getStateEvents(t.RoomCreate,""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect),d=0,m=s.length-1;m>=0&&m!==s.length-i;m--){var p=s[m],v=c.hasUserReadEvent(u.getUserId(),p.getId());if(v)break;d+=1}var g=s.filter((function(e){return[Ft,zt].includes(e.getType())})),w=g[g.length-1],b=w?Yt(w):void 0,h=u.getUserId();b&&(b.sender.userId!==h?b.seen=c.hasUserReadEvent(h,b.originalEventId):b=Ht(b,h,c));var y=l?c.getMember(c.guessDMUserId()):null,I=null!==(o=f.users[h])&&void 0!==o?o:0;return Gt(Gt({},e),{},{unreadCount:d,lastMessage:b,isDirect:l,directUserId:null==y?void 0:y.userId,isOnline:y?Boolean(null===(a=y.user)||void 0===a?void 0:a.currentlyActive):void 0,lastActivityTS:c.getLastActiveTimestamp(),powerlevels:f,myPowerLevel:I})}function Xt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Zt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Xt(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Xt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function er(e){var t=e.getEvents().filter((function(e){return[Ft,zt].includes(e.getType())})).reduce(Vt,[]),r=At(),n=e.getEvents()[0].getRoomId(),o=r.getRoom(n);if(!o)throw new _t;for(var a=[],i=[],u=r.getUserId(),c=!1,s=!1,f=t.length-1;f>=0;f--)t[f].sender.userId===u?a.push(t[f]):i.push(t[f]);return a.forEach((function(e){s?e.seen=!0:(e=Ht(e,u,o),s=Boolean(e.seen))})),i.forEach((function(e){c?e.seen=!0:(e.seen=o.hasUserReadEvent(u,e.originalEventId),c=e.seen)})),t}var tr=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(At().getHomeserverUrl(),r,n,o,i,c):null},rr=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=At().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(At().getHomeserverUrl(),n,o,a,u,!0):null},nr=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return At().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},or=function(){return{endpointUrl:"".concat(At().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(At().getAccessToken())}}},ar=function(){var e=w(b.mark((function e(r,n){var o,a,i,u,c,s;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=At(),i=a.getRoom(r).currentState.getStateEvents(t.RoomCreate,"").getContent(),u=i.creator,c=a.getAccountData("m.direct").getContent(),s=null!==(o=c[u])&&void 0!==o?o:[],!n){e.next=8;break}return e.next=7,a.setAccountData("m.direct",Zt(Zt({},c),{},g({},n,[r])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,a.setAccountData("m.direct",Zt(Zt({},c),{},g({},u,[].concat(m(s),[r]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function ir(){return At().getRooms().map(qt)}s({from:U.done.map((function(){return{initialSyncLimit:20}})),to:M}),St([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==Ft&&a!==zt||!r&&o.liveEvent&&ct(Yt(e))}],["Room",function(e){var r,n,o=At(),a=e.getMember(o.getUserId());a&&"invite"!==a.membership||(Boolean(null===(r=e.currentState.getStateEvents(t.RoomCreate,""))||void 0===r||null===(n=r.getContent())||void 0===n?void 0:n.isDirect)?We(e):Fe(e))}],["Room.localEchoUpdated",function(){return ut()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t){if("SYNCING"===e&&"SYNCING"===t){var r=ir();return ut(),void S(r)}}else{var n=ir();j(n)}else{var o=ir();A(o)}}],["RoomState.members",function(e,t,r){return Ae(r)}],["RoomState.newMember",function(e,t,r){return Ae(r)}],["RoomMember.membership",function(e,t){return Ae(t)}],["RoomMember.name",function(e,t){return Ae(t)}],["RoomMember.powerLevel",function(e,t){return Ae(t)}],["RoomMember.typing",function(e,t){Ae(t),Ee(t)}],["User.avatarUrl",function(e,t){return je(t)}],["User.presence",function(e,t){return je(t)}],["User.displayName",function(e,t){return je(t)}]]),U.use(function(){var e=w(b.mark((function e(t){return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,At().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_.use(function(){var e=w(b.mark((function e(t){var r,n,o,a,i,u;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),B.use(w(b.mark((function e(){var t,r;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=At(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),M.use((function(e){return At().startClient(e)})),L.use(w(b.mark((function e(){return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,At().logout();case 2:case"end":return e.stop()}}),e)})))),N.use((function(){return At().stopClient()})),T.use(w(b.mark((function e(){var t,r,n,o,a;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=At()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=$t(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),W.use(function(){var e=w(b.mark((function e(t){var r,n,o,a;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,jt(r),o=At(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,At().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F.use(w(b.mark((function e(){var t,r;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=At()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),Et();case 9:case"end":return e.stop()}}),e)})))),z.use(function(){var e=w(b.mark((function e(t){var r,n;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=At(),n=r.getUser(t)){e.next=4;break}throw new Tt;case 4:return e.abrupt("return",$t(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),G.use((function(){return At().getPushRules()})),H.use(function(){var e=w(b.mark((function e(t){return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,At().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),J.use(function(){var e=w(b.mark((function e(t){var r;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,At().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,At().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),Y.use(function(){var e=w(b.mark((function e(t){return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,At().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var ur=$.effect(),cr=$.effect(),sr=$.effect();function fr(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return lr(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return lr(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){u=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw a}}}}function lr(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function dr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function mr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?dr(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):dr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var pr=f({effect:et}),vr=f({effect:et}),gr=f({effect:et}),wr=y({source:Se,timeout:500}),br=f({effect:nt}),hr=f({effect:tt});function yr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ir(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?yr(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):yr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}le.on(Ee,(function(e,t){if(t.typing)return e[t.roomId]?mr(mr({},e),{},g({},t.roomId,[].concat(m(e[t.roomId]),[t]))):mr(mr({},e),{},g({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return mr(mr({},e),{},g({},t.roomId,m(r)))}return delete e[t.roomId],mr({},e)}})).reset(De),ie.on(Ce,(function(e,t){return t.roomId})).reset(ce),ue.on(hr.doneData,(function(e,t){return t})).reset(ce),se.on(ur.doneData,(function(e,t){return t})).reset(ie),ae.on(br.doneData,(function(e,t){return t})).reset(ie),fe.on(cr.doneData,(function(e,t){return t})).reset(ie),de.on(sr.doneData,(function(e,t){return t.kick})).reset(ie),pe.on(sr.doneData,(function(e,t){return t.ban})).reset(ie),me.on(sr.doneData,(function(e,t){return t.invite})).reset(ie),ve.on(sr.doneData,(function(e,t){return t.defaultEvents})).reset(ie),ge.on(sr.doneData,(function(e,t){return t.redact})).reset(ie),we.on(sr.doneData,(function(e,t){return t.stateDefault})).reset(ie),s({from:et.pending,to:oe}),s({from:Ce,to:ur}),s({from:pr.done,to:Ue}),s({from:l({source:se,clock:ur.done,fn:function(){}}),to:_e}),s({from:vr.done,to:Be}),s({from:gr.done,to:Me}),d({clock:ie,filter:Boolean,target:hr}),d({source:ie,filter:function(e){return Boolean(e)},target:Se}),d({clock:je,source:ae,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:Se}),d({clock:Ae,source:ie,filter:function(e,t){return e===t.roomId},target:Se}),d({source:ie,clock:wr,filter:Boolean,target:br}),d({source:l([ie,se],Te,(function(e,t){var r=p(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:Pe,target:gr}),d({source:l([ie,se],Le,(function(e,t){var r=p(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:Pe,target:vr}),d({source:l([ie,se],Ne,(function(e){var t=p(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:Pe,target:pr}),d({clock:ie,filter:Boolean,target:[cr,sr]}),cr.use((function(e){var t=At(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new Tt;var o=r.getMember(n);if(!o)throw new Tt;return o.powerLevel})),sr.use((function(e){var t,r,n,o,a,i,u=At().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),nt.use((function(e){var t=At().getRoom(e);if(!t)throw new _t;return t.getMembers().map((function(e){var t=At().getUser(e.userId);if(!t)throw new Tt;return function(e,t){var r=void 0;return 100===e.powerLevel?r=P.admin:50===e.powerLevel&&(r=P.moderator),{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:$t(t),userId:e.userId,role:r}}(e,t)}))})),He.use((function(e){var t=At().getRoom(e);if(!t)throw new _t;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),ur.use(function(){var t=w(b.mark((function t(r){var n,o,a,i;return b.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.roomId,o=At(),a=At().getRoom(n)){t.next=5;break}throw new _t;case 5:return i=a.getUnfilteredTimelineSet(),t.abrupt("return",new e.TimelineWindow(o,i));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),et.use(function(){var t=w(b.mark((function t(n){var o,a,i,u,c,s,f,l;return b.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=n.timelineWindow,a=n.initialEventId,i=n.initialWindowSize,u=n.loadAdditionalDataDirection,o){t.next=3;break}throw new Mt;case 3:return t.next=5,o.load(a,i);case 5:if(c=o.canPaginate(r.Forward),s=er(o),!(i&&s.length<i)){t.next=19;break}if(l=i-s.length,"BACKWARD"!==u){t.next=15;break}return t.next=12,o.paginate(e.EventTimeline.BACKWARDS,l);case 12:f=t.sent,t.next=18;break;case 15:return t.next=17,o.paginate(e.EventTimeline.FORWARDS,l);case 17:f=t.sent;case 18:f&&(s=er(o));case 19:return t.abrupt("return",{messages:s,isLive:!c,canPaginateForward:c,canPaginateBackward:o.canPaginate(r.Backward)});case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Ge.use((function(e){if(!At())throw new Bt;return e.map((function(e){return Qt(e)}))})),Ke.use(function(){var e=w(b.mark((function e(t){var r,a,i,u,c,s,f;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.term,a=t.roomId,i=t.orderBy,u=void 0===i?o.Rank:i,c=At().getRoom(a)){e.next=4;break}throw new _t;case 4:return s={},e.next=7,At().search({body:{search_categories:{room_events:{search_term:r,keys:["content.body"],filter:{rooms:[a]},order_by:u}}}});case 7:return f=e.sent,e.abrupt("return",f.search_categories.room_events.results.map((function(e){var t=e.result,r=new n(t),o=r.getSender();return void 0===s[o]&&(s[o]=c.getMember(o)),r.sender=s[o],Yt(r)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Je.use((function(){return At().getUsers().map($t)})),Ye.use(function(){var e=w(b.mark((function e(t){var r,n,o,a,i,u,c,s,f;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return mr(mr({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,At().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),qe.use(function(){var e=w(b.mark((function e(t){var r,n,o,a,i,u,c,s,f,l;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,a=void 0===o?[]:o,i=At(),d=void 0,d=At().getAccountData("m.direct").getContent(),u=d&&Object.values(d).flatMap((function(e){return e})),!(c=u.find((function(e){var t;return null===(t=i.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:c});case 6:return s={is_direct:!0,invite:[r.userId],visibility:q.private,initial_state:a.map((function(e){return mr(mr({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:i.getUserId()}},e.next=9,i.createRoom(s);case 9:return f=e.sent,l=f.room_id,e.next=13,ar(l,r.userId);case 13:return e.abrupt("return",{roomId:l});case 14:case"end":return e.stop()}var d}),e)})));return function(t){return e.apply(this,arguments)}}()),Ve.use(function(){var e=w(b.mark((function e(r){var n,o,a,i,u,c,s;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.usersIds,i=r.roomId,!(null===(n=At().getRoom(i).currentState.getStateEvents(t.RoomCreate,""))||void 0===n||null===(o=n.getContent())||void 0===o?void 0:o.isDirect)){e.next=4;break}throw new Lt;case 4:u=fr(a),e.prev=5,u.s();case 7:if((c=u.n()).done){e.next=20;break}return s=c.value,e.prev=9,e.next=12,At().invite(i,s);case 12:e.next=18;break;case 14:if(e.prev=14,e.t0=e.catch(9),403!==e.t0.httpStatus){e.next=18;break}throw new Wt;case 18:e.next=7;break;case 20:e.next=25;break;case 22:e.prev=22,e.t1=e.catch(5),u.e(e.t1);case 25:return e.prev=25,u.f(),e.finish(25);case 28:case"end":return e.stop()}}),e,null,[[5,22,25,28],[9,14]])})));return function(t){return e.apply(this,arguments)}}()),$e.use(function(){var e=w(b.mark((function e(t){var r,n,o;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,At().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Qe.use(function(){var e=w(b.mark((function e(t){var r,n;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,At().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Xe.use(function(){var e=w(b.mark((function e(t){var r,n,o,a,i;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=At(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,ar(r);case 8:return e.abrupt("return",Qt(qt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),tt.use((function(e){var t=At().getRoom(e);return t?Qt(qt(t)):null})),Ze.use(function(){var e=w(b.mark((function e(t){return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,At().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ze.use((function(e){var t,r=At(),n=null===(t=r.getAccountData("m.direct"))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new _t;var a=r.getRoom(o);if(!a)throw new _t;return qt(a)})),rt.use(function(){var e=w(b.mark((function e(t){var r,n;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,At().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var xr=at.effect(),kr=f({source:[ie,se],effect:xr,mapParams:function(e,t){var r=p(t,2);return Ir({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Rr=f({source:[ie,se],effect:xr,mapParams:function(e,t){var r=p(t,2);return Ir({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),Or=at.effect(),Pr=d({source:l(ie,[et.done,xr.done,Or.done],(function(e,t){return Ir({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),Dr=Ct(),Er=f({effect:Rr,mapParams:function(e){return{size:e.messages.length}}});it.on(Pr,(function(e,t){return t.messages})).reset(ie),ne.on(Pr,(function(e,t){return t.isLive})).reset(ie);var jr=c(Pe,gt,vt,oe,(function(e,t,r,n){return e&&!t&&!r&&!n}));gt.on(kr.pending,(function(e,t){return t})).reset(ie),vt.on(Rr.pending,(function(e,t){return t})).reset(ie),wt.on(Pr,(function(e,t){return t.canPaginateBackward})).reset([Te,ie]),bt.on(Pr,(function(e,t){return t.canPaginateForward})).reset([Te,ie]),s({from:kr.done,to:lt}),s({from:Rr.done,to:dt}),d({source:pt,filter:jr,target:kr}),d({source:mt,filter:jr,target:Rr}),s({from:l(it,Er.done,(function(e,t){return t.params.messages})),to:st}),s({from:Dr.map((function(e){return{messages:e}})),to:Er}),d({source:l([ie,se],I({source:ut,timeout:800}),(function(e){var t=p(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:se.map((function(e){return Boolean(e)})),target:Or}),l({clock:x({source:ht.done,timeout:500}),fn:function(e){var t=e.params,r=e.result;return{roomId:t.roomId,eventId:r.event_id}},target:xt}),ht.use(function(){var e=w(b.mark((function e(t){var r,n,o;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,At().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),yt.use(function(){var e=w(b.mark((function e(t){var r,n,o,a;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,At().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),It.use(function(){var e=w(b.mark((function e(t){var r,n,o,a,i;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,At().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),xt.use(function(){var e=w(b.mark((function e(t){var r,n,o,a;return b.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=At().getRoom(r)){e.next=4;break}throw new _t;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new Ut;case 7:return e.next=9,At().setRoomReadMarkers(r,n,a,{hidden:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Rt.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=At().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;ft({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),Ot.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){At().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),kt.use((function(e){var t=e.eventId,r=e.roomId,n=At();if(!n)throw new Bt;var o=n.getRoom(r);if(!o)throw new _t;var i=o.findEventById(t);if(!i)throw new Ut;var u=n.getUserId();if(!u)throw new Nt;var c=o.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===a.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var t=e.getOriginalContent(),r=t.msgtype;return("m.text"===r||"m.emote"===r)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===At().getUserId()}(i);return{canRedact:c,canEdit:s}})),Or.use((function(e){var t=e.timelineWindow,n=t.canPaginate(r.Forward);return{messages:er(t),isLive:!n,canPaginateForward:n,canPaginateBackward:t.canPaginate(r.Backward)}})),xr.use(function(){var t=w(b.mark((function t(n){var o,a,i,u,c,s,f,l;return b.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=n.timelineWindow,a=n.direction,i=n.size,u=n.makeRequest,c=n.requestLimit,o){t.next=3;break}throw new Mt;case 3:return s="forward"===a?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS,t.next=6,o.paginate(s,i,u,c);case 6:return f=o.canPaginate(r.Forward),l=er(o),t.abrupt("return",{messages:l,isLive:!f,canPaginateForward:f,canPaginateBackward:o.canPaginate(r.Backward)});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());export{xe as $canBan,Ie as $canInvite,ye as $canKick,wt as $canPaginateBackward,bt as $canPaginateForward,Re as $canRedact,ke as $canSendDefaultEvent,Oe as $canSetDefaultState,be as $currentJoinedRoomMembers,ue as $currentRoom,ie as $currentRoomId,he as $currentRoomInvitedMembers,ae as $currentRoomMembers,ne as $isLive,Pe as $loadFilter,oe as $loadRoomFxPending,it as $messages,fe as $myPowerLevel,gt as $paginateBackwardPending,vt as $paginateForwardPending,pe as $requiredPowerLevelForBan,ve as $requiredPowerLevelForDefaultEvents,we as $requiredPowerLevelForDefaultState,me as $requiredPowerLevelForInvite,de as $requiredPowerLevelForKick,ge as $requiredPowerLevelForRedact,se as $timelineWindow,le as $typingMembers,X as DEFAULT_BAN_POWERLEVEL,Q as DEFAULT_INVITE_POWERLEVEL,Z as DEFAULT_KICK_POWERLEVEL,re as DEFAULT_REDACT_POWERLEVEL,ee as DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL,te as DEFAULT_SET_DEFAULT_STATE_POWERLEVEL,O as MatrixMembershipType,k as MsgType,R as Presence,V as Preset,P as UserRole,q as Visibility,kt as checkEventPermissionsFx,ce as clearCurrentRoomState,De as clearTypingMember,At as client,jt as createClient,W as createClientFx,qe as createDirectRoomFx,C as createOnSyncThrottled,Ye as createRoomFx,Ct as createRoomMessageBatch,It as deleteMessageFx,Y as deleteNotificationRuleFx,Et as destroyClient,F as destroyClientFx,We as directRoomCreated,yt as editMessageFx,ze as findDirectRoomByUserIdFx,Je as getAllUsersFx,T as getLoggedUserFx,nt as getMembersByRoomIdFx,G as getNotificationRulesFx,z as getProfileInfoFx,tt as getRoomByIdFx,He as getRoomInfoFx,rr as getRoomMemberAvatarUrl,Se as getRoomMembers,Ge as getRoomsWithActivitiesFx,tr as getSenderAvatarUrl,or as getUploadCredentials,Ot as getUrlPreviewFx,Ce as initRoom,B as initStoreFx,Ve as inviteUsersFx,Xe as joinRoomFx,$e as kickUserRoomFx,Ze as leaveRoomFx,Ue as liveTimelineLoaded,Te as loadRoom,et as loadRoomFx,Le as loadRoomMessage,Be as loadRoomMessageDone,U as loginByPasswordFx,_ as loginByTokenFx,L as logoutFx,nr as mxcUrlToHttp,st as newMessagesLoaded,A as onCachedState,St as onClientEvent,j as onInitialSync,lt as onPaginateBackwardDone,dt as onPaginateForwardDone,_e as onRoomInitialized,Me as onRoomLoaded,Ae as onRoomMemberUpdate,je as onRoomUserUpdate,S as onSync,ft as onUploadProgress,pt as paginateBackward,mt as paginateForward,xt as readAllMessagesFx,Qe as renameRoomFx,Fe as roomCreated,ct as roomMessage,Ke as searchRoomMessagesFx,ht as sendMessageFx,rt as sendTypingFx,H as setNotificationRuleActionFx,J as setNotificationRuleEnabledFx,M as startClientFx,N as stopClientFx,Ne as toLiveTimeline,Ee as toggleTypingUser,ut as updateMessages,Rt as uploadContentFx};
//# sourceMappingURL=index.js.map
