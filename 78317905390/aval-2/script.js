
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const coinsText = document.getElementById("coins");

let running = false;
let score = 0;
let coins = 0;
let speed = 280;

let obstacles = [];
let coinItems = [];

let roadOffset = 0;
let obstacleTimer = 0;
let coinTimer = 0;
let lastTime = 0;
let animation = 0;

const lanes = [100, 200, 300];

const player = {
    lane: 1,
    x: 200,
    y: 475,
    jumpTime: 0,
    sliding: 0
};

// DESENHAR PISTA
function drawRoad(dt) {
    ctx.fillStyle = "#267d35";
    ctx.fillRect(0, 0, 400, 600);

    ctx.fillStyle = "#444";
    ctx.fillRect(45, 0, 310, 600);

    // Laterais
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(45, 0, 7, 600);
    ctx.fillRect(348, 0, 7, 600);

    // Faixas
    roadOffset = (roadOffset + speed * dt) % 80;

    ctx.fillStyle = "#ffffff";

    for (let y = -80; y < 650; y += 80) {
        ctx.fillRect(148, y + roadOffset, 5, 35);
        ctx.fillRect(248, y + roadOffset, 5, 35);
    }
}

// DESENHAR PERSONAGEM
function drawPlayer() {
    const x = player.x;
    const jumpHeight = player.jumpTime > 0
        ? Math.sin((1 - player.jumpTime / 0.8) * Math.PI) * 105
        : 0;

    const y = player.y - jumpHeight;

    ctx.save();

    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(x, 550, 25 - jumpHeight * 0.08, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Modo deslizar
    if (player.sliding > 0) {
        ctx.fillStyle = "#087cff";
        ctx.fillRect(x - 20, y + 20, 40, 22);

        ctx.fillStyle = "#ffd0a0";
        ctx.beginPath();
        ctx.arc(x + 23, y + 25, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#222";
        ctx.fillRect(x + 25, y + 12, 12, 5);

        ctx.restore();
        return;
    }

    // Pernas animadas
    let legMove = Math.sin(animation * 12) * 12;

    ctx.strokeStyle = "#172c53";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x - 7, y + 45);
    ctx.lineTo(x - 10 + legMove, y + 70);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 7, y + 45);
    ctx.lineTo(x + 10 - legMove, y + 70);
    ctx.stroke();

    // Tênis
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(x - 20 + legMove, y + 66, 17, 8);
    ctx.fillRect(x + 3 - legMove, y + 66, 17, 8);

    // Braços
    ctx.strokeStyle = "#ffd0a0";
    ctx.lineWidth = 8;

    ctx.beginPath();
    ctx.moveTo(x - 12, y + 12);
    ctx.lineTo(x - 25, y + 32 + legMove);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 12, y + 12);
    ctx.lineTo(x + 25, y + 32 - legMove);
    ctx.stroke();

    // Corpo
    ctx.fillStyle = "#087cff";
    ctx.fillRect(x - 15, y + 5, 30, 42);

    // Cabeça
    ctx.fillStyle = "#ffd0a0";
    ctx.beginPath();
    ctx.arc(x, y - 7, 17, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo
    ctx.fillStyle = "#352018";
    ctx.beginPath();
    ctx.arc(x, y - 15, 16, Math.PI, Math.PI * 2);
    ctx.fill();

    // Olhos
    ctx.fillStyle = "#111";
    ctx.fillRect(x + 5, y - 9, 3, 4);

    ctx.restore();
}

// CRIAR OBSTÁCULOS
function createObstacle() {
    const lane = Math.floor(Math.random() * 3);

    const types = ["box", "barrier", "arch"];
    const type = types[Math.floor(Math.random() * types.length)];

    obstacles.push({
        lane: lane,
        x: lanes[lane],
        y: -60,
        type: type,
        hit: false
    });
}

// DESENHAR OBSTÁCULOS
function drawObstacles(dt) {
    obstacles.forEach(obstacle => {
        obstacle.y += speed * dt;

        const x = obstacle.x;
        const y = obstacle.y;

        if (obstacle.type === "box") {
            // Caixa: precisa desviar ou pular
            ctx.fillStyle = "#a0522d";
            ctx.fillRect(x - 24, y, 48, 48);

            ctx.strokeStyle = "#653015";
            ctx.lineWidth = 4;
            ctx.strokeRect(x - 24, y, 48, 48);

            ctx.fillStyle = "#f5d08a";
            ctx.fillRect(x - 17, y + 15, 34, 7);
        }

        if (obstacle.type === "barrier") {
            // Barreira baixa: precisa pular
            ctx.fillStyle = "#ff3333";
            ctx.fillRect(x - 32, y + 20, 64, 23);

            ctx.fillStyle = "white";
            ctx.fillRect(x - 22, y + 20, 10, 23);
            ctx.fillRect(x + 10, y + 20, 10, 23);
        }

        if (obstacle.type === "arch") {
            // Obstáculo alto: precisa deslizar
            ctx.fillStyle = "#9933ff";
            ctx.fillRect(x - 30, y, 60, 12);
            ctx.fillRect(x - 30, y, 10, 45);
            ctx.fillRect(x + 20, y, 10, 45);
        }

        // Colisão
        if (
            obstacle.lane === player.lane &&
            obstacle.y + 45 > 510 &&
            obstacle.y < 565 &&
            !obstacle.hit
        ) {
            if (obstacle.type === "box" && player.jumpTime > 0) {
                return;
            }

            if (obstacle.type === "barrier" && player.jumpTime > 0) {
                return;
            }

            if (obstacle.type === "arch" && player.sliding > 0) {
                return;
            }

            gameOver();
        }
    });

    obstacles = obstacles.filter(o => o.y < 650);
}

// CRIAR MOEDAS
function createCoins() {
    const lane = Math.floor(Math.random() * 3);

    for (let i = 0; i < 5; i++) {
        coinItems.push({
            x: lanes[lane],
            y: -i * 38 - 30,
            collected: false
        });
    }
}

// DESENHAR MOEDAS
function drawCoins(dt) {
    coinItems.forEach(coin => {
        coin.y += speed * dt;

        if (coin.collected) return;

        // Moeda
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#fff0a0";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#a66c00";
        ctx.font = "bold 15px Arial";
        ctx.textAlign = "center";
        ctx.fillText("$", coin.x, coin.y + 5);

        // Coletar moeda
        if (
            coin.x === player.x &&
            Math.abs(coin.y - 525) < 28 &&
            !coin.collected
        ) {
            coin.collected = true;
            coins++;
            score += 50;
            coinsText.textContent = coins;
        }
    });

    coinItems = coinItems.filter(
        coin => coin.y < 650 && !coin.collected
    );
}

// MOVIMENTAÇÃO
function moveLeft() {
    if (running && player.lane > 0) {
        player.lane--;
    }
}

function moveRight() {
    if (running && player.lane < 2) {
        player.lane++;
    }
}

function jump() {
    if (running && player.jumpTime <= 0 && player.sliding <= 0) {
        player.jumpTime = 0.8;
    }
}

function slide() {
    if (running && player.jumpTime <= 0) {
        player.sliding = 0.65;
    }
}

// TECLADO
document.addEventListener("keydown", e => {
    if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "]
        .includes(e.key)
    ) {
        e.preventDefault();
    }

    if (e.repeat) return;

    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        moveLeft();
    }

    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        moveRight();
    }

    if (e.key === "ArrowUp" || e.key === " ") {
        jump();
    }

    if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        slide();
    }
});

// ATUALIZAR JOGO
function update(timestamp) {
    if (!running) return;

    const dt = Math.min((timestamp - lastTime) / 1000, 0.04);
    lastTime = timestamp;

    animation += dt;

    // Movimento entre pistas
    player.x += (lanes[player.lane] - player.x) * Math.min(1, dt * 15);

    if (player.jumpTime > 0) {
        player.jumpTime = Math.max(0, player.jumpTime - dt);
    }

    if (player.sliding > 0) {
        player.sliding = Math.max(0, player.sliding - dt);
    }

    // Aumentar velocidade
    speed = Math.min(280 + score * 0.08, 650);

    score += Math.floor(dt * 10);

    // Temporizadores
    obstacleTimer += dt;
    coinTimer += dt;

    if (obstacleTimer > Math.max(0.85, 1.5 - score / 5000)) {
        createObstacle();
        obstacleTimer = 0;
    }

    if (coinTimer > 2.1) {
        createCoins();
        coinTimer = 0;
    }

    // Desenhar
    drawRoad(dt);
    drawCoins(dt);
    drawObstacles(dt);
    drawPlayer();

    scoreText.textContent = score;

    if (running) {
        requestAnimationFrame(update);
    }
}

// INICIAR
function startGame() {
    running = true;

    score = 0;
    coins = 0;
    speed = 280;

    obstacles = [];
    coinItems = [];

    obstacleTimer = 0;
    coinTimer = 0;
    roadOffset = 0;
    animation = 0;

    player.lane = 1;
    player.x = 200;
    player.jumpTime = 0;
    player.sliding = 0;

    scoreText.textContent = 0;
    coinsText.textContent = 0;

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameOver").classList.add("hidden");

    lastTime = performance.now();

    requestAnimationFrame(update);
}

// FIM DE JOGO
function gameOver() {
    if (!running) return;

    running = false;

    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalCoins").textContent = coins;

    document.getElementById("gameOver").classList.remove("hidden");
}

// Tela inicial
drawRoad(0);
drawPlayer();
