let score = 0;
let gameInterval;

const target = document.getElementById("target");
const scoreText = document.getElementById("score");
const msg = document.getElementById("msg");
const gameArea = document.getElementById("gameArea");

function randomPosition() {
  const maxX = gameArea.clientWidth - 40;
  const maxY = gameArea.clientHeight - 40;

  target.style.left = Math.floor(Math.random() * maxX) + "px";
  target.style.top = Math.floor(Math.random() * maxY) + "px";
}

function startGame() {
  score = 0;
  scoreText.innerText = score;
  msg.innerText = "Jogo iniciado!";

  clearInterval(gameInterval);

  gameInterval = setInterval(() => {
    target.style.display = "block";
    randomPosition();
  }, 1000);
}

target.addEventListener("click", () => {
  score++;
  scoreText.innerText = score;
  randomPosition();
});