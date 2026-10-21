const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");

const gameOverScreen = document.getElementById("gameOver");

const jumpButton = document.getElementById("jumpButton");
const restartButton = document.getElementById("restartButton");

let score = 0;
let gameRunning = true;
let scoreInterval;


/* =========================
   PULAR
========================= */

function jump() {

    if (!gameRunning) {
        return;
    }

    if (player.classList.contains("pulando")) {
        return;
    }

    player.classList.add("pulando");

    setTimeout(() => {
        player.classList.remove("pulando");
    }, 600);
}


/* Tecla espaço */

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        event.preventDefault();

        jump();
    }

});


/* Botão */

jumpButton.addEventListener("click", jump);


/* =========================
   PONTUAÇÃO
========================= */

function startScore() {

    score = 0;

    scoreElement.textContent = score;

    scoreInterval = setInterval(() => {

        if (gameRunning) {

            score++;

            scoreElement.textContent = score;
        }

    }, 100);
}


/* =========================
   COLISÃO
========================= */
function checkCollision() {

    if (!gameRunning) {
        return;
    }

    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    // Diminui a área de colisão do jogador
    const playerHitbox = {
        left: playerRect.left + 10,
        right: playerRect.right - 10,
        top: playerRect.top + 8,
        bottom: playerRect.bottom - 5
    };

    // Diminui bastante a área de colisão do cacto
    const obstacleHitbox = {
        left: obstacleRect.left + 15,
        right: obstacleRect.right - 15,
        top: obstacleRect.top + 10,
        bottom: obstacleRect.bottom - 5
    };

    const collision =
        playerHitbox.left < obstacleHitbox.right &&
        playerHitbox.right > obstacleHitbox.left &&
        playerHitbox.top < obstacleHitbox.bottom &&
        playerHitbox.bottom > obstacleHitbox.top;

    if (collision) {
        gameOver();
    }
}



/* Verifica colisão constantemente */

setInterval(checkCollision, 10);


/* =========================
   GAME OVER
========================= */

function gameOver() {

    gameRunning = false;

    clearInterval(scoreInterval);

    obstacle.style.animationPlayState = "paused";

    finalScoreElement.textContent = score;

    gameOverScreen.style.display = "flex";
}


/* =========================
   REINICIAR
========================= */

restartButton.addEventListener("click", function() {

    gameRunning = true;

    score = 0;

    scoreElement.textContent = score;

    gameOverScreen.style.display = "none";

    obstacle.style.animation = "none";

    void obstacle.offsetWidth;

    obstacle.style.animation = "moverObstaculo 2s linear infinite";

    startScore();

});


/* Começa o jogo */

startScore();
