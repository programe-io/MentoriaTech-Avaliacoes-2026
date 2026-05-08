// ======================
// CONFIGURAÇÃO DO JOGO
// ======================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// HUD
const vidaTxt = document.getElementById("vida");
const inimigosTxt = document.getElementById("inimigos");

// ======================
// PLAYER
// ======================

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: "cyan",
  speed: 5,
  vida: 100
};

// ======================
// ARRAYS
// ======================

const bullets = [];
const enemies = [];

// ======================
// CRIAR INIMIGOS
// ======================

function criarInimigo() {
  enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 20,
    color: "red",
    speed: 1.5
  });

  inimigosTxt.innerText = enemies.length;
}

// cria 5 inimigos
for(let i = 0; i < 5; i++) {
  criarInimigo();
}

// ======================
// CONTROLES
// ======================

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// ======================
// ATIRAR
// ======================

window.addEventListener("click", (e) => {

  const angle = Math.atan2(
    e.clientY - player.y,
    e.clientX - player.x
  );

  bullets.push({
    x: player.x,
    y: player.y,
    radius: 5,
    color: "yellow",
    speed: 10,
    dx: Math.cos(angle),
    dy: Math.sin(angle)
  });

});

// ======================
// MOVIMENTO PLAYER
// ======================

function moverPlayer() {

  if(keys["w"]) player.y -= player.speed;
  if(keys["s"]) player.y += player.speed;
  if(keys["a"]) player.x -= player.speed;
  if(keys["d"]) player.x += player.speed;

  // Limites da tela
  if(player.x < player.radius)
    player.x = player.radius;

  if(player.x > canvas.width - player.radius)
    player.x = canvas.width - player.radius;

  if(player.y < player.radius)
    player.y = player.radius;

  if(player.y > canvas.height - player.radius)
    player.y = canvas.height - player.radius;
}

// ======================
// BALAS
// ======================

function atualizarBalas() {

  bullets.forEach((bullet, index) => {

    bullet.x += bullet.dx * bullet.speed;
    bullet.y += bullet.dy * bullet.speed;

    // remover fora da tela
    if(
      bullet.x < 0 ||
      bullet.x > canvas.width ||
      bullet.y < 0 ||
      bullet.y > canvas.height
    ) {
      bullets.splice(index, 1);
    }

  });

}

// ======================
// INIMIGOS
// ======================

function atualizarInimigos() {

  enemies.forEach((enemy, eIndex) => {

    // seguir player
    const angle = Math.atan2(
      player.y - enemy.y,
      player.x - enemy.x
    );

    enemy.x += Math.cos(angle) * enemy.speed;
    enemy.y += Math.sin(angle) * enemy.speed;

    // colisão player
    const distPlayer = Math.hypot(
      player.x - enemy.x,
      player.y - enemy.y
    );

    if(distPlayer < player.radius + enemy.radius) {

      player.vida -= 0.2;

      vidaTxt.innerText = Math.floor(player.vida);

      if(player.vida <= 0) {
        alert("GAME OVER");
        location.reload();
      }
    }

    // colisão bala
    bullets.forEach((bullet, bIndex) => {

      const dist = Math.hypot(
        bullet.x - enemy.x,
        bullet.y - enemy.y
      );

      if(dist < enemy.radius) {

        enemies.splice(eIndex, 1);
        bullets.splice(bIndex, 1);

        criarInimigo();
      }

    });

  });

}

// ======================
// DESENHAR PLAYER
// ======================

function desenharPlayer() {

  ctx.fillStyle = player.color;

  ctx.beginPath();
  ctx.arc(
    player.x,
    player.y,
    player.radius,
    0,
    Math.PI * 2
  );

  ctx.fill();
}

// ======================
// DESENHAR BALAS
// ======================

function desenharBalas() {

  bullets.forEach((bullet) => {

    ctx.fillStyle = bullet.color;

    ctx.beginPath();
    ctx.arc(
      bullet.x,
      bullet.y,
      bullet.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });

}

// ======================
// DESENHAR INIMIGOS
// ======================

function desenharInimigos() {

  enemies.forEach((enemy) => {

    ctx.fillStyle = enemy.color;

    ctx.beginPath();
    ctx.arc(
      enemy.x,
      enemy.y,
      enemy.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });

}

// ======================
// LOOP DO JOGO
// ======================

function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moverPlayer();

  atualizarBalas();

  atualizarInimigos();

  desenharPlayer();

  desenharBalas();

  desenharInimigos();

  requestAnimationFrame(gameLoop);
}

// iniciar jogo
gameLoop();

// ======================
// RESPONSIVIDADE
// ======================

window.addEventListener("resize", () => {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

});