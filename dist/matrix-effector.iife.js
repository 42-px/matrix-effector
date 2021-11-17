var MatrixEffector=function(e,t,r,n,o,a,i,u,c,s,f,l){"use strict";function d(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var m,p,v=d(t),g=d(o),w=d(a),b=d(u),y=d(c),h=d(s),x=n.createDomain("root"),R=x.domain("app"),k=R.event(),P=R.event(),O=R.event(),E=R.effect(),I=R.effect(),D=R.effect(),j=R.effect(),F=R.effect(),A=R.effect(),S=R.effect(),_=R.effect(),C=R.effect(),U=x.domain("notification"),L=U.effect(),M=U.effect(),T=U.effect(),B=U.effect(),N=x.domain("room"),W=N.store(null),$=N.store(!1),K=N.store(null),z=N.store(null),V=N.store(null),q=N.event(),H=N.store(null),G=N.store(0),J=N.store(50),Y=N.store(50),Q=N.store(50),X=N.store(0),Z=N.store(50),ee=N.store(50),te=K.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),re=n.combine(G,J,(function(e,t){return e>=t})),ne=n.combine(G,Y,(function(e,t){return e>=t})),oe=n.combine(G,Q,(function(e,t){return e>=t})),ae=n.combine(G,X,(function(e,t){return e>=t})),ie=n.combine(G,Z,(function(e,t){return e>=t})),ue=n.combine(G,ee,(function(e,t){return e>=t})),ce=N.event(),se=N.event(),fe=N.event(),le=N.event(),de=N.event(),me=N.event(),pe=N.event(),ve=N.event(),ge=N.event(),we=N.event(),be=N.effect(),ye=N.effect(),he=N.effect(),xe=N.effect(),Re=N.effect(),ke=N.effect(),Pe=N.effect(),Oe=N.effect(),Ee=N.effect(),Ie=N.effect(),De=N.effect();e.Visibility=void 0,(m=e.Visibility||(e.Visibility={})).public="public",m.private="private",e.Preset=void 0,(p=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var je,Fe,Ae,Se=x.domain("messages"),_e=Se.store([]),Ce=Se.event(),Ue=Se.event(),Le=Se.event(),Me=Se.effect(),Te=Se.effect(),Be=Se.effect(),Ne=Se.effect(),We=Se.effect(),$e=Se.effect(),Ke=Se.effect(),ze=x.domain("pagination"),Ve=ze.store(!1),qe=ze.store(!1),He=ze.store(!0),Ge=ze.store(!0),Je=ze.event(),Ye=ze.event(),Qe=ze.event(),Xe=ze.event();e.MsgType=void 0,(je=e.MsgType||(e.MsgType={})).Audio="m.audio",je.BadEncrypted="m.bad.encrypted",je.Emote="m.emote",je.File="m.file",je.Image="m.image",je.Notice="m.notice",je.Text="m.text",je.Video="m.video",je.Location="m.location",e.MatrixMembershipType=void 0,(Fe=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",Fe.invite="invite",Fe.ban="ban",Fe.join="join",Fe.knock="knock";var Ze=500,et=[],tt=function(e){var t=e.options,r=e.messageBatchInterval;at(),void 0!==r&&(Ze=r),Ae=v.default.createClient(t),et.forEach((function(e){var t=w.default(e,2),r=t[0],n=t[1];Ae.on(r,n)}))},rt=function(){return Ae},nt=function(e){et.push.apply(et,g.default(e))},ot=function(){return i.batchEvents(Ce,Ze)},at=function(){Ae&&(Ae.removeAllListeners(),Ae=null)},it="m.room.message",ut="m.room.redaction",ct="m.direct",st=l.createCustomError("EventNotFound"),ft=l.createCustomError("RoomNotFound"),lt=l.createCustomError("ClientNotInitialized"),dt=l.createCustomError("TimelineWindowUndefined"),mt=l.createCustomError("UserNotFound"),pt=l.createCustomError("UserNotLoggedIn");function vt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function gt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?vt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):vt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function wt(e){return e.getContent()}function bt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:wt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function yt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function ht(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(bt(t)),e}var xt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Rt(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,n=rt(),o=n.getRoom(e.roomId);if(!o)throw new ft;for(var a=o.getLiveTimeline().getEvents(),i=0,u=a.length-1;u>=0&&u!==a.length-r;u--){var c=a[u],s=o.hasUserReadEvent(n.getUserId(),c.getId());if(s)break;i+=1}var f=a.filter((function(e){return[it,ut].includes(e.getType())})).reduce(ht,[]),l=f.length?f[f.length-1]:void 0,d=It(e.roomId),m=d?o.getMember(o.guessDMUserId()):null;return gt(gt({},e),{},{unreadCount:i,lastMessage:l,isDirect:d,directUserId:null==m?void 0:m.userId,isOnline:m?Boolean(null===(t=m.user)||void 0===t?void 0:t.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()})}function kt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Pt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?kt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):kt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Ot(e){return e.getEvents().filter((function(e){return[it,ut].includes(e.getType())})).reduce(ht,[])}var Et=function(){var e=rt().getAccountData(ct).getContent();return e&&Object.values(e).flatMap((function(e){return e}))},It=function(e){return Et().includes(e)},Dt=function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a,i,u,c;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=rt(),a=null===(r=o.getRoom(t).currentState.getStateEvents("m.room.create",void 0)[0])||void 0===r?void 0:r.getContent(),i=a.creator,u=o.getAccountData(ct).getContent(),c=null!==(n=u[i])&&void 0!==n?n:[],e.next=6,o.setAccountData(ct,Pt(Pt({},u),{},b.default({},i,[].concat(g.default(c),[t]))));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),jt=n.combine(z,H,(function(e,t){return Boolean(e)&&Boolean(t)})),Ft=N.event(),At=N.event(),St=N.event(),_t=N.effect(),Ct=N.effect(),Ut=N.effect(),Lt=N.effect(),Mt=N.effect(),Tt=N.effect();function Bt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Nt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Bt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Bt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Wt=ze.effect(),$t=n.attach({source:[z,H],effect:Wt,mapParams:function(e,t){var r=w.default(t,2);return Nt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Kt=n.attach({source:[z,H],effect:Wt,mapParams:function(e,t){var r=w.default(t,2);return Nt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}});function zt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var Vt=Se.event(),qt=Se.effect(),Ht=n.guard({source:n.sample(z,[Ut.done,Wt.done,qt.done],(function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?zt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):zt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}});function Gt(){return rt().getRooms().map(yt)}function Jt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Yt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Jt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Jt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}n.forward({from:E.done.map((function(){return{initialSyncLimit:20}})),to:j}),nt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==it&&a!==ut||!r&&o.liveEvent&&Ce(bt(e))}],["Room",function(e){var t,r,n=rt(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?ge(e):we(e))}],["Room.localEchoUpdated",function(){return Vt()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=Gt();O(r)}else{var n=Gt();k(n)}else{var o=Gt();P(o)}}],["RoomState.members",function(e,t,r){return At(r)}],["RoomState.newMember",function(e,t,r){return At(r)}],["RoomMember.membership",function(e,t){return At(t)}],["RoomMember.name",function(e,t){return At(t)}],["RoomMember.powerLevel",function(e,t){return At(t)}],["RoomMember.typing",function(e,t){return At(t)}],["User.avatarUrl",function(e,t){return Ft(t)}],["User.presence",function(e,t){return Ft(t)}],["User.displayName",function(e,t){return Ft(t)}]]),E.use(function(){var e=y.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,rt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a,i,u;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D.use(y.default(h.default.mark((function e(){var t,r;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=rt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),j.use((function(e){return rt().startClient(e)})),S.use(y.default(h.default.mark((function e(){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,rt().logout();case 2:case"end":return e.stop()}}),e)})))),A.use((function(){return rt().stopClient()})),F.use(y.default(h.default.mark((function e(){var t,r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=rt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=xt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),_.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,tt(r),o=rt(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,rt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C.use(y.default(h.default.mark((function e(){var t,r;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=rt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),at();case 9:case"end":return e.stop()}}),e)})))),L.use((function(){return rt().getPushRules()})),M.use(function(){var e=y.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,rt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),T.use(function(){var e=y.default(h.default.mark((function e(t){var r;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,rt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,rt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),B.use(function(){var e=y.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,rt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Qt=n.attach({effect:Ut}),Xt=n.attach({effect:Ut}),Zt=n.attach({effect:Ut}),er=f.debounce({source:St,timeout:500});z.on(ce,(function(e,t){return t.roomId})).reset(q),V.on(_t.doneData,(function(e,t){return t})).reset(q),H.on(Ct.doneData,(function(e,t){return t})).reset(z),K.on(Lt.doneData,(function(e,t){return t})).reset(z),G.on(Mt.doneData,(function(e,t){return t})).reset(z),J.on(Tt.doneData,(function(e,t){return t.kick})).reset(z),Q.on(Tt.doneData,(function(e,t){return t.ban})).reset(z),Y.on(Tt.doneData,(function(e,t){return t.invite})).reset(z),X.on(Tt.doneData,(function(e,t){return t.defaultEvents})).reset(z),Z.on(Tt.doneData,(function(e,t){return t.redact})).reset(z),ee.on(Tt.doneData,(function(e,t){return t.stateDefault})).reset(z),n.forward({from:Ut.pending,to:$}),n.forward({from:ce,to:Ct}),n.forward({from:Qt.done,to:se}),n.forward({from:n.sample({source:H,clock:Ct.done,fn:function(){}}),to:fe}),n.forward({from:Xt.done,to:le}),n.forward({from:Zt.done,to:de}),n.guard({clock:z,filter:Boolean,target:_t}),n.guard({source:z,filter:function(e){return Boolean(e)},target:St}),n.guard({clock:Ft,source:K,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:St}),n.guard({clock:At,source:z,filter:function(e,t){return e===t.roomId},target:St}),n.guard({source:z,clock:er,filter:Boolean,target:Lt}),n.guard({source:n.sample([z,H],me,(function(e,t){var r=w.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:jt,target:Zt}),n.guard({source:n.sample([z,H],ve,(function(e,t){var r=w.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:jt,target:Xt}),n.guard({source:n.sample([z,H],pe,(function(e){var t=w.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:jt,target:Qt}),n.guard({clock:z,filter:Boolean,target:[Mt,Tt]}),Mt.use((function(e){var t=rt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new mt;var o=r.getMember(n);if(!o)throw new mt;return o.powerLevel})),Tt.use((function(e){var t,r,n,o,a,i,u=rt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Lt.use((function(e){var t=rt().getRoom(e);if(!t)throw new ft;return Object.values(t.currentState.members).map((function(e){var t=rt().getUser(e.userId);if(!t)throw new mt;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:xt(t),userId:e.userId}}(e,t)}))})),he.use((function(e){var t=rt().getRoom(e);if(!t)throw new ft;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Ct.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=rt(),o=rt().getRoom(r)){e.next=5;break}throw new ft;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new v.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ut.use(function(){var e=y.default(h.default.mark((function e(r){var n,o,a,i,u,c,s,f;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new dt;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=Ot(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(v.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(v.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=Ot(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ye.use((function(e){if(!rt())throw new lt;return e.map((function(e){return Rt(e)}))})),be.use(function(){var e=y.default(h.default.mark((function e(r){var n,o,a,i,u,c,s;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=rt().getRoom(o)){e.next=4;break}throw new ft;case 4:return c={},e.next=7,rt().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],bt(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),xe.use((function(){return rt().getUsers().map(xt)})),Re.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Yt(Yt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,rt().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ke.use(function(){var t=y.default(h.default.mark((function t(r){var n,o,a,i,u,c,s,f,l,d;return h.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.user,o=r.preset,a=r.initialState,i=void 0===a?[]:a,u=rt(),c=Et(),!(s=c.find((function(e){var t;return null===(t=u.getRoom(e))||void 0===t?void 0:t.currentState.members[n.userId]})))){t.next=6;break}return t.abrupt("return",{roomId:s});case 6:return f={is_direct:!0,invite:[n.userId],visibility:e.Visibility.private,initial_state:i.map((function(e){return Yt(Yt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:o,creation_content:{isDirect:!0,creator:u.getUserId()}},t.next=9,u.createRoom(f);case 9:return l=t.sent,d=l.room_id,t.next=13,Dt(d);case 13:return t.abrupt("return",{roomId:d});case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Pe.use(function(){var e=y.default(h.default.mark((function e(t){var r,n;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,rt().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Oe.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,rt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ee.use(function(){var e=y.default(h.default.mark((function e(t){var r,n;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,rt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ie.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a,i;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=rt(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Dt(r);case 8:return e.abrupt("return",Rt(yt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_t.use((function(e){var t=rt().getRoom(e);return t?Rt(yt(t)):null})),De.use(function(){var e=y.default(h.default.mark((function e(t){return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,rt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var tr=ot(),rr=n.attach({effect:Kt,mapParams:function(e){return{size:e.messages.length}}});_e.on(Ht,(function(e,t){return t.messages})).reset(z),W.on(Ht,(function(e,t){return t.isLive})).reset(z),n.forward({from:n.sample(_e,rr.done,(function(e,t){return t.params.messages})),to:Ue}),n.forward({from:tr.map((function(e){return{messages:e}})),to:rr}),n.guard({source:n.sample([z,H],Vt,(function(e){var t=w.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:H.map((function(e){return Boolean(e)})),target:qt}),Me.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,rt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,rt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Be.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a,i;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,rt().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ne.use(function(){var e=y.default(h.default.mark((function e(t){var r,n,o,a;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=rt().getRoom(r)){e.next=4;break}throw new ft;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new st;case 7:return e.next=9,rt().setRoomReadMarkers(r,n,a,{hidden:!0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$e.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=rt().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;Le({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),Ke.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){rt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),We.use((function(e){var r=e.eventId,n=e.roomId,o=rt();if(!o)throw new lt;var a=o.getRoom(n);if(!a)throw new ft;var i=a.findEventById(r);if(!i)throw new st;var u=o.getUserId();if(!u)throw new pt;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===rt().getUserId()}(i);return{canRedact:c,canEdit:s}})),qt.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:Ot(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}}));var nr=n.combine(jt,qe,Ve,$,(function(e,t,r,n){return e&&!t&&!r&&!n}));return qe.on($t.pending,(function(e,t){return t})).reset(z),Ve.on(Kt.pending,(function(e,t){return t})).reset(z),He.on(Ht,(function(e,t){return t.canPaginateBackward})).reset([me,z]),Ge.on(Ht,(function(e,t){return t.canPaginateForward})).reset([me,z]),n.forward({from:$t.done,to:Je}),n.forward({from:Kt.done,to:Ye}),n.guard({source:Xe,filter:nr,target:$t}),n.guard({source:Qe,filter:nr,target:Kt}),Wt.use(function(){var e=y.default(h.default.mark((function e(r){var n,o,a,i,u,c,s,f;return h.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new dt;case 3:return c="forward"===o?v.default.EventTimeline.FORWARDS:v.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=Ot(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=oe,e.$canInvite=ne,e.$canKick=re,e.$canPaginateBackward=He,e.$canPaginateForward=Ge,e.$canRedact=ie,e.$canSendDefaultEvent=ae,e.$canSetDefaultState=ue,e.$currentJoinedRoomMembers=te,e.$currentRoom=V,e.$currentRoomId=z,e.$currentRoomMembers=K,e.$isLive=W,e.$loadRoomFxPending=$,e.$messages=_e,e.$myPowerLevel=G,e.$paginateBackwardPending=qe,e.$paginateForwardPending=Ve,e.$requiredPowerLevelForBan=Q,e.$requiredPowerLevelForDefaultEvents=X,e.$requiredPowerLevelForDefaultState=ee,e.$requiredPowerLevelForInvite=Y,e.$requiredPowerLevelForKick=J,e.$requiredPowerLevelForRedact=Z,e.$timelineWindow=H,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=We,e.checkIsDirect=It,e.clearCurrentRoomState=q,e.client=rt,e.createClient=tt,e.createClientFx=_,e.createDirectRoomFx=ke,e.createOnSyncThrottled=function(e){return r.throttle({source:O,timeout:e})},e.createRoomFx=Re,e.createRoomMessageBatch=ot,e.deleteMessageFx=Be,e.deleteNotificationRuleFx=B,e.destroyClient=at,e.destroyClientFx=C,e.directRoomCreated=ge,e.editMessageFx=Te,e.getAllUsersFx=xe,e.getLoggedUserFx=F,e.getNotificationRulesFx=L,e.getRoomInfoFx=he,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=rt().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(rt().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomsWithActivitiesFx=ye,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(rt().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(rt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(rt().getAccessToken())}}},e.getUrlPreviewFx=Ke,e.initRoom=ce,e.initStoreFx=D,e.inviteUserFx=Pe,e.joinRoomFx=Ie,e.kickUserRoomFx=Oe,e.leaveRoomFx=De,e.liveTimelineLoaded=se,e.loadRoom=me,e.loadRoomMessage=ve,e.loadRoomMessageDone=le,e.loginByPasswordFx=E,e.loginByTokenFx=I,e.logoutFx=S,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return rt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=Ue,e.onCachedState=P,e.onClientEvent=nt,e.onInitialSync=k,e.onPaginateBackwardDone=Je,e.onPaginateForwardDone=Ye,e.onRoomInitialized=fe,e.onRoomLoaded=de,e.onSync=O,e.onUploadProgress=Le,e.paginateBackward=Xe,e.paginateForward=Qe,e.readAllMessagesFx=Ne,e.renameRoomFx=Ee,e.roomCreated=we,e.roomMessage=Ce,e.searchRoomMessagesFx=be,e.sendMessageFx=Me,e.setNotificationRuleActionFx=M,e.setNotificationRuleEnabledFx=T,e.startClientFx=j,e.stopClientFx=A,e.toLiveTimeline=pe,e.uploadContentFx=$e,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,throttle,effector,_toConsumableArray,_slicedToArray,effectorExtra,_defineProperty,_asyncToGenerator,_regeneratorRuntime,debounce,customErrors);
//# sourceMappingURL=matrix-effector.iife.js.map
