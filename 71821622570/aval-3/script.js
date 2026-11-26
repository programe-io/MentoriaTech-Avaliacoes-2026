window.addEventListener('load', () => {
  const $ = id => document.getElementById(id);
  if (typeof THREE === 'undefined') {
    $('menu').innerHTML = '<h1>Não foi possível carregar o Three.js</h1><p>Verifique sua internet e recarregue.</p>';
    return;
  }

  // ---------- Configurações ----------
  const R = 0.45, COUNT = 20, PLAY = 180, HIDERS = 4;

  const ROOMS = {
    sala: { name: 'Sala de Estar', w: 18, d: 14, floor: 0xb98b5e, wall: 0xe9dfc9, props: [
      { x: -6, z: -5, w: 5, h: 1.4, d: 2.2, c: 0x3a6ea5, hide: 1 },
      { x: 6, z: -5.5, w: 2.4, h: 3, d: 1.6, c: 0x6b4423, hide: 1 },
      { x: 0, z: 1, w: 3.5, h: .6, d: 2, c: 0x8b5a2b },
      { x: -7, z: 3.5, w: 2, h: 2.4, d: 2, c: 0x2e7d32, hide: 1 },
      { x: 7, z: 3.5, w: 3, h: 1.4, d: 2, c: 0xa13d3d, hide: 1 },
      { x: 0, z: -6.2, w: 4, h: 2.2, d: 1, c: 0x444444, hide: 1 } ] },
    cozinha: { name: 'Cozinha', w: 16, d: 14, floor: 0xd9d9d9, wall: 0xfff4c2, props: [
      { x: -5, z: -5.8, w: 6, h: 2, d: 1.6, c: 0xffffff, hide: 1 },
      { x: 6.5, z: -3, w: 1.8, h: 3, d: 2.4, c: 0xb0b0b0, hide: 1 },
      { x: 0, z: 0, w: 4, h: 1.1, d: 2.4, c: 0x8b5a2b },
      { x: -6.5, z: 3, w: 2, h: 1.6, d: 2.5, c: 0x996633, hide: 1 },
      { x: 6, z: 4, w: 2.4, h: 1.8, d: 2.4, c: 0x5b8fb9, hide: 1 },
      { x: 0, z: 5, w: 3, h: 1.5, d: 1.5, c: 0xdd6644, hide: 1 } ] },
    quarto: { name: 'Quarto', w: 16, d: 14, floor: 0x8e6bbf, wall: 0xf4d6e6, props: [
      { x: -5.5, z: -4.5, w: 4, h: 1.3, d: 6, c: 0x5aa0e0, hide: 1 },
      { x: 6.5, z: -5, w: 2.6, h: 3.2, d: 1.8, c: 0x6b4423, hide: 1 },
      { x: 0, z: -6, w: 3, h: 1.1, d: 1.2, c: 0x8b5a2b },
      { x: 6, z: 3, w: 2.4, h: 1.6, d: 2.4, c: 0xf2c94c, hide: 1 },
      { x: -6.5, z: 4, w: 2.2, h: 1.5, d: 2.2, c: 0xe08a8a, hide: 1 },
      { x: 0, z: 3, w: 3, h: .4, d: 2, c: 0x7755aa },
      { x: 0, z: 5.8, w: 4, h: 1.8, d: 1.2, c: 0x335577, hide: 1 } ] },
    quintal: { name: 'Quintal', w: 24, d: 20, floor: 0x4caf50, wall: 0x9c6b3c, wh: 1.4, props: [
      { x: -8, z: -6, w: 3, h: 2.2, d: 3, c: 0x2e7d32, hide: 1 },
      { x: 8, z: -6, w: 3, h: 2.2, d: 3, c: 0x388e3c, hide: 1 },
      { x: 0, z: -2, w: 2.4, h: 1.8, d: 2.4, c: 0xb5651d, hide: 1 },
      { x: -8, z: 5, w: 4, h: 2, d: 3, c: 0x7a7a7a, hide: 1 },
      { x: 8, z: 4, w: 3, h: 2.6, d: 3, c: 0x1b5e20, hide: 1 },
      { x: 0, z: 6, w: 3, h: 1.6, d: 2, c: 0xc0392b, hide: 1 },
      { x: 3, z: -8, w: 2, h: .8, d: 4, c: 0x8d6e63 } ] }
  };
  const HOUSE = ['sala', 'cozinha', 'quarto'];

  const ITEMS = [
    { id: 'c-azul', t: 'c', n: 'Azul', v: 0x3b82f6, p: 0 },
    { id: 'c-verde', t: 'c', n: 'Verde', v: 0x22c55e, p: 0 },
    { id: 'c-rosa', t: 'c', n: 'Rosa', v: 0xec4899, p: 30 },
    { id: 'c-ouro', t: 'c', n: 'Ouro', v: 0xfbbf24, p: 60 },
    { id: 'h-none', t: 'h', n: 'Sem chapéu', v: 'none', p: 0 },
    { id: 'h-bone', t: 'h', n: 'Boné', v: 'bone', p: 40 },
    { id: 'h-festa', t: 'h', n: 'Chapéu de festa', v: 'festa', p: 50 }
  ];

  // ---------- Dados salvos ----------
  let store = { coins: 0, owned: ['c-azul', 'c-verde', 'h-none'], color: 'c-azul', hat: 'h-none' };
  try { const s = JSON.parse(localStorage.getItem('hs_casa')); if (s) store = Object.assign(store, s); } catch (e) {}
  const save = () => { try { localStorage.setItem('hs_casa', JSON.stringify(store)); } catch (e) {} };

  // ---------- Three.js ----------
  const canvas = $('c');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87b9e8);
  const camera = new THREE.PerspectiveCamera(65, 1, .1, 200);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x887766, .95));
  const sun = new THREE.DirectionalLight(0xffffff, .55); sun.position.set(10, 20, 8); scene.add(sun);
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();

  const mat = c => new THREE.MeshLambertMaterial({ color: c });

  // ---------- Personagem Cube Guy ----------
  function makeChar(color, hat) {
    const g = new THREE.Group(), m = mat(color), dark = mat(0x222222);
    const box = (w, h, d, mt, x, y, z) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mt); b.position.set(x, y, z); g.add(b); return b;
    };
    const limb = (x, y, w, h) => {
      const p = new THREE.Group(); p.position.set(x, y, 0);
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), m); b.position.y = -h / 2; p.add(b); g.add(p); return p;
    };
    box(.7, .8, .45, m, 0, 1.0, 0);
    box(.75, .75, .75, m, 0, 1.8, 0);
    box(.12, .14, .05, dark, -.17, 1.85, .38);
    box(.12, .14, .05, dark, .17, 1.85, .38);
    box(.28, .06, .05, dark, 0, 1.62, .38);
    g.userData.legL = limb(-.18, .6, .28, .6); g.userData.legR = limb(.18, .6, .28, .6);
    g.userData.armL = limb(-.5, 1.35, .22, .65); g.userData.armR = limb(.5, 1.35, .22, .65);
    if (hat === 'bone') {
      box(.8, .18, .8, mat(0xdd2222), 0, 2.22, 0); box(.6, .06, .35, mat(0xaa1111), 0, 2.2, .5);
    } else if (hat === 'festa') {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(.3, .75, 12), mat(0xff3399)); cone.position.set(0, 2.55, 0); g.add(cone);
    }
    return g;
  }

  // ---------- Mundo ----------
  let world = null;
  function buildWorld(keys) {
    if (world) scene.remove(world.g);
    const g = new THREE.Group(), cols = [], spots = [], rooms = [];
    const addBox = (x0, x1, z0, z1, h, c, col = true) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, h, z1 - z0), mat(c));
      m.position.set((x0 + x1) / 2, h / 2, (z0 + z1) / 2); g.add(m);
      if (col) cols.push({ x0, x1, z0, z1 });
      return m;
    };
    let ox = 0;
    keys.forEach((k, i) => {
      const d = ROOMS[k], wh = d.wh || 4;
      if (i > 0) ox += ROOMS[keys[i - 1]].w / 2 + d.w / 2;
      rooms.push({ ox, def: d });
      const fl = new THREE.Mesh(new THREE.BoxGeometry(d.w, .2, d.d), mat(d.floor)); fl.position.set(ox, -.1, 0); g.add(fl);
      const x0 = ox - d.w / 2, x1 = ox + d.w / 2, z0 = -d.d / 2, z1 = d.d / 2;
      addBox(x0 - .2, x1 + .2, z0 - .2, z0 + .2, wh, d.wall);
      addBox(x0 - .2, x1 + .2, z1 - .2, z1 + .2, wh, d.wall);
      const side = (x, door) => {
        if (!door) addBox(x - .2, x + .2, z0, z1, wh, d.wall);
        else { addBox(x - .2, x + .2, z0, -1.6, wh, d.wall); addBox(x - .2, x + .2, 1.6, z1, wh, d.wall); }
      };
      side(x0, i > 0); side(x1, i < keys.length - 1);
      d.props.forEach(p => {
        const px = ox + p.x;
        addBox(px - p.w / 2, px + p.w / 2, p.z - p.d / 2, p.z + p.d / 2, p.h, p.c);
        if (p.hide) spots.push({ x: px, z: p.z, reach: Math.max(p.w, p.d) / 2 + 1.1, occ: null, claimed: null });
      });
    });
    scene.add(g);
    world = { g, cols, spots, rooms };
  }

  function hits(x, z, r) {
    for (const c of world.cols) if (x > c.x0 - r && x < c.x1 + r && z > c.z0 - r && z < c.z1 + r) return true;
    return false;
  }
  function randomFree() {
    for (let i = 0; i < 200; i++) {
      const rm = world.rooms[Math.floor(Math.random() * world.rooms.length)];
      const x = rm.ox + (Math.random() - .5) * (rm.def.w - 3), z = (Math.random() - .5) * (rm.def.d - 3);
      if (!hits(x, z, R + .3)) return new THREE.Vector3(x, 0, z);
    }
    return new THREE.Vector3(0, 0, 0);
  }
  function freeNear(s) {
    for (let r = s.reach; r < s.reach + 4; r += .5)
      for (let a = 0; a < 6.28; a += .4) {
        const x = s.x + Math.cos(a) * r, z = s.z + Math.sin(a) * r;
        if (!hits(x, z, R + .1)) return new THREE.Vector3(x, 0, z);
      }
    return randomFree();
  }
  function move(e, dx, dz) {
    if (!hits(e.pos.x + dx, e.pos.z, R)) e.pos.x += dx;
    if (!hits(e.pos.x, e.pos.z + dz, R)) e.pos.z += dz;
  }

  // ---------- Estado do jogo ----------
  let ents = [], player = null, phase = 'menu', tl = 0, selMap = 'sala', camYaw = 0, camPitch = .5, vy = 0, foundCount = 0, earned = 0;
  const keys = {};

  function toast(t) {
    const el = $('toast'); el.textContent = t; el.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function addEnt(isPlayer, role, color, hat) {
    const e = { isPlayer, role, pos: randomFree(), mesh: makeChar(color, hat), state: 'idle', hidden: false, found: false,
      face: 0, moving: false, stuck: 0, wp: null, wpT: 0, spot: null, visited: new Set(), target: null, lastX: 0, lastZ: 0, crouch: false };
    e.mesh.position.copy(e.pos); scene.add(e.mesh); ents.push(e); return e;
  }

  function startGame() {
    ents.forEach(e => scene.remove(e.mesh)); ents = [];
    buildWorld(selMap === 'casa' ? HOUSE : [selMap]);
    const pSeeker = Math.random() < .5;
    const pc = ITEMS.find(i => i.id === store.color).v, ph = ITEMS.find(i => i.id === store.hat).v;
    player = addEnt(true, pSeeker ? 'seeker' : 'hider', pc, ph);
    const cols = [0xef4444, 0xf97316, 0x8b5cf6, 0x14b8a6, 0x84cc16], hats = ['none', 'bone', 'festa'];
    const nb = pSeeker ? HIDERS : HIDERS - 1;
    for (let i = 0; i < nb; i++) addEnt(false, 'hider', cols[i % cols.length], hats[Math.floor(Math.random() * 3)]);
    if (!pSeeker) addEnt(false, 'seeker', 0x111111, 'none');
    ents.filter(e => !e.isPlayer && e.role === 'hider').forEach(e => {
      const free = world.spots.filter(s => !s.claimed);
      const s = free[Math.floor(Math.random() * free.length)]; s.claimed = e; e.spot = s; e.state = 'going';
    });
    foundCount = 0; earned = 0; phase = 'count'; tl = COUNT; vy = 0; camYaw = 0; camPitch = .5;
    $('menu').style.display = 'none'; $('end').style.display = 'none'; $('hud').style.display = 'block';
    toast(pSeeker ? 'Você é o PEGADOR! Espere a contagem.' : 'Você se ESCONDE! Corra até um móvel e aperte E.');
  }

  function endGame(win, msg) {
    if (phase === 'end') return;
    phase = 'end';
    const bonus = win ? 20 : 0; earned += bonus; store.coins += earned; save();
    $('endTitle').textContent = win ? '🏆 VOCÊ VENCEU!' : '😵 Você perdeu';
    $('endText').textContent = msg + '  •  +' + earned + ' moedas';
    $('end').style.display = 'block'; $('hud').style.display = 'none';
    if (document.exitPointerLock) document.exitPointerLock();
    renderMenu();
  }

  function setFound(e) {
    if (e.found) return;
    e.found = true; e.state = 'found';
    if (e.spot) { e.spot.occ = null; }
    e.hidden = false; e.mesh.visible = false;
    if (!e.isPlayer) { foundCount++; if (player.role === 'seeker') { earned += 5; toast('Achou um! ' + foundCount + '/' + HIDERS); } }
    else endGame(false, 'O pegador te achou.');
  }

  // ---------- Atualização ----------
  function step(e, tx, tz, sp, dt) {
    const dx = tx - e.pos.x, dz = tz - e.pos.z, l = Math.hypot(dx, dz);
    if (l < .01) return 0;
    const ox = e.pos.x, oz = e.pos.z;
    move(e, dx / l * sp * dt, dz / l * sp * dt);
    e.face = Math.atan2(dx, dz); e.moving = true;
    return Math.hypot(e.pos.x - ox, e.pos.z - oz);
  }
  function botMove(e, tx, tz, sp, dt) {
    if (e.wpT > 0) { e.wpT -= dt; if (e.wp) { tx = e.wp.x; tz = e.wp.z; } }
    const moved = step(e, tx, tz, sp, dt);
    if (moved < sp * dt * .3) e.stuck += dt; else e.stuck = 0;
    if (e.stuck > .7) { e.wp = randomFree(); e.wpT = 1.6; e.stuck = 0; }
  }

  function nearestSpot(p) {
    let best = null, bd = 1e9;
    world.spots.forEach(s => { const d = Math.hypot(s.x - p.x, s.z - p.z); if (d < s.reach && d < bd) { bd = d; best = s; } });
    return best;
  }

  function pressE() {
    if (phase !== 'count' && phase !== 'play') return;
    const p = player;
    if (p.role === 'hider') {
      if (p.hidden) { p.hidden = false; p.mesh.visible = true; p.pos.copy(freeNear(p.spot)); p.spot.occ = null; p.spot.claimed = null; p.spot = null; return; }
      const s = nearestSpot(p.pos);
      if (s && !s.claimed) { s.claimed = p; s.occ = p; p.spot = s; p.hidden = true; p.mesh.visible = false; p.pos.set(s.x, 0, s.z); toast('Escondido! Fique quieto.'); }
      else if (s) toast('Esse esconderijo está ocupado.');
    } else if (phase === 'play') {
      const s = nearestSpot(p.pos);
      if (!s) return;
      if (s.occ) setFound(s.occ); else toast('Ninguém aqui...');
    }
  }

  function updateBots(dt) {
    ents.forEach(e => {
      if (e.isPlayer || e.found) return;
      e.moving = false;
      if (e.role === 'hider') {
        if (e.state === 'going') {
          const s = e.spot;
          if (Math.hypot(s.x - e.pos.x, s.z - e.pos.z) < s.reach - .1) {
            e.state = 'hidden'; e.hidden = true; e.mesh.visible = false; e.pos.set(s.x, 0, s.z); s.occ = e;
          } else botMove(e, s.x, s.z, 4, dt);
        }
      } else if (phase === 'play') {
        // pegador bot: só vê quem está visível
        let seen = null, bd = 1e9;
        ents.forEach(h => {
          if (h.role !== 'hider' || h.hidden || h.found) return;
          const vis = h.isPlayer && h.crouch ? 4.5 : 9, d = Math.hypot(h.pos.x - e.pos.x, h.pos.z - e.pos.z);
          if (d < vis && d < bd) { bd = d; seen = h; }
        });
        if (seen) {
          botMove(e, seen.pos.x, seen.pos.z, 4.3, dt);
          if (bd < 1.15) setFound(seen);
        } else {
          if (!e.target) {
            let cand = world.spots.filter(s => !e.visited.has(s));
            if (!cand.length) { e.visited.clear(); cand = world.spots; }
            e.target = cand[Math.floor(Math.random() * cand.length)];
          }
          const s = e.target;
          if (Math.hypot(s.x - e.pos.x, s.z - e.pos.z) < s.reach - .1) {
            if (s.occ) setFound(s.occ);
            e.visited.add(s); e.target = null;
          } else botMove(e, s.x, s.z, 3.8, dt);
        }
      }
    });
  }

  function updatePlayer(dt) {
    const p = player; p.moving = false;
    if (keys.ArrowLeft) camYaw += 2 * dt;
    if (keys.ArrowRight) camYaw -= 2 * dt;
    if (p.found || p.hidden) return;
    if (p.role === 'seeker' && phase === 'count') return;
    p.crouch = !!(keys.ControlLeft || keys.ControlRight || keys.KeyC);
    let ix = 0, iz = 0;
    if (keys.KeyW) iz += 1; if (keys.KeyS) iz -= 1; if (keys.KeyD) ix += 1; if (keys.KeyA) ix -= 1;
    if (ix || iz) {
      const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw), rx = Math.cos(camYaw), rz = -Math.sin(camYaw);
      let dx = fx * iz + rx * ix, dz = fz * iz + rz * ix; const l = Math.hypot(dx, dz); dx /= l; dz /= l;
      const sp = p.crouch ? 2.2 : (keys.ShiftLeft || keys.ShiftRight ? 7.5 : 4.8);
      move(p, dx * sp * dt, dz * sp * dt); p.face = Math.atan2(dx, dz); p.moving = true;
    }
    if (keys.Space && p.mesh.position.y <= .01) vy = 6;
    vy -= 18 * dt; p.y = Math.max(0, (p.y || 0) + vy * dt); if (p.y === 0) vy = 0;
    // pegador humano toca em escondidos visíveis
    if (p.role === 'seeker' && phase === 'play')
      ents.forEach(h => { if (h.role === 'hider' && !h.hidden && !h.found && !h.isPlayer && Math.hypot(h.pos.x - p.pos.x, h.pos.z - p.pos.z) < 1.15) setFound(h); });
  }

  function animate(dt, time) {
    ents.forEach(e => {
      const m = e.mesh, u = m.userData;
      m.position.set(e.pos.x, e.y || 0, e.pos.z);
      let d = e.face - m.rotation.y; while (d > Math.PI) d -= 6.283; while (d < -Math.PI) d += 6.283;
      m.rotation.y += d * Math.min(1, dt * 12);
      m.scale.y += ((e.crouch ? .65 : 1) - m.scale.y) * Math.min(1, dt * 12);
      const sw = e.moving ? Math.sin(time * 12) * .8 : 0;
      u.legL.rotation.x = sw; u.legR.rotation.x = -sw; u.armL.rotation.x = -sw; u.armR.rotation.x = sw;
    });
  }

  function updateHUD() {
    const p = player; let t = '';
    if (phase === 'count') t = (p.role === 'seeker' ? '🔢 Contando... ' : '🏃 Esconda-se! ') + Math.ceil(tl) + 's';
    else t = (p.role === 'seeker' ? '🔍 PEGADOR  ' : '🫣 ESCONDIDO  ') + '⏱ ' + Math.ceil(tl) + 's' + (p.role === 'seeker' ? '  •  Achados: ' + foundCount + '/' + HIDERS : '');
    $('hudTop').textContent = t;
    let h = '';
    const s = nearestSpot(p.pos);
    if (p.role === 'hider') h = p.hidden ? 'E: sair do esconderijo' : (s && !s.claimed ? 'E: esconder aqui' : '');
    else if (phase === 'play' && s) h = 'E: procurar aqui';
    $('hudHint').textContent = h;
  }

  // ---------- Loop ----------
  let last = performance.now();
  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (phase === 'count' || phase === 'play') {
      tl -= dt;
      if (phase === 'count' && tl <= 0) { phase = 'play'; tl = PLAY; toast('VALENDO!'); }
      else if (phase === 'play') {
        if (tl <= 0) { if (player.role === 'hider') endGame(true, 'Você sobreviveu!'); else endGame(false, 'O tempo acabou.'); }
        else if (player.role === 'seeker' && foundCount >= HIDERS) endGame(true, 'Você achou todo mundo!');
      }
      updatePlayer(dt); updateBots(dt); animate(dt, now / 1000); updateHUD();
      const t = player.hidden && player.spot ? { x: player.spot.x, z: player.spot.z } : player.pos;
      const D = 6.5, cp = Math.cos(camPitch);
      camera.position.set(t.x + Math.sin(camYaw) * cp * D, 1.6 + Math.sin(camPitch) * D, t.z + Math.cos(camYaw) * cp * D);
      camera.lookAt(t.x, 1.4, t.z);
    } else if (world) {
      const t = now / 4000; camera.position.set(Math.sin(t) * 18, 14, Math.cos(t) * 18); camera.lookAt(0, 0, 0);
    }
    renderer.render(scene, camera);
  }
  buildWorld(['sala']);
  requestAnimationFrame(loop);

  // ---------- Entrada ----------
  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.code === 'KeyE' && !e.repeat) pressE();
    if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code) && phase !== 'menu') e.preventDefault();
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });
  let drag = false;
  canvas.addEventListener('mousedown', () => {
    drag = true;
    try { if (canvas.requestPointerLock) canvas.requestPointerLock(); } catch (e) {}
  });
  window.addEventListener('mouseup', () => { drag = false; });
  window.addEventListener('mousemove', e => {
    if (phase === 'menu' || phase === 'end') return;
    if (document.pointerLockElement === canvas || drag) {
      camYaw -= e.movementX * .003;
      camPitch = Math.max(.1, Math.min(1.2, camPitch + e.movementY * .003));
    }
  });

  // ---------- Menu e loja ----------
  function renderMenu() {
    $('coins').textContent = store.coins;
    document.querySelectorAll('#maps button').forEach(b => b.classList.toggle('sel', b.dataset.map === selMap));
    const shop = $('shop'); shop.innerHTML = '';
    ITEMS.forEach(it => {
      const owned = store.owned.includes(it.id), eq = store.color === it.id || store.hat === it.id;
      const b = document.createElement('button');
      b.textContent = (it.t === 'c' ? '🎨 ' : '🎩 ') + it.n + (owned ? (eq ? ' ✔' : '') : ' — 🪙' + it.p);
      if (owned) b.classList.add('own'); if (eq) b.classList.add('sel');
      b.onclick = () => {
        if (!owned) {
          if (store.coins < it.p) { toast('Moedas insuficientes!'); return; }
          store.coins -= it.p; store.owned.push(it.id);
        }
        if (it.t === 'c') store.color = it.id; else store.hat = it.id;
        save(); renderMenu();
      };
      shop.appendChild(b);
    });
  }
  document.querySelectorAll('#maps button').forEach(b => b.onclick = () => { selMap = b.dataset.map; renderMenu(); });
  $('play').onclick = startGame;
  $('again').onclick = () => {
    phase = 'menu'; ents.forEach(e => scene.remove(e.mesh)); ents = [];
    $('end').style.display = 'none'; $('menu').style.display = 'block'; renderMenu();
  };
  renderMenu();
});