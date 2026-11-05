
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

let score = 0;
let lives = 3;
let playing = false;
let frames = 0;
let animation;
let lastShot = 0;

let keys = {};
let direction = null;

let ship;
let asteroids = [];
let bullets = [];
let stars = [];

// INICIALIZAR JOGO
function resetGame() {
    score = 0;
    lives = 3;
    frames = 0;

    ship = {
        x: canvas.width / 2,
        y: canvas.height - 70,
        size: 22,
        speed: 5
    };

    asteroids = [];
    bullets = [];

    stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5
    }));

    updateInfo();
}

// ATUALIZAR PONTUAÇÃO E VIDAS
function updateInfo() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

// DESENHAR ESTRELAS
function drawStars() {
    ctx.fillStyle = "white";

    stars.forEach(star => {
        ctx.fillRect(star.x, star.y, 2, 2);

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// DESENHAR A ASTRONAVE
function drawShip() {
    ctx.save();

    ctx.translate(ship.x, ship.y);

    ctx.fillStyle = "#00eaff";
    ctx.shadowColor = "#00eaff";
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(20, 20);
    ctx.lineTo(0, 12);
    ctx.lineTo(-20, 20);
    ctx.closePath();

    ctx.fill();

    // CABINE
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(0, -5, 6, 0, Math.PI * 2);
    ctx.fill();

    // FOGO DO MOTOR
    ctx.fillStyle = "orange";
    ctx.fillRect(-5, 18, 10, 12);

    ctx.restore();
}

// MOVIMENTAR A NAVE
function moveShip() {
    if (keys.ArrowLeft || keys.a || direction === "left") {
        ship.x -= ship.speed;
    }

    if (keys.ArrowRight || keys.d || direction === "right") {
        ship.x += ship.speed;
    }

    if (keys.ArrowUp || keys.w || direction === "up") {
        ship.y -= ship.speed;
    }

    if (keys.ArrowDown || keys.s || direction === "down") {
        ship.y += ship.speed;
    }

    ship.x = Math.max(22, Math.min(canvas.width - 22, ship.x));
    ship.y = Math.max(25, Math.min(canvas.height - 25, ship.y));
}

// CRIAR ASTEROIDES
function createAsteroid() {
    asteroids.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: -30,
        size: Math.random() * 15 + 15,
        speed: Math.random() * 2 + 2
    });
}

// DESENHAR ASTEROIDES
function drawAsteroids() {
    asteroids.forEach(asteroid => {
        asteroid.y += asteroid.speed;

        ctx.fillStyle = "#999";
        ctx.shadowColor = "#aaa";
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(
            asteroid.x,
            asteroid.y,
            asteroid.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
        ctx.shadowBlur = 0;
    });

    asteroids = asteroids.filter(
        asteroid => asteroid.y < canvas.height + 40
    );
}

// ATIRAR
function shoot() {
    if (!playing) return;

    const now = Date.now();

    if (now - lastShot < 250) return;

    lastShot = now;

    bullets.push({
        x: ship.x,
        y: ship.y - 25,
        speed: 8
    });
}

// DESENHAR TIROS
function drawBullets() {
    bullets.forEach(bullet => {
        bullet.y -= bullet.speed;

        ctx.fillStyle = "#00ffcc";
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 15;

        ctx.fillRect(
            bullet.x - 3,
            bullet.y,
            6,
            15
        );

        ctx.shadowBlur = 0;
    });

    bullets = bullets.filter(bullet => bullet.y > -20);
}

// DETECTAR COLISÕES
function collisions() {

    for (let i = asteroids.length - 1; i >= 0; i--) {

        const asteroid = asteroids[i];

        // Colisão com a nave
        const distance = Math.hypot(
            ship.x - asteroid.x,
            ship.y - asteroid.y
        );

        if (distance < asteroid.size + 15) {
            asteroids.splice(i, 1);
            lives--;
            updateInfo();

            if (lives <= 0) {
                endGame();
                return;
            }

            continue;
        }

        // Colisão com os tiros
        for (let j = bullets.length - 1; j >= 0; j--) {

            const bullet = bullets[j];

            const hit = Math.hypot(
                bullet.x - asteroid.x,
                bullet.y - asteroid.y
            );

            if (hit < asteroid.size + 8) {
                asteroids.splice(i, 1);
                bullets.splice(j, 1);

                score += 10;
                updateInfo();

                break;
            }
        }
    }
}

// MOVIMENTAÇÃO PELO TECLADO
document.addEventListener("keydown", event => {
    keys[event.key] = true;

    if (event.code === "Space") {
        event.preventDefault();
        shoot();
    }
});

document.addEventListener("keyup", event => {
    keys[event.key] = false;
});

// CONTROLES DO CELULAR
function move(dir) {
    direction = dir;
}

function stop() {
    direction = null;
}

// LOOP PRINCIPAL
function loop() {
    if (!playing) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawStars();

    moveShip();

    frames++;

    if (frames % 45 === 0) {
        createAsteroid();
    }

    drawShip();
    drawAsteroids();
    drawBullets();

    collisions();

    if (playing) {
        animation = requestAnimationFrame(loop);
    }
}

// INICIAR OU REINICIAR
function startGame() {
    cancelAnimationFrame(animation);

    resetGame();

    playing = true;

    loop();
}

// FINALIZAR JOGO
function endGame() {
    playing = false;

    cancelAnimationFrame(animation);

    ctx.fillStyle = "rgba(0, 0, 20, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";

    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 38px Arial";

    ctx.fillText(
        "FIM DE JOGO!",
        canvas.width / 2,
        190
    );

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";

    ctx.fillText(
        "Pontuação: " + score,
        canvas.width / 2,
        235
    );

    ctx.font = "16px Arial";

    ctx.fillText(
        "Clique em REINICIAR para jogar novamente",
        canvas.width / 2,
        280
    );
}

// TELA INICIAL
resetGame();

ctx.fillStyle = "white";
ctx.font = "24px Arial";
ctx.textAlign = "center";

ctx.fillText(
    "APERTE INICIAR PARA JOGAR",
    canvas.width / 2,
    canvas.height / 2
);
