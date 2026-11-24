
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const recordElement = document.getElementById("record");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over");

const box = 20;
const total = canvas.width / box;

let snake;
let food;
let direction;
let nextDirection;
let score = 0;
let speed = 150;
let gameLoop = null;
let running = false;

let record = Number(localStorage.getItem("snakeRecord")) || 0;

recordElement.textContent = record;

// Iniciar jogo
function startGame() {

    clearInterval(gameLoop);

    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = "right";
    nextDirection = "right";

    score = 0;
    speed = 150;

    scoreElement.textContent = score;

    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    food = createFood();

    running = true;

    drawGame();

    gameLoop = setInterval(updateGame, speed);
}

// Criar comida
function createFood() {

    let newFood;

    do {
        newFood = {
            x: Math.floor(Math.random() * total),
            y: Math.floor(Math.random() * total)
        };
    } while (
        snake.some(part =>
            part.x === newFood.x &&
            part.y === newFood.y
        )
    );

    return newFood;
}

// Desenhar jogo
function drawGame() {

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar grade
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;

    for (let i = 0; i < total; i++) {
        ctx.beginPath();
        ctx.moveTo(i * box, 0);
        ctx.lineTo(i * box, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * box);
        ctx.lineTo(canvas.width, i * box);
        ctx.stroke();
    }

    // Desenhar comida
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(
        food.x * box + box / 2,
        food.y * box + box / 2,
        box / 2 - 3,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Desenhar cobrinha
    snake.forEach((part, index) => {

        ctx.fillStyle = index === 0 ? "#86efac" : "#22c55e";

        ctx.fillRect(
            part.x * box + 2,
            part.y * box + 2,
            box - 4,
            box - 4
        );

        if (index === 0) {
            ctx.fillStyle = "#052e16";

            ctx.beginPath();
            ctx.arc(
                part.x * box + 14,
                part.y * box + 7,
                2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    });
}

// Atualizar jogo
function updateGame() {

    if (!running) return;

    direction = nextDirection;

    const head = {
        x: snake[0].x,
        y: snake[0].y
    };

    if (direction === "right") head.x++;
    if (direction === "left") head.x--;
    if (direction === "up") head.y--;
    if (direction === "down") head.y++;

    const eating =
        head.x === food.x && head.y === food.y;

    // Verificar colisão com paredes
    if (
        head.x < 0 ||
        head.x >= total ||
        head.y < 0 ||
        head.y >= total
    ) {
        endGame();
        return;
    }

    // Verificar colisão com o próprio corpo
    const bodyToCheck = eating ? snake : snake.slice(0, -1);

    if (bodyToCheck.some(part =>
        part.x === head.x && part.y === head.y
    )) {
        endGame();
        return;
    }

    snake.unshift(head);

    // Comer comida
    if (eating) {

        score += 10;
        scoreElement.textContent = score;

        if (score > record) {
            record = score;
            localStorage.setItem("snakeRecord", record);
            recordElement.textContent = record;
        }

        food = createFood();

        // Aumentar velocidade
        const newSpeed = Math.max(55, 150 - score);

        if (newSpeed !== speed) {
            speed = newSpeed;

            clearInterval(gameLoop);
            gameLoop = setInterval(updateGame, speed);
        }

    } else {
        snake.pop();
    }

    drawGame();
}

// Mudar direção
function changeDirection(newDirection) {

    if (!running) return;

    const opposite = {
        up: "down",
        down: "up",
        left: "right",
        right: "left"
    };

    if (opposite[newDirection] === direction) {
        return;
    }

    nextDirection = newDirection;
}

// Teclado
document.addEventListener("keydown", function(event) {

    const keys = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right"
    };

    if (keys[event.key]) {
        event.preventDefault();
        changeDirection(keys[event.key]);
    }
});

// Finalizar jogo
function endGame() {

    running = false;

    clearInterval(gameLoop);

    document.getElementById("final-score").textContent = score;

    gameOverScreen.style.display = "flex";
}

// Desenhar tela inicial
snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];

food = { x: 15, y: 10 };

direction = "right";

drawGame();
