var MatrixEffector=function(e,t,r,n,o,a,i,u,c,s,f,d,l){"use strict";function m(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var v,p,g=m(t),w=m(a),b=m(i),h=m(c),y=m(s),x=m(f),R=n.createDomain("root"),I=R.domain("app"),k=I.event(),E=I.event(),P=I.event(),D=I.effect(),O=I.effect(),F=I.effect(),U=I.effect(),A=I.effect(),C=I.effect(),M=I.effect(),S=I.effect(),_=I.effect(),j=I.effect(),T=R.domain("notification"),L=T.effect(),B=T.effect(),N=T.effect(),W=T.effect(),$=R.domain("room"),K=$.store(null),z=$.store(!1),V=$.store(null),q=$.store(null),H=$.store(null),G=$.event(),J=$.store(null),Y=$.store(0),Q=$.store({}),X=$.store(50),Z=$.store(50),ee=$.store(50),te=$.store(0),re=$.store(50),ne=$.store(50),oe=V.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),ae=n.combine(Y,X,(function(e,t){return e>=t})),ie=n.combine(Y,Z,(function(e,t){return e>=t})),ue=n.combine(Y,ee,(function(e,t){return e>=t})),ce=n.combine(Y,te,(function(e,t){return e>=t})),se=n.combine(Y,re,(function(e,t){return e>=t})),fe=n.combine(Y,ne,(function(e,t){return e>=t})),de=n.combine(q,J,(function(e,t){return Boolean(e)&&Boolean(t)})),le=$.event(),me=$.event(),ve=$.event(),pe=$.event(),ge=$.event(),we=$.event(),be=$.event(),he=$.event(),ye=$.event(),xe=$.event(),Re=$.event(),Ie=$.event(),ke=$.event(),Ee=$.event(),Pe=$.event(),De=$.effect(),Oe=$.effect(),Fe=$.effect(),Ue=$.effect(),Ae=$.effect(),Ce=$.effect(),Me=$.effect(),Se=$.effect(),_e=$.effect(),je=$.effect(),Te=$.effect(),Le=$.effect(),Be=$.effect(),Ne=$.effect(),We=$.effect();e.Visibility=void 0,(v=e.Visibility||(e.Visibility={})).public="public",v.private="private",e.Preset=void 0,(p=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var $e,Ke,ze,Ve=R.domain("messages"),qe=Ve.store([]),He=Ve.event(),Ge=Ve.event(),Je=Ve.event(),Ye=Ve.event(),Qe=Ve.event(),Xe=Ve.event(),Ze=Ve.event(),et=Ve.event(),tt=o.throttle({source:He,timeout:800}),rt=Ve.store(!1),nt=Ve.store(!1),ot=Ve.store(!0),at=Ve.store(!0),it=Ve.effect(),ut=Ve.effect(),ct=Ve.effect(),st=Ve.effect(),ft=Ve.effect(),dt=Ve.effect(),lt=Ve.effect();e.MsgType=void 0,($e=e.MsgType||(e.MsgType={})).Audio="m.audio",$e.BadEncrypted="m.bad.encrypted",$e.Emote="m.emote",$e.File="m.file",$e.Image="m.image",$e.Notice="m.notice",$e.Text="m.text",$e.Video="m.video",$e.Location="m.location",e.MatrixMembershipType=void 0,(Ke=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",Ke.invite="invite",Ke.ban="ban",Ke.join="join",Ke.knock="knock";var mt=500,vt=[],pt=function(){ze&&(ze.removeAllListeners(),ze=null)},gt=function(e){var t=e.options,r=e.messageBatchInterval;pt(),void 0!==r&&(mt=r),ze=g.default.createClient(t),vt.forEach((function(e){var t=b.default(e,2),r=t[0],n=t[1];ze.on(r,n)}))},wt=function(){return ze},bt=function(e){vt.push.apply(vt,w.default(e))},ht=function(){return u.batchEvents(Ge,mt)},yt=d.createCustomError("EventNotFound"),xt=d.createCustomError("RoomNotFound"),Rt=d.createCustomError("ClientNotInitialized"),It=d.createCustomError("TimelineWindowUndefined"),kt=d.createCustomError("UserNotFound"),Et=d.createCustomError("UserNotLoggedIn"),Pt="m.room.message",Dt="m.room.redaction",Ot="m.direct";function Ft(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ut(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ft(Object(r),!0).forEach((function(t){h.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ft(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var At=function(e,t,r){return r.getJoinedMembers().some((function(n){return n.userId!==t&&r.hasUserReadEvent(n.userId,e.originalEventId)}))},Ct=function(e){return e.getContent()};function Mt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Ct(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function St(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function _t(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(Mt(t)),e}var jt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Tt(e){var t,r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,a=wt(),i=a.getRoom(e.roomId);if(!i)throw new xt;for(var u=i.getLiveTimeline().getEvents(),c=null===(t=i.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect,s=0,f=u.length-1;f>=0&&f!==u.length-o;f--){var d=u[f],l=i.hasUserReadEvent(a.getUserId(),d.getId());if(l)break;s+=1}var m=u.filter((function(e){return[Pt,Dt].includes(e.getType())})),v=m[m.length-1],p=v?Mt(v):void 0;if(p){var g=a.getUserId();p.sender.userId!==g?p.isRead=i.hasUserReadEvent(g,p.originalEventId):p.isRead=At(p,g,i)}var w=c?i.getMember(i.guessDMUserId()):null;return Ut(Ut({},e),{},{unreadCount:s,lastMessage:p,isDirect:c,directUserId:null==w?void 0:w.userId,isOnline:w?Boolean(null===(n=w.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:i.getLastActiveTimestamp()})}function Lt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Bt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Lt(Object(r),!0).forEach((function(t){h.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Lt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Nt(e){var t,r=e.getEvents().filter((function(e){return[Pt,Dt].includes(e.getType())})).reduce(_t,[]),n=wt(),o=e.getEvents()[0].getRoomId(),a=n.getRoom(o);if(!a)throw new xt;for(var i=null===(t=a.getAccountData("m.fully.read"))||void 0===t?void 0:t.getContent(),u=[],c=[],s=n.getUserId(),f=!1,d=r.length-1;d>=0;d--)r[d].sender.userId===s?u.push(r[d]):c.push(r[d]);return u.forEach((function(e){f?e.isRead=!0:(e.isRead=At(e,s,a),f=e.isRead)})),c.forEach((function(e){e.isRead=e.originalEventId===(null==i?void 0:i.event_id)})),r}var Wt=function(){var e=y.default(x.default.mark((function e(t,r){var n,o,a,i,u,c;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=wt(),a=o.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),i=a.creator,u=o.getAccountData(Ot).getContent(),c=null!==(n=u[i])&&void 0!==n?n:[],!r){e.next=8;break}return e.next=7,o.setAccountData(Ot,Bt(Bt({},u),{},h.default({},r,[t])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,o.setAccountData(Ot,Bt(Bt({},u),{},h.default({},i,[].concat(w.default(c),[t]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function $t(){return wt().getRooms().map(St)}n.forward({from:D.done.map((function(){return{initialSyncLimit:20}})),to:U}),bt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==Pt&&a!==Dt||!r&&o.liveEvent&&Ge(Mt(e))}],["Room",function(e){var t,r,n=wt(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?Ee(e):Pe(e))}],["Room.localEchoUpdated",function(){return He()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t){if("SYNCING"===e&&"SYNCING"===t){var r=$t();return He(),void P(r)}}else{var n=$t();k(n)}else{var o=$t();E(o)}}],["RoomState.members",function(e,t,r){return pe(r)}],["RoomState.newMember",function(e,t,r){return pe(r)}],["RoomMember.membership",function(e,t){return pe(t)}],["RoomMember.name",function(e,t){return pe(t)}],["RoomMember.powerLevel",function(e,t){return pe(t)}],["RoomMember.typing",function(e,t){return me(t)}],["User.avatarUrl",function(e,t){return ve(t)}],["User.presence",function(e,t){return ve(t)}],["User.displayName",function(e,t){return ve(t)}]]),D.use(function(){var e=y.default(x.default.mark((function e(t){return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,wt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),O.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a,i,u;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F.use(y.default(x.default.mark((function e(){var t,r;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=wt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),U.use((function(e){return wt().startClient(e)})),M.use(y.default(x.default.mark((function e(){return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,wt().logout();case 2:case"end":return e.stop()}}),e)})))),C.use((function(){return wt().stopClient()})),A.use(y.default(x.default.mark((function e(){var t,r,n,o,a;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=wt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=jt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),S.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,gt(r),o=wt(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,wt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_.use(y.default(x.default.mark((function e(){var t,r;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=wt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),pt();case 9:case"end":return e.stop()}}),e)})))),j.use(function(){var e=y.default(x.default.mark((function e(t){var r,n;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=wt(),n=r.getUser(t)){e.next=4;break}throw new kt;case 4:return e.abrupt("return",jt(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),L.use((function(){return wt().getPushRules()})),B.use(function(){var e=y.default(x.default.mark((function e(t){return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,wt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),N.use(function(){var e=y.default(x.default.mark((function e(t){var r;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,wt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,wt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),W.use(function(){var e=y.default(x.default.mark((function e(t){return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,wt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Kt=$.effect(),zt=$.effect(),Vt=$.effect(),qt=$.effect();function Ht(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Gt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ht(Object(r),!0).forEach((function(t){h.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ht(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Jt=n.attach({effect:Be}),Yt=n.attach({effect:Be}),Qt=n.attach({effect:Be}),Xt=l.debounce({source:ge,timeout:500}),Zt=n.attach({effect:Ne});function er(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function tr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?er(Object(r),!0).forEach((function(t){h.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):er(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Q.on(me,(function(e,t){if(t.typing)return e[t.roomId]?Gt(Gt({},e),{},h.default({},t.roomId,[].concat(w.default(e[t.roomId]),[t]))):Gt(Gt({},e),{},h.default({},t.roomId,[t]));if(e[t.roomId]){if(e[t.roomId].length>1){var r=e[t.roomId].filter((function(e){return e.userId!==t.userId}));return Gt(Gt({},e),{},h.default({},t.roomId,w.default(r)))}return delete e[t.roomId],Gt({},e)}})).reset(le),q.on(we,(function(e,t){return t.roomId})).reset(G),H.on(Zt.doneData,(function(e,t){return t})).reset(G),J.on(Kt.doneData,(function(e,t){return t})).reset(q),V.on(zt.doneData,(function(e,t){return t})).reset(q),Y.on(Vt.doneData,(function(e,t){return t})).reset(q),X.on(qt.doneData,(function(e,t){return t.kick})).reset(q),ee.on(qt.doneData,(function(e,t){return t.ban})).reset(q),Z.on(qt.doneData,(function(e,t){return t.invite})).reset(q),te.on(qt.doneData,(function(e,t){return t.defaultEvents})).reset(q),re.on(qt.doneData,(function(e,t){return t.redact})).reset(q),ne.on(qt.doneData,(function(e,t){return t.stateDefault})).reset(q),n.forward({from:Be.pending,to:z}),n.forward({from:we,to:Kt}),n.forward({from:Jt.done,to:be}),n.forward({from:n.sample({source:J,clock:Kt.done,fn:function(){}}),to:he}),n.forward({from:Yt.done,to:ye}),n.forward({from:Qt.done,to:xe}),n.guard({clock:q,filter:Boolean,target:Zt}),n.guard({source:q,filter:function(e){return Boolean(e)},target:ge}),n.guard({clock:ve,source:V,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:ge}),n.guard({clock:pe,source:q,filter:function(e,t){return e===t.roomId},target:ge}),n.guard({source:q,clock:Xt,filter:Boolean,target:zt}),n.guard({source:n.sample([q,J],Re,(function(e,t){var r=b.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:de,target:Qt}),n.guard({source:n.sample([q,J],ke,(function(e,t){var r=b.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:de,target:Yt}),n.guard({source:n.sample([q,J],Ie,(function(e){var t=b.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:de,target:Jt}),n.guard({clock:q,filter:Boolean,target:[Vt,qt]}),Vt.use((function(e){var t=wt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new kt;var o=r.getMember(n);if(!o)throw new kt;return o.powerLevel})),qt.use((function(e){var t,r,n,o,a,i,u=wt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),zt.use((function(e){var t=wt().getRoom(e);if(!t)throw new xt;return Object.values(t.currentState.members).map((function(e){var t=wt().getUser(e.userId);if(!t)throw new kt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:jt(t),userId:e.userId}}(e,t)}))})),Ue.use((function(e){var t=wt().getRoom(e);if(!t)throw new xt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Kt.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=wt(),o=wt().getRoom(r)){e.next=5;break}throw new xt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new g.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Be.use(function(){var e=y.default(x.default.mark((function e(r){var n,o,a,i,u,c,s,f;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new It;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=Nt(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(g.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(g.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=Nt(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Fe.use((function(e){if(!wt())throw new Rt;return e.map((function(e){return Tt(e)}))})),Oe.use(function(){var e=y.default(x.default.mark((function e(r){var n,o,a,i,u,c,s;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=wt().getRoom(o)){e.next=4;break}throw new xt;case 4:return c={},e.next=7,wt().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],Mt(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ae.use((function(){return wt().getUsers().map(jt)})),Ce.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Gt(Gt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,wt().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Me.use(function(){var t=y.default(x.default.mark((function t(r){var n,o,a,i,u,c,s,f,d,l;return x.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.user,o=r.preset,a=r.initialState,i=void 0===a?[]:a,u=wt(),m=void 0,m=wt().getAccountData(Ot).getContent(),c=m&&Object.values(m).flatMap((function(e){return e})),!(s=c.find((function(e){var t;return null===(t=u.getRoom(e))||void 0===t?void 0:t.currentState.members[n.userId]})))){t.next=6;break}return t.abrupt("return",{roomId:s});case 6:return f={is_direct:!0,invite:[n.userId],visibility:e.Visibility.private,initial_state:i.map((function(e){return Gt(Gt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:o,creation_content:{isDirect:!0,creator:u.getUserId()}},t.next=9,u.createRoom(f);case 9:return d=t.sent,l=d.room_id,t.next=13,Wt(l,n.userId);case 13:return t.abrupt("return",{roomId:l});case 14:case"end":return t.stop()}var m}),t)})));return function(e){return t.apply(this,arguments)}}()),Se.use(function(){var e=y.default(x.default.mark((function e(t){var r,n;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,wt().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,wt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var e=y.default(x.default.mark((function e(t){var r,n;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,wt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a,i;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=wt(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Wt(r);case 8:return e.abrupt("return",Tt(St(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ne.use((function(e){var t=wt().getRoom(e);return t?Tt(St(t)):null})),Le.use(function(){var e=y.default(x.default.mark((function e(t){return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,wt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),De.use((function(e){var t,r=wt(),n=null===(t=r.getAccountData(Ot))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new xt;var a=r.getRoom(o);if(!a)throw new xt;return St(a)})),We.use(function(){var e=y.default(x.default.mark((function e(t){var r,n;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,wt().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var rr=Ve.effect(),nr=n.attach({source:[q,J],effect:rr,mapParams:function(e,t){var r=b.default(t,2);return tr({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),or=n.attach({source:[q,J],effect:rr,mapParams:function(e,t){var r=b.default(t,2);return tr({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),ar=Ve.effect(),ir=n.guard({source:n.sample(q,[Be.done,rr.done,ar.done],(function(e,t){return tr({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),ur=ht(),cr=n.attach({effect:or,mapParams:function(e){return{size:e.messages.length}}});qe.on(ir,(function(e,t){return t.messages})).reset(q),K.on(ir,(function(e,t){return t.isLive})).reset(q);var sr=n.combine(de,nt,rt,z,(function(e,t,r,n){return e&&!t&&!r&&!n}));return nt.on(nr.pending,(function(e,t){return t})).reset(q),rt.on(or.pending,(function(e,t){return t})).reset(q),ot.on(ir,(function(e,t){return t.canPaginateBackward})).reset([Re,q]),at.on(ir,(function(e,t){return t.canPaginateForward})).reset([Re,q]),n.forward({from:nr.done,to:Qe}),n.forward({from:or.done,to:Xe}),n.guard({source:et,filter:sr,target:nr}),n.guard({source:Ze,filter:sr,target:or}),n.forward({from:n.sample(qe,cr.done,(function(e,t){return t.params.messages})),to:Je}),n.forward({from:ur.map((function(e){return{messages:e}})),to:cr}),n.guard({source:n.sample([q,J],tt,(function(e){var t=b.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:J.map((function(e){return Boolean(e)})),target:ar}),it.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,wt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ut.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,wt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ct.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a,i;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,wt().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),st.use(function(){var e=y.default(x.default.mark((function e(t){var r,n,o,a;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=wt().getRoom(r)){e.next=4;break}throw new xt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new yt;case 7:return e.next=9,wt().setRoomReadMarkers(r,n,a,{hidden:!1});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),dt.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=wt().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;Ye({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),lt.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){wt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),ft.use((function(e){var r=e.eventId,n=e.roomId,o=wt();if(!o)throw new Rt;var a=o.getRoom(n);if(!a)throw new xt;var i=a.findEventById(r);if(!i)throw new yt;var u=o.getUserId();if(!u)throw new Et;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===wt().getUserId()}(i);return{canRedact:c,canEdit:s}})),ar.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:Nt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}})),rr.use(function(){var e=y.default(x.default.mark((function e(r){var n,o,a,i,u,c,s,f;return x.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new It;case 3:return c="forward"===o?g.default.EventTimeline.FORWARDS:g.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=Nt(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=ue,e.$canInvite=ie,e.$canKick=ae,e.$canPaginateBackward=ot,e.$canPaginateForward=at,e.$canRedact=se,e.$canSendDefaultEvent=ce,e.$canSetDefaultState=fe,e.$currentJoinedRoomMembers=oe,e.$currentRoom=H,e.$currentRoomId=q,e.$currentRoomMembers=V,e.$isLive=K,e.$loadFilter=de,e.$loadRoomFxPending=z,e.$messages=qe,e.$myPowerLevel=Y,e.$paginateBackwardPending=nt,e.$paginateForwardPending=rt,e.$requiredPowerLevelForBan=ee,e.$requiredPowerLevelForDefaultEvents=te,e.$requiredPowerLevelForDefaultState=ne,e.$requiredPowerLevelForInvite=Z,e.$requiredPowerLevelForKick=X,e.$requiredPowerLevelForRedact=re,e.$timelineWindow=J,e.$typingMembers=Q,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=ft,e.clearCurrentRoomState=G,e.clearTypingMember=le,e.client=wt,e.createClient=gt,e.createClientFx=S,e.createDirectRoomFx=Me,e.createOnSyncThrottled=function(e){return r.throttle({source:P,timeout:e})},e.createRoomFx=Ce,e.createRoomMessageBatch=ht,e.deleteMessageFx=ct,e.deleteNotificationRuleFx=W,e.destroyClient=pt,e.destroyClientFx=_,e.directRoomCreated=Ee,e.editMessageFx=ut,e.findDirectRoomByUserIdFx=De,e.getAllUsersFx=Ae,e.getLoggedUserFx=A,e.getNotificationRulesFx=L,e.getProfileInfoFx=j,e.getRoomByIdFx=Ne,e.getRoomInfoFx=Ue,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=wt().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(wt().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomMembers=ge,e.getRoomsWithActivitiesFx=Fe,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(wt().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(wt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(wt().getAccessToken())}}},e.getUrlPreviewFx=lt,e.initRoom=we,e.initStoreFx=F,e.inviteUserFx=Se,e.joinRoomFx=Te,e.kickUserRoomFx=_e,e.leaveRoomFx=Le,e.liveTimelineLoaded=be,e.loadRoom=Re,e.loadRoomFx=Be,e.loadRoomMessage=ke,e.loadRoomMessageDone=ye,e.loginByPasswordFx=D,e.loginByTokenFx=O,e.logoutFx=M,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return wt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=Je,e.onCachedState=E,e.onClientEvent=bt,e.onInitialSync=k,e.onPaginateBackwardDone=Qe,e.onPaginateForwardDone=Xe,e.onRoomInitialized=he,e.onRoomLoaded=xe,e.onRoomMemberUpdate=pe,e.onRoomUserUpdate=ve,e.onSync=P,e.onUploadProgress=Ye,e.paginateBackward=et,e.paginateForward=Ze,e.readAllMessagesFx=st,e.renameRoomFx=je,e.roomCreated=Pe,e.roomMessage=Ge,e.searchRoomMessagesFx=Oe,e.sendMessageFx=it,e.sendTypingFx=We,e.setNotificationRuleActionFx=B,e.setNotificationRuleEnabledFx=N,e.startClientFx=U,e.stopClientFx=C,e.throttleUpdateMessage=tt,e.toLiveTimeline=Ie,e.toggleTypingUser=me,e.updateMessages=He,e.uploadContentFx=dt,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,throttle,effector,patronum,_toConsumableArray,_slicedToArray,effectorExtra,_defineProperty,_asyncToGenerator,_regeneratorRuntime,customErrors,debounce);
//# sourceMappingURL=matrix-effector.iife.js.map
