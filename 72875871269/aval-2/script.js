
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("gameOver");
const finalScoreElement = document.getElementById("finalScore");

const box = 20;
const total = canvas.width / box;

let snake;
let food;
let direction;
let nextDirection;
let score;
let gameInterval;
let gameRunning;

function startGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = "RIGHT";
    nextDirection = "RIGHT";
    score = 0;
    gameRunning = true;

    scoreElement.textContent = score;
    gameOverElement.style.display = "none";

    createFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(update, 150);
}

function createFood() {
    do {
        food = {
            x: Math.floor(Math.random() * total),
            y: Math.floor(Math.random() * total)
        };
    } while (
        snake.some(part =>
            part.x === food.x && part.y === food.y
        )
    );
}

function drawGame() {
    ctx.fillStyle = "#1b2838";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a fruta
    ctx.fillStyle = "#ff4545";
    ctx.fillRect(
        food.x * box,
        food.y * box,
        box - 2,
        box - 2
    );

    // Desenha a cobrinha
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#39e75f" : "#22b14c";

        ctx.fillRect(
            part.x * box,
            part.y * box,
            box - 2,
            box - 2
        );
    });
}

function update() {
    if (!gameRunning) return;

    direction = nextDirection;

    const head = { ...snake[0] };

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    // Verifica colisão com as paredes
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= total ||
        head.y >= total
    ) {
        endGame();
        return;
    }

    const ateFood =
        head.x === food.x && head.y === food.y;

    // Verifica colisão com o próprio corpo
    const bodyToCheck = ateFood
        ? snake
        : snake.slice(0, -1);

    if (bodyToCheck.some(part =>
        part.x === head.x && part.y === head.y
    )) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (ateFood) {
        score += 10;
        scoreElement.textContent = score;
        createFood();

        // Aumenta a velocidade
        clearInterval(gameInterval);
        gameInterval = setInterval(
            update,
            Math.max(60, 150 - score)
        );
    } else {
        snake.pop();
    }

    drawGame();
}

function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);

    finalScoreElement.textContent = score;
    gameOverElement.style.display = "block";
}

function restartGame() {
    startGame();
}

document.addEventListener("keydown", function(event) {
    const keys = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT"
    };

    const newDirection = keys[event.key];

    if (!newDirection) return;

    event.preventDefault();

    if (
        newDirection === "UP" && direction !== "DOWN" ||
        newDirection === "DOWN" && direction !== "UP" ||
        newDirection === "LEFT" && direction !== "RIGHT" ||
        newDirection === "RIGHT" && direction !== "LEFT"
    ) {
        nextDirection = newDirection;
    }
});

// Inicia o jogo
startGame();
