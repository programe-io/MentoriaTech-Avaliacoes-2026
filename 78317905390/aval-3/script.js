const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const GY = 340;              // linha do chão
const GRAV = 0.75, JUMP = -13.5;
const PX = 240, PW = 34;     // posição fixa do personagem
const GAP0 = 200;            // distância inicial do dragão
const $ = id => document.getElementById(id);

const SKINS = {
  bruxa:   { body: '#7b1fa2' },
  soldado: { body: '#607d8b' },
  fada:    { body: '#f06292' }
};

let skin = 'bruxa', state = 'menu', best = 0, frame = 0;
let P, world, scroll, dragon, score, speed, baseSpeed, boost;
const keys = { s: false, d: false };

function reset() {
  P = { y: GY - 50, h: 50, vy: 0, onGround: true };
  world = { obstacles: [], coins: [], fires: [], spawnT: 120, coinT: 60 };
  scroll = { far: 0, mid: 0, ground: 0 };
  dragon = { on: false, gap: GAP0, fireT: 0, banner: 0 };
  score = 0; speed = 5; baseSpeed = 5; boost = 0;
}

function startGame() {
  reset();
  state = 'playing';
  $('menu').classList.add('hidden');
  $('over').classList.add('hidden');
}

function die(msg) {
  state = 'over';
  best = Math.max(best, Math.floor(score));
  $('best').textContent = best;
  $('finalScore').textContent = Math.floor(score);
  $('reason').textContent = msg;
  $('over').classList.remove('hidden');
}

const pitUnder = () => world.obstacles.find(o =>
  (o.type === 'buraco' || o.type === 'rio') && PX < o.x + o.w && PX + PW > o.x);

function spawnObstacle() {
  const types = ['pedra', 'pedra', 'arvore', 'galho', 'buraco', 'rio'];
  const type = types[Math.floor(Math.random() * types.length)];
  const size = {
    pedra: [36, 24], arvore: [36, 70], galho: [90, 22],
    buraco: [62, H - GY], rio: [110, H - GY]
  }[type];
  const pit = type === 'buraco' || type === 'rio';
  const y = pit ? GY : type === 'galho' ? GY - 66 : GY - size[1];
  world.obstacles.push({ type, x: W + 20, y, w: size[0], h: size[1] });
}

function spawnCoins() {
  const y = Math.random() < 0.5 ? GY - 100 : GY - 24; // alto (pular) ou baixo
  const n = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) world.coins.push({ x: W + 20 + i * 34, y });
}

function update() {
  // velocidade: cresce com a pontuação; moedas e a tecla S somam
  baseSpeed = Math.min(9, 5 + score / 120);
  boost *= 0.993;
  speed += (baseSpeed + boost + (keys.s ? 3 : 0) - speed) * 0.08;
  score += speed * 0.025;
  $('score').textContent = Math.floor(score);

  if (!dragon.on && score >= 100) {
    dragon.on = true; dragon.fireT = 60; dragon.banner = 180;
  }
  if (dragon.banner > 0) dragon.banner--;

  // personagem: agachar (D no chão), queda rápida (D no ar), gravidade
  if (P.onGround) { P.h = keys.d ? 24 : 50; P.y = GY - P.h; }
  if (keys.d && !P.onGround) P.vy += 1.2;
  P.vy += GRAV;
  P.y += P.vy;
  if (P.y + P.h >= GY) {
    const pit = pitUnder();
    if (pit) return die(pit.type === 'rio' ? 'Você caiu no rio!' : 'Você caiu no buraco!');
    P.y = GY - P.h; P.vy = 0; P.onGround = true;
  } else P.onGround = false;

  // mundo rola
  scroll.far += speed * 0.2; scroll.mid += speed * 0.5; scroll.ground += speed;
  world.spawnT -= speed;
  if (world.spawnT <= 0) { spawnObstacle(); world.spawnT = 230 + Math.random() * 170; }
  world.coinT -= speed;
  if (world.coinT <= 0) { spawnCoins(); world.coinT = 170 + Math.random() * 170; }
  for (const o of world.obstacles) o.x -= speed;
  for (const c of world.coins) c.x -= speed;
  world.obstacles = world.obstacles.filter(o => o.x + o.w > -10);

  // moedas: +10 pontos e velocidade extra
  for (const c of world.coins) {
    if (c.x > PX - 9 && c.x < PX + PW + 9 && c.y > P.y - 9 && c.y < P.y + P.h + 9) {
      c.taken = true; score += 10; boost = Math.min(boost + 0.5, 4);
    }
  }
  world.coins = world.coins.filter(c => !c.taken && c.x > -20);

  // obstáculos de chão e galhos (buracos e rios são tratados na física)
  for (const o of world.obstacles) {
    if (o.type === 'buraco' || o.type === 'rio') continue;
    if (PX < o.x + o.w && PX + PW > o.x && P.y < o.y + o.h && P.y + P.h > o.y)
      return die('Você bateu em um obstáculo!');
  }

  // dragão: só aparece com 100 pontos, persegue e cospe fogo
  if (dragon.on) {
    dragon.gap += speed - (baseSpeed + 0.45);
    if (dragon.gap < 40) return die('O dragão te alcançou!');
    const dx = PX - dragon.gap;
    if (--dragon.fireT <= 0 && dx > -40 && dx < W) {
      world.fires.push({ x: dx + 62, y: GY - 46, vx: 8 + speed * 0.6 });
      dragon.fireT = 100 + Math.random() * 80;
    }
  }
  for (const f of world.fires) f.x += f.vx;
  world.fires = world.fires.filter(f => f.x < W + 30);
  for (const f of world.fires) {
    if (f.x + 10 > PX && f.x - 10 < PX + PW && f.y + 10 > P.y && f.y - 10 < P.y + P.h)
      return die('O fogo do dragão te queimou!');
  }
}

function drawBackground() {
  const sky = ctx.createLinearGradient(0, 0, 0, GY);
  sky.addColorStop(0, '#5fb8f0'); sky.addColorStop(1, '#d6f5c9');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, GY);

  // floresta distante (parallax)
  ctx.fillStyle = '#2a6b35';
  for (let i = -1; i < 10; i++) {
    const x = i * 110 - (scroll.far % 110);
    ctx.beginPath(); ctx.moveTo(x, GY); ctx.lineTo(x + 55, GY - 130); ctx.lineTo(x + 110, GY); ctx.fill();
  }
  // árvores do meio, mais suaves
  ctx.globalAlpha = 0.55;
  for (let i = -1; i < 10; i++) {
    const x = i * 95 - (scroll.mid % 95);
    ctx.fillStyle = '#5a3a1e'; ctx.fillRect(x + 20, GY - 60, 9, 60);
    ctx.fillStyle = '#3c9a4a'; ctx.beginPath(); ctx.arc(x + 24, GY - 72, 26, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // chão
  ctx.fillStyle = '#4caf50'; ctx.fillRect(0, GY, W, 8);
  ctx.fillStyle = '#7a4e26'; ctx.fillRect(0, GY + 8, W, H - GY - 8);
  ctx.fillStyle = '#5d3a1b';
  for (let i = 0; i < 14; i++)
    ctx.fillRect(((i * 83 - scroll.ground) % W + W) % W, GY + 20 + (i % 3) * 8, 6, 3);
}

function drawObstacle(o) {
  const { type, x, y, w, h } = o;
  ctx.save();
  if (type === 'pedra') {
    ctx.fillStyle = '#8d8d8d';
    ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#bdbdbd';
    ctx.beginPath(); ctx.ellipse(x + w / 2 - 5, y + h / 2 - 5, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
  } else if (type === 'arvore') {
    ctx.fillStyle = '#6b4226'; ctx.fillRect(x + 14, y + 36, 8, h - 36);
    ctx.fillStyle = '#1e6b2e';
    ctx.beginPath(); ctx.arc(x + 18, y + 18, 18, 0, Math.PI * 2); ctx.fill();
  } else if (type === 'galho') {
    ctx.fillStyle = '#6b4226'; ctx.fillRect(x, y + 6, w, 9);
    ctx.fillStyle = '#2e8b3a';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.ellipse(x + 8 + i * 20, y + 4, 9, 6, 0, 0, Math.PI * 2); ctx.fill();
    }
  } else if (type === 'buraco') {
    ctx.fillStyle = '#1b1009'; ctx.fillRect(x, GY, w, h);
    ctx.fillStyle = '#5d3a1b'; ctx.fillRect(x - 4, GY, 4, 8); ctx.fillRect(x + w, GY, 4, 8);
  } else if (type === 'rio') {
    ctx.fillStyle = '#2a7ac7'; ctx.fillRect(x, GY, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, GY + 14);
    for (let i = 6; i <= w; i += 6) ctx.lineTo(x + i, GY + 14 + 3 * Math.sin((i + frame * 2) / 6));
    ctx.stroke();
  }
  ctx.restore();
}

function drawCoin(c) {
  const s = Math.abs(Math.cos(frame * 0.08 + c.x * 0.02));
  ctx.fillStyle = '#ffd54f'; ctx.strokeStyle = '#b8860b'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(c.x, c.y, Math.max(2, 8 * s), 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
}

function drawFire(f) {
  ctx.fillStyle = 'rgba(255,120,0,0.45)';
  ctx.beginPath(); ctx.arc(f.x - 14, f.y, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ff5722';
  ctx.beginPath(); ctx.arc(f.x, f.y, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffeb3b';
  ctx.beginPath(); ctx.arc(f.x + 2, f.y, 5, 0, Math.PI * 2); ctx.fill();
}

function drawDragon() {
  const dx = PX - dragon.gap, dy = GY - 40;
  const flap = Math.sin(frame * 0.25) * 16;
  ctx.save();
  ctx.translate(dx, dy);
  ctx.fillStyle = '#8e1b1b';
  ctx.beginPath(); ctx.moveTo(-8, -12); ctx.lineTo(-22, -52 - flap); ctx.lineTo(14, -12); ctx.fill();
  ctx.fillStyle = '#2e7d32';
  ctx.beginPath(); ctx.moveTo(-36, -4); ctx.lineTo(-78, -16); ctx.lineTo(-38, 10); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 0, 44, 22, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(44, -14, 20, 14, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#eeeeee';
  ctx.beginPath(); ctx.moveTo(34, -24); ctx.lineTo(40, -40); ctx.lineTo(46, -26); ctx.fill();
  ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(48, -18, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(49, -18, 2, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawPlayer() {
  const c = SKINS[skin];
  const run = P.onGround ? Math.sin(frame * 0.35) * 3 : 0;
  ctx.save();
  ctx.translate(PX + PW / 2, GY);
  ctx.scale(1, P.h / 50);            // agachado = personagem achatado

  if (skin === 'fada') {             // asas atrás
    const flap = Math.sin(frame * 0.5) * 0.6;
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.strokeStyle = '#b3e5fc';
    ctx.save(); ctx.translate(-6, -34); ctx.rotate(-0.5 + flap);
    ctx.beginPath(); ctx.ellipse(-12, 0, 13, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  ctx.fillStyle = '#3e2723';         // pernas
  ctx.fillRect(-9, -16 + run, 7, 16 - run);
  ctx.fillRect(2, -16 - run, 7, 16 + run);

  ctx.fillStyle = c.body;            // corpo
  if (skin === 'fada') {
    ctx.beginPath(); ctx.moveTo(-9, -36); ctx.lineTo(9, -36); ctx.lineTo(14, -10); ctx.lineTo(-14, -10); ctx.fill();
  } else {
    ctx.fillRect(-11, -36, 22, 22);
  }

  ctx.fillStyle = '#f1c27d';         // cabeça
  ctx.beginPath(); ctx.arc(0, -42, 8, 0, Math.PI * 2); ctx.fill();

  if (skin === 'bruxa') {
    ctx.fillStyle = '#2b1b3d';
    ctx.beginPath(); ctx.moveTo(-11, -46); ctx.lineTo(11, -46); ctx.lineTo(0, -72); ctx.fill();
    ctx.fillRect(-15, -47, 30, 4);
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(14, -50, 3, 48);
    ctx.fillStyle = '#e040fb'; ctx.beginPath(); ctx.arc(15.5, -52, 4, 0, Math.PI * 2); ctx.fill();
  } else if (skin === 'soldado') {
    ctx.fillStyle = '#90a4ae';
    ctx.beginPath(); ctx.arc(0, -42, 9, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#c62828'; ctx.fillRect(-2, -54, 4, 8);
    ctx.fillStyle = '#1565c0'; ctx.fillRect(-17, -34, 8, 16);
    ctx.fillStyle = '#cfd8dc'; ctx.fillRect(14, -44, 3, 24);
  } else {
    ctx.fillStyle = '#ffd54f';
    ctx.beginPath(); ctx.arc(0, -43, 9, Math.PI, 0); ctx.fill();
    ctx.fillRect(-9, -43, 3, 14);
  }
  ctx.restore();
}

function draw() {
  drawBackground();
  for (const o of world.obstacles) drawObstacle(o);
  for (const c of world.coins) drawCoin(c);
  if (dragon.on) drawDragon();
  for (const f of world.fires) drawFire(f);
  drawPlayer();

  if (dragon.banner > 0) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, dragon.banner / 40);
    ctx.font = 'bold 32px Arial'; ctx.textAlign = 'center';
    ctx.lineWidth = 6; ctx.strokeStyle = '#000';
    ctx.strokeText('O DRAGÃO APARECEU!', W / 2, 70);
    ctx.fillStyle = '#ff5252';
    ctx.fillText('O DRAGÃO APARECEU!', W / 2, 70);
    ctx.restore();
  }
}

function loop() {
  frame++;
  if (state === 'playing') update();
  draw();
  requestAnimationFrame(loop);
}

// seleção de personagem
document.querySelectorAll('.skin').forEach(btn => btn.addEventListener('click', () => {
  skin = btn.dataset.skin;
  document.querySelectorAll('.skin').forEach(b => b.classList.toggle('selected', b === btn));
}));

$('start').addEventListener('click', startGame);
$('restart').addEventListener('click', startGame);
$('back').addEventListener('click', () => {
  state = 'menu';
  reset();
  $('over').classList.add('hidden');
  $('menu').classList.remove('hidden');
});

// controles: ESPAÇO pula, S corre, D abaixa (no chão) ou cai rápido (no ar)
addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k === ' ' || k.startsWith('arrow')) e.preventDefault();
  if (k === 's') keys.s = true;
  if (k === 'd') keys.d = true;
  if (k === ' ' && state === 'playing' && !e.repeat && P.onGround && !keys.d) {
    P.vy = JUMP; P.onGround = false;
  }
  if (k === 'enter' && state !== 'playing') startGame();
});

addEventListener('keyup', e => {
  const k = e.key.toLowerCase();
  if (k === 's') keys.s = false;
  if (k === 'd') keys.d = false;
});

reset();
loop();