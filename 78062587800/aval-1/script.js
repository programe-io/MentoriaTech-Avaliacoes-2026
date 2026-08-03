const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake;
let food;
let direction;
let score;
let level;
let speed;
let game;
let changingDirection = false; // Evita a colisão por digitação rápida de teclas

function start() {
    snake = [
        { x: 240, y: 240 },
        { x: 220, y: 240 },
        { x: 200, y: 240 }
    ];

    food = randomFood();
    direction = "RIGHT";
    changingDirection = false;

    score = 0;
    level = 1;
    speed = 120;

    updateInfo();

    clearInterval(game);
    game = setInterval(draw, speed);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * 25) * box,
        y: Math.floor(Math.random() * 25) * box
    };
}

function draw() {
    changingDirection = false;

    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, 500, 500);

    // Desenhar Comida
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 9, 0, Math.PI * 2);
    ctx.fill();

    // Desenhar Cobra
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#22c55e" : "#4ade80";
        ctx.fillRect(part.x, part.y, box - 2, box - 2);
    });

    // Posição da Cabeça
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Colisões
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= 500 ||
        head.y >= 500 ||
        snake.some(p => p.x === head.x && p.y === head.y)
    ) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Comer a Comida
    if (head.x === food.x && head.y === food.y) {
        score++;

        if (score % 5 === 0) {
            level++;
            speed -= 10;
            clearInterval(game);
            game = setInterval(draw, speed);
        }

        food = randomFood();
        updateInfo();
    } else {
        snake.pop();
    }
}

function updateInfo() {
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
}

function move(dir) {
    if (changingDirection) return;

    if (
        (dir === "UP" && direction !== "DOWN") ||
        (dir === "DOWN" && direction !== "UP") ||
        (dir === "LEFT" && direction !== "RIGHT") ||
        (dir === "RIGHT" && direction !== "LEFT")
    ) {
        direction = dir;
        changingDirection = true;
    }
}

// Eventos do Teclado
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") move("UP");
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") move("DOWN");
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") move("LEFT");
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") move("RIGHT");
});

// Eventos dos Botões na Tela
document.getElementById("btn-restart").addEventListener("click", start);
document.getElementById("btn-up").addEventListener("click", () => move("UP"));
document.getElementById("btn-left").addEventListener("click", () => move("LEFT"));
document.getElementById("btn-down").addEventListener("click", () => move("DOWN"));
document.getElementById("btn-right").addEventListener("click", () => move("RIGHT"));

function gameOver() {
    clearInterval(game);
    setTimeout(() => {
        alert("Fim de jogo!\nPontuação: " + score);
    }, 100);
}

// Inicializar o jogo ao carregar
start();ddw