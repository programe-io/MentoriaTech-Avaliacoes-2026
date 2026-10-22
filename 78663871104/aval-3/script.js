
let points = 0;
let active = false;
let jumping = false;
let meteorX = 450;
let playerY = 0;
let speed = 5;
let timer;

function jump() {
  if (!active || jumping) return;

  jumping = true;
  playerY = 100;
  document.getElementById("player").style.bottom = "110px";

  setTimeout(() => {
    playerY = 0;
    jumping = false;
    document.getElementById("player").style.bottom = "10px";
  }, 550);
}

function restart() {
  clearInterval(timer);

  points = 0;
  meteorX = 450;
  speed = 5;
  active = true;

  document.getElementById("score").textContent = "Pontos: 0";
  document.getElementById("message").textContent = "Boa sorte!";
  document.getElementById("meteor").style.right = "-45px";

  timer = setInterval(() => {
    meteorX -= speed;

    document.getElementById("meteor").style.right =
      (450 - meteorX) + "px";

    if (meteorX < 0) {
      meteorX = 450;
      points++;
      speed += 0.15;

      document.getElementById("score").textContent =
        "Pontos: " + points;
    }

    if (meteorX < 65 && meteorX > 0 && !jumping) {
      clearInterval(timer);
      active = false;

      document.getElementById("message").textContent =
        "💥 Fim de jogo! Pontuação: " + points;
    }
  }, 30);
}
