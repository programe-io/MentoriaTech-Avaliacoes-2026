const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const game = document.getElementById("game");
const message = document.getElementById("message");
const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
const startBtn = document.getElementById("startBtn");
const jumpBtn = document.getElementById("jumpBtn");

let running = false;
let score = 0;
let best = Number(localStorage.getItem("neonBest")) || 0;

let playerY = 0;
let velocity = 0;
let jumping = false;

let obstacleX = 0;
let obstacleActive = false;
let obstacleTimer = 0;
let lastTime = 0;
let animationId;

bestText.textContent = best;

function startGame() {
  score = 0;
  playerY = 0;
  velocity = 0;
  jumping = false;

  obstacleX = game.clientWidth + 50;
  obstacleActive = false;
  obstacleTimer = 0;

  running = true;
  lastTime = 0;

  scoreText.textContent = "0";

  player.style.bottom = "12px";
  obstacle.style.display = "none";

  message.style.display = "none";

  cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(loop);
}

function jump() {
  if (!running || jumping) return;

  jumping = true;
  velocity = 12;
}

function gameOver() {
  running = false;

  if (score > best) {
    best = score;
    localStorage.setItem("neonBest", best);
    bestText.textContent = best;
  }

  message.innerHTML = `
    <h2>GAME OVER!</h2>
    <p>Sua pontuação: ${score}</p>
    <p>Recorde: ${best}</p>
    <button id="restartBtn">JOGAR NOVAMENTE</button>
  `;

  message.style.display = "flex";
}

function loop(timestamp) {
  if (!running) return;

  const delta = lastTime
    ? Math.min((timestamp - lastTime) / 16.67, 2)
    : 1;

  lastTime = timestamp;

  // Física do pulo
  if (jumping) {
    playerY += velocity * delta;
    velocity -= 0.65 * delta;

    if (playerY <= 0) {
      playerY = 0;
      velocity = 0;
      jumping = false;
    }
  }

  player.style.bottom = (12 + playerY) + "px";

  // Criar obstáculos
  obstacleTimer += delta;

  if (!obstacleActive && obstacleTimer > 75) {
    obstacleActive = true;
    obstacleX = game.clientWidth + 30;
    obstacleTimer = 0;
    obstacle.style.display = "block";
  }

  // Movimentar obstáculos
  if (obstacleActive) {
    const speed = Math.min(7 + score / 150, 13);

    obstacleX -= speed * delta;
    obstacle.style.left = obstacleX + "px";

    // Verificar colisão
    const playerLeft = 55;
    const playerRight = 100;
    const obstacleLeft = obstacleX + 5;
    const obstacleRight = obstacleX + 38;

    if (
      playerRight > obstacleLeft &&
      playerLeft < obstacleRight &&
      playerY < 32
    ) {
      gameOver();
      return;
    }

    // Obstáculo ultrapassado
    if (obstacleX < -60) {
      obstacleActive = false;
      obstacle.style.display = "none";
    }
  }

  // Pontuação
  score += delta * 0.15;
  scoreText.textContent = Math.floor(score);

  animationId = requestAnimationFrame(loop);
}

// Botão de início e reinício
message.addEventListener("click", function(event) {
  if (
    event.target.id === "startBtn" ||
    event.target.id === "restartBtn"
  ) {
    startGame();
  }
});

// Controles
jumpBtn.addEventListener("pointerdown", jump);

game.addEventListener("pointerdown", function(event) {
  if (running && event.target !== jumpBtn) {
    jump();
  }
});

document.addEventListener("keydown", function(event) {
  if (
    event.code === "Space" ||
    event.code === "ArrowUp"
  ) {
    event.preventDefault();
    jump();
  }
});