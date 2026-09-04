```javascript
const game = document.getElementById("game");
const menu = document.getElementById("menu");
const road = document.getElementById("road");
const player = document.getElementById("player");

const scoreText = document.getElementById("score");
const speedText = document.getElementById("speed");

const turboBar = document.getElementById("turbo");

const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let playerX = 0;

let score = 0;
let speed = 5;
let turbo = 100;

let running = false;
let turboActive = false;

let enemies = [];
let obstacles = [];

const keys = {
    left: false,
    right: false
};


// ==========================
// COMEÇAR
// ==========================

function startGame() {

    menu.style.display = "none";
    game.style.display = "block";

    resetGame();

    running = true;

    requestAnimationFrame(gameLoop);
}


// ==========================
// RESETAR
// ==========================

function resetGame() {

    score = 0;
    speed = 5;
    turbo = 100;

    scoreText.textContent = score;
    speedText.textContent = speed;

    enemies.forEach(enemy => enemy.remove());
    obstacles.forEach(obstacle => obstacle.remove());

    enemies = [];
    obstacles = [];

    playerX =
        road.clientWidth / 2 -
        player.offsetWidth / 2;

    player.style.left = playerX + "px";

    for (let i = 0; i < 3; i++) {
        createEnemy(i);
    }

    for (let i = 0; i < 4; i++) {
        createObstacle(i);
    }
}


// ==========================
// CRIAR INIMIGO
// ==========================

function createEnemy(index) {

    const enemy = document.createElement("div");

    enemy.classList.add("car");
    enemy.classList.add("enemy");

    enemy.style.left =
        Math.random() *
        (road.clientWidth - 70) + "px";

    enemy.style.top =
        -150 - index * 250 + "px";

    road.appendChild(enemy);

    enemies.push(enemy);
}


// ==========================
// CRIAR OBSTÁCULO
// ==========================

function createObstacle(index) {

    const obstacle =
        document.createElement("div");

    obstacle.classList.add("obstacle");

    const objects = [
        "🪨",
        "🛢️",
        "🚧",
        "💣"
    ];

    obstacle.textContent =
        objects[
            Math.floor(
                Math.random() * objects.length
            )
        ];

    obstacle.style.left =
        Math.random() *
        (road.clientWidth - 70) + "px";

    obstacle.style.top =
        -100 - index * 200 + "px";

    road.appendChild(obstacle);

    obstacles.push(obstacle);
}


// ==========================
// MOVIMENTAR JOGADOR
// ==========================

function movePlayer() {

    const moveSpeed =
        turboActive ? 9 : 6;

    if (keys.left) {
        playerX -= moveSpeed;
    }

    if (keys.right) {
        playerX += moveSpeed;
    }

    const maxX =
        road.clientWidth -
        player.offsetWidth -
        5;

    if (playerX < 5) {
        playerX = 5;
    }

    if (playerX > maxX) {
        playerX = maxX;
    }

    player.style.left =
        playerX + "px";
}


// ==========================
// COLISÃO
// ==========================

function collision(a, b) {

    const r1 =
        a.getBoundingClientRect();

    const r2 =
        b.getBoundingClientRect();

    return !(
        r1.bottom < r2.top ||
        r1.top > r2.bottom ||
        r1.right < r2.left ||
        r1.left > r2.right
    );
}


// ==========================
// LOOP
// ==========================

function gameLoop() {

    if (!running) {
        return;
    }

    movePlayer();

    moveEnemies();

    moveObstacles();

    updateTurbo();

    score++;

    scoreText.textContent =
        Math.floor(score / 10);

    if (score % 1000 === 0) {

        speed++;

        speedText.textContent =
            speed;
    }

    requestAnimationFrame(gameLoop);
}


// ==========================
// INIMIGOS
// ==========================

function moveEnemies() {

    enemies.forEach(enemy => {

        let y =
            parseFloat(enemy.style.top);

        y += turboActive
            ? speed * 1.7
            : speed;

        if (y >
            road.clientHeight + 100) {

            y =
                -150 -
                Math.random() * 300;

            enemy.style.left =
                Math.random() *
                (road.clientWidth - 70) +
                "px";
        }

        enemy.style.top =
            y + "px";

        if (collision(player, enemy)) {
            endGame();
        }
    });
}


// ==========================
// OBSTÁCULOS
// ==========================

function moveObstacles() {

    obstacles.forEach(obstacle => {

        let y =
            parseFloat(obstacle.style.top);

        y += turboActive
            ? speed * 1.7
            : speed;

        if (y >
            road.clientHeight + 100) {

            y =
                -100 -
                Math.random() * 300;

            obstacle.style.left =
                Math.random() *
                (road.clientWidth - 70) +
                "px";
        }

        obstacle.style.top =
            y + "px";

        if (collision(player, obstacle)) {
            endGame();
        }
    });
}


// ==========================
// TURBO
// ==========================

function activateTurbo() {

    if (turbo > 20 && running) {

        turboActive = true;

        setTimeout(() => {
            turboActive = false;
        }, 1000);
    }
}


function updateTurbo() {

    if (turboActive) {

        turbo -= 0.8;

        if (turbo <= 0) {

            turbo = 0;
            turboActive = false;
        }

    } else {

        turbo += 0.15;

        if (turbo > 100) {
            turbo = 100;
        }
    }

    turboBar.style.width =
        turbo + "%";
}


// ==========================
// GAME OVER
// ==========================

function endGame() {

    running = false;

    finalScore.textContent =
        Math.floor(score / 10);

    gameOver.style.display =
        "flex";
}


// ==========================
// RECOMEÇAR
// ==========================

function restartGame() {

    gameOver.style.display =
        "none";

    resetGame();

    running = true;

    requestAnimationFrame(gameLoop);
}


// ==========================
// TECLADO
// ==========================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {
            keys.left = true;
        }

        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {
            keys.right = true;
        }

        if (event.code === "Space") {
            activateTurbo();
        }
    }
);


document.addEventListener(
    "keyup",
    event => {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {
            keys.left = false;
        }

        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {
            keys.right = false;
        }
    }
);


// ==========================
// CONTROLES TOUCH
// ==========================

function touchButton(button, direction) {

    button.addEventListener(
        "pointerdown",
        () => {
            keys[direction] = true;
        }
    );

    button.addEventListener(
        "pointerup",
        () => {
            keys[direction] = false;
        }
    );

    button.addEventListener(
        "pointerleave",
        () => {
            keys[direction] = false;
        }
    );
}


touchButton(
    document.getElementById("left"),
    "left"
);

touchButton(
    document.getElementById("right"),
    "right"
);


document
    .getElementById("turboButton")
    .addEventListener(
        "pointerdown",
        activateTurbo
    );
```
