!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("matrix-js-sdk"),require("effector"),require("@42px/effector-extra"),require("@42px/custom-errors")):"function"==typeof define&&define.amd?define(["exports","matrix-js-sdk","effector","@42px/effector-extra","@42px/custom-errors"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).MatrixEffector={},e.matrix,e.effector,e.effectorExtra,e.customErrors)}(this,(function(e,t,n,o,i){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=r(t);const a=n.createDomain("matrix"),d=a.effect(),c=a.effect(),f=a.effect(),u=a.effect(),m=a.effect(),l=a.effect(),g=a.effect(),p=a.effect(),x=a.effect(),v=a.effect(),y=a.effect(),E=a.effect(),w=a.effect(),R=a.effect(),I=a.effect(),T=a.event(),h=o.batchEvents(T,500),F=a.event(),b=a.event();let M,C;const S=[],P=()=>(M||(M=s.default.createClient(C),S.forEach((([e,t])=>{M.on(e,t)}))),M),W=e=>{S.push(...e)};function _(e,t){return{originalEventId:void 0!==t?t:e.getId(),content:e.getContent(),sender:e.sender,originServerTs:e.getDate(),edited:Boolean(e.replacingEventId()),redacted:e.isRedacted()}}function j(e){return{roomId:e.roomId,name:e.name,summary:e.summary}}function A(e,t){return t.isRelation("m.replace")||t.isRedaction()||e.push(_(t)),e}const D=i.createCustomError("RoomNotFound"),q=i.createCustomError("TimelineWindowUndefined"),B=i.createCustomError("PaginationFail"),k="m.room.message",O="m.room.redaction";let z;n.forward({from:d.done.map((()=>({initialSyncLimit:20}))),to:u}),d.use((e=>P().login("m.login.password",e))),c.use((e=>P().login("m.login.token",e))),f.use((async()=>{const{store:e}=P();if(e)return e.startup()})),u.use((e=>P().startClient(e))),l.use((async e=>(await P().search(e)).search_categories.room_events.results.map((({result:e})=>_(new t.MatrixEvent(e)))))),g.use((e=>P().searchMessageText(e))),p.use((({roomId:e,content:t,txnId:n})=>P().sendMessage(e,t,n))),x.use((({roomId:e,eventId:t,body:n,txnId:o})=>P().sendMessage(e,{"m.new_content":{msgtype:"m.text",body:n},"m.relates_to":{rel_type:"m.replace",event_id:t},msgtype:"m.text",body:""},o))),v.use((async({roomId:e,eventId:t,reason:n})=>{const o=n?{reason:n}:void 0;return{eventId:(await P().redactEvent(e,t,void 0,o)).event_id}})),y.use((e=>{const t=P().getRoom(e);return t?t.timeline.filter((e=>[k,O].includes(e.getType()))).reduce(A,[]):[]})),W([["Room.timeline",(e,t,n,o,i)=>{const r=e.getType();r!==k&&r!==O||!n&&i.liveEvent&&T(function(e){const t={eventId:e.getId(),content:e.getContent(),originServerTs:e.getDate(),roomId:e.getRoomId(),sender:e.sender,type:e.getType(),redaction:e.isRedaction(),redacted:e.isRedacted(),editing:Boolean(e.isRelation())};return e.hasAssocation()&&(t.relatedEventId=e.getAssociatedId()),t}(e))}],["sync",(e,t)=>{if("PREPARED"===e){const e=P().getRooms().map(j);b(e)}if("SYNCING"===e&&"PREPARED"===t){const e=P().getRooms().map(j);F(e)}}]]),m.use((()=>P().stopClient())),E.use((async({roomId:e,initialEventId:t,initialWindowSize:n})=>{const o=P(),i=P().getRoom(e);if(!i)throw new D;const r=i.getUnfilteredTimelineSet();return z=new s.default.TimelineWindow(o,r),await z.load(t,n),z.getEvents().filter((e=>[k,O].includes(e.getType()))).reduce(A,[])})),R.use((async({initialEventId:e,initialWindowSize:t})=>{if(!z)throw new q;return await z.load(e,t),z.getEvents().filter((e=>[k,O].includes(e.getType()))).reduce(A,[])})),w.use((()=>z?z.getEvents().filter((e=>[k,O].includes(e.getType()))).reduce(A,[]):[])),I.use((async({direction:e,size:t,makeRequest:n,requestLimit:o})=>{if(!z)throw new q;const i="forward"===e?s.default.EventTimeline.FORWARDS:s.default.EventTimeline.BACKWARDS;if(!await z.paginate(i,t,n,o))throw new B;return z.getEvents().filter((e=>[k,O].includes(e.getType()))).reduce(A,[])})),Object.defineProperty(e,"MatrixEvent",{enumerable:!0,get:function(){return t.MatrixEvent}}),Object.defineProperty(e,"Room",{enumerable:!0,get:function(){return t.Room}}),Object.defineProperty(e,"RoomMember",{enumerable:!0,get:function(){return t.RoomMember}}),e.client=P,e.deleteMessageFx=v,e.editMessageFx=x,e.getRoomTimelineFx=y,e.getTimelineWindowMessagesFx=w,e.initStoreFx=f,e.initTimelineWindowFx=E,e.loadTimelineWindowFx=R,e.loginByPasswordFx=d,e.loginByTokenFx=c,e.onCachedState=b,e.onClientEvent=W,e.onInitialSync=F,e.paginateTimelineWindowFx=I,e.prependClientParams=e=>{C=e},e.roomMessage=T,e.roomMessageBatch=h,e.searchFx=l,e.searchMessageTextFx=g,e.sendMessageFx=p,e.startClientFx=u,e.stopClientFx=m,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=matrix-effector.umd.js.map
