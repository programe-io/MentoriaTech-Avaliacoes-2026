/* =====================================================
   NEON STRIKE
   JOGO DE TIRO 2D
===================================================== */


/* =====================================================
   CANVAS
===================================================== */

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");


/* =====================================================
   ELEMENTOS DA INTERFACE
===================================================== */

const scoreElement =
    document.getElementById("score");

const waveElement =
    document.getElementById("wave");

const healthBar =
    document.getElementById("healthBar");

const healthText =
    document.getElementById("healthText");

const ammoElement =
    document.getElementById("ammo");

const crosshair =
    document.getElementById("crosshair");

const startScreen =
    document.getElementById("startScreen");

const pauseScreen =
    document.getElementById("pauseScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const startButton =
    document.getElementById("startButton");

const resumeButton =
    document.getElementById("resumeButton");

const restartButton =
    document.getElementById("restartButton");

const pauseRestartButton =
    document.getElementById("pauseRestartButton");

const finalScore =
    document.getElementById("finalScore");

const finalWave =
    document.getElementById("finalWave");

const reloadIndicator =
    document.getElementById("reloadIndicator");

const damageEffect =
    document.getElementById("damageEffect");


/* =====================================================
   TAMANHO DO CANVAS
===================================================== */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    canvas.width =
        Math.floor(rect.width);

    canvas.height =
        Math.floor(rect.height);

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


/* =====================================================
   ESTADO DO JOGO
===================================================== */

let gameRunning = false;
let gamePaused = false;
let gameOver = false;

let score = 0;
let wave = 1;

let lastTime = 0;

let spawnTimer = 0;

let enemiesToSpawn = 5;

let enemiesSpawned = 0;

let enemiesKilled = 0;

let shake = 0;


/* =====================================================
   INPUT
===================================================== */

const keys = {};

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    down: false
};


document.addEventListener(
    "keydown",
    event => {

        keys[event.key.toLowerCase()] = true;


        if (
            event.key.toLowerCase() === "r"
        ) {

            reload();

        }


        if (event.key === "Escape") {

            togglePause();

        }

    }
);


document.addEventListener(
    "keyup",
    event => {

        keys[event.key.toLowerCase()] = false;

    }
);


canvas.addEventListener(
    "mousemove",
    event => {

        const rect =
            canvas.getBoundingClientRect();

        mouse.x =
            event.clientX - rect.left;

        mouse.y =
            event.clientY - rect.top;

        crosshair.style.left =
            `${event.clientX}px`;

        crosshair.style.top =
            `${event.clientY}px`;

    }
);


canvas.addEventListener(
    "mousedown",
    event => {

        if (event.button === 0) {

            mouse.down = true;

            shoot();

        }

    }
);


canvas.addEventListener(
    "mouseup",
    event => {

        if (event.button === 0) {

            mouse.down = false;

        }

    }
);


/* =====================================================
   ÁUDIO
===================================================== */

let audioContext = null;


function initAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

}


function playSound(
    frequency,
    duration,
    type = "square",
    volume = .04
) {

    if (!audioContext) {
        return;
    }

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = type;

    oscillator.frequency.value =
        frequency;

    gain.gain.value =
        volume;

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );

    oscillator.stop(
        audioContext.currentTime + duration
    );

}


/* =====================================================
   PLAYER
===================================================== */

const player = {

    x: 0,
    y: 0,

    radius: 18,

    speed: 260,

    health: 100,
    maxHealth: 100,

    ammo: 12,
    magazine: 12,
    reserveAmmo: 72,

    fireRate: 140,

    lastShot: 0,

    reloadTime: 1100,

    reloading: false

};


/* =====================================================
   INIMIGOS
===================================================== */

const enemies = [];


/* =====================================================
   BALAS
===================================================== */

const bullets = [];


/* =====================================================
   PARTÍCULAS
===================================================== */

const particles = [];


/* =====================================================
   POWER UPS
===================================================== */

const powerUps = [];


/* =====================================================
   RESET PLAYER
===================================================== */

function resetPlayer() {

    player.x =
        canvas.width / 2;

    player.y =
        canvas.height / 2;

    player.health =
        player.maxHealth;

    player.ammo =
        player.magazine;

    player.reserveAmmo =
        72;

    player.reloading =
        false;

}


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    initAudio();

    gameRunning = true;
    gamePaused = false;
    gameOver = false;

    score = 0;
    wave = 1;

    enemies.length = 0;
    bullets.length = 0;
    particles.length = 0;
    powerUps.length = 0;

    enemiesKilled = 0;
    enemiesSpawned = 0;

    enemiesToSpawn = 5;

    spawnTimer = 0;

    resetPlayer();

    startScreen.classList.remove("active");

    pauseScreen.classList.remove("active");

    gameOverScreen.classList.remove("active");

    updateHUD();

    lastTime =
        performance.now();

    requestAnimationFrame(
        gameLoop
    );

}


/* =====================================================
   PAUSE
===================================================== */

function togglePause() {

    if (
        !gameRunning ||
        gameOver
    ) {
        return;
    }

    gamePaused =
        !gamePaused;


    if (gamePaused) {

        pauseScreen.classList.add(
            "active"
        );

    } else {

        pauseScreen.classList.remove(
            "active"
        );

        lastTime =
            performance.now();

        requestAnimationFrame(
            gameLoop
        );

    }

}


/* =====================================================
   RESTART
===================================================== */

function restartGame() {

    startGame();

}


/* =====================================================
   PLAYER MOVEMENT
===================================================== */

function updatePlayer(delta) {

    let dx = 0;
    let dy = 0;


    if (keys["w"]) {
        dy -= 1;
    }

    if (keys["s"]) {
        dy += 1;
    }

    if (keys["a"]) {
        dx -= 1;
    }

    if (keys["d"]) {
        dx += 1;
    }


    if (dx !== 0 || dy !== 0) {

        const length =
            Math.hypot(dx, dy);

        dx /= length;
        dy /= length;


        player.x +=
            dx * player.speed * delta;

        player.y +=
            dy * player.speed * delta;

    }


    const padding = 25;

    player.x =
        Math.max(
            padding,
            Math.min(
                canvas.width - padding,
                player.x
            )
        );

    player.y =
        Math.max(
            padding,
            Math.min(
                canvas.height - padding,
                player.y
            )
        );

}


/* =====================================================
   SHOOT
===================================================== */

function shoot() {

    if (
        !gameRunning ||
        gamePaused ||
        gameOver ||
        player.reloading
    ) {
        return;
    }


    const now =
        performance.now();


    if (
        now - player.lastShot <
        player.fireRate
    ) {
        return;
    }


    if (player.ammo <= 0) {

        playSound(
            90,
            .08,
            "sawtooth",
            .03
        );

        reload();

        return;

    }


    player.lastShot =
        now;

    player.ammo--;


    const angle =
        Math.atan2(
            mouse.y - player.y,
            mouse.x - player.x
        );


    const speed = 720;


    bullets.push({

        x: player.x,
        y: player.y,

        vx:
            Math.cos(angle) * speed,

        vy:
            Math.sin(angle) * speed,

        radius: 4,

        life: 1

    });


    createMuzzleParticles(
        player.x,
        player.y,
        angle
    );


    playSound(
        150,
        .06,
        "square",
        .025
    );


    shake = 2;

    updateHUD();

}


/* =====================================================
   RELOAD
===================================================== */

function reload() {

    if (
        player.reloading ||
        player.ammo === player.magazine ||
        player.reserveAmmo <= 0
    ) {
        return;
    }


    player.reloading = true;

    reloadIndicator.classList.add(
        "active"
    );


    setTimeout(() => {

        const missing =
            player.magazine -
            player.ammo;

        const amount =
            Math.min(
                missing,
                player.reserveAmmo
            );

        player.ammo += amount;

        player.reserveAmmo -= amount;

        player.reloading = false;

        reloadIndicator.classList.remove(
            "active"
        );

        updateHUD();

        playSound(
            500,
            .08,
            "triangle",
            .02
        );

    }, player.reloadTime);

}


/* =====================================================
   SPAWN INIMIGO
===================================================== */

function spawnEnemy() {

    let x;
    let y;

    const side =
        Math.floor(
            Math.random() * 4
        );


    if (side === 0) {

        x = Math.random() * canvas.width;
        y = -30;

    } else if (side === 1) {

        x = canvas.width + 30;
        y = Math.random() * canvas.height;

    } else if (side === 2) {

        x = Math.random() * canvas.width;
        y = canvas.height + 30;

    } else {

        x = -30;
        y = Math.random() * canvas.height;

    }


    const strong =
        Math.random() < 0.15 + wave * .01;


    enemies.push({

        x,
        y,

        radius:
            strong ? 22 : 17,

        speed:
            strong
                ? 55 + wave * 2
                : 75 + wave * 3,

        health:
            strong
                ? 3 + Math.floor(wave / 3)
                : 1,

        maxHealth:
            strong
                ? 3 + Math.floor(wave / 3)
                : 1,

        color:
            strong
                ? "#ff9d00"
                : "#ff375f",

        damage:
            strong ? 18 : 10,

        attackCooldown: 0

    });

    enemiesSpawned++;

}


/* =====================================================
   UPDATE ENEMIES
===================================================== */

function updateEnemies(delta) {

    for (
        let i = enemies.length - 1;
        i >= 0;
        i--
    ) {

        const enemy =
            enemies[i];


        const dx =
            player.x - enemy.x;

        const dy =
            player.y - enemy.y;

        const distance =
            Math.hypot(dx, dy);


        if (distance > 0) {

            enemy.x +=
                (dx / distance) *
                enemy.speed *
                delta;

            enemy.y +=
                (dy / distance) *
                enemy.speed *
                delta;

        }


        enemy.attackCooldown -=
            delta;


        if (
            distance <
            enemy.radius +
            player.radius
        ) {

            if (
                enemy.attackCooldown <= 0
            ) {

                damagePlayer(
                    enemy.damage
                );

                enemy.attackCooldown =
                    .8;

            }

        }

    }

}


/* =====================================================
   DAMAGE PLAYER
===================================================== */

function damagePlayer(amount) {

    player.health -= amount;

    shake = 8;

    damageEffect.classList.remove(
        "active"
    );

    void damageEffect.offsetWidth;

    damageEffect.classList.add(
        "active"
    );

    playSound(
        70,
        .12,
        "sawtooth",
        .04
    );


    if (player.health <= 0) {

        player.health = 0;

        endGame();

    }


    updateHUD();

}


/* =====================================================
   UPDATE BULLETS
===================================================== */

function updateBullets(delta) {

    for (
        let i = bullets.length - 1;
        i >= 0;
        i--
    ) {

        const bullet =
            bullets[i];

        bullet.x +=
            bullet.vx * delta;

        bullet.y +=
            bullet.vy * delta;

        bullet.life -=
            delta;


        if (
            bullet.life <= 0 ||
            bullet.x < -50 ||
            bullet.x > canvas.width + 50 ||
            bullet.y < -50 ||
            bullet.y > canvas.height + 50
        ) {

            bullets.splice(i, 1);

        }

    }

}


/* =====================================================
   BULLET COLLISION
===================================================== */

function checkBulletCollisions() {

    for (
        let b = bullets.length - 1;
        b >= 0;
        b--
    ) {

        const bullet =
            bullets[b];


        for (
            let e = enemies.length - 1;
            e >= 0;
            e--
        ) {

            const enemy =
                enemies[e];


            const dx =
                bullet.x - enemy.x;

            const dy =
                bullet.y - enemy.y;

            const distance =
                Math.hypot(dx, dy);


            if (
                distance <
                bullet.radius +
                enemy.radius
            ) {

                enemy.health--;

                createExplosion(
                    bullet.x,
                    bullet.y,
                    enemy.color
                );

                bullets.splice(
                    b,
                    1
                );

                if (enemy.health <= 0) {

                    killEnemy(e);

                }

                break;

            }

        }

    }

}


/* =====================================================
   KILL ENEMY
===================================================== */

function killEnemy(index) {

    const enemy =
        enemies[index];


    enemies.splice(
        index,
        1
    );


    enemiesKilled++;

    score +=
        enemy.radius > 20
            ? 250
            : 100;


    createExplosion(
        enemy.x,
        enemy.y,
        enemy.color,
        18
    );


    playSound(
        300,
        .08,
        "square",
        .03
    );


    if (
        Math.random() < .08
    ) {

        spawnPowerUp(
            enemy.x,
            enemy.y
        );

    }


    updateHUD();

}


/* =====================================================
   POWER UP
===================================================== */

function spawnPowerUp(x, y) {

    const type =
        Math.random() < .5
            ? "health"
            : "ammo";


    powerUps.push({

        x,
        y,

        radius: 12,

        type,

        life: 10

    });

}


function updatePowerUps(delta) {

    for (
        let i = powerUps.length - 1;
        i >= 0;
        i--
    ) {

        const powerUp =
            powerUps[i];

        powerUp.life -= delta;


        if (
            powerUp.life <= 0
        ) {

            powerUps.splice(i, 1);

            continue;

        }


        const distance =
            Math.hypot(
                player.x - powerUp.x,
                player.y - powerUp.y
            );


        if (
            distance <
            player.radius +
            powerUp.radius
        ) {

            if (
                powerUp.type ===
                "health"
            ) {

                player.health =
                    Math.min(
                        player.maxHealth,
                        player.health + 25
                    );

            } else {

                player.reserveAmmo += 24;

            }


            powerUps.splice(i, 1);

            score += 50;

            playSound(
                700,
                .12,
                "triangle",
                .04
            );

            updateHUD();

        }

    }

}


/* =====================================================
   ONDAS
===================================================== */

function updateWave() {

    if (
        enemiesSpawned >=
        enemiesToSpawn &&
        enemies.length === 0
    ) {

        wave++;

        enemiesSpawned = 0;

        enemiesToSpawn =
            4 + wave * 2;


        player.health =
            Math.min(
                player.maxHealth,
                player.health + 10
            );


        score += 500;

        updateHUD();

    }

}


/* =====================================================
   SPAWN CONTROL
===================================================== */

function updateSpawning(delta) {

    spawnTimer -= delta;


    if (
        enemiesSpawned <
        enemiesToSpawn &&
        spawnTimer <= 0
    ) {

        spawnEnemy();

        spawnTimer =
            Math.max(
                .25,
                1.1 - wave * .04
            );

    }

}


/* =====================================================
   PARTICLES
===================================================== */

function createMuzzleParticles(
    x,
    y,
    angle
) {

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const spread =
            angle +
            (Math.random() - .5) *
            .7;

        particles.push({

            x,
            y,

            vx:
                Math.cos(spread) *
                (100 + Math.random() * 160),

            vy:
                Math.sin(spread) *
                (100 + Math.random() * 160),

            life: .2,

            maxLife: .2,

            color: "#fff7b2",

            size:
                2 + Math.random() * 3

        });

    }

}


function createExplosion(
    x,
    y,
    color,
    amount = 7
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const speed =
            40 +
            Math.random() * 180;


        particles.push({

            x,
            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                .3 +
                Math.random() * .4,

            maxLife: .7,

            color,

            size:
                2 +
                Math.random() * 3

        });

    }

}


function updateParticles(delta) {

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];

        particle.x +=
            particle.vx * delta;

        particle.y +=
            particle.vy * delta;

        particle.vx *=
            .95;

        particle.vy *=
            .95;

        particle.life -=
            delta;


        if (
            particle.life <= 0
        ) {

            particles.splice(i, 1);

        }

    }

}


/* =====================================================
   DRAW BACKGROUND
===================================================== */

function drawBackground() {

    ctx.fillStyle =
        "#071016";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const gridSize = 50;

    ctx.strokeStyle =
        "rgba(0,229,255,.055)";

    ctx.lineWidth = 1;


    for (
        let x = 0;
        x < canvas.width;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            canvas.height
        );

        ctx.stroke();

    }


    for (
        let y = 0;
        y < canvas.height;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            canvas.width,
            y
        );

        ctx.stroke();

    }


    /* pontos decorativos */

    for (
        let x = 25;
        x < canvas.width;
        x += 100
    ) {

        for (
            let y = 25;
            y < canvas.height;
            y += 100
        ) {

            ctx.fillStyle =
                "rgba(0,229,255,.12)";

            ctx.fillRect(
                x,
                y,
                2,
                2
            );

        }

    }

}


/* =====================================================
   DRAW PLAYER
===================================================== */

function drawPlayer() {

    const angle =
        Math.atan2(
            mouse.y - player.y,
            mouse.x - player.x
        );


    ctx.save();

    ctx.translate(
        player.x,
        player.y
    );

    ctx.rotate(angle);


    /* sombra */

    ctx.fillStyle =
        "rgba(0,0,0,.4)";

    ctx.beginPath();

    ctx.arc(
        3,
        5,
        player.radius + 2,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* corpo */

    ctx.fillStyle =
        "#00e5ff";

    ctx.shadowBlur = 20;
    ctx.shadowColor =
        "#00e5ff";

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        player.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* arma */

    ctx.shadowBlur = 0;

    ctx.fillStyle =
        "#dce9ed";

    ctx.fillRect(
        5,
        -4,
        25,
        8
    );


    ctx.fillStyle =
        "#263238";

    ctx.fillRect(
        18,
        -3,
        17,
        6
    );


    ctx.restore();

}


/* =====================================================
   DRAW ENEMIES
===================================================== */

function drawEnemies() {

    enemies.forEach(enemy => {

        ctx.save();

        ctx.translate(
            enemy.x,
            enemy.y
        );


        ctx.shadowBlur = 18;

        ctx.shadowColor =
            enemy.color;


        ctx.fillStyle =
            enemy.color;


        ctx.beginPath();

        ctx.arc(
            0,
            0,
            enemy.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.shadowBlur = 0;


        /* olho */

        ctx.fillStyle =
            "#fff";

        ctx.beginPath();

        ctx.arc(
            -5,
            -4,
            3,
            0,
            Math.PI * 2
        );

        ctx.arc(
            5,
            -4,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* barra de vida */

        const barWidth =
            enemy.radius * 2;

        ctx.fillStyle =
            "#182126";

        ctx.fillRect(
            -barWidth / 2,
            -enemy.radius - 10,
            barWidth,
            4
        );


        ctx.fillStyle =
            "#00ff88";

        ctx.fillRect(
            -barWidth / 2,
            -enemy.radius - 10,
            barWidth *
                (enemy.health /
                enemy.maxHealth),
            4
        );


        ctx.restore();

    });

}


/* =====================================================
   DRAW BULLETS
===================================================== */

function drawBullets() {

    bullets.forEach(bullet => {

        ctx.fillStyle =
            "#fff";

        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "#00e5ff";


        ctx.beginPath();

        ctx.arc(
            bullet.x,
            bullet.y,
            bullet.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;

    });

}


/* =====================================================
   DRAW POWER UPS
===================================================== */

function drawPowerUps() {

    powerUps.forEach(powerUp => {

        const color =
            powerUp.type === "health"
                ? "#00ff88"
                : "#f2c94c";


        ctx.save();

        ctx.translate(
            powerUp.x,
            powerUp.y
        );

        ctx.rotate(
            performance.now() / 500
        );


        ctx.fillStyle =
            color;

        ctx.shadowBlur = 20;
        ctx.shadowColor =
            color;


        ctx.fillRect(
            -10,
            -10,
            20,
            20
        );


        ctx.shadowBlur = 0;


        ctx.fillStyle =
            "#071016";

        ctx.font =
            "bold 14px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillText(
            powerUp.type === "health"
                ? "+"
                : "A",
            0,
            1
        );


        ctx.restore();

    });

}


/* =====================================================
   DRAW PARTICLES
===================================================== */

function drawParticles() {

    particles.forEach(particle => {

        ctx.globalAlpha =
            Math.max(
                0,
                particle.life /
                particle.maxLife
            );

        ctx.fillStyle =
            particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}


/* =====================================================
   HUD
===================================================== */

function updateHUD() {

    scoreElement.textContent =
        score.toLocaleString("pt-BR");

    waveElement.textContent =
        wave;

    healthText.textContent =
        Math.ceil(player.health);

    healthBar.style.width =
        `${player.health}%`;

    ammoElement.textContent =
        `${player.ammo} / ${player.reserveAmmo}`;


    if (player.health < 30) {

        healthBar.style.background =
            "#ff375f";

    } else {

        healthBar.style.background =
            "linear-gradient(90deg,#00ff88,#00e5ff)";

    }

}


/* =====================================================
   DRAW
===================================================== */

function draw() {

    ctx.save();


    if (shake > 0) {

        const sx =
            (Math.random() - .5) *
            shake;

        const sy =
            (Math.random() - .5) *
            shake;

        ctx.translate(
            sx,
            sy
        );

        shake *= .88;

        if (shake < .1) {
            shake = 0;
        }

    }


    drawBackground();

    drawPowerUps();

    drawBullets();

    drawEnemies();

    drawPlayer();

    drawParticles();


    ctx.restore();

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(timestamp) {

    if (
        !gameRunning ||
        gamePaused ||
        gameOver
    ) {
        return;
    }


    const delta =
        Math.min(
            (timestamp - lastTime) /
            1000,
            .05
        );


    lastTime =
        timestamp;


    updatePlayer(delta);

    updateSpawning(delta);

    updateEnemies(delta);

    updateBullets(delta);

    checkBulletCollisions();

    updatePowerUps(delta);

    updateParticles(delta);

    updateWave();

    if (mouse.down) {

        shoot();

    }

    updateHUD();

    draw();


    requestAnimationFrame(
        gameLoop
    );

}


/* =====================================================
   GAME OVER
===================================================== */

function endGame() {

    gameRunning = false;

    gameOver = true;

    finalScore.textContent =
        score.toLocaleString("pt-BR");

    finalWave.textContent =
        wave;

    gameOverScreen.classList.add(
        "active"
    );

    playSound(
        80,
        .5,
        "sawtooth",
        .04
    );

}


/* =====================================================
   MOBILE CONTROLS
===================================================== */

const mobileButtons =
    document.querySelectorAll(
        ".mobile-controls button"
    );


mobileButtons.forEach(button => {

    const key =
        button.dataset.key;


    button.addEventListener(
        "touchstart",
        event => {

            event.preventDefault();

            keys[key] = true;

        }
    );


    button.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

            keys[key] = false;

        }
    );


    button.addEventListener(
        "mousedown",
        () => {

            keys[key] = true;

        }
    );


    button.addEventListener(
        "mouseup",
        () => {

            keys[key] = false;

        }
    );

});


/* =====================================================
   BOTÕES
===================================================== */

startButton.addEventListener(
    "click",
    startGame
);

restartButton.addEventListener(
    "click",
    restartGame
);

resumeButton.addEventListener(
    "click",
    togglePause
);

pauseRestartButton.addEventListener(
    "click",
    restartGame
);


/* =====================================================
   PREVENIR MENU DO MOUSE
===================================================== */

canvas.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();

    }
);


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

resizeCanvas();

draw();
