
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const finalScore = document.getElementById("finalScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

let score = 0;
let lives = 3;
let playing = false;

let bullets = [];
let enemies = [];
let particles = [];
let stars = [];

let keys = {};
let enemyTimer = 0;
let shootTimer = 0;
let animationId = null;

const player = {
    x: 235,
    y: 520,
    width: 32,
    height: 40,
    speed: 6,
    cooldown: 0
};

// Criar estrelas do espaço
function createStars() {
    stars = [];

    for (let i = 0; i < 70; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 1
        });
    }
}

// Desenhar fundo
function drawBackground() {
    ctx.fillStyle = "#050719";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.fillStyle = "white";
        ctx.fillRect(star.x, star.y, star.size, star.size);

        if (playing) {
            star.y += star.speed;

            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        }
    });
}

// Desenhar jogador
function drawPlayer() {
    ctx.save();

    ctx.shadowColor = "#00eaff";
    ctx.shadowBlur = 15;

    ctx.fillStyle = "#00d9ff";

    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.lineTo(player.x + player.width / 2, player.y + 30);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Cabine
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(
        player.x + 16,
        player.y + 23,
        5,
        9,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Fogo da nave
    ctx.fillStyle = "#ff9500";
    ctx.beginPath();
    ctx.moveTo(player.x + 10, player.y + 37);
    ctx.lineTo(player.x + 16, player.y + 50 + Math.random() * 5);
    ctx.lineTo(player.x + 22, player.y + 37);
    ctx.fill();

    ctx.restore();
}

// Movimentar jogador
function movePlayer() {
    if (keys["ArrowLeft"] || keys["a"]) {
        player.x -= player.speed;
    }

    if (keys["ArrowRight"] || keys["d"]) {
        player.x += player.speed;
    }

    player.x = Math.max(
        0,
        Math.min(canvas.width - player.width, player.x)
    );
}

// Criar tiro
function shoot() {
    if (player.cooldown > 0) return;

    bullets.push({
        x: player.x + player.width / 2 - 3,
        y: player.y,
        width: 6,
        height: 16,
        speed: 9
    });

    player.cooldown = 15;
}

// Desenhar e movimentar tiros
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;

        ctx.fillStyle = "#00ffcc";
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 12;

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

        ctx.shadowBlur = 0;

        if (bullet.y < -20) {
            bullets.splice(index, 1);
        }
    });
}

// Criar inimigos
function createEnemy() {
    const size = 35 + Math.random() * 10;

    enemies.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: 2 + Math.random() * 2
    });
}

// Desenhar inimigos
function updateEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        ctx.save();

        ctx.fillStyle = "#ff285c";
        ctx.shadowColor = "#ff285c";
        ctx.shadowBlur = 15;

        // Inimigo espacial
        ctx.beginPath();
        ctx.moveTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
        ctx.lineTo(enemy.x, enemy.y + 8);
        ctx.lineTo(enemy.x + 8, enemy.y);
        ctx.lineTo(enemy.x + enemy.width - 8, enemy.y);
        ctx.lineTo(enemy.x + enemy.width, enemy.y + 8);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.fillRect(enemy.x + 9, enemy.y + 12, 6, 6);
        ctx.fillRect(enemy.x + enemy.width - 15, enemy.y + 12, 6, 6);

        ctx.restore();

        // Inimigo chegou ao final
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            loseLife();
        }
    });
}

// Verificar colisões
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {

            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                createExplosion(
                    enemy.x + enemy.width / 2,
                    enemy.y + enemy.height / 2
                );

                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);

                score += 10;
                scoreElement.textContent = score;
            }
        });
    });

    // Colisão entre nave e inimigo
    enemies.forEach((enemy, index) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            enemies.splice(index, 1);

            createExplosion(
                player.x + player.width / 2,
                player.y + player.height / 2
            );

            loseLife();
        }
    });
}

// Criar explosão
function createExplosion(x, y) {
    for (let i = 0; i < 12; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 7,
            life: 25,
            size: Math.random() * 5 + 2
        });
    }
}

// Desenhar explosões
function updateParticles() {
    particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        ctx.globalAlpha = Math.max(0, particle.life / 25);
        ctx.fillStyle = "#ffb700";

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.globalAlpha = 1;

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

// Perder vida
function loseLife() {
    if (!playing) return;

    lives--;
    livesElement.textContent = lives;

    if (lives <= 0) {
        endGame();
    }
}

// Finalizar jogo
function endGame() {
    playing = false;

    cancelAnimationFrame(animationId);

    finalScore.textContent = score;
    gameOverScreen.classList.remove("hidden");
}

// Loop principal
function gameLoop() {
    if (!playing) return;

    drawBackground();

    movePlayer();

    if (keys["Space"] || keys[" "]) {
        shoot();
    }

    if (player.cooldown > 0) {
        player.cooldown--;
    }

    enemyTimer++;

    if (enemyTimer > Math.max(20, 65 - score / 30)) {
        createEnemy();
        enemyTimer = 0;
    }

    drawPlayer();
    updateBullets();
    updateEnemies();
    checkCollisions();
    updateParticles();

    animationId = requestAnimationFrame(gameLoop);
}

// Iniciar jogo
function startGame() {
    score = 0;
    lives = 3;

    bullets = [];
    enemies = [];
    particles = [];

    enemyTimer = 0;

    player.x = 235;
    player.y = 520;
    player.cooldown = 0;

    scoreElement.textContent = score;
    livesElement.textContent = lives;

    keys = {};

    createStars();

    playing = true;

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    cancelAnimationFrame(animationId);

    gameLoop();
}

// Controles do teclado
document.addEventListener("keydown", event => {
    if (
        ["ArrowLeft", "ArrowRight", "Space", "ArrowUp"]
        .includes(event.code)
    ) {
        event.preventDefault();
    }

    keys[event.code] = true;
    keys[event.key] = true;
});

document.addEventListener("keyup", event => {
    keys[event.code] = false;
    keys[event.key] = false;
});

// Controles para celular
function mobileControl(buttonId, key) {
    const button = document.getElementById(buttonId);

    button.addEventListener("pointerdown", event => {
        event.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("pointerup", () => {
        keys[key] = false;
    });

    button.addEventListener("pointerleave", () => {
        keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
        keys[key] = false;
    });
}

mobileControl("leftButton", "ArrowLeft");
mobileControl("rightButton", "ArrowRight");
mobileControl("fireButton", "Space");

// Botões
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Tela inicial
createStars();
drawBackground();
