const gameWindow = document.getElementById("game-window");
const world = document.getElementById("world");
const playerEl = document.getElementById("player");
const scoreEl = document.getElementById("score");
const livesSprites = document.getElementById("lives-sprites");
const powerDisplay = document.getElementById("power-display");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreVal = document.getElementById("final-score-val");

const bgSky = document.getElementById("bg-sky");
const bgMountain = document.getElementById("bg-mountain");
const bgClouds = document.getElementById("bg-clouds");

// CONSTANTES RECALIBRADAS - FISICA PURA DO MARIO
const GRAVITY = 42.0; 
let score = 0;
let lives = 3;
let gameOver = false;
let lastTime = 0;

const player = {
    x: 150, y: 200,
    width: 44, height: 44,
    vx: 0, vy: 0,
    speed: 350,
    jumpForce: -880,    // Impulso alto garantido
    airJumpCut: -300,   // Controle de pulo preciso ao soltar o botão
    grounded: false,
    isSuper: false
};

let platforms = [];
let enemies = [];
let coins = [];
const keys = {};

window.addEventListener("keydown", e => {
    keys[e.code] = true;
    if (e.code === "Space" && gameOver) restartGame();
});
window.addEventListener("keyup", e => {
    keys[e.code] = false;
    if ((e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") && player.vy < player.airJumpCut) {
        player.vy = player.airJumpCut;
    }
});

function createDOMElement(className, left, top, width, height) {
    const el = document.createElement("div");
    el.className = className;
    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.width = width + "px";
    el.style.height = height + "px";
    world.appendChild(el);
    return el;
}

function initInitialMap() {
    addPlatform(0, 480, 1200, 96, "block-floor");
    
    addPlatform(450, 280, 48, 48, "block-item");
    addPlatform(498, 280, 48, 48, "block-floor");
    addPlatform(546, 280, 48, 48, "block-item");
    
    addCoin(511, 220);
    addEnemy(850, 444);
}

function addPlatform(x, y, w, h, type) {
    let el = createDOMElement(type, x, y, w, h);
    platforms.push({ x, y, w, h, type, element: el, used: false });
}

function addCoin(x, y) {
    let el = createDOMElement("retro-coin", x, y, 22, 24);
    coins.push({ x, y, w: 22, h: 24, element: el });
}

function addEnemy(x, y) {
    let el = createDOMElement("enemy-shroom", x, y, 36, 36);
    enemies.push({ x, y, w: 36, h: 36, vx: -140, element: el });
}

let lastGeneratedX = 1200;
function generateContent() {
    if (lastGeneratedX - player.x < 1200) {
        let hasGap = Math.random() > 0.45;
        let gapSize = hasGap ? 130 : 0;
        let blockX = lastGeneratedX + gapSize;
        let blockWidth = Math.floor(Math.random() * 3) * 96 + 192;
        
        if (!hasGap || gapSize === 0) {
            addPlatform(blockX, 480, blockWidth, 96, "block-floor");
            if (Math.random() > 0.35) addEnemy(blockX + blockWidth - 80, 444);
        } else {
            addPlatform(blockX, 320, 96, 32, "block-floor");
        }

        if (Math.random() > 0.5) {
            let itemX = blockX + 48;
            let itemY = Math.random() > 0.5 ? 280 : 220;
            addPlatform(itemX, itemY, 48, 48, "block-item");
            addCoin(itemX + 13, itemY - 50);
        }

        lastGeneratedX = blockX + blockWidth;
    }
}

function checkCollision(r1, r2) {
    return r1.x < r2.x + r2.w && r1.x + r1.width > r2.x &&
           r1.y < r2.y + r2.h && r1.y + r1.height > r2.y;
}

function update(dt) {
    if (gameOver) return;

    generateContent();

    if (keys["ArrowRight"] || keys["KeyD"]) {
        player.vx = player.speed;
        playerEl.classList.remove("facing-left");
        if(player.grounded) playerEl.className = "state-walk";
    } else if (keys["ArrowLeft"] || keys["KeyA"]) {
        player.vx = -player.speed;
        playerEl.classList.add("facing-left");
        if(player.grounded) playerEl.className = "state-walk facing-left";
    } else {
        player.vx = 0;
        if(player.grounded) playerEl.className = "state-idle";
    }

    if ((keys["Space"] || keys["ArrowUp"] || keys["KeyW"]) && player.grounded) {
        player.vy = player.jumpForce;
        player.grounded = false;
    }

    if(!player.grounded) {
        playerEl.classList.add("state-jump");
    }

    player.vy += GRAVITY * dt * 50; 
    player.x += player.vx * dt;
    player.y += player.vy * dt;

    if (player.x < 0) player.x = 0;

    player.grounded = false;
    platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            let oX = (player.x + player.width / 2) - (platform.x + platform.w / 2);
            let oY = (player.y + player.height / 2) - (platform.y + platform.h / 2);
            let minW = (player.width + platform.w) / 2;
            let minH = (player.height + platform.h) / 2;

            if (Math.abs(oX) < minW && Math.abs(oY) < minH) {
                let sX = minW - Math.abs(oX);
                let sY = minH - Math.abs(oY);

                if (sX > sY) {
                    if (oY > 0) {
                        player.y += sY;
                        player.vy = 0;
                        if (platform.type === "block-item" && !platform.used) {
                            platform.used = true;
                            platform.element.classList.add("used");
                            score += 200;
                            
                            if (!player.isSuper) {
                                player.isSuper = true;
                                player.width = 58;
                                player.height = 58;
                                playerEl.classList.add("super-size");
                                powerDisplay.style.color = "#00ffcc";
                                powerDisplay.innerText = "SUPER SQUIRREL";
                            }
                        }
                    } else {
                        player.y -= sY;
                        player.grounded = true;
                        player.vy = 0;
                    }
                } else {
                    if (oX > 0) player.x += sX;
                    else player.x -= sX;
                }
            }
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.x += enemy.vx * dt;
        enemy.element.style.left = enemy.x + "px";

        if (checkCollision(player, enemy)) {
            if (player.vy > 0 && player.y + player.height - (player.vy * dt) <= enemy.y + 18) {
                player.vy = player.jumpForce * 0.55; 
                enemy.element.remove();
                enemies.splice(index, 1);
                score += 300;
            } else {
                handlePlayerHit(index);
            }
        }
    });

    coins.forEach((coin, index) => {
        if (checkCollision(player, coin)) {
            coin.element.remove();
            coins.splice(index, 1);
            score += 100;
        }
    });

    if (player.y > 576) {
        handlePlayerHit();
        player.x = Math.max(150, player.x - 250);
        player.y = 150;
        player.vy = 0;
    }

    scoreEl.innerText = String(score).padStart(6, '0');

    let cameraX = 350 - player.x;
    if (cameraX > 0) cameraX = 0;
    world.style.left = cameraX + "px";

    bgSky.style.backgroundPositionX = (cameraX * 0.05) + "px";
    bgMountain.style.backgroundPositionX = (cameraX * 0.18) + "px";
    bgClouds.style.backgroundPositionX = (cameraX * 0.42) + "px";

    playerEl.style.left = player.x + "px";
    playerEl.style.top = player.y + "px";
}

function handlePlayerHit(enemyIndex = null) {
    // REMOVIDO O SHAKE DAQUI PARA ELIMINAR O LAG TOTALMENTE
    if (player.isSuper) {
        player.isSuper = false;
        player.width = 44;
        player.height = 44;
        playerEl.classList.remove("super-size");
        powerDisplay.style.color = "#fff";
        powerDisplay.innerText = "PEQUENO";
        if(enemyIndex !== null) {
            enemies[enemyIndex].element.remove();
            enemies.splice(enemyIndex, 1);
        }
    } else {
        lives--;
        updateHeartsUI();
        if (lives <= 0) {
            gameOver = true;
            finalScoreVal.innerText = String(score).padStart(6, '0');
            gameOverScreen.style.display = "flex";
        }
    }
}

function updateHeartsUI() {
    livesSprites.innerHTML = "";
    for(let i = 0; i < lives; i++) {
        let heart = document.createElement("span");
        heart.className = "heart";
        livesSprites.appendChild(heart);
    }
}

function restartGame() {
    gameOver = false;
    gameOverScreen.style.display = "none";
    score = 0;
    lives = 3;
    player.x = 150; player.y = 200;
    player.vx = 0; player.vy = 0;
    player.isSuper = false;
    player.width = 44; player.height = 44;
    playerEl.className = "state-idle";
    powerDisplay.style.color = "#fff";
    powerDisplay.innerText = "PEQUENO";
    
    updateHeartsUI();
    
    platforms.forEach(p => p.element.remove());
    enemies.forEach(e => e.element.remove());
    coins.forEach(c => c.element.remove());
    
    platforms = []; enemies = []; coins = [];
    lastGeneratedX = 1200;
    
    initInitialMap();
}

function mainLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    let dt = (timestamp - lastTime) / 1000;
    if (dt > 0.1) dt = 0.1; 
    lastTime = timestamp;

    update(dt);
    requestAnimationFrame(mainLoop);
}

initInitialMap();
requestAnimationFrame(mainLoop);