'use strict';
const $=id=>document.getElementById(id),L=(a,b,k)=>a+(b-a)*k,R=Math.random;
let hq=true,sound=true,state='menu',mode='vs',sel='kai',round=1,tmr=60,stT=0,shake=0,P1,P2,AC;

/* ---------- Renderer, cena e câmera ---------- */
const renderer=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.outputEncoding=THREE.sRGBEncoding;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,200);
scene.background=new THREE.Color(0x0a0520);scene.fog=new THREE.Fog(0x140830,20,60);
function size(){renderer.setPixelRatio(hq?Math.min(devicePixelRatio,2):1);renderer.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',size);size();

/* ---------- Áudio (Web Audio API) ---------- */
const S={hit:[170,50,.14,'square'],block:[520,330,.09,'triangle'],swing:[380,140,.09,'sine'],fire:[180,900,.35,'sawtooth'],ko:[320,35,.9,'sawtooth'],round:[330,660,.35,'triangle']};
function initAudio(){if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}if(AC&&AC.state==='suspended')AC.resume()}
function sfx(n){if(!AC||!sound)return;const[a,b,d,w]=S[n],o=AC.createOscillator(),g=AC.createGain(),T=AC.currentTime;o.type=w;o.frequency.setValueAtTime(a,T);o.frequency.exponentialRampToValueAtTime(b,T+d);g.gain.setValueAtTime(.12,T);g.gain.exponentialRampToValueAtTime(.001,T+d);o.connect(g);g.connect(AC.destination);o.start(T);o.stop(T+d)}

/* ---------- Arena: cidade futurista de neon ---------- */
scene.add(new THREE.HemisphereLight(0x6a8cff,0x2a0a40,.75));
const sun=new THREE.DirectionalLight(0xcdb8ff,1.1);sun.position.set(6,14,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-14,right:14,top:10,bottom:-10,near:1,far:40});sun.shadow.camera.updateProjectionMatrix();scene.add(sun);
[[-9,0xff2d55],[9,0x2b6bff]].forEach(([x,c])=>{const l=new THREE.PointLight(c,1.4,26);l.position.set(x,4,-4);scene.add(l)});
const floor=new THREE.Mesh(new THREE.PlaneGeometry(80,50),new THREE.MeshStandardMaterial({color:0x0d0a22,roughness:.35,metalness:.7}));
floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
const grid=new THREE.GridHelper(80,80,0xff2bd6,0x2b3cff);grid.position.y=.01;grid.material.transparent=true;grid.material.opacity=.3;scene.add(grid);
const glow=(w,h,d,x,y,z,c)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:c}));m.position.set(x,y,z);scene.add(m)};
glow(18,.08,.08,0,.05,-3.8,0xff2d55);glow(18,.08,.08,0,.05,3.8,0x2b6bff);glow(.08,.08,7.6,-9,.05,0,0x7b2cff);glow(.08,.08,7.6,9,.05,0,0x7b2cff);
[-11,11].forEach((x,k)=>glow(.3,7,.3,x,3.5,-4,k?0x2b6bff:0xff2d55));
for(let i=0;i<44;i++){const w=2+R()*3,h=6+R()*22,c=[0x2b6bff,0x7b2cff,0xff2d55][i%3],x=-32+i*1.5+R(),z=-13-R()*14;
 const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,w),new THREE.MeshStandardMaterial({color:0x0a0818,emissive:c,emissiveIntensity:.12+R()*.25,roughness:.5}));
 b.position.set(x,h/2,z);scene.add(b);glow(w*1.03,.18,w*1.03,x,h*(.3+R()*.6),z,c)}

/* ---------- Partículas ---------- */
const N=500,pp=new Float32Array(N*3).fill(-99),pc=new Float32Array(N*3),pv=new Float32Array(N*3),pl=new Float32Array(N),pg=new THREE.BufferGeometry();let pn=0;
pg.setAttribute('position',new THREE.BufferAttribute(pp,3));pg.setAttribute('color',new THREE.BufferAttribute(pc,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.24,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));pts.frustumCulled=false;scene.add(pts);
function emit(x,y,z,col,n,s){const c=new THREE.Color(col);for(let k=0;k<n;k++){const j=pn++%N*3;pp[j]=x;pp[j+1]=y;pp[j+2]=z;pv[j]=(R()-.5)*s;pv[j+1]=R()*s*.8+1;pv[j+2]=(R()-.5)*s;pc[j]=c.r;pc[j+1]=c.g;pc[j+2]=c.b;pl[j/3]=.4+R()*.5}pg.attributes.color.needsUpdate=true}
function updP(dt){for(let j=0;j<N;j++){const a=j*3;if(pl[j]>0){pl[j]-=dt;pp[a]+=pv[a]*dt;pp[a+1]+=pv[a+1]*dt;pp[a+2]+=pv[a+2]*dt;pv[a+1]-=7*dt}else pp[a+1]=-99}pg.attributes.position.needsUpdate=true}

/* ---------- Lutadores 3D ---------- */
const DEF={
 kai:{n:'KAI',c:0xff4a1c,d:0x3a0c08,skin:0xd9a07a,hair:0x1a0505,spd:5.6,pw:1.1,fx:0xff7a1c},
 frost:{n:'FROST',c:0x35c8ff,d:0x0b2a44,skin:0xf1d3c4,hair:0xe8fbff,spd:6.3,pw:.95,fx:0x8fefff}};
const ATK={punch:{dur:.38,a:.09,b:.2,dmg:6,rng:1.8,kb:3,gain:7},kick:{dur:.58,a:.2,b:.34,dmg:10,rng:2.1,kb:6,gain:10}};
const mat=(c,e)=>new THREE.MeshStandardMaterial({color:c,roughness:.55,metalness:.15,emissive:e||0,emissiveIntensity:.3});
function bx(w,h,d,c,x,y,z,e){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,e));m.position.set(x,y,z);m.castShadow=true;return m}
function ball(r,c,x,y,z){const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,16),mat(c));m.position.set(x,y,z);m.castShadow=true;return m}
function limb(x,y,len,w,c,tc){const g=new THREE.Group();g.position.set(x,y,0);g.add(bx(w,len,w,c,0,-len/2,0),bx(w*1.3,w*1.3,w*1.3,tc,0,-len+.1,0,tc));return g}
function makeFighter(k){
 const d=DEF[k],g=new THREE.Group(),body=new THREE.Group();g.add(body);
 body.add(bx(.72,.95,.42,d.c,0,1.4,0,d.c),bx(.76,.14,.46,0x111111,0,.95,0),ball(.27,d.skin,0,2.1,0),bx(.52,.2,.5,d.hair,0,2.32,-.02),
  bx(.08,.07,.05,0x111111,-.1,2.12,.26),bx(.08,.07,.05,0x111111,.1,2.12,.26),bx(.5,.07,.05,d.c,0,2.22,.25,d.c));
 if(k==='frost')body.add(bx(.16,.55,.16,d.hair,0,2.05,-.34));
 else body.add(bx(.12,.3,.12,d.hair,-.15,2.5,0),bx(.12,.38,.12,d.hair,0,2.55,0),bx(.12,.3,.12,d.hair,.15,2.5,0));
 const aL=limb(-.5,1.75,.8,.2,d.skin,d.c),aR=limb(.5,1.75,.8,.2,d.skin,d.c),lL=limb(-.2,.95,.95,.26,d.d,d.c),lR=limb(.2,.95,.95,.26,d.d,d.c);
 body.add(aL,aR,lL,lR);scene.add(g);
 return{k,d,g,body,aL,aR,lL,lR,hp:100,en:0,st:'idle',t:0,vy:0,kx:0,kz:0,mx:0,mz:0,did:false,fired:false,combo:0,ct:0,dcool:0,inp:{},hold:0,back:0,at:0,wins:0,yaw:0,ph:0,human:false}}
const FI={kai:makeFighter('kai'),frost:makeFighter('frost')};
function setup(){P1=FI[sel];P2=FI[sel==='kai'?'frost':'kai'];P1.human=true;P2.human=false}

/* ---------- Entrada ---------- */
const keys={},tap={},ms=()=>performance.now(),pk=c=>ms()-(tap[c]||0)<150;
addEventListener('keydown',e=>{if(e.code==='Space')e.preventDefault();if(e.repeat)return;keys[e.code]=1;tap[e.code]=ms()});
addEventListener('keyup',e=>{if(e.code==='Space')e.preventDefault();keys[e.code]=0});
const pInput=()=>({mx:(keys.KeyD?1:0)-(keys.KeyA?1:0),mz:(keys.KeyS?1:0)-(keys.KeyW?1:0),block:keys.KeyL,jump:pk('Space'),punch:pk('KeyJ'),kick:pk('KeyK'),dodge:pk('ShiftLeft')||pk('ShiftRight'),special:pk('KeyQ'),sup:pk('KeyE')});
const eat=f=>{if(f.human)for(const c in tap)tap[c]=0};

/* ---------- Combate ---------- */
function startS(f,s){f.st=s;f.t=0;f.did=false;f.fired=false;eat(f);if(s==='punch'||s==='kick')sfx('swing')}
function hurt(f,dmg,kb,dx,dz){
 if(f.st==='ko'||f.st==='dodge'||state!=='fight')return false;
 const p=f.g.position;f.kx=dx*kb;f.kz=dz*kb;
 if(f.st==='block'){f.kx*=.35;f.kz*=.35;f.hp=Math.max(0,f.hp-dmg*.12);sfx('block');emit(p.x,1.6,p.z,0x9ab4ff,10,4);return false}
 f.hp=Math.max(0,f.hp-dmg);f.en=Math.min(100,f.en+dmg*.5);f.st='hit';f.t=0;sfx('hit');emit(p.x,1.6,p.z,0xffffff,16,6);shake=Math.max(shake,dmg>15?.5:.2);
 if(f.hp<=0){f.st='ko';f.t=0;sfx('ko')}
 return true}
const projs=[];
function shoot(f,dx,dz,big){
 const p=f.g.position,m=new THREE.Mesh(new THREE.SphereGeometry(big?.9:.4,16,12),new THREE.MeshBasicMaterial({color:f.d.fx,transparent:true,opacity:.85,blending:THREE.AdditiveBlending})),v=big?15:12;
 m.position.set(p.x+dx,p.y+1.5,p.z+dz);scene.add(m);projs.push({m,f,o:f===P1?P2:P1,vx:dx*v,vz:dz*v,dmg:big?26:13,r:big?1.2:.7,life:2});sfx('fire');if(big)shake=.6}
function projectiles(dt){
 for(let k=projs.length-1;k>=0;k--){const q=projs[k],m=q.m.position,op=q.o.g.position;q.life-=dt;m.x+=q.vx*dt;m.z+=q.vz*dt;emit(m.x,m.y,m.z,q.f.d.fx,2,1.5);
  if(Math.hypot(op.x-m.x,op.z-m.z)<q.r+.45&&Math.abs(op.y+1.2-m.y)<1.6){const n=Math.hypot(q.vx,q.vz);hurt(q.o,q.dmg*q.f.d.pw,q.dmg>20?10:6,q.vx/n,q.vz/n);emit(m.x,m.y,m.z,q.f.d.fx,30,9);q.life=0}
  if(q.life<=0){scene.remove(q.m);projs.splice(k,1)}}}
function step(f,o,dt){
 const p=f.g.position,i=f.inp,op=o.g.position,A=ATK[f.st];f.t+=dt;f.dcool-=dt;f.ct-=dt;if(f.ct<=0)f.combo=0;
 f.en=Math.min(100,f.en+dt*(mode==='train'&&f.human?35:2.2));
 let dx=op.x-p.x,dz=op.z-p.z;const dist=Math.hypot(dx,dz)||1;dx/=dist;dz/=dist;f.yaw=Math.atan2(dx,dz);
 f.vy-=28*dt;p.y+=f.vy*dt;if(p.y<=0){p.y=0;f.vy=0}
 p.x+=f.kx*dt;p.z+=f.kz*dt;f.kx*=Math.exp(-9*dt);f.kz*=Math.exp(-9*dt);
 if(f.st==='idle'||f.st==='walk'||f.st==='block'){
  if(i.block&&p.y<.05)f.st='block';else if(f.st==='block')f.st='idle';
  if(f.st!=='block'){
   const mx=i.mx||0,mz=i.mz||0,m=Math.hypot(mx,mz);
   if(m){p.x+=mx/m*f.d.spd*dt;p.z+=mz/m*f.d.spd*dt}
   f.st=m?'walk':'idle';
   if(i.jump&&p.y<.05){f.vy=11;eat(f)}
   if(i.punch)startS(f,'punch');
   else if(i.kick)startS(f,'kick');
   else if(i.special&&f.en>=30){f.en-=30;startS(f,'special')}
   else if(i.sup&&f.en>=100){f.en=0;startS(f,'super')}
   else if(i.dodge&&f.dcool<=0&&p.y<.05){startS(f,'dodge');f.dcool=.8;f.mx=m?mx/m:-dx;f.mz=m?mz/m:-dz}
  }
 }else if(f.st==='dodge'){const k=9*(1-f.t/.32);p.x+=f.mx*k*dt;p.z+=f.mz*k*dt;if(f.t>.32)f.st='idle'}
 else if(A){
  if(!f.did&&f.t>A.a&&f.t<A.b&&dist<A.rng&&Math.abs(op.y-p.y)<1.4){f.did=true;if(hurt(o,A.dmg*f.d.pw*(1+.15*f.combo),A.kb,dx,dz)){f.combo++;f.ct=1.2;f.en=Math.min(100,f.en+A.gain)}}
  if(f.t>A.dur)f.st='idle'}
 else if(f.st==='special'){if(!f.fired&&f.t>.22){f.fired=true;shoot(f,dx,dz,false)}if(f.t>.5)f.st='idle'}
 else if(f.st==='super'){if(!f.fired&&f.t>.5){f.fired=true;shoot(f,dx,dz,true)}if(f.t>.95)f.st='idle'}
 else if(f.st==='hit'&&f.t>.3)f.st='idle'}
function separate(){
 const a=P1.g.position,b=P2.g.position;let dx=b.x-a.x,dz=b.z-a.z;const d=Math.hypot(dx,dz)||.01;
 if(d<1.1&&Math.abs(a.y-b.y)<1.5){const s=(1.1-d)/2;dx/=d;dz/=d;a.x-=dx*s;a.z-=dz*s;b.x+=dx*s;b.z+=dz*s}
 [a,b].forEach(p=>{p.x=Math.max(-9,Math.min(9,p.x));p.z=Math.max(-3.5,Math.min(3.5,p.z))})}

/* ---------- Inteligência artificial ---------- */
function aiInput(f,o,dt){
 const i={mx:0,mz:0},dx=o.g.position.x-f.g.position.x,dz=o.g.position.z-f.g.position.z,d=Math.hypot(dx,dz);f.inp=i;
 if(mode==='train')return;
 f.at-=dt;f.hold-=dt;f.back-=dt;
 if(f.at<=0){f.at=.2+R()*.3;const r=R(),thr=['punch','kick','special','super'].includes(o.st);
  if(thr&&d<3&&r<.55){if(r<.15)i.dodge=1;else f.hold=.6}
  else if(f.en>=100&&d>2&&r<.5)i.sup=1;
  else if(f.en>=30&&d>3.5&&r<.4)i.special=1;
  else if(d>2.1){if(r<.08)i.jump=1}
  else if(r<.4)i.punch=1;else if(r<.65)i.kick=1;else if(r<.8)f.back=.5;else f.hold=.4}
 if(f.hold>0)i.block=1;
 else if(f.back>0)i.mx=-Math.sign(dx);
 else if(d>1.9)i.mx=Math.sign(dx);
 if(!i.block&&Math.abs(dz)>.45&&d<6)i.mz=Math.sign(dz)}

/* ---------- Animação dos personagens ---------- */
function pose(f,dt){
 const s=Math.sin(f.ph+=dt*(f.st==='walk'?11:2.5)),air=f.g.position.y>.05,pr=Math.min(f.t/(f.st==='dodge'?.32:(ATK[f.st]||{dur:.5}).dur),1),pw=Math.sin(Math.PI*pr);
 let aL=-.9,aR=-1.1,lL=.12,lR=-.12,by=0,lean=0,tw=0;
 switch(f.st){
  case'idle':by=s*.03;aL+=s*.06;break;
  case'walk':lL=s*.7;lR=-s*.7;by=Math.abs(s)*.06;break;
  case'punch':aR=-.5-1.1*pw;aL=-1.2;tw=-.35*pw;break;
  case'kick':lR=-1.6*pw;lean=-.25*pw;aL=-1.4;aR=-.6;break;
  case'block':aL=aR=-1.75;by=-.15;lean=.2;break;
  case'dodge':lean=.5;by=-.3;aL=aR=-.4;lL=.5;lR=-.5;break;
  case'special':case'super':aL=aR=-1.55;lean=.1;lL=.5;lR=-.5;break;
  case'hit':lean=-.45;aL=aR=.6;break;
  case'ko':lean=-1.45;by=.28;aL=aR=-.3;break}
 if(air&&(f.st==='idle'||f.st==='walk')){lL=-.9;lR=.3;aL=aR=-1.8}
 const k=1-Math.exp(-dt*22),B=f.body;
 f.aL.rotation.x=L(f.aL.rotation.x,aL,k);f.aR.rotation.x=L(f.aR.rotation.x,aR,k);f.lL.rotation.x=L(f.lL.rotation.x,lL,k);f.lR.rotation.x=L(f.lR.rotation.x,lR,k);
 B.position.y=L(B.position.y,by,k);B.rotation.x=L(B.rotation.x,lean,k);B.rotation.y=L(B.rotation.y,tw,k);f.g.rotation.y=f.yaw}

/* ---------- Câmera cinematográfica ---------- */
const cp=new THREE.Vector3(0,3,9),cl=new THREE.Vector3(0,1.4,0);
function updCam(dt,t){
 let tp,tl;
 if(state==='menu'){tp=[Math.sin(t*.3)*6.5,2.2,Math.cos(t*.3)*6.5];tl=[0,.9,0]}
 else{const a=P1.g.position,b=P2.g.position,w=Math.hypot(a.x-b.x,a.z-b.z),mx=(a.x+b.x)/2,mz=(a.z+b.z)/2;tp=[mx,3+w*.15,mz+7+w*.5];tl=[mx,1.4,mz]}
 const k=1-Math.exp(-4*dt);cp.x=L(cp.x,tp[0],k);cp.y=L(cp.y,tp[1],k);cp.z=L(cp.z,tp[2],k);cl.x=L(cl.x,tl[0],k);cl.y=L(cl.y,tl[1],k);cl.z=L(cl.z,tl[2],k);
 cam.position.set(cp.x+(R()-.5)*shake,cp.y+(R()-.5)*shake,cp.z);cam.lookAt(cl);shake*=Math.exp(-7*dt)}

/* ---------- Rounds, HUD e fluxo do jogo ---------- */
function say(t,t2){$('msg').textContent=t;if(t2)setTimeout(()=>{if($('msg').textContent===t)$('msg').textContent=''},t2)}
function pips(){[P1,P2].forEach((f,k)=>$('r'+(k+1)).innerHTML=[0,1].map(j=>`<span class="${j<f.wins?'on':''}"></span>`).join(''))}
function hud(){$('h1').style.width=P1.hp+'%';$('h2').style.width=P2.hp+'%';$('e1').style.width=P1.en+'%';$('e2').style.width=P2.en+'%';
 $('tm').textContent=mode==='train'?'∞':Math.max(0,Math.ceil(tmr));$('combo').textContent=P1.combo>1?'COMBO x'+P1.combo:''}
function newRound(){
 projs.splice(0).forEach(q=>scene.remove(q.m));
 [P1,P2].forEach((f,k)=>{Object.assign(f,{hp:100,en:0,st:'idle',t:0,vy:0,kx:0,kz:0,combo:0,ct:0,inp:{}});f.g.position.set(k?2.6:-2.6,0,0)});
 tmr=60;state='intro';stT=0;pips();say('ROUND '+round);sfx('round')}
function startMatch(m){
 mode=m;setup();P1.wins=P2.wins=0;round=1;initAudio();if(document.activeElement)document.activeElement.blur();
 $('menu').classList.add('hide');$('end').classList.add('hide');$('hud').classList.remove('hide');
 $('n1').textContent=P1.d.n;$('n2').textContent=P2.d.n+(m==='train'?' (ALVO)':'');newRound()}
function endRound(){
 const w=P1.hp===P2.hp?null:P1.hp>P2.hp?P1:P2;state='roundEnd';stT=0;if(w)w.wins++;
 say(w?(tmr<=0?'TEMPO!':'K.O.!'):'EMPATE');pips()}
function over(){state='over';$('et').textContent=P1.wins>=2?'VITÓRIA!':'DERROTA';$('end').classList.remove('hide')}
function tick(dt){
 if(state==='menu'){P1.st=P2.st='idle';P1.g.position.set(-1.5,0,0);P2.g.position.set(1.5,0,0);P1.yaw+=dt*1.2;P2.yaw=-.6;pose(P1,dt);pose(P2,dt);return}
 stT+=dt;
 if(state==='intro'&&stT>1.3){state='fight';stT=0;say('LUTE!',700)}
 P1.inp=state==='fight'?pInput():{};
 if(state==='fight')aiInput(P2,P1,dt);else P2.inp={};
 step(P1,P2,dt);step(P2,P1,dt);separate();projectiles(dt);pose(P1,dt);pose(P2,dt);
 if(state==='fight'){
  if(mode==='train'){if(P2.st==='ko'&&P2.t>1.5){P2.hp=100;P2.st='idle'}}
  else{tmr-=dt;if(P1.hp<=0||P2.hp<=0||tmr<=0)endRound()}
 }else if(state==='roundEnd'&&stT>2.4){if(P1.wins>=2||P2.wins>=2)over();else{round++;newRound()}}}

/* ---------- Menu e loop principal ---------- */
document.querySelectorAll('.pick').forEach(b=>b.onclick=()=>{sel=b.dataset.f;document.querySelectorAll('.pick').forEach(x=>x.classList.toggle('sel',x===b));setup()});
$('play').onclick=()=>startMatch('vs');$('train').onclick=()=>startMatch('train');
$('snd').onclick=e=>{sound=!sound;initAudio();e.target.textContent='Som: '+(sound?'ON':'OFF')};
$('gfx').onclick=e=>{hq=!hq;e.target.textContent='Gráficos: '+(hq?'ALTO':'BAIXO');size()};
$('again').onclick=()=>startMatch(mode);
$('tomenu').onclick=()=>{state='menu';mode='vs';$('end').classList.add('hide');$('hud').classList.add('hide');$('msg').textContent='';projs.splice(0).forEach(q=>scene.remove(q.m));setup()};
let last=performance.now();
function loop(t){requestAnimationFrame(loop);const dt=Math.max(0,Math.min((t-last)/1000,.05));last=t;tick(dt);updP(dt);updCam(dt,t/1000);hud();renderer.render(scene,cam)}
setup();requestAnimationFrame(loop);