"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("matrix-js-sdk"),t=require("patronum/throttle"),r=require("effector"),n=require("@babel/runtime/helpers/toConsumableArray"),o=require("@babel/runtime/helpers/slicedToArray"),a=require("@42px/effector-extra"),i=require("@babel/runtime/helpers/defineProperty"),u=require("@babel/runtime/helpers/asyncToGenerator"),s=require("@babel/runtime/regenerator"),c=require("patronum/debounce"),f=require("@42px/custom-errors");function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d,p,m=l(e),v=l(n),g=l(o),x=l(i),w=l(u),b=l(s),h=r.createDomain("root"),y=h.domain("app"),k=y.event(),P=y.event(),R=y.event(),O=y.effect(),E=y.effect(),I=y.effect(),D=y.effect(),j=y.effect(),F=y.effect(),A=y.effect(),S=y.effect(),C=y.effect(),U=h.domain("notification"),L=U.effect(),_=U.effect(),M=U.effect(),T=U.effect(),B=h.domain("room"),N=B.store(null),W=B.store(!1),$=B.store(null),q=B.store(null),K=B.store(null),z=B.event(),V=B.store(null),H=B.store(0),G=B.store(50),J=B.store(50),Y=B.store(50),Q=B.store(0),X=B.store(50),Z=B.store(50),ee=$.map((function(e){var t;return null!==(t=null==e?void 0:e.filter((function(e){return"join"===e.membership})))&&void 0!==t?t:[]})),te=r.combine(H,G,(function(e,t){return e>=t})),re=r.combine(H,J,(function(e,t){return e>=t})),ne=r.combine(H,Y,(function(e,t){return e>=t})),oe=r.combine(H,Q,(function(e,t){return e>=t})),ae=r.combine(H,X,(function(e,t){return e>=t})),ie=r.combine(H,Z,(function(e,t){return e>=t})),ue=B.event(),se=B.event(),ce=B.event(),fe=B.event(),le=B.event(),de=B.event(),pe=B.event(),me=B.event(),ve=B.event(),ge=B.event(),xe=B.effect(),we=B.effect(),be=B.effect(),he=B.effect(),ye=B.effect(),ke=B.effect(),Pe=B.effect(),Re=B.effect(),Oe=B.effect(),Ee=B.effect();exports.Visibility=void 0,(d=exports.Visibility||(exports.Visibility={})).public="public",d.private="private",exports.Preset=void 0,(p=exports.Preset||(exports.Preset={})).trustedPrivateChat="trusted_private_chat",p.privateChat="private_chat",p.publicChat="public_chat";var Ie,De,je,Fe=h.domain("messages"),Ae=Fe.store([]),Se=Fe.event(),Ce=Fe.event(),Ue=Fe.event(),Le=Fe.effect(),_e=Fe.effect(),Me=Fe.effect(),Te=Fe.effect(),Be=Fe.effect(),Ne=Fe.effect(),We=Fe.effect(),$e=h.domain("pagination"),qe=$e.store(!1),Ke=$e.store(!1),ze=$e.store(!0),Ve=$e.store(!0),He=$e.event(),Ge=$e.event(),Je=$e.event(),Ye=$e.event();exports.MsgType=void 0,(Ie=exports.MsgType||(exports.MsgType={})).Audio="m.audio",Ie.BadEncrypted="m.bad.encrypted",Ie.Emote="m.emote",Ie.File="m.file",Ie.Image="m.image",Ie.Notice="m.notice",Ie.Text="m.text",Ie.Video="m.video",Ie.Location="m.location",exports.MatrixMembershipType=void 0,(De=exports.MatrixMembershipType||(exports.MatrixMembershipType={})).leave="leave",De.invite="invite",De.ban="ban",De.join="join",De.knock="knock";var Qe=500,Xe=[],Ze=function(e){var t=e.options,r=e.messageBatchInterval;nt(),void 0!==r&&(Qe=r),je=m.default.createClient(t),Xe.forEach((function(e){var t=g.default(e,2),r=t[0],n=t[1];je.on(r,n)}))},et=function(){return je},tt=function(e){Xe.push.apply(Xe,v.default(e))},rt=function(){return a.batchEvents(Se,Qe)},nt=function(){je&&(je.removeAllListeners(),je=null)},ot="m.room.message",at="m.room.redaction",it=f.createCustomError("EventNotFound"),ut=f.createCustomError("RoomNotFound"),st=f.createCustomError("ClientNotInitialized"),ct=f.createCustomError("TimelineWindowUndefined"),ft=f.createCustomError("UserNotFound"),lt=f.createCustomError("UserNotLoggedIn");function dt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function pt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?dt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):dt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function mt(e){return e.getContent()}function vt(e,t){var r=e.getRelation();return{originalEventId:void 0!==t?t:e.getId(),content:mt(e),sender:e.sender,originServerTs:e.getDate(),edited:"m.replace"===(null==r?void 0:r.rel_type),redacted:e.isRedacted()||e.isRedaction()}}function gt(e){return{roomId:e.roomId,name:e.name,summary:e.summary,myMembership:e.getMyMembership()}}function xt(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(vt(t)),e}var wt=function(e){return{avatarUrl:e.avatarUrl,userId:e.userId,currentlyActive:e.currentlyActive,displayName:e.displayName,lastActiveAgo:e.lastActiveAgo,lastPresenceTs:e.lastPresenceTs,presence:e.presence}};function bt(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:99,n=et(),o=n.getRoom(e.roomId);if(!o)throw new ut;for(var a=o.getLiveTimeline().getEvents(),i=0,u=a.length-1;u>=0&&u!==a.length-r;u--){var s=a[u],c=o.hasUserReadEvent(n.getUserId(),s.getId());if(c)break;i+=1}var f=a.filter((function(e){return[ot,at].includes(e.getType())})).reduce(xt,[]),l=f.length?f[f.length-1]:void 0,d=Rt(e.roomId),p=d?o.getMember(o.guessDMUserId()):null;return pt(pt({},e),{},{unreadCount:i,lastMessage:l,isDirect:d,directUserId:null==p?void 0:p.userId,isOnline:p?Boolean(null===(t=p.user)||void 0===t?void 0:t.currentlyActive):void 0,lastActivityTS:o.getLastActiveTimestamp()})}function ht(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function yt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ht(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ht(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function kt(e){return e.getEvents().filter((function(e){return[ot,at].includes(e.getType())})).reduce(xt,[])}var Pt=function(){var e=et().getAccountData("m.direct").getContent();return e&&Object.values(e).flatMap((function(e){return e}))},Rt=function(e){return Pt().includes(e)},Ot=function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=et(),a=null===(r=o.getRoom(t))||void 0===r?void 0:r.currentState.getStateEvents("m.room.create",void 0).getContent(),i=a.creator,u=o.getAccountData("m.direct").getContent(),s=null!==(n=u[i])&&void 0!==n?n:[],e.next=6,o.setAccountData("m.direct",yt(yt({},u),{},x.default({},i,[].concat(v.default(s),[t]))));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Et=r.combine(q,V,(function(e,t){return Boolean(e)&&Boolean(t)})),It=B.event(),Dt=B.event(),jt=B.event(),Ft=B.effect(),At=B.effect(),St=B.effect(),Ct=B.effect(),Ut=B.effect(),Lt=B.effect();function _t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Mt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_t(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Tt=$e.effect(),Bt=r.attach({source:[q,V],effect:Tt,mapParams:function(e,t){var r=g.default(t,2);return Mt({roomId:r[0],timelineWindow:r[1],direction:"backward"},e)}}),Nt=r.attach({source:[q,V],effect:Tt,mapParams:function(e,t){var r=g.default(t,2);return Mt({roomId:r[0],timelineWindow:r[1],direction:"forward"},e)}});function Wt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var $t=Fe.event(),qt=Fe.effect(),Kt=r.guard({source:r.sample(q,[St.done,Tt.done,qt.done],(function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Wt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Wt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({currentRoomId:e,roomId:t.params.roomId},t.result)})),filter:function(e){return e.currentRoomId===e.roomId}});function zt(){return et().getRooms().map(gt)}function Vt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ht(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Vt(Object(r),!0).forEach((function(t){x.default(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Vt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}r.forward({from:O.done.map((function(){return{initialSyncLimit:20}})),to:D}),tt([["Room.timeline",function(e,t,r,n,o){var a=e.getType();a!==ot&&a!==at||!r&&o.liveEvent&&Se(vt(e))}],["Room",function(e){var t,r,n=et(),o=e.getMember(n.getUserId());o&&"invite"!==o.membership||((null===(t=e.currentState.getStateEvents("m.room.create",void 0)[0])||void 0===t||null===(r=t.getContent())||void 0===r?void 0:r.isDirect)?ve(e):ge(e))}],["Room.localEchoUpdated",function(){return $t()}],["sync",function(e,t){if("PREPARED"!==e)if("SYNCING"!==e||"PREPARED"!==t)if("SYNCING"!==e||"SYNCING"!==t);else{var r=zt();R(r)}else{var n=zt();k(n)}else{var o=zt();P(o)}}],["RoomState.members",function(e,t,r){return Dt(r)}],["RoomState.newMember",function(e,t,r){return Dt(r)}],["RoomMember.membership",function(e,t){return Dt(t)}],["RoomMember.name",function(e,t){return Dt(t)}],["RoomMember.powerLevel",function(e,t){return Dt(t)}],["RoomMember.typing",function(e,t){return Dt(t)}],["User.avatarUrl",function(e,t){return It(t)}],["User.presence",function(e,t){return It(t)}],["User.displayName",function(e,t){return It(t)}]]),O.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,et().login("m.login.password",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),E.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl,"/_matrix/client/r0/login"),{method:"POST",body:JSON.stringify({type:"m.login.token",token:t.token})});case 2:return r=e.sent,e.next=5,r.json();case 5:return n=e.sent,o=n.user_id,a=n.access_token,i=n.device_id,u=n.well_known,e.abrupt("return",{userId:o,accessToken:a,deviceId:i,wellKnown:u});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I.use(w.default(b.default.mark((function e(){var t,r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=et(),!(r=t.store)){e.next=3;break}return e.abrupt("return",r.startup());case 3:case"end":return e.stop()}}),e)})))),D.use((function(e){return et().startClient(e)})),A.use(w.default(b.default.mark((function e(){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,et().logout();case 2:case"end":return e.stop()}}),e)})))),F.use((function(){return et().stopClient()})),j.use(w.default(b.default.mark((function e(){var t,r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=et()){e.next=3;break}return e.abrupt("return",null);case 3:if(r=t.getUserId()){e.next=6;break}return e.abrupt("return",null);case 6:if(n=t.getUser(r)){e.next=9;break}return e.abrupt("return",null);case 9:if((o=wt(n)).avatarUrl&&o.displayName){e.next=16;break}return e.next=13,t.getProfileInfo(r);case 13:a=e.sent,o.avatarUrl=a.avatar_url,o.displayName=a.displayname;case 16:return e.abrupt("return",o);case 17:case"end":return e.stop()}}),e)})))),S.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.createClientParams,n=t.startClientParams,Ze(r),o=et(),!(a=o.store)){e.next=6;break}return e.next=6,a.startup();case 6:return e.next=8,et().startClient(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C.use(w.default(b.default.mark((function e(){var t,r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=et()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,r.logout();case 5:return e.next=7,null===(t=r.store)||void 0===t?void 0:t.deleteAllData();case 7:r.stopClient(),nt();case 9:case"end":return e.stop()}}),e)})))),L.use((function(){return et().getPushRules()})),_.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,et().setPushRuleActions(t.scope,t.kind,t.ruleId,t.actions);case 3:e.next=10;break;case 5:throw e.prev=5,e.t0=e.catch(0),console.error("Error while setNotificationRuleAction.Fx"),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()),M.use(function(){var e=w.default(b.default.mark((function e(t){var r;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.error("Getting push rules..."),e.next=4,et().getPushRules();case 4:return r=e.sent,console.error(r.global.room),e.next=8,et().setPushRuleEnabled(t.scope,t.kind,t.ruleId,t.enabled);case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error while setNotificationRuleEnabled"),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()),T.use(function(){var e=w.default(b.default.mark((function e(t){return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,et().deletePushRule(t.scope,t.kind,t.ruleId);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Gt=r.attach({effect:St}),Jt=r.attach({effect:St}),Yt=r.attach({effect:St}),Qt=c.debounce({source:jt,timeout:500});q.on(ue,(function(e,t){return t.roomId})).reset(z),K.on(Ft.doneData,(function(e,t){return t})).reset(z),V.on(At.doneData,(function(e,t){return t})).reset(q),$.on(Ct.doneData,(function(e,t){return t})).reset(q),H.on(Ut.doneData,(function(e,t){return t})).reset(q),G.on(Lt.doneData,(function(e,t){return t.kick})).reset(q),Y.on(Lt.doneData,(function(e,t){return t.ban})).reset(q),J.on(Lt.doneData,(function(e,t){return t.invite})).reset(q),Q.on(Lt.doneData,(function(e,t){return t.defaultEvents})).reset(q),X.on(Lt.doneData,(function(e,t){return t.redact})).reset(q),Z.on(Lt.doneData,(function(e,t){return t.stateDefault})).reset(q),r.forward({from:St.pending,to:W}),r.forward({from:ue,to:At}),r.forward({from:Gt.done,to:se}),r.forward({from:r.sample({source:V,clock:At.done,fn:function(){}}),to:ce}),r.forward({from:Jt.done,to:fe}),r.forward({from:Yt.done,to:le}),r.guard({clock:q,filter:Boolean,target:Ft}),r.guard({source:q,filter:function(e){return Boolean(e)},target:jt}),r.guard({clock:It,source:$,filter:function(e,t){return Boolean(null==e?void 0:e.find((function(e){return e.userId===t.userId})))},target:jt}),r.guard({clock:Dt,source:q,filter:function(e,t){return e===t.roomId},target:jt}),r.guard({source:q,clock:Qt,filter:Boolean,target:Ct}),r.guard({source:r.sample([q,V],de,(function(e,t){var r=g.default(e,2),n=r[0],o=r[1],a=t.initialEventId,i=t.initialWindowSize,u=t.loadAdditionalDataDirection;return{roomId:n,timelineWindow:o,initialEventId:a,initialWindowSize:i,loadAdditionalDataDirection:void 0===u?"BACKWARD":u}})),filter:Et,target:Yt}),r.guard({source:r.sample([q,V],me,(function(e,t){var r=g.default(e,2);return{roomId:r[0],timelineWindow:r[1],initialEventId:t.initialEventId,initialWindowSize:t.initialWindowSize,loadAdditionalDataDirection:"BACKWARD"}})),filter:Et,target:Jt}),r.guard({source:r.sample([q,V],pe,(function(e){var t=g.default(e,2);return{roomId:t[0],timelineWindow:t[1],loadAdditionalDataDirection:"BACKWARD"}})),filter:Et,target:Gt}),r.guard({clock:q,filter:Boolean,target:[Ut,Lt]}),Ut.use((function(e){var t=et(),r=t.getRoom(e),n=t.getUserId();if(!n)throw new ft;var o=r.getMember(n);if(!o)throw new ft;return o.powerLevel})),Lt.use((function(e){var t,r,n,o,a,i,u=et().getRoom(e).currentState.getStateEvents("m.room.power_levels","").getContent();return console.log(u),{kick:null!==(t=u.kick)&&void 0!==t?t:50,ban:null!==(r=u.ban)&&void 0!==r?r:50,invite:null!==(n=u.invite)&&void 0!==n?n:50,defaultEvents:null!==(o=u.events_default)&&void 0!==o?o:0,stateDefault:null!==(a=u.state_default)&&void 0!==a?a:50,redact:null!==(i=u.redact)&&void 0!==i?i:50}})),Ct.use((function(e){var t=et().getRoom(e);if(!t)throw new ut;return Object.values(t.currentState.members).map((function(e){var t=et().getUser(e.userId);if(!t)throw new ft;return function(e,t){return{membership:e.membership,name:e.name,powerLevel:e.powerLevel,powerLevelNorm:e.powerLevelNorm,rawDisplayName:e.rawDisplayName,roomId:e.roomId,typing:e.typing,user:wt(t),userId:e.userId}}(e,t)}))})),be.use((function(e){var t=et().getRoom(e);if(!t)throw new ut;return function(e){return{roomMembersCount:e.getJoinedMemberCount()}}(t)})),At.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=et(),o=et().getRoom(r)){e.next=5;break}throw new ut;case 5:return a=o.getUnfilteredTimelineSet(),e.abrupt("return",new m.default.TimelineWindow(n,a));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),St.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c,f;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.initialEventId,a=r.initialWindowSize,i=r.loadAdditionalDataDirection,n){t.next=3;break}throw new ct;case 3:return t.next=5,n.load(o,a);case 5:if(u=n.canPaginate(e.Direction.Forward),s=kt(n),!(a&&s.length<a)){t.next=19;break}if(f=a-s.length,"BACKWARD"!==i){t.next=15;break}return t.next=12,n.paginate(m.default.EventTimeline.BACKWARDS,f);case 12:c=t.sent,t.next=18;break;case 15:return t.next=17,n.paginate(m.default.EventTimeline.FORWARDS,f);case 17:c=t.sent;case 18:c&&(s=kt(n));case 19:return t.abrupt("return",{messages:s,isLive:!u,canPaginateForward:u,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),we.use((function(e){if(!et())throw new st;return e.map((function(e){return bt(e)}))})),xe.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.term,o=r.roomId,a=r.orderBy,i=void 0===a?e.SearchOrderBy.Rank:a,u=et().getRoom(o)){t.next=4;break}throw new ut;case 4:return s={},t.next=7,et().search({body:{search_categories:{room_events:{search_term:n,keys:["content.body"],filter:{rooms:[o]},order_by:i}}}});case 7:return c=t.sent,t.abrupt("return",c.search_categories.room_events.results.map((function(t){var r=t.result,n=new e.MatrixEvent(r),o=n.getSender();return void 0===s[o]&&(s[o]=u.getMember(o)),n.sender=s[o],vt(n)})));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),he.use((function(){return et().getUsers().map(wt)})),ye.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s,c,f;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.name,n=t.invite,o=t.visibility,a=t.initialState,i=void 0===a?[]:a,u=t.preset,s={name:r,invite:n,visibility:o,initial_state:i.map((function(e){return Ht(Ht({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:u},e.next=4,et().createRoom(s);case 4:return c=e.sent,f=c.room_id,e.abrupt("return",{roomId:f});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ke.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i,u,s,c,f,l;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.user,n=t.preset,o=t.initialState,a=void 0===o?[]:o,i=et(),u=Pt(),!(s=u.find((function(e){var t;return null===(t=i.getRoom(e))||void 0===t?void 0:t.currentState.members[r.userId]})))){e.next=6;break}return e.abrupt("return",{roomId:s});case 6:return c={is_direct:!0,invite:[r.userId],visibility:exports.Visibility.private,initial_state:a.map((function(e){return Ht(Ht({},e),{},{state_key:e.stateKey,stateKey:void 0})})),preset:n,creation_content:{isDirect:!0,creator:i.getUserId()}},e.next=9,i.createRoom(c);case 9:return f=e.sent,l=f.room_id,e.next=13,Ot(l);case 13:return e.abrupt("return",{roomId:l});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Pe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.roomId,e.next=3,et().invite(n,r);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Re.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.userId,o=t.reason,e.next=3,et().kick(r,n,o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Oe.use(function(){var e=w.default(b.default.mark((function e(t){var r,n;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.name,e.next=3,et().setRoomName(r,n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ee.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.isDirect,o=void 0!==n&&n,a=et(),e.next=4,a.joinRoom(r);case 4:if(i=e.sent,!o){e.next=8;break}return e.next=8,Ot(r);case 8:return e.abrupt("return",bt(gt(i)));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ft.use((function(e){var t=et().getRoom(e);return t?bt(gt(t)):null}));var Xt=rt(),Zt=r.attach({effect:Nt,mapParams:function(e){return{size:e.messages.length}}});Ae.on(Kt,(function(e,t){return t.messages})).reset(q),N.on(Kt,(function(e,t){return t.isLive})).reset(q),r.forward({from:r.sample(Ae,Zt.done,(function(e,t){return t.params.messages})),to:Ce}),r.forward({from:Xt.map((function(e){return{messages:e}})),to:Zt}),r.guard({source:r.sample([q,V],$t,(function(e){var t=g.default(e,2),r=t[0];return{timelineWindow:t[1],roomId:r}})),filter:V.map((function(e){return Boolean(e)})),target:qt}),Le.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.content,o=t.txnId,e.next=3,et().sendMessage(r,n,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),_e.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.body,a=t.txnId,e.next=3,et().sendMessage(r,{"m.new_content":{msgtype:"m.text",body:o},"m.relates_to":{rel_type:"m.replace",event_id:n},msgtype:"m.text",body:""},a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Me.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a,i;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.roomId,n=t.eventId,o=t.reason,a=o?{reason:o}:void 0,e.next=4,et().redactEvent(r,n,void 0,a);case 4:return i=e.sent,e.abrupt("return",{eventId:i.event_id});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Te.use(function(){var e=w.default(b.default.mark((function e(t){var r,n,o,a;return b.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.roomId,n=t.eventId,o=et().getRoom(r)){e.next=4;break}throw new ut;case 4:if(a=o.findEventById(n)){e.next=7;break}throw new it;case 7:return e.next=9,et().setRoomReadMarkers(r,n,a,{hidden:!0});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ne.use((function(e){var t=e.file,r=e.name,n=e.includeFilename,o=e.onlyContentUri,a=e.rawResponse,i=e.type,u=et().uploadContent(t,{name:r,includeFilename:n,type:i,onlyContentUri:o,rawResponse:a,progressHandler:function(e){var r=e.loaded,n=e.total;Ue({file:t,loaded:r,total:n})}}),s={promise:u};return u.abort&&(s.abort=u.abort),s})),We.use((function(e){var t=e.url,r=e.ts,n=e.timeout,o=void 0===n?5e3:n;return new Promise((function(e){et().getUrlPreview(t,r).then(e).catch((function(){return e({"og:url":t})})),setTimeout((function(){e({"og:url":t})}),o)}))})),Be.use((function(t){var r=t.eventId,n=t.roomId,o=et();if(!o)throw new st;var a=o.getRoom(n);if(!a)throw new ut;var i=a.findEventById(r);if(!i)throw new it;var u=o.getUserId();if(!u)throw new lt;var s=a.currentState.maySendRedactionForEvent(i,u)&&"m.room.server_acl"!==i.getType(),c=function(t){if(t.status===e.EventStatus.CANCELLED||"m.room.message"!==t.getType()||t.isRedacted())return!1;var r=t.getOriginalContent(),n=r.msgtype;return("m.text"===n||"m.emote"===n)&&Boolean(r.body)&&"string"==typeof r.body&&t.getSender()===et().getUserId()}(i);return{canRedact:s,canEdit:c}})),qt.use((function(t){var r=t.timelineWindow,n=r.canPaginate(e.Direction.Forward);return{messages:kt(r),isLive:!n,canPaginateForward:n,canPaginateBackward:r.canPaginate(e.Direction.Backward)}}));var er=r.combine(Et,Ke,qe,W,(function(e,t,r,n){return e&&!t&&!r&&!n}));Ke.on(Bt.pending,(function(e,t){return t})).reset(q),qe.on(Nt.pending,(function(e,t){return t})).reset(q),ze.on(Kt,(function(e,t){return t.canPaginateBackward})).reset([de,q]),Ve.on(Kt,(function(e,t){return t.canPaginateForward})).reset([de,q]),r.forward({from:Bt.done,to:He}),r.forward({from:Nt.done,to:Ge}),r.guard({source:Ye,filter:er,target:Bt}),r.guard({source:Je,filter:er,target:Nt}),Tt.use(function(){var t=w.default(b.default.mark((function t(r){var n,o,a,i,u,s,c,f;return b.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.timelineWindow,o=r.direction,a=r.size,i=r.makeRequest,u=r.requestLimit,n){t.next=3;break}throw new ct;case 3:return s="forward"===o?m.default.EventTimeline.FORWARDS:m.default.EventTimeline.BACKWARDS,t.next=6,n.paginate(s,a,i,u);case 6:return c=n.canPaginate(e.Direction.Forward),f=kt(n),t.abrupt("return",{messages:f,isLive:!c,canPaginateForward:c,canPaginateBackward:n.canPaginate(e.Direction.Backward)});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Object.defineProperty(exports,"MatrixEvent",{enumerable:!0,get:function(){return e.MatrixEvent}}),Object.defineProperty(exports,"Room",{enumerable:!0,get:function(){return e.Room}}),Object.defineProperty(exports,"RoomMember",{enumerable:!0,get:function(){return e.RoomMember}}),exports.$canBan=ne,exports.$canInvite=re,exports.$canKick=te,exports.$canPaginateBackward=ze,exports.$canPaginateForward=Ve,exports.$canRedact=ae,exports.$canSendDefaultEvent=oe,exports.$canSetDefaultState=ie,exports.$currentJoinedRoomMembers=ee,exports.$currentRoom=K,exports.$currentRoomId=q,exports.$currentRoomMembers=$,exports.$isLive=N,exports.$loadRoomFxPending=W,exports.$messages=Ae,exports.$myPowerLevel=H,exports.$paginateBackwardPending=Ke,exports.$paginateForwardPending=qe,exports.$requiredPowerLevelForBan=Y,exports.$requiredPowerLevelForDefaultEvents=Q,exports.$requiredPowerLevelForDefaultState=Z,exports.$requiredPowerLevelForInvite=J,exports.$requiredPowerLevelForKick=G,exports.$requiredPowerLevelForRedact=X,exports.$timelineWindow=V,exports.DEFAULT_BAN_POWERLEVEL=50,exports.DEFAULT_INVITE_POWERLEVEL=50,exports.DEFAULT_KICK_POWERLEVEL=50,exports.DEFAULT_REDACT_POWERLEVEL=50,exports.DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL=0,exports.DEFAULT_SET_DEFAULT_STATE_POWERLEVEL=50,exports.checkEventPermissionsFx=Be,exports.checkIsDirect=Rt,exports.clearCurrentRoomState=z,exports.client=et,exports.createClient=Ze,exports.createClientFx=S,exports.createDirectRoomFx=ke,exports.createOnSyncThrottled=function(e){return t.throttle({source:R,timeout:e})},exports.createRoomFx=ye,exports.createRoomMessageBatch=rt,exports.deleteMessageFx=Me,exports.deleteNotificationRuleFx=T,exports.destroyClient=nt,exports.destroyClientFx=C,exports.directRoomCreated=ve,exports.editMessageFx=_e,exports.getAllUsersFx=he,exports.getLoggedUserFx=j,exports.getNotificationRulesFx=L,exports.getRoomInfoFx=be,exports.getRoomMemberAvatarUrl=function(e){var t=e.roomId,r=e.userId,n=e.width,o=e.height,a=e.resizeMethod,i=e.allowDefault,u=void 0===i||i,s=et().getRoom(t);if(!s)return null;var c=s.getMember(r);return c?c.getAvatarUrl(et().getHomeserverUrl(),n,o,a,u,!0):null},exports.getRoomsWithActivitiesFx=we,exports.getSenderAvatarUrl=function(e){var t=e.sender,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDefault,i=void 0===a||a,u=e.allowDirectLinks,s=void 0!==u&&u;return t&&t.getAvatarUrl?t.getAvatarUrl(et().getHomeserverUrl(),r,n,o,i,s):null},exports.getUploadCredentials=function(){return{endpointUrl:"".concat(et().getHomeserverUrl(),"/_matrix/media/r0/upload"),headers:{Authorization:"Bearer ".concat(et().getAccessToken())}}},exports.getUrlPreviewFx=We,exports.initRoom=ue,exports.initStoreFx=I,exports.inviteUserFx=Pe,exports.joinRoomFx=Ee,exports.kickUserRoomFx=Re,exports.liveTimelineLoaded=se,exports.loadRoom=de,exports.loadRoomMessage=me,exports.loadRoomMessageDone=fe,exports.loginByPasswordFx=O,exports.loginByTokenFx=E,exports.logoutFx=A,exports.mxcUrlToHttp=function(e){var t=e.mxcUrl,r=e.width,n=e.height,o=e.resizeMethod,a=e.allowDirectLinks;return et().mxcUrlToHttp(t,r,n,void 0!==o?o:"scale",a)},exports.newMessagesLoaded=Ce,exports.onCachedState=P,exports.onClientEvent=tt,exports.onInitialSync=k,exports.onPaginateBackwardDone=He,exports.onPaginateForwardDone=Ge,exports.onRoomInitialized=ce,exports.onRoomLoaded=le,exports.onSync=R,exports.onUploadProgress=Ue,exports.paginateBackward=Ye,exports.paginateForward=Je,exports.readAllMessagesFx=Te,exports.renameRoomFx=Oe,exports.roomCreated=ge,exports.roomMessage=Se,exports.searchRoomMessagesFx=xe,exports.sendMessageFx=Le,exports.setNotificationRuleActionFx=_,exports.setNotificationRuleEnabledFx=M,exports.startClientFx=D,exports.stopClientFx=F,exports.toLiveTimeline=pe,exports.uploadContentFx=Ne;
//# sourceMappingURL=matrix-effector.cjs.js.map
