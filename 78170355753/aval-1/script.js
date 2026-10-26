
(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const startScreen = document.getElementById('startScreen');
  const fightScreen = document.getElementById('fightScreen');
  const endScreen = document.getElementById('endScreen');

  const difficulty = document.getElementById('difficulty');
  const pBar = document.getElementById('pHealth');
  const eBar = document.getElementById('eHealth');

  const pPercent = document.getElementById('playerPercent');
  const ePercent = document.getElementById('enemyPercent');
  const message = document.getElementById('message');
  const specialStatus = document.getElementById('specialStatus');

  // Quantidade de imagens de cada animação do Titã.
  const titanAnimations = {
    idle: 4,
    walk: 6,
    backward: 6,
    light: 4,
    heavy: 6,
    kick: 5,
    block: 3,
    hit: 3,
    victory: 4
  };

  const titanFrames = {};

  // Carrega os sprites da pasta "sprites".
  for (const [name, count] of Object.entries(titanAnimations)) {
    titanFrames[name] = Array.from({ length: count }, (_, i) => {
      const image = new Image();
      image.src = `sprites/${name}_${i}.png`;
      return image;
    });
  }

  const keys = {};
  const floor = 365;

  let player;
  let enemy;
  let particles = [];
  let last = 0;
  let gameOver = false;
  let running = false;
  let shake = 0;

  let enemySpeed = 1.25;
  let enemyDamage = 9;
  let enemyCooldown = 78;

  function showScreen(which) {
    startScreen.classList.toggle('hidden', which !== 'start');
    fightScreen.classList.toggle('hidden', which !== 'fight');
    endScreen.classList.toggle('hidden', which !== 'end');
  }

  function setDifficulty() {
    if (difficulty.value === 'easy') {
      enemySpeed = .85;
      enemyDamage = 6;
      enemyCooldown = 100;
    } else if (difficulty.value === 'hard') {
      enemySpeed = 1.8;
      enemyDamage = 13;
      enemyCooldown = 58;
    } else {
      enemySpeed = 1.25;
      enemyDamage = 9;
      enemyCooldown = 78;
    }
  }

  function resetFight() {
    player = {
      x: 175,
      y: floor,
      w: 42,
      h: 82,
      hp: 100,
      vx: 0,
      vy: 0,
      face: 1,
      ground: true,
      attack: 0,
      special: 0,
      inv: 0,
      cool: 0,
      _hit: false
    };

    enemy = {
      x: 730,
      y: floor,
      w: 100,
      h: 150,
      hp: 100,
      vx: 0,
      face: -1,
      attack: 0,
      cool: 70,
      flash: 0,
      anim: 'idle',
      frame: 0,
      animClock: 0,
      actionLock: 0,
      hitReact: 0,
      blockTime: 0
    };

    particles = [];
    gameOver = false;

    message.textContent =
      'Prepare-se! Derrote o Titã para defender a muralha.';

    updateHud();
  }

  function startGame() {
    setDifficulty();
    resetFight();
    showScreen('fight');
    running = true;
    last = 0;
    requestAnimationFrame(loop);
  }

  function finishGame(won) {
    if (gameOver) return;

    gameOver = true;

    if (won && enemy) {
      enemy.anim = 'victory';
      enemy.frame = 0;
      enemy.animClock = 0;
      message.textContent = 'O Titã foi derrotado!';
    }

    document.getElementById('endTitle').textContent =
      won ? 'VITÓRIA!' : 'DERROTA!';

    document.getElementById('endText').textContent = won
      ? 'Você derrotou Brutus e salvou a muralha!'
      : 'Brutus venceu desta vez. Treine e tente novamente!';

    // Mostra a animação de vitória antes da tela final.
    setTimeout(() => {
      running = false;
      showScreen('end');
    }, won ? 1000 : 350);
  }

  function updateHud() {
    pBar.style.width = Math.max(0, player.hp) + '%';
    eBar.style.width = Math.max(0, enemy.hp) + '%';

    pPercent.textContent =
      Math.max(0, Math.ceil(player.hp)) + '%';

    ePercent.textContent =
      Math.max(0, Math.ceil(enemy.hp)) + '%';

    specialStatus.textContent = player.special <= 0
      ? 'ESPECIAL PRONTO: K'
      : 'ESPECIAL RECARREGANDO...';
  }

  // Cria partículas quando alguém recebe um golpe.
  function burst(x, y, color, n = 10) {
    for (let i = 0; i < n; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - .5) * 7,
        vy: (Math.random() - .8) * 7,
        life: 20 + Math.random() * 15,
        color
      });
    }
  }

  function hit(target, dmg, knock) {
    target.hp = Math.max(0, target.hp - dmg);
    target.vx = knock;
    target.flash = 8;

    burst(
      target.x + target.w / 2,
      target.y - target.h * .55,
      '#ffc857',
      12
    );

    shake = 7;
    updateHud();
  }

  // Comandos do jogador.
  function pressAction(action) {
    if (!running || gameOver) return;

    if (action === 'left') keys.a = true;
    if (action === 'right') keys.d = true;

    if (action === 'jump' && player.ground) {
      player.vy = -13;
      player.ground = false;

      burst(player.x + 20, floor, '#b9d8e8', 4);
    }

    if (action === 'attack' && player.cool <= 0) {
      player.attack = 12;
      player.cool = 22;
      player._hit = false;
    }

    if (
      action === 'special' &&
      player.special <= 0 &&
      player.cool <= 0
    ) {
      player.special = 95;
      player.attack = 22;
      player.cool = 32;
      player._hit = false;

      burst(
        player.x + player.w / 2,
        player.y - player.h / 2,
        '#62d6ff',
        18
      );
    }
  }

  // Teclado.
  window.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();

    if ([' ', 'arrowup', 'arrowleft', 'arrowright'].includes(k)) {
      e.preventDefault();
    }

    if (keys[k]) return;
    keys[k] = true;

    if (k === 'j') pressAction('attack');
    if (k === 'k') pressAction('special');

    if (k === 'w' || k === 'arrowup') {
      pressAction('jump');
    }

    if (k === 'a' || k === 'arrowleft') {
      keys.a = true;
    }

    if (k === 'd' || k === 'arrowright') {
      keys.d = true;
    }
  });

  window.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();

    keys[k] = false;

    if (k === 'a' || k === 'arrowleft') keys.a = false;
    if (k === 'd' || k === 'arrowright') keys.d = false;
  });

  // Controles para telas sensíveis ao toque.
  document.querySelectorAll('[data-act]').forEach(button => {
    const action = button.dataset.act;

    const release = () => {
      if (action === 'left') keys.a = false;
      if (action === 'right') keys.d = false;
    };

    button.addEventListener('pointerdown', e => {
      e.preventDefault();

      if (action === 'left') keys.a = true;
      else if (action === 'right') keys.d = true;
      else pressAction(action);
    });

    button.addEventListener('pointerup', release);
    button.addEventListener('pointerleave', release);
    button.addEventListener('pointercancel', release);
  });

  // Botões dos menus.
  document.getElementById('startButton')
    .addEventListener('click', startGame);

  document.getElementById('rematchButton')
    .addEventListener('click', startGame);

  document.getElementById('backToMenu')
    .addEventListener('click', () => {
      running = false;
      showScreen('start');
    });

  document.getElementById('endMenuButton')
    .addEventListener('click', () => {
      running = false;
      showScreen('start');
    });

  // Desenha o cenário da arena.
  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, 440);

    g.addColorStop(0, '#101b2c');
    g.addColorStop(.65, '#384b5b');
    g.addColorStop(1, '#8a6b54');

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 960, 440);

    // Sol.
    ctx.fillStyle = '#d9c58b';
    ctx.beginPath();
    ctx.arc(790, 76, 32, 0, Math.PI * 2);
    ctx.fill();

    // Silhueta da muralha.
    ctx.fillStyle = '#273644';
    ctx.fillRect(0, 210, 960, 90);

    for (let i = 0; i < 960; i += 85) {
      ctx.fillStyle = i % 170 ? '#334450' : '#3d4c56';

      ctx.fillRect(i, 178 + (i % 3) * 10, 65, 122);

      ctx.beginPath();
      ctx.moveTo(i - 8, 178 + (i % 3) * 10);
      ctx.lineTo(i + 32, 150 + (i % 3) * 10);
      ctx.lineTo(i + 73, 178 + (i % 3) * 10);
      ctx.fill();
    }

    // Chão.
    ctx.fillStyle = '#18212a';
    ctx.fillRect(0, floor, 960, 75);

    ctx.fillStyle = '#4c5150';

    for (let i = 0; i < 960; i += 55) {
      ctx.fillRect(i, floor + 8, 35, 3);
      ctx.fillRect(i + 20, floor + 32, 25, 2);
    }

    ctx.strokeStyle = '#d8b56a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, floor);
    ctx.lineTo(960, floor);
    ctx.stroke();
  }

  // Desenha o lutador Kai.
  function drawPlayer() {
    const p = player;

    ctx.save();
    ctx.translate(p.x + p.w / 2, p.y - p.h / 2);
    ctx.scale(p.face, 1);

    // Capa.
    ctx.fillStyle = '#a63f43';
    ctx.beginPath();
    ctx.moveTo(-13, -25);
    ctx.lineTo(-35, 22);
    ctx.lineTo(-8, 12);
    ctx.lineTo(2, -19);
    ctx.fill();

    // Pernas.
    ctx.fillStyle = '#25374b';
    ctx.fillRect(-12, 10, 10, 28);
    ctx.fillRect(3, 10, 10, 28);

    // Botas.
    ctx.fillStyle = '#d8dfdf';
    ctx.fillRect(-14, 34, 14, 6);
    ctx.fillRect(2, 34, 14, 6);

    // Corpo.
    ctx.fillStyle = p.inv > 0 ? '#fff' : '#c9bda2';
    ctx.fillRect(-16, -25, 32, 39);

    // Equipamento.
    ctx.strokeStyle = '#536b7b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-13, -19);
    ctx.lineTo(12, 8);
    ctx.moveTo(13, -19);
    ctx.lineTo(-12, 8);
    ctx.stroke();

    // Cabeça.
    ctx.fillStyle = '#e0b28b';
    ctx.beginPath();
    ctx.arc(0, -37, 13, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo.
    ctx.fillStyle = '#332a2b';
    ctx.beginPath();
    ctx.moveTo(-13, -39);
    ctx.lineTo(-7, -53);
    ctx.lineTo(10, -49);
    ctx.lineTo(13, -38);
    ctx.lineTo(3, -43);
    ctx.lineTo(-5, -39);
    ctx.fill();

    // Efeito do golpe.
    if (p.attack > 0) {
      ctx.strokeStyle = p.special > 0 ? '#62d6ff' : '#edf7ff';
      ctx.lineWidth = p.special > 0 ? 7 : 4;
      ctx.beginPath();
      ctx.moveTo(13, -12);
      ctx.lineTo(52, -30);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Desenha o Titã usando os sprites enviados.
  function drawEnemy() {
    const e = enemy;
    const frames = titanFrames[e.anim] || titanFrames.idle;
    const frame = frames[Math.floor(e.frame) % frames.length];

    if (!frame || !frame.complete || !frame.naturalWidth) return;

    const scale = 1.08;
    const w = frame.naturalWidth * scale;
    const h = frame.naturalHeight * scale;

    ctx.save();

    if (e.flash > 0) {
      ctx.globalAlpha = .72;
      ctx.filter = 'brightness(1.8)';
    }

    // Espelha o sprite para o Titã olhar para o jogador.
    ctx.translate(e.x + e.w / 2, e.y);
    ctx.scale(e.face, 1);
    ctx.drawImage(frame, -w / 2, -h, w, h);

    ctx.restore();
  }

  // Atualiza a luta e a inteligência artificial do Titã.
  function update(dt) {
    if (gameOver || !running) return;

    const p = player;
    const e = enemy;

    p.cool = Math.max(0, p.cool - dt);
    p.special = Math.max(0, p.special - dt);
    p.attack = Math.max(0, p.attack - dt);
    p.inv = Math.max(0, p.inv - dt);

    e.cool -= dt;
    e.attack = Math.max(0, e.attack - dt);
    e.flash = Math.max(0, e.flash - dt);
    e.actionLock = Math.max(0, e.actionLock - dt);
    e.hitReact = Math.max(0, e.hitReact - dt);
    e.blockTime = Math.max(0, e.blockTime - dt);

    // Movimento do jogador.
    p.vx = 0;

    if (keys.a) {
      p.vx = -4.2;
      p.face = -1;
    }

    if (keys.d) {
      p.vx = 4.2;
      p.face = 1;
    }

    p.x = Math.max(
      10,
      Math.min(900 - p.w, p.x + p.vx * dt)
    );

    // Gravidade e pulo.
    p.vy += .65 * dt;
    p.y += p.vy * dt;

    if (p.y >= floor) {
      p.y = floor;
      p.vy = 0;
      p.ground = true;
    }

    // O Titã olha para o jogador.
    e.face = e.x > p.x ? -1 : 1;

    const distance = Math.abs(
      (e.x + e.w / 2) - (p.x + p.w / 2)
    );

    // Inteligência artificial:
    // andar, recuar, bloquear, socar e chutar.
    if (e.hitReact > 0) {
      e.anim = 'hit';
    } else if (e.actionLock > 0) {
      // Mantém a animação do ataque atual.
    } else if (distance > 135) {
      e.anim = e.x > p.x ? 'walk' : 'backward';
      e.x -= Math.sign(e.x - p.x) * enemySpeed * dt;
    } else if (e.cool <= 0) {
      const roll = Math.random();

      if (roll < .18) {
        // Bloqueio.
        e.anim = 'block';
        e.blockTime = 28;
        e.actionLock = 28;
        e.cool = enemyCooldown * .55;
      } else if (roll < .45) {
        // Soco rápido.
        e.anim = 'light';
        e.attack = 16;
        e.actionLock = 24;
        e.cool = enemyCooldown;
      } else if (roll < .72) {
        // Chute.
        e.anim = 'kick';
        e.attack = 19;
        e.actionLock = 29;
        e.cool = enemyCooldown * 1.12;
      } else {
        // Soco pesado.
        e.anim = 'heavy';
        e.attack = 24;
        e.actionLock = 36;
        e.cool = enemyCooldown * 1.3;
      }
    } else {
      e.anim = 'idle';
    }

    e.x = Math.max(
      5,
      Math.min(880, e.x + e.vx * dt)
    );

    e.vx *= Math.pow(.82, dt);

    // Controla a velocidade das animações.
    e.animClock += dt;

    const frameRate = e.anim === 'idle' ? 8 :
      e.anim === 'walk' || e.anim === 'backward' ? 5 :
      e.anim === 'victory' ? 10 : 4;

    const frameCount =
      (titanFrames[e.anim] || titanFrames.idle).length;

    if (e.animClock >= frameRate) {
      e.frame = (e.frame + 1) % frameCount;
      e.animClock = 0;
    }

    if (e.actionLock <= 0 && e.anim !== 'hit') {
      e.frame = 0;
    }

    // Ataque do Titã contra o jogador.
    if (
      e.attack > 0 &&
      distance < 150 &&
      e.blockTime <= 0 &&
      p.inv <= 0 &&
      p.y >= floor - 4
    ) {
      hit(p, enemyDamage, e.face === -1 ? -5 : 5);
      p.inv = 18;

      message.textContent =
        'O Titã atacou! Use J para golpear e K para o especial.';

      e.attack = 0;
    }

    // Ataque do jogador contra o Titã.
    if (
      p.attack > 0 &&
      p.attack <= 11 &&
      distance < 150 &&
      !p._hit
    ) {
      if (e.anim === 'block' && e.blockTime > 0) {
        burst(e.x + e.w / 2, e.y - 70, '#9edfff', 5);
        message.textContent = 'O Titã bloqueou seu ataque!';
      } else {
        hit(e, p.special > 0 ? 24 : 12, p.face * 5);

        e.anim = 'hit';
        e.hitReact = 18;
        e.actionLock = Math.max(e.actionLock, 18);
      }

      p._hit = true;
    }

    if (p.attack <= 0) {
      p._hit = false;
    }

    updateHud();

    if (e.hp <= 0) {
      e.anim = 'victory';
      finishGame(true);
    }

    if (p.hp <= 0) {
      finishGame(false);
    }

    if (shake > 0) {
      shake -= dt;
    }
  }

  // Desenha todos os elementos da arena.
  function draw() {
    ctx.save();

    if (shake > 0) {
      ctx.translate(
        (Math.random() - .5) * shake,
        (Math.random() - .5) * shake
      );
    }

    drawBackground();

    particles.forEach(q => {
      ctx.globalAlpha = Math.max(0, q.life / 30);
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x, q.y, 4, 4);
    });

    ctx.globalAlpha = 1;

    drawPlayer();
    drawEnemy();

    ctx.fillStyle = '#ffffffb8';
    ctx.font = 'bold 13px system-ui';
    ctx.fillText('ARENA DA MURALHA', 20, 28);

    ctx.restore();
  }

  // Loop principal do jogo.
  function loop(t) {
    if (!running) return;

    const dt = Math.min(2, (t - last) / 16.67 || 1);
    last = t;

    update(dt);
    draw();

    particles = particles.filter(q => q.life > 0);

    particles.forEach(q => {
      q.x += q.vx;
      q.y += q.vy;
      q.vy += .15;
      q.life -= dt;
    });

    if (running) {
      requestAnimationFrame(loop);
    }
  }

  // Exibe o menu quando o jogo abre.
  showScreen('start');
})();
