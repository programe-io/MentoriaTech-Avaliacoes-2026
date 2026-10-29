/* Shadow Fighters Arena - v1 (Three.js r128, sem build) */
const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const HEX = c => '#' + c.toString(16).padStart(6, '0');

const ROSTER = [
  { n: 'Kai', el: 'Fogo', pw: 'burn', pwN: 'Queimadura', col: 0xff5a1f, acc: 0xffc400, hr: 0x2b0a00, hp: 100, spd: 4.6, str: 1, ex: 'spikes', sh: 'ball' },
  { n: 'Ryuzen', el: 'Elétrico', pw: 'stun', pwN: 'Atordoa', col: 0x1f6fff, acc: 0xfff34a, hr: 0x0a0a14, hp: 100, spd: 5.6, str: 0.9, ex: 'band', sh: 'ball' },
  { n: 'Akira', el: 'Artes marciais', pw: 'combo', pwN: 'Combo crescente', col: 0xeeeeff, acc: 0xa35cff, hr: 0x14101a, hp: 100, spd: 5, str: 1, ex: 'tail', sh: 'ball' },
  { n: 'Titan', el: 'Impacto', pw: 'heavy', pwN: 'Golpe pesado', col: 0x5b6170, acc: 0xff7a1a, hr: 0x111111, hp: 125, spd: 3.2, str: 1.35, ex: 'pads', sh: 'ring', sc: 1.22 },
  { n: 'Shadow', el: 'Sombra', pw: 'lifesteal', pwN: 'Roubo de vida', col: 0x1b1530, acc: 0x8b3dff, hr: 0x08060f, hp: 100, spd: 4.9, str: 1, ex: 'cape', sh: 'ball' },
  { n: 'Frost', el: 'Gelo', pw: 'slow', pwN: 'Congela', col: 0xdff9ff, acc: 0x42d9ff, hr: 0xbff3ff, hp: 100, spd: 4.4, str: 0.95, ex: 'hair', sh: 'ice' }
];
const MOVES = {
  punch: { dur: 0.36, at: [0.12, 0.22], dmg: 7, reach: 1.65, kb: 0.5 },
  kick: { dur: 0.52, at: [0.2, 0.32], dmg: 11, reach: 1.95, kb: 0.9 },
  special: { dur: 0.55, at: [0.22, 0.3], dmg: 16, en: 30, proj: 1 },
  super: { dur: 1.15, at: [0.5, 0.6], dmg: 32, reach: 2.9, en: 100, kb: 1.6 }
};
const ARENAS = [
  { n: 'Cidade Neon', sky: 0x070818, floor: 0x12122c, key: 0x22e5ff, deco: 'neon' },
  { n: 'Templo Noturno', sky: 0x0c0714, floor: 0x3d2016, key: 0xffb36b, deco: 'temple' },
  { n: 'Vulcão', sky: 0x1c0804, floor: 0x2a1612, key: 0xff6a1a, deco: 'lava' },
  { n: 'Floresta Mágica', sky: 0x061510, floor: 0x143a26, key: 0x7dffb0, deco: 'forest' }
];
const MAPS = [
  { l: 'KeyA', r: 'KeyD', f: 'KeyW', b: 'KeyS', j: 'Space', p: 'KeyJ', k: 'KeyK', g: 'KeyL', d: 'ShiftLeft', s: 'KeyQ', u: 'KeyE' },
  { l: 'ArrowLeft', r: 'ArrowRight', f: 'ArrowUp', b: 'ArrowDown', j: 'Numpad0', p: 'Numpad1', k: 'Numpad2', g: 'Numpad3', d: 'Numpad4', s: 'Numpad7', u: 'Numpad9' }
];
const SND = {
  heavy: [160, 40, 0.3, 'sawtooth', 0.35], hit: [400, 120, 0.1, 'square', 0.15], block: [1200, 500, 0.07, 'triangle', 0.18],
  whoosh: [300, 1400, 0.25, 'sine', 0.12], special: [700, 180, 0.35, 'triangle', 0.22], ko: [260, 30, 1.1, 'sawtooth', 0.35]
};
const S = { phase: 'menu', pt: 0, mode: '1p', sel: [0, 1], arena: 0, pick: 0, round: 1, wins: [0, 0], time: 60, shake: 0, msgT: 0, snd: true, winner: -1 };
let F = [], projs = [], parts = [], AC = null, T = 0, CX = 0, CZ = 10.5, last = performance.now();
const held = {};
const pGeo = new THREE.SphereGeometry(0.07, 6, 6), pMat = {};

/* ---------- Renderer, câmera e luzes ---------- */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('stage').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 120);
const world = new THREE.Group();
const key = new THREE.DirectionalLight(0xffffff, 1.1);
key.position.set(4, 9, 7); key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
Object.assign(key.shadow.camera, { left: -10, right: 10, top: 8, bottom: -4, near: 1, far: 40 });
key.shadow.camera.updateProjectionMatrix();
const rim = new THREE.PointLight(0xffffff, 1.6, 30);
rim.position.set(0, 5, -4);
scene.add(world, new THREE.HemisphereLight(0xbfd6ff, 0x1a1030, 0.7), key, rim);

/* ---------- Arenas ---------- */
function buildArena(A) {
  const add = (geo, c, e, x, y, z) => {
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: c, emissive: e || 0 }));
    m.position.set(x, y, z); m.castShadow = true; world.add(m); return m;
  };
  const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const floor = add(new THREE.PlaneGeometry(40, 30), A.floor, 0, 0, 0, 0);
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; floor.castShadow = false;
  add(new THREE.PlaneGeometry(60, 20), A.sky, 0, 0, 9, -7);
  if (A.deco === 'neon') {
    world.add(new THREE.GridHelper(40, 40, 0x22e5ff, 0x3a1a80));
    for (let x = -10; x <= 10; x += 1.6) {
      const h = 3 + Math.random() * 5, c = Math.random() < 0.5 ? 0xff2bd6 : 0x22e5ff;
      add(B(1.3, h, 1), 0x101030, 0, x, h / 2, -6);
      add(B(0.1, h * 0.8, 0.1), c, c, x + 0.7, h * 0.4, -5.4);
    }
  } else if (A.deco === 'temple') {
    for (const x of [-8, -4.5, 4.5, 8]) {
      add(new THREE.CylinderGeometry(0.35, 0.42, 6, 14), 0xb3121b, 0, x, 3, -5.5);
      add(new THREE.SphereGeometry(0.4, 14, 12), 0xffb36b, 0xffb36b, x, 5.8, -5.5);
    }
    add(B(18, 0.4, 1.4), 0x1a0f0a, 0, 0, 6.3, -5.5);
    add(new THREE.SphereGeometry(1.6, 24, 16), 0xfff1d0, 0xfff1d0, 7, 12, -14);
  } else if (A.deco === 'lava') {
    add(new THREE.PlaneGeometry(40, 10), 0x5a1a05, 0x5a1a05, 0, 5, -6.9);
    for (let i = 0; i < 14; i++) add(B(1 + Math.random() * 2.5, 0.03, 0.12), 0xff5a1a, 0xff5a1a, -9 + Math.random() * 18, 0.02, -4 + Math.random() * 6);
    for (let i = 0; i < 9; i++) add(new THREE.DodecahedronGeometry(0.5 + Math.random() * 0.6), 0x2b2b30, 0, -8 + i * 2, 0.6, -5 - Math.random() * 1.5);
  } else {
    for (let x = -10; x <= 10; x += 2.2) {
      const z = -5 - Math.random() * 2, h = 2.5 + Math.random() * 1.5;
      add(new THREE.CylinderGeometry(0.15, 0.2, 1.4, 8), 0x3b2412, 0, x, 0.7, z);
      add(new THREE.ConeGeometry(1.1, h * 1.6, 8), 0x1f7a3a, 0x0c3d1c, x, 1.4 + h * 0.8, z);
    }
    for (let i = 0; i < 20; i++) add(new THREE.SphereGeometry(0.07, 6, 6), 0x7dffb0, 0x7dffb0, -10 + Math.random() * 20, 0.8 + Math.random() * 3, -4 + Math.random() * 6);
  }
}

/* ---------- Lutadores (modelos 3D procedurais) ---------- */
function mkFighter(d, i) {
  const mat = (c, e) => new THREE.MeshStandardMaterial({ color: c, emissive: e || 0, roughness: 0.55, metalness: 0.1, transparent: true });
  const part = (geo, x, y, z, c, e) => { const m = new THREE.Mesh(geo, mat(c, e)); m.position.set(x, y, z); m.castShadow = true; return m; };
  const box = (w, h, dd) => new THREE.BoxGeometry(w, h, dd), ball = r => new THREE.SphereGeometry(r, 14, 10);
  const root = new THREE.Group(), tilt = new THREE.Group(), P = {}, SKIN = 0xeab48c;
  const leg = new THREE.Color(d.col).multiplyScalar(0.5).getHex();
  root.add(tilt); tilt.scale.setScalar(d.sc || 1);
  const pivot = (x, y) => { const g = new THREE.Group(); g.position.set(x, y, 0); tilt.add(g); return g; };
  for (const s of [-1, 1]) {
    const k = s < 0 ? 'L' : 'R';
    P['leg' + k] = pivot(0.18 * s, 1);
    P['leg' + k].add(part(box(0.26, 1, 0.28), 0, -0.5, 0, leg), part(box(0.28, 0.14, 0.36), 0, -0.93, 0.04, 0x0d0d12));
    P['arm' + k] = pivot(0.5 * s, 1.85);
    P['arm' + k].add(part(box(0.22, 0.8, 0.24), 0, -0.4, 0, d.col), part(ball(0.15), 0, -0.88, 0, SKIN));
  }
  tilt.add(
    part(box(0.44, 0.24, 0.4), 0, 1.02, 0, leg),
    part(box(0.72, 0.92, 0.44), 0, 1.6, 0, d.col),
    part(box(0.76, 0.08, 0.47), 0, 1.16, 0, d.acc, d.acc),
    part(ball(0.27), 0, 2.3, 0, SKIN),
    part(box(0.58, 0.14, 0.58), 0, 2.5, 0, d.hr),
    part(box(0.1, 0.05, 0.05), -0.1, 2.32, 0.26, d.acc, d.acc),
    part(box(0.1, 0.05, 0.05), 0.1, 2.32, 0.26, d.acc, d.acc)
  );
  if (d.ex === 'spikes') for (const x of [-0.14, 0, 0.14]) tilt.add(part(new THREE.ConeGeometry(0.07, 0.36, 6), x, 2.72 - Math.abs(x) * 0.4, 0, d.acc, d.acc));
  if (d.ex === 'band') tilt.add(part(box(0.6, 0.08, 0.6), 0, 2.36, 0, d.acc, d.acc));
  if (d.ex === 'tail') { const t = part(new THREE.CylinderGeometry(0.06, 0.1, 0.8, 8), 0, 2.15, -0.34, d.hr); t.rotation.x = 0.5; tilt.add(t); }
  if (d.ex === 'pads') for (const s of [-1, 1]) tilt.add(part(box(0.42, 0.22, 0.5), 0.5 * s, 1.98, 0, d.acc));
  if (d.ex === 'cape') tilt.add(part(box(0.76, 1.5, 0.06), 0, 1.45, -0.26, 0x1c1030, 0x2a1156));
  if (d.ex === 'hair') tilt.add(part(box(0.56, 0.95, 0.24), 0, 1.9, -0.24, d.hr));
  const aura = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.6, 32), new THREE.MeshBasicMaterial({ color: d.acc, transparent: true, opacity: 0.75, side: THREE.DoubleSide }));
  aura.rotation.x = -Math.PI / 2; aura.position.y = 0.02; root.add(aura);
  return { i, def: d, root, tilt, P, x: i ? 3 : -3, y: 0, z: 0, vx: 0, vy: 0, face: i ? -1 : 1, hp: d.hp, maxHp: d.hp, en: 0, state: 'idle', act: null, t: 0, koT: 0, hitDone: false, spawned: false, side: false, combo: 0, cT: 0, burn: 0, slow: 0, human: false, dummy: false, inp: { x: 0, z: 0, g: false }, ai: { t: 0, g: 0 } };
}

function buildMatch() {
  while (world.children.length) world.remove(world.children[0]);
  projs = []; parts = [];
  const A = ARENAS[S.arena];
  scene.background = new THREE.Color(A.sky);
  scene.fog = new THREE.Fog(A.sky, 18, 40);
  rim.color.set(A.key);
  buildArena(A);
  F = [mkFighter(ROSTER[S.sel[0]], 0), mkFighter(ROSTER[S.sel[1]], 1)];
  F.forEach(f => world.add(f.root));
}

/* ---------- Menus ---------- */
function go(id) { document.querySelectorAll('.sec').forEach(s => s.classList.toggle('on', s.id === id)); }
function pickChar(i) {
  S.sel[S.pick] = i;
  if (S.mode === '2p' && S.pick === 0) { S.pick = 1; $('pickT').textContent = 'Jogador 2: escolha seu lutador'; return; }
  if (S.mode !== '2p') { do { S.sel[1] = Math.floor(Math.random() * ROSTER.length); } while (S.sel[1] === i); }
  go('s-arena');
}
document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
document.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => {
  S.mode = b.dataset.mode; S.pick = 0;
  $('pickT').textContent = S.mode === '2p' ? 'Jogador 1: escolha seu lutador' : 'Escolha seu lutador';
  go('s-char');
});
ROSTER.forEach((d, i) => {
  const b = document.createElement('button');
  b.className = 'card'; b.style.setProperty('--c', HEX(d.acc));
  b.innerHTML = `<b>${d.n}</b><small>${d.el}</small><em>${d.pwN}</em>`;
  b.onclick = () => pickChar(i);
  $('roster').appendChild(b);
});
ARENAS.forEach((A, i) => {
  const b = document.createElement('button');
  b.className = 'card'; b.style.setProperty('--c', HEX(A.key));
  b.innerHTML = `<b>${A.n}</b>`;
  b.onclick = () => { S.arena = i; startMatch(); };
  $('arenas').appendChild(b);
});
$('snd').onclick = () => { S.snd = !S.snd; $('snd').textContent = 'Som: ' + (S.snd ? 'ON' : 'OFF'); };
$('shd').onclick = () => { renderer.shadowMap.enabled = !renderer.shadowMap.enabled; $('shd').textContent = 'Sombras: ' + (renderer.shadowMap.enabled ? 'ON' : 'OFF'); };
$('again').onclick = () => startMatch();
$('toMenu').onclick = () => toMenu();

/* ---------- Fluxo da partida ---------- */
function setPhase(p) { S.phase = p; S.pt = 0; }
function msg(t, s) { const m = $('msg'); m.textContent = t; m.classList.remove('pop'); void m.offsetWidth; m.classList.add('pop'); S.msgT = s; }
function pips() { for (let i = 0; i < 2; i++) $('wn' + i).innerHTML = [0, 1].map(j => `<i class="${S.wins[i] > j ? 'on' : ''}"></i>`).join(''); }
function startMatch() {
  initAudio();
  if (document.activeElement) document.activeElement.blur();
  S.wins = [0, 0]; S.round = 1;
  buildMatch();
  F[0].human = true; F[1].human = S.mode === '2p'; F[1].dummy = S.mode === 'tr';
  F.forEach((f, i) => { const n = $('nm' + i); n.textContent = f.def.n; n.style.color = HEX(f.def.acc); });
  $('menu').classList.add('hidden'); $('over').classList.add('hidden'); $('hud').classList.remove('hidden');
  pips(); startRound();
}
function startRound() {
  F.forEach((f, i) => {
    Object.assign(f, { x: i ? 3 : -3, y: 0, z: 0, vx: 0, vy: 0, hp: f.maxHp, en: 0, state: 'idle', act: null, t: 0, koT: 0, combo: 0, cT: 0, burn: 0, slow: 0, face: i ? -1 : 1 });
    f.tilt.rotation.x = 0; f.inp.x = 0; f.inp.z = 0; f.inp.g = false; f.ai.t = 0; f.ai.g = 0;
  });
  projs.forEach(p => world.remove(p.m)); projs = [];
  S.time = 60; setPhase('intro'); msg('ROUND ' + S.round, 1.6);
}
function koFight(f) {
  f.state = 'ko'; f.koT = 0; f.act = null; f.vx = -f.face * 2;
  S.winner = 1 - f.i; setPhase('ko'); msg('K.O.!', 2.4); sfx('ko'); S.shake = 0.9;
}
function timeUp() {
  const [a, b] = F;
  S.winner = a.hp > b.hp ? 0 : b.hp > a.hp ? 1 : -1;
  msg(S.winner < 0 ? 'EMPATE' : 'TEMPO!', 1.6); setPhase('end');
}
function endRound(w) {
  if (w >= 0) { S.wins[w]++; S.round++; }
  pips();
  if (S.wins[0] >= 2 || S.wins[1] >= 2) return matchOver(w);
  startRound();
}
function matchOver(w) {
  setPhase('over');
  $('ovT').textContent = S.mode === '1p' ? (w === 0 ? 'VITÓRIA!' : 'DERROTA!') : 'JOGADOR ' + (w + 1) + ' VENCE!';
  $('ovS').textContent = 'Placar final: ' + S.wins[0] + ' x ' + S.wins[1];
  $('over').classList.remove('hidden');
}
function toMenu() {
  setPhase('menu'); $('over').classList.add('hidden'); $('hud').classList.add('hidden');
  $('menu').classList.remove('hidden'); go('s-title'); buildMatch();
}

/* ---------- Combate ---------- */
function act(f, a) {
  if (S.phase !== 'fight' || f.state === 'hit' || f.state === 'ko') return;
  const g = f.y <= 0;
  if (a === 'jump') { if (g && f.state === 'idle') f.vy = 9.5; return; }
  if (a === 'dodge') { if (g && f.state === 'idle') { f.state = 'dodge'; f.t = 0; f.vx = (f.inp.x || -f.face) * 9; } return; }
  const M = MOVES[a];
  if (f.state !== 'idle' || f.en < (M.en || 0)) return;
  f.en -= M.en || 0;
  Object.assign(f, { state: 'attack', act: a, t: 0, hitDone: false, spawned: false, side: !f.side });
  if (a === 'super') { ring(f); sfx('heavy'); } else if (a !== 'special') sfx('whoosh');
}
function hurt(a, v, base, kb) {
  if (v.state === 'ko') return false;
  if (v.state === 'dodge' && v.t < 0.22) { sfx('whoosh'); return false; }
  const m = 1 + Math.min(a.combo, 8) * (a.def.pw === 'combo' ? 0.09 : 0.03);
  let d = base * a.def.str * m, k = kb * (a.def.pw === 'heavy' ? 1.6 : 1);
  if (v.state === 'guard') { d *= 0.2; k *= 0.25; v.en = Math.min(100, v.en + 4); sfx('block'); burst(v.x, v.y + 1.3, v.z, 0x9be7ff, 8); }
  else {
    v.state = 'hit'; v.t = a.def.pw === 'stun' && Math.random() < 0.3 ? 0.7 : 0.32; v.act = null;
    sfx(base > 12 ? 'heavy' : 'hit'); burst(v.x, v.y + 1.3, v.z, a.def.acc, 14);
  }
  v.vx = a.face * k * 6;
  if (!v.dummy) v.hp = Math.max(0, v.hp - d);
  a.en = Math.min(100, a.en + 4); v.en = Math.min(100, v.en + 2);
  if (a.def.pw === 'lifesteal') a.hp = Math.min(a.maxHp, a.hp + d * 0.3);
  if (a.def.pw === 'burn') v.burn = 2.5;
  if (a.def.pw === 'slow') v.slow = 2;
  a.combo++; a.cT = 1.6;
  S.shake = Math.min(0.6, S.shake + d * 0.02);
  return true;
}
function think(f, o, dt) {
  const I = f.inp, sp = f.def.spd * (f.slow > 0 ? 0.5 : 1), g = f.y <= 0;
  f.face = o.x >= f.x ? 1 : -1;
  if (f.cT > 0 && (f.cT -= dt) <= 0) f.combo = 0;
  if (f.slow > 0) f.slow -= dt;
  if (f.burn > 0) { f.burn -= dt; if (!f.dummy) f.hp = Math.max(0, f.hp - 3 * dt); }
  f.en = Math.min(100, f.en + 8 * dt);
  switch (f.state) {
    case 'idle':
      if (I.g && g) { f.state = 'guard'; break; }
      f.vx += (I.x * sp - f.vx) * Math.min(1, dt * 10);
      if (g) f.z = clamp(f.z + I.z * sp * 0.7 * dt, -2.3, 2.3);
      break;
    case 'guard':
      f.vx *= Math.exp(-10 * dt);
      if (!I.g || !g) f.state = 'idle';
      break;
    case 'attack': {
      const M = MOVES[f.act];
      f.t += dt;
      f.vx = g ? f.vx * Math.exp(-10 * dt) : f.vx + (I.x * sp - f.vx) * Math.min(1, dt * 4);
      if (M.proj && !f.spawned && f.t >= M.at[0]) { f.spawned = true; spawnProj(f, M.dmg); }
      if (M.reach && !f.hitDone && f.t >= M.at[0] && f.t <= M.at[1] && Math.abs(o.x - f.x) <= M.reach && Math.abs(o.z - f.z) <= 0.9) { f.hitDone = true; hurt(f, o, M.dmg, M.kb); }
      if (f.t >= M.dur) { f.state = 'idle'; f.act = null; }
      break;
    }
    case 'dodge':
      f.t += dt; f.vx *= Math.exp(-7 * dt);
      if (f.t >= 0.42) f.state = 'idle';
      break;
    case 'hit':
      f.vx *= Math.exp(-7 * dt);
      if ((f.t -= dt) <= 0) f.state = 'idle';
      break;
    case 'ko':
      f.koT += dt; f.vx *= Math.exp(-8 * dt);
      break;
  }
  if (f.y > 0 || f.vy > 0) { f.vy -= 26 * dt; f.y += f.vy * dt; if (f.y <= 0) { f.y = 0; f.vy = 0; } }
  f.x = clamp(f.x + f.vx * dt, -6.2, 6.2);
}
function spawnProj(f, dmg) {
  const c = f.def.acc, sh = f.def.sh;
  const geo = sh === 'ice' ? new THREE.OctahedronGeometry(0.32) : sh === 'ring' ? new THREE.TorusGeometry(0.3, 0.1, 8, 16) : new THREE.SphereGeometry(0.28, 14, 10);
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.2 }));
  world.add(m); sfx('special');
  projs.push({ m, x: f.x + f.face * 0.9, y: 1.5, z: f.z, dir: f.face, spd: 7.5, dmg, own: f, col: c });
}
function burst(x, y, z, c, n) {
  if (!pMat[c]) pMat[c] = new THREE.MeshBasicMaterial({ color: c });
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(pGeo, pMat[c]); m.position.set(x, y, z); world.add(m);
    parts.push({ m, v: new THREE.Vector3((Math.random() - 0.5) * 5, Math.random() * 4 + 1, (Math.random() - 0.5) * 2), life: 0.5 + Math.random() * 0.4 });
  }
}
function ring(f) {
  const m = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.5, 32), new THREE.MeshBasicMaterial({ color: f.def.acc, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
  m.rotation.x = -Math.PI / 2; m.position.set(f.x, 0.05, f.z); world.add(m);
  parts.push({ m, ring: true, life: 0.6 });
}
function projUpdate(dt) {
  for (let i = projs.length - 1; i >= 0; i--) {
    const p = projs[i], v = F[1 - p.own.i];
    p.x += p.dir * p.spd * dt; p.m.position.set(p.x, p.y, p.z); p.m.rotation.y += dt * 9;
    let gone = Math.abs(p.x) > 9;
    if (!gone && Math.abs(v.x - p.x) < 0.6 && Math.abs(v.z - p.z) < 0.9 && v.y < 2.3 && hurt(p.own, v, p.dmg, 0.6)) { burst(p.x, p.y, p.z, p.col, 14); gone = true; }
    if (gone) { world.remove(p.m); projs.splice(i, 1); }
  }
}
function fxUpdate(dt) {
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i]; p.life -= dt;
    if (p.life <= 0) { world.remove(p.m); parts.splice(i, 1); continue; }
    if (p.ring) { p.m.scale.setScalar(1 + (0.6 - p.life) * 14); p.m.material.opacity = p.life / 0.6 * 0.9; }
    else { p.v.y -= 14 * dt; p.m.position.addScaledVector(p.v, dt); }
  }
}

/* ---------- Animação dos lutadores ---------- */
function pose(f, dt) {
  const P = f.P, s = f.state, k = Math.min(1, dt * 14);
  let aL = 0.15, aR = 0.15, lL = 0, lR = 0, tx = 0;
  if (s === 'idle') {
    if (f.y > 0) { aL = aR = -2.4; lL = -0.6; lR = 0.4; }
    else if (Math.abs(f.vx) > 0.6) { const w = Math.sin(T * 12); lL = w * 0.7; lR = -w * 0.7; aL = -w * 0.5; aR = w * 0.5; }
  } else if (s === 'guard') { aL = aR = -1.3; lL = 0.25; lR = -0.25; }
  else if (s === 'attack') {
    const M = MOVES[f.act], p = f.t / M.dur, e = p < 0.4 ? p / 0.4 : Math.max(0, 1 - (p - 0.4) / 0.6);
    if (f.act === 'punch' || f.act === 'special') {
      const up = 0.15 - (f.act === 'punch' ? 1.8 : 1.5) * e;
      if (f.side) { aR = up; aL = -1.2; } else { aL = up; aR = -1.2; }
    } else if (f.act === 'kick') { if (f.side) lR = -1.7 * e; else lL = -1.7 * e; tx = -0.15 * e; aL = aR = -0.4; }
    else { aL = aR = -2.6 * Math.sin(p * Math.PI); tx = -0.1; }
  } else if (s === 'dodge') { tx = -0.3; aL = aR = -0.9; lL = 0.4; lR = -0.4; }
  else if (s === 'hit') { tx = -0.3; aL = -0.6 + Math.sin(T * 30) * 0.25; aR = -0.6 - Math.sin(T * 30) * 0.25; }
  const L = (o, v) => { o.rotation.x += (v - o.rotation.x) * k; };
  L(P.armL, aL); L(P.armR, aR); L(P.legL, lL); L(P.legR, lR);
  if (s === 'ko') f.tilt.rotation.x = -Math.PI / 2 * Math.min(1, f.koT * 2);
  else f.tilt.rotation.x += (tx - f.tilt.rotation.x) * k;
  const op = s === 'dodge' ? 0.45 : 1;
  f.tilt.traverse(o => { if (o.material) o.material.opacity = op; });
  f.root.position.set(f.x, f.y, f.z);
  f.root.rotation.y = f.face > 0 ? Math.PI / 2 : -Math.PI / 2;
}

/* ---------- IA e controles ---------- */
function runAI(f, o, dt) {
  const a = f.ai;
  a.g -= dt; f.inp.g = a.g > 0;
  if ((a.t -= dt) > 0) return;
  a.t = 0.22 + Math.random() * 0.25;
  const r = Math.random(), d = Math.abs(o.x - f.x), dir = o.x >= f.x ? 1 : -1;
  f.inp.x = 0; f.inp.z = 0;
  if (o.state === 'attack' && d < 2.4 && r < 0.55) { if (r < 0.2) act(f, 'dodge'); else a.g = 0.45; return; }
  if (d > 2.1) { f.inp.x = dir; if (r < 0.08) act(f, 'jump'); if (r < 0.2) f.inp.z = r < 0.1 ? -1 : 1; return; }
  if (f.state !== 'idle' || f.y > 0) return;
  if (f.en >= 100 && r < 0.35) act(f, 'super');
  else if (f.en >= 30 && r < 0.55) act(f, 'special');
  else if (r < 0.8) act(f, 'punch');
  else if (r < 0.93) act(f, 'kick');
  else f.inp.x = -dir * 0.7;
}
function readKeys(f) {
  const m = MAPS[f.i];
  f.inp.x = (held[m.r] ? 1 : 0) - (held[m.l] ? 1 : 0);
  f.inp.z = (held[m.b] ? 1 : 0) - (held[m.f] ? 1 : 0);
  f.inp.g = !!held[m.g];
}
addEventListener('keydown', e => {
  const c = e.code;
  if (c === 'Escape') { if (S.phase !== 'menu') toMenu(); return; }
  if (S.phase === 'menu') return;
  if (c === 'Space' || c.startsWith('Arrow') || c.startsWith('Numpad')) e.preventDefault();
  held[c] = true;
  if (e.repeat) return;
  F.forEach(f => {
    if (!f.human) return;
    const m = MAPS[f.i];
    if (c === m.j) act(f, 'jump'); else if (c === m.p) act(f, 'punch'); else if (c === m.k) act(f, 'kick');
    else if (c === m.d) act(f, 'dodge'); else if (c === m.s) act(f, 'special'); else if (c === m.u) act(f, 'super');
  });
});
addEventListener('keyup', e => { held[e.code] = false; });

/* ---------- Atualização, câmera, HUD e áudio ---------- */
function update(dt) {
  S.pt += dt;
  if (S.msgT > 0 && (S.msgT -= dt) <= 0) $('msg').textContent = '';
  if (S.phase === 'intro' && S.pt > 1.8) { setPhase('fight'); msg('LUTA!', 0.9); }
  if (S.phase === 'fight') {
    const dead = F.find(f => f.hp <= 0);
    if (dead) koFight(dead);
    else if (S.mode !== 'tr' && (S.time -= dt) <= 0) { S.time = 0; timeUp(); }
  }
  if ((S.phase === 'ko' || S.phase === 'end') && S.pt > 2.6) endRound(S.winner);
  F.forEach(f => {
    const o = F[1 - f.i];
    if (S.phase === 'fight') { if (f.human) readKeys(f); else if (!f.dummy) runAI(f, o, dt); }
    else { f.inp.x = 0; f.inp.z = 0; f.inp.g = false; }
    think(f, o, dt);
  });
  const [a, b] = F, dx = b.x - a.x;
  if (Math.abs(dx) < 0.9 && Math.abs(b.z - a.z) < 0.8 && a.y < 1 && b.y < 1) {
    const p = (0.9 - Math.abs(dx)) / 2, s = dx >= 0 ? 1 : -1;
    a.x -= s * p; b.x += s * p;
  }
  F.forEach(f => pose(f, dt));
  projUpdate(dt); fxUpdate(dt); hud();
}
function camUpdate(dt) {
  const mx = (F[0].x + F[1].x) / 2, gap = Math.abs(F[1].x - F[0].x);
  const base = Math.max(10.5, 17.5 / (innerWidth / innerHeight)) * (1 + Math.max(0, gap - 5) * 0.03);
  CX += (mx - CX) * Math.min(1, dt * 3);
  CZ += (base - CZ) * Math.min(1, dt * 2);
  S.shake *= Math.exp(-9 * dt);
  const sx = (Math.random() - 0.5) * S.shake, sy = (Math.random() - 0.5) * S.shake;
  cam.position.set(CX + sx, 2.7 + sy, CZ);
  cam.lookAt(CX, 1.5, 0);
}
function hud() {
  F.forEach((f, i) => { $('hp' + i).style.width = f.hp / f.maxHp * 100 + '%'; $('en' + i).style.width = f.en + '%'; });
  $('round').textContent = 'ROUND ' + S.round;
  $('timer').textContent = S.mode === 'tr' ? '∞' : Math.ceil(S.time);
  const c = F[0].combo > 1 ? F[0] : F[1].combo > 1 ? F[1] : null;
  $('combo').textContent = c ? 'COMBO x' + c.combo : '';
}
function initAudio() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } }
function sfx(k) {
  if (!AC || !S.snd || !SND[k]) return;
  const [f0, f1, dur, type, vol] = SND[k], t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur);
}
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); });
function loop(now) {
  const dt = Math.min(0.033, (now - last) / 1000); last = now; T += dt;
  update(dt); camUpdate(dt); renderer.render(scene, cam);
  requestAnimationFrame(loop);
}

/* ---------- Início ---------- */
buildMatch();
requestAnimationFrame(loop);