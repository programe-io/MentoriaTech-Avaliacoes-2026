
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

let running = false;
let score = 0;
let coins = 0;
let speed = 5;
let playerLane = 1;
let objects = [];
let spawnTimer = 0;
let lastTime = 0;
let animationId;

const player = {
    y: 0,
    width: 36,
    height: 48
};

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    player.y = rect.height - 115;
}

function laneX(lane) {
    const w = canvas.clientWidth;
    const laneWidth = w / 3;
    return laneWidth * lane + laneWidth / 2;
}

function drawBackground() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(0, 0, w, h);

    // Grama
    ctx.fillStyle = "#16a34a";
    ctx.fillRect(0, h * 0.25, w, h);

    // Trilhos
    ctx.fillStyle = "#64748b";
    ctx.fillRect(w * 0.08, 0, w * 0.84, h);

    // Separadores das pistas
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 4;
    ctx.setLineDash([25, 20]);

    ctx.beginPath();
    ctx.moveTo(w / 3, 0);
    ctx.lineTo(w / 3, h);
    ctx.moveTo(2 * w / 3, 0);
    ctx.lineTo(2 * w / 3, h);
    ctx.stroke();

    ctx.setLineDash([]);

    // Dormentes dos trilhos
    ctx.fillStyle = "#475569";

    for (let y = 0; y < h; y += 45) {
        ctx.fillRect(w * 0.08, y, w * 0.84, 5);
    }
}

function drawPlayer() {
    const x = laneX(playerLane);
    const y = player.y;

    // Pernas
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(x - 13, y + 25, 11, 23);
    ctx.fillRect(x + 2, y + 25, 11, 23);

    // Corpo
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(x - 17, y, 34, 29);

    // Cabeça
    ctx.fillStyle = "#f5c28b";
    ctx.beginPath();
    ctx.arc(x, y - 9, 14, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo
    ctx.fillStyle = "#422006";
    ctx.fillRect(x - 13, y - 23, 26, 7);

    // Olhos
    ctx.fillStyle = "#111827";
    ctx.fillRect(x - 7, y - 11, 3, 3);
    ctx.fillRect(x + 4, y - 11, 3, 3);
}

function spawnObject() {
    const lane = Math.floor(Math.random() * 3);
    const isCoin = Math.random() < 0.4;

    objects.push({
        lane,
        y: -40,
        type: isCoin ? "coin" : "obstacle",
        size: isCoin ? 13 : 22
    });
}

function drawObjects(delta) {
    const h = canvas.clientHeight;

    for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        obj.y += speed * delta * 0.06;

        const x = laneX(obj.lane);

        if (obj.type === "coin") {
            ctx.fillStyle = "#facc15";
            ctx.beginPath();
            ctx.arc(x, obj.y, obj.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#fef08a";
            ctx.lineWidth = 4;
            ctx.stroke();

            // Coletar moeda
            if (
                obj.lane === playerLane &&
                Math.abs(obj.y - (player.y + 15)) < 35
            ) {
                coins++;
                coinsEl.textContent = coins;
                objects.splice(i, 1);
                continue;
            }
        } else {
            // Obstáculo
            ctx.fillStyle = "#b91c1c";
            ctx.fillRect(
                x - obj.size,
                obj.y - obj.size,
                obj.size * 2,
                obj.size * 2
            );

            ctx.fillStyle = "#fca5a5";
            ctx.fillRect(x - 13, obj.y - 10, 26, 7);

            // Colisão
            if (
                obj.lane === playerLane &&
                obj.y + obj.size > player.y &&
                obj.y - obj.size < player.y + player.height
            ) {
                endGame();
                return;
            }
        }

        if (obj.y > h + 50) {
            objects.splice(i, 1);
        }
    }
}

function moveLeft() {
    if (running && playerLane > 0) {
        playerLane--;
    }
}

function moveRight() {
    if (running && playerLane < 2) {
        playerLane++;
    }
}

function gameLoop(time) {
    if (!running) return;

    const delta = lastTime
        ? Math.min(time - lastTime, 40)
        : 16;

    lastTime = time;

    drawBackground();

    spawnTimer += delta;

    if (spawnTimer > Math.max(350, 950 - speed * 60)) {
        spawnObject();
        spawnTimer = 0;
    }

    drawObjects(delta);

    if (!running) return;

    drawPlayer();

    score += delta * 0.01;
    speed = Math.min(12, 5 + score / 150);

    scoreEl.textContent = Math.floor(score);

    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    cancelAnimationFrame(animationId);

    score = 0;
    coins = 0;
    speed = 5;
    playerLane = 1;
    objects = [];
    spawnTimer = 0;
    lastTime = 0;

    scoreEl.textContent = "0";
    coinsEl.textContent = "0";

    resizeCanvas();
    running = true;
    menu.style.display = "none";

    animationId = requestAnimationFrame(gameLoop);
}

function endGame() {
    running = false;

    menu.innerHTML = `
        <h1>💥 Fim de jogo!</h1>
        <p>Pontuação: ${Math.floor(score)}</p>
        <p>Moedas coletadas: ${coins}</p>
        <button id="restartBtn">JOGAR NOVAMENTE</button>
    `;

    menu.style.display = "flex";

    document.getElementById("restartBtn")
        .addEventListener("click", startGame);
}

startBtn.addEventListener("click", startGame);

document.getElementById("leftBtn")
    .addEventListener("click", moveLeft);

document.getElementById("rightBtn")
    .addEventListener("click", moveRight);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
        moveLeft();
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        moveRight();
    }
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawBackground();
drawPlayer();
