
const player = document.getElementById("player");
const rope = document.getElementById("rope");
const scoreElement = document.getElementById("score");
const errorsElement = document.getElementById("errors");
const message = document.getElementById("message");
const startButton = document.getElementById("startButton");

let score = 0;
let errors = 0;
let playing = false;
let jumping = false;
let angle = 0;
let animation;
let lastAngle = 0;

const jumpDuration = 550;

function startGame() {
    score = 0;
    errors = 0;
    angle = 0;
    lastAngle = 0;
    jumping = false;
    playing = true;

    scoreElement.textContent = score;
    errorsElement.textContent = errors;

    player.classList.remove("jumping");
    message.style.display = "none";

    startButton.textContent = "REINICIAR";
    
    cancelAnimationFrame(animation);
    gameLoop();
}

function jump() {
    if (!playing || jumping) return;

    jumping = true;
    player.classList.add("jumping");

    setTimeout(() => {
        player.classList.remove("jumping");
        jumping = false;
    }, jumpDuration);
}

function gameLoop() {
    if (!playing) return;

    // Gira a corda
    const speed = 0.055 + score * 0.0005;
    angle += speed;

    rope.style.transform =
        `translateX(-50%) rotate(${angle}rad)`;

    // Detecta quando a corda passa pelo chão
    const currentAngle = Math.sin(angle);

    if (lastAngle > 0 && currentAngle <= 0) {
        checkJump();
    }

    lastAngle = currentAngle;

    animation = requestAnimationFrame(gameLoop);
}

function checkJump() {
    if (!playing) return;

    if (jumping) {
        score++;

        scoreElement.textContent = score;
    } else {
        errors++;

        errorsElement.textContent = errors;

        if (errors >= 3) {
            endGame();
        }
    }
}

function endGame() {
    playing = false;

    cancelAnimationFrame(animation);

    message.style.display = "block";
    message.innerHTML =
        `GAME OVER!<br>Você fez ${score} pontos!`;

    startButton.textContent = "JOGAR NOVAMENTE";
}

document.addEventListener("keydown", (event) => {
    if (
        event.code === "Space" ||
        event.code === "ArrowUp"
    ) {
        event.preventDefault();
        jump();
    }
});

document.addEventListener("touchstart", (event) => {
    if (playing) {
        jump();
    }
});

startButton.addEventListener("click", startGame);
