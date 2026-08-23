(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();function vc(){const s=new Map;return{on(t,e){return s.has(t)||s.set(t,new Set),s.get(t).add(e),()=>this.off(t,e)},off(t,e){const n=s.get(t);n&&n.delete(e)},emit(t,e){const n=s.get(t);if(n)for(const i of[...n])i(e)},clear(){s.clear()}}}const wt=vc(),zt=2,tt={VOID:0,FLOOR:1,WALL:2,DOOR:3,GRATE:4,CARPET:5},Pr={[tt.FLOOR]:{mult:1,name:"concrete"},[tt.GRATE]:{mult:1.7,name:"grate"},[tt.CARPET]:{mult:.4,name:"carpet"},[tt.DOOR]:{mult:1,name:"doorway"}},Gs={walk:3.4,sprint:6.25,crouch:1.55},Cn={step:.5,doorOpen:.45,doorClose:.45,glass:1.7,bottle:1.5,lockerEnter:.35,lockerExit:.55,throwWhistle:.12},xc=.07,Lt={PATROL:"patrol",SUSPICIOUS:"suspicious",INVESTIGATE:"investigate",SEARCH:"search",CHASE:"chase",RETURN:"return",LISTEN:"listen",DISABLED:"disabled"},Le={glanceAt:30,investigateAt:65,chaseAt:100,riseRate:70,fallRate:20},Za={warden:{kind:"warden",visionRange:13.5,visionHalfAngleDeg:52,hearingMult:1.15,hearThreshold:.16,memorySec:6.5,speedPatrol:1.7,speedInvestigate:2.4,speedChase:5.75,catchRadius:.95,radioRadius:15,flashlight:!0},listener:{kind:"listener",visionRange:0,visionHalfAngleDeg:0,hearingMult:3.2,hearThreshold:.13,memorySec:12,speedPatrol:1.1,speedInvestigate:3.4,speedChase:6,catchRadius:2.2,listenSec:4,radioRadius:0},sentinel:{kind:"sentinel",visionRange:17,visionHalfAngleDeg:11,hearingMult:0,hearThreshold:1/0,memorySec:7,speedPatrol:1.5,speedChase:4.2,catchRadius:1.1,railOnly:!0}},As={duration:30,cooldown:90},Ws=64,Ja=48;function Mc(){const s=new Uint8Array(Ws*Ja).fill(tt.WALL),t=(g,_,p)=>{s[_*Ws+g]=p},e=(g,_,p,h,E)=>{for(let w=_;w<=h;w++)for(let x=g;x<=p;x++)t(x,w,E)},n=(g,_)=>({x:(g+.5)*zt,z:(_+.5)*zt});e(2,10,61,11,tt.FLOOR),e(23,2,40,8,tt.CARPET),t(31,9,tt.DOOR),t(32,9,tt.DOOR),e(52,8,56,9,tt.FLOOR),e(51,3,57,6,tt.FLOOR),t(54,7,tt.DOOR),e(9,12,10,34,tt.FLOOR),e(2,14,7,18,tt.FLOOR),t(8,16,tt.DOOR),t(4,19,tt.FLOOR),e(2,20,7,24,tt.FLOOR),t(8,22,tt.FLOOR),e(2,26,7,30,tt.FLOOR),t(8,28,tt.DOOR),e(12,14,20,32,tt.FLOOR);for(let g=14;g<=32;g++)t(16,g,tt.WALL);t(16,18,tt.FLOOR),t(16,26,tt.FLOOR),t(11,16,tt.DOOR),t(11,28,tt.DOOR),t(11,22,tt.FLOOR),t(11,26,tt.FLOOR),t(8,19,tt.FLOOR),t(8,25,tt.FLOOR),t(21,17,tt.FLOOR),t(21,29,tt.DOOR),e(22,13,41,33,tt.FLOOR),e(27,19,36,28,tt.CARPET);for(const[g,_]of[[26,16],[26,30],[37,16],[37,30],[31,23]])t(g,_,tt.WALL);for(const g of[30,31,32,33])t(g,12,tt.FLOOR);for(const g of[9,10])t(g,34,tt.FLOOR);for(const g of[30,31,32,33])t(g,34,tt.FLOOR);for(const g of[53,54])t(g,34,tt.GRATE);e(43,13,51,31,tt.FLOOR),t(46,22,tt.WALL),t(49,26,tt.WALL),e(44,14,48,17,tt.FLOOR),t(46,18,tt.DOOR),t(42,20,tt.FLOOR),t(42,24,tt.FLOOR),t(42,30,tt.DOOR),e(53,12,55,34,tt.GRATE),t(52,25,tt.DOOR),t(52,15,tt.FLOOR),t(52,30,tt.FLOOR),t(56,26,tt.FLOOR),e(57,19,61,27,tt.FLOOR),t(56,23,tt.DOOR),e(56,12,61,17,tt.FLOOR),t(58,12,tt.FLOOR);for(const[g,_]of[[58,17],[58,18],[59,17],[59,18]])t(g,_,tt.FLOOR);e(2,35,61,37,tt.GRATE),e(2,39,16,45,tt.CARPET);for(const g of[8,9])t(g,38,tt.FLOOR);e(17,41,22,41,tt.FLOOR),e(24,39,39,45,tt.FLOOR);for(const g of[30,31,32,33])t(g,38,tt.CARPET),t(g,39,tt.CARPET),t(g,40,tt.CARPET);for(const g of[29,34])t(g,39,tt.CARPET);t(23,41,tt.DOOR),t(27,41,tt.WALL),t(35,41,tt.WALL),e(44,39,60,45,tt.FLOOR);for(const g of[50,51])t(g,38,tt.FLOOR);const i=[],r=(g,_,p,h,E,w)=>i.push({id:g,...n(_,p),r:h,i:E,wingId:w});r("fw1",5,16,6,.95,"west"),r("fw2",4,21,5,.9,"west"),r("fw3",5,28,6,.9,"west"),r("fw4",9,20,7,1,"west"),r("fa1",27,20,8,1,"atrium"),r("fa2",36,20,8,1,"atrium"),r("fa3",31,27,8,1,"atrium"),r("fa4",24,31,5,.6,"atrium"),r("fe1",59,23,6,.95,"east"),r("fe2",58,14,6,.85,"east"),r("fe3",46,15,5,.9,"east"),r("fe4",47,25,7,.95,"east"),r("fe5",54,20,6,.8,"east"),r("fn1",6,10,6,.8,"maintenance"),r("fn2",20,10,6,.8,"maintenance"),r("fn3",31,10,6,.8,"maintenance"),r("fn4",44,10,6,.8,"maintenance"),r("fn5",58,10,6,.8,"maintenance"),r("fm1",5,36,6,.85,"maintenance"),r("fm2",20,36,6,.85,"maintenance"),r("fm3",36,36,6,.85,"maintenance"),r("fm4",52,36,6,.85,"maintenance"),r("fm5",60,36,5,.7,"maintenance"),r("fm6",31,42,7,.95,"maintenance"),r("fm7",7,42,6,.9,"maintenance"),r("fm8",52,42,6,.85,"maintenance"),r("fm9",20,41,4,.7,"maintenance");const a=[{id:"d_archive_a",cx:31,cz:9,locked:"archive"},{id:"d_archive_b",cx:32,cz:9,locked:"archive"},{id:"d_elev",cx:54,cz:7,locked:"elevator"},{id:"d_offA",cx:8,cz:16},{id:"d_offC",cx:8,cz:28},{id:"d_storeN",cx:11,cz:16},{id:"d_storeS",cx:11,cz:28},{id:"d_atrW2",cx:21,cz:29},{id:"d_atrE2",cx:42,cz:30},{id:"d_coldE",cx:52,cz:25},{id:"d_lab",cx:56,cz:23},{id:"d_ward",cx:23,cz:41}],o=[{id:"lk1",...n(13,15)},{id:"lk2",...n(13,29)},{id:"lk3",...n(24,13)},{id:"lk4",...n(39,13)},{id:"lk5",...n(44,30)},{id:"lk6",...n(51,20)},{id:"lk7",...n(25,44)},{id:"lk8",...n(38,39)},{id:"lk9",...n(45,44)}],l=[{id:"bt1",...n(14,27)},{id:"bt2",...n(13,41)},{id:"bt3",...n(14,41)},{id:"bt4",...n(13,42)},{id:"bt5",...n(57,13)},{id:"bt6",...n(49,28)},{id:"bt7",...n(57,42)},{id:"bt8",...n(58,42)}],c=[{id:"seal1",n:1,...n(13,16)},{id:"seal2",n:2,...n(60,23)},{id:"seal3",n:3,...n(37,44)}],u=[{id:"brk_west",wing:"west",...n(12,15)},{id:"brk_east",wing:"east",...n(45,15)}],d=[{id:"vlv1",...n(12,36),zone:{x:31,z:73,r:6}},{id:"vlv2",...n(49,35),zone:{x:95,z:73,r:6}},{id:"vlv3",...n(28,36),zone:{x:63,z:77,r:6}}],m={doors:a,lockers:o,bottles:l,seals:c,vessel:{id:"vessel",...n(32,5)},elevator:{id:"elevator",...n(54,4)},breakers:u,valves:d},f=[{id:"warden1",kind:"warden",wing:"west",...n(10,15),pingPong:!0,patrolRoute:[n(10,15),n(10,28)]},{id:"warden2",kind:"warden",wing:"west",...n(6,10),pingPong:!0,patrolRoute:[n(6,10),n(40,10)]},{id:"warden3",kind:"warden",wing:"atrium",...n(24,14),patrolRoute:[n(24,14),n(24,32),n(39,32),n(39,14)]},{id:"warden4",kind:"warden",wing:"maintenance",...n(58,36),pingPong:!0,patrolRoute:[n(58,36),n(4,36)]},{id:"listener1",kind:"listener",wing:"maintenance",...n(27,44),patrolRoute:[n(31,42),n(27,44),n(26,41),n(31,39)]},{id:"sentinel1",kind:"sentinel",wing:"east",...n(54,12),railA:n(54,12),railB:n(54,33)}];return{w:Ws,h:Ja,tiles:s,start:n(5,43),fixtures:i,masks:[],objects:m,ais:f,archiveDoors:["d_archive_a","d_archive_b"],archiveApproach:n(31,10)}}function yc(s){return{w:s.w,h:s.h,tiles:s.tiles,fixtures:s.fixtures.map(t=>({id:t.id,x:t.x,z:t.z,r:t.r,wingId:t.wingId})),objects:[...s.objects.doors.map(t=>({kind:"door",id:t.id,x:(t.cx+.5)*zt,z:(t.cz+.5)*zt})),...s.objects.lockers.map(t=>({kind:"locker",id:t.id,x:t.x,z:t.z})),...s.objects.bottles.map(t=>({kind:"bottle",id:t.id,x:t.x,z:t.z})),...s.objects.seals.map(t=>({kind:"seal",id:t.id,x:t.x,z:t.z,n:t.n})),{kind:"vessel",id:s.objects.vessel.id,x:s.objects.vessel.x,z:s.objects.vessel.z},{kind:"elevator",id:s.objects.elevator.id,x:s.objects.elevator.x,z:s.objects.elevator.z},...s.objects.breakers.map(t=>({kind:"breaker",id:t.id,x:t.x,z:t.z,wing:t.wing})),...s.objects.valves.map(t=>({kind:"valve",id:t.id,x:t.x,z:t.z}))]}}class Sc{constructor(t){this.w=t.w,this.h=t.h,this.tiles=t.tiles,this.doorOpen=new Set,this.fixtures=[],this.masks=[],this.blackouts=new Map,this.lockedDoors=new Set}lockDoor(t){this.lockedDoors.add(t)}unlockDoor(t){this.lockedDoors.delete(t)}isLocked(t){return this.lockedDoors.has(t)}idx(t,e){return e*this.w+t}inBounds(t,e){return t>=0&&e>=0&&t<this.w&&e<this.h}cellAt(t,e){return{cx:Math.floor(t/zt),cz:Math.floor(e/zt)}}tileAt(t,e){const{cx:n,cz:i}=this.cellAt(t,e);return this.inBounds(n,i)?this.tiles[this.idx(n,i)]:tt.VOID}registerDoor(t,e,n){const{cx:i,cz:r}=this.cellAt(e,n);this.doors===void 0&&(this.doors=new Map),this.doors.set(this.idx(i,r),t)}setDoorOpen(t,e){e?this.doorOpen.add(t):this.doorOpen.delete(t)}isDoorOpen(t){return this.doorOpen.has(t)}blockedCell(t,e){if(!this.inBounds(t,e))return!0;const n=this.tiles[this.idx(t,e)];if(n===tt.WALL||n===tt.VOID)return!0;if(n===tt.DOOR){const i=this.doors?this.doors.get(this.idx(t,e)):void 0;return!(i!==void 0&&this.doorOpen.has(i))}return!1}lineOfSight(t,e,n,i){let r=this.cellAt(t,e),a=this.cellAt(n,i);if(r.cx===a.cx&&r.cz===a.cz)return!0;let o=r.cx,l=r.cz;const c=a.cx-r.cx,u=a.cz-r.cz,d=c>0?1:-1,m=u>0?1:-1,f=c!==0?Math.abs(1/c):1/0,g=u!==0?Math.abs(1/u):1/0;let _=c!==0?(c>0?r.cx+1-t/zt:t/zt-r.cx)*f:1/0,p=u!==0?(u>0?r.cz+1-e/zt:e/zt-r.cz)*g:1/0;for(let h=0;h<4096;h++){if(this.blockedCell(o,l))return!1;if(o===a.cx&&l===a.cz)return!0;_<p?(_+=f,o+=d):(p+=g,l+=m)}return!1}registerFixture(t){this.fixtures.push({on:!0,...t})}registerMask(t){this.masks.push({...t,on:t.on!==!1})}applyBlackout(t,e){this.blackouts.set(t,{until:(this.time||0)+e})}setTime(t){this.time=t;for(const[e,n]of this.blackouts)n.until<=t&&!n.held&&this.blackouts.delete(e)}wingBlackedOut(t){const e=this.blackouts.get(t);return!!e&&e.until>(this.time||0)}fixtureActive(t){return t.on&&!this.wingBlackedOut(t.wingId)}lightAt(t,e){let n=xc;for(const i of this.fixtures){if(!this.fixtureActive(i))continue;const r=Math.hypot(t-i.x,e-i.z);r<i.r&&(n+=i.i*Math.pow(1-r/i.r,1.25))}return Math.min(1,n)}maskAt(t,e){let n=0;for(const i of this.masks){if(!i.on)continue;const r=Math.hypot(t-i.x,e-i.z);r<i.r&&(n=Math.max(n,i.strength*(1-r/i.r)))}return Math.min(1,n)}serialize(){return{doorOpen:[...this.doorOpen],blackouts:[...this.blackouts.entries()].map(([t,e])=>[t,{...e}]),lockedDoors:[...this.lockedDoors],fixtures:this.fixtures.map(t=>({id:t.id,on:t.on})),masks:this.masks.map(t=>({id:t.id,on:t.on}))}}load(t){if(t){if(Array.isArray(t.doorOpen)&&(this.doorOpen=new Set(t.doorOpen)),Array.isArray(t.lockedDoors)&&(this.lockedDoors=new Set(t.lockedDoors)),Array.isArray(t.blackouts)&&(this.blackouts=new Map(t.blackouts.map(([e,n])=>[e,{until:Number(n.until)||0,held:!!n.held}]))),Array.isArray(t.fixtures))for(const e of t.fixtures){const n=this.fixtures.find(i=>i.id===e.id);n&&(n.on=!!e.on)}if(Array.isArray(t.masks))for(const e of t.masks){const n=this.masks.find(i=>i.id===e.id);n&&(n.on=!!e.on)}}}}const yn=.38;class Ec{constructor(t,e){this.x=t,this.z=e,this.facing=-Math.PI/2,this.crouched=!1,this.sprinting=!1,this.moving=!1,this.flashlight=!1,this.hiddenIn=null,this.bottles=2,this.alive=!0,this.strideAcc=0}get speed(){return this.crouched?Gs.crouch:this.sprinting?Gs.sprint:Gs.walk}update(t,e,n){if(e=e||{},!this.alive||this.hiddenIn){this.moving=!1;return}let i=e.mx||0,r=e.mz||0;const a=Math.hypot(i,r);if(this.moving=a>.01,this.crouched=!!e.crouch,this.sprinting=!!e.sprint&&!this.crouched&&this.moving,e.flashToggled&&(this.flashlight=!this.flashlight),e.aimX!==void 0&&e.aimZ!==void 0?Math.hypot(e.aimX,e.aimZ)>.001&&(this.facing=Math.atan2(e.aimZ,e.aimX)):this.moving&&(this.facing=Math.atan2(r,i)),this.moving){i/=a,r/=a;const o=this.speed*Math.min(1,a);this.tryMove(i*o*t,0,n),this.tryMove(0,r*o*t,n),this.strideAcc+=o*t;const l=this.crouched?1.9:this.sprinting?2.15:1.7;if(this.strideAcc>=l){this.strideAcc-=l;const c=n.tileAt(this.x,this.z),u=Pr[c]||Pr[tt.FLOOR],d=this.crouched?.35:this.sprinting?1.8:1;wt.emit("noise",{x:this.x,z:this.z,loud:Cn.step*u.mult*d,type:"footstep"})}}}tryMove(t,e,n){const i=this.x+t,r=this.z+e;if(!this.circleBlocked(i,r,n)){this.x=i,this.z=r;return}t!==0&&!this.circleBlocked(i,this.z,n)?this.x=i:e!==0&&!this.circleBlocked(this.x,r,n)&&(this.z=r)}circleBlocked(t,e,n){for(const[i,r]of[[-yn,-yn],[yn,-yn],[-yn,yn],[yn,yn],[0,0]]){const{cx:a,cz:o}=n.cellAt(t+i,e+r);if(n.blockedCell(a,o))return!0}return!1}serialize(){return{x:this.x,z:this.z,facing:this.facing,crouched:this.crouched,flashlight:this.flashlight,hiddenIn:this.hiddenIn,bottles:this.bottles,alive:this.alive}}load(t){t&&Object.assign(this,{x:Number(t.x)||this.x,z:Number(t.z)||this.z,facing:Number(t.facing)||this.facing,crouched:!!t.crouched,flashlight:!!t.flashlight,hiddenIn:t.hiddenIn??null,bottles:Number.isFinite(t.bottles)?t.bottles:this.bottles,alive:t.alive!==!1})}}const Qa=2.5;function ja(s,t,e,n,i,r={}){const a=r.doorsPassable!==!1,o=Math.floor(t/zt),l=Math.floor(e/zt),c=Math.floor(n/zt),u=Math.floor(i/zt);if(!s.inBounds(c,u))return null;const d=(T,C)=>{if(!s.doors)return!1;const S=s.doors.get(s.idx(T,C));return S!==void 0&&s.doorOpen.has(S)},m=(T,C)=>{if(!s.doors||!s.isLocked)return!1;const S=s.doors.get(s.idx(T,C));return S!==void 0&&s.isLocked(S)},f=(T,C,S=!1)=>{if(!s.inBounds(T,C))return!1;const M=s.tiles[s.idx(T,C)];return M===2||M===0?!1:M===3?!S&&m(T,C)?!1:a||S?!0:d(T,C):!0};if(!f(o,l,!0))return null;if(!f(c,u)){let T=!1;for(const[C,S]of[[0,1],[0,-1],[1,0],[-1,0]])if(f(c+C,u+S)){T=!0;break}if(!T)return null}const g=(T,C)=>C*s.w+T,_=new Map,p=new Map,h=new Map,E=(T,C)=>Math.hypot(T-c,C-u),w=g(o,l);h.set(w,0),_.set(w,{cx:o,cz:l,f:E(o,l)});const x=new Set,U=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]];let A=2e4;for(;_.size>0&&A-- >0;){let T=null,C=1/0;for(const[z,O]of _)O.f<C&&(C=O.f,T=z);const S=_.get(T);if(_.delete(T),x.add(T),S.cx===c&&S.cz===u){const z=[];let O=T;for(;O!==void 0;){const G=O%s.w,X=Math.floor(O/s.w),W=s.tiles[O];z.push({x:(G+.5)*zt,z:(X+.5)*zt,doorCost:W===3?Qa:0}),O=p.get(O)}return z.reverse(),z}const M=g(S.cx,S.cz),R=h.get(M);for(const[z,O,G]of U){const X=S.cx+z,W=S.cz+O;if(!f(X,W)||z!==0&&O!==0&&(!f(S.cx+z,S.cz)||!f(S.cx,S.cz+O)))continue;const Z=g(X,W);if(x.has(Z))continue;const H=s.tiles[Z],it=G+(H===3?Qa:0),ht=R+it;ht<(h.get(Z)??1/0)&&(h.set(Z,ht),p.set(Z,M),_.set(Z,{cx:X,cz:W,f:ht+E(X,W)}))}}return null}function wc(s){for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return s}function bc(s,t,e,n){const i=n||{},r=s&&s.profile;if(!r||!(r.visionRange>0))return{seen:!1,exposure:0,reason:"blind"};const a=t.x-s.x,o=t.z-s.z,l=Math.hypot(a,o);if(l>r.visionRange)return{seen:!1,exposure:0,reason:"too far"};const c=(r.visionHalfAngleDeg||0)*Math.PI/180,u=l>1e-9?Math.abs(wc(Math.atan2(o,a)-(s.facing||0))):0;if(u>c)return{seen:!1,exposure:0,reason:"outside view"};if(e&&!e.lineOfSight(s.x,s.z,t.x,t.z))return{seen:!1,exposure:0,reason:"no line of sight"};const d=.35+.65*(1-l/r.visionRange),f=1-.55*(c>0?Math.min(1,u/c):0),g=Math.min(2.2,Math.max(.15,(i.targetLight||0)*1.6+(i.targetFlashlight?.5:0)+.08)),_=(i.targetCrouch?.7:1)*(i.targetMoving?1:.55),p=d*f*g*_;let h;return i.targetFlashlight&&(i.targetLight||0)*1.6<.5?h="seen: flashlight glow":g>1?h="seen: lit corridor":h="glimpse: dark",{seen:p>.045,exposure:p,reason:h}}function Tc(s,t,e,n){const i=t&&t.hearingMult||0;let a=(e&&e.loud?e.loud:0)*10*i;if(a<=0)return{heard:!1,strength:0,reason:i<=0?"deaf":"inaudible"};const o=n?n.maskAt(e.x,e.z):0;if(a*=1-o,a<=0)return{heard:!1,strength:0,reason:"masked by steam"};const l=Math.hypot(s.x-e.x,s.z-e.z);if(l>a)return{heard:!1,strength:0,reason:"too quiet"};let c=Math.max(0,Math.min(1,1-l/a)),u=`${e&&e.type||"noise"} heard`;return n&&!n.lineOfSight(s.x,s.z,e.x,e.z)&&(c*=.3,u=`${e&&e.type||"noise"} heard through a wall`),{heard:c>.02&&i>0,strength:c,reason:u}}function Ac(s,t,e,n){const i=s&&s.profile;return!i||!t||t.hiddenIn||!(t.moving||i.kind!=="listener")?!1:Math.hypot(t.x-s.x,t.z-s.z)<i.catchRadius}const Rc=6,Cc=.4,Xs=.15,Pc=1.2,to=45;function eo(s){for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return s}function ns(s){switch(s){case Lt.CHASE:return 4;case Lt.LISTEN:return 3;case Lt.INVESTIGATE:case Lt.SEARCH:return 2;case Lt.SUSPICIOUS:return 1;default:return 0}}function on(s,t){return Number.isFinite(s)?s:t}class Lc{constructor(t,e){this.entity=t,this.world=e,this.state=Lt.PATROL,this.suspicion=0,this.lastKnown=null,this.path=null,this.pathIdx=0,this.repathT=0,this.stateT=0,this.lostT=0,this.listenT=0,this.stimulus=null,this.vis=null,this.wanderPts=[],this.wanderIdx=0,this.wpIdx=0,this.wpDir=1,this.radioAt=-1,this.time=0,this.rng=null,this.caughtFired=!1,this.justChased=!1}setState(t){if(this.state===t)return;const e=this.state;this.state=t,this.stateT=0,this.path=null,this.pathIdx=0,wt.emit("aiState",{aiId:this.entity.id,from:e,to:t})}logIncident(t,e,n,i){wt.emit("incident",{t:this.time,who:this.entity.id,kind:t,detail:e,x:n,z:i})}route(){const t=this.entity;return t.profile.railOnly&&t.railA&&t.railB?[t.railA,t.railB]:Array.isArray(t.patrolRoute)&&t.patrolRoute.length>0?t.patrolRoute:null}faceToward(t,e){const n=eo(t-(this.entity.facing||0)),i=Rc*e;this.entity.facing=eo((this.entity.facing||0)+Math.max(-i,Math.min(i,n)))}gotoPoint(t,e,n){const i=this.entity,r=Math.hypot(t.x-i.x,t.z-i.z);if(r<=Xs)return this.path=null,!0;if(this.repathT-=n,(!this.path||this.repathT<=0)&&(this.path=ja(this.world,i.x,i.z,t.x,t.z,{doorsPassable:!0}),this.pathIdx=0,this.repathT=Cc,!this.path))return!0;for(;this.pathIdx<this.path.length&&Math.hypot(this.path[this.pathIdx].x-i.x,this.path[this.pathIdx].z-i.z)<=Xs;)this.pathIdx++;if(this.pathIdx>=this.path.length)return this.path=null,r<=Xs*2;let a=this.pathIdx;const o=Math.min(this.path.length-1,this.pathIdx+4);for(let p=o;p>this.pathIdx;p--){const h=this.path[p];if(this.world.lineOfSight(i.x,i.z,h.x,h.z)){a=p;break}}this.pathIdx=a;const l=this.path[a],{cx:c,cz:u}=this.world.cellAt(l.x,l.z);if(this.world.tiles[this.world.idx(c,u)]===3&&this.world.doors){const p=this.world.doors.get(this.world.idx(c,u));if(p!==void 0&&!this.world.doorOpen.has(p))return this.world.isLocked&&this.world.isLocked(p)?(this.path=null,this.repathT=0,!1):(this._doorWaitT=(this._doorWaitT||0)+n,this._doorWaitT>=.45&&(this._doorWaitT=0,this.world.setDoorOpen(p,!0),wt.emit("door",{id:p,open:!0}),wt.emit("noise",{x:l.x,z:l.z,loud:.6,type:"door"})),!1)}if(!this.world.lineOfSight(i.x,i.z,l.x,l.z))return this.path=null,this.repathT=0,!1;const m=l.x-i.x,f=l.z-i.z,g=Math.hypot(m,f)||1,_=Math.min(e*n,g);return i.x+=m/g*_,i.z+=f/g*_,this.faceToward(Math.atan2(f,m),n),!1}setupSearch(t){if(this.wanderPts=[],this.wanderIdx=0,!this.lastKnown)return;const e=t&&t.rng||this.rng;for(let n=0;n<3&&e;n++){const i=e.range(1.5,4),r=e.range(0,Math.PI*2),a=this.lastKnown.x+Math.cos(r)*i,o=this.lastKnown.z+Math.sin(r)*i;ja(this.world,this.entity.x,this.entity.z,a,o,{doorsPassable:!0})&&this.wanderPts.push({x:a,z:o})}this.repathT=0}enterChase(t,e,n,i="spotted"){this.setState(Lt.CHASE),this.lostT=0,this.repathT=0,this.caughtFired=!1,this.radioAt=this.time,this.justChased=!0,this.logIncident(i,t,e,n),wt.emit("alert",{aiId:this.entity.id,kind:"chase"})}leaveChase(t){this.setupSearch(t),this.setState(Lt.SEARCH),wt.emit("alert",{aiId:this.entity.id,kind:"lost"})}receiveRadio(t){this.entity.disabled||(this.lastKnown={x:t.x,z:t.z},this.stimulus=null,ns(this.state)<2&&(this.setupSearch(),this.setState(Lt.SEARCH)))}update(t,e){const n=this.entity,i=n.profile;if(this.time=e&&Number.isFinite(e.time)?e.time:this.time,this.rng=e&&e.rng||this.rng,this.stateT+=t,this.justChased=!1,n.disabled){this.state!==Lt.DISABLED&&this.setState(Lt.DISABLED),this.suspicion=Math.max(0,this.suspicion-Le.fallRate*t),this.vis=null;return}this.state===Lt.DISABLED&&this.setState(Lt.PATROL);const r=e?e.player:null,a=this.suspicion;let o=null,l=null;if(r&&!r.hiddenIn&&i.visionRange>0&&(o=bc(n,r,this.world,{targetLight:this.world.lightAt(r.x,r.z),targetCrouch:!!r.crouched,targetMoving:!!r.moving,targetFlashlight:!!r.flashlight})),this.vis=o,o&&o.seen)this.suspicion+=Le.riseRate*o.exposure*t,this.lostT=0,this.lastSeenT=0,l={x:r.x,z:r.z},this.state===Lt.CHASE&&(this.lastKnown={x:r.x,z:r.z});else{this.lastSeenT=(this.lastSeenT??99)+t;const f=this.state===Lt.SUSPICIOUS||this.state===Lt.INVESTIGATE;this.suspicion-=Le.fallRate*(f?.5:1)*t,this.state===Lt.CHASE&&(this.lostT+=t)}let c=null,u=!1;if(i.hearingMult>0&&e&&Array.isArray(e.noises))for(const f of e.noises){if(!f)continue;const g=Tc({x:n.x,z:n.z},i,f,this.world);if(!g.heard||Number.isFinite(i.hearThreshold)&&g.strength<i.hearThreshold)continue;Math.hypot(f.x-n.x,f.z-n.z);const _=this.entity.homeCentroid,p=_?Math.hypot(f.x-_.x,f.z-_.z):0;if(i.kind==="listener"&&this.entity.homeCentroid&&p>18)continue;const h=f.type==="glass"||f.type==="bottle"||(f.loud??0)>=1.2,E=Math.hypot(f.x-n.x,f.z-n.z)<5;if(!h&&!E){const x=Le.investigateAt+5;if(this.suspicion<x){this.suspicion=Math.min(x,this.suspicion+g.strength*to),c||(c={x:f.x,z:f.z,detail:`heard ${f.type||"noise"}`});continue}continue}this.suspicion+=g.strength*to;const w={x:f.x,z:f.z,detail:`heard ${f.type||"noise"}`};c||(c=w),i.kind==="listener"&&g.strength>=.25&&(c=w,u=!0)}this.suspicion>Le.chaseAt&&(this.suspicion=Le.chaseAt),this.suspicion<0&&(this.suspicion=0);const d=ns(this.state);if(a<Le.chaseAt&&this.suspicion>=Le.chaseAt&&d<4){!l&&c&&(this.lastKnown={x:c.x,z:c.z});const f=l?"spotted you":c?c.detail:"alerted",g=l?l.x:this.lastKnown?this.lastKnown.x:n.x,_=l?l.z:this.lastKnown?this.lastKnown.z:n.z;this.enterChase(f,g,_,l?"spotted":"heard")}else if(a<Le.investigateAt&&this.suspicion>=Le.investigateAt&&d<4){const f=l||(c?{x:c.x,z:c.z}:null);f&&(this.lastKnown={x:f.x,z:f.z},this.logIncident("suspicion",l?o.reason:c.detail,f.x,f.z),d<2?this.setState(Lt.INVESTIGATE):this.state===Lt.INVESTIGATE&&(this.path=null,this.repathT=0))}else u&&ns(this.state)<2?(this.lastKnown={x:c.x,z:c.z},this.logIncident("suspicion",c.detail,c.x,c.z),this.setState(Lt.INVESTIGATE)):a<Le.glanceAt&&this.suspicion>=Le.glanceAt&&ns(this.state)<1&&(this.stimulus=l||(c?{x:c.x,z:c.z}:null),this.setState(Lt.SUSPICIOUS));switch(this.state){case Lt.PATROL:this.doPatrol(t);break;case Lt.SUSPICIOUS:this.doSuspicious(t);break;case Lt.INVESTIGATE:this.doInvestigate(t,e);break;case Lt.SEARCH:this.doSearch(t,e);break;case Lt.CHASE:this.doChase(t,e,o,r);break;case Lt.RETURN:this.doReturn(t);break;case Lt.LISTEN:this.doListen(t);break}r&&!r.hiddenIn&&Ac(n,r)&&(this.state===Lt.CHASE||i.kind==="listener"&&this.state===Lt.LISTEN?this.caughtFired||(this.caughtFired=!0,wt.emit("playerCaught",{byId:n.id})):(this.state===Lt.SEARCH||this.state===Lt.INVESTIGATE||this.state===Lt.SUSPICIOUS||this.state===Lt.PATROL)&&(this.suspicion=Le.chaseAt,this.lastKnown={x:r.x,z:r.z},this.state!==Lt.CHASE&&this.enterChase("found you at close range",r.x,r.z)))}doPatrol(t){const e=this.entity,n=this.route();if(!n){e.facing+=t*.4;return}const i=n[Math.min(this.wpIdx,n.length-1)];this.gotoPoint(i,e.profile.speedPatrol*(e.patrolBoost||1),t)&&(n.length>1&&(e.pingPong||e.profile.railOnly?(this.wpIdx+=this.wpDir,this.wpIdx>=n.length?(this.wpIdx=Math.max(0,n.length-2),this.wpDir=-1):this.wpIdx<0&&(this.wpIdx=Math.min(1,n.length-1),this.wpDir=1)):this.wpIdx=(this.wpIdx+1)%n.length),this.path=null)}doSuspicious(t){if(this.stimulus){const e=this.entity;this.faceToward(Math.atan2(this.stimulus.z-e.z,this.stimulus.x-e.x),t)}this.stateT>=Pc&&this.setState(Lt.PATROL)}doInvestigate(t,e){if(!this.lastKnown){this.setState(Lt.PATROL);return}if(this.stateT>22){this.lastKnown=null,this.setState(Lt.RETURN);return}const n=this.entity.profile.speedInvestigate||this.entity.profile.speedPatrol;this.gotoPoint(this.lastKnown,n,t)&&(this.setupSearch(e),this.setState(Lt.SEARCH))}doSearch(t,e){if(this.wanderIdx>=this.wanderPts.length){this.setState(Lt.RETURN);return}const n=this.entity.profile.speedInvestigate||this.entity.profile.speedPatrol;this.gotoPoint(this.wanderPts[this.wanderIdx],n,t)&&(this.wanderIdx++,this.path=null)}doChase(t,e,n,i){const r=this.entity.profile,a=!!(n&&n.seen&&i);if(a&&(this.lastKnown={x:i.x,z:i.z}),!this.lastKnown){this.leaveChase(e);return}if(r.kind==="listener"){this.gotoPoint(this.lastKnown,r.speedChase,t)&&(this.setState(Lt.LISTEN),this.listenT=r.listenSec||4);return}this.gotoPoint(this.lastKnown,r.speedChase,t);const o=Math.hypot(this.entity.x-this.lastKnown.x,this.entity.z-this.lastKnown.z)>18;!a&&this.lostT>1.5&&(this.lostT>=(r.memorySec||8)||o)&&this.leaveChase(e)}doReturn(t){const e=this.route();if(!e){this.setState(Lt.PATROL);return}let n=0,i=1/0;for(let r=0;r<e.length;r++){const a=Math.hypot(e[r].x-this.entity.x,e[r].z-this.entity.z);a<i&&(i=a,n=r)}this.gotoPoint(e[n],this.entity.profile.speedPatrol,t)&&(this.wpIdx=n,this.wpDir=1,this.setState(Lt.PATROL))}doListen(t){this.entity.facing+=t*1.5,this.listenT-=t,this.listenT<=0&&this.setState(Lt.RETURN)}serialize(){return{v:1,id:this.entity.id,state:this.state,suspicion:this.suspicion,lastKnown:this.lastKnown?{x:this.lastKnown.x,z:this.lastKnown.z}:null,path:this.path?this.path.map(t=>({x:t.x,z:t.z,doorCost:t.doorCost||0})):null,pathIdx:this.pathIdx,repathT:this.repathT,stateT:this.stateT,lostT:this.lostT,listenT:this.listenT,stimulus:this.stimulus?{x:this.stimulus.x,z:this.stimulus.z}:null,wanderPts:this.wanderPts.map(t=>({x:t.x,z:t.z})),wanderIdx:this.wanderIdx,wpIdx:this.wpIdx,wpDir:this.wpDir,radioAt:this.radioAt,caughtFired:this.caughtFired}}load(t){t&&(typeof t.state=="string"&&(this.state=t.state),this.suspicion=on(t.suspicion,this.suspicion),this.lastKnown=t.lastKnown?{x:t.lastKnown.x,z:t.lastKnown.z}:null,this.path=Array.isArray(t.path)?t.path.map(e=>({x:e.x,z:e.z,doorCost:e.doorCost||0})):null,this.pathIdx=on(t.pathIdx,0),this.repathT=on(t.repathT,0),this.stateT=on(t.stateT,0),this.lostT=on(t.lostT,0),this.listenT=on(t.listenT,0),this.stimulus=t.stimulus?{x:t.stimulus.x,z:t.stimulus.z}:null,this.wanderPts=Array.isArray(t.wanderPts)?t.wanderPts.map(e=>({x:e.x,z:e.z})):[],this.wanderIdx=on(t.wanderIdx,0),this.wpIdx=on(t.wpIdx,0),this.wpDir=t.wpDir<0?-1:1,this.radioAt=on(t.radioAt,-1),this.caughtFired=!!t.caughtFired)}}class Ic{constructor(t,e){this.world=e,this.entities=[],this.brains=[],this._time=0,this._breaker=new Map;const n={};for(const i of t||[]){const r=i.kind;if(!Za[r])continue;n[r]=(n[r]||0)+1;const o={id:i.id||`${r}${n[r]}`,kind:r,x:i.x,z:i.z,facing:i.facing!==void 0?i.facing:0,profile:Za[r],patrolRoute:Array.isArray(i.patrolRoute)?i.patrolRoute.map(l=>({x:l.x,z:l.z})):null,pingPong:!!i.pingPong,railA:i.railA?{x:i.railA.x,z:i.railA.z}:null,railB:i.railB?{x:i.railB.x,z:i.railB.z}:null,wing:i.wing||null,disabled:!1};if(this.entities.push(o),Array.isArray(i.patrolRoute)&&i.patrolRoute.length){let l=0,c=0;for(const u of i.patrolRoute)l+=u.x,c+=u.z;o.homeCentroid={x:l/i.patrolRoute.length,z:c/i.patrolRoute.length}}else o.homeCentroid={x:i.x,z:i.z};this.brains.push(new Lc(o,e))}this._offBreaker=wt.on("breaker",i=>{!i||!i.wingId||(i.on?this._breaker.delete(i.wingId):this._breaker.set(i.wingId,this._time+(i.dur||As.duration)))})}update(t,e){const n=e&&Number.isFinite(e.time)?e.time:this._time;this._time=n;for(const r of this.entities)if(r.profile.railOnly&&r.wing){const a=this._breaker.get(r.wing)||0;r.disabled=this.world.wingBlackedOut(r.wing)||a>n}const i={player:e?e.player:null,noises:e&&Array.isArray(e.noises)?e.noises:[],ais:this.entities,time:n,rng:e?e.rng:null};for(const r of this.brains)r.update(t,i);for(let r=0;r<this.brains.length;r++){const a=this.brains[r];a.justChased&&this.propagateRadio(a.entity,this.entities),a.justChased=!1}}propagateRadio(t,e){e||this.entities;let n=null;for(const i of this.brains)if(i.entity===t||i.entity.id===t.id){n=i;break}if(!(!n||!n.lastKnown))for(const i of this.brains){const r=i.entity;if(r.id===n.entity.id||r.kind!=="warden"||r.disabled)continue;const a=r.profile.radioRadius||0;if(a<=0)continue;Math.hypot(r.x-t.x,r.z-t.z)<=a&&i.receiveRadio(n.lastKnown)}}serialize(){return{v:1,entities:this.entities.map(t=>({id:t.id,x:t.x,z:t.z,facing:t.facing,disabled:!!t.disabled,pingPong:!!t.pingPong,wing:t.wing||null})),brains:this.brains.map(t=>t.serialize())}}load(t){if(!t||!Array.isArray(t.entities))return;const e=new Map(t.entities.map(i=>[i.id,i])),n=new Map(Array.isArray(t.brains)?t.brains.filter(i=>i&&i.id).map(i=>[i.id,i]):[]);for(const i of this.entities){const r=e.get(i.id);r&&(Number.isFinite(r.x)&&(i.x=r.x),Number.isFinite(r.z)&&(i.z=r.z),Number.isFinite(r.facing)&&(i.facing=r.facing),i.disabled=!!r.disabled,r.pingPong!==void 0&&(i.pingPong=!!r.pingPong))}for(const i of this.brains){const r=n.get(i.entity.id);r&&(typeof r.state!="string"||!/^[a-z]+$/.test(r.state)||i.load(r))}}destroy(){this._offBreaker&&this._offBreaker()}}const Dc=2.05,Uc=2.9,no=1.2,io=10,Nc=1.2;class Oc{constructor(t,e){this.world=t,this.defs=e||{},this.list=[],this.projectiles=[],this.game=null,this._build()}_build(){const t=this.defs;for(const e of t.doors||[]){const n=e.cx*zt+zt/2,i=e.cz*zt+zt/2;typeof this.world.registerDoor=="function"&&this.world.registerDoor(e.id,n,i),this.list.push({kind:"door",id:e.id,x:n,z:i,locked:e.locked||null})}for(const e of t.lockers||[])e.kind="locker",e.taken=!1,this.list.push(e);for(const e of t.bottles||[])e.kind="bottle",e.taken=!1,this.list.push(e);for(const e of t.seals||[])e.kind="seal",e.taken=!1,this.list.push(e);if(t.vessel){const e=t.vessel;e.kind="vessel",e.taken=!1,this.list.push(e)}t.elevator&&this.list.push({kind:"elevator",id:t.elevator.id,x:t.elevator.x,z:t.elevator.z});for(const e of t.breakers||[])this.list.push({kind:"breaker",id:e.id,wingId:e.wing,x:e.x,z:e.z,armed:!1,coolEnd:0});for(const e of t.valves||[]){if(!e.zone||typeof this.world.registerMask!="function")continue;const n=e.id+":steam";this.world.registerMask({id:n,x:e.zone.x,z:e.zone.z,r:e.zone.r,strength:1});const i=this.world.masks.find(r=>r.id===n);this.list.push({kind:"valve",id:e.id,x:e.x,z:e.z,mask:i})}}update(t,e){e&&(this.game=e);const n=e||this.game;n&&typeof n.time=="number"&&typeof this.world.setTime=="function"&&this.world.setTime(n.time);for(let i=this.projectiles.length-1;i>=0;i--){const r=this.projectiles[i],a=r.x+r.vx*t,o=r.z+r.vz*t,l=this.world.cellAt(a,o);if(r.life-=t,this.world.blockedCell(l.cx,l.cz)){this._breakBottle(r.x,r.z),this.projectiles.splice(i,1);continue}r.x=a,r.z=o,r.life<=0&&(this._breakBottle(r.x,r.z),this.projectiles.splice(i,1))}for(const i of this.list)i.kind==="breaker"&&i.armed&&n&&typeof n.time=="number"&&n.time>=i.coolEnd&&(i.armed=!1,wt.emit("breaker",{wingId:i.wingId,on:!0}))}nearestInteractable(t,e){const n=e||this.game;let i=null,r=1/0;for(const a of this.list){if(a.taken||t.hiddenIn&&a.kind!=="locker")continue;const o=a.kind==="door"?Uc:Dc,l=Math.hypot(a.x-t.x,a.z-t.z);if(l>o||l>=r)continue;const c=Math.min(1.5,l/2),u=a.x+(t.x-a.x)/(l||1)*c,d=a.z+(t.z-a.z)/(l||1)*c;this.world.lineOfSight(t.x,t.z,u,d)&&(r=l,i=a)}return i?{obj:i,label:this._label(i,t,n)}:null}_label(t,e,n){switch(t.kind){case"door":{if(this.world.isDoorOpen(t.id))return"Close door";const i=t.locked!=="archive"||n&&n.state&&n.state.seals&&n.state.seals.got>=3,r=t.locked!=="elevator"||n&&n.state&&n.state.vessel;return i?r?"Open door":"Locked — power the elevator":"Locked — needs 3 seals"}case"locker":return e.hiddenIn===t.id?"Exit locker":"Hide in locker";case"bottle":return"Take bottle";case"seal":{const i=n&&n.state&&n.state.seals?n.state.seals.got:0;return`Take Seal (${Math.min(3,i+1)}/3)`}case"vessel":return"Take Vessel";case"elevator":return"Call elevator";case"breaker":return!t.armed&&!this.world.wingBlackedOut(t.wingId)?`Throw breaker — ${String(t.wingId).toUpperCase()} WING`:"Breaker cycling";case"valve":return t.mask&&t.mask.on?"Close steam valve":"Open steam valve";default:return""}}interact(t,e){if(!t)return!1;e&&(this.game=e);const n=e||this.game;switch(t.kind){case"door":{const i=!this.world.isDoorOpen(t.id);if(i&&(t.locked==="archive"&&!(n&&n.state&&n.state.seals&&n.state.seals.got>=3)||t.locked==="elevator"&&!(n&&n.state&&n.state.vessel)))return!1;if(this.world.setDoorOpen(t.id,i),i&&String(t.id).startsWith("d_archive"))for(const r of this.world.doors?this.world.doors.values():[])String(r).startsWith("d_archive")&&this.world.setDoorOpen(r,!0);return wt.emit("door",{id:t.id,open:i}),wt.emit("noise",{x:t.x,z:t.z,loud:(i?Cn.doorOpen:Cn.doorClose)*(n&&n.player&&n.player.crouched?.4:1),type:"door"}),!0}case"locker":return n?(n.player.hiddenIn===t.id?(n.player.hiddenIn=null,wt.emit("noise",{x:t.x,z:t.z,loud:Cn.lockerExit,type:"locker"}),wt.emit("playerUnhidden",{})):(n.player.hiddenIn=t.id,wt.emit("noise",{x:t.x,z:t.z,loud:Cn.lockerEnter,type:"locker"}),wt.emit("playerHidden",{id:t.id})),!0):!1;case"bottle":return t.taken||!n?!1:(t.taken=!0,n.player.bottles+=1,wt.emit("pickup",{kind:"bottle",id:t.id}),!0);case"seal":{if(t.taken||!n)return!1;if(t.taken=!0,n.state.seals.got+=1,wt.emit("pickup",{kind:"seal",id:t.id}),wt.emit("sealTaken",{n:t.n,total:3}),n.state.seals.got>=3){wt.emit("objective",{text:"The archive seal releases — north door unlocked"});for(const i of this.world.doors?this.world.doors:[])String(i[1]).startsWith("d_archive")&&this.world.unlockDoor(i[1])}return!0}case"vessel":return t.taken||!n?!1:(t.taken=!0,n.state.vessel=!0,wt.emit("vesselTaken",{}),wt.emit("objective",{text:"Reach the elevator"}),wt.emit("alert",{aiId:"*",kind:"restless"}),this.world.isLocked&&this.world.unlockDoor("d_elev"),!0);case"elevator":{if(!n||!n.state.vessel)return!1;const i=typeof n.stats=="function"?n.stats():n.stats;return wt.emit("gameWon",{stats:i}),!0}case"breaker":return!n||typeof n.time!="number"||t.armed&&n.time<t.coolEnd?!1:(t.armed=!0,t.coolEnd=n.time+As.cooldown,typeof this.world.setTime=="function"&&this.world.setTime(n.time),this.world.applyBlackout(t.wingId,As.duration),wt.emit("breaker",{wingId:t.wingId,on:!1,dur:As.duration}),!0);case"valve":return t.mask?(t.mask.on=!t.mask.on,wt.emit("steam",{id:t.id,on:t.mask.on}),!0):!1;default:return!1}}throwBottle(t,e,n){if(!n||!n.player||n.player.bottles<=0)return!1;n.player.bottles-=1;const i=Math.hypot(e.x,e.z)||1;return this.projectiles.push({x:t.x,z:t.z,vx:e.x/i*io,vz:e.z/i*io,life:Nc}),wt.emit("noise",{x:t.x,z:t.z,loud:Cn.throwWhistle,type:"throw"}),this.game=n,!0}_breakBottle(t,e){wt.emit("noise",{x:t,z:e,loud:Cn.bottle,type:"bottle"});let n=null,i=1/0;for(const r of this.world.fixtures){if(!r.on)continue;const a=Math.hypot(r.x-t,r.z-e);a<i&&(i=a,n=r)}if(n&&i<=no){const r=this.game?{x:this.game.player.x,z:this.game.player.z}:null;!r||this.world.lineOfSight(r.x,r.z,n.x,n.z)||(n=null)}n&&i<=no&&(n.on=!1,wt.emit("noise",{x:n.x,z:n.z,loud:Cn.glass,type:"glass"}),wt.emit("lightSmashed",{id:n.id,x:n.x,z:n.z,wingId:n.wingId}))}serialize(){return{taken:this.list.filter(t=>t.taken).map(t=>({kind:t.kind,id:t.id})),breakers:this.list.filter(t=>t.kind==="breaker").map(t=>({id:t.id,armed:t.armed,coolEnd:t.coolEnd})),valves:this.list.filter(t=>t.kind==="valve"&&t.mask).map(t=>({id:t.id,on:!!t.mask.on})),projectiles:[]}}load(t){if(this.projectiles.length=0,!!t){if(Array.isArray(t.taken))for(const e of t.taken){const n=this.list.find(i=>i.kind===e.kind&&i.id===e.id);n&&(n.taken=!0)}if(Array.isArray(t.breakers))for(const e of t.breakers){const n=this.list.find(i=>i.kind==="breaker"&&i.id===e.id);n&&(n.armed=!!e.armed,n.coolEnd=Number(e.coolEnd)||0)}if(Array.isArray(t.valves))for(const e of t.valves){const n=this.list.find(i=>i.kind==="valve"&&i.id===e.id);n&&n.mask&&(n.mask.on=!!e.on)}}}}const so=1;class Al{constructor(t){this.level=t,this.world=new Sc(t);for(const e of t.fixtures)this.world.registerFixture(e);for(const e of t.masks)this.world.registerMask(e);for(const e of t.objects.doors)this.world.registerDoor(e.id,(e.cx+.5)*zt,(e.cz+.5)*zt),e.locked&&this.world.lockDoor(e.id);this.player=new Ec(t.start.x,t.start.z),this.ai=new Ic(t.ais,this.world),this.brainById=new Map;for(const e of this.ai.brains)this.brainById.set(e.entity.id,e);this.objects=new Oc(this.world,t.objects),this.state={seals:{got:0,total:3},vessel:!1},this.time=0,this.won=!1,this.lost=!1,this.stats={time:0,spotted:0,bottlesUsed:0},this.log=[],this.pendingNoiseBuffer=[],this.recentNoises=[],this.pendingCaughtBy=null,this.spotCooldown=new Map,this.objectiveText="Slip the ward. Find the three seals.",this.unsubscribers=[wt.on("noise",e=>this.onNoise(e)),wt.on("incident",e=>this.pushLog(e)),wt.on("playerCaught",e=>{!this.won&&!this.lost&&(this.pendingCaughtBy=e.byId)}),wt.on("alert",e=>this.onAlert(e)),wt.on("sealTaken",()=>this.onSeal()),wt.on("vesselTaken",()=>this.onVessel()),wt.on("gameWon",()=>{this.won=!0})]}get archiveUnlocked(){return this.state.seals.got>=3}onNoise(t){const e=this.world.tileAt(t.x,t.z),n=Pr[e];this.pendingNoiseBuffer.push({x:t.x,z:t.z,loud:t.loud,type:t.type,t0:this.time,surface:n?n.name:"concrete"})}pushLog(t){this.log.push({t:Math.round(this.time*10)/10,who:t.who,kind:t.kind,detail:t.detail,x:t.x,z:t.z}),this.log.length>240&&this.log.shift()}onAlert(t){if(t.kind!=="chase")return;const e=this.spotCooldown.get(t.aiId)??-99;this.time-e>3&&(this.spotCooldown.set(t.aiId,this.time),this.stats.spotted++)}onSeal(){const t=this.state.seals.got;this.objectiveText=t>=3?"The archive stands open. Take the Vessel.":`Seal ${t}/3 recovered. ${3-t} remain.`,this.checkpoint(`seal${t}`)}onVessel(){this.objectiveText="Reach the elevator. Everything is restless now.";const t=this.level.archiveApproach;for(const e of this.ai.brains)e.entity.patrolBoost=1.15,e.entity.profile.kind==="warden"&&Math.hypot(e.entity.x-t.x,e.entity.z-t.z)<60&&(e.lastKnown={x:t.x,z:t.z},(e.state==="patrol"||e.state==="return")&&(e.state="search"));this.checkpoint("vessel")}update(t,e){if(this.won)return;const n=Math.min(t,.05);this.time+=n,this.stats.time=this.time,this.world.setTime(this.time);const i=this.pendingNoiseBuffer;if(this.pendingNoiseBuffer=[],this.player.update(n,e,this.world),e&&e.interact&&!this.lost){const o=this.objects.nearestInteractable(this.player,this);o&&this.objects.interact(o.obj,this)}if(e&&e.throwPressed&&!this.lost&&!this.player.hiddenIn){let o,l;e.aimWorld?(o=e.aimWorld.x-this.player.x,l=e.aimWorld.z-this.player.z):(o=Math.cos(this.player.facing),l=Math.sin(this.player.facing));const c=Math.hypot(o,l)||1;this.objects.throwBottle({x:this.player.x,z:this.player.z},{x:o/c,z:l/c},this)&&this.stats.bottlesUsed++}const r={player:this.player,noises:i,ais:this.ai.entities,time:this.time};this.ai.update(n,r),this.objects.update(n,this),this.checkHideUnderChase(),this.pendingCaughtBy&&!this.won&&(this.lost=!0,this.player.alive=!1,wt.emit("incident",{who:this.nameOf(this.pendingCaughtBy),kind:"caught",detail:"you were taken"}),wt.emit("gameLost",{})),this.pendingCaughtBy=null;for(const o of i)o.t0=o.t0??this.time,this.recentNoises.push(o);const a=this.time-.85;this.recentNoises=this.recentNoises.filter(o=>o.t0>=a)}checkHideUnderChase(){if(this.player.hiddenIn)for(const t of this.ai.brains){if(t.state!=="chase")continue;const e=t.entity;if(e.profile.kind!=="listener"&&(t.lastSeenT??99)<1.5&&Math.hypot(e.x-this.player.x,e.z-this.player.z)<11){this.pendingCaughtBy=e.id,wt.emit("incident",{who:this.nameOf(e.id),kind:"caught",detail:"saw you climb in"});return}}}proximityOf(t){let e=1;for(const n of this.ai.entities){if(n.kind!==t||n.disabled)continue;const i=Math.hypot(n.x-this.player.x,n.z-this.player.z);e=Math.min(e,Math.max(0,Math.min(1,1-i/16)))}return t==="listener"&&this.player.hiddenIn?e*.4:e}nameOf(t){return t&&t.charAt(0).toUpperCase()+t.slice(1)}threatLevel(){let t=0,e=!1;for(const n of this.ai.brains){const i=n.entity;if(i.disabled)continue;const r=n.state||"patrol",a=Math.hypot(i.x-this.player.x,i.z-this.player.z),o=Math.max(0,1-a/18);let l=.25;["suspicious","investigate","search","listen"].includes(r)&&(l=.55),r==="chase"&&(l=1,e=!0),t=Math.max(t,o*l),t=Math.max(t,(n.suspicion||0)/100*.5)}return{threat:Math.min(1,t),chaseActive:e}}snapshot(){const{threat:t,chaseActive:e}=this.threatLevel(),n=this.objects.nearestInteractable(this.player,this),i=this.level.objects.doors.map(o=>({id:o.id,open:this.world.isDoorOpen(o.id),locked:o.locked||null})),r=[];for(const o of[...this.level.objects.bottles,...this.level.objects.seals])o.taken&&r.push(o.id);this.state.vessel&&r.push("vessel");const a=this.ai.entities.map(o=>{const l=o.profile,c=this.brainById.get(o.id);return{id:o.id,kind:l.kind,x:o.x,z:o.z,facing:o.facing,state:c?c.state:"patrol",suspicion:c?Math.min(1,(c.suspicion||0)/100):0,disabled:!!o.disabled,coneRange:l.visionRange,coneHalfDeg:l.visionHalfAngleDeg}});return{time:this.time,player:{x:this.player.x,z:this.player.z,facing:this.player.facing,crouched:this.player.crouched,moving:this.player.moving,flashlight:this.player.flashlight,hiddenIn:this.player.hiddenIn,bottles:this.player.bottles,alive:this.player.alive},ais:a,lights:this.world.fixtures.map(o=>({id:o.id,on:this.world.fixtureActive(o)})),doors:i,takenIds:r,unlockedArchive:this.archiveUnlocked,unlockedElevator:this.state.vessel,sealsGot:this.state.seals.got,vessel:this.state.vessel,noises:this.recentNoises.map((o,l)=>({...o,id:`${l}-${Math.round(o.t0*100)}`})),blackout:[...this.world.blackouts.keys()],listenerNear:this.proximityOf("listener"),sentinelNear:this.proximityOf("sentinel"),bottles:this.player.bottles,threatLevel:t,chaseActive:e,pulse:(Math.sin(this.time*(2+t*6))+1)/2,prompt:n?{label:n.label}:null,objective:this.objectiveText,won:this.won,lost:this.lost}}checkpoint(t){wt.emit("checkpoint",{label:t})}serialize(){return{schema:so,time:this.time,state:JSON.parse(JSON.stringify(this.state)),stats:JSON.parse(JSON.stringify(this.stats)),objectiveText:this.objectiveText,player:this.player.serialize(),world:this.world.serialize(),ai:this.ai.serialize(),objects:this.objects.serialize()}}load(t){if(!t||t.schema!==so)return!1;try{return this.time=Number(t.time)||0,this.state=t.state,this.state.seals?(this.stats=t.stats||this.stats,this.objectiveText=t.objectiveText||this.objectiveText,this.player.load(t.player),this.world.setTime(this.time),this.world.load(t.world),this.ai.load(t.ai),this.objects.load(t.objects),!0):!1}catch{return!1}}}const xa="nightward.save.v1";function Ma(){return typeof localStorage<"u"}function Rl(s,t="manual"){if(!Ma())return!1;try{const e={version:1,ts:Date.now(),label:t,game:s.serialize()};return localStorage.setItem(xa,JSON.stringify(e)),!0}catch{return!1}}function Fc(s){if(!s||typeof s!="object"||s.version!==1)return null;const t=s.game;return!t||t.schema!==1||!t.player||!Number.isFinite(t.player.x)||!Number.isFinite(t.player.z)||!t.state||!t.state.seals||!Number.isFinite(t.state.seals.got)||!Array.isArray(t.ai&&t.ai.brains)||typeof t.world!="object"||!t.world||t.state.seals.got<0||t.state.seals.got>3?null:s}function zc(){if(!Ma())return null;try{const s=localStorage.getItem(xa);if(!s)return null;const t=JSON.parse(s);return Fc(t)}catch{return null}}function ro(){if(Ma())try{localStorage.removeItem(xa)}catch{}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ya="170",Bc=0,ao=1,kc=2,Cl=1,Hc=2,pn=3,Un=0,Ce=1,ke=2,In=0,_i=1,mn=2,oo=3,lo=4,Vc=5,Wn=100,Gc=101,Wc=102,Xc=103,qc=104,Yc=200,Kc=201,$c=202,Zc=203,Lr=204,Ir=205,Jc=206,Qc=207,jc=208,th=209,eh=210,nh=211,ih=212,sh=213,rh=214,Dr=0,Ur=1,Nr=2,yi=3,Or=4,Fr=5,zr=6,Br=7,Pl=0,ah=1,oh=2,Dn=0,lh=1,ch=2,hh=3,Ll=4,uh=5,dh=6,fh=7,Il=300,Si=301,Ei=302,kr=303,Hr=304,Bs=306,Yi=1e3,Yn=1001,Vr=1002,Oe=1003,ph=1004,is=1005,je=1006,qs=1007,Kn=1008,vn=1009,Dl=1010,Ul=1011,Ki=1012,Sa=1013,Zn=1014,tn=1015,$i=1016,Ea=1017,wa=1018,wi=1020,Nl=35902,Ol=1021,Fl=1022,Ke=1023,zl=1024,Bl=1025,vi=1026,bi=1027,ba=1028,Ta=1029,kl=1030,Aa=1031,Ra=1033,Rs=33776,Cs=33777,Ps=33778,Ls=33779,Gr=35840,Wr=35841,Xr=35842,qr=35843,Yr=36196,Kr=37492,$r=37496,Zr=37808,Jr=37809,Qr=37810,jr=37811,ta=37812,ea=37813,na=37814,ia=37815,sa=37816,ra=37817,aa=37818,oa=37819,la=37820,ca=37821,Is=36492,ha=36494,ua=36495,Hl=36283,da=36284,fa=36285,pa=36286,mh=3200,gh=3201,Vl=0,_h=1,Ln="",Ne="srgb",Ai="srgb-linear",ks="linear",jt="srgb",ti=7680,co=519,vh=512,xh=513,Mh=514,Gl=515,yh=516,Sh=517,Eh=518,wh=519,ho=35044,uo=35048,fo="300 es",gn=2e3,Us=2001;class Ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ys=Math.PI/180,Ns=180/Math.PI;function Zi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ye[s&255]+ye[s>>8&255]+ye[s>>16&255]+ye[s>>24&255]+"-"+ye[t&255]+ye[t>>8&255]+"-"+ye[t>>16&15|64]+ye[t>>24&255]+"-"+ye[e&63|128]+ye[e>>8&255]+"-"+ye[e>>16&255]+ye[e>>24&255]+ye[n&255]+ye[n>>8&255]+ye[n>>16&255]+ye[n>>24&255]).toLowerCase()}function xe(s,t,e){return Math.max(t,Math.min(e,s))}function bh(s,t){return(s%t+t)%t}function Ks(s,t,e){return(1-e)*s+e*t}function Di(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class dt{constructor(t=0,e=0){dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,i,r,a,o,l,c){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],m=n[2],f=n[5],g=n[8],_=i[0],p=i[3],h=i[6],E=i[1],w=i[4],x=i[7],U=i[2],A=i[5],T=i[8];return r[0]=a*_+o*E+l*U,r[3]=a*p+o*w+l*A,r[6]=a*h+o*x+l*T,r[1]=c*_+u*E+d*U,r[4]=c*p+u*w+d*A,r[7]=c*h+u*x+d*T,r[2]=m*_+f*E+g*U,r[5]=m*p+f*w+g*A,r[8]=m*h+f*x+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,m=o*l-u*r,f=c*r-a*l,g=e*d+n*m+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-u*n)*_,t[2]=(o*n-i*a)*_,t[3]=m*_,t[4]=(u*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply($s.makeScale(t,e)),this}rotate(t){return this.premultiply($s.makeRotation(-t)),this}translate(t,e){return this.premultiply($s.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $s=new Nt;function Wl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Os(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Th(){const s=Os("canvas");return s.style.display="block",s}const po={};function Hi(s){s in po||(po[s]=!0,console.warn(s))}function Ah(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Rh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ch(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Yt={enabled:!0,workingColorSpace:Ai,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===jt&&(s.r=_n(s.r),s.g=_n(s.g),s.b=_n(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===jt&&(s.r=xi(s.r),s.g=xi(s.g),s.b=xi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?ks:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function _n(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function xi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const mo=[.64,.33,.3,.6,.15,.06],go=[.2126,.7152,.0722],_o=[.3127,.329],vo=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xo=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Yt.define({[Ai]:{primaries:mo,whitePoint:_o,transfer:ks,toXYZ:vo,fromXYZ:xo,luminanceCoefficients:go,workingColorSpaceConfig:{unpackColorSpace:Ne},outputColorSpaceConfig:{drawingBufferColorSpace:Ne}},[Ne]:{primaries:mo,whitePoint:_o,transfer:jt,toXYZ:vo,fromXYZ:xo,luminanceCoefficients:go,outputColorSpaceConfig:{drawingBufferColorSpace:Ne}}});let ei;class Ph{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ei===void 0&&(ei=Os("canvas")),ei.width=t.width,ei.height=t.height;const n=ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Os("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=_n(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(_n(e[n]/255)*255):e[n]=_n(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Lh=0;class Xl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Zs(i[a].image)):r.push(Zs(i[a]))}else r=Zs(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Zs(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ph.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ih=0;class Ee extends Ri{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=Yn,i=Yn,r=je,a=Kn,o=Ke,l=vn,c=Ee.DEFAULT_ANISOTROPY,u=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=Zi(),this.name="",this.source=new Xl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Il)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yi:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case Vr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yi:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case Vr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=Il;Ee.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,n=0,i=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],u=l[4],d=l[8],m=l[1],f=l[5],g=l[9],_=l[2],p=l[6],h=l[10];if(Math.abs(u-m)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+m)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,x=(f+1)/2,U=(h+1)/2,A=(u+m)/4,T=(d+_)/4,C=(g+p)/4;return w>x&&w>U?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=A/n,r=T/n):x>U?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=C/i):U<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(U),n=T/r,i=C/r),this.set(n,i,r,e),this}let E=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(m-u)*(m-u));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(d-_)/E,this.z=(m-u)/E,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Dh extends Ri{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ee(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Xl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends Dh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ql extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Uh extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ci{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const m=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=m,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==m||c!==f||u!==g){let p=1-o;const h=l*m+c*f+u*g+d*_,E=h>=0?1:-1,w=1-h*h;if(w>Number.EPSILON){const U=Math.sqrt(w),A=Math.atan2(U,h*E);p=Math.sin(p*A)/U,o=Math.sin(o*A)/U}const x=o*E;if(l=l*p+m*x,c=c*p+f*x,u=u*p+g*x,d=d*p+_*x,p===1-o){const U=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=U,c*=U,u*=U,d*=U}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=r[a],m=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+u*d+l*f-c*m,t[e+1]=l*g+u*m+c*d-o*f,t[e+2]=c*g+u*f+o*m-l*d,t[e+3]=u*g-o*d-l*m-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),d=o(r/2),m=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=m*u*d+c*f*g,this._y=c*f*d-m*u*g,this._z=c*u*g+m*f*d,this._w=c*u*d-m*f*g;break;case"YXZ":this._x=m*u*d+c*f*g,this._y=c*f*d-m*u*g,this._z=c*u*g-m*f*d,this._w=c*u*d+m*f*g;break;case"ZXY":this._x=m*u*d-c*f*g,this._y=c*f*d+m*u*g,this._z=c*u*g+m*f*d,this._w=c*u*d-m*f*g;break;case"ZYX":this._x=m*u*d-c*f*g,this._y=c*f*d+m*u*g,this._z=c*u*g-m*f*d,this._w=c*u*d+m*f*g;break;case"YZX":this._x=m*u*d+c*f*g,this._y=c*f*d+m*u*g,this._z=c*u*g-m*f*d,this._w=c*u*d-m*f*g;break;case"XZY":this._x=m*u*d-c*f*g,this._y=c*f*d-m*u*g,this._z=c*u*g+m*f*d,this._w=c*u*d+m*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],m=n+o+d;if(m>0){const f=.5/Math.sqrt(m+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+i*c-r*l,this._y=i*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-e)*u)/c,m=Math.sin(e*u)/c;return this._w=a*d+this._w*m,this._x=n*d+this._x*m,this._y=i*d+this._y*m,this._z=r*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Mo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Mo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),u=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=i+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Js.copy(this).projectOnVector(t),this.sub(Js)}reflect(t){return this.sub(Js.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Js=new P,Mo=new Ci;class Qn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(We.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(We.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=We.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,We):We.fromBufferAttribute(r,a),We.applyMatrix4(t.matrixWorld),this.expandByPoint(We);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ss.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ss.copy(n.boundingBox)),ss.applyMatrix4(t.matrixWorld),this.union(ss)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,We),We.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ui),rs.subVectors(this.max,Ui),ni.subVectors(t.a,Ui),ii.subVectors(t.b,Ui),si.subVectors(t.c,Ui),Sn.subVectors(ii,ni),En.subVectors(si,ii),On.subVectors(ni,si);let e=[0,-Sn.z,Sn.y,0,-En.z,En.y,0,-On.z,On.y,Sn.z,0,-Sn.x,En.z,0,-En.x,On.z,0,-On.x,-Sn.y,Sn.x,0,-En.y,En.x,0,-On.y,On.x,0];return!Qs(e,ni,ii,si,rs)||(e=[1,0,0,0,1,0,0,0,1],!Qs(e,ni,ii,si,rs))?!1:(as.crossVectors(Sn,En),e=[as.x,as.y,as.z],Qs(e,ni,ii,si,rs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,We).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(We).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ln=[new P,new P,new P,new P,new P,new P,new P,new P],We=new P,ss=new Qn,ni=new P,ii=new P,si=new P,Sn=new P,En=new P,On=new P,Ui=new P,rs=new P,as=new P,Fn=new P;function Qs(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Fn.fromArray(s,r);const o=i.x*Math.abs(Fn.x)+i.y*Math.abs(Fn.y)+i.z*Math.abs(Fn.z),l=t.dot(Fn),c=e.dot(Fn),u=n.dot(Fn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Nh=new Qn,Ni=new P,js=new P;class Ji{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Nh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ni.subVectors(t,this.center);const e=Ni.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ni,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(js.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ni.copy(t.center).add(js)),this.expandByPoint(Ni.copy(t.center).sub(js))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const cn=new P,tr=new P,os=new P,wn=new P,er=new P,ls=new P,nr=new P;class Yl{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(cn.copy(this.origin).addScaledVector(this.direction,e),cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){tr.copy(t).add(e).multiplyScalar(.5),os.copy(e).sub(t).normalize(),wn.copy(this.origin).sub(tr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(os),o=wn.dot(this.direction),l=-wn.dot(os),c=wn.lengthSq(),u=Math.abs(1-a*a);let d,m,f,g;if(u>0)if(d=a*l-o,m=a*o-l,g=r*u,d>=0)if(m>=-g)if(m<=g){const _=1/u;d*=_,m*=_,f=d*(d+a*m+2*o)+m*(a*d+m+2*l)+c}else m=r,d=Math.max(0,-(a*m+o)),f=-d*d+m*(m+2*l)+c;else m=-r,d=Math.max(0,-(a*m+o)),f=-d*d+m*(m+2*l)+c;else m<=-g?(d=Math.max(0,-(-a*r+o)),m=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+m*(m+2*l)+c):m<=g?(d=0,m=Math.min(Math.max(-r,-l),r),f=m*(m+2*l)+c):(d=Math.max(0,-(a*r+o)),m=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+m*(m+2*l)+c);else m=a>0?-r:r,d=Math.max(0,-(a*m+o)),f=-d*d+m*(m+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(tr).addScaledVector(os,m),f}intersectSphere(t,e){cn.subVectors(t.center,this.origin);const n=cn.dot(this.direction),i=cn.dot(cn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,m=this.origin;return c>=0?(n=(t.min.x-m.x)*c,i=(t.max.x-m.x)*c):(n=(t.max.x-m.x)*c,i=(t.min.x-m.x)*c),u>=0?(r=(t.min.y-m.y)*u,a=(t.max.y-m.y)*u):(r=(t.max.y-m.y)*u,a=(t.min.y-m.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-m.z)*d,l=(t.max.z-m.z)*d):(o=(t.max.z-m.z)*d,l=(t.min.z-m.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,cn)!==null}intersectTriangle(t,e,n,i,r){er.subVectors(e,t),ls.subVectors(n,t),nr.crossVectors(er,ls);let a=this.direction.dot(nr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,t);const l=o*this.direction.dot(ls.crossVectors(wn,ls));if(l<0)return null;const c=o*this.direction.dot(er.cross(wn));if(c<0||l+c>a)return null;const u=-o*wn.dot(nr);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,i,r,a,o,l,c,u,d,m,f,g,_,p){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,u,d,m,f,g,_,p)}set(t,e,n,i,r,a,o,l,c,u,d,m,f,g,_,p){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=i,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=m,h[3]=f,h[7]=g,h[11]=_,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ri.setFromMatrixColumn(t,0).length(),r=1/ri.setFromMatrixColumn(t,1).length(),a=1/ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const m=a*u,f=a*d,g=o*u,_=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=m-_*c,e[9]=-o*l,e[2]=_-m*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const m=l*u,f=l*d,g=c*u,_=c*d;e[0]=m+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=_+m*o,e[10]=a*l}else if(t.order==="ZXY"){const m=l*u,f=l*d,g=c*u,_=c*d;e[0]=m-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=_-m*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const m=a*u,f=a*d,g=o*u,_=o*d;e[0]=l*u,e[4]=g*c-f,e[8]=m*c+_,e[1]=l*d,e[5]=_*c+m,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const m=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=_-m*d,e[8]=g*d+f,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*d+g,e[10]=m-_*d}else if(t.order==="XZY"){const m=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=m*d+_,e[5]=a*u,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*u,e[10]=_*d+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Oh,t,Fh)}lookAt(t,e,n){const i=this.elements;return Ie.subVectors(t,e),Ie.lengthSq()===0&&(Ie.z=1),Ie.normalize(),bn.crossVectors(n,Ie),bn.lengthSq()===0&&(Math.abs(n.z)===1?Ie.x+=1e-4:Ie.z+=1e-4,Ie.normalize(),bn.crossVectors(n,Ie)),bn.normalize(),cs.crossVectors(Ie,bn),i[0]=bn.x,i[4]=cs.x,i[8]=Ie.x,i[1]=bn.y,i[5]=cs.y,i[9]=Ie.y,i[2]=bn.z,i[6]=cs.z,i[10]=Ie.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],m=n[9],f=n[13],g=n[2],_=n[6],p=n[10],h=n[14],E=n[3],w=n[7],x=n[11],U=n[15],A=i[0],T=i[4],C=i[8],S=i[12],M=i[1],R=i[5],z=i[9],O=i[13],G=i[2],X=i[6],W=i[10],Z=i[14],H=i[3],it=i[7],ht=i[11],yt=i[15];return r[0]=a*A+o*M+l*G+c*H,r[4]=a*T+o*R+l*X+c*it,r[8]=a*C+o*z+l*W+c*ht,r[12]=a*S+o*O+l*Z+c*yt,r[1]=u*A+d*M+m*G+f*H,r[5]=u*T+d*R+m*X+f*it,r[9]=u*C+d*z+m*W+f*ht,r[13]=u*S+d*O+m*Z+f*yt,r[2]=g*A+_*M+p*G+h*H,r[6]=g*T+_*R+p*X+h*it,r[10]=g*C+_*z+p*W+h*ht,r[14]=g*S+_*O+p*Z+h*yt,r[3]=E*A+w*M+x*G+U*H,r[7]=E*T+w*R+x*X+U*it,r[11]=E*C+w*z+x*W+U*ht,r[15]=E*S+w*O+x*Z+U*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],m=t[10],f=t[14],g=t[3],_=t[7],p=t[11],h=t[15];return g*(+r*l*d-i*c*d-r*o*m+n*c*m+i*o*f-n*l*f)+_*(+e*l*f-e*c*m+r*a*m-i*a*f+i*c*u-r*l*u)+p*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*u-n*c*u)+h*(-i*o*u-e*l*d+e*o*m+i*a*d-n*a*m+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],m=t[10],f=t[11],g=t[12],_=t[13],p=t[14],h=t[15],E=d*p*c-_*m*c+_*l*f-o*p*f-d*l*h+o*m*h,w=g*m*c-u*p*c-g*l*f+a*p*f+u*l*h-a*m*h,x=u*_*c-g*d*c+g*o*f-a*_*f-u*o*h+a*d*h,U=g*d*l-u*_*l-g*o*m+a*_*m+u*o*p-a*d*p,A=e*E+n*w+i*x+r*U;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return t[0]=E*T,t[1]=(_*m*r-d*p*r-_*i*f+n*p*f+d*i*h-n*m*h)*T,t[2]=(o*p*r-_*l*r+_*i*c-n*p*c-o*i*h+n*l*h)*T,t[3]=(d*l*r-o*m*r-d*i*c+n*m*c+o*i*f-n*l*f)*T,t[4]=w*T,t[5]=(u*p*r-g*m*r+g*i*f-e*p*f-u*i*h+e*m*h)*T,t[6]=(g*l*r-a*p*r-g*i*c+e*p*c+a*i*h-e*l*h)*T,t[7]=(a*m*r-u*l*r+u*i*c-e*m*c-a*i*f+e*l*f)*T,t[8]=x*T,t[9]=(g*d*r-u*_*r-g*n*f+e*_*f+u*n*h-e*d*h)*T,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*h+e*o*h)*T,t[11]=(u*o*r-a*d*r-u*n*c+e*d*c+a*n*f-e*o*f)*T,t[12]=U*T,t[13]=(u*_*i-g*d*i+g*n*m-e*_*m-u*n*p+e*d*p)*T,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*p-e*o*p)*T,t[15]=(a*d*i-u*o*i+u*n*l-e*d*l-a*n*m+e*o*m)*T,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,m=r*c,f=r*u,g=r*d,_=a*u,p=a*d,h=o*d,E=l*c,w=l*u,x=l*d,U=n.x,A=n.y,T=n.z;return i[0]=(1-(_+h))*U,i[1]=(f+x)*U,i[2]=(g-w)*U,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(m+h))*A,i[6]=(p+E)*A,i[7]=0,i[8]=(g+w)*T,i[9]=(p-E)*T,i[10]=(1-(m+_))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ri.set(i[0],i[1],i[2]).length();const a=ri.set(i[4],i[5],i[6]).length(),o=ri.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Xe.copy(this);const c=1/r,u=1/a,d=1/o;return Xe.elements[0]*=c,Xe.elements[1]*=c,Xe.elements[2]*=c,Xe.elements[4]*=u,Xe.elements[5]*=u,Xe.elements[6]*=u,Xe.elements[8]*=d,Xe.elements[9]*=d,Xe.elements[10]*=d,e.setFromRotationMatrix(Xe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=gn){const l=this.elements,c=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),m=(n+i)/(n-i);let f,g;if(o===gn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Us)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=gn){const l=this.elements,c=1/(e-t),u=1/(n-i),d=1/(a-r),m=(e+t)*c,f=(n+i)*u;let g,_;if(o===gn)g=(a+r)*d,_=-2*d;else if(o===Us)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-m,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ri=new P,Xe=new Qt,Oh=new P(0,0,0),Fh=new P(1,1,1),bn=new P,cs=new P,Ie=new P,yo=new Qt,So=new Ci;class nn{constructor(t=0,e=0,n=0,i=nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],d=i[2],m=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(xe(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(m,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return So.setFromEuler(this),this.setFromQuaternion(So,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nn.DEFAULT_ORDER="XYZ";class Ca{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zh=0;const Eo=new P,ai=new Ci,hn=new Qt,hs=new P,Oi=new P,Bh=new P,kh=new Ci,wo=new P(1,0,0),bo=new P(0,1,0),To=new P(0,0,1),Ao={type:"added"},Hh={type:"removed"},oi={type:"childadded",child:null},ir={type:"childremoved",child:null};class ge extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new P,e=new nn,n=new Ci,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Nt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(wo,t)}rotateY(t){return this.rotateOnAxis(bo,t)}rotateZ(t){return this.rotateOnAxis(To,t)}translateOnAxis(t,e){return Eo.copy(t).applyQuaternion(this.quaternion),this.position.add(Eo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wo,t)}translateY(t){return this.translateOnAxis(bo,t)}translateZ(t){return this.translateOnAxis(To,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?hs.copy(t):hs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(Oi,hs,this.up):hn.lookAt(hs,Oi,this.up),this.quaternion.setFromRotationMatrix(hn),i&&(hn.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(hn),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ao),oi.child=t,this.dispatchEvent(oi),oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hh),ir.child=t,this.dispatchEvent(ir),ir.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(hn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ao),oi.child=t,this.dispatchEvent(oi),oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,t,Bh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,kh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),m=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),m.length>0&&(n.skeletons=m),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ge.DEFAULT_UP=new P(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qe=new P,un=new P,sr=new P,dn=new P,li=new P,ci=new P,Ro=new P,rr=new P,ar=new P,or=new P,lr=new te,cr=new te,hr=new te;class Ye{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),qe.subVectors(t,e),i.cross(qe);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){qe.subVectors(i,e),un.subVectors(n,e),sr.subVectors(t,e);const a=qe.dot(qe),o=qe.dot(un),l=qe.dot(sr),c=un.dot(un),u=un.dot(sr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const m=1/d,f=(c*l-o*u)*m,g=(a*u-o*l)*m;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,dn)===null?!1:dn.x>=0&&dn.y>=0&&dn.x+dn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,dn.x),l.addScaledVector(a,dn.y),l.addScaledVector(o,dn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return lr.setScalar(0),cr.setScalar(0),hr.setScalar(0),lr.fromBufferAttribute(t,e),cr.fromBufferAttribute(t,n),hr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(lr,r.x),a.addScaledVector(cr,r.y),a.addScaledVector(hr,r.z),a}static isFrontFacing(t,e,n,i){return qe.subVectors(n,e),un.subVectors(t,e),qe.cross(un).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qe.subVectors(this.c,this.b),un.subVectors(this.a,this.b),qe.cross(un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ye.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ye.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Ye.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Ye.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ye.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;li.subVectors(i,n),ci.subVectors(r,n),rr.subVectors(t,n);const l=li.dot(rr),c=ci.dot(rr);if(l<=0&&c<=0)return e.copy(n);ar.subVectors(t,i);const u=li.dot(ar),d=ci.dot(ar);if(u>=0&&d<=u)return e.copy(i);const m=l*d-u*c;if(m<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(li,a);or.subVectors(t,r);const f=li.dot(or),g=ci.dot(or);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(ci,o);const p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return Ro.subVectors(r,i),o=(d-u)/(d-u+(f-g)),e.copy(i).addScaledVector(Ro,o);const h=1/(p+_+m);return a=_*h,o=m*h,e.copy(n).addScaledVector(li,a).addScaledVector(ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tn={h:0,s:0,l:0},us={h:0,s:0,l:0};function ur(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Yt.workingColorSpace){if(t=bh(t,1),e=xe(e,0,1),n=xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ur(a,r,t+1/3),this.g=ur(a,r,t),this.b=ur(a,r,t-1/3)}return Yt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ne){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ne){const n=Kl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_n(t.r),this.g=_n(t.g),this.b=_n(t.b),this}copyLinearToSRGB(t){return this.r=xi(t.r),this.g=xi(t.g),this.b=xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ne){return Yt.fromWorkingColorSpace(Se.copy(this),t),Math.round(xe(Se.r*255,0,255))*65536+Math.round(xe(Se.g*255,0,255))*256+Math.round(xe(Se.b*255,0,255))}getHexString(t=Ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,i=Se.g,r=Se.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Ne){Yt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,i=Se.b;return t!==Ne?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Tn),this.setHSL(Tn.h+t,Tn.s+e,Tn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Tn),t.getHSL(us);const n=Ks(Tn.h,us.h,e),i=Ks(Tn.s,us.s,e),r=Ks(Tn.l,us.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Bt;Bt.NAMES=Kl;let Vh=0;class Qi extends Ri{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Zi(),this.name="",this.blending=_i,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lr,this.blendDst=Ir,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=co,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_i&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Lr&&(n.blendSrc=this.blendSrc),this.blendDst!==Ir&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==co&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ve extends Qi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=Pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new P,ds=new dt;class He{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ho,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ds.fromBufferAttribute(this,e),ds.applyMatrix3(t),this.setXY(e,ds.x,ds.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ho&&(t.usage=this.usage),t}}class $l extends He{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Zl extends He{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ee extends He{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Gh=0;const Be=new Qt,dr=new ge,hi=new P,De=new Qn,Fi=new Qn,me=new P;class be extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wl(t)?Zl:$l)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Be.makeRotationFromQuaternion(t),this.applyMatrix4(Be),this}rotateX(t){return Be.makeRotationX(t),this.applyMatrix4(Be),this}rotateY(t){return Be.makeRotationY(t),this.applyMatrix4(Be),this}rotateZ(t){return Be.makeRotationZ(t),this.applyMatrix4(Be),this}translate(t,e,n){return Be.makeTranslation(t,e,n),this.applyMatrix4(Be),this}scale(t,e,n){return Be.makeScale(t,e,n),this.applyMatrix4(Be),this}lookAt(t){return dr.lookAt(t),dr.updateMatrix(),this.applyMatrix4(dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ee(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];De.setFromBufferAttribute(r),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,De.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,De.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(De.min),this.boundingBox.expandByPoint(De.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(De.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Fi.setFromBufferAttribute(o),this.morphTargetsRelative?(me.addVectors(De.min,Fi.min),De.expandByPoint(me),me.addVectors(De.max,Fi.max),De.expandByPoint(me)):(De.expandByPoint(Fi.min),De.expandByPoint(Fi.max))}De.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)me.fromBufferAttribute(o,c),l&&(hi.fromBufferAttribute(t,c),me.add(hi)),i=Math.max(i,n.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new P,l[C]=new P;const c=new P,u=new P,d=new P,m=new dt,f=new dt,g=new dt,_=new P,p=new P;function h(C,S,M){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),m.fromBufferAttribute(r,C),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),u.sub(c),d.sub(c),f.sub(m),g.sub(m);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(R),o[C].add(_),o[S].add(_),o[M].add(_),l[C].add(p),l[S].add(p),l[M].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let C=0,S=E.length;C<S;++C){const M=E[C],R=M.start,z=M.count;for(let O=R,G=R+z;O<G;O+=3)h(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const w=new P,x=new P,U=new P,A=new P;function T(C){U.fromBufferAttribute(i,C),A.copy(U);const S=o[C];w.copy(S),w.sub(U.multiplyScalar(U.dot(S))).normalize(),x.crossVectors(A,S);const R=x.dot(l[C])<0?-1:1;a.setXYZW(C,w.x,w.y,w.z,R)}for(let C=0,S=E.length;C<S;++C){const M=E[C],R=M.start,z=M.count;for(let O=R,G=R+z;O<G;O+=3)T(t.getX(O+0)),T(t.getX(O+1)),T(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,f=n.count;m<f;m++)n.setXYZ(m,0,0,0);const i=new P,r=new P,a=new P,o=new P,l=new P,c=new P,u=new P,d=new P;if(t)for(let m=0,f=t.count;m<f;m+=3){const g=t.getX(m+0),_=t.getX(m+1),p=t.getX(m+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),u.subVectors(a,r),d.subVectors(i,r),u.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let m=0,f=e.count;m<f;m+=3)i.fromBufferAttribute(e,m+0),r.fromBufferAttribute(e,m+1),a.fromBufferAttribute(e,m+2),u.subVectors(a,r),d.subVectors(i,r),u.cross(d),n.setXYZ(m+0,u.x,u.y,u.z),n.setXYZ(m+1,u.x,u.y,u.z),n.setXYZ(m+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,d=o.normalized,m=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let h=0;h<u;h++)m[g++]=c[f++]}return new He(m,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const m=c[u],f=t(m,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,m=c.length;d<m;d++){const f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(i[l]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let m=0,f=d.length;m<f;m++)u.push(d[m].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Co=new Qt,zn=new Yl,fs=new Ji,Po=new P,ps=new P,ms=new P,gs=new P,fr=new P,_s=new P,Lo=new P,vs=new P;class Ct extends ge{constructor(t=new be,e=new ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){_s.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(fr.fromBufferAttribute(d,t),a?_s.addScaledVector(fr,u):_s.addScaledVector(fr.sub(e),u))}e.add(_s)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fs.copy(n.boundingSphere),fs.applyMatrix4(r),zn.copy(t.ray).recast(t.near),!(fs.containsPoint(zn.origin)===!1&&(zn.intersectSphere(fs,Po)===null||zn.origin.distanceToSquared(Po)>(t.far-t.near)**2))&&(Co.copy(r).invert(),zn.copy(t.ray).applyMatrix4(Co),!(n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,m=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=m.length;g<_;g++){const p=m[g],h=a[p.materialIndex],E=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let x=E,U=w;x<U;x+=3){const A=o.getX(x),T=o.getX(x+1),C=o.getX(x+2);i=xs(this,h,t,n,c,u,d,A,T,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,h=_;p<h;p+=3){const E=o.getX(p),w=o.getX(p+1),x=o.getX(p+2);i=xs(this,a,t,n,c,u,d,E,w,x),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=m.length;g<_;g++){const p=m[g],h=a[p.materialIndex],E=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let x=E,U=w;x<U;x+=3){const A=x,T=x+1,C=x+2;i=xs(this,h,t,n,c,u,d,A,T,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,h=_;p<h;p+=3){const E=p,w=p+1,x=p+2;i=xs(this,a,t,n,c,u,d,E,w,x),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function Wh(s,t,e,n,i,r,a,o){let l;if(t.side===Ce?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Un,o),l===null)return null;vs.copy(o),vs.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(vs);return c<e.near||c>e.far?null:{distance:c,point:vs.clone(),object:s}}function xs(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,ps),s.getVertexPosition(l,ms),s.getVertexPosition(c,gs);const u=Wh(s,t,e,n,ps,ms,gs,Lo);if(u){const d=new P;Ye.getBarycoord(Lo,ps,ms,gs,d),i&&(u.uv=Ye.getInterpolatedAttribute(i,o,l,c,d,new dt)),r&&(u.uv1=Ye.getInterpolatedAttribute(r,o,l,c,d,new dt)),a&&(u.normal=Ye.getInterpolatedAttribute(a,o,l,c,d,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const m={a:o,b:l,c,normal:new P,materialIndex:0};Ye.getNormal(ps,ms,gs,m.normal),u.face=m,u.barycoord=d}return u}class de extends be{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let m=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(d,2));function g(_,p,h,E,w,x,U,A,T,C,S){const M=x/T,R=U/C,z=x/2,O=U/2,G=A/2,X=T+1,W=C+1;let Z=0,H=0;const it=new P;for(let ht=0;ht<W;ht++){const yt=ht*R-O;for(let kt=0;kt<X;kt++){const ne=kt*M-z;it[_]=ne*E,it[p]=yt*w,it[h]=G,c.push(it.x,it.y,it.z),it[_]=0,it[p]=0,it[h]=A>0?1:-1,u.push(it.x,it.y,it.z),d.push(kt/T),d.push(1-ht/C),Z+=1}}for(let ht=0;ht<C;ht++)for(let yt=0;yt<T;yt++){const kt=m+yt+X*ht,ne=m+yt+X*(ht+1),Y=m+(yt+1)+X*(ht+1),et=m+(yt+1)+X*ht;l.push(kt,ne,et),l.push(ne,Y,et),H+=6}o.addGroup(f,H,S),f+=H,m+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new de(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ti(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function we(s){const t={};for(let e=0;e<s.length;e++){const n=Ti(s[e]);for(const i in n)t[i]=n[i]}return t}function Xh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Jl(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}const qh={clone:Ti,merge:we};var Yh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $e extends Qi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yh,this.fragmentShader=Kh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ti(t.uniforms),this.uniformsGroups=Xh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ql extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const An=new P,Io=new dt,Do=new dt;class Re extends Ql{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ns*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ns*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(An.x,An.y).multiplyScalar(-t/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(An.x,An.y).multiplyScalar(-t/An.z)}getViewSize(t,e){return this.getViewBounds(t,Io,Do),e.subVectors(Do,Io)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ys*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ui=-90,di=1;class $h extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Re(ui,di,t,e);i.layers=this.layers,this.add(i);const r=new Re(ui,di,t,e);r.layers=this.layers,this.add(r);const a=new Re(ui,di,t,e);a.layers=this.layers,this.add(a);const o=new Re(ui,di,t,e);o.layers=this.layers,this.add(o);const l=new Re(ui,di,t,e);l.layers=this.layers,this.add(l);const c=new Re(ui,di,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Us)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),m=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(d,m,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class jl extends Ee{constructor(t,e,n,i,r,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Si,super(t,e,n,i,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zh extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new jl(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new de(5,5,5),r=new $e({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:In});r.uniforms.tEquirect.value=e;const a=new Ct(i,r),o=e.minFilter;return e.minFilter===Kn&&(e.minFilter=je),new $h(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const pr=new P,Jh=new P,Qh=new Nt;class Pn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=pr.subVectors(n,e).cross(Jh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(pr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Qh.getNormalMatrix(t),i=this.coplanarPoint(pr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bn=new Ji,Ms=new P;class Pa{constructor(t=new Pn,e=new Pn,n=new Pn,i=new Pn,r=new Pn,a=new Pn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],u=i[5],d=i[6],m=i[7],f=i[8],g=i[9],_=i[10],p=i[11],h=i[12],E=i[13],w=i[14],x=i[15];if(n[0].setComponents(l-r,m-c,p-f,x-h).normalize(),n[1].setComponents(l+r,m+c,p+f,x+h).normalize(),n[2].setComponents(l+a,m+u,p+g,x+E).normalize(),n[3].setComponents(l-a,m-u,p-g,x-E).normalize(),n[4].setComponents(l-o,m-d,p-_,x-w).normalize(),e===gn)n[5].setComponents(l+o,m+d,p+_,x+w).normalize();else if(e===Us)n[5].setComponents(o,d,_,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(t){return Bn.center.set(0,0,0),Bn.radius=.7071067811865476,Bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ms.x=i.normal.x>0?t.max.x:t.min.x,Ms.y=i.normal.y>0?t.max.y:t.min.y,Ms.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ms)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function tc(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function jh(s){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,d=c.byteLength,m=s.createBuffer();s.bindBuffer(l,m),s.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let m=0;for(let f=1;f<d.length;f++){const g=d[m],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++m,d[m]=_)}d.length=m+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class ji extends be{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,d=t/o,m=e/l,f=[],g=[],_=[],p=[];for(let h=0;h<u;h++){const E=h*m-a;for(let w=0;w<c;w++){const x=w*d-r;g.push(x,-E,0),_.push(0,0,1),p.push(w/o),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let E=0;E<o;E++){const w=E+c*h,x=E+c*(h+1),U=E+1+c*(h+1),A=E+1+c*h;f.push(w,x,A),f.push(x,U,A)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ji(t.width,t.height,t.widthSegments,t.heightSegments)}}var tu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,su=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,au=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ou=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,cu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,du=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Su=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Eu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Au=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ru=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Iu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Uu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Nu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ou=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ku=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Yu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ku=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$u=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ju=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ju=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,td=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ed=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,id=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ad=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,od=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ld=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ud=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,md=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_d=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Td=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ad=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ld=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Id=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ud=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Od=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,of=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ff=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_f=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ef=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Af=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,If=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Df=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:tu,alphahash_pars_fragment:eu,alphamap_fragment:nu,alphamap_pars_fragment:iu,alphatest_fragment:su,alphatest_pars_fragment:ru,aomap_fragment:au,aomap_pars_fragment:ou,batching_pars_vertex:lu,batching_vertex:cu,begin_vertex:hu,beginnormal_vertex:uu,bsdfs:du,iridescence_fragment:fu,bumpmap_pars_fragment:pu,clipping_planes_fragment:mu,clipping_planes_pars_fragment:gu,clipping_planes_pars_vertex:_u,clipping_planes_vertex:vu,color_fragment:xu,color_pars_fragment:Mu,color_pars_vertex:yu,color_vertex:Su,common:Eu,cube_uv_reflection_fragment:wu,defaultnormal_vertex:bu,displacementmap_pars_vertex:Tu,displacementmap_vertex:Au,emissivemap_fragment:Ru,emissivemap_pars_fragment:Cu,colorspace_fragment:Pu,colorspace_pars_fragment:Lu,envmap_fragment:Iu,envmap_common_pars_fragment:Du,envmap_pars_fragment:Uu,envmap_pars_vertex:Nu,envmap_physical_pars_fragment:qu,envmap_vertex:Ou,fog_vertex:Fu,fog_pars_vertex:zu,fog_fragment:Bu,fog_pars_fragment:ku,gradientmap_pars_fragment:Hu,lightmap_pars_fragment:Vu,lights_lambert_fragment:Gu,lights_lambert_pars_fragment:Wu,lights_pars_begin:Xu,lights_toon_fragment:Yu,lights_toon_pars_fragment:Ku,lights_phong_fragment:$u,lights_phong_pars_fragment:Zu,lights_physical_fragment:Ju,lights_physical_pars_fragment:Qu,lights_fragment_begin:ju,lights_fragment_maps:td,lights_fragment_end:ed,logdepthbuf_fragment:nd,logdepthbuf_pars_fragment:id,logdepthbuf_pars_vertex:sd,logdepthbuf_vertex:rd,map_fragment:ad,map_pars_fragment:od,map_particle_fragment:ld,map_particle_pars_fragment:cd,metalnessmap_fragment:hd,metalnessmap_pars_fragment:ud,morphinstance_vertex:dd,morphcolor_vertex:fd,morphnormal_vertex:pd,morphtarget_pars_vertex:md,morphtarget_vertex:gd,normal_fragment_begin:_d,normal_fragment_maps:vd,normal_pars_fragment:xd,normal_pars_vertex:Md,normal_vertex:yd,normalmap_pars_fragment:Sd,clearcoat_normal_fragment_begin:Ed,clearcoat_normal_fragment_maps:wd,clearcoat_pars_fragment:bd,iridescence_pars_fragment:Td,opaque_fragment:Ad,packing:Rd,premultiplied_alpha_fragment:Cd,project_vertex:Pd,dithering_fragment:Ld,dithering_pars_fragment:Id,roughnessmap_fragment:Dd,roughnessmap_pars_fragment:Ud,shadowmap_pars_fragment:Nd,shadowmap_pars_vertex:Od,shadowmap_vertex:Fd,shadowmask_pars_fragment:zd,skinbase_vertex:Bd,skinning_pars_vertex:kd,skinning_vertex:Hd,skinnormal_vertex:Vd,specularmap_fragment:Gd,specularmap_pars_fragment:Wd,tonemapping_fragment:Xd,tonemapping_pars_fragment:qd,transmission_fragment:Yd,transmission_pars_fragment:Kd,uv_pars_fragment:$d,uv_pars_vertex:Zd,uv_vertex:Jd,worldpos_vertex:Qd,background_vert:jd,background_frag:tf,backgroundCube_vert:ef,backgroundCube_frag:nf,cube_vert:sf,cube_frag:rf,depth_vert:af,depth_frag:of,distanceRGBA_vert:lf,distanceRGBA_frag:cf,equirect_vert:hf,equirect_frag:uf,linedashed_vert:df,linedashed_frag:ff,meshbasic_vert:pf,meshbasic_frag:mf,meshlambert_vert:gf,meshlambert_frag:_f,meshmatcap_vert:vf,meshmatcap_frag:xf,meshnormal_vert:Mf,meshnormal_frag:yf,meshphong_vert:Sf,meshphong_frag:Ef,meshphysical_vert:wf,meshphysical_frag:bf,meshtoon_vert:Tf,meshtoon_frag:Af,points_vert:Rf,points_frag:Cf,shadow_vert:Pf,shadow_frag:Lf,sprite_vert:If,sprite_frag:Df},nt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Qe={basic:{uniforms:we([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:we([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:we([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:we([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:we([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:we([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:we([nt.points,nt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:we([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:we([nt.common,nt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:we([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:we([nt.sprite,nt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:we([nt.common,nt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:we([nt.lights,nt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Qe.physical={uniforms:we([Qe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const ys={r:0,b:0,g:0},kn=new nn,Uf=new Qt;function Nf(s,t,e,n,i,r,a){const o=new Bt(0);let l=r===!0?0:1,c,u,d=null,m=0,f=null;function g(E){let w=E.isScene===!0?E.background:null;return w&&w.isTexture&&(w=(E.backgroundBlurriness>0?e:t).get(w)),w}function _(E){let w=!1;const x=g(E);x===null?h(o,l):x&&x.isColor&&(h(x,1),w=!0);const U=s.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(E,w){const x=g(w);x&&(x.isCubeTexture||x.mapping===Bs)?(u===void 0&&(u=new Ct(new de(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Ti(Qe.backgroundCube.uniforms),vertexShader:Qe.backgroundCube.vertexShader,fragmentShader:Qe.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(U,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),kn.copy(w.backgroundRotation),kn.x*=-1,kn.y*=-1,kn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Uf.makeRotationFromEuler(kn)),u.material.toneMapped=Yt.getTransfer(x.colorSpace)!==jt,(d!==x||m!==x.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,d=x,m=x.version,f=s.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ct(new ji(2,2),new $e({name:"BackgroundMaterial",uniforms:Ti(Qe.background.uniforms),vertexShader:Qe.background.vertexShader,fragmentShader:Qe.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(x.colorSpace)!==jt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||m!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=x,m=x.version,f=s.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function h(E,w){E.getRGB(ys,Jl(s)),n.buffers.color.setClear(ys.r,ys.g,ys.b,w,a)}return{getClearColor:function(){return o},setClearColor:function(E,w=1){o.set(E),l=w,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,h(o,l)},render:_,addToRenderList:p}}function Of(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=m(null);let r=i,a=!1;function o(M,R,z,O,G){let X=!1;const W=d(O,z,R);r!==W&&(r=W,c(r.object)),X=f(M,O,z,G),X&&g(M,O,z,G),G!==null&&t.update(G,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(M,R,z,O),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function d(M,R,z){const O=z.wireframe===!0;let G=n[M.id];G===void 0&&(G={},n[M.id]=G);let X=G[R.id];X===void 0&&(X={},G[R.id]=X);let W=X[O];return W===void 0&&(W=m(l()),X[O]=W),W}function m(M){const R=[],z=[],O=[];for(let G=0;G<e;G++)R[G]=0,z[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,R,z,O){const G=r.attributes,X=R.attributes;let W=0;const Z=z.getAttributes();for(const H in Z)if(Z[H].location>=0){const ht=G[H];let yt=X[H];if(yt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(yt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(yt=M.instanceColor)),ht===void 0||ht.attribute!==yt||yt&&ht.data!==yt.data)return!0;W++}return r.attributesNum!==W||r.index!==O}function g(M,R,z,O){const G={},X=R.attributes;let W=0;const Z=z.getAttributes();for(const H in Z)if(Z[H].location>=0){let ht=X[H];ht===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor));const yt={};yt.attribute=ht,ht&&ht.data&&(yt.data=ht.data),G[H]=yt,W++}r.attributes=G,r.attributesNum=W,r.index=O}function _(){const M=r.newAttributes;for(let R=0,z=M.length;R<z;R++)M[R]=0}function p(M){h(M,0)}function h(M,R){const z=r.newAttributes,O=r.enabledAttributes,G=r.attributeDivisors;z[M]=1,O[M]===0&&(s.enableVertexAttribArray(M),O[M]=1),G[M]!==R&&(s.vertexAttribDivisor(M,R),G[M]=R)}function E(){const M=r.newAttributes,R=r.enabledAttributes;for(let z=0,O=R.length;z<O;z++)R[z]!==M[z]&&(s.disableVertexAttribArray(z),R[z]=0)}function w(M,R,z,O,G,X,W){W===!0?s.vertexAttribIPointer(M,R,z,G,X):s.vertexAttribPointer(M,R,z,O,G,X)}function x(M,R,z,O){_();const G=O.attributes,X=z.getAttributes(),W=R.defaultAttributeValues;for(const Z in X){const H=X[Z];if(H.location>=0){let it=G[Z];if(it===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(it=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(it=M.instanceColor)),it!==void 0){const ht=it.normalized,yt=it.itemSize,kt=t.get(it);if(kt===void 0)continue;const ne=kt.buffer,Y=kt.type,et=kt.bytesPerElement,vt=Y===s.INT||Y===s.UNSIGNED_INT||it.gpuType===Sa;if(it.isInterleavedBufferAttribute){const rt=it.data,At=rt.stride,It=it.offset;if(rt.isInstancedInterleavedBuffer){for(let Ht=0;Ht<H.locationSize;Ht++)h(H.location+Ht,rt.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ht=0;Ht<H.locationSize;Ht++)p(H.location+Ht);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let Ht=0;Ht<H.locationSize;Ht++)w(H.location+Ht,yt/H.locationSize,Y,ht,At*et,(It+yt/H.locationSize*Ht)*et,vt)}else{if(it.isInstancedBufferAttribute){for(let rt=0;rt<H.locationSize;rt++)h(H.location+rt,it.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let rt=0;rt<H.locationSize;rt++)p(H.location+rt);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let rt=0;rt<H.locationSize;rt++)w(H.location+rt,yt/H.locationSize,Y,ht,yt*et,yt/H.locationSize*rt*et,vt)}}else if(W!==void 0){const ht=W[Z];if(ht!==void 0)switch(ht.length){case 2:s.vertexAttrib2fv(H.location,ht);break;case 3:s.vertexAttrib3fv(H.location,ht);break;case 4:s.vertexAttrib4fv(H.location,ht);break;default:s.vertexAttrib1fv(H.location,ht)}}}}E()}function U(){C();for(const M in n){const R=n[M];for(const z in R){const O=R[z];for(const G in O)u(O[G].object),delete O[G];delete R[z]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const R=n[M.id];for(const z in R){const O=R[z];for(const G in O)u(O[G].object),delete O[G];delete R[z]}delete n[M.id]}function T(M){for(const R in n){const z=n[R];if(z[M.id]===void 0)continue;const O=z[M.id];for(const G in O)u(O[G].object),delete O[G];delete z[M.id]}}function C(){S(),a=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:S,dispose:U,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function Ff(s,t,e){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,d){d!==0&&(s.drawArraysInstanced(n,c,u,d),e.update(u,n,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];e.update(f,n,1)}function l(c,u,d,m){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],m[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,m,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*m[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function zf(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==Ke&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const C=T===$i&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==vn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==tn&&!C)}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,m=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),h=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),U=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:m,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:x,vertexTextures:U,maxSamples:A}}function Bf(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Pn,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,m){const f=d.length!==0||m||n!==0||i;return i=m,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,m){e=u(d,m,0)},this.setState=function(d,m,f){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,h=s.get(d);if(!i||g===null||g.length===0||r&&!p)r?u(null):c();else{const E=r?0:n,w=E*4;let x=h.clippingState||null;l.value=x,x=u(g,m,w,f);for(let U=0;U!==w;++U)x[U]=e[U];h.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,m,f,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const h=f+_*4,E=m.matrixWorldInverse;o.getNormalMatrix(E),(p===null||p.length<h)&&(p=new Float32Array(h));for(let w=0,x=f;w!==_;++w,x+=4)a.copy(d[w]).applyMatrix4(E,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function kf(s){let t=new WeakMap;function e(a,o){return o===kr?a.mapping=Si:o===Hr&&(a.mapping=Ei),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===kr||o===Hr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Zh(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class ec extends Ql{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const gi=4,Uo=[.125,.215,.35,.446,.526,.582],Xn=20,mr=new ec,No=new Bt;let gr=null,_r=0,vr=0,xr=!1;const Vn=(1+Math.sqrt(5))/2,fi=1/Vn,Oo=[new P(-Vn,fi,0),new P(Vn,fi,0),new P(-fi,0,Vn),new P(fi,0,Vn),new P(0,Vn,-fi),new P(0,Vn,fi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Fo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ko(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(gr,_r,vr),this._renderer.xr.enabled=xr,t.scissorTest=!1,Ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===Ei?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:$i,format:Ke,colorSpace:Ai,depthBuffer:!1},i=zo(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zo(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hf(r)),this._blurMaterial=Vf(r,t,e)}return i}_compileMaterial(t){const e=new Ct(this._lodPlanes[0],t);this._renderer.compile(e,mr)}_sceneToCubeUV(t,e,n,i){const o=new Re(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,m=u.toneMapping;u.getClearColor(No),u.toneMapping=Dn,u.autoClear=!1;const f=new ve({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new Ct(new de,f);let _=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(No),_=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):E===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const w=this._cubeSize;Ss(i,E*w,h>2?w:0,w,w),u.setRenderTarget(i),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=m,u.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Si||t.mapping===Ei;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ko()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ss(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,mr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Oo[(i-r-1)%Oo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ct(this._lodPlanes[i],c),m=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xn-1),_=r/g,p=isFinite(r)?1+Math.floor(u*_):Xn;p>Xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Xn}`);const h=[];let E=0;for(let T=0;T<Xn;++T){const C=T/_,S=Math.exp(-C*C/2);h.push(S),T===0?E+=S:T<p&&(E+=2*S)}for(let T=0;T<h.length;T++)h[T]=h[T]/E;m.envMap.value=t.texture,m.samples.value=p,m.weights.value=h,m.latitudinal.value=a==="latitudinal",o&&(m.poleAxis.value=o);const{_lodMax:w}=this;m.dTheta.value=g,m.mipInt.value=w-n;const x=this._sizeLods[i],U=3*x*(i>w-gi?i-w+gi:0),A=4*(this._cubeSize-x);Ss(e,U,A,3*x,2*x),l.setRenderTarget(e),l.render(d,mr)}}function Hf(s){const t=[],e=[],n=[];let i=s;const r=s-gi+1+Uo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-gi?l=Uo[a-s+gi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,m=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,p=2,h=1,E=new Float32Array(_*g*f),w=new Float32Array(p*g*f),x=new Float32Array(h*g*f);for(let A=0;A<f;A++){const T=A%3*2/3-1,C=A>2?0:-1,S=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];E.set(S,_*g*A),w.set(m,p*g*A);const M=[A,A,A,A,A,A];x.set(M,h*g*A)}const U=new be;U.setAttribute("position",new He(E,_)),U.setAttribute("uv",new He(w,p)),U.setAttribute("faceIndex",new He(x,h)),t.push(U),i>gi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function zo(s,t,e){const n=new Jn(s,t,e);return n.texture.mapping=Bs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ss(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Vf(s,t,e){const n=new Float32Array(Xn),i=new P(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Bo(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function ko(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function La(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Gf(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===kr||l===Hr,u=l===Si||l===Ei;if(c||u){let d=t.get(o);const m=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==m)return e===null&&(e=new Fo(s)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&i(f)?(e===null&&(e=new Fo(s)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Wf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Hi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Xf(s,t,e,n){const i={},r=new WeakMap;function a(d){const m=d.target;m.index!==null&&t.remove(m.index);for(const g in m.attributes)t.remove(m.attributes[g]);for(const g in m.morphAttributes){const _=m.morphAttributes[g];for(let p=0,h=_.length;p<h;p++)t.remove(_[p])}m.removeEventListener("dispose",a),delete i[m.id];const f=r.get(m);f&&(t.remove(f),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function o(d,m){return i[m.id]===!0||(m.addEventListener("dispose",a),i[m.id]=!0,e.memory.geometries++),m}function l(d){const m=d.attributes;for(const g in m)t.update(m[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let p=0,h=_.length;p<h;p++)t.update(_[p],s.ARRAY_BUFFER)}}function c(d){const m=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const E=f.array;_=f.version;for(let w=0,x=E.length;w<x;w+=3){const U=E[w+0],A=E[w+1],T=E[w+2];m.push(U,A,A,T,T,U)}}else if(g!==void 0){const E=g.array;_=g.version;for(let w=0,x=E.length/3-1;w<x;w+=3){const U=w+0,A=w+1,T=w+2;m.push(U,A,A,T,T,U)}}else return;const p=new(Wl(m)?Zl:$l)(m,1);p.version=_;const h=r.get(d);h&&t.remove(h),r.set(d,p)}function u(d){const m=r.get(d);if(m){const f=d.index;f!==null&&m.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function qf(s,t,e){let n;function i(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function l(m,f){s.drawElements(n,f,r,m*a),e.update(f,n,1)}function c(m,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,m*a,g),e.update(f,n,g))}function u(m,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,m,0,g);let p=0;for(let h=0;h<g;h++)p+=f[h];e.update(p,n,1)}function d(m,f,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<m.length;h++)c(m[h]/a,f[h],_[h]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,m,0,_,0,g);let h=0;for(let E=0;E<g;E++)h+=f[E]*_[E];e.update(h,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Yf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Kf(s,t,e){const n=new WeakMap,i=new te;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let m=n.get(o);if(m===void 0||m.count!==d){let M=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;m!==void 0&&m.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),p===!0&&(x=3);let U=o.attributes.position.count*x,A=1;U>t.maxTextureSize&&(A=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const T=new Float32Array(U*A*4*d),C=new ql(T,U,A,d);C.type=tn,C.needsUpdate=!0;const S=x*4;for(let R=0;R<d;R++){const z=h[R],O=E[R],G=w[R],X=U*A*4*R;for(let W=0;W<z.count;W++){const Z=W*S;g===!0&&(i.fromBufferAttribute(z,W),T[X+Z+0]=i.x,T[X+Z+1]=i.y,T[X+Z+2]=i.z,T[X+Z+3]=0),_===!0&&(i.fromBufferAttribute(O,W),T[X+Z+4]=i.x,T[X+Z+5]=i.y,T[X+Z+6]=i.z,T[X+Z+7]=0),p===!0&&(i.fromBufferAttribute(G,W),T[X+Z+8]=i.x,T[X+Z+9]=i.y,T[X+Z+10]=i.z,T[X+Z+11]=G.itemSize===4?i.w:1)}}m={count:d,texture:C,size:new dt(U,A)},n.set(o,m),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}return{update:r}}function $f(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=t.get(l,u);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const m=l.skeleton;i.get(m)!==c&&(m.update(),i.set(m,c))}return d}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class nc extends Ee{constructor(t,e,n,i,r,a,o,l,c,u=vi){if(u!==vi&&u!==bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===vi&&(n=Zn),n===void 0&&u===bi&&(n=wi),super(null,i,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Oe,this.minFilter=l!==void 0?l:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ic=new Ee,Ho=new nc(1,1),sc=new ql,rc=new Uh,ac=new jl,Vo=[],Go=[],Wo=new Float32Array(16),Xo=new Float32Array(9),qo=new Float32Array(4);function Pi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Vo[i];if(r===void 0&&(r=new Float32Array(i),Vo[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function fe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function pe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Hs(s,t){let e=Go[t];e===void 0&&(e=new Int32Array(t),Go[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Zf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Jf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;s.uniform2fv(this.addr,t),pe(e,t)}}function Qf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;s.uniform3fv(this.addr,t),pe(e,t)}}function jf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;s.uniform4fv(this.addr,t),pe(e,t)}}function tp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;qo.set(n),s.uniformMatrix2fv(this.addr,!1,qo),pe(e,n)}}function ep(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Xo.set(n),s.uniformMatrix3fv(this.addr,!1,Xo),pe(e,n)}}function np(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),pe(e,t)}else{if(fe(e,n))return;Wo.set(n),s.uniformMatrix4fv(this.addr,!1,Wo),pe(e,n)}}function ip(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function sp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;s.uniform2iv(this.addr,t),pe(e,t)}}function rp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;s.uniform3iv(this.addr,t),pe(e,t)}}function ap(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;s.uniform4iv(this.addr,t),pe(e,t)}}function op(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function lp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;s.uniform2uiv(this.addr,t),pe(e,t)}}function cp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;s.uniform3uiv(this.addr,t),pe(e,t)}}function hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;s.uniform4uiv(this.addr,t),pe(e,t)}}function up(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ho.compareFunction=Gl,r=Ho):r=ic,e.setTexture2D(t||r,i)}function dp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||rc,i)}function fp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ac,i)}function pp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||sc,i)}function mp(s){switch(s){case 5126:return Zf;case 35664:return Jf;case 35665:return Qf;case 35666:return jf;case 35674:return tp;case 35675:return ep;case 35676:return np;case 5124:case 35670:return ip;case 35667:case 35671:return sp;case 35668:case 35672:return rp;case 35669:case 35673:return ap;case 5125:return op;case 36294:return lp;case 36295:return cp;case 36296:return hp;case 35678:case 36198:case 36298:case 36306:case 35682:return up;case 35679:case 36299:case 36307:return dp;case 35680:case 36300:case 36308:case 36293:return fp;case 36289:case 36303:case 36311:case 36292:return pp}}function gp(s,t){s.uniform1fv(this.addr,t)}function _p(s,t){const e=Pi(t,this.size,2);s.uniform2fv(this.addr,e)}function vp(s,t){const e=Pi(t,this.size,3);s.uniform3fv(this.addr,e)}function xp(s,t){const e=Pi(t,this.size,4);s.uniform4fv(this.addr,e)}function Mp(s,t){const e=Pi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function yp(s,t){const e=Pi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Sp(s,t){const e=Pi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Ep(s,t){s.uniform1iv(this.addr,t)}function wp(s,t){s.uniform2iv(this.addr,t)}function bp(s,t){s.uniform3iv(this.addr,t)}function Tp(s,t){s.uniform4iv(this.addr,t)}function Ap(s,t){s.uniform1uiv(this.addr,t)}function Rp(s,t){s.uniform2uiv(this.addr,t)}function Cp(s,t){s.uniform3uiv(this.addr,t)}function Pp(s,t){s.uniform4uiv(this.addr,t)}function Lp(s,t,e){const n=this.cache,i=t.length,r=Hs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||ic,r[a])}function Ip(s,t,e){const n=this.cache,i=t.length,r=Hs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||rc,r[a])}function Dp(s,t,e){const n=this.cache,i=t.length,r=Hs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||ac,r[a])}function Up(s,t,e){const n=this.cache,i=t.length,r=Hs(e,i);fe(n,r)||(s.uniform1iv(this.addr,r),pe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||sc,r[a])}function Np(s){switch(s){case 5126:return gp;case 35664:return _p;case 35665:return vp;case 35666:return xp;case 35674:return Mp;case 35675:return yp;case 35676:return Sp;case 5124:case 35670:return Ep;case 35667:case 35671:return wp;case 35668:case 35672:return bp;case 35669:case 35673:return Tp;case 5125:return Ap;case 36294:return Rp;case 36295:return Cp;case 36296:return Pp;case 35678:case 36198:case 36298:case 36306:case 35682:return Lp;case 35679:case 36299:case 36307:return Ip;case 35680:case 36300:case 36308:case 36293:return Dp;case 36289:case 36303:case 36311:case 36292:return Up}}class Op{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=mp(e.type)}}class Fp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Np(e.type)}}class zp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Mr=/(\w+)(\])?(\[|\.)?/g;function Yo(s,t){s.seq.push(t),s.map[t.id]=t}function Bp(s,t,e){const n=s.name,i=n.length;for(Mr.lastIndex=0;;){const r=Mr.exec(n),a=Mr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Yo(e,c===void 0?new Op(o,s,t):new Fp(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new zp(o),Yo(e,d)),e=d}}}class Ds{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Bp(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ko(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const kp=37297;let Hp=0;function Vp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const $o=new Nt;function Gp(s){Yt._getMatrix($o,Yt.workingColorSpace,s);const t=`mat3( ${$o.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(s)){case ks:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Zo(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Vp(s.getShaderSource(t),a)}else return i}function Wp(s,t){const e=Gp(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xp(s,t){let e;switch(t){case lh:e="Linear";break;case ch:e="Reinhard";break;case hh:e="Cineon";break;case Ll:e="ACESFilmic";break;case dh:e="AgX";break;case fh:e="Neutral";break;case uh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Es=new P;function qp(){Yt.getLuminanceCoefficients(Es);const s=Es.x.toFixed(4),t=Es.y.toFixed(4),e=Es.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vi).join(`
`)}function Kp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function $p(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Vi(s){return s!==""}function Jo(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qo(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Zp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ma(s){return s.replace(Zp,Qp)}const Jp=new Map;function Qp(s,t){let e=Ft[t];if(e===void 0){const n=Jp.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ma(e)}const jp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jo(s){return s.replace(jp,tm)}function tm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function tl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function em(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Cl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Hc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===pn&&(t="SHADOWMAP_TYPE_VSM"),t}function nm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Si:case Ei:t="ENVMAP_TYPE_CUBE";break;case Bs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function im(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ei:t="ENVMAP_MODE_REFRACTION";break}return t}function sm(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Pl:t="ENVMAP_BLENDING_MULTIPLY";break;case ah:t="ENVMAP_BLENDING_MIX";break;case oh:t="ENVMAP_BLENDING_ADD";break}return t}function rm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function am(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=em(e),c=nm(e),u=im(e),d=sm(e),m=rm(e),f=Yp(e),g=Kp(r),_=i.createProgram();let p,h,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vi).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vi).join(`
`),h.length>0&&(h+=`
`)):(p=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vi).join(`
`),h=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Dn?Xp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,Wp("linearToOutputTexel",e.outputColorSpace),qp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vi).join(`
`)),a=ma(a),a=Jo(a,e),a=Qo(a,e),o=ma(o),o=Jo(o,e),o=Qo(o,e),a=jo(a),o=jo(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",e.glslVersion===fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const w=E+p+a,x=E+h+o,U=Ko(i,i.VERTEX_SHADER,w),A=Ko(i,i.FRAGMENT_SHADER,x);i.attachShader(_,U),i.attachShader(_,A),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(R){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(U).trim(),G=i.getShaderInfoLog(A).trim();let X=!0,W=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,U,A);else{const Z=Zo(i,U,"vertex"),H=Zo(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+Z+`
`+H)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||G==="")&&(W=!1);W&&(R.diagnostics={runnable:X,programLog:z,vertexShader:{log:O,prefix:p},fragmentShader:{log:G,prefix:h}})}i.deleteShader(U),i.deleteShader(A),C=new Ds(i,_),S=$p(i,_)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,kp)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=U,this.fragmentShader=A,this}let om=0;class lm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new cm(t),e.set(t,n)),n}}class cm{constructor(t){this.id=om++,this.code=t,this.usedTimes=0}}function hm(s,t,e,n,i,r,a){const o=new Ca,l=new lm,c=new Set,u=[],d=i.logarithmicDepthBuffer,m=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,M,R,z,O){const G=z.fog,X=O.geometry,W=S.isMeshStandardMaterial?z.environment:null,Z=(S.isMeshStandardMaterial?e:t).get(S.envMap||W),H=Z&&Z.mapping===Bs?Z.image.height:null,it=g[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ht=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,yt=ht!==void 0?ht.length:0;let kt=0;X.morphAttributes.position!==void 0&&(kt=1),X.morphAttributes.normal!==void 0&&(kt=2),X.morphAttributes.color!==void 0&&(kt=3);let ne,Y,et,vt;if(it){const Jt=Qe[it];ne=Jt.vertexShader,Y=Jt.fragmentShader}else ne=S.vertexShader,Y=S.fragmentShader,l.update(S),et=l.getVertexShaderID(S),vt=l.getFragmentShaderID(S);const rt=s.getRenderTarget(),At=s.state.buffers.depth.getReversed(),It=O.isInstancedMesh===!0,Ht=O.isBatchedMesh===!0,le=!!S.map,Xt=!!S.matcap,he=!!Z,N=!!S.aoMap,Fe=!!S.lightMap,Vt=!!S.bumpMap,Gt=!!S.normalMap,bt=!!S.displacementMap,re=!!S.emissiveMap,Et=!!S.metalnessMap,b=!!S.roughnessMap,v=S.anisotropy>0,F=S.clearcoat>0,K=S.dispersion>0,J=S.iridescence>0,q=S.sheen>0,xt=S.transmission>0,at=v&&!!S.anisotropyMap,ut=F&&!!S.clearcoatMap,qt=F&&!!S.clearcoatNormalMap,Q=F&&!!S.clearcoatRoughnessMap,ft=J&&!!S.iridescenceMap,Tt=J&&!!S.iridescenceThicknessMap,Rt=q&&!!S.sheenColorMap,pt=q&&!!S.sheenRoughnessMap,Wt=!!S.specularMap,Ot=!!S.specularColorMap,ie=!!S.specularIntensityMap,L=xt&&!!S.transmissionMap,st=xt&&!!S.thicknessMap,V=!!S.gradientMap,$=!!S.alphaMap,ct=S.alphaTest>0,ot=!!S.alphaHash,Dt=!!S.extensions;let ce=Dn;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ce=s.toneMapping);const Me={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:ne,fragmentShader:Y,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:vt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ht,batchingColor:Ht&&O._colorsTexture!==null,instancing:It,instancingColor:It&&O.instanceColor!==null,instancingMorph:It&&O.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Ai,alphaToCoverage:!!S.alphaToCoverage,map:le,matcap:Xt,envMap:he,envMapMode:he&&Z.mapping,envMapCubeUVHeight:H,aoMap:N,lightMap:Fe,bumpMap:Vt,normalMap:Gt,displacementMap:m&&bt,emissiveMap:re,normalMapObjectSpace:Gt&&S.normalMapType===_h,normalMapTangentSpace:Gt&&S.normalMapType===Vl,metalnessMap:Et,roughnessMap:b,anisotropy:v,anisotropyMap:at,clearcoat:F,clearcoatMap:ut,clearcoatNormalMap:qt,clearcoatRoughnessMap:Q,dispersion:K,iridescence:J,iridescenceMap:ft,iridescenceThicknessMap:Tt,sheen:q,sheenColorMap:Rt,sheenRoughnessMap:pt,specularMap:Wt,specularColorMap:Ot,specularIntensityMap:ie,transmission:xt,transmissionMap:L,thicknessMap:st,gradientMap:V,opaque:S.transparent===!1&&S.blending===_i&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:ct,alphaHash:ot,combine:S.combine,mapUv:le&&_(S.map.channel),aoMapUv:N&&_(S.aoMap.channel),lightMapUv:Fe&&_(S.lightMap.channel),bumpMapUv:Vt&&_(S.bumpMap.channel),normalMapUv:Gt&&_(S.normalMap.channel),displacementMapUv:bt&&_(S.displacementMap.channel),emissiveMapUv:re&&_(S.emissiveMap.channel),metalnessMapUv:Et&&_(S.metalnessMap.channel),roughnessMapUv:b&&_(S.roughnessMap.channel),anisotropyMapUv:at&&_(S.anisotropyMap.channel),clearcoatMapUv:ut&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:qt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:pt&&_(S.sheenRoughnessMap.channel),specularMapUv:Wt&&_(S.specularMap.channel),specularColorMapUv:Ot&&_(S.specularColorMap.channel),specularIntensityMapUv:ie&&_(S.specularIntensityMap.channel),transmissionMapUv:L&&_(S.transmissionMap.channel),thicknessMapUv:st&&_(S.thicknessMap.channel),alphaMapUv:$&&_(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Gt||v),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(le||$),fog:!!G,useFog:S.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:At,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:kt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:ce,decodeVideoTexture:le&&S.map.isVideoTexture===!0&&Yt.getTransfer(S.map.colorSpace)===jt,decodeVideoTextureEmissive:re&&S.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(S.emissiveMap.colorSpace)===jt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ke,flipSided:S.side===Ce,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Dt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&S.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function h(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)M.push(R),M.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(E(M,S),w(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function E(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function w(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const M=g[S.type];let R;if(M){const z=Qe[M];R=qh.clone(z.uniforms)}else R=S.uniforms;return R}function U(S,M){let R;for(let z=0,O=u.length;z<O;z++){const G=u[z];if(G.cacheKey===M){R=G,++R.usedTimes;break}}return R===void 0&&(R=new am(s,M,S,r),u.push(R)),R}function A(S){if(--S.usedTimes===0){const M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function T(S){l.remove(S)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:x,acquireProgram:U,releaseProgram:A,releaseShaderCache:T,programs:u,dispose:C}}function um(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function dm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function el(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function nl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(d,m,f,g,_,p){let h=s[t];return h===void 0?(h={id:d.id,object:d,geometry:m,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},s[t]=h):(h.id=d.id,h.object=d,h.geometry=m,h.material=f,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=p),t++,h}function o(d,m,f,g,_,p){const h=a(d,m,f,g,_,p);f.transmission>0?n.push(h):f.transparent===!0?i.push(h):e.push(h)}function l(d,m,f,g,_,p){const h=a(d,m,f,g,_,p);f.transmission>0?n.unshift(h):f.transparent===!0?i.unshift(h):e.unshift(h)}function c(d,m){e.length>1&&e.sort(d||dm),n.length>1&&n.sort(m||el),i.length>1&&i.sort(m||el)}function u(){for(let d=t,m=s.length;d<m;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:u,sort:c}}function fm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new nl,s.set(n,[a])):i>=r.length?(a=new nl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function pm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Bt};break;case"SpotLight":e={position:new P,direction:new P,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function mm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let gm=0;function _m(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function vm(s){const t=new pm,e=mm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const i=new P,r=new Qt,a=new Qt;function o(c){let u=0,d=0,m=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,p=0,h=0,E=0,w=0,x=0,U=0,A=0,T=0;c.sort(_m);for(let S=0,M=c.length;S<M;S++){const R=c[S],z=R.color,O=R.intensity,G=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=z.r*O,d+=z.g*O,m+=z.b*O;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],O);T++}else if(R.isDirectionalLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Z=R.shadow,H=e.get(R);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=R.shadow.matrix,E++}n.directional[f]=W,f++}else if(R.isSpotLight){const W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(z).multiplyScalar(O),W.distance=G,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[_]=W;const Z=R.shadow;if(R.map&&(n.spotLightMap[U]=R.map,U++,Z.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[_]=Z.matrix,R.castShadow){const H=e.get(R);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=X,x++}_++}else if(R.isRectAreaLight){const W=t.get(R);W.color.copy(z).multiplyScalar(O),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=W,p++}else if(R.isPointLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const Z=R.shadow,H=e.get(R);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,H.shadowCameraNear=Z.camera.near,H.shadowCameraFar=Z.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=R.shadow.matrix,w++}n.point[g]=W,g++}else if(R.isHemisphereLight){const W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(O),W.groundColor.copy(R.groundColor).multiplyScalar(O),n.hemi[h]=W,h++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=nt.LTC_FLOAT_1,n.rectAreaLTC2=nt.LTC_FLOAT_2):(n.rectAreaLTC1=nt.LTC_HALF_1,n.rectAreaLTC2=nt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=m;const C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==h||C.numDirectionalShadows!==E||C.numPointShadows!==w||C.numSpotShadows!==x||C.numSpotMaps!==U||C.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=x+U-A,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=T,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=h,C.numDirectionalShadows=E,C.numPointShadows=w,C.numSpotShadows=x,C.numSpotMaps=U,C.numLightProbes=T,n.version=gm++)}function l(c,u){let d=0,m=0,f=0,g=0,_=0;const p=u.matrixWorldInverse;for(let h=0,E=c.length;h<E;h++){const w=c[h];if(w.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),d++}else if(w.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),f++}else if(w.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(p),a.identity(),r.copy(w.matrixWorld),r.premultiply(p),a.extractRotation(r),x.halfWidth.set(w.width*.5,0,0),x.halfHeight.set(0,w.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const x=n.point[m];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(p),m++}else if(w.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(w.matrixWorld),x.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function il(s){const t=new vm(s),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function xm(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new il(s),t.set(i,[o])):r>=a.length?(o=new il(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Mm extends Qi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=mh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ym extends Qi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Em=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function wm(s,t,e){let n=new Pa;const i=new dt,r=new dt,a=new te,o=new Mm({depthPacking:gh}),l=new ym,c={},u=e.maxTextureSize,d={[Un]:Ce,[Ce]:Un,[ke]:ke},m=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Sm,fragmentShader:Em}),f=m.clone();f.defines.HORIZONTAL_PASS=1;const g=new be;g.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ct(g,m),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cl;let h=this.type;this.render=function(A,T,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=s.getRenderTarget(),M=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),z=s.state;z.setBlending(In),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const O=h!==pn&&this.type===pn,G=h===pn&&this.type!==pn;for(let X=0,W=A.length;X<W;X++){const Z=A[X],H=Z.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const it=H.getFrameExtents();if(i.multiply(it),r.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/it.x),i.x=r.x*it.x,H.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/it.y),i.y=r.y*it.y,H.mapSize.y=r.y)),H.map===null||O===!0||G===!0){const yt=this.type!==pn?{minFilter:Oe,magFilter:Oe}:{};H.map!==null&&H.map.dispose(),H.map=new Jn(i.x,i.y,yt),H.map.texture.name=Z.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const ht=H.getViewportCount();for(let yt=0;yt<ht;yt++){const kt=H.getViewport(yt);a.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),z.viewport(a),H.updateMatrices(Z,yt),n=H.getFrustum(),x(T,C,H.camera,Z,this.type)}H.isPointLightShadow!==!0&&this.type===pn&&E(H,C),H.needsUpdate=!1}h=this.type,p.needsUpdate=!1,s.setRenderTarget(S,M,R)};function E(A,T){const C=t.update(_);m.defines.VSM_SAMPLES!==A.blurSamples&&(m.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,m.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Jn(i.x,i.y)),m.uniforms.shadow_pass.value=A.map.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(T,null,C,m,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(T,null,C,f,_,null)}function w(A,T,C,S){let M=null;const R=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)M=R;else if(M=C.isPointLight===!0?l:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const z=M.uuid,O=T.uuid;let G=c[z];G===void 0&&(G={},c[z]=G);let X=G[O];X===void 0&&(X=M.clone(),G[O]=X,T.addEventListener("dispose",U)),M=X}if(M.visible=T.visible,M.wireframe=T.wireframe,S===pn?M.side=T.shadowSide!==null?T.shadowSide:T.side:M.side=T.shadowSide!==null?T.shadowSide:d[T.side],M.alphaMap=T.alphaMap,M.alphaTest=T.alphaTest,M.map=T.map,M.clipShadows=T.clipShadows,M.clippingPlanes=T.clippingPlanes,M.clipIntersection=T.clipIntersection,M.displacementMap=T.displacementMap,M.displacementScale=T.displacementScale,M.displacementBias=T.displacementBias,M.wireframeLinewidth=T.wireframeLinewidth,M.linewidth=T.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=s.properties.get(M);z.light=C}return M}function x(A,T,C,S,M){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const O=t.update(A),G=A.material;if(Array.isArray(G)){const X=O.groups;for(let W=0,Z=X.length;W<Z;W++){const H=X[W],it=G[H.materialIndex];if(it&&it.visible){const ht=w(A,it,S,M);A.onBeforeShadow(s,A,T,C,O,ht,H),s.renderBufferDirect(C,null,O,ht,A,H),A.onAfterShadow(s,A,T,C,O,ht,H)}}}else if(G.visible){const X=w(A,G,S,M);A.onBeforeShadow(s,A,T,C,O,X,null),s.renderBufferDirect(C,null,O,X,A,null),A.onAfterShadow(s,A,T,C,O,X,null)}}const z=A.children;for(let O=0,G=z.length;O<G;O++)x(z[O],T,C,S,M)}function U(A){A.target.removeEventListener("dispose",U);for(const C in c){const S=c[C],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const bm={[Dr]:Ur,[Nr]:zr,[Or]:Br,[yi]:Fr,[Ur]:Dr,[zr]:Nr,[Br]:Or,[Fr]:yi};function Tm(s,t){function e(){let L=!1;const st=new te;let V=null;const $=new te(0,0,0,0);return{setMask:function(ct){V!==ct&&!L&&(s.colorMask(ct,ct,ct,ct),V=ct)},setLocked:function(ct){L=ct},setClear:function(ct,ot,Dt,ce,Me){Me===!0&&(ct*=ce,ot*=ce,Dt*=ce),st.set(ct,ot,Dt,ce),$.equals(st)===!1&&(s.clearColor(ct,ot,Dt,ce),$.copy(st))},reset:function(){L=!1,V=null,$.set(-1,0,0,0)}}}function n(){let L=!1,st=!1,V=null,$=null,ct=null;return{setReversed:function(ot){if(st!==ot){const Dt=t.get("EXT_clip_control");st?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT);const ce=ct;ct=null,this.setClear(ce)}st=ot},getReversed:function(){return st},setTest:function(ot){ot?rt(s.DEPTH_TEST):At(s.DEPTH_TEST)},setMask:function(ot){V!==ot&&!L&&(s.depthMask(ot),V=ot)},setFunc:function(ot){if(st&&(ot=bm[ot]),$!==ot){switch(ot){case Dr:s.depthFunc(s.NEVER);break;case Ur:s.depthFunc(s.ALWAYS);break;case Nr:s.depthFunc(s.LESS);break;case yi:s.depthFunc(s.LEQUAL);break;case Or:s.depthFunc(s.EQUAL);break;case Fr:s.depthFunc(s.GEQUAL);break;case zr:s.depthFunc(s.GREATER);break;case Br:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}$=ot}},setLocked:function(ot){L=ot},setClear:function(ot){ct!==ot&&(st&&(ot=1-ot),s.clearDepth(ot),ct=ot)},reset:function(){L=!1,V=null,$=null,ct=null,st=!1}}}function i(){let L=!1,st=null,V=null,$=null,ct=null,ot=null,Dt=null,ce=null,Me=null;return{setTest:function(Jt){L||(Jt?rt(s.STENCIL_TEST):At(s.STENCIL_TEST))},setMask:function(Jt){st!==Jt&&!L&&(s.stencilMask(Jt),st=Jt)},setFunc:function(Jt,Ve,rn){(V!==Jt||$!==Ve||ct!==rn)&&(s.stencilFunc(Jt,Ve,rn),V=Jt,$=Ve,ct=rn)},setOp:function(Jt,Ve,rn){(ot!==Jt||Dt!==Ve||ce!==rn)&&(s.stencilOp(Jt,Ve,rn),ot=Jt,Dt=Ve,ce=rn)},setLocked:function(Jt){L=Jt},setClear:function(Jt){Me!==Jt&&(s.clearStencil(Jt),Me=Jt)},reset:function(){L=!1,st=null,V=null,$=null,ct=null,ot=null,Dt=null,ce=null,Me=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let u={},d={},m=new WeakMap,f=[],g=null,_=!1,p=null,h=null,E=null,w=null,x=null,U=null,A=null,T=new Bt(0,0,0),C=0,S=!1,M=null,R=null,z=null,O=null,G=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Z=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=Z>=1):H.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=Z>=2);let it=null,ht={};const yt=s.getParameter(s.SCISSOR_BOX),kt=s.getParameter(s.VIEWPORT),ne=new te().fromArray(yt),Y=new te().fromArray(kt);function et(L,st,V,$){const ct=new Uint8Array(4),ot=s.createTexture();s.bindTexture(L,ot),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Dt=0;Dt<V;Dt++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(st,0,s.RGBA,1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,ct):s.texImage2D(st+Dt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ct);return ot}const vt={};vt[s.TEXTURE_2D]=et(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=et(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[s.TEXTURE_2D_ARRAY]=et(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=et(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(s.DEPTH_TEST),a.setFunc(yi),Vt(!1),Gt(ao),rt(s.CULL_FACE),N(In);function rt(L){u[L]!==!0&&(s.enable(L),u[L]=!0)}function At(L){u[L]!==!1&&(s.disable(L),u[L]=!1)}function It(L,st){return d[L]!==st?(s.bindFramebuffer(L,st),d[L]=st,L===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=st),L===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=st),!0):!1}function Ht(L,st){let V=f,$=!1;if(L){V=m.get(st),V===void 0&&(V=[],m.set(st,V));const ct=L.textures;if(V.length!==ct.length||V[0]!==s.COLOR_ATTACHMENT0){for(let ot=0,Dt=ct.length;ot<Dt;ot++)V[ot]=s.COLOR_ATTACHMENT0+ot;V.length=ct.length,$=!0}}else V[0]!==s.BACK&&(V[0]=s.BACK,$=!0);$&&s.drawBuffers(V)}function le(L){return g!==L?(s.useProgram(L),g=L,!0):!1}const Xt={[Wn]:s.FUNC_ADD,[Gc]:s.FUNC_SUBTRACT,[Wc]:s.FUNC_REVERSE_SUBTRACT};Xt[Xc]=s.MIN,Xt[qc]=s.MAX;const he={[Yc]:s.ZERO,[Kc]:s.ONE,[$c]:s.SRC_COLOR,[Lr]:s.SRC_ALPHA,[eh]:s.SRC_ALPHA_SATURATE,[jc]:s.DST_COLOR,[Jc]:s.DST_ALPHA,[Zc]:s.ONE_MINUS_SRC_COLOR,[Ir]:s.ONE_MINUS_SRC_ALPHA,[th]:s.ONE_MINUS_DST_COLOR,[Qc]:s.ONE_MINUS_DST_ALPHA,[nh]:s.CONSTANT_COLOR,[ih]:s.ONE_MINUS_CONSTANT_COLOR,[sh]:s.CONSTANT_ALPHA,[rh]:s.ONE_MINUS_CONSTANT_ALPHA};function N(L,st,V,$,ct,ot,Dt,ce,Me,Jt){if(L===In){_===!0&&(At(s.BLEND),_=!1);return}if(_===!1&&(rt(s.BLEND),_=!0),L!==Vc){if(L!==p||Jt!==S){if((h!==Wn||x!==Wn)&&(s.blendEquation(s.FUNC_ADD),h=Wn,x=Wn),Jt)switch(L){case _i:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mn:s.blendFunc(s.ONE,s.ONE);break;case oo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case _i:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mn:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case oo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}E=null,w=null,U=null,A=null,T.set(0,0,0),C=0,p=L,S=Jt}return}ct=ct||st,ot=ot||V,Dt=Dt||$,(st!==h||ct!==x)&&(s.blendEquationSeparate(Xt[st],Xt[ct]),h=st,x=ct),(V!==E||$!==w||ot!==U||Dt!==A)&&(s.blendFuncSeparate(he[V],he[$],he[ot],he[Dt]),E=V,w=$,U=ot,A=Dt),(ce.equals(T)===!1||Me!==C)&&(s.blendColor(ce.r,ce.g,ce.b,Me),T.copy(ce),C=Me),p=L,S=!1}function Fe(L,st){L.side===ke?At(s.CULL_FACE):rt(s.CULL_FACE);let V=L.side===Ce;st&&(V=!V),Vt(V),L.blending===_i&&L.transparent===!1?N(In):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const $=L.stencilWrite;o.setTest($),$&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),re(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?rt(s.SAMPLE_ALPHA_TO_COVERAGE):At(s.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(L){M!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),M=L)}function Gt(L){L!==Bc?(rt(s.CULL_FACE),L!==R&&(L===ao?s.cullFace(s.BACK):L===kc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):At(s.CULL_FACE),R=L}function bt(L){L!==z&&(W&&s.lineWidth(L),z=L)}function re(L,st,V){L?(rt(s.POLYGON_OFFSET_FILL),(O!==st||G!==V)&&(s.polygonOffset(st,V),O=st,G=V)):At(s.POLYGON_OFFSET_FILL)}function Et(L){L?rt(s.SCISSOR_TEST):At(s.SCISSOR_TEST)}function b(L){L===void 0&&(L=s.TEXTURE0+X-1),it!==L&&(s.activeTexture(L),it=L)}function v(L,st,V){V===void 0&&(it===null?V=s.TEXTURE0+X-1:V=it);let $=ht[V];$===void 0&&($={type:void 0,texture:void 0},ht[V]=$),($.type!==L||$.texture!==st)&&(it!==V&&(s.activeTexture(V),it=V),s.bindTexture(L,st||vt[L]),$.type=L,$.texture=st)}function F(){const L=ht[it];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function qt(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ft(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Tt(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Rt(L){ne.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),ne.copy(L))}function pt(L){Y.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function Wt(L,st){let V=c.get(st);V===void 0&&(V=new WeakMap,c.set(st,V));let $=V.get(L);$===void 0&&($=s.getUniformBlockIndex(st,L.name),V.set(L,$))}function Ot(L,st){const $=c.get(st).get(L);l.get(st)!==$&&(s.uniformBlockBinding(st,$,L.__bindingPointIndex),l.set(st,$))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},it=null,ht={},d={},m=new WeakMap,f=[],g=null,_=!1,p=null,h=null,E=null,w=null,x=null,U=null,A=null,T=new Bt(0,0,0),C=0,S=!1,M=null,R=null,z=null,O=null,G=null,ne.set(0,0,s.canvas.width,s.canvas.height),Y.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:At,bindFramebuffer:It,drawBuffers:Ht,useProgram:le,setBlending:N,setMaterial:Fe,setFlipSided:Vt,setCullFace:Gt,setLineWidth:bt,setPolygonOffset:re,setScissorTest:Et,activeTexture:b,bindTexture:v,unbindTexture:F,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:ft,texImage3D:Tt,updateUBOMapping:Wt,uniformBlockBinding:Ot,texStorage2D:qt,texStorage3D:Q,texSubImage2D:q,texSubImage3D:xt,compressedTexSubImage2D:at,compressedTexSubImage3D:ut,scissor:Rt,viewport:pt,reset:ie}}function sl(s,t,e,n){const i=Am(n);switch(e){case Ol:return s*t;case zl:return s*t;case Bl:return s*t*2;case ba:return s*t/i.components*i.byteLength;case Ta:return s*t/i.components*i.byteLength;case kl:return s*t*2/i.components*i.byteLength;case Aa:return s*t*2/i.components*i.byteLength;case Fl:return s*t*3/i.components*i.byteLength;case Ke:return s*t*4/i.components*i.byteLength;case Ra:return s*t*4/i.components*i.byteLength;case Rs:case Cs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ps:case Ls:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Wr:case qr:return Math.max(s,16)*Math.max(t,8)/4;case Gr:case Xr:return Math.max(s,8)*Math.max(t,8)/2;case Yr:case Kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case $r:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Zr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Jr:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Qr:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case jr:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ta:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ea:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case na:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ia:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case sa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ra:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case aa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case oa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case la:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ca:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Is:case ha:case ua:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Hl:case da:return Math.ceil(s/4)*Math.ceil(t/4)*8;case fa:case pa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Am(s){switch(s){case vn:case Dl:return{byteLength:1,components:1};case Ki:case Ul:case $i:return{byteLength:2,components:1};case Ea:case wa:return{byteLength:2,components:4};case Zn:case Sa:case tn:return{byteLength:4,components:1};case Nl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Rm(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new dt,u=new WeakMap;let d;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,v){return f?new OffscreenCanvas(b,v):Os("canvas")}function _(b,v,F){let K=1;const J=Et(b);if((J.width>F||J.height>F)&&(K=F/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const q=Math.floor(K*J.width),xt=Math.floor(K*J.height);d===void 0&&(d=g(q,xt));const at=v?g(q,xt):d;return at.width=q,at.height=xt,at.getContext("2d").drawImage(b,0,0,q,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+xt+")."),at}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),b;return b}function p(b){return b.generateMipmaps}function h(b){s.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?s.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(b,v,F,K,J=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let q=v;if(v===s.RED&&(F===s.FLOAT&&(q=s.R32F),F===s.HALF_FLOAT&&(q=s.R16F),F===s.UNSIGNED_BYTE&&(q=s.R8)),v===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.R8UI),F===s.UNSIGNED_SHORT&&(q=s.R16UI),F===s.UNSIGNED_INT&&(q=s.R32UI),F===s.BYTE&&(q=s.R8I),F===s.SHORT&&(q=s.R16I),F===s.INT&&(q=s.R32I)),v===s.RG&&(F===s.FLOAT&&(q=s.RG32F),F===s.HALF_FLOAT&&(q=s.RG16F),F===s.UNSIGNED_BYTE&&(q=s.RG8)),v===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.RG8UI),F===s.UNSIGNED_SHORT&&(q=s.RG16UI),F===s.UNSIGNED_INT&&(q=s.RG32UI),F===s.BYTE&&(q=s.RG8I),F===s.SHORT&&(q=s.RG16I),F===s.INT&&(q=s.RG32I)),v===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.RGB8UI),F===s.UNSIGNED_SHORT&&(q=s.RGB16UI),F===s.UNSIGNED_INT&&(q=s.RGB32UI),F===s.BYTE&&(q=s.RGB8I),F===s.SHORT&&(q=s.RGB16I),F===s.INT&&(q=s.RGB32I)),v===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),F===s.UNSIGNED_INT&&(q=s.RGBA32UI),F===s.BYTE&&(q=s.RGBA8I),F===s.SHORT&&(q=s.RGBA16I),F===s.INT&&(q=s.RGBA32I)),v===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),v===s.RGBA){const xt=J?ks:Yt.getTransfer(K);F===s.FLOAT&&(q=s.RGBA32F),F===s.HALF_FLOAT&&(q=s.RGBA16F),F===s.UNSIGNED_BYTE&&(q=xt===jt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(b,v){let F;return b?v===null||v===Zn||v===wi?F=s.DEPTH24_STENCIL8:v===tn?F=s.DEPTH32F_STENCIL8:v===Ki&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zn||v===wi?F=s.DEPTH_COMPONENT24:v===tn?F=s.DEPTH_COMPONENT32F:v===Ki&&(F=s.DEPTH_COMPONENT16),F}function U(b,v){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Oe&&b.minFilter!==je?Math.log2(Math.max(v.width,v.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?v.mipmaps.length:1}function A(b){const v=b.target;v.removeEventListener("dispose",A),C(v),v.isVideoTexture&&u.delete(v)}function T(b){const v=b.target;v.removeEventListener("dispose",T),M(v)}function C(b){const v=n.get(b);if(v.__webglInit===void 0)return;const F=b.source,K=m.get(F);if(K){const J=K[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(b),Object.keys(K).length===0&&m.delete(F)}n.remove(b)}function S(b){const v=n.get(b);s.deleteTexture(v.__webglTexture);const F=b.source,K=m.get(F);delete K[v.__cacheKey],a.memory.textures--}function M(b){const v=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let J=0;J<v.__webglFramebuffer[K].length;J++)s.deleteFramebuffer(v.__webglFramebuffer[K][J]);else s.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)s.deleteFramebuffer(v.__webglFramebuffer[K]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=b.textures;for(let K=0,J=F.length;K<J;K++){const q=n.get(F[K]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(F[K])}n.remove(b)}let R=0;function z(){R=0}function O(){const b=R;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),R+=1,b}function G(b){const v=[];return v.push(b.wrapS),v.push(b.wrapT),v.push(b.wrapR||0),v.push(b.magFilter),v.push(b.minFilter),v.push(b.anisotropy),v.push(b.internalFormat),v.push(b.format),v.push(b.type),v.push(b.generateMipmaps),v.push(b.premultiplyAlpha),v.push(b.flipY),v.push(b.unpackAlignment),v.push(b.colorSpace),v.join()}function X(b,v){const F=n.get(b);if(b.isVideoTexture&&bt(b),b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){const K=b.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,b,v);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+v)}function W(b,v){const F=n.get(b);if(b.version>0&&F.__version!==b.version){Y(F,b,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+v)}function Z(b,v){const F=n.get(b);if(b.version>0&&F.__version!==b.version){Y(F,b,v);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+v)}function H(b,v){const F=n.get(b);if(b.version>0&&F.__version!==b.version){et(F,b,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+v)}const it={[Yi]:s.REPEAT,[Yn]:s.CLAMP_TO_EDGE,[Vr]:s.MIRRORED_REPEAT},ht={[Oe]:s.NEAREST,[ph]:s.NEAREST_MIPMAP_NEAREST,[is]:s.NEAREST_MIPMAP_LINEAR,[je]:s.LINEAR,[qs]:s.LINEAR_MIPMAP_NEAREST,[Kn]:s.LINEAR_MIPMAP_LINEAR},yt={[vh]:s.NEVER,[wh]:s.ALWAYS,[xh]:s.LESS,[Gl]:s.LEQUAL,[Mh]:s.EQUAL,[Eh]:s.GEQUAL,[yh]:s.GREATER,[Sh]:s.NOTEQUAL};function kt(b,v){if(v.type===tn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===je||v.magFilter===qs||v.magFilter===is||v.magFilter===Kn||v.minFilter===je||v.minFilter===qs||v.minFilter===is||v.minFilter===Kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,it[v.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,it[v.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,it[v.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,ht[v.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,yt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Oe||v.minFilter!==is&&v.minFilter!==Kn||v.type===tn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ne(b,v){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,v.addEventListener("dispose",A));const K=v.source;let J=m.get(K);J===void 0&&(J={},m.set(K,J));const q=G(v);if(q!==b.__cacheKey){J[q]===void 0&&(J[q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),J[q].usedTimes++;const xt=J[b.__cacheKey];xt!==void 0&&(J[b.__cacheKey].usedTimes--,xt.usedTimes===0&&S(v)),b.__cacheKey=q,b.__webglTexture=J[q].texture}return F}function Y(b,v,F){let K=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=s.TEXTURE_3D);const J=ne(b,v),q=v.source;e.bindTexture(K,b.__webglTexture,s.TEXTURE0+F);const xt=n.get(q);if(q.version!==xt.__version||J===!0){e.activeTexture(s.TEXTURE0+F);const at=Yt.getPrimaries(Yt.workingColorSpace),ut=v.colorSpace===Ln?null:Yt.getPrimaries(v.colorSpace),qt=v.colorSpace===Ln||at===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let Q=_(v.image,!1,i.maxTextureSize);Q=re(v,Q);const ft=r.convert(v.format,v.colorSpace),Tt=r.convert(v.type);let Rt=w(v.internalFormat,ft,Tt,v.colorSpace,v.isVideoTexture);kt(K,v);let pt;const Wt=v.mipmaps,Ot=v.isVideoTexture!==!0,ie=xt.__version===void 0||J===!0,L=q.dataReady,st=U(v,Q);if(v.isDepthTexture)Rt=x(v.format===bi,v.type),ie&&(Ot?e.texStorage2D(s.TEXTURE_2D,1,Rt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,Rt,Q.width,Q.height,0,ft,Tt,null));else if(v.isDataTexture)if(Wt.length>0){Ot&&ie&&e.texStorage2D(s.TEXTURE_2D,st,Rt,Wt[0].width,Wt[0].height);for(let V=0,$=Wt.length;V<$;V++)pt=Wt[V],Ot?L&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(s.TEXTURE_2D,V,Rt,pt.width,pt.height,0,ft,Tt,pt.data);v.generateMipmaps=!1}else Ot?(ie&&e.texStorage2D(s.TEXTURE_2D,st,Rt,Q.width,Q.height),L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Q.width,Q.height,ft,Tt,Q.data)):e.texImage2D(s.TEXTURE_2D,0,Rt,Q.width,Q.height,0,ft,Tt,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ot&&ie&&e.texStorage3D(s.TEXTURE_2D_ARRAY,st,Rt,Wt[0].width,Wt[0].height,Q.depth);for(let V=0,$=Wt.length;V<$;V++)if(pt=Wt[V],v.format!==Ke)if(ft!==null)if(Ot){if(L)if(v.layerUpdates.size>0){const ct=sl(pt.width,pt.height,v.format,v.type);for(const ot of v.layerUpdates){const Dt=pt.data.subarray(ot*ct/pt.data.BYTES_PER_ELEMENT,(ot+1)*ct/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,ot,pt.width,pt.height,1,ft,Dt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,pt.width,pt.height,Q.depth,ft,pt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,V,Rt,pt.width,pt.height,Q.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?L&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,pt.width,pt.height,Q.depth,ft,Tt,pt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,V,Rt,pt.width,pt.height,Q.depth,0,ft,Tt,pt.data)}else{Ot&&ie&&e.texStorage2D(s.TEXTURE_2D,st,Rt,Wt[0].width,Wt[0].height);for(let V=0,$=Wt.length;V<$;V++)pt=Wt[V],v.format!==Ke?ft!==null?Ot?L&&e.compressedTexSubImage2D(s.TEXTURE_2D,V,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(s.TEXTURE_2D,V,Rt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?L&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(s.TEXTURE_2D,V,Rt,pt.width,pt.height,0,ft,Tt,pt.data)}else if(v.isDataArrayTexture)if(Ot){if(ie&&e.texStorage3D(s.TEXTURE_2D_ARRAY,st,Rt,Q.width,Q.height,Q.depth),L)if(v.layerUpdates.size>0){const V=sl(Q.width,Q.height,v.format,v.type);for(const $ of v.layerUpdates){const ct=Q.data.subarray($*V/Q.data.BYTES_PER_ELEMENT,($+1)*V/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,Q.width,Q.height,1,ft,Tt,ct)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ft,Tt,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Rt,Q.width,Q.height,Q.depth,0,ft,Tt,Q.data);else if(v.isData3DTexture)Ot?(ie&&e.texStorage3D(s.TEXTURE_3D,st,Rt,Q.width,Q.height,Q.depth),L&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ft,Tt,Q.data)):e.texImage3D(s.TEXTURE_3D,0,Rt,Q.width,Q.height,Q.depth,0,ft,Tt,Q.data);else if(v.isFramebufferTexture){if(ie)if(Ot)e.texStorage2D(s.TEXTURE_2D,st,Rt,Q.width,Q.height);else{let V=Q.width,$=Q.height;for(let ct=0;ct<st;ct++)e.texImage2D(s.TEXTURE_2D,ct,Rt,V,$,0,ft,Tt,null),V>>=1,$>>=1}}else if(Wt.length>0){if(Ot&&ie){const V=Et(Wt[0]);e.texStorage2D(s.TEXTURE_2D,st,Rt,V.width,V.height)}for(let V=0,$=Wt.length;V<$;V++)pt=Wt[V],Ot?L&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,ft,Tt,pt):e.texImage2D(s.TEXTURE_2D,V,Rt,ft,Tt,pt);v.generateMipmaps=!1}else if(Ot){if(ie){const V=Et(Q);e.texStorage2D(s.TEXTURE_2D,st,Rt,V.width,V.height)}L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft,Tt,Q)}else e.texImage2D(s.TEXTURE_2D,0,Rt,ft,Tt,Q);p(v)&&h(K),xt.__version=q.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function et(b,v,F){if(v.image.length!==6)return;const K=ne(b,v),J=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+F);const q=n.get(J);if(J.version!==q.__version||K===!0){e.activeTexture(s.TEXTURE0+F);const xt=Yt.getPrimaries(Yt.workingColorSpace),at=v.colorSpace===Ln?null:Yt.getPrimaries(v.colorSpace),ut=v.colorSpace===Ln||xt===at?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const qt=v.isCompressedTexture||v.image[0].isCompressedTexture,Q=v.image[0]&&v.image[0].isDataTexture,ft=[];for(let $=0;$<6;$++)!qt&&!Q?ft[$]=_(v.image[$],!0,i.maxCubemapSize):ft[$]=Q?v.image[$].image:v.image[$],ft[$]=re(v,ft[$]);const Tt=ft[0],Rt=r.convert(v.format,v.colorSpace),pt=r.convert(v.type),Wt=w(v.internalFormat,Rt,pt,v.colorSpace),Ot=v.isVideoTexture!==!0,ie=q.__version===void 0||K===!0,L=J.dataReady;let st=U(v,Tt);kt(s.TEXTURE_CUBE_MAP,v);let V;if(qt){Ot&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,st,Wt,Tt.width,Tt.height);for(let $=0;$<6;$++){V=ft[$].mipmaps;for(let ct=0;ct<V.length;ct++){const ot=V[ct];v.format!==Ke?Rt!==null?Ot?L&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,0,0,ot.width,ot.height,Rt,ot.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,Wt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,0,0,ot.width,ot.height,Rt,pt,ot.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct,Wt,ot.width,ot.height,0,Rt,pt,ot.data)}}}else{if(V=v.mipmaps,Ot&&ie){V.length>0&&st++;const $=Et(ft[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,st,Wt,$.width,$.height)}for(let $=0;$<6;$++)if(Q){Ot?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ft[$].width,ft[$].height,Rt,pt,ft[$].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Wt,ft[$].width,ft[$].height,0,Rt,pt,ft[$].data);for(let ct=0;ct<V.length;ct++){const Dt=V[ct].image[$].image;Ot?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,0,0,Dt.width,Dt.height,Rt,pt,Dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,Wt,Dt.width,Dt.height,0,Rt,pt,Dt.data)}}else{Ot?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Rt,pt,ft[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Wt,Rt,pt,ft[$]);for(let ct=0;ct<V.length;ct++){const ot=V[ct];Ot?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,0,0,Rt,pt,ot.image[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ct+1,Wt,Rt,pt,ot.image[$])}}}p(v)&&h(s.TEXTURE_CUBE_MAP),q.__version=J.version,v.onUpdate&&v.onUpdate(v)}b.__version=v.version}function vt(b,v,F,K,J,q){const xt=r.convert(F.format,F.colorSpace),at=r.convert(F.type),ut=w(F.internalFormat,xt,at,F.colorSpace),qt=n.get(v),Q=n.get(F);if(Q.__renderTarget=v,!qt.__hasExternalTextures){const ft=Math.max(1,v.width>>q),Tt=Math.max(1,v.height>>q);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,q,ut,ft,Tt,v.depth,0,xt,at,null):e.texImage2D(J,q,ut,ft,Tt,0,xt,at,null)}e.bindFramebuffer(s.FRAMEBUFFER,b),Gt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,J,Q.__webglTexture,0,Vt(v)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,J,Q.__webglTexture,q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function rt(b,v,F){if(s.bindRenderbuffer(s.RENDERBUFFER,b),v.depthBuffer){const K=v.depthTexture,J=K&&K.isDepthTexture?K.type:null,q=x(v.stencilBuffer,J),xt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=Vt(v);Gt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,at,q,v.width,v.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,at,q,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,q,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xt,s.RENDERBUFFER,b)}else{const K=v.textures;for(let J=0;J<K.length;J++){const q=K[J],xt=r.convert(q.format,q.colorSpace),at=r.convert(q.type),ut=w(q.internalFormat,xt,at,q.colorSpace),qt=Vt(v);F&&Gt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,ut,v.width,v.height):Gt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,qt,ut,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,ut,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function At(b,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,b),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X(v.depthTexture,0);const J=K.__webglTexture,q=Vt(v);if(v.depthTexture.format===vi)Gt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(v.depthTexture.format===bi)Gt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function It(b){const v=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==b.depthTexture){const K=b.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=K}if(b.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");At(v.__webglFramebuffer,b)}else if(F){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=s.createRenderbuffer(),rt(v.__webglDepthbuffer[K],b,!1);else{const J=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,q)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),rt(v.__webglDepthbuffer,b,!1);else{const K=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,J)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(b,v,F){const K=n.get(b);v!==void 0&&vt(K.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&It(b)}function le(b){const v=b.texture,F=n.get(b),K=n.get(v);b.addEventListener("dispose",T);const J=b.textures,q=b.isWebGLCubeRenderTarget===!0,xt=J.length>1;if(xt||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=v.version,a.memory.textures++),q){F.__webglFramebuffer=[];for(let at=0;at<6;at++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[at]=[];for(let ut=0;ut<v.mipmaps.length;ut++)F.__webglFramebuffer[at][ut]=s.createFramebuffer()}else F.__webglFramebuffer[at]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let at=0;at<v.mipmaps.length;at++)F.__webglFramebuffer[at]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(xt)for(let at=0,ut=J.length;at<ut;at++){const qt=n.get(J[at]);qt.__webglTexture===void 0&&(qt.__webglTexture=s.createTexture(),a.memory.textures++)}if(b.samples>0&&Gt(b)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let at=0;at<J.length;at++){const ut=J[at];F.__webglColorRenderbuffer[at]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[at]);const qt=r.convert(ut.format,ut.colorSpace),Q=r.convert(ut.type),ft=w(ut.internalFormat,qt,Q,ut.colorSpace,b.isXRRenderTarget===!0),Tt=Vt(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Tt,ft,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,F.__webglColorRenderbuffer[at])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),rt(F.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),kt(s.TEXTURE_CUBE_MAP,v);for(let at=0;at<6;at++)if(v.mipmaps&&v.mipmaps.length>0)for(let ut=0;ut<v.mipmaps.length;ut++)vt(F.__webglFramebuffer[at][ut],b,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+at,ut);else vt(F.__webglFramebuffer[at],b,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);p(v)&&h(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let at=0,ut=J.length;at<ut;at++){const qt=J[at],Q=n.get(qt);e.bindTexture(s.TEXTURE_2D,Q.__webglTexture),kt(s.TEXTURE_2D,qt),vt(F.__webglFramebuffer,b,qt,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,0),p(qt)&&h(s.TEXTURE_2D)}e.unbindTexture()}else{let at=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(at=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(at,K.__webglTexture),kt(at,v),v.mipmaps&&v.mipmaps.length>0)for(let ut=0;ut<v.mipmaps.length;ut++)vt(F.__webglFramebuffer[ut],b,v,s.COLOR_ATTACHMENT0,at,ut);else vt(F.__webglFramebuffer,b,v,s.COLOR_ATTACHMENT0,at,0);p(v)&&h(at),e.unbindTexture()}b.depthBuffer&&It(b)}function Xt(b){const v=b.textures;for(let F=0,K=v.length;F<K;F++){const J=v[F];if(p(J)){const q=E(b),xt=n.get(J).__webglTexture;e.bindTexture(q,xt),h(q),e.unbindTexture()}}}const he=[],N=[];function Fe(b){if(b.samples>0){if(Gt(b)===!1){const v=b.textures,F=b.width,K=b.height;let J=s.COLOR_BUFFER_BIT;const q=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=n.get(b),at=v.length>1;if(at)for(let ut=0;ut<v.length;ut++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ut=0;ut<v.length;ut++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),at){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[ut]);const qt=n.get(v[ut]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,qt,0)}s.blitFramebuffer(0,0,F,K,0,0,F,K,J,s.NEAREST),l===!0&&(he.length=0,N.length=0,he.push(s.COLOR_ATTACHMENT0+ut),b.depthBuffer&&b.resolveDepthBuffer===!1&&(he.push(q),N.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,N)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),at)for(let ut=0;ut<v.length;ut++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,xt.__webglColorRenderbuffer[ut]);const qt=n.get(v[ut]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,qt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const v=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Vt(b){return Math.min(i.maxSamples,b.samples)}function Gt(b){const v=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function bt(b){const v=a.render.frame;u.get(b)!==v&&(u.set(b,v),b.update())}function re(b,v){const F=b.colorSpace,K=b.format,J=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==Ai&&F!==Ln&&(Yt.getTransfer(F)===jt?(K!==Ke||J!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Et(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=H,this.rebindTextures=Ht,this.setupRenderTarget=le,this.updateRenderTargetMipmap=Xt,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Gt}function Cm(s,t){function e(n,i=Ln){let r;const a=Yt.getTransfer(i);if(n===vn)return s.UNSIGNED_BYTE;if(n===Ea)return s.UNSIGNED_SHORT_4_4_4_4;if(n===wa)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Nl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Dl)return s.BYTE;if(n===Ul)return s.SHORT;if(n===Ki)return s.UNSIGNED_SHORT;if(n===Sa)return s.INT;if(n===Zn)return s.UNSIGNED_INT;if(n===tn)return s.FLOAT;if(n===$i)return s.HALF_FLOAT;if(n===Ol)return s.ALPHA;if(n===Fl)return s.RGB;if(n===Ke)return s.RGBA;if(n===zl)return s.LUMINANCE;if(n===Bl)return s.LUMINANCE_ALPHA;if(n===vi)return s.DEPTH_COMPONENT;if(n===bi)return s.DEPTH_STENCIL;if(n===ba)return s.RED;if(n===Ta)return s.RED_INTEGER;if(n===kl)return s.RG;if(n===Aa)return s.RG_INTEGER;if(n===Ra)return s.RGBA_INTEGER;if(n===Rs||n===Cs||n===Ps||n===Ls)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Rs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Rs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Cs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Gr||n===Wr||n===Xr||n===qr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Gr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yr||n===Kr||n===$r)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Yr||n===Kr)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$r)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zr||n===Jr||n===Qr||n===jr||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===aa||n===oa||n===la||n===ca)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ta)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ea)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===na)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ia)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ra)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===aa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oa)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===la)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ca)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Is||n===ha||n===ua)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Is)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hl||n===da||n===fa||n===pa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Is)return r.COMPRESSED_RED_RGTC1_EXT;if(n===da)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Pm extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ue extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lm={type:"move"};class yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),h=this._getHandJoint(c,_);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],m=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&m>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&m<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lm)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Um{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ee,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $e({vertexShader:Im,fragmentShader:Dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ct(new ji(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Nm extends Ri{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,m=null,f=null,g=null;const _=new Um,p=e.getContextAttributes();let h=null,E=null;const w=[],x=[],U=new dt;let A=null;const T=new Re;T.viewport=new te;const C=new Re;C.viewport=new te;const S=[T,C],M=new Pm;let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=w[Y];return et===void 0&&(et=new yr,w[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=w[Y];return et===void 0&&(et=new yr,w[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=w[Y];return et===void 0&&(et=new yr,w[Y]=et),et.getHandSpace()};function O(Y){const et=x.indexOf(Y.inputSource);if(et===-1)return;const vt=w[et];vt!==void 0&&(vt.update(Y.inputSource,Y.frame,c||a),vt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",X);for(let Y=0;Y<w.length;Y++){const et=x[Y];et!==null&&(x[Y]=null,w[Y].disconnect(et))}R=null,z=null,_.reset(),t.setRenderTarget(h),f=null,m=null,d=null,i=null,E=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return m!==null?m:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(h=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",G),i.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(U),i.renderState.layers===void 0){const et={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),E=new Jn(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let et=null,vt=null,rt=null;p.depth&&(rt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=p.stencil?bi:vi,vt=p.stencil?wi:Zn);const At={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};d=new XRWebGLBinding(i,e),m=d.createProjectionLayer(At),i.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),E=new Jn(m.textureWidth,m.textureHeight,{format:Ke,type:vn,depthTexture:new nc(m.textureWidth,m.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(Y){for(let et=0;et<Y.removed.length;et++){const vt=Y.removed[et],rt=x.indexOf(vt);rt>=0&&(x[rt]=null,w[rt].disconnect(vt))}for(let et=0;et<Y.added.length;et++){const vt=Y.added[et];let rt=x.indexOf(vt);if(rt===-1){for(let It=0;It<w.length;It++)if(It>=x.length){x.push(vt),rt=It;break}else if(x[It]===null){x[It]=vt,rt=It;break}if(rt===-1)break}const At=w[rt];At&&At.connect(vt)}}const W=new P,Z=new P;function H(Y,et,vt){W.setFromMatrixPosition(et.matrixWorld),Z.setFromMatrixPosition(vt.matrixWorld);const rt=W.distanceTo(Z),At=et.projectionMatrix.elements,It=vt.projectionMatrix.elements,Ht=At[14]/(At[10]-1),le=At[14]/(At[10]+1),Xt=(At[9]+1)/At[5],he=(At[9]-1)/At[5],N=(At[8]-1)/At[0],Fe=(It[8]+1)/It[0],Vt=Ht*N,Gt=Ht*Fe,bt=rt/(-N+Fe),re=bt*-N;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(re),Y.translateZ(bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),At[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const Et=Ht+bt,b=le+bt,v=Vt-re,F=Gt+(rt-re),K=Xt*le/b*Et,J=he*le/b*Et;Y.projectionMatrix.makePerspective(v,F,K,J,Et,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let et=Y.near,vt=Y.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(vt=_.depthFar)),M.near=C.near=T.near=et,M.far=C.far=T.far=vt,(R!==M.near||z!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,z=M.far),T.layers.mask=Y.layers.mask|2,C.layers.mask=Y.layers.mask|4,M.layers.mask=T.layers.mask|C.layers.mask;const rt=Y.parent,At=M.cameras;it(M,rt);for(let It=0;It<At.length;It++)it(At[It],rt);At.length===2?H(M,T,C):M.projectionMatrix.copy(T.projectionMatrix),ht(Y,M,rt)};function ht(Y,et,vt){vt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(vt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ns*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(m===null&&f===null))return l},this.setFoveation=function(Y){l=Y,m!==null&&(m.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let yt=null;function kt(Y,et){if(u=et.getViewerPose(c||a),g=et,u!==null){const vt=u.views;f!==null&&(t.setRenderTargetFramebuffer(E,f.framebuffer),t.setRenderTarget(E));let rt=!1;vt.length!==M.cameras.length&&(M.cameras.length=0,rt=!0);for(let It=0;It<vt.length;It++){const Ht=vt[It];let le=null;if(f!==null)le=f.getViewport(Ht);else{const he=d.getViewSubImage(m,Ht);le=he.viewport,It===0&&(t.setRenderTargetTextures(E,he.colorTexture,m.ignoreDepthValues?void 0:he.depthStencilTexture),t.setRenderTarget(E))}let Xt=S[It];Xt===void 0&&(Xt=new Re,Xt.layers.enable(It),Xt.viewport=new te,S[It]=Xt),Xt.matrix.fromArray(Ht.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(Ht.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(le.x,le.y,le.width,le.height),It===0&&(M.matrix.copy(Xt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),rt===!0&&M.cameras.push(Xt)}const At=i.enabledFeatures;if(At&&At.includes("depth-sensing")){const It=d.getDepthInformation(vt[0]);It&&It.isValid&&It.texture&&_.init(t,It,i.renderState)}}for(let vt=0;vt<w.length;vt++){const rt=x[vt],At=w[vt];rt!==null&&At!==void 0&&At.update(rt,et,c||a)}yt&&yt(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const ne=new tc;ne.setAnimationLoop(kt),this.setAnimationLoop=function(Y){yt=Y},this.dispose=function(){}}}const Hn=new nn,Om=new Qt;function Fm(s,t){function e(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,Jl(s)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function i(p,h,E,w,x){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(p,h):h.isMeshToonMaterial?(r(p,h),d(p,h)):h.isMeshPhongMaterial?(r(p,h),u(p,h)):h.isMeshStandardMaterial?(r(p,h),m(p,h),h.isMeshPhysicalMaterial&&f(p,h,x)):h.isMeshMatcapMaterial?(r(p,h),g(p,h)):h.isMeshDepthMaterial?r(p,h):h.isMeshDistanceMaterial?(r(p,h),_(p,h)):h.isMeshNormalMaterial?r(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?l(p,h,E,w):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,e(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,e(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ce&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,e(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ce&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,e(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,e(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const E=t.get(h),w=E.envMap,x=E.envMapRotation;w&&(p.envMap.value=w,Hn.copy(x),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),p.envMapRotation.value.setFromMatrix4(Om.makeRotationFromEuler(Hn)),p.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,e(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,E,w){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*E,p.scale.value=w*.5,h.map&&(p.map.value=h.map,e(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,e(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function d(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function m(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function f(p,h,E){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ce&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function _(p,h){const E=t.get(h).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function zm(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,w){const x=w.program;n.uniformBlockBinding(E,x)}function c(E,w){let x=i[E.id];x===void 0&&(g(E),x=u(E),i[E.id]=x,E.addEventListener("dispose",p));const U=w.program;n.updateUBOMapping(E,U);const A=t.render.frame;r[E.id]!==A&&(m(E),r[E.id]=A)}function u(E){const w=d();E.__bindingPointIndex=w;const x=s.createBuffer(),U=E.__size,A=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,U,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,x),x}function d(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(E){const w=i[E.id],x=E.uniforms,U=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let A=0,T=x.length;A<T;A++){const C=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,M=C.length;S<M;S++){const R=C[S];if(f(R,A,S,U)===!0){const z=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let G=0;for(let X=0;X<O.length;X++){const W=O[X],Z=_(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,z+G,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,G),G+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(E,w,x,U){const A=E.value,T=w+"_"+x;if(U[T]===void 0)return typeof A=="number"||typeof A=="boolean"?U[T]=A:U[T]=A.clone(),!0;{const C=U[T];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return U[T]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(E){const w=E.uniforms;let x=0;const U=16;for(let T=0,C=w.length;T<C;T++){const S=Array.isArray(w[T])?w[T]:[w[T]];for(let M=0,R=S.length;M<R;M++){const z=S[M],O=Array.isArray(z.value)?z.value:[z.value];for(let G=0,X=O.length;G<X;G++){const W=O[G],Z=_(W),H=x%U,it=H%Z.boundary,ht=H+it;x+=it,ht!==0&&U-ht<Z.storage&&(x+=U-ht),z.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=Z.storage}}}const A=x%U;return A>0&&(x+=U-A),E.__size=x,E.__cache={},this}function _(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function p(E){const w=E.target;w.removeEventListener("dispose",p);const x=a.indexOf(w.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function h(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:l,update:c,dispose:h}}class Bm{constructor(t={}){const{canvas:e=Th(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:m=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,h=null;const E=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ne,this.toneMapping=Dn,this.toneMappingExposure=1;const x=this;let U=!1,A=0,T=0,C=null,S=-1,M=null;const R=new te,z=new te;let O=null;const G=new Bt(0);let X=0,W=e.width,Z=e.height,H=1,it=null,ht=null;const yt=new te(0,0,W,Z),kt=new te(0,0,W,Z);let ne=!1;const Y=new Pa;let et=!1,vt=!1;const rt=new Qt,At=new Qt,It=new P,Ht=new te,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function he(){return C===null?H:1}let N=n;function Fe(y,I){return e.getContext(y,I)}try{const y={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ya}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",ot,!1),N===null){const I="webgl2";if(N=Fe(I,y),N===null)throw Fe(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Vt,Gt,bt,re,Et,b,v,F,K,J,q,xt,at,ut,qt,Q,ft,Tt,Rt,pt,Wt,Ot,ie,L;function st(){Vt=new Wf(N),Vt.init(),Ot=new Cm(N,Vt),Gt=new zf(N,Vt,t,Ot),bt=new Tm(N,Vt),Gt.reverseDepthBuffer&&m&&bt.buffers.depth.setReversed(!0),re=new Yf(N),Et=new um,b=new Rm(N,Vt,bt,Et,Gt,Ot,re),v=new kf(x),F=new Gf(x),K=new jh(N),ie=new Of(N,K),J=new Xf(N,K,re,ie),q=new $f(N,J,K,re),Rt=new Kf(N,Gt,b),Q=new Bf(Et),xt=new hm(x,v,F,Vt,Gt,ie,Q),at=new Fm(x,Et),ut=new fm,qt=new xm(Vt),Tt=new Nf(x,v,F,bt,q,f,l),ft=new wm(x,q,Gt),L=new zm(N,re,Gt,bt),pt=new Ff(N,Vt,re),Wt=new qf(N,Vt,re),re.programs=xt.programs,x.capabilities=Gt,x.extensions=Vt,x.properties=Et,x.renderLists=ut,x.shadowMap=ft,x.state=bt,x.info=re}st();const V=new Nm(x,N);this.xr=V,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=Vt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Vt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(y){y!==void 0&&(H=y,this.setSize(W,Z,!1))},this.getSize=function(y){return y.set(W,Z)},this.setSize=function(y,I,B=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=y,Z=I,e.width=Math.floor(y*H),e.height=Math.floor(I*H),B===!0&&(e.style.width=y+"px",e.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(W*H,Z*H).floor()},this.setDrawingBufferSize=function(y,I,B){W=y,Z=I,H=B,e.width=Math.floor(y*B),e.height=Math.floor(I*B),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(R)},this.getViewport=function(y){return y.copy(yt)},this.setViewport=function(y,I,B,k){y.isVector4?yt.set(y.x,y.y,y.z,y.w):yt.set(y,I,B,k),bt.viewport(R.copy(yt).multiplyScalar(H).round())},this.getScissor=function(y){return y.copy(kt)},this.setScissor=function(y,I,B,k){y.isVector4?kt.set(y.x,y.y,y.z,y.w):kt.set(y,I,B,k),bt.scissor(z.copy(kt).multiplyScalar(H).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(y){bt.setScissorTest(ne=y)},this.setOpaqueSort=function(y){it=y},this.setTransparentSort=function(y){ht=y},this.getClearColor=function(y){return y.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor.apply(Tt,arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha.apply(Tt,arguments)},this.clear=function(y=!0,I=!0,B=!0){let k=0;if(y){let D=!1;if(C!==null){const j=C.texture.format;D=j===Ra||j===Aa||j===Ta}if(D){const j=C.texture.type,lt=j===vn||j===Zn||j===Ki||j===wi||j===Ea||j===wa,mt=Tt.getClearColor(),gt=Tt.getClearAlpha(),Pt=mt.r,Ut=mt.g,_t=mt.b;lt?(g[0]=Pt,g[1]=Ut,g[2]=_t,g[3]=gt,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Pt,_[1]=Ut,_[2]=_t,_[3]=gt,N.clearBufferiv(N.COLOR,0,_))}else k|=N.COLOR_BUFFER_BIT}I&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),ut.dispose(),qt.dispose(),Et.dispose(),v.dispose(),F.dispose(),q.dispose(),ie.dispose(),L.dispose(),xt.dispose(),V.dispose(),V.removeEventListener("sessionstart",Va),V.removeEventListener("sessionend",Ga),Nn.stop()};function $(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const y=re.autoReset,I=ft.enabled,B=ft.autoUpdate,k=ft.needsUpdate,D=ft.type;st(),re.autoReset=y,ft.enabled=I,ft.autoUpdate=B,ft.needsUpdate=k,ft.type=D}function ot(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Dt(y){const I=y.target;I.removeEventListener("dispose",Dt),ce(I)}function ce(y){Me(y),Et.remove(y)}function Me(y){const I=Et.get(y).programs;I!==void 0&&(I.forEach(function(B){xt.releaseProgram(B)}),y.isShaderMaterial&&xt.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,B,k,D,j){I===null&&(I=le);const lt=D.isMesh&&D.matrixWorld.determinant()<0,mt=mc(y,I,B,k,D);bt.setMaterial(k,lt);let gt=B.index,Pt=1;if(k.wireframe===!0){if(gt=J.getWireframeAttribute(B),gt===void 0)return;Pt=2}const Ut=B.drawRange,_t=B.attributes.position;let Kt=Ut.start*Pt,se=(Ut.start+Ut.count)*Pt;j!==null&&(Kt=Math.max(Kt,j.start*Pt),se=Math.min(se,(j.start+j.count)*Pt)),gt!==null?(Kt=Math.max(Kt,0),se=Math.min(se,gt.count)):_t!=null&&(Kt=Math.max(Kt,0),se=Math.min(se,_t.count));const ae=se-Kt;if(ae<0||ae===1/0)return;ie.setup(D,k,mt,B,gt);let Te,$t=pt;if(gt!==null&&(Te=K.get(gt),$t=Wt,$t.setIndex(Te)),D.isMesh)k.wireframe===!0?(bt.setLineWidth(k.wireframeLinewidth*he()),$t.setMode(N.LINES)):$t.setMode(N.TRIANGLES);else if(D.isLine){let Mt=k.linewidth;Mt===void 0&&(Mt=1),bt.setLineWidth(Mt*he()),D.isLineSegments?$t.setMode(N.LINES):D.isLineLoop?$t.setMode(N.LINE_LOOP):$t.setMode(N.LINE_STRIP)}else D.isPoints?$t.setMode(N.POINTS):D.isSprite&&$t.setMode(N.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)$t.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Vt.get("WEBGL_multi_draw"))$t.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Mt=D._multiDrawStarts,an=D._multiDrawCounts,Zt=D._multiDrawCount,Ge=gt?K.get(gt).bytesPerElement:1,jn=Et.get(k).currentProgram.getUniforms();for(let Pe=0;Pe<Zt;Pe++)jn.setValue(N,"_gl_DrawID",Pe),$t.render(Mt[Pe]/Ge,an[Pe])}else if(D.isInstancedMesh)$t.renderInstances(Kt,ae,D.count);else if(B.isInstancedBufferGeometry){const Mt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,an=Math.min(B.instanceCount,Mt);$t.renderInstances(Kt,ae,an)}else $t.render(Kt,ae)};function Jt(y,I,B){y.transparent===!0&&y.side===ke&&y.forceSinglePass===!1?(y.side=Ce,y.needsUpdate=!0,es(y,I,B),y.side=Un,y.needsUpdate=!0,es(y,I,B),y.side=ke):es(y,I,B)}this.compile=function(y,I,B=null){B===null&&(B=y),h=qt.get(B),h.init(I),w.push(h),B.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),y!==B&&y.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),h.setupLights();const k=new Set;return y.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const j=D.material;if(j)if(Array.isArray(j))for(let lt=0;lt<j.length;lt++){const mt=j[lt];Jt(mt,B,D),k.add(mt)}else Jt(j,B,D),k.add(j)}),w.pop(),h=null,k},this.compileAsync=function(y,I,B=null){const k=this.compile(y,I,B);return new Promise(D=>{function j(){if(k.forEach(function(lt){Et.get(lt).currentProgram.isReady()&&k.delete(lt)}),k.size===0){D(y);return}setTimeout(j,10)}Vt.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ve=null;function rn(y){Ve&&Ve(y)}function Va(){Nn.stop()}function Ga(){Nn.start()}const Nn=new tc;Nn.setAnimationLoop(rn),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(y){Ve=y,V.setAnimationLoop(y),y===null?Nn.stop():Nn.start()},V.addEventListener("sessionstart",Va),V.addEventListener("sessionend",Ga),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(I),I=V.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,I,C),h=qt.get(y,w.length),h.init(I),w.push(h),At.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Y.setFromProjectionMatrix(At),vt=this.localClippingEnabled,et=Q.init(this.clippingPlanes,vt),p=ut.get(y,E.length),p.init(),E.push(p),V.enabled===!0&&V.isPresenting===!0){const j=x.xr.getDepthSensingMesh();j!==null&&Vs(j,I,-1/0,x.sortObjects)}Vs(y,I,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(it,ht),Xt=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Xt&&Tt.addToRenderList(p,y),this.info.render.frame++,et===!0&&Q.beginShadows();const B=h.state.shadowsArray;ft.render(B,y,I),et===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=p.opaque,D=p.transmissive;if(h.setupLights(),I.isArrayCamera){const j=I.cameras;if(D.length>0)for(let lt=0,mt=j.length;lt<mt;lt++){const gt=j[lt];Xa(k,D,y,gt)}Xt&&Tt.render(y);for(let lt=0,mt=j.length;lt<mt;lt++){const gt=j[lt];Wa(p,y,gt,gt.viewport)}}else D.length>0&&Xa(k,D,y,I),Xt&&Tt.render(y),Wa(p,y,I);C!==null&&(b.updateMultisampleRenderTarget(C),b.updateRenderTargetMipmap(C)),y.isScene===!0&&y.onAfterRender(x,y,I),ie.resetDefaultState(),S=-1,M=null,w.pop(),w.length>0?(h=w[w.length-1],et===!0&&Q.setGlobalState(x.clippingPlanes,h.state.camera)):h=null,E.pop(),E.length>0?p=E[E.length-1]:p=null};function Vs(y,I,B,k){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)h.pushLight(y),y.castShadow&&h.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Y.intersectsSprite(y)){k&&Ht.setFromMatrixPosition(y.matrixWorld).applyMatrix4(At);const lt=q.update(y),mt=y.material;mt.visible&&p.push(y,lt,mt,B,Ht.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Y.intersectsObject(y))){const lt=q.update(y),mt=y.material;if(k&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ht.copy(y.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Ht.copy(lt.boundingSphere.center)),Ht.applyMatrix4(y.matrixWorld).applyMatrix4(At)),Array.isArray(mt)){const gt=lt.groups;for(let Pt=0,Ut=gt.length;Pt<Ut;Pt++){const _t=gt[Pt],Kt=mt[_t.materialIndex];Kt&&Kt.visible&&p.push(y,lt,Kt,B,Ht.z,_t)}}else mt.visible&&p.push(y,lt,mt,B,Ht.z,null)}}const j=y.children;for(let lt=0,mt=j.length;lt<mt;lt++)Vs(j[lt],I,B,k)}function Wa(y,I,B,k){const D=y.opaque,j=y.transmissive,lt=y.transparent;h.setupLightsView(B),et===!0&&Q.setGlobalState(x.clippingPlanes,B),k&&bt.viewport(R.copy(k)),D.length>0&&ts(D,I,B),j.length>0&&ts(j,I,B),lt.length>0&&ts(lt,I,B),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Xa(y,I,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[k.id]===void 0&&(h.state.transmissionRenderTarget[k.id]=new Jn(1,1,{generateMipmaps:!0,type:Vt.has("EXT_color_buffer_half_float")||Vt.has("EXT_color_buffer_float")?$i:vn,minFilter:Kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));const j=h.state.transmissionRenderTarget[k.id],lt=k.viewport||R;j.setSize(lt.z,lt.w);const mt=x.getRenderTarget();x.setRenderTarget(j),x.getClearColor(G),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Xt&&Tt.render(B);const gt=x.toneMapping;x.toneMapping=Dn;const Pt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),h.setupLightsView(k),et===!0&&Q.setGlobalState(x.clippingPlanes,k),ts(y,B,k),b.updateMultisampleRenderTarget(j),b.updateRenderTargetMipmap(j),Vt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let _t=0,Kt=I.length;_t<Kt;_t++){const se=I[_t],ae=se.object,Te=se.geometry,$t=se.material,Mt=se.group;if($t.side===ke&&ae.layers.test(k.layers)){const an=$t.side;$t.side=Ce,$t.needsUpdate=!0,qa(ae,B,k,Te,$t,Mt),$t.side=an,$t.needsUpdate=!0,Ut=!0}}Ut===!0&&(b.updateMultisampleRenderTarget(j),b.updateRenderTargetMipmap(j))}x.setRenderTarget(mt),x.setClearColor(G,X),Pt!==void 0&&(k.viewport=Pt),x.toneMapping=gt}function ts(y,I,B){const k=I.isScene===!0?I.overrideMaterial:null;for(let D=0,j=y.length;D<j;D++){const lt=y[D],mt=lt.object,gt=lt.geometry,Pt=k===null?lt.material:k,Ut=lt.group;mt.layers.test(B.layers)&&qa(mt,I,B,gt,Pt,Ut)}}function qa(y,I,B,k,D,j){y.onBeforeRender(x,I,B,k,D,j),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),D.onBeforeRender(x,I,B,k,y,j),D.transparent===!0&&D.side===ke&&D.forceSinglePass===!1?(D.side=Ce,D.needsUpdate=!0,x.renderBufferDirect(B,I,k,D,y,j),D.side=Un,D.needsUpdate=!0,x.renderBufferDirect(B,I,k,D,y,j),D.side=ke):x.renderBufferDirect(B,I,k,D,y,j),y.onAfterRender(x,I,B,k,D,j)}function es(y,I,B){I.isScene!==!0&&(I=le);const k=Et.get(y),D=h.state.lights,j=h.state.shadowsArray,lt=D.state.version,mt=xt.getParameters(y,D.state,j,I,B),gt=xt.getProgramCacheKey(mt);let Pt=k.programs;k.environment=y.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(y.isMeshStandardMaterial?F:v).get(y.envMap||k.environment),k.envMapRotation=k.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,Pt===void 0&&(y.addEventListener("dispose",Dt),Pt=new Map,k.programs=Pt);let Ut=Pt.get(gt);if(Ut!==void 0){if(k.currentProgram===Ut&&k.lightsStateVersion===lt)return Ka(y,mt),Ut}else mt.uniforms=xt.getUniforms(y),y.onBeforeCompile(mt,x),Ut=xt.acquireProgram(mt,gt),Pt.set(gt,Ut),k.uniforms=mt.uniforms;const _t=k.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(_t.clippingPlanes=Q.uniform),Ka(y,mt),k.needsLights=_c(y),k.lightsStateVersion=lt,k.needsLights&&(_t.ambientLightColor.value=D.state.ambient,_t.lightProbe.value=D.state.probe,_t.directionalLights.value=D.state.directional,_t.directionalLightShadows.value=D.state.directionalShadow,_t.spotLights.value=D.state.spot,_t.spotLightShadows.value=D.state.spotShadow,_t.rectAreaLights.value=D.state.rectArea,_t.ltc_1.value=D.state.rectAreaLTC1,_t.ltc_2.value=D.state.rectAreaLTC2,_t.pointLights.value=D.state.point,_t.pointLightShadows.value=D.state.pointShadow,_t.hemisphereLights.value=D.state.hemi,_t.directionalShadowMap.value=D.state.directionalShadowMap,_t.directionalShadowMatrix.value=D.state.directionalShadowMatrix,_t.spotShadowMap.value=D.state.spotShadowMap,_t.spotLightMatrix.value=D.state.spotLightMatrix,_t.spotLightMap.value=D.state.spotLightMap,_t.pointShadowMap.value=D.state.pointShadowMap,_t.pointShadowMatrix.value=D.state.pointShadowMatrix),k.currentProgram=Ut,k.uniformsList=null,Ut}function Ya(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=Ds.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function Ka(y,I){const B=Et.get(y);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function mc(y,I,B,k,D){I.isScene!==!0&&(I=le),b.resetTextureUnits();const j=I.fog,lt=k.isMeshStandardMaterial?I.environment:null,mt=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Ai,gt=(k.isMeshStandardMaterial?F:v).get(k.envMap||lt),Pt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ut=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),_t=!!B.morphAttributes.position,Kt=!!B.morphAttributes.normal,se=!!B.morphAttributes.color;let ae=Dn;k.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ae=x.toneMapping);const Te=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,$t=Te!==void 0?Te.length:0,Mt=Et.get(k),an=h.state.lights;if(et===!0&&(vt===!0||y!==M)){const ze=y===M&&k.id===S;Q.setState(k,y,ze)}let Zt=!1;k.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==an.state.version||Mt.outputColorSpace!==mt||D.isBatchedMesh&&Mt.batching===!1||!D.isBatchedMesh&&Mt.batching===!0||D.isBatchedMesh&&Mt.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Mt.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Mt.instancing===!1||!D.isInstancedMesh&&Mt.instancing===!0||D.isSkinnedMesh&&Mt.skinning===!1||!D.isSkinnedMesh&&Mt.skinning===!0||D.isInstancedMesh&&Mt.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Mt.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Mt.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Mt.instancingMorph===!1&&D.morphTexture!==null||Mt.envMap!==gt||k.fog===!0&&Mt.fog!==j||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Q.numPlanes||Mt.numIntersection!==Q.numIntersection)||Mt.vertexAlphas!==Pt||Mt.vertexTangents!==Ut||Mt.morphTargets!==_t||Mt.morphNormals!==Kt||Mt.morphColors!==se||Mt.toneMapping!==ae||Mt.morphTargetsCount!==$t)&&(Zt=!0):(Zt=!0,Mt.__version=k.version);let Ge=Mt.currentProgram;Zt===!0&&(Ge=es(k,I,D));let jn=!1,Pe=!1,Li=!1;const oe=Ge.getUniforms(),Ze=Mt.uniforms;if(bt.useProgram(Ge.program)&&(jn=!0,Pe=!0,Li=!0),k.id!==S&&(S=k.id,Pe=!0),jn||M!==y){bt.buffers.depth.getReversed()?(rt.copy(y.projectionMatrix),Rh(rt),Ch(rt),oe.setValue(N,"projectionMatrix",rt)):oe.setValue(N,"projectionMatrix",y.projectionMatrix),oe.setValue(N,"viewMatrix",y.matrixWorldInverse);const xn=oe.map.cameraPosition;xn!==void 0&&xn.setValue(N,It.setFromMatrixPosition(y.matrixWorld)),Gt.logarithmicDepthBuffer&&oe.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&oe.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,Pe=!0,Li=!0)}if(D.isSkinnedMesh){oe.setOptional(N,D,"bindMatrix"),oe.setOptional(N,D,"bindMatrixInverse");const ze=D.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),oe.setValue(N,"boneTexture",ze.boneTexture,b))}D.isBatchedMesh&&(oe.setOptional(N,D,"batchingTexture"),oe.setValue(N,"batchingTexture",D._matricesTexture,b),oe.setOptional(N,D,"batchingIdTexture"),oe.setValue(N,"batchingIdTexture",D._indirectTexture,b),oe.setOptional(N,D,"batchingColorTexture"),D._colorsTexture!==null&&oe.setValue(N,"batchingColorTexture",D._colorsTexture,b));const Ii=B.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&Rt.update(D,B,Ge),(Pe||Mt.receiveShadow!==D.receiveShadow)&&(Mt.receiveShadow=D.receiveShadow,oe.setValue(N,"receiveShadow",D.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Ze.envMap.value=gt,Ze.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&I.environment!==null&&(Ze.envMapIntensity.value=I.environmentIntensity),Pe&&(oe.setValue(N,"toneMappingExposure",x.toneMappingExposure),Mt.needsLights&&gc(Ze,Li),j&&k.fog===!0&&at.refreshFogUniforms(Ze,j),at.refreshMaterialUniforms(Ze,k,H,Z,h.state.transmissionRenderTarget[y.id]),Ds.upload(N,Ya(Mt),Ze,b)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ds.upload(N,Ya(Mt),Ze,b),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&oe.setValue(N,"center",D.center),oe.setValue(N,"modelViewMatrix",D.modelViewMatrix),oe.setValue(N,"normalMatrix",D.normalMatrix),oe.setValue(N,"modelMatrix",D.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const ze=k.uniformsGroups;for(let xn=0,Mn=ze.length;xn<Mn;xn++){const $a=ze[xn];L.update($a,Ge),L.bind($a,Ge)}}return Ge}function gc(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function _c(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(y,I,B){Et.get(y.texture).__webglTexture=I,Et.get(y.depthTexture).__webglTexture=B;const k=Et.get(y);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,I){const B=Et.get(y);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,B=0){C=y,A=I,T=B;let k=!0,D=null,j=!1,lt=!1;if(y){const gt=Et.get(y);if(gt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(N.FRAMEBUFFER,null),k=!1;else if(gt.__webglFramebuffer===void 0)b.setupRenderTarget(y);else if(gt.__hasExternalTextures)b.rebindTextures(y,Et.get(y.texture).__webglTexture,Et.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const _t=y.depthTexture;if(gt.__boundDepthTexture!==_t){if(_t!==null&&Et.has(_t)&&(y.width!==_t.image.width||y.height!==_t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(y)}}const Pt=y.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(lt=!0);const Ut=Et.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ut[I])?D=Ut[I][B]:D=Ut[I],j=!0):y.samples>0&&b.useMultisampledRTT(y)===!1?D=Et.get(y).__webglMultisampledFramebuffer:Array.isArray(Ut)?D=Ut[B]:D=Ut,R.copy(y.viewport),z.copy(y.scissor),O=y.scissorTest}else R.copy(yt).multiplyScalar(H).floor(),z.copy(kt).multiplyScalar(H).floor(),O=ne;if(bt.bindFramebuffer(N.FRAMEBUFFER,D)&&k&&bt.drawBuffers(y,D),bt.viewport(R),bt.scissor(z),bt.setScissorTest(O),j){const gt=Et.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,gt.__webglTexture,B)}else if(lt){const gt=Et.get(y.texture),Pt=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,gt.__webglTexture,B||0,Pt)}S=-1},this.readRenderTargetPixels=function(y,I,B,k,D,j,lt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=Et.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){bt.bindFramebuffer(N.FRAMEBUFFER,mt);try{const gt=y.texture,Pt=gt.format,Ut=gt.type;if(!Gt.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-k&&B>=0&&B<=y.height-D&&N.readPixels(I,B,k,D,Ot.convert(Pt),Ot.convert(Ut),j)}finally{const gt=C!==null?Et.get(C).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(y,I,B,k,D,j,lt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=Et.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&lt!==void 0&&(mt=mt[lt]),mt){const gt=y.texture,Pt=gt.format,Ut=gt.type;if(!Gt.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=y.width-k&&B>=0&&B<=y.height-D){bt.bindFramebuffer(N.FRAMEBUFFER,mt);const _t=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,_t),N.bufferData(N.PIXEL_PACK_BUFFER,j.byteLength,N.STREAM_READ),N.readPixels(I,B,k,D,Ot.convert(Pt),Ot.convert(Ut),0);const Kt=C!==null?Et.get(C).__webglFramebuffer:null;bt.bindFramebuffer(N.FRAMEBUFFER,Kt);const se=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ah(N,se,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,_t),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,j),N.deleteBuffer(_t),N.deleteSync(se),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,I=null,B=0){y.isTexture!==!0&&(Hi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,y=arguments[1]);const k=Math.pow(2,-B),D=Math.floor(y.image.width*k),j=Math.floor(y.image.height*k),lt=I!==null?I.x:0,mt=I!==null?I.y:0;b.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,lt,mt,D,j),bt.unbindTexture()},this.copyTextureToTexture=function(y,I,B=null,k=null,D=0){y.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,y=arguments[1],I=arguments[2],D=arguments[3]||0,B=null);let j,lt,mt,gt,Pt,Ut,_t,Kt,se;const ae=y.isCompressedTexture?y.mipmaps[D]:y.image;B!==null?(j=B.max.x-B.min.x,lt=B.max.y-B.min.y,mt=B.isBox3?B.max.z-B.min.z:1,gt=B.min.x,Pt=B.min.y,Ut=B.isBox3?B.min.z:0):(j=ae.width,lt=ae.height,mt=ae.depth||1,gt=0,Pt=0,Ut=0),k!==null?(_t=k.x,Kt=k.y,se=k.z):(_t=0,Kt=0,se=0);const Te=Ot.convert(I.format),$t=Ot.convert(I.type);let Mt;I.isData3DTexture?(b.setTexture3D(I,0),Mt=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(b.setTexture2DArray(I,0),Mt=N.TEXTURE_2D_ARRAY):(b.setTexture2D(I,0),Mt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);const an=N.getParameter(N.UNPACK_ROW_LENGTH),Zt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ge=N.getParameter(N.UNPACK_SKIP_PIXELS),jn=N.getParameter(N.UNPACK_SKIP_ROWS),Pe=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ae.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ae.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,gt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Pt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ut);const Li=y.isDataArrayTexture||y.isData3DTexture,oe=I.isDataArrayTexture||I.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const Ze=Et.get(y),Ii=Et.get(I),ze=Et.get(Ze.__renderTarget),xn=Et.get(Ii.__renderTarget);bt.bindFramebuffer(N.READ_FRAMEBUFFER,ze.__webglFramebuffer),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let Mn=0;Mn<mt;Mn++)Li&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.get(y).__webglTexture,D,Ut+Mn),y.isDepthTexture?(oe&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.get(I).__webglTexture,D,se+Mn),N.blitFramebuffer(gt,Pt,j,lt,_t,Kt,j,lt,N.DEPTH_BUFFER_BIT,N.NEAREST)):oe?N.copyTexSubImage3D(Mt,D,_t,Kt,se+Mn,gt,Pt,j,lt):N.copyTexSubImage2D(Mt,D,_t,Kt,se+Mn,gt,Pt,j,lt);bt.bindFramebuffer(N.READ_FRAMEBUFFER,null),bt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else oe?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(Mt,D,_t,Kt,se,j,lt,mt,Te,$t,ae.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Mt,D,_t,Kt,se,j,lt,mt,Te,ae.data):N.texSubImage3D(Mt,D,_t,Kt,se,j,lt,mt,Te,$t,ae):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,D,_t,Kt,j,lt,Te,$t,ae.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,D,_t,Kt,ae.width,ae.height,Te,ae.data):N.texSubImage2D(N.TEXTURE_2D,D,_t,Kt,j,lt,Te,$t,ae);N.pixelStorei(N.UNPACK_ROW_LENGTH,an),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Zt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,jn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Pe),D===0&&I.generateMipmaps&&N.generateMipmap(Mt),bt.unbindTexture()},this.copyTextureToTexture3D=function(y,I,B=null,k=null,D=0){return y.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,y=arguments[2],I=arguments[3],D=arguments[4]||0),Hi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,I,B,k,D)},this.initRenderTarget=function(y){Et.get(y).__webglFramebuffer===void 0&&b.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?b.setTextureCube(y,0):y.isData3DTexture?b.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?b.setTexture2DArray(y,0):b.setTexture2D(y,0),bt.unbindTexture()},this.resetState=function(){A=0,T=0,C=null,bt.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}}class Ia{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Bt(t),this.density=e}clone(){return new Ia(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class oc extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class km extends Ee{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Oe,u=Oe,d,m){super(null,a,o,l,c,u,i,r,d,m),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rl extends He{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const pi=new Qt,al=new Qt,ws=[],ol=new Qn,Hm=new Qt,zi=new Ct,Bi=new Ji;class Sr extends Ct{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new rl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Hm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,pi),ol.copy(t.boundingBox).applyMatrix4(pi),this.boundingBox.union(ol)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,pi),Bi.copy(t.boundingSphere).applyMatrix4(pi),this.boundingSphere.union(Bi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(zi.geometry=this.geometry,zi.material=this.material,zi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bi.copy(this.boundingSphere),Bi.applyMatrix4(n),t.ray.intersectsSphere(Bi)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,pi),al.multiplyMatrices(n,pi),zi.matrixWorld=al,zi.raycast(t,ws);for(let a=0,o=ws.length;a<o;a++){const l=ws[a];l.instanceId=r,l.object=this,e.push(l)}ws.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new rl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new km(new Float32Array(i*this.count),i,this.count,ba,tn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Vm extends Ee{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class sn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const u=n[i],m=n[i+1]-u,f=(a-u)/m;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new dt:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],r=[],a=[],o=new P,l=new Qt;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),m=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),m<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(xe(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(xe(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Da extends sn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new dt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),m=l-this.aX,f=c-this.aY;l=m*u-f*d+this.aX,c=m*d+f*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gm extends Da{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ua(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let m=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;m*=u,f*=u,i(a,o,m,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const bs=new P,Er=new Ua,wr=new Ua,br=new Ua;class Wm extends sn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=i[(o-1)%r]:(bs.subVectors(i[0],i[1]).add(i[0]),c=bs);const d=i[o%r],m=i[(o+1)%r];if(this.closed||o+2<r?u=i[(o+2)%r]:(bs.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=bs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(m),f),p=Math.pow(m.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),Er.initNonuniformCatmullRom(c.x,d.x,m.x,u.x,g,_,p),wr.initNonuniformCatmullRom(c.y,d.y,m.y,u.y,g,_,p),br.initNonuniformCatmullRom(c.z,d.z,m.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(Er.initCatmullRom(c.x,d.x,m.x,u.x,this.tension),wr.initCatmullRom(c.y,d.y,m.y,u.y,this.tension),br.initCatmullRom(c.z,d.z,m.z,u.z,this.tension));return n.set(Er.calc(l),wr.calc(l),br.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ll(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Xm(s,t){const e=1-s;return e*e*t}function qm(s,t){return 2*(1-s)*s*t}function Ym(s,t){return s*s*t}function Gi(s,t,e,n){return Xm(s,t)+qm(s,e)+Ym(s,n)}function Km(s,t){const e=1-s;return e*e*e*t}function $m(s,t){const e=1-s;return 3*e*e*s*t}function Zm(s,t){return 3*(1-s)*s*s*t}function Jm(s,t){return s*s*s*t}function Wi(s,t,e,n,i){return Km(s,t)+$m(s,e)+Zm(s,n)+Jm(s,i)}class lc extends sn{constructor(t=new dt,e=new dt,n=new dt,i=new dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new dt){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Wi(t,i.x,r.x,a.x,o.x),Wi(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Qm extends sn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Wi(t,i.x,r.x,a.x,o.x),Wi(t,i.y,r.y,a.y,o.y),Wi(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class cc extends sn{constructor(t=new dt,e=new dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new dt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jm extends sn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hc extends sn{constructor(t=new dt,e=new dt,n=new dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new dt){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Gi(t,i.x,r.x,a.x),Gi(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tg extends sn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Gi(t,i.x,r.x,a.x),Gi(t,i.y,r.y,a.y),Gi(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uc extends sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new dt){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],u=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(ll(o,l.x,c.x,u.x,d.x),ll(o,l.y,c.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new dt().fromArray(i))}return this}}var cl=Object.freeze({__proto__:null,ArcCurve:Gm,CatmullRomCurve3:Wm,CubicBezierCurve:lc,CubicBezierCurve3:Qm,EllipseCurve:Da,LineCurve:cc,LineCurve3:jm,QuadraticBezierCurve:hc,QuadraticBezierCurve3:tg,SplineCurve:uc});class eg extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new cl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new cl[i.type]().fromJSON(i))}return this}}class ng extends eg{constructor(t){super(),this.type="Path",this.currentPoint=new dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new cc(this.currentPoint.clone(),new dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new hc(this.currentPoint.clone(),new dt(t,e),new dt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new lc(this.currentPoint.clone(),new dt(t,e),new dt(n,i),new dt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new uc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Da(t,e,n,i,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Na extends be{constructor(t=[new dt(0,-.5),new dt(.5,0),new dt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=xe(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],u=1/e,d=new P,m=new dt,f=new P,g=new P,_=new P;let p=0,h=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:p=t[E+1].x-t[E].x,h=t[E+1].y-t[E].y,f.x=h*1,f.y=-p,f.z=h*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:p=t[E+1].x-t[E].x,h=t[E+1].y-t[E].y,f.x=h*1,f.y=-p,f.z=h*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let E=0;E<=e;E++){const w=n+E*u*i,x=Math.sin(w),U=Math.cos(w);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*x,d.y=t[A].y,d.z=t[A].x*U,a.push(d.x,d.y,d.z),m.x=E/e,m.y=A/(t.length-1),o.push(m.x,m.y);const T=l[3*A+0]*x,C=l[3*A+1],S=l[3*A+0]*U;c.push(T,C,S)}}for(let E=0;E<e;E++)for(let w=0;w<t.length-1;w++){const x=w+E*t.length,U=x,A=x+t.length,T=x+t.length+1,C=x+1;r.push(U,A,C),r.push(T,C,A)}this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("uv",new ee(o,2)),this.setAttribute("normal",new ee(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.points,t.segments,t.phiStart,t.phiLength)}}class Fs extends Na{constructor(t=1,e=1,n=4,i=8){const r=new ng;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Fs(t.radius,t.length,t.capSegments,t.radialSegments)}}class Oa extends be{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new P,u=new dt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,m=3;d<=e;d++,m+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[m]/t+1)/2,u.y=(a[m+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(o,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class $n extends be{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const u=[],d=[],m=[],f=[];let g=0;const _=[],p=n/2;let h=0;E(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(m,3)),this.setAttribute("uv",new ee(f,2));function E(){const x=new P,U=new P;let A=0;const T=(e-t)/n;for(let C=0;C<=r;C++){const S=[],M=C/r,R=M*(e-t)+t;for(let z=0;z<=i;z++){const O=z/i,G=O*l+o,X=Math.sin(G),W=Math.cos(G);U.x=R*X,U.y=-M*n+p,U.z=R*W,d.push(U.x,U.y,U.z),x.set(X,T,W).normalize(),m.push(x.x,x.y,x.z),f.push(O,1-M),S.push(g++)}_.push(S)}for(let C=0;C<i;C++)for(let S=0;S<r;S++){const M=_[S][C],R=_[S+1][C],z=_[S+1][C+1],O=_[S][C+1];(t>0||S!==0)&&(u.push(M,R,O),A+=3),(e>0||S!==r-1)&&(u.push(R,z,O),A+=3)}c.addGroup(h,A,0),h+=A}function w(x){const U=g,A=new dt,T=new P;let C=0;const S=x===!0?t:e,M=x===!0?1:-1;for(let z=1;z<=i;z++)d.push(0,p*M,0),m.push(0,M,0),f.push(.5,.5),g++;const R=g;for(let z=0;z<=i;z++){const G=z/i*l+o,X=Math.cos(G),W=Math.sin(G);T.x=S*W,T.y=p*M,T.z=S*X,d.push(T.x,T.y,T.z),m.push(0,M,0),A.x=X*.5+.5,A.y=W*.5*M+.5,f.push(A.x,A.y),g++}for(let z=0;z<i;z++){const O=U+z,G=R+z;x===!0?u.push(G,G+1,O):u.push(G+1,G,O),C+=3}c.addGroup(h,C,x===!0?1:2),h+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fa extends $n{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Fa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qn extends be{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],u=[];let d=t;const m=(e-t)/i,f=new P,g=new dt;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const h=r+p/n*a;f.x=d*Math.cos(h),f.y=d*Math.sin(h),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}d+=m}for(let _=0;_<i;_++){const p=_*(n+1);for(let h=0;h<n;h++){const E=h+p,w=E,x=E+n+1,U=E+n+2,A=E+1;o.push(w,x,A),o.push(x,U,A)}}this.setIndex(o),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(c,3)),this.setAttribute("uv",new ee(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Xi extends be{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new P,m=new P,f=[],g=[],_=[],p=[];for(let h=0;h<=n;h++){const E=[],w=h/n;let x=0;h===0&&a===0?x=.5/e:h===n&&l===Math.PI&&(x=-.5/e);for(let U=0;U<=e;U++){const A=U/e;d.x=-t*Math.cos(i+A*r)*Math.sin(a+w*o),d.y=t*Math.cos(a+w*o),d.z=t*Math.sin(i+A*r)*Math.sin(a+w*o),g.push(d.x,d.y,d.z),m.copy(d).normalize(),_.push(m.x,m.y,m.z),p.push(A+x,1-w),E.push(c++)}u.push(E)}for(let h=0;h<n;h++)for(let E=0;E<e;E++){const w=u[h][E+1],x=u[h][E],U=u[h+1][E],A=u[h+1][E+1];(h!==0||a>0)&&f.push(w,x,A),(h!==n-1||l<Math.PI)&&f.push(x,U,A)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(_,3)),this.setAttribute("uv",new ee(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class zs extends be{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],u=new P,d=new P,m=new P;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,p=f/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(_),d.y=(t+e*Math.cos(p))*Math.sin(_),d.z=e*Math.sin(p),o.push(d.x,d.y,d.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),m.subVectors(d,u).normalize(),l.push(m.x,m.y,m.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,h=(i+1)*(f-1)+g,E=(i+1)*f+g;a.push(_,p,E),a.push(p,h,E)}this.setIndex(a),this.setAttribute("position",new ee(o,3)),this.setAttribute("normal",new ee(l,3)),this.setAttribute("uv",new ee(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class _e extends Qi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vl,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class za extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ig extends za{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Tr=new Qt,hl=new P,ul=new P;class dc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pa,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(hl),ul.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ul),e.updateMatrixWorld(),Tr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Tr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sg extends dc{constructor(){super(new Re(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Ns*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class dl extends za{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new sg}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const fl=new Qt,ki=new P,Ar=new P;class rg extends dc{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new dt(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ki.setFromMatrixPosition(t.matrixWorld),n.position.copy(ki),Ar.copy(n.position),Ar.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ar),n.updateMatrixWorld(),i.makeTranslation(-ki.x,-ki.y,-ki.z),fl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fl)}}class pl extends za{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new rg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}const ml=new Qt;class ag{constructor(t,e,n=0,i=1/0){this.ray=new Yl(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ml.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ml),this}intersectObject(t,e=!0,n=[]){return ga(t,this,n,e),n.sort(gl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ga(t[i],this,n,e);return n.sort(gl),n}}function gl(s,t){return s.distance-t.distance}function ga(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ga(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ya}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ya);const _l=`
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,og=`
varying vec2 vUv;
uniform float uVigS;
uniform float uVigR;
uniform float uScan;
uniform float uBeat;
uniform float uDim;
uniform vec3 uTint;
uniform vec2 uRes;
void main(){
  vec2 p = vUv - 0.5;
  p.x *= uRes.x / max(uRes.y, 1.0);
  float d = length(p);
  float v = smoothstep(uVigR, uVigR + 0.42, d) * uVigS;
  float scan = (0.5 + 0.5 * sin(vUv.y * uRes.y * 3.14159265)) * uScan;
  float a = v + scan + uBeat * smoothstep(0.10, 0.72, d) + uDim;
  vec3 col = mix(vec3(0.0), uTint, clamp(uDim * 1.7, 0.0, 1.0));
  gl_FragColor = vec4(col, clamp(a, 0.0, 0.97));
}
`,lg=`
varying vec2 vUv;
uniform float uTime;
uniform float uGrain;
uniform vec2 uRes;
float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
void main(){
  vec2 cell = floor(vUv * uRes * 0.5);
  float n = hash(cell + floor(uTime * 24.0) * 7.31);
  float g = (n - 0.5) * uGrain;
  gl_FragColor = vec4(vec3(1.0), clamp(max(g, 0.0) * 2.6, 0.0, 1.0));
}
`;class cg{constructor(){this.camera=new ec(-1,1,1,-1,0,1),this.scene=new oc,this.geo=new ji(2,2),this.u={uTime:{value:0},uVigS:{value:.4},uVigR:{value:.8},uScan:{value:.035},uBeat:{value:0},uDim:{value:0},uGrain:{value:.06},uTint:{value:new Bt(0,0,0)},uRes:{value:new dt(1280,720)}},this.darkMat=new $e({uniforms:this.u,vertexShader:_l,fragmentShader:og,transparent:!0,depthTest:!1,depthWrite:!1}),this.grainMat=new $e({uniforms:this.u,vertexShader:_l,fragmentShader:lg,transparent:!0,depthTest:!1,depthWrite:!1,blending:mn}),this.dark=new Ct(this.geo,this.darkMat),this.dark.frustumCulled=!1,this.dark.renderOrder=10,this.grain=new Ct(this.geo,this.grainMat),this.grain.frustumCulled=!1,this.grain.renderOrder=11,this.scene.add(this.dark,this.grain)}setSize(t,e){this.u.uRes.value.set(Math.max(t,1),Math.max(e,1))}update(t){this.u.uTime.value=t.t,this.u.uVigS.value=t.vigS,this.u.uVigR.value=t.vigR,this.u.uGrain.value=t.grain,this.u.uScan.value=t.scan,this.u.uBeat.value=t.beat,this.u.uDim.value=t.dim,this.u.uTint.value.copy(t.tint)}render(t){t.render(this.scene,this.camera)}dispose(){this.geo.dispose(),this.darkMat.dispose(),this.grainMat.dispose(),this.scene.remove(this.dark,this.grain)}}const Rr=new P(0,26,11),vl=1.15,hg=4.2,ug=8,dg=.95,fg=34,pg=130,mg=80,xl=263434,Ml=.055,Ts=26,gg=.6,_g=new Bt(1,1,1),yl={patrol:{c:9675704,a:.1},return:{c:9675704,a:.08},suspicious:{c:16757844,a:.16},investigate:{c:16757844,a:.16},listen:{c:16761962,a:.15},search:{c:16747068,a:.13},chase:{c:16728120,a:.16}},vg={west:13227263,east:16767395,maintenance:13627101},xg=`
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Mg=`
varying vec2 vUv;
uniform float uFill;
uniform float uSusp;
void main(){
  vec2 p = vUv - 0.5;
  float ang = atan(p.y, p.x);
  float f = fract((ang + 1.5707963) * 0.15915494);
  float on = step(f, uFill);
  vec3 col = mix(vec3(1.0), vec3(1.0, 0.72, 0.22), smoothstep(0.08, 0.5, uSusp));
  col = mix(col, vec3(1.0, 0.18, 0.10), smoothstep(0.55, 1.0, uSusp));
  float a = max(on * 0.85, 0.12);
  gl_FragColor = vec4(col, a);
}
`;function yg(s){return s=Math.imul(s^61,668265261),s^=s>>>15,s=Math.imul(s,739982445),s^=s>>>12,(s>>>0)/4294967296}function Cr(s){let t=2166136261;const e=String(s);for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)/4294967296}function Gn(s,t,e){return s<t?t:s>e?e:s}function Sg(s){const t=Gn(s,0,1);return t*t*(3-2*t)}function Rn(s,t){return 1-Math.exp(-s*t)}function Sl(s){return s*s*(3-2*s)}function Eg(s){return vg[s]||16769712}function wg(s){return/archive/i.test(`${s&&s.id||""} ${s&&s.wing||""} ${s&&s.n||""}`)}function bg(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.fillStyle="#0b0d11",t.fillRect(0,0,64,64),t.strokeStyle="#181d26",t.lineWidth=2;for(let n=0;n<=64;n+=8)t.beginPath(),t.moveTo(n+.5,0),t.lineTo(n+.5,64),t.stroke(),t.beginPath(),t.moveTo(0,n+.5),t.lineTo(64,n+.5),t.stroke();t.strokeStyle="#232a38",t.lineWidth=1;for(let n=0;n<=64;n+=16)t.beginPath(),t.moveTo(n+.5,0),t.lineTo(n+.5,64),t.stroke(),t.beginPath(),t.moveTo(0,n+.5),t.lineTo(64,n+.5),t.stroke();const e=new Vm(s);return e.wrapS=Yi,e.wrapT=Yi,e.anisotropy=4,"colorSpace"in e&&(e.colorSpace=Ne),e}class Tg{constructor(t,e){if(!t)throw new Error("Renderer requires a canvas element");this.canvas=t,this.disposed=!1,this.time=0,this.dim=0,this._firstCam=!0,this.renderer=new Bm({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setClearColor(xl,1),this.renderer.toneMapping=Ll,this.renderer.toneMappingExposure=2,this.renderer.autoClear=!1,this.scene=new oc,this.scene.fog=new Ia(xl,.022),this.camera=new Re(48,1,.1,240),this.scene.add(new ig(3753566,329226,.12)),this.staticDef=e||{w:0,h:0,tiles:new Uint8Array(0),fixtures:[],objects:[]};const n=this.staticDef;this.originX=-(n.w*zt)/2,this.originZ=-(n.h*zt)/2,this._textures=[],this._lightMap=new Map,this._doorTargets=new Map,this._taken=new Set,this._noiseSeen=new Set,this._noiseQ=[],this._buildFloors(),this._buildWalls(),this._buildFixtures(),this._buildProps(),this._buildPlayer(),this._buildRipples(),this.aiRigs=new Map,this.fx=new cg,this.camPos=new P,this.lookPos=new P,this.player=null,this._ndc=new dt,this._ray=new ag,this._plane=new Pn(new P(0,1,0),0),this._hit=new P,this._c1=new Bt,this._c2=new Bt,this._tint=new Bt,this._m4=new Qt,this._q=new Ci,this._v1=new P,this._s1=new P,this._obj=new ge,this._onResize=()=>this.resize(),typeof window<"u"&&window.addEventListener("resize",this._onResize),this.resize()}_cellCenter(t,e){return[this.originX+(t+.5)*zt,this.originZ+(e+.5)*zt]}_buildFloors(){const t=this.staticDef,e=new Map;for(let r=0;r<t.h;r++)for(let a=0;a<t.w;a++){const o=t.tiles[r*t.w+a];let l=null;if(o===tt.GRATE?l="grate":o===tt.CARPET?l="carpet":(o===tt.FLOOR||o===tt.DOOR)&&(l="concrete"),!l)continue;let c=e.get(l);c||(c={pos:[],nor:[],uv:[],idx:[]},e.set(l,c));const[u,d]=this._cellCenter(a,r),m=u-zt/2,f=u+zt/2,g=d-zt/2,_=d+zt/2,p=c.pos.length/3;c.pos.push(m,0,g,f,0,g,f,0,_,m,0,_),c.nor.push(0,1,0,0,1,0,0,1,0,0,1,0),c.uv.push(0,0,1,0,1,1,0,1),c.idx.push(p,p+2,p+1,p,p+3,p+2)}const n={concrete:new _e({color:1316380,roughness:.95,metalness:0}),carpet:new _e({color:1512730,roughness:1,metalness:0})},i=bg();this._textures.push(i),n.grate=new _e({color:855828,map:i,roughness:.9,metalness:.1});for(const[r,a]of e){const o=new be;o.setAttribute("position",new ee(a.pos,3)),o.setAttribute("normal",new ee(a.nor,3)),o.setAttribute("uv",new ee(a.uv,2)),o.setIndex(a.idx),o.computeBoundingSphere();const l=new Ct(o,n[r]);l.matrixAutoUpdate=!1,this.scene.add(l)}}_buildWalls(){const t=this.staticDef,e=[];for(let a=0;a<t.h;a++)for(let o=0;o<t.w;o++)t.tiles[a*t.w+o]===tt.WALL&&e.push([o,a]);if(!e.length)return;const n=new de(zt,3,zt),i=new _e({color:1448226,roughness:.96,metalness:.04}),r=new Sr(n,i,e.length);for(let a=0;a<e.length;a++){const[o,l]=this._cellCenter(e[a][0],e[a][1]);this._m4.makeTranslation(o,1.5,l),r.setMatrixAt(a,this._m4)}r.instanceMatrix.needsUpdate=!0,typeof r.computeBoundingSphere=="function"?r.computeBoundingSphere():r.frustumCulled=!1,r.matrixAutoUpdate=!1,this.scene.add(r)}_buildFixtures(){const t=Array.isArray(this.staticDef.fixtures)?this.staticDef.fixtures:[];this.fixtures=t.map(r=>({id:r.id,x:r.x,z:r.z,r:r.r||8,color:Eg(r.wingId),seed:Cr(r.id)*100,flicker:yg(Math.floor(Cr(r.id)*1e9))<.35,on:!0,prev:void 0,spark:-1})),this.lightPool=[];for(let r=0;r<ug;r++){const a=new pl(16769712,0,10,2);this.scene.add(a),this.lightPool.push(a)}if(!this.fixtures.length)return;const e=new Oa(.5,20);e.rotateX(-Math.PI/2);const n=new ve({color:16777215});this.discMesh=new Sr(e,n,this.fixtures.length),this.discMesh.frustumCulled=!1;const i=this._c1.set(16777215);for(let r=0;r<this.fixtures.length;r++){const a=this.fixtures[r];this._m4.makeTranslation(a.x,2.45,a.z),this.discMesh.setMatrixAt(r,this._m4),this.discMesh.setColorAt(r,i)}this.scene.add(this.discMesh)}_buildProps(){const t=Array.isArray(this.staticDef.objects)?this.staticDef.objects:[],e={doors:[],lockers:[],bottles:[],seals:[],vessels:[],elevators:[],valves:[],archiveStrips:[],elevatorStrips:[]};this.props=e;const n=new de(zt*.92,2.6,.18),i=new _e({color:2830136,roughness:.6,metalness:.35}),r=new de(zt*.86,.07,.03),a=new de(.95,2.2,.68),o=new de(.9,2.05,.06),l=new $n(.045,.06,.22,6),c=new zs(.34,.08,10,28);c.rotateX(-Math.PI/2);const u=new $n(.3,.36,1.15,14),d=new Xi(.3,12,10),m=new $n(.11,.11,1.5,10);m.rotateZ(Math.PI/2);const f=new zs(.26,.045,8,20);for(const g of t){const _=g.kind,p=Cr(g.id);if(_==="door"){const h=new Ue,E=new Ct(n,i.clone());h.add(E);const w=new Ct(r,new ve({color:16106818}));w.position.set(0,-1.18,.11),E.add(w);const x=Math.round((g.x-this.originX)/zt-.5),U=Math.round((g.z-this.originZ)/zt-.5),T=(R=>R.map(([z,O])=>{const G=x+z,X=U+O;return G>=0&&X>=0&&G<this.staticDef.w&&X<this.staticDef.h?this.staticDef.tiles[X*this.staticDef.w+G]:tt.VOID}))([[0,-1],[0,1],[-1,0],[1,0]]);let C=0,S=0;T[0]===tt.WALL&&T[1]===tt.WALL?S=1:C=1,E.rotation.y=C===1?0:Math.PI/2,h.position.set(g.x,1.3,g.z),this.scene.add(h);const M={id:g.id,slab:E,bx:g.x,by:1.3,bz:g.z,ax:C,az:S,slide:zt*.82,v:0};e.doors.push(M),wg(g)&&e.archiveStrips.push(w)}else if(_==="locker"){const h=new Ue,E=new Ct(a,new _e({color:2304051,roughness:.7,metalness:.3}));E.position.y=1.1,h.add(E);const w=new Ue;w.position.set(-.475,1.1,.36);const x=new Ct(o,new _e({color:2764864,roughness:.55,metalness:.4}));x.position.set(.45,0,0),w.add(x),w.rotation.y=(p<.5?1:-1)*(.45+p*.3),h.add(w);const U=Math.round((g.x-this.originX)/zt-.5),A=Math.round((g.z-this.originZ)/zt-.5),T=this.staticDef.w,C=this.staticDef.h;let S=0,M=1;const R=[[0,-1],[0,1],[-1,0],[1,0]];for(const[z,O]of R){const G=U+z,X=A+O;if(G>=0&&X>=0&&G<T&&X<C&&this.staticDef.tiles[X*T+G]===tt.WALL){S=-z,M=-O;break}}S===0&&M===0&&(M=1),h.rotation.y=Math.atan2(S,M),h.position.set(g.x,0,g.z),this.scene.add(h),e.lockers.push({id:g.id,grp:h})}else if(_==="bottle")e.bottles.push({id:g.id,x:g.x,z:g.z,seed:p});else if(_==="seal"){const h=new Ct(c,new ve({color:15776060}));h.position.set(g.x,.09,g.z),h.rotation.y=p*6.28,this.scene.add(h),e.seals.push({m:h,phase:p*6.28})}else if(_==="vessel"){const h=new Ue,E=new _e({color:1194536,emissive:3080077,emissiveIntensity:.6,roughness:.3,metalness:.1}),w=new Ct(u,E);w.position.y=.58;const x=new Ct(d,E);x.position.y=1.2,x.scale.y=.55,h.add(w,x),h.position.set(g.x,0,g.z),this.scene.add(h),e.vessels.push({grp:h,mat:E,phase:p*6.28})}else if(_==="elevator"){const h=new Ue,E=new _e({color:1711654,roughness:.6,metalness:.5}),w=new Ct(new de(2,.12,2.6),E);w.position.y=.06;const x=new Ct(new de(2,2.3,.12),E);x.position.set(0,1.15,-1.24);const U=new Ct(new de(.12,2.3,2.6),E);U.position.set(-.94,1.15,0);const A=U.clone();A.position.x=.94;const T=new Ct(new de(2,.14,.14),new ve({color:3791242}));T.position.set(0,2.42,-1.24),h.add(w,x,U,A,T),h.position.set(g.x,0,g.z),h.rotation.y=p<.5?0:Math.PI/2,this.scene.add(h),e.elevators.push({grp:h}),e.elevatorStrips.push(T)}else if(_==="breaker"){const h=new Ue,E=new Ct(new de(.62,1.15,.34),new _e({color:1909292,roughness:.7,metalness:.3}));E.position.y=.58;const w=new Ct(new de(.5,.12,.02),new ve({color:5078527}));w.position.set(0,.72,.18),h.add(E,w),h.position.set(g.x,0,g.z),h.rotation.y=p*6.28,this.scene.add(h)}else if(_==="valve"){const h=new Ue,E=new Ct(m,new _e({color:2764602,roughness:.5,metalness:.6}));E.position.y=.7;const w=new Ct(f,new ve({color:3530976}));w.position.set(.8,.7,0),h.add(E,w),h.position.set(g.x,0,g.z),h.rotation.y=p*6.28,this.scene.add(h),e.valves.push({wheel:w})}}if(e.bottles.length){const g=new _e({color:4160095,roughness:.25,metalness:.1,emissive:861211,emissiveIntensity:.4});this.bottleMesh=new Sr(l,g,e.bottles.length*3),this.bottleMesh.instanceMatrix.setUsage(uo),this.bottleMesh.frustumCulled=!1,this.scene.add(this.bottleMesh),this._syncBottles(!0)}}_buildPlayer(){const t=new Ue,e=new _e({color:10134709,roughness:.6,metalness:.12,transparent:!0,opacity:1}),n=new Ct(new Fs(.32,.62,6,14),e);n.position.y=.63;const i=new Ct(new de(.12,.1,.2),new ve({color:6055287}));i.position.set(0,.75,.36);const r=new qn(2.2,2.62,40);r.rotateX(-Math.PI/2);const a=new Ct(r,new ve({color:12571903,transparent:!0,opacity:.07,blending:mn,depthWrite:!1,fog:!1}));a.position.y=.06,a.visible=!1;const o=new dl(16773580,0,16,.42,.5,1.6);o.position.set(0,1.5,0),t.add(n,i,a,o),this.scene.add(t,o.target),this.playerRig={grp:t,body:n,mat:e,halo:a,spot:o,squashY:1,deathT:0}}_buildRipples(){const t=new qn(.9,1,48);t.rotateX(-Math.PI/2),this.ripples=[];for(let e=0;e<14;e++){const n=new ve({color:16765562,transparent:!0,opacity:0,blending:mn,depthWrite:!1,fog:!1}),i=new Ct(t,n);i.position.y=.07,i.visible=!1,i.frustumCulled=!1,this.scene.add(i),this.ripples.push({mesh:i,mat:n,active:!1,t0:0,loud:1})}this._rippleCursor=0}_makeAIRig(t){const e=new Ue,n=[],i=p=>(n.push({m:p,base:p.color.clone()}),p),r={kind:t,group:e,mats:n,phase:Math.random()*6.28,droop:0};if(t==="warden"){const p=i(new _e({color:4015702,roughness:.7,metalness:.25})),h=i(new _e({color:2765120,roughness:.6,metalness:.3})),E=new Ct(new de(.55,1.7,.42),p);E.position.y=.85;const w=new Ct(new de(.3,.28,.3),h);w.position.y=1.86;const x=new Ct(new de(.24,.06,.02),new ve({color:16765562}));x.position.set(0,1.88,.16);const U=new Fa(1,1,20,1,!0);U.translate(0,-.5,0),U.rotateX(-Math.PI/2);const A=new Ct(U,new ve({color:16771504,transparent:!0,opacity:.07,blending:mn,depthWrite:!1,side:ke,fog:!1}));A.scale.set(2.6,7,2.6),A.position.set(0,1.55,.2);const T=new dl(16772546,mg,13,.38,.55,1.7);T.position.set(0,1.55,.1),e.add(E,w,x,A,T,T.target),T.target.position.set(0,0,9),r.body=E,r.beam=A,r.ringY=2.3}else if(t==="listener"){const p=i(new _e({color:13489096,roughness:.92,metalness:0})),h=new Ct(new Fs(.16,1.15,6,12),p);h.position.y=.92;const E=new Ct(new Xi(.17,12,10),p);E.position.y=1.78;const w=new qn(.5,.62,40);w.rotateX(-Math.PI/2);const x=new Ct(w,new ve({color:14673626,transparent:!0,opacity:.4,blending:mn,depthWrite:!1,fog:!1}));x.position.y=.08,x.visible=!1,e.add(h,E,x),r.listenRing=x,r.ringY=1.95}else{const p=i(new _e({color:3356735,roughness:.5,metalness:.6})),h=new Ct(new $n(.55,.72,.22,18),p);h.position.y=1.05;const E=new ve({color:16724e3}),w=new Ct(new Xi(.12,12,10),E);w.position.set(0,1.05,.5),w.scale.set(1,.7,.6);const x=new pl(16721944,20,7,2);x.position.set(0,1.05,.6);const U=new qn(.5,.78,32);U.rotateX(-Math.PI/2);const A=new Ct(U,new ve({color:5908259,transparent:!0,opacity:.25,blending:mn,depthWrite:!1,fog:!1}));A.position.y=.06,e.add(h,w,x,A),r.hull=h,r.eyeMat=E,r.eyeLight=x,r.eyeBase=new Bt(16724e3),r.ringY=1.75}const a=new be,o=new Float32Array((Ts+2)*3),l=new He(o,3);l.setUsage(uo),a.setAttribute("position",l);const c=[];for(let p=0;p<Ts;p++)c.push(0,p+1,p+2);a.setIndex(c);const u=new ve({color:9675704,transparent:!0,opacity:.1,blending:mn,depthWrite:!1,side:ke,fog:!1}),d=new Ct(a,u);d.frustumCulled=!1,d.renderOrder=2,e.add(d);const m=new qn(.36,.5,36),f={uFill:{value:0},uSusp:{value:0}},g=new $e({uniforms:f,vertexShader:xg,fragmentShader:Mg,transparent:!0,depthWrite:!1,side:ke}),_=new Ct(m,g);return _.rotation.x=-Math.PI/2,_.frustumCulled=!1,_.renderOrder=3,_.visible=!1,e.add(_),r.cone=d,r.conePos=l,r.coneMat=u,r.ring=_,r.suspU=f,r.seen=!0,r}resize(){if(this.disposed)return;const t=this.canvas.clientWidth||(typeof window<"u"?window.innerWidth:1280)||1280,e=this.canvas.clientHeight||(typeof window<"u"?window.innerHeight:720)||720;this.renderer.setPixelRatio(Math.min(typeof window<"u"&&window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/Math.max(e,1),this.camera.updateProjectionMatrix(),this.fx.setSize(t,e)}canvasToWorld(t,e){if(this.disposed)return null;const n=this.canvas.getBoundingClientRect();if(n.width<1||n.height<1)return null;this._ndc.set((t-n.left)/n.width*2-1,-((e-n.top)/n.height*2-1)),this._ray.setFromCamera(this._ndc,this.camera);const i=this._ray.ray.intersectPlane(this._plane,this._hit);return i?{x:i.x,z:i.z}:null}update(t,e){if(this.disposed)return;const n=t||{},i=Number.isFinite(e)?Math.max(e,0):.016;this.time=Number.isFinite(n.time)?n.time:this.time+i,this._updatePlayer(n,i),this._updateAIs(n,i),this._updateProps(n,i),this._updateFixtures(n),this._updateNoises(n),this._updateCamera(i),this._updateFX(n,i)}render(){if(this.disposed)return;const t=this.renderer;t.clear(),t.render(this.scene,this.camera),t.clearDepth(),this.fx.render(t)}dispose(){if(!this.disposed){this.disposed=!0,typeof window<"u"&&window.removeEventListener("resize",this._onResize),this._disposeTree(this.scene),this.fx.dispose();for(const t of this._textures)t.dispose();this._textures.length=0,this.renderer.dispose()}}_disposeTree(t){t.traverse(e=>{if(e.geometry&&e.geometry.dispose(),e.material){const n=Array.isArray(e.material)?e.material:[e.material];for(const i of n)i.dispose()}}),t.clear()}_flickerValue(t){if(!t.flicker)return 1;const e=this.time;let n=.78+.14*Math.sin(e*7.3+t.seed*17)+.1*Math.sin(e*13.7+t.seed*31)+.06*Math.sin(e*29.3+t.seed*53);return Math.sin(e*1.9+t.seed*97)+Math.sin(e*.83+t.seed*41)>1.82&&(n*=.1),Gn(n,0,1.3)}_updateFixtures(t){const e=this._lightMap;if(e.clear(),Array.isArray(t.lights))for(const a of t.lights)e.set(a.id,a.on!==!1);const n=this.player?this.player.x:0,i=this.player?this.player.z:0,r=[];for(const a of this.fixtures){const o=e.has(a.id)?e.get(a.id):!0;if(a.prev===void 0&&(a.prev=o),a.prev&&!o&&(a.spark=this.time+.22),a.prev=o,a.on=o,o){const l=a.x-n,c=a.z-i;r.push({f:a,d:l*l+c*c})}}r.sort((a,o)=>a.d-o.d);for(let a=0;a<this.lightPool.length;a++){const o=this.lightPool[a];if(a<r.length){const l=r[a].f;o.position.set(l.x,2.35,l.z),o.color.setHex(l.color),o.distance=l.r,o.intensity=dg*fg*this._flickerValue(l)}else o.intensity=0}if(this.discMesh){const a=this._c1;for(let o=0;o<this.fixtures.length;o++){const l=this.fixtures[o];l.on?a.setHex(l.color).multiplyScalar(.55+.85*this._flickerValue(l)):a.setHex(2303534),this.time<l.spark&&a.lerp(_g,.85),this.discMesh.setColorAt(o,a)}this.discMesh.instanceColor.needsUpdate=!0}}_updatePlayer(t,e){const n=t.player||this.player;if(!n)return;this.player=n;const i=this.playerRig;let r=n.x,a=n.z;const o=!!n.hiddenIn;if(o){const p=this.props.lockers.find(h=>h.id===n.hiddenIn);p&&(r=p.grp.position.x,a=p.grp.position.z)}i.grp.position.set(r,0,a);const l=n.crouched?.58:1;i.squashY+=(l-i.squashY)*Rn(10,e);const c=1+(1-i.squashY)*.28;let u=o?.25:1;n.alive===!1&&(u*=.7),i.mat.opacity+=(u-i.mat.opacity)*Rn(8,e);const d=n.moving&&!o?.03*Math.sin(this.time*10):o?.04*Math.sin(this.time*2):0;i.body.scale.set(c,i.squashY,c),i.body.position.y=.63*i.squashY+.02+(o?.25+d:d);const m=n.alive===!1?1:0;i.deathT+=(m-i.deathT)*Rn(5,e),i.body.rotation.z=1.45*Sl(i.deathT),n.alive===!1?i.mat.color.lerp(this._c2.setHex(6961728),Rn(3,e)):i.mat.color.lerp(this._c2.setHex(10134709),Rn(3,e));const f=Math.cos(n.facing||0),g=Math.sin(n.facing||0);i.grp.rotation.y=Math.atan2(f,g);const _=!!n.flashlight&&!o&&n.alive!==!1;i.spot.intensity+=((_?pg:0)-i.spot.intensity)*Rn(14,e),i.spot.position.set(r,n.crouched?1.1:1.5,a),i.spot.target.position.set(r+f*7,0,a+g*7),i.halo.visible=_,_&&(i.halo.position.set(r,.06,a),i.halo.material.opacity=.05+.03*Math.sin(this.time*3))}_updateAIs(t,e){const n=Array.isArray(t.ais)?t.ais:[];for(const i of this.aiRigs.values())i.seen=!1;for(const i of n){const r=String(i.kind||"warden").toLowerCase();let a=this.aiRigs.get(i.id);(!a||a.kind!==r)&&(a&&(this._disposeTree(a.group),this.scene.remove(a.group)),a=this._makeAIRig(r),this.aiRigs.set(i.id,a),this.scene.add(a.group)),a.seen=!0;const o=String(i.state||"patrol").toLowerCase(),l=o==="disabled"||!!i.disabled,c=i.facing||0,u=Math.cos(c),d=Math.sin(c);a.group.position.set(i.x,0,i.z),a.group.rotation.y=Math.atan2(u,d);const m=this.time;if(a.kind==="warden")a.body.position.y=.85+.03*Math.sin(m*6+a.phase),a.beam.material.opacity=l?0:.06+.02*Math.sin(m*13+a.phase);else if(a.kind==="sentinel"){const p=l?1:0;a.droop+=(p-a.droop)*Rn(6,e);const h=1.05+.08*Math.sin(m*2.2+a.phase);a.hull.position.y=h+(.5-h)*a.droop,a.hull.rotation.x=.5*a.droop,a.eyeMat.color.copy(a.eyeBase).multiplyScalar(1-a.droop*.92),a.eyeLight.intensity=22*(1-a.droop)}for(const p of a.mats)p.m.color.copy(p.base).multiplyScalar(l?.45:1);const f=yl[o]||yl.patrol,g=Number(i.coneRange)||0;if(!f||l||g<=0)a.cone.visible=!1;else{a.cone.visible=!0;const p=(Number(i.coneHalfDeg)||0)*Math.PI/180,h=a.conePos.array;h[0]=i.x,h[1]=Ml,h[2]=i.z;const E=c-p;for(let U=0;U<=Ts;U++){const A=E+U/Ts*2*p,T=(U+1)*3;h[T]=i.x+Math.cos(A)*g,h[T+1]=Ml,h[T+2]=i.z+Math.sin(A)*g}a.conePos.needsUpdate=!0,a.coneMat.color.setHex(f.c);let w=f.a;const x=.5+.5*Math.sin(m*(o==="chase"?9:5)+a.phase);o==="search"?w+=.09*x:o==="chase"&&(w+=.12*x),a.coneMat.opacity=w}const _=Gn(Number(i.suspicion)||0,0,1);if(a.ring.visible=!l&&_>.02,a.ring.visible){a.suspU.uFill.value=_,a.suspU.uSusp.value=_,a.ring.position.y=a.ringY;const p=1+.05*Math.sin(m*4+a.phase);a.ring.scale.set(p,1,p)}if(a.listenRing){const p=o==="listen"&&!l;if(a.listenRing.visible=p,p){const h=(m*1.4+a.phase)%1,E=.8+h*1.4;a.listenRing.scale.set(E,1,E),a.listenRing.material.opacity=(1-h)*.5}}}for(const[i,r]of this.aiRigs)r.seen||(this._disposeTree(r.group),this.scene.remove(r.group),this.aiRigs.delete(i))}_updateProps(t,e){const n=this.props;if(Array.isArray(t.doors)){this._doorTargets.clear();for(const a of t.doors)this._doorTargets.set(a.id,!!a.open)}for(const a of n.doors){const o=this._doorTargets.has(a.id)&&this._doorTargets.get(a.id)?1:0;a.v+=(o-a.v)*Math.min(1,e*5.5);const l=Sl(Gn(a.v,0,1))*a.slide;a.slab.position.set(a.bx+a.ax*l,a.by,a.bz+a.az*l)}const i=t.unlockedArchive!==!0;for(const a of n.archiveStrips)a.visible=i;const r=t.unlockedElevator!==!0;for(const a of n.elevatorStrips)a.visible=r;this.bottleMesh&&this._syncBottles(!1,t);for(const a of n.seals){const o=.8+.35*Math.sin(this.time*3.1+a.phase);a.m.material.color.setHex(15776060).multiplyScalar(o);const l=1+.07*Math.sin(this.time*3.1+a.phase);a.m.scale.set(l,1,l)}for(const a of n.vessels)a.mat.emissiveIntensity=.45+.35*Math.sin(this.time*2.2+a.phase);for(const a of n.valves)a.wheel.rotation.x+=e*.8}_syncBottles(t,e){if(e&&Array.isArray(e.takenIds)){this._taken.clear();for(const r of e.takenIds)this._taken.add(String(r))}else t&&this._taken.clear();const n=this.props.bottles,i=this._obj;for(let r=0;r<n.length;r++){const a=n[r],o=this._taken.has(String(a.id));for(let l=0;l<3;l++){const c=r*3+l;if(o)i.position.set(0,-10,0),i.scale.setScalar(1e-4);else{const u=a.seed*6.28+l*2.1;i.position.set(a.x+Math.cos(u)*.1,.11,a.z+Math.sin(u)*.1),i.rotation.set(a.seed*3+l,u,l*.7),i.scale.setScalar(1)}i.updateMatrix(),this.bottleMesh.setMatrixAt(c,i.matrix)}}this.bottleMesh.instanceMatrix.needsUpdate=!0}_updateNoises(t){const e=Array.isArray(t.noises)?t.noises:[];for(const n of e){if(n==null||!Number.isFinite(n.x)||!Number.isFinite(n.z)||this._noiseSeen.has(n.id))continue;for(this._noiseSeen.add(n.id),this._noiseQ.push(n.id);this._noiseQ.length>64;){const a=this._noiseQ.shift();this._noiseSeen.delete(a)}const i=this.ripples[this._rippleCursor];this._rippleCursor=(this._rippleCursor+1)%this.ripples.length,i.active=!0,i.id=n.id,i.t0=Number.isFinite(n.t0)?n.t0:this.time,i.loud=Math.max(Number(n.loud)||.2,.05);const r=String(n.type||"");i.mat.color.setHex(r==="glass"||r==="bottle"?13625087:r==="throwWhistle"?11451647:16765562),i.mesh.position.set(n.x,.07,n.z)}for(const n of this.ripples){if(!n.active)continue;const i=(this.time-n.t0)/gg;if(i<0||i>1){i>1&&(n.active=!1,n.mesh.visible=!1);continue}n.mesh.visible=!0;const r=.4+n.loud*10*i;n.mesh.scale.set(r,1,r),n.mat.opacity=(1-i)*Gn(.22+.3*n.loud,.2,.55)}}_updateCamera(t){const e=this.player;if(!e)return;const n=Math.cos(e.facing||0),i=Math.sin(e.facing||0),r=e.x+n*vl,a=e.z+i*vl,o=r+Rr.x,l=Rr.y,c=a+Rr.z;if(this._firstCam)this.camPos.set(o,l,c),this.lookPos.set(r,0,a),this._firstCam=!1;else{const u=Rn(hg,t);this.camPos.x+=(o-this.camPos.x)*u,this.camPos.y+=(l-this.camPos.y)*u,this.camPos.z+=(c-this.camPos.z)*u,this.lookPos.x+=(r-this.lookPos.x)*u,this.lookPos.z+=(a-this.lookPos.z)*u}this.camera.position.copy(this.camPos),this.camera.lookAt(this.lookPos.x,0,this.lookPos.z)}_updateFX(t,e){const n=Gn(Number(t.threatLevel)||0,0,1),i=Number.isFinite(t.pulse)?Gn(t.pulse,0,1):.5+.5*Math.sin(this.time*Math.PI*2*1.2),r=Sg((n-.6)/.28),a=i*r*.3,o=Math.pow(n,1.5),l=t.won||t.lost?.62:0;this.dim+=(l-this.dim)*Math.min(1,e*2.2),t.lost?this._tint.setRGB(.3,.03,.06):t.won?this._tint.setRGB(.04,.09,.16):this._tint.setRGB(0,0,0);const c=t.chaseActive?.06+.06*i:0;this.fx.update({t:this.time,vigS:.42+.55*o+c,vigR:.8-.38*o,grain:.05+.2*n,scan:.035,beat:a,dim:this.dim,tint:this._tint})}}const fn=(s,t,e)=>s<t?t:s>e?e:s,mi=(s,t)=>s+Math.random()*(t-s);class Ag{constructor(t){this._offs=[],this._ctx=null,this._master=null,this._white=null,this._brown=null,this._bed=null,this._shimmer=null,this._hum=null,this._steams=new Map,this._volume=.85,this._muted=!1,this._px=0,this._pz=0,this._threat=0,this._chase=!1,this._blackout=!1,this._listenerNear=0,this._sentinelNear=0,this._caught=!1,this._beatAt=0,this._tickAt=0,this._lastLog=-1;const e=(n,i)=>this._offs.push(t.on(n,r=>{try{i(r||{})}catch{}}));e("noise",n=>this._onNoise(n)),e("alert",n=>this._onAlert(n)),e("incident",n=>this._logTick(n)),e("breaker",n=>this._onBreaker(n)),e("steam",n=>this._onSteam(n)),e("lightSmashed",n=>this._glass(n.x,n.z,1)),e("pickup",n=>this._pickup(n.kind)),e("sealTaken",()=>this._sealToll()),e("playerCaught",()=>this._caughtSting()),e("gameWon",()=>this._winChord()),e("gameLost",()=>{this._caught||this._loseFall()}),e("checkpoint",()=>this._blip())}arm(){if(typeof window>"u")return!1;try{if(!this._ctx){const t=window.AudioContext||window.webkitAudioContext;if(!t)return!1;this._ctx=new t,this._build()}return this._ctx.state==="suspended"&&this._ctx.resume().catch(()=>{}),!0}catch{return!1}}update(t,e){if(!t)return;this._threat=fn(+t.threatLevel||0,0,1),this._chase=!!(t.chaseActive||t.chase),this._blackout=!!t.blackout,this._listenerNear=fn(+t.listenerNear||0,0,1),this._sentinelNear=fn(+t.sentinelNear||0,0,1);const n=t.player;n&&(this._px=+n.x||0,this._pz=+n.z||0);const i=this._ctx;if(!i||i.state!=="running")return;const r=i.currentTime;this._updateBed(r),this._updateShimmer(r),this._updateHeart(r),this._updateTicks(r),this._updateHum(r)}toggleMute(){return this._muted=!this._muted,this._master&&this._ctx&&(this._master.gain.cancelScheduledValues(this._ctx.currentTime),this._master.gain.setTargetAtTime(this._muted?1e-4:this._volume,this._ctx.currentTime,.03)),this._muted}setMaster(t){this._master&&this._ctx&&this._master.gain.setTargetAtTime(this._muted?1e-4:this._volume,this._ctx.currentTime,.03),this._volume=Math.max(0,Math.min(1.5,t))}clearCaught(){this._caught=!1,this._master&&this._ctx&&(this._master.gain.cancelScheduledValues(this._ctx.currentTime),this._master.gain.setTargetAtTime(this._muted?1e-4:this._volume,this._ctx.currentTime,.05))}dispose(){for(const t of this._offs)try{t()}catch{}if(this._offs.length=0,this._ctx){for(const[,t]of this._steams)try{t.s.stop()}catch{}this._steams.clear();try{this._ctx.close()}catch{}}this._ctx=null,this._master=null,this._bed=null,this._shimmer=null,this._hum=null,this._white=null,this._brown=null}_build(){const t=this._ctx,e=Math.floor(t.sampleRate*2);this._white=t.createBuffer(1,e,t.sampleRate);const n=this._white.getChannelData(0);for(let w=0;w<e;w++)n[w]=Math.random()*2-1;this._brown=t.createBuffer(1,e,t.sampleRate);const i=this._brown.getChannelData(0);let r=0;for(let w=0;w<e;w++)r=(r+.02*n[w])/1.02,i[w]=r*3.2;this._master=t.createGain(),this._master.gain.value=this._muted?1e-4:this._volume;const a=t.createDynamicsCompressor();a.threshold.value=-12,a.knee.value=8,a.ratio.value=14,a.attack.value=.002,a.release.value=.24,this._master.connect(a),a.connect(t.destination);const o=t.currentTime,l=t.createOscillator();l.type="sine",l.frequency.value=55;const c=t.createOscillator();c.type="sine",c.frequency.value=57.2;const u=t.createBiquadFilter();u.type="lowpass",u.frequency.value=240,u.Q.value=.7;const d=t.createGain();d.gain.value=1e-4,d.gain.setTargetAtTime(.05,o,1.6),l.connect(u),c.connect(u),u.connect(d),d.connect(this._master);const m=t.createOscillator();m.type="sine",m.frequency.value=.06;const f=t.createGain();f.gain.value=.018,m.connect(f),f.connect(d.gain);const g=t.createBufferSource();g.buffer=this._brown,g.loop=!0;const _=t.createBiquadFilter();_.type="bandpass",_.frequency.value=520,_.Q.value=.4;const p=t.createGain();p.gain.value=1e-4,p.gain.setTargetAtTime(.013,o,2.2),g.connect(_),_.connect(p),p.connect(this._master);const h=t.createOscillator();h.type="sine",h.frequency.value=.045;const E=t.createGain();E.gain.value=.005,h.connect(E),E.connect(p.gain),l.start(),c.start(),m.start(),g.start(),h.start(),this._bed={bedLP:u,bedG:d,hissG:p}}_updateBed(t){this._bed&&(this._bed.bedLP.frequency.setTargetAtTime(this._blackout?105:240,t,.5),this._bed.hissG.gain.setTargetAtTime(this._blackout?.006:.013,t,.6))}_buildShimmer(){const t=this._ctx,e=t.createOscillator();e.type="sine",e.frequency.value=880;const n=t.createOscillator();n.type="sine",n.frequency.value=932.3;const i=t.createOscillator();i.type="sine",i.frequency.value=.09;const r=t.createGain();r.gain.value=7,i.connect(r),r.connect(n.detune);const a=t.createOscillator();a.type="sine",a.frequency.value=.13;const o=t.createGain();o.gain.value=.012;const l=t.createGain();return l.gain.value=1e-4,e.connect(l),n.connect(l),a.connect(o),o.connect(l.gain),l.connect(this._master),e.start(),n.start(),i.start(),a.start(),{o1:e,o2:n,g:l}}_updateShimmer(t){if(this._threat<=.001||this._caught){this._shimmer&&this._shimmer.g.gain.setTargetAtTime(1e-4,t,.4);return}this._shimmer||(this._shimmer=this._buildShimmer()),this._shimmer.g.gain.setTargetAtTime(.055*this._threat*this._threat,t,.3)}_thump(t,e){const n=this._ctx,i=n.createOscillator();i.type="sine",i.frequency.setValueAtTime(120,t),i.frequency.exponentialRampToValueAtTime(40,t+.13);const r=n.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(e,t+.006),r.gain.exponentialRampToValueAtTime(1e-4,t+.17),i.connect(r),r.connect(this._master),i.start(t),i.stop(t+.2)}_updateHeart(t){if(this._caught||this._threat<.15){this._beatAt=t+.2;return}const e=1/(.25+1.15*this._threat);this._beatAt<t&&(this._beatAt=t+.05);const n=.05+.21*this._threat;for(;this._beatAt<t+.12;)this._thump(this._beatAt,n),this._thump(this._beatAt+e*.32,n*.72),this._beatAt+=e}_buildHum(){const t=this._ctx,e=t.createOscillator();e.type="sawtooth",e.frequency.value=64.6;const n=t.createOscillator();n.type="sawtooth",n.frequency.value=65.5;const i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=380,i.Q.value=1.1;const r=t.createGain();r.gain.value=.55;const a=t.createOscillator();a.type="sine",a.frequency.value=5.1;const o=t.createGain();o.gain.value=.32,a.connect(o),o.connect(r.gain);const l=t.createGain();return l.gain.value=1e-4,e.connect(i),n.connect(i),i.connect(r),r.connect(l),l.connect(this._master),e.start(),n.start(),a.start(),{o1:e,o2:n,g:l}}_updateHum(t){if(this._sentinelNear<=.001||this._caught){this._hum&&this._hum.g.gain.setTargetAtTime(1e-4,t,.25);return}this._hum||(this._hum=this._buildHum()),this._hum.g.gain.setTargetAtTime(.075*this._sentinelNear,t,.15)}_updateTicks(t){if(this._caught||this._listenerNear<=.02){this._tickAt=Math.max(this._tickAt,t+.1);return}if(t<this._tickAt)return;const e=this._listenerNear;this._noiseHit({at:t,f:2600,q:9,gain:.006+.05*e*e,dur:.03,pan:mi(-.4,.4)}),this._tickAt=t+mi(.06,.42)*(1.25-e)}_spatial(t,e){if(typeof t!="number"||typeof e!="number")return{pan:0,att:1};const n=t-this._px,i=e-this._pz,r=Math.sqrt(n*n+i*i);return{pan:fn(n*.13,-.85,.85),att:1/(1+r*.16)}}_tone({at:t,type:e="sine",f0:n,f1:i=0,fDur:r=0,gain:a,dur:o,pan:l=0,lp:c=0,attack:u=.008}){const d=this._ctx;if(!d)return;const m=t??d.currentTime,f=d.createOscillator();f.type=e,f.frequency.setValueAtTime(Math.max(1,n),m),i>0&&f.frequency.exponentialRampToValueAtTime(Math.max(1,i),m+(r||o));const g=d.createGain();g.gain.setValueAtTime(1e-4,m),g.gain.linearRampToValueAtTime(Math.max(1e-4,a),m+Math.min(u,o*.5)),g.gain.exponentialRampToValueAtTime(1e-4,m+o);let _=f;if(c>0){const h=d.createBiquadFilter();h.type="lowpass",h.frequency.value=c,f.connect(h),_=h}const p=d.createStereoPanner();p.pan.value=l,_.connect(g),g.connect(p),p.connect(this._master),f.start(m),f.stop(m+o+.06)}_noiseHit({at:t,f:e=1e3,q:n=1,type:i="bandpass",gain:r,dur:a,pan:o=0,sweepTo:l=0,attack:c=.004,brown:u=!1}){const d=this._ctx;if(!d)return;const m=t??d.currentTime,f=d.createBufferSource();f.buffer=u?this._brown:this._white,f.loop=!0;const g=d.createBiquadFilter();g.type=i,g.Q.value=n,g.frequency.setValueAtTime(e,m),l>0&&g.frequency.exponentialRampToValueAtTime(l,m+a);const _=d.createGain();_.gain.setValueAtTime(1e-4,m),_.gain.linearRampToValueAtTime(Math.max(1e-4,r),m+Math.min(c,a*.5)),_.gain.exponentialRampToValueAtTime(1e-4,m+a);const p=d.createStereoPanner();p.pan.value=o,f.connect(g),g.connect(_),_.connect(p),p.connect(this._master),f.start(m),f.stop(m+a+.05)}_onNoise(t){if(this._ctx)switch(t.type){case"footstep":this._footstep(t);break;case"door":this._door(t);break;case"glass":this._glass(t.x,t.z,fn(+t.loud||1,0,2));break;case"bottle":this._bottle(t);break;case"locker":this._locker(t);break;case"throw":this._whoosh(t);break;case"steam":this._valveHiss(t);break}}_footstep(t){const{pan:e,att:n}=this._spatial(t.x,t.z),i=fn(+t.loud||.5,0,2),r=typeof t.surface=="string"?t.surface:"concrete",a=this._ctx.currentTime;r==="grate"?(this._noiseHit({at:a,f:1750,q:7,gain:.09*i*n,dur:.16,pan:e}),this._tone({at:a+.005,f0:1240,gain:.02*i*n,dur:.12,pan:e,lp:4e3})):r==="carpet"?this._noiseHit({at:a,f:240,q:.9,type:"lowpass",gain:.1*i*n,dur:.08,pan:e}):r==="doorway"?(this._noiseHit({at:a,f:700,q:2.2,gain:.07*i*n,dur:.09,pan:e}),this._tone({at:a,f0:130,f1:70,fDur:.07,gain:.05*i*n,dur:.09,pan:e})):(this._noiseHit({at:a,f:480,q:1.3,gain:.08*i*n,dur:.07,pan:e}),this._tone({at:a,f0:96,f1:52,fDur:.06,gain:.05*i*n,dur:.08,pan:e}))}_door(t){const e=this._ctx,{pan:n,att:i}=this._spatial(t.x,t.z),r=e.currentTime,a=e.createOscillator();a.type="sawtooth",a.frequency.setValueAtTime(84,r),a.frequency.linearRampToValueAtTime(138,r+.42);const o=e.createOscillator();o.type="sine",o.frequency.value=7.7;const l=e.createGain();l.gain.value=9,o.connect(l),l.connect(a.frequency);const c=e.createBiquadFilter();c.type="bandpass",c.frequency.value=520,c.Q.value=4.5;const u=e.createGain();u.gain.setValueAtTime(1e-4,r),u.gain.linearRampToValueAtTime(.055*i,r+.08),u.gain.setValueAtTime(.055*i,r+.34),u.gain.exponentialRampToValueAtTime(1e-4,r+.46);const d=e.createStereoPanner();d.pan.value=n,a.connect(c),c.connect(u),u.connect(d),d.connect(this._master),a.start(r),o.start(r),a.stop(r+.5),o.stop(r+.5),this._noiseHit({at:r+.44,f:1900,q:5,gain:.05*i,dur:.035,pan:n})}_glass(t,e,n){const{pan:i,att:r}=this._spatial(t,e),a=this._ctx.currentTime,o=fn(n,.2,2)*r;this._noiseHit({at:a,f:3400,q:.8,type:"highpass",gain:.16*o,dur:.28,pan:i}),this._noiseHit({at:a,f:900,q:1,gain:.09*o,dur:.12,pan:i});for(let l=0;l<6;l++)this._tone({at:a+.01+l*.028+Math.random()*.02,type:"triangle",f0:mi(1900,5600),gain:.028*o*(1-l*.13),dur:mi(.1,.3),pan:fn(i+mi(-.12,.12),-1,1),lp:7e3})}_bottle(t){const{pan:e,att:n}=this._spatial(t.x,t.z),i=fn(+t.loud||1.5,0,2)*n,r=this._ctx.currentTime;this._tone({at:r,f0:2450,gain:.05*i,dur:.09,pan:e,lp:6e3}),this._noiseHit({at:r+.02,f:2100,q:.9,gain:.12*i,dur:.2,pan:e});for(let a=0;a<3;a++)this._tone({at:r+.05+a*.05,type:"triangle",f0:mi(1200,3100),gain:.03*i,dur:.12,pan:e,lp:5500});this._noiseHit({at:r+.03,f:500,q:1,gain:.06*i,dur:.1,pan:e})}_locker(t){const{pan:e,att:n}=this._spatial(t.x,t.z),i=this._ctx.currentTime;this._tone({at:i,f0:185,f1:62,fDur:.1,gain:.11*n,dur:.16,pan:e}),this._noiseHit({at:i,f:430,q:2.4,gain:.07*n,dur:.11,pan:e}),this._tone({at:i+.06,f0:1180,gain:.016*n,dur:.14,pan:e,lp:5e3})}_whoosh(t){const{pan:e,att:n}=this._spatial(t.x,t.z);this._noiseHit({at:this._ctx.currentTime,f:320,q:1.6,gain:.085*n,dur:.36,pan:e,sweepTo:2300,attack:.12})}_valveHiss(t){const{pan:e,att:n}=this._spatial(t.x,t.z);this._noiseHit({at:this._ctx.currentTime,f:3700,q:.8,gain:.045*n,dur:.3,pan:e,attack:.05})}_onAlert(t){if(!this._ctx)return;const e=this._ctx.currentTime;t.kind==="chase"?(this._tone({at:e,type:"sawtooth",f0:175,f1:740,fDur:.26,gain:.075,dur:.26,lp:1500}),this._tone({at:e+.26,f0:150,f1:46,fDur:.3,gain:.2,dur:.42}),this._noiseHit({at:e+.26,f:2400,q:1,gain:.14,dur:.28}),this._tone({at:e+.26,type:"square",f0:622.25,gain:.03,dur:.18,lp:2400})):t.kind==="lost"&&(this._tone({at:e,f0:98,gain:.05,dur:1.6,lp:480,attack:.35}),this._tone({at:e+.05,f0:146.83,gain:.032,dur:1.4,lp:520,attack:.4}))}_onBreaker(t){if(!this._ctx)return;const e=this._ctx.currentTime;t.on?(this._tone({at:e,type:"sawtooth",f0:46,f1:168,fDur:.68,gain:.07,dur:.72,lp:1200}),this._tone({at:e+.04,type:"triangle",f0:92,f1:336,fDur:.64,gain:.028,dur:.68,lp:1600}),this._noiseHit({at:e+.66,f:1400,q:4,gain:.05,dur:.05})):(this._tone({at:e,type:"sawtooth",f0:215,f1:27,fDur:.85,gain:.09,dur:.9,lp:850}),this._tone({at:e+.82,f0:128,f1:41,fDur:.18,gain:.13,dur:.26}),this._noiseHit({at:e+.02,f:900,q:3,gain:.05,dur:.06}))}_onSteam(t){const e=this._ctx;if(!e)return;const n=t.id!=null?t.id:0,i=this._steams.get(n);if(t.on&&!i){const r=e.createBufferSource();r.buffer=this._white,r.loop=!0;const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=2950,a.Q.value=.65;const o=e.createGain();o.gain.value=1e-4;const{pan:l,att:c}=this._spatial(t.x,t.z);o.gain.setTargetAtTime(.05*c,e.currentTime,.25);const u=e.createStereoPanner();u.pan.value=l,r.connect(a),a.connect(o),o.connect(u),u.connect(this._master),r.start(),this._steams.set(n,{s:r,g:o})}else if(!t.on&&i){i.g.gain.cancelScheduledValues(e.currentTime),i.g.gain.setTargetAtTime(1e-4,e.currentTime,.15);try{i.s.stop(e.currentTime+.6)}catch{}this._steams.delete(n)}}_pickup(t){const e=this._ctx.currentTime,n=t==="vessel"?392:t==="seal"?440:523.25;this._tone({at:e,f0:n,gain:.042,dur:.6,lp:3e3}),this._tone({at:e+.015,f0:n*1.1892,gain:.034,dur:.55,lp:3200}),t!=="bottle"&&this._tone({at:e+.02,f0:98,gain:.03,dur:.7,lp:400})}_sealToll(){const t=this._ctx.currentTime;this._tone({at:t,f0:77.8,gain:.12,dur:2.3,lp:650}),this._tone({at:t,f0:156.1,gain:.05,dur:1.7,lp:800}),this._tone({at:t+.01,f0:234.2,gain:.026,dur:1.2,lp:900}),this._noiseHit({at:t,f:300,q:.8,type:"lowpass",gain:.07,dur:.08})}_caughtSting(){const t=this._ctx;if(!t||this._caught)return;this._caught=!0;const e=t.currentTime,n=[106,112.6,159.4];for(let r=0;r<n.length;r++)this._tone({at:e,type:"sawtooth",f0:n[r],f1:n[r]*.94,fDur:1.1,gain:.105,dur:1.25,lp:1700});this._noiseHit({at:e,f:750,q:.7,type:"highpass",gain:.17,dur:.5}),this._tone({at:e,f0:62,f1:29,fDur:.8,gain:.2,dur:1});for(const[,r]of this._steams)try{r.s.stop(e+.4)}catch{}this._steams.clear();const i=this._master.gain;i.cancelScheduledValues(e+.8),i.setValueAtTime(i.value,e+.8),i.linearRampToValueAtTime(1e-4,e+2.4)}_winChord(){const t=this._ctx;if(!t)return;const e=t.currentTime,n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=1400;const i=t.createStereoPanner();n.connect(i),i.connect(this._master);const r=[110,220,277.18,329.63,440];for(let a=0;a<r.length;a++){const o=t.createOscillator();o.type="sine",o.frequency.value=r[a];const l=t.createGain(),c=a===0?.05:.042;l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(c,e+.5),l.gain.setValueAtTime(c,e+1.8),l.gain.exponentialRampToValueAtTime(1e-4,e+4.2),o.connect(l),l.connect(n),o.start(e),o.stop(e+4.4)}}_loseFall(){const t=this._ctx.currentTime;this._tone({at:t,type:"triangle",f0:196,f1:49,fDur:1.5,gain:.075,dur:1.7,lp:700}),this._tone({at:t+.1,f0:65.4,gain:.05,dur:2.2,lp:300,attack:.3}),this._noiseHit({at:t,f:220,q:.8,type:"lowpass",gain:.06,dur:.5})}_blip(){this._tone({at:this._ctx.currentTime,f0:587.33,f1:880,fDur:.07,gain:.024,dur:.12,lp:4e3})}_logTick(t){const e=this._ctx;if(!e||e.state!=="running")return;const n=e.currentTime;if(n-this._lastLog<.18)return;this._lastLog=n;const{pan:i,att:r}=this._spatial(t.x,t.z);this._noiseHit({at:n,f:3300,q:7,gain:.014*r,dur:.024,pan:i})}}const El="nw-style",Rg=`
.nw-hud{position:absolute;inset:0;pointer-events:none;z-index:5;font-family:ui-monospace,'Cascadia Mono',Consolas,Menlo,monospace;color:#b6bcc8;user-select:none}
.nw-frame{position:absolute;inset:0;box-shadow:inset 0 0 0 2px rgba(214,69,69,.85),inset 0 0 46px rgba(214,69,69,.35);opacity:0}
.nw-flashfx{position:absolute;inset:0;background:#6d1111;opacity:0}
.nw-flashfx.go{animation:nw-flash-a .55s ease-out both}
@keyframes nw-flash-a{0%{opacity:.5}100%{opacity:0}}
.nw-corner{position:absolute;top:14px;left:16px;display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.2em;color:#6d7482}
.nw-pip{width:9px;height:9px;transform:rotate(45deg);border:1px solid #2a2f3a;background:transparent}
.nw-pip.fill{background:#b6bcc8;border-color:#b6bcc8}
.nw-vessel{color:#e6e9f0;display:none}
.nw-vessel.on{display:inline}
.nw-prompt{position:absolute;left:50%;bottom:58px;transform:translateX(-50%);background:#0b0d12ee;border:1px solid #2a2f3a;padding:7px 15px;font-size:12px;letter-spacing:.08em;display:none;white-space:nowrap}
.nw-prompt.on{display:block}
.nw-toast{position:absolute;left:50%;top:62px;transform:translateX(-50%);background:#0b0d12ee;border:1px solid #2a2f3a;border-left:2px solid #d9a441;padding:8px 18px;font-size:12px;letter-spacing:.14em;color:#d9a441;opacity:0;white-space:nowrap}
.nw-toast.go{animation:nw-toast-a 4s ease both}
@keyframes nw-toast-a{0%{opacity:0;transform:translateX(-50%) translateY(-8px)}8%{opacity:1;transform:translateX(-50%) translateY(0)}78%{opacity:1}100%{opacity:0}}
.nw-bottles{position:absolute;left:16px;bottom:16px;display:flex;gap:6px}
.nw-bdot{width:7px;height:7px;border-radius:50%;border:1px solid #2a2f3a;background:#8b93a3}
.nw-menus{position:absolute;inset:0;z-index:10;pointer-events:none;font-family:ui-monospace,'Cascadia Mono',Consolas,Menlo,monospace;color:#b6bcc8;user-select:none}
.nw-view{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(4,5,9,.84);pointer-events:auto}
.nw-view.on{display:flex}
.nw-panel{width:min(560px,92vw);max-height:88vh;overflow:auto;background:#0b0d12ee;border:1px solid #2a2f3a;padding:26px 30px}
.nw-off{display:none!important}
.nw-kicker{font-size:11px;letter-spacing:.3em;color:#6d7482;margin-bottom:10px}
.nw-title{margin:0;font-size:28px;font-weight:600;letter-spacing:.34em;color:#e6e9f0}
.nw-sub{margin:8px 0 0;font-size:12px;letter-spacing:.1em;color:#6d7482}
.nw-rule{height:1px;background:#2a2f3a;margin:18px 0}
.nw-table{border-collapse:collapse;font-size:12px}
.nw-table td{padding:3px 16px 3px 0}
.nw-key{color:#e6e9f0;letter-spacing:.08em;white-space:nowrap}
.nw-desc{color:#6d7482}
.nw-btn{display:block;width:100%;box-sizing:border-box;margin-top:10px;padding:9px 14px;background:transparent;border:1px solid #2a2f3a;color:#b6bcc8;font:inherit;font-size:12px;letter-spacing:.14em;text-align:left;cursor:pointer}
.nw-btn:hover{border-color:#59627a;color:#e6e9f0}
.nw-btn.primary{border-color:#3a4152;color:#e6e9f0;text-align:center}
.nw-btn.primary:hover{border-color:#59627a;background:#10131b}
.nw-log{height:320px;overflow-y:auto;border:1px solid #2a2f3a;background:#07090e;padding:10px 12px;font-size:12px;line-height:1.6}
.nw-logrow .t{color:#565d6b}
.nw-logrow .w{color:#b6bcc8}
.nw-logrow .d{color:#6d7482}
.nw-logrow.warn .w,.nw-logrow.warn .d{color:#d9a441}
.nw-logrow.bad .w,.nw-logrow.bad .d{color:#e05252}
.nw-empty{color:#565d6b}
.nw-stats{font-size:13px;line-height:2.1}
.nw-stats .k{display:inline-block;width:190px;color:#6d7482;letter-spacing:.1em}
.nw-stats .v{color:#e6e9f0}
.nw-deathtitle{margin:0;font-size:38px;font-weight:600;letter-spacing:.4em;color:#e05252}
.nw-wintitle{margin:0;font-size:32px;font-weight:600;letter-spacing:.4em;color:#e6e9f0}
`;function Cg(){if(document.getElementById(El))return;const s=document.createElement("style");s.id=El,s.textContent=Rg,document.head.appendChild(s)}function Je(s,t,e){const n=document.createElement(s);return t&&(n.className=t),e!=null&&(n.textContent=e),n}class Pg{constructor(t,e){Cg(),this.bus=e,this.root=Je("div","nw-hud"),this.frame=Je("div","nw-frame"),this.flashFx=Je("div","nw-flashfx"),this.corner=Je("div","nw-corner"),this.pips=[];for(let n=0;n<3;n++){const i=Je("span","nw-pip");this.pips.push(i),this.corner.appendChild(i)}this.vessel=Je("span","nw-vessel","❖"),this.corner.appendChild(this.vessel),this.toast=Je("div","nw-toast"),this.prompt=Je("div","nw-prompt"),this.bottlesRow=Je("div","nw-bottles"),this.root.appendChild(this.frame),this.root.appendChild(this.flashFx),this.root.appendChild(this.corner),this.root.appendChild(this.toast),this.root.appendChild(this.prompt),this.root.appendChild(this.bottlesRow),this._bottles=-1,this._flashActive=!1,this._unsub=e.on("objective",n=>this.showObjective(n&&n.text)),t.appendChild(this.root)}showObjective(t){t&&(this.toast.textContent=t,this.toast.classList.remove("go"),this.toast.offsetWidth,this.toast.classList.add("go"))}update(t){const e=t||{},n=e.prompt;n&&n.label?(this.prompt.textContent="[E] "+n.label,this.prompt.classList.add("on")):this.prompt.classList.remove("on");const i=Math.max(0,Math.min(3,e.sealsGot|0));for(let l=0;l<3;l++)this.pips[l].classList.toggle("fill",l<i);this.vessel.classList.toggle("on",!!e.vessel);const r=Math.max(0,e.bottles|0);if(r!==this._bottles){this._bottles=r,this.bottlesRow.textContent="";for(let l=0;l<r;l++)this.bottlesRow.appendChild(Je("span","nw-bdot"))}const a=Math.max(0,Math.min(1,Number(e.threatLevel)||0));this.frame.style.opacity=String(a*a);const o=!!e.caughtFlash;o&&!this._flashActive&&(this.flashFx.classList.remove("go"),this.flashFx.offsetWidth,this.flashFx.classList.add("go")),this._flashActive=o}dispose(){this._unsub&&this._unsub(),this.root.remove()}}const wl="nw-style",Lg=`
.nw-hud{position:absolute;inset:0;pointer-events:none;z-index:5;font-family:ui-monospace,'Cascadia Mono',Consolas,Menlo,monospace;color:#b6bcc8;user-select:none}
.nw-frame{position:absolute;inset:0;box-shadow:inset 0 0 0 2px rgba(214,69,69,.85),inset 0 0 46px rgba(214,69,69,.35);opacity:0}
.nw-flashfx{position:absolute;inset:0;background:#6d1111;opacity:0}
.nw-flashfx.go{animation:nw-flash-a .55s ease-out both}
@keyframes nw-flash-a{0%{opacity:.5}100%{opacity:0}}
.nw-corner{position:absolute;top:14px;left:16px;display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.2em;color:#6d7482}
.nw-pip{width:9px;height:9px;transform:rotate(45deg);border:1px solid #2a2f3a;background:transparent}
.nw-pip.fill{background:#b6bcc8;border-color:#b6bcc8}
.nw-vessel{color:#e6e9f0;display:none}
.nw-vessel.on{display:inline}
.nw-prompt{position:absolute;left:50%;bottom:58px;transform:translateX(-50%);background:#0b0d12ee;border:1px solid #2a2f3a;padding:7px 15px;font-size:12px;letter-spacing:.08em;display:none;white-space:nowrap}
.nw-prompt.on{display:block}
.nw-toast{position:absolute;left:50%;top:62px;transform:translateX(-50%);background:#0b0d12ee;border:1px solid #2a2f3a;border-left:2px solid #d9a441;padding:8px 18px;font-size:12px;letter-spacing:.14em;color:#d9a441;opacity:0;white-space:nowrap}
.nw-toast.go{animation:nw-toast-a 4s ease both}
@keyframes nw-toast-a{0%{opacity:0;transform:translateX(-50%) translateY(-8px)}8%{opacity:1;transform:translateX(-50%) translateY(0)}78%{opacity:1}100%{opacity:0}}
.nw-bottles{position:absolute;left:16px;bottom:16px;display:flex;gap:6px}
.nw-bdot{width:7px;height:7px;border-radius:50%;border:1px solid #2a2f3a;background:#8b93a3}
.nw-menus{position:absolute;inset:0;z-index:10;pointer-events:none;font-family:ui-monospace,'Cascadia Mono',Consolas,Menlo,monospace;color:#b6bcc8;user-select:none}
.nw-view{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(4,5,9,.84);pointer-events:auto}
.nw-view.on{display:flex}
.nw-panel{width:min(560px,92vw);max-height:88vh;overflow:auto;background:#0b0d12ee;border:1px solid #2a2f3a;padding:26px 30px}
.nw-off{display:none!important}
.nw-kicker{font-size:11px;letter-spacing:.3em;color:#6d7482;margin-bottom:10px}
.nw-title{margin:0;font-size:28px;font-weight:600;letter-spacing:.34em;color:#e6e9f0}
.nw-sub{margin:8px 0 0;font-size:12px;letter-spacing:.1em;color:#6d7482}
.nw-rule{height:1px;background:#2a2f3a;margin:18px 0}
.nw-table{border-collapse:collapse;font-size:12px}
.nw-table td{padding:3px 16px 3px 0}
.nw-key{color:#e6e9f0;letter-spacing:.08em;white-space:nowrap}
.nw-desc{color:#6d7482}
.nw-btn{display:block;width:100%;box-sizing:border-box;margin-top:10px;padding:9px 14px;background:transparent;border:1px solid #2a2f3a;color:#b6bcc8;font:inherit;font-size:12px;letter-spacing:.14em;text-align:left;cursor:pointer}
.nw-btn:hover{border-color:#59627a;color:#e6e9f0}
.nw-btn.primary{border-color:#3a4152;color:#e6e9f0;text-align:center}
.nw-btn.primary:hover{border-color:#59627a;background:#10131b}
.nw-log{height:320px;overflow-y:auto;border:1px solid #2a2f3a;background:#07090e;padding:10px 12px;font-size:12px;line-height:1.6}
.nw-logrow .t{color:#565d6b}
.nw-logrow .w{color:#b6bcc8}
.nw-logrow .d{color:#6d7482}
.nw-logrow.warn .w,.nw-logrow.warn .d{color:#d9a441}
.nw-logrow.bad .w,.nw-logrow.bad .d{color:#e05252}
.nw-empty{color:#565d6b}
.nw-stats{font-size:13px;line-height:2.1}
.nw-stats .k{display:inline-block;width:190px;color:#6d7482;letter-spacing:.1em}
.nw-stats .v{color:#e6e9f0}
.nw-deathtitle{margin:0;font-size:38px;font-weight:600;letter-spacing:.4em;color:#e05252}
.nw-wintitle{margin:0;font-size:32px;font-weight:600;letter-spacing:.4em;color:#e6e9f0}
`;function Ig(){if(document.getElementById(wl))return;const s=document.createElement("style");s.id=wl,s.textContent=Lg,document.head.appendChild(s)}function St(s,t,e){const n=document.createElement(s);return t&&(n.className=t),e!=null&&(n.textContent=e),n}const Dg=[["WASD / ARROWS","move"],["C / CTRL","crouch (hold)"],["SHIFT","sprint (hold)"],["E","interact"],["Q / LMB","throw bottle at cursor"],["F","flashlight"],["ESC","pause"]],Ug={seen:"spotted you",spotted:"spotted you",heard:"heard something",noise:"responded to a noise",chase:"gave chase",caught:"took you"};function bl(){const s=St("table","nw-table"),t=St("tbody");for(const[e,n]of Dg){const i=St("tr");i.appendChild(St("td","nw-key",e)),i.appendChild(St("td","nw-desc",n)),t.appendChild(i)}return s.appendChild(t),s}function Ng(s){const t=Math.max(0,Math.floor(Number(s)||0));return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")}function Og(s){return s==="caught"?" nw-logrow bad":s==="seen"||s==="spotted"||s==="chase"?" nw-logrow warn":" nw-logrow"}class Fg{constructor(t,e={}){Ig(),this.opts=e,this.started=!1,this.paused=!1,this.muted=!1,this.overlayMode=null,this.root=St("div","nw-menus"),this.startView=St("div","nw-view on");const n=St("div","nw-panel");n.appendChild(St("div","nw-kicker","SECTOR 7 · AFTER HOURS")),n.appendChild(St("h1","nw-title","NIGHT WARD")),n.appendChild(St("p","nw-sub","The ward remembers light.")),n.appendChild(St("div","nw-rule")),n.appendChild(bl()),n.appendChild(St("div","nw-rule"));const i=St("button","nw-btn primary","CLICK TO BEGIN");i.addEventListener("click",()=>this.begin()),n.appendChild(i),this.startView.appendChild(n),this.pauseView=St("div","nw-view");const r=St("div","nw-panel");r.appendChild(St("div","nw-kicker","PAUSED")),this.pauseMain=St("div"),this.resumeBtn=St("button","nw-btn primary","RESUME"),this.restartBtn=St("button","nw-btn","RESTART CHECKPOINT"),this.logBtn=St("button","nw-btn","INCIDENT LOG"),this.controlsBtn=St("button","nw-btn","CONTROLS"),this.muteBtn=St("button","nw-btn","SOUND: ON"),this.resumeBtn.addEventListener("click",()=>this.togglePause(!1)),this.restartBtn.addEventListener("click",()=>this.restart()),this.logBtn.addEventListener("click",()=>this.showSub("log")),this.controlsBtn.addEventListener("click",()=>this.showSub("controls")),this.muteBtn.addEventListener("click",()=>this.toggleMute()),this.pauseMain.appendChild(this.resumeBtn),this.pauseMain.appendChild(this.restartBtn),this.pauseMain.appendChild(this.logBtn),this.pauseMain.appendChild(this.controlsBtn),this.pauseMain.appendChild(this.muteBtn),this.pauseLog=St("div","nw-off"),this.pauseControls=St("div","nw-off"),this.pauseControls.appendChild(bl());const a=St("button","nw-btn","BACK");a.addEventListener("click",()=>this.showSub("main")),this.pauseControls.appendChild(a),St("button","nw-btn","BACK").addEventListener("click",()=>this.showSub("main")),r.appendChild(this.pauseMain),r.appendChild(this.pauseControls),r.appendChild(this.pauseLog),this.pauseView.appendChild(r),this.deathView=St("div","nw-view");const l=St("div","nw-panel");l.appendChild(St("div","nw-kicker","WARD INCIDENT REPORT")),l.appendChild(St("h1","nw-deathtitle","TAKEN")),this.deathBy=St("p","nw-sub",""),l.appendChild(this.deathBy),l.appendChild(St("div","nw-rule"));const c=St("button","nw-btn primary","RESTART FROM CHECKPOINT");c.addEventListener("click",()=>this.restart()),l.appendChild(c),this.deathView.appendChild(l),this.winView=St("div","nw-view");const u=St("div","nw-panel");u.appendChild(St("div","nw-kicker","EXIT LOG")),u.appendChild(St("h1","nw-wintitle","EXTRACTED")),this.winStats=St("div","nw-stats"),u.appendChild(St("div","nw-rule")),u.appendChild(this.winStats),u.appendChild(St("div","nw-rule"));const d=St("button","nw-btn primary","LEAVE WARD");d.addEventListener("click",()=>this.restart()),u.appendChild(d),this.winView.appendChild(u),this.root.appendChild(this.startView),this.root.appendChild(this.pauseView),this.root.appendChild(this.deathView),this.root.appendChild(this.winView),t.appendChild(this.root),this._esc=m=>{m.code==="Escape"&&(!this.started||this.overlayMode||this.togglePause())},document.addEventListener("keydown",this._esc)}begin(){if(this.started)return;this.started=!0,this.startView.classList.remove("on");const t=this.opts.audioEngine;t&&typeof t.arm=="function"&&t.arm(),wt.emit("ui:firstInput")}togglePause(t){const e=typeof t=="boolean"?t:!this.paused;e!==this.paused&&(e&&(!this.started||this.overlayMode)||(this.paused=e,this.pauseView.classList.toggle("on",e),e?this.showSub("main"):typeof this.opts.onResume=="function"&&this.opts.onResume()))}showSub(t){this.pauseMain.classList.toggle("nw-off",t!=="main"),this.pauseControls.classList.toggle("nw-off",t!=="controls"),this.pauseLog.classList.toggle("nw-off",t!=="log"),t==="log"&&this.renderLog()}renderLog(){this.pauseLog.textContent="",this.pauseLog.appendChild(St("div","nw-kicker","INCIDENT LOG"));const t=St("div","nw-log");let e=[];try{e=this.opts.getLog()||[]}catch{e=[]}const n=e.slice(-100).reverse();n.length||t.appendChild(St("div","nw-empty","no incidents recorded"));for(const i of n){if(typeof i=="string"){t.appendChild(St("div","nw-logrow",i));continue}const r=i||{},a=Number.isFinite(r.t)?r.t.toFixed(1)+"s":"",o=r.who||"",l=r.detail!=null&&r.detail!==""?String(r.detail):Ug[r.kind]||r.kind||"",c=St("div",Og(r.kind));c.appendChild(St("span","t",a+(a?" ":""))),c.appendChild(St("span","w",o)),c.appendChild(St("span","d",l?" — "+l:"")),t.appendChild(c)}this.pauseLog.appendChild(t)}toggleMute(){const t=this.opts.audioEngine;let e;t&&typeof t.toggleMute=="function"?e=!!t.toggleMute():t&&typeof t.setMuted=="function"?(e=!this.muted,t.setMuted(e)):e=!this.muted,this.muted=e,this.muteBtn.textContent="SOUND: "+(e?"OFF":"ON")}restart(){this.paused=!1,this.overlayMode=null,this.pauseView.classList.remove("on"),this.deathView.classList.remove("on"),this.winView.classList.remove("on"),typeof this.opts.onRestart=="function"&&this.opts.onRestart()}showDeath(t){this.deathBy.textContent=t?"taken by "+t:"",this.overlayMode="death",this.paused=!1,this.pauseView.classList.remove("on"),this.deathView.classList.add("on")}showWin(t){const e=t||{},n=e.time!=null?e.time:e.timeSurvived!=null?e.timeSurvived:0,i=e.spotted!=null?e.spotted:e.timesSpotted!=null?e.timesSpotted:0,r=e.bottlesUsed!=null?e.bottlesUsed:e.bottles!=null?e.bottles:0;this.winStats.textContent="";const a=(o,l)=>{const c=St("div");c.appendChild(St("span","k",o)),c.appendChild(St("span","v",l)),this.winStats.appendChild(c)};a("TIME SURVIVED",Ng(n)),a("TIMES SPOTTED",String(i)),a("BOTTLES USED",String(r)),this.overlayMode="win",this.paused=!1,this.pauseView.classList.remove("on"),this.winView.classList.add("on")}dispose(){document.removeEventListener("keydown",this._esc),this.root.remove()}}class zg{constructor({canvasToWorld:t}={}){this.canvasToWorld=t||null,this.target=null,this.keys=new Set,this.mouse=null,this.aimWorld=null,this.armed=!1,this.pending={interact:!1,throw:!1,flash:!1},this._onKeyDown=e=>this.handleKeyDown(e),this._onKeyUp=e=>this.handleKeyUp(e),this._onMouseMove=e=>this.handleMouseMove(e),this._onMouseDown=e=>this.handleMouseDown(e),this._onBlur=()=>this.releaseAll(),this._onVisibility=()=>{document.hidden&&this.releaseAll()}}attach(t){this.detach(),this.target=t||document.body,window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp),window.addEventListener("blur",this._onBlur),document.addEventListener("visibilitychange",this._onVisibility),this.target.addEventListener("mousemove",this._onMouseMove),this.target.addEventListener("mousedown",this._onMouseDown)}detach(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("blur",this._onBlur),document.removeEventListener("visibilitychange",this._onVisibility),this.target&&(this.target.removeEventListener("mousemove",this._onMouseMove),this.target.removeEventListener("mousedown",this._onMouseDown)),this.target=null,this.mouse=null,this.releaseAll()}handleKeyDown(t){document.hidden||((t.code==="Space"||t.code.startsWith("Arrow"))&&t.preventDefault(),this.keys.add(t.code),t.repeat||(t.code==="KeyE"&&(this.pending.interact=!0),t.code==="KeyQ"&&(this.pending.throw=!0),t.code==="KeyF"&&(this.pending.flash=!0)),this.arm())}handleKeyUp(t){this.keys.delete(t.code)}handleMouseMove(t){const e=this.target&&this.target.getBoundingClientRect?this.target.getBoundingClientRect():null;e&&(this.mouse={x:t.clientX-e.left,y:t.clientY-e.top})}handleMouseDown(t){document.hidden||(t.button===0&&(this.pending.throw=!0),this.arm())}releaseAll(){this.keys.clear(),this.pending.interact=!1,this.pending.throw=!1,this.pending.flash=!1}arm(){this.armed||(this.armed=!0,wt.emit("ui:firstInput"))}getAim(){return this.aimWorld}computeAim(){if(this.mouse&&typeof this.canvasToWorld=="function"){const t=this.canvasToWorld(this.mouse.x,this.mouse.y);t&&(this.aimWorld={x:t.x,z:t.z})}return this.aimWorld}poll(){if(document.hidden)return this.releaseAll(),{mx:0,mz:0,crouch:!1,sprint:!1,interact:!1,throwPressed:!1,flashToggled:!1,aimX:this.aimWorld?this.aimWorld.x:0,aimZ:this.aimWorld?this.aimWorld.z:0,aimWorld:this.aimWorld};const t=this.keys,e=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0),n=(t.has("KeyS")||t.has("ArrowDown")?1:0)-(t.has("KeyW")||t.has("ArrowUp")?1:0),i=this.computeAim(),r={mx:e,mz:n,crouch:t.has("KeyC")||t.has("ControlLeft")||t.has("ControlRight"),sprint:t.has("ShiftLeft")||t.has("ShiftRight"),interact:!1,throwPressed:!1,flashToggled:!1,aimX:i?i.x:0,aimZ:i?i.z:0,aimWorld:i};return this.pending.interact&&(r.interact=!0,this.pending.interact=!1),this.pending.throw&&(r.throwPressed=!0,this.pending.throw=!1),this.pending.flash&&(r.flashToggled=!0,this.pending.flash=!1),r}}const Ba=document.getElementById("app"),fc=document.createElement("canvas");Ba.appendChild(fc);let ka=Mc(),en=new Al(ka);const _a=new Tg(fc,yc(ka)),Mi=new Ag(wt),Bg=new Pg(Ba,wt),va=new zg({canvasToWorld:(s,t)=>_a.canvasToWorld(s,t)});va.attach(window);let Ha=null;wt.on("playerCaught",s=>{Ha=s&&s.byId?s.byId:null});function kg(){const s=zc();ro();const t=new Al(ka);s&&!t.load(s.game)&&ro(),en=t,Ha=null,Mi&&typeof Mi.clearCaught=="function"&&Mi.clearCaught()}const qi=new Fg(Ba,{audioEngine:Mi,getLog:()=>en.log,getStats:()=>en.stats,onRestart:()=>kg(),onResume:()=>{}});wt.on("gameLost",()=>{qi.showDeath(Ha)});wt.on("gameWon",s=>{qi.showWin(s&&s.stats||en.stats)});wt.on("checkpoint",({label:s})=>{Rl(en,s)});wt.on("ui:firstInput",()=>{Rl(en,"intake")});document.addEventListener("keydown",s=>{s.code==="KeyM"&&Mi.toggleMute()});let Tl=performance.now();function pc(s){const t=Math.min(.1,(s-Tl)/1e3);Tl=s,qi.started&&!qi.paused&&!qi.overlayMode&&!en.won&&!en.lost?en.update(t,va.poll()):va.poll();const n=en.snapshot();_a.update(n,t),_a.render(),Bg.update(n),Mi.update(n,t),requestAnimationFrame(pc)}requestAnimationFrame(pc);
