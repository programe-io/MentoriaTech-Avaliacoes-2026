<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Desvie dos Inimigos</title>
<style>
body {
  margin: 0;
  background: black;
  overflow: hidden;
  font-family: Arial;
  color: white;
}

#game {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.player {
  width: 50px;
  height: 50px;
  background: lime;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.enemy {
  width: 40px;
  height: 40px;
  background: red;
  position: absolute;
  top: 0;
}

#score {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
</head>
<body>

<div id="game">
  <div id="player" class="player"></div>
  <div id="score">Tempo: 0</div>
</div>

<script>
const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let playerX = window.innerWidth / 2;
let speed = 7;
let enemies = [];
let time = 0;
let gameOver = false;

// movimento
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") playerX -= speed;
  if (e.key === "ArrowRight") playerX += speed;

  player.style.left = playerX + "px";
});

// criar inimigos
function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");

  enemy.style.left = Math.random() * window.innerWidth + "px";

  game.appendChild(enemy);
  enemies.push(enemy);
}

// loop do jogo
function update() {
  if (gameOver) return;

  time++;
  scoreDisplay.textContent = "Tempo: " + Math.floor(time / 10);

  enemies.forEach((enemy, index) => {
    let y = enemy.offsetTop + 5;
    enemy.style.top = y + "px";

    // colisão
    const pRect = player.getBoundingClientRect();
    const eRect = enemy.getBoundingClientRect();

    if (
      pRect.left < eRect.right &&
      pRect.right > eRect.left &&
      pRect.top < eRect.bottom &&
      pRect.bottom > eRect.top
    ) {
      alert("Game Over! Tempo: " + Math.floor(time / 10));
      gameOver = true;
    }

    // remove inimigo fora da tela
    if (y > window.innerHeight) {
      enemy.remove();
      enemies.splice(index, 1);
    }
  });

  requestAnimationFrame(update);
}

// spawn inimigos
setInterval(createEnemy, 800);

// iniciar
update();
</script>

</body>
</html>