import e,{Direction as t,MatrixEvent as r,SearchOrderBy as n,EventStatus as o}from"matrix-js-sdk";export{MatrixEvent,Room,RoomMember}from"matrix-js-sdk";import{throttle as a}from"patronum/throttle";import{createDomain as i,combine as u,forward as c,attach as s,sample as f,guard as l}from"effector";import d from"@babel/runtime/helpers/toConsumableArray";import m from"@babel/runtime/helpers/slicedToArray";import{batchEvents as p}from"@42px/effector-extra";import v from"@babel/runtime/helpers/defineProperty";import g from"@babel/runtime/helpers/asyncToGenerator";import w from"@babel/runtime/regenerator";import{createCustomError as b}from"@42px/custom-errors";import{debounce as h}from"patronum/debounce";import{throttle as y,debounce as I}from"patronum";var x,k,O=i("root"),R=O.domain("app"),D=R.event(),P=R.event(),E=R.event(),j=function(e){return a({source:E,timeout:e})},A=R.effect(),U=R.effect(),S=R.effect(),C=R.effect(),_=R.effect(),B=R.effect(),T=R.effect(),M=R.effect(),N=R.effect(),W=R.effect(),L=O.domain("notification"),F=L.effect(),z=L.effect(),K=L.effect(),G=L.effect(),H=O.domain("room"),J=50,Y=50,q=50,V=0,Q=50,X=50,Z=H.store(null),$=H.store(!1),ee=H.store(null),te=H.store(null),re=H.store(null),ne=H.event(),oe=H.store(null),ae=H.store(0),ie=H.store({}),ue=H.store(50),ce=H.store(50),se=H.store(50),fe=H.store(0),le=H.store(50),de=H.store(50),me=ee.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),pe=u(ae,ue,(function(e,t){return e>=t})),ve=u(ae,ce,(function(e,t){return e>=t})),ge=u(ae,se,(function(e,t){return e>=t})),we=u(ae,fe,(function(e,t){return e>=t})),be=u(ae,le,(function(e,t){return e>=t})),he=u(ae,de,(function(e,t){return e>=t})),ye=u(te,oe,(function(e,t){return Boolean(e)&&Boolean(t)})),Ie=H.event(),xe=H.event(),ke=H.event(),Oe=H.event(),Re=H.event(),De=H.event(),Pe=H.event(),Ee=H.event(),je=H.event(),Ae=H.event(),Ue=H.event(),Se=H.event(),Ce=H.event(),_e=H.event(),Be=H.event(),Te=H.effect(),Me=H.effect(),Ne=H.effect(),We=H.effect(),Le=H.effect(),Fe=H.effect(),ze=H.effect(),Ke=H.effect(),Ge=H.effect(),He=H.effect(),Je=H.effect(),Ye=H.effect(),qe=H.effect(),Ve=H.effect(),Qe=H.effect();!function(e){e.public="public",e.private="private"}(x||(x={})),function(e){e.trustedPrivateChat="trusted_private_chat",e.privateChat="private_chat",e.publicChat="public_chat"}(k||(k={}));var Xe,Ze,$e,et=O.domain("messages"),tt=et.store([]),rt=et.event(),nt=et.event(),ot=et.event(),at=et.event(),it=et.event(),ut=et.event(),ct=et.event(),st=et.event(),ft=et.store(!1),lt=et.store(!1),dt=et.store(!0),mt=et.store(!0),pt=et.effect(),vt=et.effect(),gt=et.effect(),wt=et.effect(),bt=et.effect(),ht=et.effect(),yt=et.effect(),It=O.domain("profile"),xt=It.effect(),kt=It.effect();!function(e){e.Audio="m.audio",e.BadEncrypted="m.bad.encrypted",e.Emote="m.emote",e.File="m.file",e.Image="m.image",e.Notice="m.notice",e.Text="m.text",e.Video="m.video",e.Location="m.location"}(Xe||(Xe={})),function(e){e.leave="leave",e.invite="invite",e.ban="ban",e.join="join",e.knock="knock"}(Ze||(Ze={}));var Ot=500,Rt=[],Dt=function(){$e&&($e.removeAllListeners(),$e=null)},Pt=function(t){var r=t.options,n=t.messageBatchInterval;Dt(),void 0!==n&&(Ot=n),$e=e.createClient(r),Rt.forEach((function(e){var t=m(e,2),r=t[0],n=t[1];$e.on(r,n)}))},Et=function(){return $e},jt=function(e){Rt.push.apply(Rt,d(e))},At=function(){return p(nt,Ot)},Ut=b("EventNotFound"),St=b("RoomNotFound"),Ct=b("ClientNotInitialized"),_t=b("TimelineWindowUndefined"),Bt=b("UserNotFound"),Tt=b("UserNotLoggedIn"),Mt="m.room.message",Nt="m.room.redaction";function Wt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Lt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Wt(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Wt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ft=function(e,t,r){return e.seen=r.getJoinedMembers().some((function(n){return n.userId!==t&&r.hasUserReadEvent(n.userId,e.originalEventId)})),e},zt=function(e){return e.getContent()};function Kt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:zt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Gt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function Ht(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Kt(t)),e}var Jt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Yt(e){var t,r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,a=Et(),i=a.getRoom(e.roomId);if(!i)throw new St;for(var u=i.getLiveTimeline().getEvents(),c=Boolean(null===(t=i.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect),s=0,f=u.length-1;f>=0&&f!==u.length-o;f--){var l=u[f],d=i.hasUserReadEvent(a.getUserId(),l.getId());if(d)break;s+=1}var m=u.filter((function(e){return[Mt,Nt].includes(e.getType())})),p=m[m.length-1],v=p?Kt(p):void 0;if(v){var g=a.getUserId();v.sender.userId!==g?v.seen=i.hasUserReadEvent(g,v.originalEventId):v=Ft(v,g,i)}var w=c?i.getMember(i.guessDMUserId()):null;return Lt(Lt({},e),{},{unreadCount:s,lastMessage:v,isDirect:c,directUserId:null==w?void 0:w.userId,isOnline:w?Boolean(null===(n=w.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:i.getLastActiveTimestamp()})}function qt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Vt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?qt(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):qt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Qt(e){var t=e.getEvents().filter((function(e){return[Mt,Nt].includes(e.getType())})).reduce(Ht,[]),r=Et(),n=e.getEvents()[0].getRoomId(),o=r.getRoom(n);if(!o)throw new St;for(var a=[],i=[],u=r.getUserId(),c=!1,s=!1,f=t.length-1;f>=0;f--)t[f].sender.userId===u?a.push(t[f]):i.push(t[f]);return a.forEach((function(e){s?e.seen=!0:(e=Ft(e,u,o),s=Boolean(e.seen))})),i.forEach((function(e){c?e.seen=!0:(e.seen=o.hasUserReadEvent(u,e.originalEventId),c=e.seen)})),t}var Xt=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(Et().getHomeserverUrl(),r,n,o,i,c):null},Zt=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=Et().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(Et().getHomeserverUrl(),n,o,a,u,!0):null},$t=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return Et().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},er=function(){return{endpointUrl:"".concat(Et().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(Et().getAccessToken())}}},tr=function(){var e=g(w.mark((function e(t,r){var n,o,a,i,u,c;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=Et(),a=o.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),i=a.creator,u=o.getAccountData("m.direct").getContent(),c=null!==(n=u[i])&&void 0!==n?n:[],!r){e.next=8;break}return e.next=7,o.setAccountData("m.direct",Vt(Vt({},u),{},v({},r,[t])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,o.setAccountData("m.direct",Vt(Vt({},u),{},v({},i,[].concat(d(c),[t]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function rr(){return Et().getRooms().map(Gt)}c({from:A.done.map((function(){return{initialSyncLimit:20}})),to:C}),jt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==Mt&&a!==Nt||!r&&o.liveEvent&&nt(Kt(e))}],["Room",function(e){var t,r,n=Et(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||(Boolean(null===(t=e.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?_e(e):Be(e))}],["Room.localEchoUpdated",function(){return rt()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t){if("SYNCING"===e&&"SYNCING"===t){var r=rr();return rt(),void E(r)}}else{var n=rr();D(n)}else{var o=rr();P(o)}}],["RoomState.members",function(e,t,r){return Oe(r)}],["RoomState.newMember",function(e,t,r){return Oe(r)}],["RoomMember.membership",function(e,t){return Oe(t)}],["RoomMember.name",function(e,t){return Oe(t)}],["RoomMember.powerLevel",function(e,t){return Oe(t)}],["RoomMember.typing",function(e,t){return xe(t)}],["User.avatarUrl",function(e,t){return ke(t)}],["User.presence",function(e,t){return ke(t)}],["User.displayName",function(e,t){return ke(t)}]]),A.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Et().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),U.use(function(){var e=g(w.mark((function e(t){var r,n,o,a,i,u;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S.use(g(w.mark((function e(){var t,r;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Et(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),C.use((function(e){return Et().startClient(e)})),T.use(g(w.mark((function e(){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Et().logout();case 2:case"end":return e.stop()}}),e)})))),B.use((function(){return Et().stopClient()})),_.use(g(w.mark((function e(){var t,r,n,o,a;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Et()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Jt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),M.use(function(){var e=g(w.mark((function e(t){var r,n,o,a;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,Pt(r),o=Et(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,Et().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),N.use(g(w.mark((function e(){var t,r;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Et()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),Dt();case 9:case"end":return e.stop()}}),e)})))),W.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Et(),n=r.getUser(t)){e.next=4;break}throw new Bt;case 4:return e.abrupt("return",Jt(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F.use((function(){return Et().getPushRules()})),z.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Et().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),K.use(function(){var e=g(w.mark((function e(t){var r;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,Et().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,Et().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),G.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Et().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),xt.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Et().setDisplayName(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),kt.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Et().setAvatarUrl(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var nr=H.effect(),or=H.effect(),ar=H.effect(),ir=H.effect();function ur(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function cr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ur(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ur(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var sr=s({effect:qe}),fr=s({effect:qe}),lr=s({effect:qe}),dr=h({source:Re,timeout:500}),mr=s({effect:Ve});function pr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function vr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?pr(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):pr(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}ie.on(xe,(function(e,t){if(t.typing)return e[t.roomId]?cr(cr({},e),{},v({},t.roomId,[].concat(d(e[t.roomId]),[t]))):cr(cr({},e),{},v({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return cr(cr({},e),{},v({},t.roomId,d(r)))}return delete e[t.roomId],cr({},e)}})).reset(Ie),te.on(De,(function(e,t){return t.roomId})).reset(ne),re.on(mr.doneData,(function(e,t){return t})).reset(ne),oe.on(nr.doneData,(function(e,t){return t})).reset(te),ee.on(or.doneData,(function(e,t){return t})).reset(te),ae.on(ar.doneData,(function(e,t){return t})).reset(te),ue.on(ir.doneData,(function(e,t){return t.kick})).reset(te),se.on(ir.doneData,(function(e,t){return t.ban})).reset(te),ce.on(ir.doneData,(function(e,t){return t.invite})).reset(te),fe.on(ir.doneData,(function(e,t){return t.defaultEvents})).reset(te),le.on(ir.doneData,(function(e,t){return t.redact})).reset(te),de.on(ir.doneData,(function(e,t){return t.stateDefault})).reset(te),c({from:qe.pending,to:$}),c({from:De,to:nr}),c({from:sr.done,to:Pe}),c({from:f({source:oe,clock:nr.done,fn:function(){}}),to:Ee}),c({from:fr.done,to:je}),c({from:lr.done,to:Ae}),l({clock:te,filter:Boolean,target:mr}),l({source:te,filter:function(e){return Boolean(e)},target:Re}),l({clock:ke,source:ee,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:Re}),l({clock:Oe,source:te,filter:function(e,t){return e===t.roomId},target:Re}),l({source:te,clock:dr,filter:Boolean,target:or}),l({source:f([te,oe],Ue,(function(e,t){var r=m(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:ye,target:lr}),l({source:f([te,oe],Ce,(function(e,t){var r=m(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:ye,target:fr}),l({source:f([te,oe],Se,(function(e){var t=m(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:ye,target:sr}),l({clock:te,filter:Boolean,target:[ar,ir]}),ar.use((function(e){var t=Et(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new Bt;var o=r.getMember(n);if(!o)throw new Bt;return o.powerLevel})),ir.use((function(e){var t,r,n,o,a,i,u=Et().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),or.use((function(e){var t=Et().getRoom(e);if(!t)throw new St;return Object.values(t.currentState.members).map((function(e){var t=Et().getUser(e.userId);if(!t)throw new Bt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Jt(t),userId:e.userId}}(e,t)}))})),We.use((function(e){var t=Et().getRoom(e);if(!t)throw new St;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),nr.use(function(){var t=g(w.mark((function t(r){var n,o,a,i;return w.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.roomId,o=Et(),a=Et().getRoom(n)){t.next=5;break}throw new St;case 5:return i=a.getUnfilteredTimelineSet(),t.abrupt("return",new e.TimelineWindow(o,i));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),qe.use(function(){var r=g(w.mark((function r(n){var o,a,i,u,c,s,f,l;return w.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=n.timelineWindow,a=n.initialEventId,i=n.initialWindowSize,u=n.loadAdditionalDataDirection,o){r.next=3;break}throw new _t;case 3:return r.next=5,o.load(a,i);case 5:if(c=o.canPaginate(t.Forward),s=Qt(o),!(i&&s.length<i)){r.next=19;break}if(l=i-s.length,"BACKWARD"!==u){r.next=15;break}return r.next=12,o.paginate(e.EventTimeline.BACKWARDS,l);case 12:f=r.sent,r.next=18;break;case 15:return r.next=17,o.paginate(e.EventTimeline.FORWARDS,l);case 17:f=r.sent;case 18:f&&(s=Qt(o));case 19:return r.abrupt("return",{messages:s,isLive:!c,canPaginateForward:c,canPaginateBackward:o.canPaginate(t.Backward)});case 20:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()),Ne.use((function(e){if(!Et())throw new Ct;return e.map((function(e){return Yt(e)}))})),Me.use(function(){var e=g(w.mark((function e(t){var o,a,i,u,c,s,f;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=t.term,a=t.roomId,i=t.orderBy,u=void 0===i?n.Rank:i,c=Et().getRoom(a)){e.next=4;break}throw new St;case 4:return s={},e.next=7,Et().search({body:{search_categories:{room_events:{search_term:o,keys:["content.body"],filter:{rooms:[a]},order_by:u}}}});case 7:return f=e.sent,e.abrupt("return",f.search_categories.room_events.results.map((function(e){var t=e.result,n=new r(t),o=n.getSender();return void 0===s[o]&&(s[o]=c.getMember(o)),n.sender=s[o],Kt(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Le.use((function(){return Et().getUsers().map(Jt)})),Fe.use(function(){var e=g(w.mark((function e(t){var r,n,o,a,i,u,c,s,f;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return cr(cr({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,Et().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ze.use(function(){var e=g(w.mark((function e(t){var r,n,o,a,i,u,c,s,f,l;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,a=void 0===o?[]:o,i=Et(),d=void 0,d=Et().getAccountData("m.direct").getContent(),u=d&&Object.values(d).flatMap((function(e){return e})),!(c=u.find((function(e){var t;return null===(t=i.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:c});case 6:return s={is_direct:!0,invite:[r.userId],visibility:x.private,initial_state:a.map((function(e){return cr(cr({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:i.getUserId()}},e.next=9,i.createRoom(s);case 9:return f=e.sent,l=f.room_id,e.next=13,tr(l,r.userId);case 13:return e.abrupt("return",{roomId:l});case 14:case"end":return e.stop()}var d}),e)})));return function(t){return e.apply(this,arguments)}}()),Ke.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,Et().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ge.use(function(){var e=g(w.mark((function e(t){var r,n,o;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,Et().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),He.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,Et().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Je.use(function(){var e=g(w.mark((function e(t){var r,n,o,a,i;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=Et(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,tr(r);case 8:return e.abrupt("return",Yt(Gt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ve.use((function(e){var t=Et().getRoom(e);return t?Yt(Gt(t)):null})),Ye.use(function(){var e=g(w.mark((function e(t){return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Et().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use((function(e){var t,r=Et(),n=null===(t=r.getAccountData("m.direct"))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new St;var a=r.getRoom(o);if(!a)throw new St;return Gt(a)})),Qe.use(function(){var e=g(w.mark((function e(t){var r,n;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,Et().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var gr=et.effect(),wr=s({source:[te,oe],effect:gr,mapParams:function(e,t){var r=m(t,2);return vr({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),br=s({source:[te,oe],effect:gr,mapParams:function(e,t){var r=m(t,2);return vr({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),hr=et.effect(),yr=l({source:f(te,[qe.done,gr.done,hr.done],(function(e,t){return vr({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),Ir=At(),xr=s({effect:br,mapParams:function(e){return{size:e.messages.length}}});tt.on(yr,(function(e,t){return t.messages})).reset(te),Z.on(yr,(function(e,t){return t.isLive})).reset(te);var kr=u(ye,lt,ft,$,(function(e,t,r,n){return e&&!t&&!r&&!n}));lt.on(wr.pending,(function(e,t){return t})).reset(te),ft.on(br.pending,(function(e,t){return t})).reset(te),dt.on(yr,(function(e,t){return t.canPaginateBackward})).reset([Ue,te]),mt.on(yr,(function(e,t){return t.canPaginateForward})).reset([Ue,te]),c({from:wr.done,to:it}),c({from:br.done,to:ut}),l({source:st,filter:kr,target:wr}),l({source:ct,filter:kr,target:br}),c({from:f(tt,xr.done,(function(e,t){return t.params.messages})),to:ot}),c({from:Ir.map((function(e){return{messages:e}})),to:xr}),l({source:f([te,oe],y({source:rt,timeout:800}),(function(e){var t=m(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:oe.map((function(e){return Boolean(e)})),target:hr}),f({clock:I({source:pt.done,timeout:500}),fn:function(e){var t=e.params,r=e.result;return{roomId:t.roomId,eventId:r.event_id}},target:wt}),pt.use(function(){var e=g(w.mark((function e(t){var r,n,o;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,Et().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),vt.use(function(){var e=g(w.mark((function e(t){var r,n,o,a;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,Et().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),gt.use(function(){var e=g(w.mark((function e(t){var r,n,o,a,i;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,Et().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),wt.use(function(){var e=g(w.mark((function e(t){var r,n,o,a;return w.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=Et().getRoom(r)){e.next=4;break}throw new St;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new Ut;case 7:return e.next=9,Et().setRoomReadMarkers(r,n,a,{hidden:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ht.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=Et().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;at({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),yt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){Et().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),bt.use((function(e){var t=e.eventId,r=e.roomId,n=Et();if(!n)throw new Ct;var a=n.getRoom(r);if(!a)throw new St;var i=a.findEventById(t);if(!i)throw new Ut;var u=n.getUserId();if(!u)throw new Tt;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===o.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var t=e.getOriginalContent(),r=t.msgtype;return("m.text"===r||"m.emote"===r)&&Boolean(t.body)&&"string"==typeof t.body&&e.getSender()===Et().getUserId()}(i);return{canRedact:c,canEdit:s}})),hr.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Forward);return{messages:Qt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Backward)}})),gr.use(function(){var r=g(w.mark((function r(n){var o,a,i,u,c,s,f,l;return w.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(o=n.timelineWindow,a=n.direction,i=n.size,u=n.makeRequest,c=n.requestLimit,o){r.next=3;break}throw new _t;case 3:return s="forward"===a?e.EventTimeline.FORWARDS:e.EventTimeline.BACKWARDS,r.next=6,o.paginate(s,i,u,c);case 6:return f=o.canPaginate(t.Forward),l=Qt(o),r.abrupt("return",{messages:l,isLive:!f,canPaginateForward:f,canPaginateBackward:o.canPaginate(t.Backward)});case 9:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}());export{ge as $canBan,ve as $canInvite,pe as $canKick,dt as $canPaginateBackward,mt as $canPaginateForward,be as $canRedact,we as $canSendDefaultEvent,he as $canSetDefaultState,me as $currentJoinedRoomMembers,re as $currentRoom,te as $currentRoomId,ee as $currentRoomMembers,Z as $isLive,ye as $loadFilter,$ as $loadRoomFxPending,tt as $messages,ae as $myPowerLevel,lt as $paginateBackwardPending,ft as $paginateForwardPending,se as $requiredPowerLevelForBan,fe as $requiredPowerLevelForDefaultEvents,de as $requiredPowerLevelForDefaultState,ce as $requiredPowerLevelForInvite,ue as $requiredPowerLevelForKick,le as $requiredPowerLevelForRedact,oe as $timelineWindow,ie as $typingMembers,Y as DEFAULT_BAN_POWERLEVEL,J as DEFAULT_INVITE_POWERLEVEL,q as DEFAULT_KICK_POWERLEVEL,X as DEFAULT_REDACT_POWERLEVEL,V as DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL,Q as DEFAULT_SET_DEFAULT_STATE_POWERLEVEL,Ze as MatrixMembershipType,Xe as MsgType,k as Preset,x as Visibility,bt as checkEventPermissionsFx,ne as clearCurrentRoomState,Ie as clearTypingMember,Et as client,Pt as createClient,M as createClientFx,ze as createDirectRoomFx,j as createOnSyncThrottled,Fe as createRoomFx,At as createRoomMessageBatch,gt as deleteMessageFx,G as deleteNotificationRuleFx,Dt as destroyClient,N as destroyClientFx,_e as directRoomCreated,vt as editMessageFx,Te as findDirectRoomByUserIdFx,Le as getAllUsersFx,_ as getLoggedUserFx,F as getNotificationRulesFx,W as getProfileInfoFx,Ve as getRoomByIdFx,We as getRoomInfoFx,Zt as getRoomMemberAvatarUrl,Re as getRoomMembers,Ne as getRoomsWithActivitiesFx,Xt as getSenderAvatarUrl,er as getUploadCredentials,yt as getUrlPreviewFx,De as initRoom,S as initStoreFx,Ke as inviteUserFx,Je as joinRoomFx,Ge as kickUserRoomFx,Ye as leaveRoomFx,Pe as liveTimelineLoaded,Ue as loadRoom,qe as loadRoomFx,Ce as loadRoomMessage,je as loadRoomMessageDone,A as loginByPasswordFx,U as loginByTokenFx,T as logoutFx,$t as mxcUrlToHttp,ot as newMessagesLoaded,P as onCachedState,jt as onClientEvent,D as onInitialSync,it as onPaginateBackwardDone,ut as onPaginateForwardDone,Ee as onRoomInitialized,Ae as onRoomLoaded,Oe as onRoomMemberUpdate,ke as onRoomUserUpdate,E as onSync,at as onUploadProgress,st as paginateBackward,ct as paginateForward,wt as readAllMessagesFx,He as renameRoomFx,Be as roomCreated,nt as roomMessage,Me as searchRoomMessagesFx,pt as sendMessageFx,Qe as sendTypingFx,z as setNotificationRuleActionFx,K as setNotificationRuleEnabledFx,C as startClientFx,B as stopClientFx,Se as toLiveTimeline,xe as toggleTypingUser,kt as updateAvatarUrlFx,xt as updateDisplayNameFx,rt as updateMessages,ht as uploadContentFx};
//# sourceMappingURL=index.js.map
