const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const VH=600,G=VH-70,WW=7000;
let S=1,VW=900,dpr=1;
function rs(){dpr=devicePixelRatio||1;const w=cv.clientWidth,h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;S=h/VH;VW=w/S}
addEventListener('resize',rs);rs();
const R=(a,b)=>a+Math.random()*(b-a),sg=v=>v<0?-1:1,D=(a,b,c,d)=>Math.hypot(a-c,b-d);
const keys={},m={x:0,y:0,touch:false},tb={l:0,r:0,b:0};
let st='menu',best=0,P,T,B,F,FX,wave,score,cam=0,shake=0,msg='',msgT=0,combo=0,comboT=0,nextWave=0,waiting=false,sliceCd=0,hint=0,now=0,overAt=0,aimId=null;
try{best=+localStorage.getItem('cg_best')||0}catch(e){}
const touchDev='ontouchstart' in window;

function say(s,t){msg=s;msgT=t||1.5}
function reset(){
  B=[];let x=250;
  while(x<WW-350){const w=R(90,210),h=R(90,270);B.push({x,w,y:G-h,win:Array.from({length:12},()=>Math.random()<.45)});x+=w+R(70,170)}
  P={x:WW/2,y:G-14,vx:0,vy:0,hp:3,gas:100,blades:8,reload:0,inv:0,hook:null,len:0,face:1,ground:true,trail:[]};
  T=[];F=[];FX=[];wave=1;score=0;combo=0;waiting=false;shake=0;cam=P.x-VW/2;
  spawn();say('Onda 1',2);
}
function spawn(){
  const n=Math.min(1+(wave*1.4|0),11);
  for(let i=0;i<n;i++){
    const fast=wave>2&&Math.random()<.25+wave*.03,h=fast?R(100,150):R(120,290);
    let x=P.x+(Math.random()<.5?-1:1)*R(700,1500);x=Math.max(120,Math.min(WW-120,x));
    T.push({x,h,w:h*.34,sp:fast?R(110,150):Math.min(95,R(35,60)+wave*4),dir:1,turn:0,cd:1.2,wind:0,dead:0,step:0,fast});
  }
}
const anc=h=>h.t?{x:h.t.x+h.ox,y:h.y}:{x:h.x,y:h.y};
function fire(wx,wy){
  if(st!=='play')return;
  P.hook=null;
  let dx=wx-P.x,dy=wy-P.y;const L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;
  for(let d=18;d<=560;d+=6){
    const px=P.x+dx*d,py=P.y+dy*d;let h=null;
    if(py>=G)h={x:px,y:G};
    else{
      for(const b of B)if(px>b.x&&px<b.x+b.w&&py>b.y){h={x:px,y:py};break}
      if(!h)for(const t of T)if(!t.dead&&Math.abs(px-t.x)<t.w*.5&&py>G-t.h*.95){h={t,ox:px-t.x,y:py};break}
    }
    if(h){P.hook=h;const a=anc(h);P.len=D(P.x,P.y,a.x,a.y);return}
  }
  FX.push({k:'miss',x1:P.x,y1:P.y,x2:P.x+dx*300,y2:P.y+dy*300,l:.15});
}
function steam(x,y,n){for(let i=0;i<n;i++)F.push({x:x+R(-30,30),y:y+R(-40,40),vx:R(-30,30),vy:R(-90,-20),l:R(.8,1.8),r:R(8,22),c:'255,255,255'})}
function hurt(t){
  P.hp--;P.inv=1.6;P.vx=(P.x<t.x?-1:1)*380;P.vy=-320;P.hook=null;shake=.45;combo=0;
  for(let i=0;i<10;i++)F.push({x:P.x,y:P.y,vx:R(-120,120),vy:R(-150,20),l:.6,r:4,c:'200,40,40'});
  if(P.hp<=0){st='over';overAt=now;if(score>best){best=score;try{localStorage.setItem('cg_best',best)}catch(e){}}}
}
function slice(t,nx,ny){
  t.dead=.001;P.blades--;if(!P.blades)P.reload=2.5;sliceCd=.25;combo++;comboT=4;
  const pts=Math.round(t.h*(t.fast?1.6:1)*(1+Math.min(combo-1,6)*.25));
  score+=pts;P.gas=Math.min(100,P.gas+25);shake=.3;
  steam(t.x,G-t.h*.7,28);FX.push({k:'slash',x:nx,y:ny,a:Math.atan2(P.vy,P.vx),l:.3});
  say('+'+pts+(combo>1?'   combo x'+combo:''),1.3);
}
function update(dt){
  const k=keys,ax=((k.d||k.arrowright||tb.r)?1:0)-((k.a||k.arrowleft||tb.l)?1:0);
  const boost=(k[' ']||k.shift||tb.b)&&P.gas>0;
  if(ax)P.face=ax;
  P.vy+=1100*dt;
  if(P.ground)P.vx+=(ax*240-P.vx)*Math.min(1,10*dt);else P.vx+=ax*520*dt;
  if(P.hook&&P.hook.t&&P.hook.t.dead)P.hook=null;
  if(boost){
    let tx,ty;
    if(P.hook){const a=anc(P.hook);tx=a.x;ty=a.y}
    else if(m.touch){tx=P.x+P.face*300;ty=P.y-140}
    else{tx=m.x/S+cam;ty=m.y/S}
    const dx=tx-P.x,dy=ty-P.y,L=Math.hypot(dx,dy)||1;
    P.vx+=dx/L*1000*dt;P.vy+=dy/L*1000*dt;P.gas=Math.max(0,P.gas-32*dt);
    if(P.hook)P.len=Math.max(40,P.len-320*dt);
  }
  const sp=Math.hypot(P.vx,P.vy);if(sp>950){P.vx*=950/sp;P.vy*=950/sp}
  P.x+=P.vx*dt;P.y+=P.vy*dt;
  if(P.hook){
    const a=anc(P.hook),dx=a.x-P.x,dy=a.y-P.y,d=Math.hypot(dx,dy);
    if(d>P.len){const nx=dx/d,ny=dy/d;P.x=a.x-nx*P.len;P.y=a.y-ny*P.len;const vr=P.vx*nx+P.vy*ny;if(vr<0){P.vx-=vr*nx;P.vy-=vr*ny}}
  }
  P.ground=false;
  for(const b of B){
    if(P.x+10>b.x&&P.x-10<b.x+b.w&&P.y+14>b.y){
      const ox=Math.min(P.x+10-b.x,b.x+b.w-(P.x-10)),oy=P.y+14-b.y;
      if(oy<ox){P.y=b.y-14;if(P.vy>0)P.vy=0;P.ground=true}
      else{P.x=P.x<b.x+b.w/2?b.x-10:b.x+b.w+10;P.vx*=-.2}
    }
  }
  if(P.y+14>G){P.y=G-14;if(P.vy>0)P.vy=0;P.ground=true}
  if(P.x<20){P.x=20;P.vx=0}if(P.x>WW-20){P.x=WW-20;P.vx=0}
  P.gas=Math.min(100,P.gas+(P.ground?14:2)*dt);
  if(P.reload>0){P.reload-=dt;if(P.reload<=0)P.blades=8}
  P.inv-=dt;sliceCd-=dt;comboT-=dt;if(comboT<=0)combo=0;
  P.trail.push({x:P.x,y:P.y});if(P.trail.length>14)P.trail.shift();
  const spd=Math.hypot(P.vx,P.vy);
  for(const t of T){
    if(t.dead){t.dead+=dt;continue}
    const dtp=sg(P.x-t.x);
    if(dtp!==t.dir){t.turn+=dt;if(t.turn>.8){t.dir=dtp;t.turn=0}}else t.turn=0;
    t.cd-=dt;
    const hx=t.x+t.dir*t.h*.38,hy=G-t.h*.55,dh=D(P.x,P.y,hx,hy);
    if(t.wind>0){
      t.wind-=dt;
      if(t.wind<=0){if(P.inv<=0&&D(P.x,P.y,hx,hy)<t.h*.5)hurt(t);t.cd=1.5}
    }else{
      if(Math.abs(P.x-t.x)>t.h*.2)t.x+=t.dir*t.sp*dt;
      t.x=Math.max(40,Math.min(WW-40,t.x));
      t.step+=t.sp*dt*.06;
      if(t.cd<=0&&dh<t.h*.42&&P.inv<=0)t.wind=.5;
      if(P.inv<=0&&P.y>G-30&&Math.abs(P.x-t.x)<t.w*.8&&t.cd<=0){hurt(t);t.cd=1.2}
    }
    if(st!=='play')return;
    const r=t.h*.12,nx=t.x+t.dir*t.h*.06-t.dir*r*.85,ny=G-t.h*.9+r*.55;
    if(sliceCd<=0&&P.reload<=0&&D(P.x,P.y,nx,ny)<r*1.5+16){
      if(spd>=240)slice(t,nx,ny);else if(hint<=0){say('Mais velocidade!',1);hint=1.2}
    }
  }
  if(!waiting&&T.every(t=>t.dead)){waiting=true;nextWave=2.8;say('Onda superada!',2.4)}
  if(waiting){
    nextWave-=dt;
    if(nextWave<=0){waiting=false;wave++;P.hp=Math.min(3,P.hp+1);P.blades=8;P.reload=0;P.gas=100;T=[];spawn();say('Onda '+wave,2)}
  }
  T=T.filter(t=>t.dead<3);
  for(const p of F){p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt}
  F=F.filter(p=>p.l>0);
  for(const f of FX)f.l-=dt;
  FX=FX.filter(f=>f.l>0);
}
function drawT(t){
  ctx.save();ctx.translate(t.x,G);
  let al=1;
  if(t.dead){ctx.rotate(-t.dir*Math.min(1.5,t.dead*1.3));al=Math.max(0,1-t.dead/2.8)}
  ctx.globalAlpha=al;ctx.scale(t.dir,1);
  const h=t.h,s=Math.sin(t.step),skin=t.fast?'#d98c7a':'#dcae92',dk=t.fast?'#a95a4c':'#b0805f';
  ctx.fillStyle=dk;ctx.fillRect(-h*.12+s*h*.06,-h*.42,h*.1,h*.42);
  ctx.fillStyle=skin;ctx.fillRect(h*.02-s*h*.06,-h*.42,h*.1,h*.42);
  ctx.beginPath();ctx.moveTo(-h*.15,-h*.4);ctx.lineTo(h*.15,-h*.4);ctx.lineTo(h*.17,-h*.78);ctx.lineTo(-h*.17,-h*.78);ctx.fill();
  ctx.fillStyle='#4a3b2c';ctx.fillRect(-h*.15,-h*.44,h*.3,h*.08);
  const p=t.wind>0?1-t.wind/.5:0,hx=(h*.1+s*h*.05)*(1-p)+h*.38*p,hy=-h*.44*(1-p)-h*.55*p;
  ctx.strokeStyle=skin;ctx.lineWidth=h*.07;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(0,-h*.74);ctx.lineTo(hx,hy);ctx.stroke();
  const cx=h*.06,cy=-h*.9,r=h*.12;
  ctx.fillStyle=skin;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();
  ctx.fillStyle='#3a2a22';ctx.beginPath();ctx.arc(cx,cy,r*1.03,Math.PI*.5,Math.PI*1.5);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx+r*.45,cy-r*.15,r*.2,0,7);ctx.fill();
  ctx.fillStyle='#222';ctx.beginPath();ctx.arc(cx+r*.5,cy-r*.15,r*.09,0,7);ctx.fill();
  ctx.strokeStyle='#5a2a2a';ctx.lineWidth=Math.max(1.5,h*.012);ctx.beginPath();ctx.moveTo(cx+r*.2,cy+r*.45);ctx.lineTo(cx+r*.75,cy+r*.4);ctx.stroke();
  if(!t.dead){ctx.fillStyle='rgba(255,60,60,'+(.4+.35*Math.sin(now*6))+')';ctx.beginPath();ctx.arc(cx-r*.85,cy+r*.55,r*.5,0,7);ctx.fill()}
  ctx.restore();
}
function draw(){
  ctx.setTransform(dpr*S,0,0,dpr*S,0,0);
  const g=ctx.createLinearGradient(0,0,0,G);g.addColorStop(0,'#1a2342');g.addColorStop(.6,'#6b4a6e');g.addColorStop(1,'#f2a36b');
  ctx.fillStyle=g;ctx.fillRect(0,0,VW,VH);
  ctx.fillStyle='#ffd9a0';ctx.beginPath();ctx.arc(VW*.75,G-90,46,0,7);ctx.fill();
  ctx.fillStyle='#3a3350';ctx.fillRect(0,G-250,VW,250);
  ctx.fillStyle='#2e2842';const off=-(cam*.3)%70;
  for(let x=off;x<VW;x+=70)ctx.fillRect(x,G-250,3,250);
  ctx.fillStyle='#4a4260';ctx.fillRect(0,G-256,VW,8);
  ctx.fillStyle='#2b2540';ctx.beginPath();ctx.moveTo(0,G);
  for(let x=0;x<=VW;x+=20){const wx=x+cam*.5;ctx.lineTo(x,G-50-Math.sin(wx*.008)*30-Math.sin(wx*.021)*14)}
  ctx.lineTo(VW,G);ctx.fill();
  const sx=(Math.random()-.5)*shake*30,sy=(Math.random()-.5)*shake*30;
  ctx.save();ctx.translate(-cam+sx,sy);
  ctx.fillStyle='#1d1a22';ctx.fillRect(cam-60,G,VW+120,VH-G+60);
  ctx.fillStyle='#2f3d2a';ctx.fillRect(cam-60,G,VW+120,6);
  for(const b of B){
    if(b.x+b.w<cam-60||b.x>cam+VW+60)continue;
    ctx.fillStyle='#3b2f38';ctx.fillRect(b.x,b.y,b.w,G-b.y);
    ctx.fillStyle='#7a3a3a';ctx.fillRect(b.x-6,b.y-8,b.w+12,10);
    for(let i=0;i<12;i++){
      const wx=b.x+12+(i%3)*((b.w-24)/3),wy=b.y+24+(i/3|0)*34;
      if(wy>G-40)continue;
      ctx.fillStyle=b.win[i]?'#ffcf6b':'#241d26';ctx.fillRect(wx,wy,14,18);
    }
  }
  if(P){
    for(const t of T)drawT(t);
    if(P.hook){
      const a=anc(P.hook);
      ctx.strokeStyle='#d5dbea';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(P.x,P.y);ctx.lineTo(a.x,a.y);ctx.stroke();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(a.x,a.y,3,0,7);ctx.fill();
    }
    const spd=Math.hypot(P.vx,P.vy);
    if(P.trail.length>1){
      ctx.strokeStyle='rgba(255,255,255,'+Math.min(.5,spd/700)+')';ctx.lineWidth=4;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(P.trail[0].x,P.trail[0].y);for(const q of P.trail)ctx.lineTo(q.x,q.y);ctx.stroke();
    }
    if(P.inv<=0||Math.floor(now*20)%2){
      ctx.fillStyle='#2f6b3a';ctx.beginPath();ctx.moveTo(P.x-4,P.y-6);ctx.lineTo(P.x+4,P.y-6);ctx.lineTo(P.x-P.vx*.04,P.y-P.vy*.04+10);ctx.fill();
      ctx.fillStyle='#5a4a3a';ctx.fillRect(P.x-5,P.y-6,10,16);
      ctx.fillStyle='#e8d9c0';ctx.beginPath();ctx.arc(P.x,P.y-12,5,0,7);ctx.fill();
      if(spd>200&&P.reload<=0){
        const a=Math.atan2(P.vy,P.vx);ctx.strokeStyle='#e8f0ff';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(P.x,P.y-2);ctx.lineTo(P.x+Math.cos(a-.25)*26,P.y-2+Math.sin(a-.25)*26);
        ctx.moveTo(P.x,P.y-2);ctx.lineTo(P.x+Math.cos(a+.25)*26,P.y-2+Math.sin(a+.25)*26);ctx.stroke();
      }
    }
    for(const f of FX){
      if(f.k==='slash'){const c=Math.cos(f.a+1.2),s=Math.sin(f.a+1.2);ctx.strokeStyle='rgba(255,255,255,'+f.l/.3+')';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(f.x-c*70,f.y-s*70);ctx.lineTo(f.x+c*70,f.y+s*70);ctx.stroke()}
      else{ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(f.x1,f.y1);ctx.lineTo(f.x2,f.y2);ctx.stroke()}
    }
    for(const p of F){ctx.fillStyle='rgba('+p.c+','+Math.min(.6,p.l*.5)+')';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill()}
  }
  ctx.restore();
  hud();
}
function txt(s,x,y,sz,col,al){ctx.font='bold '+sz+'px system-ui,sans-serif';ctx.textAlign=al||'left';ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillText(s,x+1.5,y+1.5);ctx.fillStyle=col||'#fff';ctx.fillText(s,x,y)}
function hud(){
  if(!P)return;
  for(let i=0;i<3;i++)txt('♥',14+i*26,30,26,i<P.hp?'#ff4d5e':'#4a3a44');
  ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(14,42,150,12);
  ctx.fillStyle=P.gas>25?'#6fd0ff':'#ff9a5a';ctx.fillRect(14,42,150*P.gas/100,12);
  txt('Gás',170,53,12,'#cfe');
  txt(P.reload>0?'Trocando lâminas…':'Lâminas '+'▮'.repeat(P.blades),14,76,14,P.reload>0?'#ffb36b':'#fff');
  txt('Onda '+wave,VW-14,28,18,'#fff','right');
  txt(score+' pts',VW-14,50,16,'#ffd98a','right');
  txt('Recorde '+Math.max(best,score),VW-14,70,12,'#bbb','right');
  const alive=T.filter(t=>!t.dead);
  txt('Gigantes: '+alive.length,VW-14,90,13,'#ff9a9a','right');
  let l=0,r=0;for(const t of alive){const s=t.x-cam;if(s<0)l++;else if(s>VW)r++}
  if(l)txt('◀ '+l,10,VH/2,20,'#ff7a7a');
  if(r)txt(r+' ▶',VW-10,VH/2,20,'#ff7a7a','right');
  if(combo>1)txt('COMBO x'+combo,VW/2,VH-24,22,'#ffd98a','center');
  if(msgT>0)txt(msg,VW/2,130,26,'#fff','center');
  if(P.gas<=0&&st==='play')txt('SEM GÁS!',VW/2,VH-54,18,'#ff9a5a','center');
  if(touchDev&&st==='play'){
    ctx.globalAlpha=.35;ctx.fillStyle='#fff';
    for(const[n,x,y,lb]of [['l',70,VH-70,'◀'],['r',170,VH-70,'▶'],['b',VW-80,VH-80,'⚡']]){ctx.beginPath();ctx.arc(x,y,40,0,7);ctx.fill()}
    ctx.globalAlpha=1;txt('◀',70,VH-60,26,'#111','center');txt('▶',170,VH-60,26,'#111','center');txt('⚡',VW-80,VH-70,28,'#111','center');
  }
  if(st!=='play'){
    ctx.fillStyle='rgba(8,10,20,.72)';ctx.fillRect(0,0,VW,VH);
    const c=VW/2;
    if(st==='menu'){
      txt('CAÇADORES DE GIGANTES',c,150,Math.min(44,VW/14),'#ffd98a','center');
      txt('Use o equipamento de manobra e corte a nuca dos gigantes.',c,200,17,'#fff','center');
      txt(touchDev?'Toque na tela: lançar gancho (segure para manter)':'Mouse: segure o clique para lançar o gancho',c,250,16,'#cfe','center');
      txt(touchDev?'⚡ impulso  |  ◀ ▶ mover':'ESPAÇO: impulso/recolher corda  |  A / D: mover',c,278,16,'#cfe','center');
      txt('Corte a nuca (ponto vermelho) em ALTA velocidade!',c,318,16,'#ff9a9a','center');
      txt('Cuidado com as mãos deles e fique longe do chão.',c,344,15,'#ddd','center');
      txt(touchDev?'Toque para começar':'Clique ou aperte ENTER para começar',c,410,22,'#fff','center');
    }else{
      txt('VOCÊ CAIU',c,190,44,'#ff6b6b','center');
      txt(score+' pontos  |  Onda '+wave,c,240,22,'#fff','center');
      txt('Recorde: '+best,c,272,18,'#ffd98a','center');
      txt(touchDev?'Toque para tentar de novo':'Clique ou ENTER para tentar de novo',c,340,20,'#fff','center');
    }
  }
}
function startGame(){if(st==='over'&&now-overAt<1)return;reset();st='play'}
addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();keys[k]=true;
  if(k===' '||k.startsWith('arrow'))e.preventDefault();
  if(st!=='play'&&(k==='enter'||k===' '))startGame();
});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
cv.addEventListener('mousemove',e=>{m.touch=false;m.x=e.offsetX;m.y=e.offsetY});
cv.addEventListener('mousedown',e=>{m.touch=false;m.x=e.offsetX;m.y=e.offsetY;if(st!=='play')return startGame();fire(m.x/S+cam,m.y/S)});
addEventListener('mouseup',()=>{if(P)P.hook=null});
const btns=[['l',70,VH-70],['r',170,VH-70],['b',VW-80,VH-80]];
function pos(t){const rc=cv.getBoundingClientRect();return{cx:t.clientX-rc.left,cy:t.clientY-rc.top}}
function onBtn(t){const p=pos(t),x=p.cx/S,y=p.cy/S;for(const[n,bx,by]of [['l',70,VH-70],['r',170,VH-70],['b',VW-80,VH-80]])if(D(x,y,bx,by)<50)return n;return null}
function flags(e){tb.l=tb.r=tb.b=0;for(const t of e.touches){const n=onBtn(t);if(n)tb[n]=1}}
cv.addEventListener('touchstart',e=>{
  e.preventDefault();m.touch=true;
  if(st!=='play'){startGame();return}
  for(const t of e.changedTouches){
    if(onBtn(t))continue;
    const p=pos(t);m.x=p.cx;m.y=p.cy;aimId=t.identifier;fire(m.x/S+cam,m.y/S);
  }
  flags(e);
},{passive:false});
cv.addEventListener('touchmove',e=>{e.preventDefault();flags(e)},{passive:false});
function tend(e){
  e.preventDefault();flags(e);
  for(const t of e.changedTouches)if(t.identifier===aimId){if(P)P.hook=null;aimId=null}
}
cv.addEventListener('touchend',tend,{passive:false});
cv.addEventListener('touchcancel',tend,{passive:false});
let last=0;
function loop(ts){
  const dt=Math.min(.033,(ts-last)/1000||0);last=ts;now=ts/1000;
  if(st==='play'){update(dt/2);if(st==='play')update(dt/2)}
  if(P){const tx=P.x-VW/2+P.vx*.25;cam+=(tx-cam)*Math.min(1,6*dt);cam=Math.max(-100,Math.min(WW-VW+100,cam))}
  shake=Math.max(0,shake-dt);hint-=dt;msgT-=dt;
  draw();requestAnimationFrame(loop);
}
m.x=VW*S/2;m.y=VH*S/3;
reset();requestAnimationFrame(loop);