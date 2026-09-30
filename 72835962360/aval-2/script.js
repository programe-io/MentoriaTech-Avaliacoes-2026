/* =====================================================
   GARDEN DEFENSE
   Jogo de defesa inspirado em Plants vs Zombies
===================================================== */


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const ROWS = 5;
const COLS = 9;

const INITIAL_SUN = 150;

const CELL_WIDTH = 100 / COLS;
const CELL_HEIGHT = 100 / ROWS;


/* =====================================================
   ELEMENTOS
===================================================== */

const startScreen =
    document.getElementById("startScreen");

const startButton =
    document.getElementById("startButton");

const game =
    document.getElementById("game");

const yard =
    document.getElementById("yard");

const grid =
    document.getElementById("grid");

const plantsLayer =
    document.getElementById("plantsLayer");

const zombiesLayer =
    document.getElementById("zombiesLayer");

const projectilesLayer =
    document.getElementById("projectilesLayer");

const sunLayer =
    document.getElementById("sunLayer");

const sunAmount =
    document.getElementById("sunAmount");

const scoreElement =
    document.getElementById("score");

const killsElement =
    document.getElementById("kills");

const waveElement =
    document.getElementById("wave");

const houseLivesElement =
    document.getElementById("houseLives");

const pauseButton =
    document.getElementById("pauseButton");

const restartButton =
    document.getElementById("restartButton");

const message =
    document.getElementById("message");

const messageTitle =
    document.getElementById("messageTitle");

const messageText =
    document.getElementById("messageText");

const messageButton =
    document.getElementById("messageButton");

const plantCards =
    document.querySelectorAll(".plant-card");


/* =====================================================
   ESTADO DO JOGO
===================================================== */

let sun = INITIAL_SUN;

let score = 0;

let kills = 0;

let houseLives = 3;

let wave = 1;

let selectedPlant = "sunflower";

let plants = [];

let zombies = [];

let projectiles = [];

let suns = [];

let gameRunning = false;

let paused = false;

let gameOver = false;

let lastTime = 0;

let zombieTimer = 0;

let sunTimer = 0;

let waveTimer = 0;


/* =====================================================
   DADOS DAS PLANTAS
===================================================== */

const plantTypes = {

    sunflower: {

        name: "Girassol",

        icon: "🌻",

        cost: 50,

        health: 100,

        generateTime: 6000

    },

    shooter: {

        name: "Atirador",

        icon: "🌱",

        cost: 100,

        health: 120,

        shootTime: 1700

    },

    wall: {

        name: "Defensor",

        icon: "🥔",

        cost: 75,

        health: 500

    }

};


/* =====================================================
   DADOS DOS ZUMBIS
===================================================== */

const zombieTypes = {

    normal: {

        icon: "🧟",

        health: 100,

        speed: 0.008,

        damage: 18,

        score: 10

    },

    fast: {

        icon: "🏃",

        health: 70,

        speed: 0.014,

        damage: 12,

        score: 15

    },

    strong: {

        icon: "🧟‍♂️",

        health: 250,

        speed: 0.004,

        damage: 28,

        score: 30

    }

};


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

function initializeGame() {

    resetGame();

    createGrid();

    updateUI();

}


/* =====================================================
   RESET
===================================================== */

function resetGame() {

    sun = INITIAL_SUN;

    score = 0;

    kills = 0;

    houseLives = 3;

    wave = 1;

    selectedPlant = "sunflower";

    plants = [];

    zombies = [];

    projectiles = [];

    suns = [];

    paused = false;

    gameOver = false;

    gameRunning = true;

    lastTime = performance.now();

    zombieTimer = 0;

    sunTimer = 0;

    waveTimer = 0;

    plantsLayer.innerHTML = "";

    zombiesLayer.innerHTML = "";

    projectilesLayer.innerHTML = "";

    sunLayer.innerHTML = "";

    message.classList.add("hidden");

    game.classList.remove("paused");

}


/* =====================================================
   GRID
===================================================== */

function createGrid() {

    grid.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {

        for (
            let col = 0;
            col < COLS;
            col++
        ) {

            const cell =
                document.createElement("div");

            cell.className =
                "grid-cell";

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener(
                "click",
                () => plantOnCell(row, col)
            );

            grid.appendChild(cell);

        }

    }

}


/* =====================================================
   PLANTAR
===================================================== */

function plantOnCell(row, col) {

    if (
        !gameRunning ||
        paused ||
        gameOver
    ) {
        return;
    }

    const occupied =
        plants.some(
            plant =>
                plant.row === row &&
                plant.col === col
        );

    if (occupied) {
        return;
    }

    const type =
        plantTypes[selectedPlant];

    if (sun < type.cost) {

        showFloatingMessage(
            "☀️ Energia insuficiente!"
        );

        return;
    }

    sun -= type.cost;

    const plant = {

        id:
            Date.now() +
            Math.random(),

        type:
            selectedPlant,

        row,
        col,

        health:
            type.health,

        maxHealth:
            type.health,

        timer: 0

    };

    plants.push(plant);

    renderPlant(plant);

    updateUI();

}


/* =====================================================
   RENDERIZAR PLANTA
===================================================== */

function renderPlant(plant) {

    const data =
        plantTypes[plant.type];

    const element =
        document.createElement("div");

    element.className =
        "plant";

    element.dataset.id =
        plant.id;

    element.style.left =
        `${(plant.col + 0.5) * CELL_WIDTH}%`;

    element.style.top =
        `${(plant.row + 0.5) * CELL_HEIGHT}%`;

    element.innerHTML = `

        <div class="plant-health">

            <div
                class="plant-health-bar"
                style="width:100%"
            ></div>

        </div>

        ${data.icon}

    `;

    plantsLayer.appendChild(element);

}


/* =====================================================
   SELEÇÃO DE PLANTA
===================================================== */

plantCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            plantCards.forEach(
                item =>
                    item.classList.remove(
                        "selected"
                    )
            );

            card.classList.add(
                "selected"
            );

            selectedPlant =
                card.dataset.plant;

        }
    );

});


/* =====================================================
   CRIAR ZUMBI
===================================================== */

function spawnZombie() {

    const types =
        Object.keys(zombieTypes);

    let type =
        "normal";

    const random =
        Math.random();

    if (
        wave >= 3 &&
        random < 0.15
    ) {

        type = "strong";

    } else if (
        wave >= 2 &&
        random < 0.35
    ) {

        type = "fast";

    }

    const data =
        zombieTypes[type];

    const row =
        Math.floor(
            Math.random() * ROWS
        );

    const zombie = {

        id:
            Date.now() +
            Math.random(),

        type,

        row,

        x: 103,

        health:
            data.health,

        maxHealth:
            data.health,

        speed:
            data.speed *
            (1 + wave * 0.04),

        damage:
            data.damage,

        attackTimer: 0

    };

    zombies.push(zombie);

    renderZombie(zombie);

}


/* =====================================================
   RENDERIZAR ZUMBI
===================================================== */

function renderZombie(zombie) {

    const data =
        zombieTypes[zombie.type];

    const element =
        document.createElement("div");

    element.className =
        "zombie";

    element.dataset.id =
        zombie.id;

    element.style.left =
        `${zombie.x}%`;

    element.style.top =
        `${(zombie.row + 0.5) * CELL_HEIGHT}%`;

    element.innerHTML = `

        <div class="zombie-health">

            <div
                class="zombie-health-bar"
                style="width:100%"
            ></div>

        </div>

        ${data.icon}

    `;

    zombiesLayer.appendChild(element);

}


/* =====================================================
   RENDERIZAR POSIÇÕES
===================================================== */

function updateZombieElement(zombie) {

    const element =
        zombiesLayer.querySelector(
            `[data-id="${zombie.id}"]`
        );

    if (!element) {
        return;
    }

    element.style.left =
        `${zombie.x}%`;

    const healthBar =
        element.querySelector(
            ".zombie-health-bar"
        );

    if (healthBar) {

        healthBar.style.width =
            `${Math.max(
                0,
                zombie.health /
                zombie.maxHealth *
                100
            )}%`;

    }

}


/* =====================================================
   GIRASSÓIS
===================================================== */

function updatePlants(delta) {

    plants.forEach(plant => {

        plant.timer += delta;

        const data =
            plantTypes[plant.type];

        if (
            plant.type === "sunflower" &&
            plant.timer >= data.generateTime
        ) {

            plant.timer = 0;

            createSun(
                (plant.col + .5) *
                    CELL_WIDTH,

                (plant.row + .5) *
                    CELL_HEIGHT
            );

        }

        if (
            plant.type === "shooter" &&
            plant.timer >= data.shootTime
        ) {

            plant.timer = 0;

            const target =
                zombies.find(
                    zombie =>
                        zombie.row === plant.row &&
                        zombie.x >
                            (plant.col * CELL_WIDTH)
                );

            if (target) {

                createProjectile(plant);

            }

        }

    });

}


/* =====================================================
   PROJÉTEIS
===================================================== */

function createProjectile(plant) {

    const projectile = {

        id:
            Date.now() +
            Math.random(),

        row:
            plant.row,

        x:
            (plant.col + .65) *
            CELL_WIDTH,

        damage: 25,

        speed: .055

    };

    projectiles.push(projectile);

    const element =
        document.createElement("div");

    element.className =
        "projectile";

    element.dataset.id =
        projectile.id;

    element.textContent =
        "●";

    element.style.left =
        `${projectile.x}%`;

    element.style.top =
        `${(projectile.row + .5) *
        CELL_HEIGHT}%`;

    projectilesLayer.appendChild(
        element
    );

}


/* =====================================================
   ATUALIZAR PROJÉTEIS
===================================================== */

function updateProjectiles(delta) {

    projectiles.forEach(
        projectile => {

            projectile.x +=
                projectile.speed *
                delta;

            const element =
                projectilesLayer.querySelector(
                    `[data-id="${projectile.id}"]`
                );

            if (element) {

                element.style.left =
                    `${projectile.x}%`;

            }

            const target =
                zombies.find(
                    zombie =>

                        zombie.row ===
                            projectile.row &&

                        Math.abs(
                            zombie.x -
                            projectile.x
                        ) < 4
                );

            if (target) {

                damageZombie(
                    target,
                    projectile.damage
                );

                removeProjectile(
                    projectile
                );

            }

        }
    );

    projectiles =
        projectiles.filter(
            projectile =>
                projectile.x < 105
        );

}


/* =====================================================
   REMOVER PROJÉTIL
===================================================== */

function removeProjectile(
    projectile
) {

    const element =
        projectilesLayer.querySelector(
            `[data-id="${projectile.id}"]`
        );

    if (element) {

        element.remove();

    }

    projectiles =
        projectiles.filter(
            item =>
                item.id !==
                projectile.id
        );

}


/* =====================================================
   DANO NO ZUMBI
===================================================== */

function damageZombie(
    zombie,
    damage
) {

    zombie.health -= damage;

    if (
        zombie.health <= 0
    ) {

        killZombie(zombie);

    }

    updateZombieElement(
        zombie
    );

}


/* =====================================================
   MATAR ZUMBI
===================================================== */

function killZombie(zombie) {

    const data =
        zombieTypes[zombie.type];

    score += data.score;

    kills++;

    const element =
        zombiesLayer.querySelector(
            `[data-id="${zombie.id}"]`
        );

    if (element) {

        element.remove();

    }

    zombies =
        zombies.filter(
            item =>
                item.id !== zombie.id
        );

    updateUI();

}


/* =====================================================
   ATUALIZAR ZUMBIS
===================================================== */

function updateZombies(delta) {

    zombies.forEach(zombie => {

        const target =
            plants.find(
                plant =>
                    plant.row === zombie.row &&
                    zombie.x <=
                        (plant.col + .75) *
                        CELL_WIDTH
            );

        if (target) {

            zombie.attackTimer +=
                delta;

            if (
                zombie.attackTimer >=
                1000
            ) {

                zombie.attackTimer = 0;

                target.health -=
                    zombie.damage;

                updatePlantHealth(
                    target
                );

                if (
                    target.health <= 0
                ) {

                    removePlant(target);

                }

            }

        } else {

            zombie.x -=
                zombie.speed *
                delta;

        }

        updateZombieElement(
            zombie
        );

        if (
            zombie.x <= 1
        ) {

            damageHouse();

        }

    });

}


/* =====================================================
   VIDA DAS PLANTAS
===================================================== */

function updatePlantHealth(
    plant
) {

    const element =
        plantsLayer.querySelector(
            `[data-id="${plant.id}"]`
        );

    if (!element) {
        return;
    }

    const healthBar =
        element.querySelector(
            ".plant-health-bar"
        );

    if (healthBar) {

        healthBar.style.width =
            `${Math.max(
                0,
                plant.health /
                plant.maxHealth *
                100
            )}%`;

    }

}


/* =====================================================
   REMOVER PLANTA
===================================================== */

function removePlant(plant) {

    const element =
        plantsLayer.querySelector(
            `[data-id="${plant.id}"]`
        );

    if (element) {

        element.remove();

    }

    plants =
        plants.filter(
            item =>
                item.id !== plant.id
        );

}


/* =====================================================
   CASA
===================================================== */

function damageHouse() {

    houseLives--;

    updateUI();

    zombies =
        zombies.filter(
            zombie => {

                if (
                    zombie.x <= 1
                ) {

                    const element =
                        zombiesLayer.querySelector(
                            `[data-id="${zombie.id}"]`
                        );

                    if (element) {
                        element.remove();
                    }

                    return false;

                }

                return true;

            }
        );

    if (
        houseLives <= 0
    ) {

        endGame();

    }

}


/* =====================================================
   CRIAR SOL
===================================================== */

function createSun(
    x = Math.random() * 85 + 5,
    y = Math.random() * 85 + 5
) {

    const item = {

        id:
            Date.now() +
            Math.random(),

        x,
        y

    };

    suns.push(item);

    const element =
        document.createElement("button");

    element.className =
        "sun";

    element.dataset.id =
        item.id;

    element.textContent =
        "☀️";

    element.style.left =
        `${x}%`;

    element.style.top =
        `${y}%`;

    element.addEventListener(
        "click",
        () => collectSun(item)
    );

    sunLayer.appendChild(
        element
    );

}


/* =====================================================
   COLETAR SOL
===================================================== */

function collectSun(item) {

    sun += 25;

    score += 5;

    const element =
        sunLayer.querySelector(
            `[data-id="${item.id}"]`
        );

    if (element) {

        element.remove();

    }

    suns =
        suns.filter(
            sunItem =>
                sunItem.id !== item.id
        );

    updateUI();

}


/* =====================================================
   ENERGIA AUTOMÁTICA
===================================================== */

function updateSunTimer(delta) {

    sunTimer += delta;

    if (
        sunTimer >= 8000
    ) {

        sunTimer = 0;

        createSun();

    }

}


/* =====================================================
   ONDAS
===================================================== */

function updateWave(delta) {

    waveTimer += delta;

    if (
        waveTimer >= 30000
    ) {

        waveTimer = 0;

        wave++;

        showFloatingMessage(
            `🌊 Onda ${wave}!`
        );

        updateUI();

    }

}


/* =====================================================
   SPAWN DE ZUMBIS
===================================================== */

function updateZombieSpawner(delta) {

    zombieTimer += delta;

    const interval =
        Math.max(
            1800,
            6000 -
            wave * 350
        );

    if (
        zombieTimer >= interval
    ) {

        zombieTimer = 0;

        spawnZombie();

    }

}


/* =====================================================
   MENSAGEM FLUTUANTE
===================================================== */

function showFloatingMessage(
    text
) {

    const element =
        document.createElement("div");

    element.style.position =
        "fixed";

    element.style.left =
        "50%";

    element.style.top =
        "30%";

    element.style.transform =
        "translate(-50%, -50%)";

    element.style.zIndex =
        "1000";

    element.style.padding =
        "15px 25px";

    element.style.borderRadius =
        "12px";

    element.style.background =
        "rgba(0,0,0,.8)";

    element.style.color =
        "white";

    element.style.fontWeight =
        "900";

    element.textContent =
        text;

    document.body.appendChild(
        element
    );

    setTimeout(
        () => element.remove(),
        1200
    );

}


/* =====================================================
   ATUALIZAR INTERFACE
===================================================== */

function updateUI() {

    sunAmount.textContent =
        sun;

    scoreElement.textContent =
        score;

    killsElement.textContent =
        kills;

    waveElement.textContent =
        wave;

    houseLivesElement.textContent =
        houseLives;

    plantCards.forEach(
        card => {

            const type =
                plantTypes[
                    card.dataset.plant
                ];

            if (
                sun <
                type.cost
            ) {

                card.classList.add(
                    "disabled"
                );

            } else {

                card.classList.remove(
                    "disabled"
                );

            }

        }
    );

}


/* =====================================================
   PAUSAR
===================================================== */

function togglePause() {

    if (
        !gameRunning ||
        gameOver
    ) {
        return;
    }

    paused =
        !paused;

    game.classList.toggle(
        "paused",
        paused
    );

    pauseButton.textContent =
        paused
            ? "▶️"
            : "⏸️";

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(timestamp) {

    if (!gameRunning) {
        return;
    }

    const delta =
        timestamp - lastTime;

    lastTime =
        timestamp;

    if (
        !paused &&
        !gameOver
    ) {

        updatePlants(delta);

        updateProjectiles(delta);

        updateZombies(delta);

        updateZombieSpawner(delta);

        updateSunTimer(delta);

        updateWave(delta);

        updateUI();

    }

    requestAnimationFrame(
        gameLoop
    );

}


/* =====================================================
   FIM DE JOGO
===================================================== */

function endGame() {

    gameOver = true;

    gameRunning = false;

    messageTitle.textContent =
        "🧟 Os zumbis venceram!";

    messageText.textContent =
        `Sua pontuação foi ${score} pontos.`;

    messageButton.textContent =
        "JOGAR NOVAMENTE";

    message.classList.remove(
        "hidden"
    );

}


/* =====================================================
   INICIAR
===================================================== */

startButton.addEventListener(
    "click",
    () => {

        startScreen.classList.add(
            "hidden"
        );

        game.classList.remove(
            "hidden"
        );

        initializeGame();

        requestAnimationFrame(
            gameLoop
        );

    }
);


/* =====================================================
   REINICIAR
===================================================== */

restartButton.addEventListener(
    "click",
    () => {

        initializeGame();

        requestAnimationFrame(
            gameLoop
        );

    }
);

messageButton.addEventListener(
    "click",
    () => {

        initializeGame();

        requestAnimationFrame(
            gameLoop
        );

    }
);


/* =====================================================
   PAUSA
===================================================== */

pauseButton.addEventListener(
    "click",
    togglePause
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            togglePause();

        }

        if (
            event.key === "1"
        ) {

            selectPlant(
                "sunflower"
            );

        }

        if (
            event.key === "2"
        ) {

            selectPlant(
                "shooter"
            );

        }

        if (
            event.key === "3"
        ) {

            selectPlant(
                "wall"
            );

        }

    }
);


/* =====================================================
   SELEÇÃO VIA TECLADO
===================================================== */

function selectPlant(type) {

    selectedPlant = type;

    plantCards.forEach(
        card => {

            card.classList.toggle(
                "selected",
                card.dataset.plant === type
            );

        }
    );

}
