
(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const pBar = document.getElementById("pHealth");
  const eBar = document.getElementById("eHealth");
  const message = document.getElementById("message");

  const keys = {};
  let particles = [];
  let last = 0;
  let gameOver = false;
  let shake = 0;

  const floor = 365;
  let player, enemy;

  // Reiniciar a luta
  function reset() {
    player = {
      x: 175, y: floor, w: 42, h: 82,
      hp: 100, max: 100,
      vx: 0, vy: 0, face: 1,
      ground: true, attack: 0,
      special: 0, inv: 0, cool: 0,
      _hit: false
    };

    enemy = {
      x: 730, y: floor, w: 76, h: 128,
      hp: 100, max: 100,
      vx: 0, vy: 0, face: -1,
      ground: true, attack: 0,
      cool: 70, flash: 0
    };

    particles = [];
    gameOver = false;

    message.textContent =
      "Prepare-se! Derrote o Titã para defender a muralha.";

    updateHud();
  }

  // Atualizar barras de vida
  function updateHud() {
    pBar.style.width =
      Math.max(0, player.hp) + "%";

    eBar.style.width =
      Math.max(0, enemy.hp) + "%";
  }

  // Criar partículas para os golpes
  function burst(x, y, color, n = 10) {
    for (let i = 0; i < n; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.8) * 7,
        life: 20 + Math.random() * 15,
        color
      });
    }
  }

  // Aplicar dano
  function hit(target, dmg, knock) {
    target.hp = Math.max(0, target.hp - dmg);
    target.vx = knock;
    target.flash = 8;

    burst(
      target.x + target.w / 2,
      target.y - target.h * 0.55,
      "#ffc857",
      12
    );

    shake = 7;
    updateHud();
  }

  // Ações do jogador
  function pressAction(action) {
    if (gameOver) return;

    if (action === "left") keys.a = true;
    if (action === "right") keys.d = true;

    if (action === "jump" && player.ground) {
      player.vy = -13;
      player.ground = false;

      burst(
        player.x + 20,
        floor,
        "#b9d8e8",
        4
      );
    }

    if (action === "attack" && player.cool <= 0) {
      player.attack = 12;
      player.cool = 22;
      player._hit = false;
    }

    if (action === "special" && player.special <= 0) {
      player.special = 95;
      player.attack = 22;
      player.cool = 32;
      player._hit = false;

      burst(
        player.x + player.w / 2,
        player.y - player.h / 2,
        "#62d6ff",
        18
      );
    }
  }

  // Teclado
  window.addEventListener("keydown", e => {
    const k = e.key.toLowerCase();

    keys[k] = true;

    if ([" ", "arrowup", "arrowleft", "arrowright"].includes(k)) {
      e.preventDefault();
    }

    if (k === "j") pressAction("attack");
    if (k === "k") pressAction("special");

    if (k === "w" && player.ground) {
      pressAction("jump");
    }
  });

  window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
  });

  // Botões para celulares
  document.querySelectorAll("[data-act]").forEach(button => {
    const action = button.dataset.act;

    button.addEventListener("pointerdown", e => {
      e.preventDefault();

      if (action === "left") keys.a = true;
      else if (action === "right") keys.d = true;
      else pressAction(action);
    });

    const release = () => {
      if (action === "left") keys.a = false;
      if (action === "right") keys.d = false;
    };

    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("pointercancel", release);
  });

  document.getElementById("restart")
    .addEventListener("click", reset);

  // Desenhar o cenário
  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, 440);

    g.addColorStop(0, "#101b2c");
    g.addColorStop(0.65, "#384b5b");
    g.addColorStop(1, "#8a6b54");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 960, 440);

    // Lua
    ctx.fillStyle = "#d9c58b";
    ctx.beginPath();
    ctx.arc(790, 76, 32, 0, Math.PI * 2);
    ctx.fill();

    // Muralha ao fundo
    ctx.fillStyle = "#273644";
    ctx.fillRect(0, 210, 960, 90);

    for (let i = 0; i < 960; i += 85) {
      ctx.fillStyle =
        i % 170 ? "#334450" : "#3d4c56";

      ctx.fillRect(
        i,
        178 + (i % 3) * 10,
        65,
        122
      );

      ctx.beginPath();
      ctx.moveTo(i - 8, 178 + (i % 3) * 10);
      ctx.lineTo(i + 32, 150 + (i % 3) * 10);
      ctx.lineTo(i + 73, 178 + (i % 3) * 10);
      ctx.fill();
    }

    // Chão da arena
    ctx.fillStyle = "#18212a";
    ctx.fillRect(0, floor, 960, 75);

    ctx.fillStyle = "#4c5150";

    for (let i = 0; i < 960; i += 55) {
      ctx.fillRect(i, floor + 8, 35, 3);
      ctx.fillRect(i + 20, floor + 32, 25, 2);
    }

    ctx.strokeStyle = "#d8b56a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, floor);
    ctx.lineTo(960, floor);
    ctx.stroke();
  }

  // Desenhar o personagem
  function drawPlayer() {
    const p = player;

    ctx.save();
    ctx.translate(
      p.x + p.w / 2,
      p.y - p.h / 2
    );
    ctx.scale(p.face, 1);

    // Capa
    ctx.fillStyle = "#a63f43";
    ctx.beginPath();
    ctx.moveTo(-13, -25);
    ctx.lineTo(-35, 22);
    ctx.lineTo(-8, 12);
    ctx.lineTo(2, -19);
    ctx.fill();

    // Pernas
    ctx.fillStyle = "#25374b";
    ctx.fillRect(-12, 10, 10, 28);
    ctx.fillRect(3, 10, 10, 28);

    // Botas
    ctx.fillStyle = "#d8dfdf";
    ctx.fillRect(-14, 34, 14, 6);
    ctx.fillRect(2, 34, 14, 6);

    // Uniforme
    ctx.fillStyle =
      p.inv > 0 ? "#ffffff" : "#c9bda2";

    ctx.fillRect(-16, -25, 32, 39);

    // Equipamento
    ctx.strokeStyle = "#536b7b";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-13, -19);
    ctx.lineTo(12, 8);
    ctx.moveTo(13, -19);
    ctx.lineTo(-12, 8);
    ctx.stroke();

    // Cabeça
    ctx.fillStyle = "#e0b28b";
    ctx.beginPath();
    ctx.arc(0, -37, 13, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo
    ctx.fillStyle = "#332a2b";
    ctx.beginPath();
    ctx.moveTo(-13, -39);
    ctx.lineTo(-7, -53);
    ctx.lineTo(10, -49);
    ctx.lineTo(13, -38);
    ctx.lineTo(3, -43);
    ctx.lineTo(-5, -39);
    ctx.fill();

    // Lâmina
    if (p.attack > 0) {
      ctx.strokeStyle =
        p.special > 0 ? "#62d6ff" : "#edf7ff";

      ctx.lineWidth = p.special > 0 ? 7 : 4;
      ctx.beginPath();
      ctx.moveTo(13, -12);
      ctx.lineTo(52, -30);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(13, -14, 10, 4);
    }

    ctx.restore();
  }

  // Desenhar o Titã
  function drawEnemy() {
    const e = enemy;

    ctx.save();
    ctx.translate(
      e.x + e.w / 2,
      e.y - e.h / 2
    );
    ctx.scale(e.face, 1);

    // Braços
    ctx.fillStyle =
      e.flash > 0 ? "#ffe3bd" : "#a85e51";

    ctx.fillRect(-28, -22, 18, 62);
    ctx.fillRect(10, -22, 18, 62);

    // Pernas
    ctx.fillStyle = "#75433f";
    ctx.fillRect(-23, 36, 20, 27);
    ctx.fillRect(5, 36, 20, 27);

    // Corpo
    ctx.fillStyle =
      e.flash > 0 ? "#fff1dd" : "#b76d5d";

    ctx.beginPath();
    ctx.roundRect(-31, -48, 62, 84, 15);
    ctx.fill();

    // Cabeça
    ctx.fillStyle = "#d98d75";
    ctx.beginPath();
    ctx.ellipse(0, -62, 25, 29, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo
    ctx.fillStyle = "#50362f";
    ctx.beginPath();
    ctx.moveTo(-26, -68);
    ctx.lineTo(-22, -88);
    ctx.lineTo(-6, -93);
    ctx.lineTo(2, -82);
    ctx.lineTo(20, -88);
    ctx.lineTo(27, -64);
    ctx.lineTo(13, -72);
    ctx.lineTo(-2, -69);
    ctx.fill();

    // Olhos
    ctx.fillStyle = "#301e1c";
    ctx.fillRect(-14, -62, 8, 4);
    ctx.fillRect(7, -62, 8, 4);

    // Boca
    ctx.strokeStyle = "#5a2727";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-9, -48);
    ctx.lineTo(10, -48);
    ctx.stroke();

    // Braço de ataque
    if (e.attack > 0) {
      ctx.fillStyle = "#d98d75";
      ctx.beginPath();
      ctx.ellipse(39, -8, 22, 14, -0.25, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Atualizar a luta
  function update(dt) {
    if (gameOver) return;

    const p = player;
    const e = enemy;

    p.cool = Math.max(0, p.cool - dt);
    p.special = Math.max(0, p.special - dt);
    p.attack = Math.max(0, p.attack - dt);
    p.inv = Math.max(0, p.inv - dt);

    e.cool -= dt;
    e.attack = Math.max(0, e.attack - dt);
    e.flash = Math.max(0, e.flash - dt);

    // Movimento do jogador
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

    // Gravidade e salto
    p.vy += 0.65 * dt;
    p.y += p.vy * dt;

    if (p.y >= floor) {
      p.y = floor;
      p.vy = 0;
      p.ground = true;
    }

    // O Titã olha para o jogador
    e.face = e.x > p.x ? -1 : 1;

    let distance = Math.abs(
      (e.x + e.w / 2) -
      (p.x + p.w / 2)
    );

    // Aproximação do inimigo
    if (distance > 88) {
      e.x -= Math.sign(e.x - p.x) * 1.25 * dt;
    }

    e.x = Math.max(
      5,
      Math.min(880, e.x + e.vx * dt)
    );

    e.vx *= Math.pow(0.82, dt);

    // Ataque do Titã
    if (e.cool <= 0 && distance < 115) {
      e.attack = 20;
      e.cool = 78;

      if (p.inv <= 0 && p.y >= floor - 4) {
        hit(p, 9, e.face === -1 ? -5 : 5);
        p.inv = 18;

        message.textContent =
          "O Titã acertou! Pule para escapar dos ataques.";
      }
    }

    // Ataque do jogador
    if (
      p.attack > 0 &&
      p.attack <= 11 &&
      distance < 120 &&
      !p._hit
    ) {
      const damage = p.special > 0 ? 24 : 12;

      hit(e, damage, p.face * 5);
      p._hit = true;
    }

    if (p.attack <= 0) {
      p._hit = false;
    }

    // Verificar vitória ou derrota
    if (e.hp <= 0) {
      gameOver = true;

      message.textContent =
        "VITÓRIA! A muralha está salva. Aperte Reiniciar luta para jogar novamente.";
    }

    if (p.hp <= 0) {
      gameOver = true;

      message.textContent =
        "DERROTA! O Titã rompeu a defesa. Tente outra estratégia!";
    }

    if (shake > 0) {
      shake -= dt;
    }
  }

  // Desenhar a arena completa
  function draw() {
    ctx.save();

    if (shake > 0) {
      ctx.translate(
        (Math.random() - 0.5) * shake,
        (Math.random() - 0.5) * shake
      );
    }

    drawBackground();

    // Partículas dos golpes
    particles.forEach(q => {
      ctx.globalAlpha = Math.max(0, q.life / 30);
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x, q.y, 4, 4);
    });

    ctx.globalAlpha = 1;

    drawPlayer();
    drawEnemy();

    if (!gameOver) {
      ctx.fillStyle = "#ffffffb8";
      ctx.font = "bold 13px system-ui";
      ctx.fillText("ARENA DA MURALHA", 20, 28);
    }

    ctx.restore();
  }

  // Loop principal
  function loop(t) {
    const dt = Math.min(
      2,
      (t - last) / 16.67 || 1
    );

    last = t;

    update(dt);
    draw();

    particles = particles.filter(q => q.life > 0);

    particles.forEach(q => {
      q.x += q.vx;
      q.y += q.vy;
      q.vy += 0.15;
      q.life -= dt;
    });

    requestAnimationFrame(loop);
  }

  // Iniciar o jogo
  reset();
  requestAnimationFrame(loop);