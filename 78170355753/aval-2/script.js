
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const messageElement = document.getElementById("message");

const WIDTH = 800;
const HEIGHT = 450;
const WORLD_WIDTH = 3600;
const gravity = 0.6;

let score = 0;
let lives = 3;
let gameOver = false;
let won = false;
let cameraX = 0;
let animationTime = 0;

const keys = {};
const activeTouches = new Map();

const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 48,
    speed: 5,
    velocityY: 0,
    jumping: false,
    direction: 1,
    moving: false
};

// =====================================
// PLATAFORMAS
// =====================================

const platforms = [
    {x: 0, y: 410, width: 500, height: 40},
    {x: 570, y: 360, width: 220, height: 90},
    {x: 850, y: 320, width: 230, height: 130},
    {x: 1140, y: 380, width: 280, height: 70},
    {x: 1480, y: 330, width: 230, height: 120},
    {x: 1770, y: 370, width: 250, height: 80},
    {x: 2080, y: 310, width: 250, height: 140},
    {x: 2390, y: 360, width: 250, height: 90},
    {x: 2700, y: 300, width: 260, height: 150},
    {x: 3020, y: 360, width: 580, height: 90},

    {x: 300, y: 330, width: 120, height: 15},
    {x: 700, y: 270, width: 120, height: 15},
    {x: 980, y: 240, width: 120, height: 15},
    {x: 1260, y: 300, width: 120, height: 15},
    {x: 1580, y: 250, width: 120, height: 15},
    {x: 1900, y: 290, width: 120, height: 15},
    {x: 2180, y: 220, width: 120, height: 15},
    {x: 2490, y: 280, width: 120, height: 15},
    {x: 2800, y: 220, width: 120, height: 15},
    {x: 3200, y: 290, width: 120, height: 15}
];

// =====================================
// MOEDAS
// =====================================

let coins = [
    {x: 330, y: 285, collected: false},
    {x: 630, y: 320, collected: false},
    {x: 750, y: 230, collected: false},
    {x: 950, y: 280, collected: false},
    {x: 1020, y: 200, collected: false},
    {x: 1240, y: 340, collected: false},
    {x: 1630, y: 210, collected: false},
    {x: 1830, y: 330, collected: false},
    {x: 2220, y: 180, collected: false},
    {x: 2530, y: 240, collected: false},
    {x: 2850, y: 180, collected: false},
    {x: 3250, y: 250, collected: false}
];

// =====================================
// ESPINHOS
// =====================================

const spikes = [
    {x: 620, y: 340, width: 40},
    {x: 1190, y: 360, width: 40},
    {x: 1830, y: 350, width: 40},
    {x: 2440, y: 340, width: 40},
    {x: 3100, y: 340, width: 40}
];

// =====================================
// PORTAL
// =====================================

const portal = {
    x: 3480,
    y: 290,
    width: 45,
    height: 70,
    animation: 0
};

// =====================================
// CONTROLES DE TECLADO
// =====================================

document.addEventListener("keydown", e => {
    if ([
        "Space",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp"
    ].includes(e.code)) {
        e.preventDefault();
    }

    keys[e.code] = true;
});

document.addEventListener("keyup", e => {
    keys[e.code] = false;
});

// =====================================
// CONTROLES MOBILE
// =====================================

const mobileButtons = [
    {id: "leftBtn", key: "ArrowLeft"},
    {id: "rightBtn", key: "ArrowRight"},
    {id: "jumpBtn", key: "Space"}
];

function updateMobileKey(key) {
    keys[key] = [...activeTouches.values()].includes(key);
}

mobileButtons.forEach(control => {

    const button = document.getElementById(control.id);

    if (!button) return;

    button.addEventListener("pointerdown", e => {

        e.preventDefault();

        button.setPointerCapture(e.pointerId);

        activeTouches.set(e.pointerId, control.key);

        button.classList.add("pressed");

        updateMobileKey(control.key);
    });

    function releaseButton(e) {

        if (!activeTouches.has(e.pointerId)) return;

        const key = activeTouches.get(e.pointerId);

        activeTouches.delete(e.pointerId);

        updateMobileKey(key);

        if (![...activeTouches.values()].includes(control.key)) {
            button.classList.remove("pressed");
        }
    }

    button.addEventListener("pointerup", releaseButton);
    button.addEventListener("pointercancel", releaseButton);
    button.addEventListener("lostpointercapture", releaseButton);
});

// Limpar controles quando a janela perde o foco

window.addEventListener("blur", () => {

    activeTouches.clear();

    mobileButtons.forEach(control => {
        keys[control.key] = false;

        const button = document.getElementById(control.id);

        if (button) {
            button.classList.remove("pressed");
        }
    });
});

// =====================================
// FUNDO
// =====================================

function drawBackground() {

    ctx.fillStyle = "#65c8ff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Sol

    ctx.fillStyle = "#ffdd55";

    ctx.beginPath();
    ctx.arc(680 - cameraX * 0.15, 75, 35, 0, Math.PI * 2);
    ctx.fill();

    // Nuvens

    ctx.fillStyle = "white";

    for (let i = 0; i < 12; i++) {

        let x = (i * 400 - cameraX * 0.4) % (WIDTH + 200);

        if (x < -100) x += WIDTH + 200;

        ctx.fillRect(x, 70 + (i % 3) * 35, 85, 20);
        ctx.fillRect(x + 20, 50 + (i % 3) * 35, 40, 20);
    }

    // Montanhas

    ctx.fillStyle = "#478c78";

    for (let i = 0; i < 10; i++) {

        const x = i * 450 - cameraX * 0.25;

        ctx.beginPath();

        ctx.moveTo(x, 410);
        ctx.lineTo(x + 170, 230);
        ctx.lineTo(x + 350, 410);

        ctx.fill();
    }
}

// =====================================
// DESENHAR PLATAFORMAS
// =====================================

function drawPlatforms() {

    platforms.forEach(p => {

        const x = p.x - cameraX;

        if (x + p.width < 0 || x > WIDTH) return;

        ctx.fillStyle = "#794522";
        ctx.fillRect(x, p.y, p.width, p.height);

        ctx.fillStyle = "#55d34b";
        ctx.fillRect(x, p.y, p.width, 7);

        ctx.fillStyle = "#a96a36";
        ctx.fillRect(x, p.y + 10, p.width, 5);
    });
}

// =====================================
// DESENHAR ESPINHOS
// =====================================

function drawSpikes() {

    spikes.forEach(s => {

        const x = s.x - cameraX;

        ctx.fillStyle = "#444";

        for (let i = 0; i < s.width; i += 12) {

            ctx.beginPath();

            ctx.moveTo(x + i, s.y + 15);
            ctx.lineTo(x + i + 6, s.y);
            ctx.lineTo(x + i + 12, s.y + 15);

            ctx.fill();
        }

        ctx.fillStyle = "#ff3333";
        ctx.fillRect(x, s.y + 15, s.width, 5);
    });
}

// =====================================
// DESENHAR MOEDAS
// =====================================

function drawCoins() {

    coins.forEach(c => {

        if (!c.collected) {

            const x = c.x - cameraX;

            if (x < -20 || x > WIDTH + 20) return;

            ctx.fillStyle = "#ffcc00";
            ctx.fillRect(x, c.y, 15, 18);

            ctx.fillStyle = "#fff27a";
            ctx.fillRect(x + 4, c.y + 3, 4, 12);
        }
    });
}

// =====================================
// PERSONAGEM ANIMADO
// =====================================

function drawPlayer() {

    ctx.save();

    const screenX = player.x - cameraX;

    ctx.translate(
        screenX + player.width / 2,
        player.y + player.height / 2
    );

    ctx.scale(player.direction, 1);

    const walking = player.moving && !player.jumping;
    const jumpingUp = player.velocityY < -1 && player.jumping;
    const falling = player.velocityY > 2 && player.jumping;

    let leg1 = 0;
    let leg2 = 0;
    let arm1 = 0;
    let arm2 = 0;
    let bodyY = 0;

    if (walking) {

        leg1 = Math.sin(animationTime) * 9;
        leg2 = -Math.sin(animationTime) * 9;

        arm1 = -Math.sin(animationTime) * 7;
        arm2 = Math.sin(animationTime) * 7;

        bodyY = Math.abs(Math.sin(animationTime * 2)) * -2;
    }

    if (jumpingUp) {

        leg1 = -7;
        leg2 = 7;

        arm1 = -12;
        arm2 = -12;

        bodyY = -2;
    }

    if (falling) {

        leg1 = 8;
        leg2 = -8;

        arm1 = 10;
        arm2 = 10;
    }

    // Sombra

    ctx.fillStyle = "rgba(0,0,0,0.18)";

    ctx.beginPath();
    ctx.ellipse(0, 27, 15, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Perna de trás

    ctx.save();

    ctx.translate(-5, 9 + bodyY);
    ctx.rotate(leg1 * Math.PI / 180);

    ctx.fillStyle = "#253b64";
    ctx.fillRect(-4, 0, 8, 16);

    ctx.fillStyle = "#30241d";
    ctx.fillRect(-5, 12, 11, 5);

    ctx.restore();

    // Perna da frente

    ctx.save();

    ctx.translate(5, 9 + bodyY);
    ctx.rotate(leg2 * Math.PI / 180);

    ctx.fillStyle = "#304b7a";
    ctx.fillRect(-4, 0, 8, 16);

    ctx.fillStyle = "#30241d";
    ctx.fillRect(-5, 12, 11, 5);

    ctx.restore();

    // Braço de trás

    ctx.save();

    ctx.translate(-9, -10 + bodyY);
    ctx.rotate(arm1 * Math.PI / 180);

    ctx.fillStyle = "#e9b18b";
    ctx.fillRect(-3, 0, 7, 18);

    ctx.restore();

    // Camiseta

    ctx.fillStyle = "#2875cf";
    ctx.fillRect(-10, -15 + bodyY, 20, 27);

    ctx.fillStyle = "#1654a0";
    ctx.fillRect(-10, -2 + bodyY, 20, 4);

    // Braço da frente

    ctx.save();

    ctx.translate(9, -10 + bodyY);
    ctx.rotate(arm2 * Math.PI / 180);

    ctx.fillStyle = "#f1bd99";
    ctx.fillRect(-3, 0, 7, 18);

    ctx.restore();

    // Pescoço

    ctx.fillStyle = "#e8b18b";
    ctx.fillRect(-4, -20 + bodyY, 8, 7);

    // Cabeça

    ctx.fillStyle = "#f1bd99";

    ctx.beginPath();
    ctx.arc(0, -27 + bodyY, 11, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo

    ctx.fillStyle = "#4b2b1c";

    ctx.beginPath();
    ctx.arc(-1, -31 + bodyY, 11, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(-11, -32 + bodyY, 6, 7);

    // Orelha

    ctx.fillStyle = "#e8b18b";
    ctx.fillRect(-12, -27 + bodyY, 4, 6);

    // Olho

    ctx.fillStyle = "#242424";
    ctx.fillRect(4, -28 + bodyY, 3, 3);

    // Sobrancelha

    ctx.fillStyle = "#4b2b1c";
    ctx.fillRect(3, -32 + bodyY, 5, 2);

    // Sorriso

    ctx.strokeStyle = "#874a3a";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.arc(3, -23 + bodyY, 3, 0.2, 1.4);
    ctx.stroke();

    ctx.restore();
}

// =====================================
// PORTAL
// =====================================

function drawPortal() {

    const x = portal.x - cameraX;

    portal.animation += 0.08;

    const pulse = Math.sin(portal.animation) * 4;

    ctx.fillStyle = "#9b4dff";

    ctx.fillRect(
        x - pulse / 2,
        portal.y - pulse / 2,
        portal.width + pulse,
        portal.height + pulse
    );

    ctx.fillStyle = "#30ffff";

    ctx.fillRect(
        x + 7,
        portal.y + 5,
        portal.width - 14,
        portal.height - 10
    );

    ctx.fillStyle = "#fff";

    ctx.fillRect(
        x + 18,
        portal.y + 15,
        8,
        40
    );

    ctx.fillStyle = "#ffcc33";
    ctx.font = "14px monospace";
    ctx.textAlign = "center";

    ctx.fillText(
        "FINAL",
        x + 22,
        portal.y - 12
    );

    ctx.textAlign = "left";
}

// =====================================
// MOVIMENTO DO JOGADOR
// =====================================

function updatePlayer() {

    player.moving = false;

    if (keys["ArrowRight"] || keys["KeyD"]) {

        player.x += player.speed;
        player.direction = 1;
        player.moving = true;
    }

    if (keys["ArrowLeft"] || keys["KeyA"]) {

        player.x -= player.speed;
        player.direction = -1;
        player.moving = true;
    }

    if (
        (
            keys["Space"] ||
            keys["ArrowUp"] ||
            keys["KeyW"]
        ) &&
        !player.jumping
    ) {

        player.velocityY = -13;
        player.jumping = true;
    }

    // Gravidade

    const previousBottom = player.y + player.height;

    player.velocityY += gravity;
    player.y += player.velocityY;

    // Limites do mapa

    player.x = Math.max(
        0,
        Math.min(
            WORLD_WIDTH - player.width,
            player.x
        )
    );

    // Colisão com plataformas

    platforms.forEach(p => {

        const currentBottom = player.y + player.height;

        if (
            player.x + player.width > p.x &&
            player.x < p.x + p.width &&
            previousBottom <= p.y + 5 &&
            currentBottom >= p.y &&
            currentBottom <= p.y + p.height + 12 &&
            player.velocityY >= 0
        ) {

            player.y = p.y - player.height;

            player.velocityY = 0;
            player.jumping = false;
        }
    });

    // Caiu do mapa

    if (player.y > HEIGHT + 20) {
        loseLife();
    }

    // Câmera

    cameraX = Math.max(
        0,
        Math.min(
            WORLD_WIDTH - WIDTH,
            player.x - WIDTH * 0.4
        )
    );

    // Animação

    if (player.moving && !player.jumping) {
        animationTime += 0.25;
    }
}

// =====================================
// COLETAR MOEDAS
// =====================================

function checkCoins() {

    coins.forEach(c => {

        if (
            !c.collected &&
            player.x < c.x + 15 &&
            player.x + player.width > c.x &&
            player.y < c.y + 18 &&
            player.y + player.height > c.y
        ) {

            c.collected = true;

            score += 10;

            scoreElement.textContent = score;

            messageElement.textContent =
                "Boa! Você encontrou uma moeda!";
        }
    });
}

// =====================================
// COLISÃO COM ESPINHOS
// =====================================

function checkSpikes() {

    spikes.forEach(s => {

        if (
            player.x + player.width > s.x &&
            player.x < s.x + s.width &&
            player.y + player.height > s.y &&
            player.y + player.height < s.y + 30
        ) {

            loseLife();
        }
    });
}

// =====================================
// CHEGAR AO PORTAL
// =====================================

function checkPortal() {

    if (
        player.x + player.width > portal.x &&
        player.x < portal.x + portal.width &&
        player.y + player.height > portal.y &&
        player.y < portal.y + portal.height
    ) {

        won = true;

        messageElement.textContent =
            "PARABÉNS! VOCÊ CHEGOU AO FINAL!";
    }
}

// =====================================
// PERDER VIDA
// =====================================

function loseLife() {

    if (gameOver || won) return;

    lives--;

    livesElement.textContent = lives;

    player.x = Math.max(50, player.x - 100);
    player.y = 250;

    player.velocityY = 0;
    player.jumping = false;
    player.moving = false;

    if (lives <= 0) {

        gameOver = true;

        messageElement.textContent = "GAME OVER!";
    }
}

// =====================================
// TELAS FINAIS
// =====================================

function drawEndScreen(title, subtitle) {

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(120, 150, 560, 150);

    ctx.fillStyle = "#ffcc33";
    ctx.font = "bold 35px monospace";
    ctx.textAlign = "center";

    ctx.fillText(title, 400, 210);

    ctx.fillStyle = "white";
    ctx.font = "16px monospace";

    ctx.fillText(subtitle, 400, 250);

    ctx.textAlign = "left";
}

// =====================================
// REINICIAR JOGO
// =====================================

function restartGame() {

    score = 0;
    lives = 3;

    gameOver = false;
    won = false;

    cameraX = 0;
    animationTime = 0;

    player.x = 50;
    player.y = 300;

    player.velocityY = 0;
    player.jumping = false;
    player.moving = false;
    player.direction = 1;

    coins.forEach(c => {
        c.collected = false;
    });

    // Limpa controles pressionados

    activeTouches.clear();

    mobileButtons.forEach(control => {

        keys[control.key] = false;

        const button = document.getElementById(control.id);

        if (button) {
            button.classList.remove("pressed");
        }
    });

    keys["ArrowLeft"] = false;
    keys["ArrowRight"] = false;
    keys["Space"] = false;
    keys["ArrowUp"] = false;
    keys["KeyA"] = false;
    keys["KeyD"] = false;
    keys["KeyW"] = false;

    scoreElement.textContent = score;
    livesElement.textContent = lives;

    messageElement.textContent =
        "Atravesse o mapa e encontre o portal!";
}

// =====================================
// LOOP PRINCIPAL
// =====================================

function gameLoop() {

    drawBackground();

    drawPlatforms();

    drawSpikes();

    drawCoins();

    drawPortal();

    if (!gameOver && !won) {

        updatePlayer();

        checkCoins();

        checkSpikes();

        if (!gameOver) {
            checkPortal();
        }
    }

    drawPlayer();

    if (gameOver) {

        drawEndScreen(
            "GAME OVER!",
            "Clique em reiniciar para jogar novamente"
        );
    }

    if (won) {

        drawEndScreen(
            "YOU WIN!",
            "Você completou a aventura Jumperman!"
        );
    }

    requestAnimationFrame(gameLoop);
}

// =====================================
// BOTÃO REINICIAR
// =====================================

document.getElementById("restart")
    .addEventListener("click", restartGame);

// =====================================
// INICIAR JOGO
// =====================================

gameLoop();
