!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Battle Arena</title>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    overflow: hidden;
    background: #101820;
    font-family: Arial, sans-serif;
    color: white;
}

#game {
    position: relative;
    width: 100vw;
    height: 100vh;
    background:
        linear-gradient(rgba(20,40,25,.35), rgba(20,40,25,.35)),
        #416b3a;
    overflow: hidden;
}

#map {
    position: absolute;
    width: 2000px;
    height: 1400px;
    background-color: #527f45;
    background-image:
        linear-gradient(#ffffff10 2px, transparent 2px),
        linear-gradient(90deg, #ffffff10 2px, transparent 2px);
    background-size: 80px 80px;
    transform-origin: center;
}

.player,
.enemy,
.bullet,
.item {
    position: absolute;
}

.player {
    width: 42px;
    height: 42px;
    background: #1976ff;
    border: 3px solid white;
    border-radius: 50%;
    z-index: 20;
}

.player::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 8px;
    background: #222;
    right: -18px;
    top: 14px;
    border-radius: 5px;
}

.enemy {
    width: 38px;
    height: 38px;
    background: #e53935;
    border: 3px solid #550000;
    border-radius: 50%;
    z-index: 10;
}

.bullet {
    width: 8px;
    height: 8px;
    background: #ffe600;
    border-radius: 50%;
    box-shadow: 0 0 8px #fff000;
    z-index: 30;
}

.item {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    z-index: 5;
}

.medkit {
    background: #fff;
    border: 3px solid #d32f2f;
}

.coin {
    background: gold;
    border-radius: 50%;
    border: 3px solid #b8860b;
}

#hud {
    position: fixed;
    top: 15px;
    left: 15px;
    right: 15px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.hud-box {
    background: rgba(0,0,0,.65);
    padding: 12px 18px;
    border-radius: 10px;
    margin-bottom: 8px;
}

#healthBar {
    width: 180px;
    height: 16px;
    background: #400;
    border-radius: 10px;
    overflow: hidden;
}

#health {
    width: 100%;
    height: 100%;
    background: #25d366;
    transition: width .2s;
}

#menu {
    position: fixed;
    inset: 0;
    z-index: 500;
    background:
        radial-gradient(circle, #283b55, #080d14);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.menu-content {
    max-width: 600px;
    padding: 35px;
}

.menu-content h1 {
    font-size: 60px;
    color: #ffca28;
    text-shadow: 4px 4px #d35400;
}

.menu-content p {
    margin: 20px 0;
    color: #ddd;
    line-height: 1.6;
}

button {
    border: none;
    padding: 15px 35px;
    border-radius: 8px;
    background: #ff5722;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

button:hover {
    background: #ff7043;
}

#gameOver {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 600;
    background: rgba(0,0,0,.85);
    align-items: center;
    justify-content: center;
    text-align: center;
}

#gameOver h2 {
    font-size: 55px;
    color: #ff3d00;
}

#mobileControls {
    position: fixed;
    bottom: 25px;
    left: 25px;
    right: 25px;
    z-index: 200;
    display: none;
    justify-content: space-between;
}

.control {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: #ffffff33;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.controls-left {
    display: flex;
    gap: 10px;
}

@media (max-width: 700px) {
    #mobileControls {
        display: flex;
    }

    .menu-content h1 {
        font-size: 42px;
    }
}
</style>
</head>

<body>

<div id="game">

    <div id="map">
        <div id="player" class="player"></div>
    </div>

    <div id="hud">

        <div>
            <div class="hud-box">
                ❤️ Vida
                <div id="healthBar">
                    <div id="health"></div>
                </div>
            </div>

            <div class="hud-box">
                🏆 Pontos:
                <span id="score">0</span>
            </div>
        </div>

        <div>
            <div class="hud-box">
                👾 Inimigos:
                <span id="enemies">0</span>
            </div>

            <div class="hud-box">
                🪙 Moedas:
                <span id="coins">0</span>
            </div>
        </div>

    </div>

    <div id="mobileControls">

        <div class="controls-left">
            <div class="control" data-key="a">←</div>
            <div class="control" data-key="d">→</div>
        </div>

        <div class="controls-left">
            <div class="control" data-key="w">↑</div>
            <div class="control" data-key="space">🔫</div>
        </div>

    </div>

</div>


<div id="menu">

    <div class="menu-content">

        <h1>BATTLE ARENA</h1>

        <p>
            Um jogo de tiro e sobrevivência inspirado
            no gênero Battle Royale.
        </p>

        <p>
            <b>W A S D</b> — movimentação<br>
            <b>Mouse</b> — mirar<br>
            <b>Clique</b> — atirar
        </p>

        <button id="startButton">
            JOGAR
        </button>

    </div>

</div>


<div id="gameOver">

    <div>

        <h2>GAME OVER</h2>

        <p>
            Pontuação:
            <strong id="finalScore">0</strong>
        </p>

        <br>

        <button onclick="location.reload()">
            JOGAR NOVAMENTE
        </button>

    </div>

</div>


<script>
"use strict";

const game = document.getElementById("game");
const map = document.getElementById("map");
const player = document.getElementById("player");

const scoreElement = document.getElementById("score");
const enemyElement = document.getElementById("enemies");
const coinsElement = document.getElementById("coins");
const healthElement = document.getElementById("health");

const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");
const startButton = document.getElementById("startButton");
const finalScore = document.getElementById("finalScore");

let gameRunning = false;

let playerX = 1000;
let playerY = 700;

let health = 100;
let score = 0;
let coins = 0;

let speed = 5;

let keys = {};

let enemies = [];
let bullets = [];
let items = [];

let mouseX = 0;
let mouseY = 0;


/* ================================
   TECLADO
================================ */

document.addEventListener("keydown", event => {
    keys[event.key.toLowerCase()] = true;

    if (event.code === "Space") {
        shoot();
    }
});

document.addEventListener("keyup", event => {
    keys[event.key.toLowerCase()] = false;
});


/* ================================
   MOUSE
================================ */

document.addEventListener("mousemove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

document.addEventListener("mousedown", () => {
    if (gameRunning) {
        shoot();
    }
});


/* ================================
   POSIÇÃO DO JOGADOR
================================ */

function updatePlayer() {

    if (keys["w"] || keys["arrowup"]) {
        playerY -= speed;
    }

    if (keys["s"] || keys["arrowdown"]) {
        playerY += speed;
    }

    if (keys["a"] || keys["arrowleft"]) {
        playerX -= speed;
    }

    if (keys["d"] || keys["arrowright"]) {
        playerX += speed;
    }

    playerX = Math.max(
        20,
        Math.min(1980, playerX)
    );

    playerY = Math.max(
        20,
        Math.min(1380, playerY)
    );

    player.style.left =
        playerX - 21 + "px";

    player.style.top =
        playerY - 21 + "px";

    camera();
}


/* ================================
   CÂMERA
================================ */

function camera() {

    const screenX =
        window.innerWidth / 2;

    const screenY =
        window.innerHeight / 2;

    const x =
        screenX - playerX;

    const y =
        screenY - playerY;

    map.style.transform =
        `translate(${x}px, ${y}px)`;
}


/* ================================
   CRIAR INIMIGOS
================================ */

function createEnemy() {

    const enemy = {
        x: Math.random() * 1900 + 50,
        y: Math.random() * 1300 + 50,
        hp: 2,
        element: document.createElement("div")
    };

    enemy.element.className =
        "enemy";

    map.appendChild(
        enemy.element
    );

    enemies.push(enemy);

    updateEnemyCounter();
}


/* ================================
   ATUALIZAR INIMIGOS
================================ */

function updateEnemies() {

    enemies.forEach((enemy, index) => {

        const dx =
            playerX - enemy.x;

        const dy =
            playerY - enemy.y;

        const distance =
            Math.sqrt(dx * dx + dy * dy);

        if (distance > 45) {

            enemy.x +=
                dx / distance * 1.4;

            enemy.y +=
                dy / distance * 1.4;
        }

        if (distance < 45) {

            damagePlayer(0.15);
        }

        enemy.element.style.left =
            enemy.x - 19 + "px";

        enemy.element.style.top =
            enemy.y - 19 + "px";

    });

}


/* ================================
   ATIRAR
================================ */

function shoot() {

    if (!gameRunning) {
        return;
    }

    const rect =
        game.getBoundingClientRect();

    const targetX =
        mouseX - rect.left;

    const targetY =
        mouseY - rect.top;

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;

    let dx =
        targetX - centerX;

    let dy =
        targetY - centerY;

    const distance =
        Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
        return;
    }

    dx /= distance;
    dy /= distance;

    const bullet = {
        x: playerX,
        y: playerY,
        dx,
        dy,
        element: document.createElement("div")
    };

    bullet.element.className =
        "bullet";

    map.appendChild(
        bullet.element
    );

    bullets.push(bullet);
}


/* ================================
   ATUALIZAR BALAS
================================ */

function updateBullets() {

    bullets.forEach(
        (bullet, bulletIndex) => {

            bullet.x +=
                bullet.dx * 15;

            bullet.y +=
                bullet.dy * 15;

            bullet.element.style.left =
                bullet.x + "px";

            bullet.element.style.top =
                bullet.y + "px";


            enemies.forEach(
                (enemy, enemyIndex) => {

                    const dx =
                        bullet.x - enemy.x;

                    const dy =
                        bullet.y - enemy.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    if (distance < 25) {

                        enemy.hp--;

                        removeBullet(
                            bulletIndex
                        );

                        if (enemy.hp <= 0) {

                            enemy.element.remove();

                            enemies.splice(
                                enemyIndex,
                                1
                            );

                            score += 100;

                            scoreElement.textContent =
                                score;

                            updateEnemyCounter();
                        }
                    }

                }
            );


            if (
                bullet.x < 0 ||
                bullet.x > 2000 ||
                bullet.y < 0 ||
                bullet.y > 1400
            ) {

                removeBullet(
                    bulletIndex
                );

            }

        }
    );

}


/* ================================
   REMOVER BALA
================================ */

function removeBullet(index) {

    if (!bullets[index]) {
        return;
    }

    bullets[index].element.remove();

    bullets.splice(
        index,
        1
    );
}


/* ================================
   DANO
================================ */

function damagePlayer(amount) {

    health -= amount;

    health =
        Math.max(
            0,
            health
        );

    healthElement.style.width =
        health + "%";

    if (health <= 0) {
        endGame();
    }
}


/* ================================
   MOEDAS
================================ */

function createCoin() {

    const item = {
        x: Math.random() * 1900 + 50,
        y: Math.random() * 1300 + 50,
        type: "coin",
        element: document.createElement("div")
    };

    item.element.className =
        "item coin";

    map.appendChild(
        item.element
    );

    items.push(item);
}


/* ================================
   KIT MÉDICO
================================ */

function createMedkit() {

    const item = {
        x: Math.random() * 1900 + 50,
        y: Math.random() * 1300 + 50,
        type: "medkit",
        element: document.createElement("div")
    };

    item.element.className =
        "item medkit";

    map.appendChild(
        item.element
    );

    items.push(item);
}


/* ================================
   ITENS
================================ */

function updateItems() {

    items.forEach(
        (item, index) => {

            item.element.style.left =
                item.x + "px";

            item.element.style.top =
                item.y + "px";

            const dx =
                playerX - item.x;

            const dy =
                playerY - item.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 35) {

                if (item.type === "coin") {

                    coins++;

                    score += 25;

                    coinsElement.textContent =
                        coins;

                    scoreElement.textContent =
                        score;

                }

                if (item.type === "medkit") {

                    health =
                        Math.min(
                            100,
                            health + 30
                        );

                    healthElement.style.width =
                        health + "%";
                }

                item.element.remove();

                items.splice(
                    index,
                    1
                );
            }

        }
    );

}


/* ================================
   CONTADOR
================================ */

function updateEnemyCounter() {

    enemyElement.textContent =
        enemies.length;
}


/* ================================
   GAME LOOP
================================ */

function gameLoop() {

    if (!gameRunning) {
        return;
    }

    updatePlayer();

    updateEnemies();

    updateBullets();

    updateItems();

    requestAnimationFrame(
        gameLoop
    );
}


/* ================================
   INICIAR JOGO
================================ */

function startGame() {

    menu.style.display =
        "none";

    gameRunning = true;

    for (
        let i = 0;
        i < 15;
        i++
    ) {
        createEnemy();
    }

    for (
        let i = 0;
        i < 20;
        i++
    ) {
        createCoin();
    }

    for (
        let i = 0;
        i < 5;
        i++
    ) {
        createMedkit();
    }

    gameLoop();
}


/* ================================
   GAME OVER
================================ */

function endGame() {

    gameRunning = false;

    finalScore.textContent =
        score;

    gameOver.style.display =
        "flex";
}


startButton.addEventListener(
    "click",
    startGame
);


/* ================================
   CONTROLES MOBILE
================================ */

document
    .querySelectorAll(".control")
    .forEach(button => {

        const key =
            button.dataset.key;

        button.addEventListener(
            "touchstart",
            event => {

                event.preventDefault();

                if (key === "space") {
                    shoot();
                } else {
                    keys[key] = true;
                }

            }
        );

        button.addEventListener(
            "touchend",
            event => {

                event.preventDefault();

                if (key !== "space") {
                    keys[key] = false;
                }

            }
        );

    });

</script>

</body>
</html>