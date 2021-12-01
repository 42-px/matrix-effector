var MatrixEffector=function(e,t,r,n,o,a,i,u,c,s,f,d){"use strict";function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var m,p,v=l(t),g=l(o),w=l(a),b=l(u),h=l(c),y=l(s),x=n.createDomain("root"),R=x.domain("app"),I=R.event(),k=R.event(),E=R.event(),P=R.effect(),D=R.effect(),O=R.effect(),F=R.effect(),A=R.effect(),U=R.effect(),S=R.effect(),C=R.effect(),M=R.effect(),_=R.effect(),j=x.domain("notification"),T=j.effect(),L=j.effect(),B=j.effect(),N=j.effect(),W=x.domain("room"),$=W.store(null),K=W.store(!1),z=W.store(null),V=W.store(null),q=W.store(null),H=W.event(),G=W.store(null),J=W.store(0),Y=W.store({}),Q=W.store(50),X=W.store(50),Z=W.store(50),ee=W.store(0),te=W.store(50),re=W.store(50),ne=z.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),oe=n.combine(J,Q,(function(e,t){return e>=t})),ae=n.combine(J,X,(function(e,t){return e>=t})),ie=n.combine(J,Z,(function(e,t){return e>=t})),ue=n.combine(J,ee,(function(e,t){return e>=t})),ce=n.combine(J,te,(function(e,t){return e>=t})),se=n.combine(J,re,(function(e,t){return e>=t})),fe=n.combine(V,G,(function(e,t){return Boolean(e)&&Boolean(t)})),de=W.event(),le=W.event(),me=W.event(),pe=W.event(),ve=W.event(),ge=W.event(),we=W.event(),be=W.event(),he=W.event(),ye=W.event(),xe=W.event(),Re=W.event(),Ie=W.event(),ke=W.event(),Ee=W.event(),Pe=W.effect(),De=W.effect(),Oe=W.effect(),Fe=W.effect(),Ae=W.effect(),Ue=W.effect(),Se=W.effect(),Ce=W.effect(),Me=W.effect(),_e=W.effect(),je=W.effect(),Te=W.effect(),Le=W.effect(),Be=W.effect(),Ne=W.effect();e.Visibility=void 0,(m=e.Visibility||(e.Visibility={})).public="public",m.private="private",e.Preset=void 0,(p=e.Preset||(e.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var We,$e,Ke,ze=x.domain("messages"),Ve=ze.store([]),qe=ze.event(),He=ze.event(),Ge=ze.event(),Je=ze.event(),Ye=ze.event(),Qe=ze.event(),Xe=ze.event(),Ze=ze.event(),et=ze.store(!1),tt=ze.store(!1),rt=ze.store(!0),nt=ze.store(!0),ot=ze.effect(),at=ze.effect(),it=ze.effect(),ut=ze.effect(),ct=ze.effect(),st=ze.effect(),ft=ze.effect();e.MsgType=void 0,(We=e.MsgType||(e.MsgType={})).Audio="m.audio",We.BadEncrypted="m.bad.encrypted",We.Emote="m.emote",We.File="m.file",We.Image="m.image",We.Notice="m.notice",We.Text="m.text",We.Video="m.video",We.Location="m.location",e.MatrixMembershipType=void 0,($e=e.MatrixMembershipType||(e.MatrixMembershipType={})).leave="leave",$e.invite="invite",$e.ban="ban",$e.join="join",$e.knock="knock";var dt=500,lt=[],mt=function(){Ke&&(Ke.removeAllListeners(),Ke=null)},pt=function(e){var t=e.options,r=e.messageBatchInterval;mt(),void 0!==r&&(dt=r),Ke=v.default.createClient(t),lt.forEach((function(e){var t=w.default(e,2),r=t[0],n=t[1];Ke.on(r,n)}))},vt=function(){return Ke},gt=function(e){lt.push.apply(lt,g.default(e))},wt=function(){return i.batchEvents(He,dt)},bt="m.room.message",ht="m.room.redaction",yt="m.direct",xt=f.createCustomError("EventNotFound"),Rt=f.createCustomError("RoomNotFound"),It=f.createCustomError("ClientNotInitialized"),kt=f.createCustomError("TimelineWindowUndefined"),Et=f.createCustomError("UserNotFound"),Pt=f.createCustomError("UserNotLoggedIn");function Dt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ot(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Dt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Dt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ft=function(e){return e.getContent()};function At(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:Ft(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function Ut(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function St(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(At(t)),e}var Ct=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function Mt(e){var t,r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,a=vt(),i=a.getRoom(e.roomId);if(!i)throw new Rt;for(var u=i.getLiveTimeline().getEvents(),c=null===(t=i.currentState.getStateEvents("m.room.create",""))||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect,s=0,f=u.length-1;f>=0&&f!==u.length-o;f--){var d=u[f],l=i.hasUserReadEvent(a.getUserId(),d.getId());if(l)break;s+=1}var m=u.filter((function(e){return[bt,ht].includes(e.getType())})).reduce(St,[]),p=m.length?m[m.length-1]:void 0,v=c?i.getMember(i.guessDMUserId()):null;return Ot(Ot({},e),{},{unreadCount:s,lastMessage:p,isDirect:c,directUserId:null==v?void 0:v.userId,isOnline:v?Boolean(null===(n=v.user)||void 0===n?void 0:n.currentlyActive):void 0,lastActivityTS:i.getLastActiveTimestamp()})}function _t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function jt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_t(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Tt(e){return e.getEvents().filter((function(e){return[bt,ht].includes(e.getType())})).reduce(St,[])}var Lt=function(){var e=h.default(y.default.mark((function e(t,r){var n,o,a,i,u,c;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=vt(),a=o.getRoom(t).currentState.getStateEvents("m.room.create")[0].getContent(),i=a.creator,u=o.getAccountData(yt).getContent(),c=null!==(n=u[i])&&void 0!==n?n:[],!r){e.next=8;break}return e.next=7,o.setAccountData(yt,jt(jt({},u),{},b.default({},r,[t])));case 7:case 10:return e.abrupt("return",e.sent);case 8:return e.next=10,o.setAccountData(yt,jt(jt({},u),{},b.default({},i,[].concat(g.default(c),[t]))));case 11:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();function Bt(){return vt().getRooms().map(Ut)}n.forward({from:P.done.map((function(){return{initialSyncLimit:20}})),to:F}),gt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==bt&&a!==ht||!r&&o.liveEvent&&He(At(e))}],["Room",function(e){var t,r,n=vt(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create")[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?ke(e):Ee(e))}],["Room.localEchoUpdated",function(){return qe()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=Bt();E(r)}else{var n=Bt();I(n)}else{var o=Bt();k(o)}}],["RoomState.members",function(e,t,r){return pe(r)}],["RoomState.newMember",function(e,t,r){return pe(r)}],["RoomMember.membership",function(e,t){return pe(t)}],["RoomMember.name",function(e,t){return pe(t)}],["RoomMember.powerLevel",function(e,t){return pe(t)}],["RoomMember.typing",function(e,t){return le(t)}],["User.avatarUrl",function(e,t){return me(t)}],["User.presence",function(e,t){return me(t)}],["User.displayName",function(e,t){return me(t)}]]),P.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),D.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),O.use(h.default(y.default.mark((function e(){var t,r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=vt(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),F.use((function(e){return vt().startClient(e)})),S.use(h.default(y.default.mark((function e(){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().logout();case 2:case"end":return e.stop()}}),e)})))),U.use((function(){return vt().stopClient()})),A.use(h.default(y.default.mark((function e(){var t,r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=vt()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=Ct(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),C.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,pt(r),o=vt(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,vt().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),M.use(h.default(y.default.mark((function e(){var t,r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=vt()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),mt();case 9:case"end":return e.stop()}}),e)})))),_.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=vt(),n=r.getUser(t)){e.next=4;break}throw new Et;case 4:return e.abrupt("return",Ct(n));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),T.use((function(){return vt().getPushRules()})),L.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,vt().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),B.use(function(){var e=h.default(y.default.mark((function e(t){var r;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,vt().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,vt().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),N.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Nt=W.effect(),Wt=W.effect(),$t=W.effect(),Kt=W.effect();function zt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Vt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?zt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):zt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var qt=n.attach({effect:Le}),Ht=n.attach({effect:Le}),Gt=n.attach({effect:Le}),Jt=d.debounce({source:ve,timeout:500}),Yt=n.attach({effect:Be});function Qt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Xt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Qt(Object(r),!0).forEach((function(t){b.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Qt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Y.on(le,(function(e,t){return t.typing?e[t.roomId]?Vt(Vt({},e),{},b.default({},t.roomId,[].concat(g.default(e[t.roomId]),[t]))):Vt(Vt({},e),{},b.default({},t.roomId,[t])):e[t.roomId]?e[t.roomId].length>1?Vt(Vt({},e),{},b.default({},t.roomId,g.default(e[t.roomId].filter((function(e){return e.userId!==t.userId}))))):(delete e[t.roomId],Vt({},e)):void 0})).reset(de),V.on(ge,(function(e,t){return t.roomId})).reset(H),q.on(Yt.doneData,(function(e,t){return t})).reset(H),G.on(Nt.doneData,(function(e,t){return t})).reset(V),z.on(Wt.doneData,(function(e,t){return t})).reset(V),J.on($t.doneData,(function(e,t){return t})).reset(V),Q.on(Kt.doneData,(function(e,t){return t.kick})).reset(V),Z.on(Kt.doneData,(function(e,t){return t.ban})).reset(V),X.on(Kt.doneData,(function(e,t){return t.invite})).reset(V),ee.on(Kt.doneData,(function(e,t){return t.defaultEvents})).reset(V),te.on(Kt.doneData,(function(e,t){return t.redact})).reset(V),re.on(Kt.doneData,(function(e,t){return t.stateDefault})).reset(V),n.forward({from:Le.pending,to:K}),n.forward({from:ge,to:Nt}),n.forward({from:qt.done,to:we}),n.forward({from:n.sample({source:G,clock:Nt.done,fn:function(){}}),to:be}),n.forward({from:Ht.done,to:he}),n.forward({from:Gt.done,to:ye}),n.guard({clock:V,filter:Boolean,target:Yt}),n.guard({source:V,filter:function(e){return Boolean(e)},target:ve}),n.guard({clock:me,source:z,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:ve}),n.guard({clock:pe,source:V,filter:function(e,t){return e===t.roomId},target:ve}),n.guard({source:V,clock:Jt,filter:Boolean,target:Wt}),n.guard({source:n.sample([V,G],xe,(function(e,t){var r=w.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:fe,target:Gt}),n.guard({source:n.sample([V,G],Ie,(function(e,t){var r=w.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:fe,target:Ht}),n.guard({source:n.sample([V,G],Re,(function(e){var t=w.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:fe,target:qt}),n.guard({clock:V,filter:Boolean,target:[$t,Kt]}),$t.use((function(e){var t=vt(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new Et;var o=r.getMember(n);if(!o)throw new Et;return o.powerLevel})),Kt.use((function(e){var t,r,n,o,a,i,u=vt().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Wt.use((function(e){var t=vt().getRoom(e);if(!t)throw new Rt;return Object.values(t.currentState.members).map((function(e){var t=vt().getUser(e.userId);if(!t)throw new Et;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:Ct(t),userId:e.userId}}(e,t)}))})),Fe.use((function(e){var t=vt().getRoom(e);if(!t)throw new Rt;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),Nt.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=vt(),o=vt().getRoom(r)){e.next=5;break}throw new Rt;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new v.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Le.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){e.next=3;break}throw new kt;case 3:return e.next=5,n.load(o,a);case 5:if(u=n.canPaginate(t.Direction.Forward),c=Tt(n),!(a&&c.length<a)){e.next=19;break}if(f=a-c.length,"BACKWARD"!==i){e.next=15;break}return e.next=12,n.paginate(v.default.EventTimeline.BACKWARDS,f);case 12:s=e.sent,e.next=18;break;case 15:return e.next=17,n.paginate(v.default.EventTimeline.FORWARDS,f);case 17:s=e.sent;case 18:s&&(c=Tt(n));case 19:return e.abrupt("return",{messages:c,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Oe.use((function(e){if(!vt())throw new It;return e.map((function(e){return Mt(e)}))})),De.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?t.SearchOrderBy.Rank:a,u=vt().getRoom(o)){e.next=4;break}throw new Rt;case 4:return c={},e.next=7,vt().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return s=e.sent,e.abrupt("return",s.search_categories.room_events.results.map((function(e){var r=e.result,n=new t.MatrixEvent(r),o=n.getSender();return void 0===c[o]&&(c[o]=u.getMember(o)),n.sender=c[o],At(n)})));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ae.use((function(){return vt().getUsers().map(Ct)})),Ue.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,c={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Vt(Vt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,vt().createRoom(c);case 4:return s=e.sent,f=s.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Se.use(function(){var t=h.default(y.default.mark((function t(r){var n,o,a,i,u,c,s,f,d,l;return y.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.user,o=r.preset,a=r.initialState,i=void 0===a?[]:a,u=vt(),m=void 0,m=vt().getAccountData(yt).getContent(),c=m&&Object.values(m).flatMap((function(e){return e})),!(s=c.find((function(e){var t;return null===(t=u.getRoom(e))||void 0===t?void 0:t.currentState.members[n.userId]})))){t.next=6;break}return t.abrupt("return",{roomId:s});case 6:return f={is_direct:!0,invite:[n.userId],visibility:e.Visibility.private,initial_state:i.map((function(e){return Vt(Vt({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:o,creation_content:{isDirect:!0,creator:u.getUserId()}},t.next=9,u.createRoom(f);case 9:return d=t.sent,l=d.room_id,t.next=13,Lt(l,n.userId);case 13:return t.abrupt("return",{roomId:l});case 14:case"end":return t.stop()}var m}),t)})));return function(e){return t.apply(this,arguments)}}()),Ce.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,vt().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Me.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,vt().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,vt().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),je.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=vt(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Lt(r);case 8:return e.abrupt("return",Mt(Ut(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Be.use((function(e){var t=vt().getRoom(e);return t?Mt(Ut(t)):null})),Te.use(function(){var e=h.default(y.default.mark((function e(t){return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,vt().leave(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Pe.use((function(e){var t,r=vt(),n=null===(t=r.getAccountData(yt))||void 0===t?void 0:t.getContent(),o=n[e]&&n[e][0];if(!o)throw new Rt;var a=r.getRoom(o);if(!a)throw new Rt;return Ut(a)})),Ne.use(function(){var e=h.default(y.default.mark((function e(t){var r,n;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isTyping,e.next=3,vt().sendTyping(r,n,5e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Zt=ze.effect(),er=n.attach({source:[V,G],effect:Zt,mapParams:function(e,t){var r=w.default(t,2);return Xt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),tr=n.attach({source:[V,G],effect:Zt,mapParams:function(e,t){var r=w.default(t,2);return Xt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}}),rr=ze.effect(),nr=n.guard({source:n.sample(V,[Le.done,Zt.done,rr.done],(function(e,t){return Xt({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}}),or=wt(),ar=n.attach({effect:tr,mapParams:function(e){return{size:e.messages.length}}});Ve.on(nr,(function(e,t){return t.messages})).reset(V),$.on(nr,(function(e,t){return t.isLive})).reset(V);var ir=n.combine(fe,tt,et,K,(function(e,t,r,n){return e&&!t&&!r&&!n}));return tt.on(er.pending,(function(e,t){return t})).reset(V),et.on(tr.pending,(function(e,t){return t})).reset(V),rt.on(nr,(function(e,t){return t.canPaginateBackward})).reset([xe,V]),nt.on(nr,(function(e,t){return t.canPaginateForward})).reset([xe,V]),n.forward({from:er.done,to:Ye}),n.forward({from:tr.done,to:Qe}),n.guard({source:Ze,filter:ir,target:er}),n.guard({source:Xe,filter:ir,target:tr}),n.forward({from:n.sample(Ve,ar.done,(function(e,t){return t.params.messages})),to:Ge}),n.forward({from:or.map((function(e){return{messages:e}})),to:ar}),n.guard({source:n.sample([V,G],qe,(function(e){var t=w.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:G.map((function(e){return Boolean(e)})),target:rr}),ot.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,vt().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),at.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,vt().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),it.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a,i;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,vt().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ut.use(function(){var e=h.default(y.default.mark((function e(t){var r,n,o,a;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=vt().getRoom(r)){e.next=4;break}throw new Rt;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new xt;case 7:return e.next=9,vt().setRoomReadMarkers(r,n,a,{hidden:void 0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),st.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=vt().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;Je({file:t,loaded:r,total:n})}}),c={promise:u};return u.abort&&(c.abort=u.abort),c})),ft.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){vt().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),ct.use((function(e){var r=e.eventId,n=e.roomId,o=vt();if(!o)throw new It;var a=o.getRoom(n);if(!a)throw new Rt;var i=a.findEventById(r);if(!i)throw new xt;var u=o.getUserId();if(!u)throw new Pt;var c=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),s=function(e){if(e.status===t.EventStatus.CANCELLED||"m.room.message"!==e.getType()||e.isRedacted())return!1;var r=e.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&e.getSender()===vt().getUserId()}(i);return{canRedact:c,canEdit:s}})),rr.use((function(e){var r=e.timelineWindow,n=r.canPaginate(t.Direction.Forward);return{messages:Tt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(t.Direction.Backward)}})),Zt.use(function(){var e=h.default(y.default.mark((function e(r){var n,o,a,i,u,c,s,f;return y.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){e.next=3;break}throw new kt;case 3:return c="forward"===o?v.default.EventTimeline.FORWARDS:v.default.EventTimeline.BACKWARDS,e.next=6,n.paginate(c,a,i,u);case 6:return s=n.canPaginate(t.Direction.Forward),f=Tt(n),e.abrupt("return",{messages:f,isLive:!s,canPaginateForward:s,canPaginateBackward:n.canPaginate(t.Direction.Backward)});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.$canBan=ie,e.$canInvite=ae,e.$canKick=oe,e.$canPaginateBackward=rt,e.$canPaginateForward=nt,e.$canRedact=ce,e.$canSendDefaultEvent=ue,e.$canSetDefaultState=se,e.$currentJoinedRoomMembers=ne,e.$currentRoom=q,e.$currentRoomId=V,e.$currentRoomMembers=z,e.$isLive=$,e.$loadFilter=fe,e.$loadRoomFxPending=K,e.$messages=Ve,e.$myPowerLevel=J,e.$paginateBackwardPending=tt,e.$paginateForwardPending=et,e.$requiredPowerLevelForBan=Z,e.$requiredPowerLevelForDefaultEvents=ee,e.$requiredPowerLevelForDefaultState=re,e.$requiredPowerLevelForInvite=X,e.$requiredPowerLevelForKick=Q,e.$requiredPowerLevelForRedact=te,e.$timelineWindow=G,e.$typingMembers=Y,e.DEFAULT_BAN_POWERLEVEL=50,e.DEFAULT_INVITE_POWERLEVEL=50,e.DEFAULT_KICK_POWERLEVEL=50,e.DEFAULT_REDACT_POWERLEVEL=50,e.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,e.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,e.checkEventPermissionsFx=ct,e.clearCurrentRoomState=H,e.clearTypingMember=de,e.client=vt,e.createClient=pt,e.createClientFx=C,e.createDirectRoomFx=Se,e.createOnSyncThrottled=function(e){return r.throttle({source:E,timeout:e})},e.createRoomFx=Ue,e.createRoomMessageBatch=wt,e.deleteMessageFx=it,e.deleteNotificationRuleFx=N,e.destroyClient=mt,e.destroyClientFx=M,e.directRoomCreated=ke,e.editMessageFx=at,e.findDirectRoomByUserIdFx=Pe,e.getAllUsersFx=Ae,e.getLoggedUserFx=A,e.getNotificationRulesFx=T,e.getProfileInfoFx=_,e.getRoomByIdFx=Be,e.getRoomInfoFx=Fe,e.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,c=vt().getRoom(t);if(!c)return null;var s=c.getMember(r);return s?s.getAvatarUrl(vt().getHomeserverUrl(),n,o,a,u,!0):null},e.getRoomMembers=ve,e.getRoomsWithActivitiesFx=Oe,e.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,c=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(vt().getHomeserverUrl(),r,n,o,i,c):null},e.getUploadCredentials=function(){return{endpointUrl:"".concat(vt().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(vt().getAccessToken())}}},e.getUrlPreviewFx=ft,e.initRoom=ge,e.initStoreFx=O,e.inviteUserFx=Ce,e.joinRoomFx=je,e.kickUserRoomFx=Me,e.leaveRoomFx=Te,e.liveTimelineLoaded=we,e.loadRoom=xe,e.loadRoomFx=Le,e.loadRoomMessage=Ie,e.loadRoomMessageDone=he,e.loginByPasswordFx=P,e.loginByTokenFx=D,e.logoutFx=S,e.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return vt().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},e.newMessagesLoaded=Ge,e.onCachedState=k,e.onClientEvent=gt,e.onInitialSync=I,e.onPaginateBackwardDone=Ye,e.onPaginateForwardDone=Qe,e.onRoomInitialized=be,e.onRoomLoaded=ye,e.onRoomMemberUpdate=pe,e.onRoomUserUpdate=me,e.onSync=E,e.onUploadProgress=Je,e.paginateBackward=Ze,e.paginateForward=Xe,e.readAllMessagesFx=ut,e.renameRoomFx=_e,e.roomCreated=Ee,e.roomMessage=He,e.searchRoomMessagesFx=De,e.sendMessageFx=ot,e.sendTypingFx=Ne,e.setNotificationRuleActionFx=L,e.setNotificationRuleEnabledFx=B,e.startClientFx=F,e.stopClientFx=U,e.toLiveTimeline=Re,e.toggleTypingUser=le,e.updateMessages=qe,e.uploadContentFx=st,Object.defineProperty(e,"__esModule",{value:!0}),e}({},matrix,throttle,effector,_toConsumableArray,_slicedToArray,effectorExtra,_defineProperty,_asyncToGenerator,_regeneratorRuntime,customErrors,debounce);
//# sourceMappingURL=matrix-effector.iife.js.map
