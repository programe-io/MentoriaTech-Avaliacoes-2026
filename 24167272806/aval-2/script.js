<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>School-Kira 🎒</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    font-family: 'Segoe UI', Arial, sans-serif;
    color:#fff; min-height:100vh;
    display:flex; flex-direction:column; align-items:center;
    padding:20px; user-select:none;
  }
  h1 {
    font-size:2.4rem; letter-spacing:2px;
    text-shadow: 0 3px 10px rgba(0,0,0,.5);
    margin-bottom:6px;
  }
  h1 span { color:#ffd93d; }
  .subtitle { opacity:.85; margin-bottom:14px; font-size:.95rem; }
  #hud {
    display:flex; gap:18px; background:rgba(0,0,0,.35);
    padding:8px 22px; border-radius:30px; margin-bottom:12px;
    font-weight:bold; font-size:1.05rem;
  }
  #hud b { color:#ffd93d; }
  canvas {
    background: linear-gradient(#87CEEB 0%, #87CEEB 55%, #7ec850 55%, #7ec850 100%);
    border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,.45);
    max-width:100%;
  }
  .controls { margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
  .controls button {
    background:#ffd93d; color:#333; border:none; padding:10px 22px;
    border-radius:25px; font-weight:bold; font-size:1rem; cursor:pointer;
    transition: transform .15s, box-shadow .15s;
  }
  .controls button:hover { transform:scale(1.07); box-shadow:0 4px 14px rgba(255,217,61,.5); }
  .hint { margin-top:10px; font-size:.85rem; opacity:.75; }
</style>
<base target="_blank">
</head>
<body>
  <h1>🏫 School-<span>Kira</span></h1>
  <div class="subtitle">Pule, colete estrelas e enfrente a temida Diretora! 5 fases te esperam!</div>
  <div id="hud">
    <div>🎮 Fase: <b id="uiLevel">1</b>/5</div>
    <div>⭐ Estrelas: <b id="uiStars">0</b></div>
    <div>❤️ Vidas: <b id="uiLives">3</b></div>
    <div>🏆 Pontos: <b id="uiScore">0</b></div>
    <div>⚔️ Espada: <b id="uiSword">—</b></div>
    <div>🏅 Recorde: <b id="uiBest">0</b></div>
  </div>
  <canvas id="game" width="960" height="540"></canvas>
  <div class="controls">
    <button id="btnStart">▶ Começar</button>
    <button id="btnRestart">🔄 Reiniciar</button>
    <button id="btnHard">🌙 Hard: OFF</button>
  </div>
  <div class="hint">← → ou A/D para mover &nbsp;|&nbsp; Espaço / ↑ / W para pular (2x = pulo duplo! ✨) &nbsp;|&nbsp; X/J atacar ⚔️ &nbsp;|&nbsp; P para pausar</div>

<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

const GRAV = 0.6, JUMP = -13.5, SPEED = 4.6;
let keys = {};
let state = 'menu'; // menu, playing, paused, levelclear, gameover, victory
let levelIndex = 0, lives = 3, score = 0, totalStars = 0, levelStars = 0;
let camX = 0, frame = 0;
let particles = [];

/* ---------- NÍVEIS ---------- */
// S = estrela, E = inimigo patrulha, C = professor que persegue, G = meta (bandeira)
const levels = [
  { name:'Fase 1 - Pátio da Escola',
    grid: [
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '              S        S                                                ',
      '           =====    =====            S        S        G                ',
      '                                              =====    ====             ',
      '      S              E                              E                   ',
      '    =====        =========        S    S     ==========               ',
      '                                                        E               ',
      '   P              S        ======      ======        ==========       ',
      '########    ####         ########    ########    ################    ##',
      '########    ####         ########    ########    ################    ##',
    ],
    worldW: 72 * 40, sky:['#87CEEB','#7ec850']
  },
  { name:'Fase 2 - Corredores',
    grid: [
      '                                                                          ',
      '                                                                          ',
      '    S         S         S                                                 ',
      '  =====     =====     =====          S      S      S       G              ',
      '                                   =====   =====  =====   ====            ',
      '         E                 E                 E                            ',
      '     ==========      ==========      ============        E                ',
      '  P        S    S          S    S         S    S      ==========        ',
      '########        ######        ######         ######              ####    ',
      '########        ######        ######         ######              ####    ',
      '########        ######        ######         ######              ####    ',
      '########        ######        ######         ######              ####    ',
    ],
    worldW: 76 * 40, sky:['#b8860b','#8B4513']
  },
  { name:'Fase 3 - Telhado (Final!)',
    grid: [
      '                                                                            ',
      '   S    S    S         S    S    S          S    S    S      G            ',
      ' ===== ===== =====   ===== ===== =====    ===== ===== =====  ====         ',
      '                          E          E              E                       ',
      '      E             ==========  ==========    ==========      E            ',
      '  P        S   S          S         S   S         S   S    ==========     ',
      '#####        #####        #####        #####        #####           ####   ',
      '#####        #####        #####        #####        #####           ####   ',
      '#####        #####        #####        #####        #####           ####   ',
    ],
    worldW: 76 * 40, sky:['#2c003e','#ff6b6b']
  },
  { name:'Fase 4 - Biblioteca',
    grid: [
      '                                                                                 ',
      '                                                                                 ',
      '  S        S        S        S        S        S        S        S        G      ',
      '=======  =======  =======  ======  ======  ======  ======  ======   =====        ',
      '           E              E              E              E                        ',
      '   E    ==========   ===========   ===========   ===========    E                ',
      '========      S    S      S    S       S   S      S    S      ===========        ',
      '                                                                                 ',
      '  P         ========      =========      =========      =========     ####       ',
      '########          ######         ######         ######         ###### ####       ',
      '########          ######         ######         ######         ###### ####       ',
      '########          ######         ######         ######         ###### ####       '
    ],
    worldW: 3240, sky:['#191970','#4b0082']
  },
  { name:'Fase 5 - Sala da Diretora (CHEFE!)',
    grid: [
      '                                                     ',
      '                                                     ',
      '                                                     ',
      '          K                                          ',
      '        ======                                       ',
      '                                                     ',
      '                             B                       ',
      '                                                     ',
      '  P                                                  ',
      '##################################################   ',
      '##################################################   ',
      '##################################################   '
    ],
    worldW: 2120, sky:['#3d0000','#8b0000']
  }
];

function makeBoss(type,x,y){
  const b={diretora:{hp:6,speed:1.15,emoji:'👩‍🏫'},diretor:{hp:10,speed:1.75,emoji:'😈'}}[type];
  const bonus=(hardMode&&type==='diretora')?2:0;
  return {type,x,y,w:42,h:48,vx:0,vy:0,hp:b.hp+bonus,maxHp:b.hp+bonus,speed:b.speed,cool:50,inv:0,dead:false,emoji:b.emoji};
}

function genEndlessLevel(n){
  const ROWS=12, COLS=84;
  const g=Array.from({length:ROWS},()=>Array(COLS).fill(' '));
  let c=0;
  while(c<COLS){
    if(c>5 && Math.random()<0.16){ c += 2+Math.min(3,Math.floor(n/3)+1); continue; }
    g[ROWS-1][c]='#'; g[ROWS-2][c]='#'; c++;
  }
  g[ROWS-3][1]='P';
  for(let i=0;i<10+Math.min(8,n);i++){
    const px=8+Math.floor(Math.random()*(COLS-22));
    const py=2+Math.floor(Math.random()*5);
    const len=3+Math.floor(Math.random()*4);
    for(let k=0;k<len;k++) g[py][px+k]='=';
    if(Math.random()<0.6) g[py-1][px+Math.floor(len/2)]='S';
    if(Math.random()<Math.min(0.7,0.25+n*0.05)) g[py-1][px]='E';
  }
  if(n>=3) for(let i=0;i<Math.min(4,n-2);i++){ g[ROWS-4][22+Math.floor(Math.random()*(COLS-34))]='C'; }
  const isBossLevel = (n%5===0);
  if(isBossLevel){
    const bx=Math.floor(COLS/2)+10;
    g[ROWS-1][bx]='#'; g[ROWS-2][bx]='#'; g[ROWS-4][bx]='B';
  } else {
    g[ROWS-1][COLS-3]='#'; g[ROWS-2][COLS-3]='#'; g[ROWS-4][COLS-3]='G';
  }
  return { name:(isBossLevel?'😈 CHEFE - Fase ':'🌀 Fase ')+(5+n)+' - Modo Infinito',
           grid:g.map(r=>r.join('')), worldW:COLS*40, sky:['#0f2027','#2c5364'], endlessN:n };
}

const TILE = 40;
let platforms=[], stars=[], enemies=[], chasers=[], goal=null, player=null;
let boss=null, swordItem=null, projs=[];
let hardMode=false, endless=false, endlessCount=0, carried=false, best=0;
try{ best = parseInt(localStorage.getItem('schoolKiraBest'))||0; }catch(e){}
let currentLevel = null;

function loadLevel(i){
  currentLevel = levels[i];
  platforms=[]; stars=[]; enemies=[]; chasers=[]; goal=null;
  const g = currentLevel.grid;
  for(let r=0;r<g.length;r++){
    for(let c=0;c<g[r].length;c++){
      const ch = g[r][c];
      const x=c*TILE, y=r*TILE;
      if(ch==='#') platforms.push({x,y,w:TILE,h:TILE});
      if(ch==='S') stars.push({x:x+20,y:y+20, taken:false, bob:Math.random()*6});
      if(ch==='E') enemies.push({x,y:y+TILE-34,w:34,h:34,vx:hardMode?2.2:1.4,min:c*TILE-70,max:c*TILE+70});
      if(ch==='C') chasers.push({x,y,w:34,h:34,vx:0});
      if(ch==='G') goal={x:x+10,y:y-30,w:50,h:110};
      if(ch==='K') swordItem={x:x+4,y:y+4,w:32,h:32,taken:false};
      if(ch==='B') boss=makeBoss(currentLevel.endlessN?'diretor':'diretora', x, y+TILE-48);
      if(ch==='P') player={x,y,w:32,h:38,vx:0,vy:0,onGround:false,inv:0,jumps:0,dir:1,slash:0};
    }
  }
  camX=0; levelStars=0; boss=null; swordItem=null; projs=[]; p_dir=1;
  if(player) player.hasSword = carried;
}

/* ---------- CONTROLES ---------- */
addEventListener('keydown', e=>{
  keys[e.key.toLowerCase()]=true;
  if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) e.preventDefault();
  if(e.key.toLowerCase()==='p' && state==='playing') state='paused';
  else if(e.key.toLowerCase()==='p' && state==='paused') state='playing';
  if(e.key==='Enter' && state==='victory'){ if(endless) startGame(); else enterEndless(); }
  if(e.key==='Enter' && (state==='menu'||state==='gameover')) startGame();
});
addEventListener('keyup', e=> keys[e.key.toLowerCase()]=false);

document.getElementById('btnStart').onclick = ()=>{ if(state==='menu'||state==='gameover'||state==='victory') startGame(); };
document.getElementById('btnRestart').onclick = startGame;
document.getElementById('btnHard').onclick = function(){
  hardMode = !hardMode;
  this.textContent = hardMode ? '🌙 Hard: ON' : '🌙 Hard: OFF';
  this.style.background = hardMode ? '#ff5252' : '#ffd93d';
  this.style.color = hardMode ? '#fff' : '#333';
};

function startGame(){
  lives = hardMode?2:3; score=0; totalStars=0; levelIndex=0;
  endless=false; endlessCount=0; carried=false;
  loadLevel(0); state='playing';
}

function enterEndless(){
  endless=true; endlessCount=1; levelIndex=4;
  loadLevel(genEndlessLevel(1)); state='playing';
}

function saveBest(){
  if(score>best){ best=score; try{ localStorage.setItem('schoolKiraBest', best); }catch(e){} }
}

function nextLevel(){
  if(endless){ endlessCount++; loadLevel(genEndlessLevel(endlessCount)); state='playing'; return; }
  levelIndex++;
  if(levelIndex>=levels.length){ state='victory'; return; }
  loadLevel(levelIndex); state='playing';
}

/* ---------- FÍSICA ---------- */
function rects(a,b){ return a.x<b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y; }

function update(){
  if(state!=='playing'){ if(state==='gameover'||state==='victory') saveBest(); return; }
  frame++;
  const p = player;
  // movimento
  p.vx = 0;
  if(keys['arrowleft']||keys['a']) p.vx = -SPEED;
  if(keys['arrowright']||keys['d']) p.vx = SPEED;
  if(p.vx<0) p.dir=-1; else if(p.vx>0) p.dir=1;
  const jumpKey = keys[' ']||keys['arrowup']||keys['w'];
  if(jumpKey && !p.jumpHeld && (p.onGround || p.jumps < 2)){
    p.vy = JUMP; p.onGround=false; p.jumps++; p.jumpHeld=true;
    if(p.jumps===2){ for(let i=0;i<6;i++) particles.push({x:p.x+16,y:p.y+p.h,vx:(Math.random()-.5)*3,vy:Math.random()*2,life:20}); }
  }
  if(!jumpKey) p.jumpHeld=false;
  p.vy += GRAV; if(p.vy>16) p.vy=16;

  // horizontal
  p.x += p.vx;
  platforms.forEach(pl=>{ if(rects(p,pl)){ p.x = p.vx>0? pl.x-p.w : pl.x+pl.w; } });
  // vertical
  p.y += p.vy; p.onGround=false;
  platforms.forEach(pl=>{ if(rects(p,pl)){
    if(p.vy>0){ p.y=pl.y-p.h; p.vy=0; p.onGround=true; p.jumps=0; }
    else if(p.vy<0){ p.y=pl.y+pl.h; p.vy=0; }
  }});

  // caiu no buraco
  if(p.y > H+80){
    lives--; 
    if(lives<=0){ state='gameover'; }
    else { p.x=60; p.y=0; p.vy=0; }
  }

  // estrelas
  stars.forEach(s=>{
    if(!s.taken && Math.abs(p.x+16-s.x)<30 && Math.abs(p.y+19-s.y)<34){
      s.taken=true; score+=100; levelStars++; totalStars++;
    }
  });

  // inimigos patrulha
  enemies.forEach(e=>{
    e.x += e.vx;
    if(e.x<e.min || e.x>e.max) e.vx*=-1;
    if(rects(p,e)){
      if(p.vy>0 && p.y+p.h-e.y < 20){ // pulou em cima
        e.dead=true; p.vy=-9; score+=200;
      } else if(p.inv<=0){
        lives--; p.inv=90;
        if(lives<=0){ state='gameover'; }
        else { p.x=Math.max(40,p.x-90); p.vy=-6; }
      }
    }
  });
  enemies = enemies.filter(e=>!e.dead);

  // professores perseguidores (fase 2+)
  chasers.forEach(c=>{
    const dx = p.x - c.x;
    const chA = hardMode?0.14:0.08, chM = hardMode?3.1:2.2;
    c.vx += Math.sign(dx)*chA; c.vx = Math.max(-chM, Math.min(chM, c.vx));
    c.x += c.vx;
    platforms.forEach(pl=>{ if(rects(c,pl)){ c.x -= c.vx; c.vx*=-0.5; } });
    if(rects(p,c)){
      if(p.vy>0 && p.y+p.h-c.y < 20){ c.dead=true; p.vy=-9; score+=300; }
      else if(p.inv<=0){
        lives--; p.inv=90;
        if(lives<=0){ state='gameover'; }
        else { p.x=Math.max(40,p.x-120); p.vy=-6; }
      }
    }
  });
  chasers = chasers.filter(c=>!c.dead);

  // ---------- ESPADA ----------
  if(swordItem && !swordItem.taken && rects(p,swordItem)){
    swordItem.taken=true; p.hasSword=true; carried=true; score+=150;
    for(let i=0;i<10;i++) particles.push({x:swordItem.x+16,y:swordItem.y+16,vx:(Math.random()-.5)*4,vy:-Math.random()*3,life:25});
  }
  const atkKey = keys['x']||keys['j'];
  if(atkKey && p.hasSword && !p.atkHeld){ p.atkHeld=true; p.slash=10; }
  if(!atkKey) p.atkHeld=false;
  let hitbox=null;
  if(p.slash>0){
    p.slash--;
    hitbox={x: p.dir>0? p.x+p.w-4 : p.x-42, y:p.y-6, w:46, h:46};
    enemies.forEach(e=>{ if(rects(hitbox,e)){ e.dead=true; score+=200; p.vy=-6;
      for(let i=0;i<5;i++) particles.push({x:e.x+17,y:e.y+10,vx:(Math.random()-.5)*3,vy:-Math.random()*2,life:18}); }});
    chasers.forEach(c=>{ if(rects(hitbox,c)){ c.dead=true; score+=300; p.vy=-6; }});
  }
  enemies = enemies.filter(e=>!e.dead);
  chasers = chasers.filter(c=>!c.dead);

  // ---------- BOSS: A DIRETORA ----------
  if(boss && !boss.dead){
    if(boss.inv>0) boss.inv--;
    const bdx = (p.x+p.w/2)-(boss.x+boss.w/2);
    boss.vx = Math.sign(bdx)*boss.speed;
    let blocked=false;
    boss.x += boss.vx;
    platforms.forEach(pl=>{ if(rects(boss,pl)){ boss.x -= boss.vx; blocked=true; } });
    boss.vy += GRAV; if(boss.vy>16) boss.vy=16;
    boss.y += boss.vy;
    let bGround=false;
    platforms.forEach(pl=>{ if(rects(boss,pl)){ if(boss.vy>0){ boss.y=pl.y-boss.h; boss.vy=0; bGround=true; } else { boss.y=pl.y+pl.h; boss.vy=0; } } });
    if(blocked && bGround) boss.vy = -11; // pula obstáculos
    // joga livros 📚
    boss.cool--;
    if(boss.cool<=0 && Math.abs(bdx)<620){
      projs.push({x:boss.x+boss.w/2, y:boss.y+10, vx:Math.sign(bdx)*4.6, vy:-2.5});
      if(boss.type==='diretor') projs.push({x:boss.x+boss.w/2, y:boss.y+10, vx:Math.sign(bdx)*3.6, vy:-5});
      boss.cool = boss.type==='diretor'?60:100;
    }
    // jogador encosta na chefe
    if(rects(p,boss)){
      const stomp = p.vy>0 && (p.y+p.h-boss.y)<22;
      if(stomp){ hurtBoss(1); p.vy=-10; }
      else if(p.slash>0 && hitbox){ /* dano via hitbox abaixo */ }
      else if(p.inv<=0){ lives--; p.inv=90; p.x=Math.max(40,p.x-140); p.vy=-7;
        if(lives<=0) state='gameover'; }
    }
    if(hitbox && rects(hitbox,boss)) hurtBoss(1);
  }

  // ---------- PROJÉTEIS (livros) ----------
  projs.forEach(pr=>{ pr.vy+=0.12; pr.x+=pr.vx; pr.y+=pr.vy; });
  projs = projs.filter(pr=>{
    if(pr.x<camX-60 || pr.x>camX+W+60 || pr.y>H+60) return false;
    for(const pl of platforms){ if(pr.x>pl.x && pr.x<pl.x+pl.w && pr.y>pl.y && pr.y<pl.y+pl.h) return false; }
    if(p.inv<=0 && pr.x>p.x && pr.x<p.x+p.w && pr.y>p.y && pr.y<p.y+p.h){
      lives--; p.inv=90; if(lives<=0) state='gameover';
      return false;
    }
    return true;
  });

  // meta
  if(goal && rects(p,goal)){ score+=500; state='levelclear'; }

  // partículas
  particles.forEach(pt=>{ pt.x+=pt.vx; pt.y+=pt.vy; pt.vy+=0.15; pt.life--; });
  particles = particles.filter(pt=>pt.life>0);

  if(p.inv>0) p.inv--;
  // câmera
  camX = Math.max(0, Math.min(currentLevel.worldW - W, p.x - W/2 + p.w/2));
  updateHUD();
}

function hurtBoss(dmg){
  if(!boss || boss.dead || boss.inv>0) return;
  boss.hp -= dmg; boss.inv = 35; boss.vx = (player.x<boss.x? 3 : -3); boss.x += boss.vx*6;
  for(let i=0;i<8;i++) particles.push({x:boss.x+21,y:boss.y+20,vx:(Math.random()-.5)*4,vy:-Math.random()*3,life:20});
  if(boss.hp<=0){
    boss.dead=true; score+=1000;
    for(let i=0;i<25;i++) particles.push({x:boss.x+21,y:boss.y+24,vx:(Math.random()-.5)*7,vy:-Math.random()*5,life:35});
    setTimeout(()=>{
      if(boss.type==='diretora'){ state='victory'; }
      else { score+=2000; state='levelclear'; }
    }, 500);
  }
}

function updateHUD(){
  document.getElementById('uiLevel').textContent = endless? (5+endlessCount)+'🌀' : levelIndex+1;
  document.getElementById('uiStars').textContent = totalStars;
  document.getElementById('uiLives').textContent = lives;
  document.getElementById('uiScore').textContent = score;
  document.getElementById('uiSword').textContent = (player&&player.hasSword)?'SIM!':'—';
  document.getElementById('uiBest').textContent = best;
}

/* ---------- DESENHO ---------- */
function draw(){
  const g = currentLevel || levels[0];
  // céu
  const grad = ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0, g.sky[0]); grad.addColorStop(1, g.sky[1]);
  ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);

  // sol / lua
  ctx.font='44px serif'; ctx.fillText(levelIndex===2?'🌙':'☀️', W-80, 60);

  ctx.save();
  ctx.translate(-camX,0);

  // plataformas
  platforms.forEach(pl=>{
    ctx.fillStyle = levelIndex===2 ? '#a0522d' : (levelIndex===2?'#a0522d':'#5a8f3c');
    ctx.fillStyle = levelIndex===1 ? '#a0522d' : (levelIndex===2 ? '#555' : '#5a8f3c');
    ctx.fillRect(pl.x,pl.y,pl.w,pl.h);
    ctx.fillStyle = levelIndex===1 ? '#cd853f' : (levelIndex===2 ? '#777' : '#7ec850');
    ctx.fillRect(pl.x,pl.y,pl.w,6);
  });

  // estrelas
  ctx.font='28px serif'; ctx.textAlign='center';
  stars.forEach(s=>{
    if(!s.taken){
      const bob = Math.sin(frame*0.08 + s.bob)*4;
      ctx.fillText('⭐', s.x, s.y + bob);
    }
  });

  // inimigos
  enemies.forEach(e=>{ ctx.fillText('😡', e.x+e.w/2, e.y+e.h-4); });
  chasers.forEach(c=>{ ctx.fillText('👨‍🏫', c.x+c.w/2, c.y+c.h-4); });

  // espada 🗡️
  if(swordItem && !swordItem.taken){
    const sBob = Math.sin(frame*0.07)*4;
    ctx.font='34px serif'; ctx.fillText('🗡️', swordItem.x+16, swordItem.y+30+sBob);
    ctx.strokeStyle='rgba(255,217,61,.5)'; ctx.lineWidth=2;
    ctx.strokeRect(swordItem.x-2, swordItem.y-4+sBob, 38, 40);
  }
  // meta
  if(goal){ ctx.font='40px serif'; ctx.fillText('🏁', goal.x+25, goal.y+40); ctx.fillText('🎓', goal.x+25, goal.y+86); }

  // jogador (pisca quando invulnerável)
  if(player && (player.inv===0 || Math.floor(player.inv/6)%2===0)){
    const bounce = player.onGround && (keys['arrowleft']||keys['arrowright']||keys['a']||keys['d']) ? Math.abs(Math.sin(frame*0.25))*3 : 0;
    ctx.font='38px serif';
    ctx.fillText('🧑‍🎓', player.x+16, player.y+player.h-2-bounce);
    if(player.hasSword){
      ctx.font='24px serif';
      ctx.fillText('🗡️', player.x+16 + player.dir*22, player.y+18);
    }
    if(player.slash>0){
      ctx.globalAlpha = player.slash/10;
      ctx.font='36px serif';
      ctx.fillText('💫', player.x+16 + player.dir*30, player.y+10);
      ctx.globalAlpha = 1;
    }
  }
  // projetéis (livros)
  ctx.font='24px serif';
  projs.forEach(pr=> ctx.fillText('📚', pr.x, pr.y));

  // boss 👩‍🏫
  if(boss && !boss.dead){
    if(boss.inv===0 || Math.floor(boss.inv/5)%2===0){
      ctx.font='52px serif';
      ctx.fillText(boss.emoji, boss.x+boss.w/2, boss.y+boss.h-4);
    }
  }

  // partículas de pulo duplo
  particles.forEach(pt=>{
    ctx.globalAlpha = pt.life/20;
    ctx.fillStyle = '#ffd93d';
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  ctx.restore();
  ctx.textAlign='left';

  // barra de HP da Diretora
  if(boss && !boss.dead){
    const bw=300, bx=(W-bw)/2, by=14;
    ctx.fillStyle='rgba(0,0,0,.5)'; ctx.fillRect(bx-4,by-4,bw+8,26);
    ctx.fillStyle='#ff5252'; ctx.fillRect(bx,by,bw*Math.max(0,boss.hp)/boss.maxHp,18);
    ctx.strokeStyle='#fff'; ctx.lineWidth=1.5; ctx.strokeRect(bx,by,bw,18);
    ctx.fillStyle='#fff'; ctx.font='bold 13px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(boss.emoji+(boss.type==='diretora'?' DIRETORA':' DIRETOR'), W/2, by+38);
    ctx.textAlign='left';
  }

  // overlays
  ctx.fillStyle='rgba(0,0,0,.55)';
  ctx.textAlign='center';
  if(state==='menu'){
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 52px Segoe UI';
    ctx.fillText('🏫 School-Kira', W/2, H/2-70);
    ctx.fillStyle='#fff'; ctx.font='22px Segoe UI';
    ctx.fillText('Você é Kira, um aluno aventureiro!', W/2, H/2-20);
    ctx.fillText('Pule pelas plataformas, colete ⭐ e derrote os professores 😡', W/2, H/2+14);
    ctx.fillText('Na fase final: pegue a 🗡️ (ataque com X ou J) e derrote a Diretora 👩‍🏫!', W/2, H/2+48);
    ctx.fillText('Chegue até a 🏁 para passar de fase. São 5 fases!', W/2, H/2+82);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 24px Segoe UI';
    ctx.fillText('Pressione Enter ou clique em Começar', W/2, H/2+122);
  }
  else if(state==='paused'){
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#fff'; ctx.font='bold 44px Segoe UI';
    ctx.fillText('⏸ Pausado', W/2, H/2);
  }
  else if(state==='levelclear'){
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#7ec850'; ctx.font='bold 48px Segoe UI';
    ctx.fillText('✅ '+(endless?('🌀 Fase '+(5+endlessCount)):'Fase '+(levelIndex+1))+' concluída!', W/2, H/2-30);
    ctx.fillStyle='#fff'; ctx.font='24px Segoe UI';
    ctx.fillText('⭐ Estrelas nesta fase: '+levelStars+'   |   🏆 Pontos: '+score, W/2, H/2+14);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 22px Segoe UI';
    ctx.fillText('Pressione Enter para continuar', W/2, H/2+58);
  }
  else if(state==='gameover'){
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ff5252'; ctx.font='bold 52px Segoe UI';
    ctx.fillText('💀 Fim de Jogo', W/2, H/2-20);
    ctx.fillStyle='#fff'; ctx.font='24px Segoe UI';
    ctx.fillText('🏆 Pontuação: '+score+'   |   🏅 Recorde: '+best, W/2, H/2+24);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 22px Segoe UI';
    ctx.fillText('Pressione Enter para tentar novamente', W/2, H/2+66);
  }
  else if(state==='victory'){
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 52px Segoe UI';
    ctx.fillText('🏆 Você derrotou a Diretora e venceu o School-Kira!', W/2, H/2-40);
    ctx.fillStyle='#fff'; ctx.font='24px Segoe UI';
    ctx.fillText('A escola está livre! Kira virou lenda! 🎓✨', W/2, H/2+2);
    ctx.fillText('⭐ Total de estrelas: '+totalStars+'   |   🏆 Pontos: '+score, W/2, H/2+38);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 22px Segoe UI';
    ctx.fillText('🏅 Recorde: '+best+'   |   ⭐ Estrelas: '+totalStars, W/2, H/2+70);
    ctx.fillStyle='#ffd93d'; ctx.font='bold 22px Segoe UI';
    ctx.fillText('Pressione Enter para o MODO INFINITO 🌀', W/2, H/2+104);
  }
  ctx.textAlign='left';
}

/* Enter na tela de fase concluída */
addEventListener('keydown', e=>{
  if(e.key==='Enter' && state==='levelclear') nextLevel();
});

/* ---------- LOOP ---------- */
loadLevel(0); updateHUD();
function loop(){ update(); draw(); requestAnimationFrame(loop); }
loop();
</script>
</body>
</html>