
// =====================================
// CATEGORIA 1 - CONFIGURAÇÕES DO JOGO
// =====================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let started = false;
let gameOver = false;

const keys = {};


// =====================================
// CATEGORIA 2 - PERSONAGEM
// =====================================

const player = {
    x: 400,
    y: 260,
    speed: 3,

    hp: 100,
    maxHp: 100,

    level: 1,
    xp: 0,
    xpNext: 30,

    gold: 0,
    potions: 2,
    wood: 0,
    crystals: 0,

    dir: { x: 0, y: 1 }
};


// =====================================
// CATEGORIA 3 - INIMIGOS
// =====================================

const enemies = [];

function createEnemies() {

    for (let i = 0; i < 5; i++) {

        enemies.push({
            x: 180 + i * 110,
            y: 170 + (i % 2) * 150,
            hp: 35,
            maxHp: 35,
            speed: 0.7,
            alive: true
        });

    }
}


// =====================================
// CATEGORIA 4 - INVENTÁRIO E MISSÕES
// =====================================

let defeated = 0;

function collectGold(amount) {
    player.gold += amount;
    updateUI();
}

function collectWood() {
    player.wood++;
    updateUI();
}

function collectCrystal() {
    player.crystals++;
    updateUI();
}


// =====================================
// CATEGORIA 5 - EXPERIÊNCIA E NÍVEIS
// =====================================

function gainXP(amount) {

    player.xp += amount;

    while (player.xp >= player.xpNext) {

        player.xp -= player.xpNext;

        player.level++;

        player.xpNext = Math.floor(
            player.xpNext * 1.45
        );

        player.maxHp += 15;
        player.hp = player.maxHp;

        addLog("Você subiu de nível!");

    }

    updateUI();
}


// =====================================
// CATEGORIA 6 - MOVIMENTAÇÃO
// =====================================

function movePlayer() {

    let dx = 0;
    let dy = 0;

    if (keys["w"] || keys["arrowup"]) dy--;
    if (keys["s"] || keys["arrowdown"]) dy++;

    if (keys["a"] || keys["arrowleft"]) dx--;
    if (keys["d"] || keys["arrowright"]) dx++;

    if (dx || dy) {

        const length = Math.hypot(dx, dy);

        dx = dx / length * player.speed;
        dy = dy / length * player.speed;

        player.x += dx;
        player.y += dy;

        player.x = Math.max(15, Math.min(785, player.x));
        player.y = Math.max(15, Math.min(505, player.y));

        player.dir = {
            x: Math.sign(dx),
            y: Math.sign(dy)
        };
    }
}


// =====================================
// CATEGORIA 7 - ATAQUE
// =====================================

function attack() {

    enemies.forEach(enemy => {

        if (!enemy.alive) return;

        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;

        const distance = Math.hypot(dx, dy);

        if (distance < 55) {

            enemy.hp -= 22;

            if (enemy.hp <= 0) {

                enemy.alive = false;

                defeated++;

                collectGold(7);
                gainXP(12);

                addLog("Inimigo derrotado!");

            }

        }

    });

    updateUI();
}


// =====================================
// CATEGORIA 8 - USAR POÇÃO
// =====================================

function usePotion() {

    if (player.potions <= 0) {
        addLog("Você não possui poções!");
        return;
    }

    if (player.hp >= player.maxHp) {
        addLog("Sua vida já está cheia!");
        return;
    }

    player.potions--;

    player.hp = Math.min(
        player.maxHp,
        player.hp + 45
    );

    updateUI();
}


// =====================================
// CATEGORIA 9 - DESENHAR O MUNDO
// =====================================

function drawWorld() {

    ctx.fillStyle = "#47734d";
    ctx.fillRect(0, 0, 800, 520);

    // Caminho
    ctx.fillStyle = "#a38b61";
    ctx.fillRect(365, 0, 70, 520);

    // Árvores
    for (let i = 0; i < 10; i++) {

        let x = 80 + i * 70;
        let y = 80 + (i % 3) * 130;

        ctx.fillStyle = "#214e37";

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

    }

}


// =====================================
// CATEGORIA 10 - DESENHAR PERSONAGEM
// =====================================

function drawPlayer() {

    ctx.fillStyle = "#e9b98c";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y,
        12,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "#3d6eb1";

    ctx.fillRect(
        player.x - 9,
        player.y + 8,
        18,
        15
    );
}


// =====================================
// CATEGORIA 11 - DESENHAR INIMIGOS
// =====================================

function drawEnemies() {

    enemies.forEach(enemy => {

        if (!enemy.alive) return;

        ctx.fillStyle = "#286b9a";

        ctx.beginPath();

        ctx.arc(
            enemy.x,
            enemy.y,
            20,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Barra de vida
        ctx.fillStyle = "#e66c68";

        ctx.fillRect(
            enemy.x - 15,
            enemy.y - 27,
            30 * (enemy.hp / enemy.maxHp),
            4
        );

    });
}


// =====================================
// CATEGORIA 12 - ATUALIZAR INFORMAÇÕES
// =====================================

function updateUI() {

    document.getElementById("gold").textContent =
        player.gold;

    document.getElementById("level").textContent =
        player.level;

    document.getElementById("xp").textContent =
        player.xp;

    document.getElementById("hpText").textContent =
        `${player.hp}/${player.maxHp}`;

    document.getElementById("xpText").textContent =
        `${player.xp}/${player.xpNext}`;

    document.getElementById("hpBar").style.width =
        (player.hp / player.maxHp * 100) + "%";

    document.getElementById("xpBar").style.width =
        (player.xp / player.xpNext * 100) + "%";

    document.getElementById("potions").textContent =
        player.potions;

    document.getElementById("wood").textContent =
        player.wood;

    document.getElementById("crystals").textContent =
        player.crystals;

    document.getElementById("questCount").textContent =
        Math.min(defeated, 3);
}


// =====================================
// CATEGORIA 13 - DIÁRIO
// =====================================

function addLog(message) {

    const log = document.getElementById("log");

    const p = document.createElement("p");

    p.textContent = message;

    log.prepend(p);

}


// =====================================
// CATEGORIA 14 - SALVAMENTO
// =====================================

function saveGame() {

    const data = {
        player,
        defeated
    };

    localStorage.setItem(
        "rpgSave",
        JSON.stringify(data)
    );

    addLog("Jogo salvo com sucesso!");

}


// =====================================
// CATEGORIA 15 - CONTROLES DO TECLADO
// =====================================

document.addEventListener("keydown", event => {

    const key = event.key.toLowerCase();

    keys[key] = true;

    if (!started || gameOver) return;

    if (key === " ") attack();

    if (key === "q") usePotion();

});

document.addEventListener("keyup", event => {

    keys[event.key.toLowerCase()] = false;

});


// =====================================
// CATEGORIA 16 - BOTÕES
// =====================================

document.getElementById("startBtn")
.addEventListener("click", () => {

    started = true;

    document.getElementById("startScreen")
    .classList.add("hidden");

    addLog("Sua aventura começou!");

});

document.getElementById("potionBtn")
.addEventListener("click", usePotion);

document.getElementById("saveBtn")
.addEventListener("click", saveGame);


// =====================================
// CATEGORIA 17 - LOOP PRINCIPAL
// =====================================

function gameLoop() {

    if (started && !gameOver) {

        movePlayer();

        drawWorld();

        drawEnemies();

        drawPlayer();

    }

    requestAnimationFrame(gameLoop);

}


// =====================================
// CATEGORIA 18 - INICIALIZAÇÃO
// =====================================

createEnemies();

updateUI();

gameLoop();
